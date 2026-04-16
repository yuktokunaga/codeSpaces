require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json()); // JSON パース用に追加

// MongoDB Atlas接続
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// MySQL DB接続プール
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'testuser',
  password: 'testpass',
  database: 'testdb01',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ===== Auth API =====

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'Registration successful', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// ===== Tea API =====
const teaSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  benefit: String,
  image: String
});

const Tea = mongoose.model('teas', teaSchema);

app.get('/api/teas', async (req, res) => {
  try {
    const teas = await Tea.find();
    res.json(teas);
  } catch (err) {
    console.error('Tea fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===== Cart API =====
const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: String, required: true },
  name: String,
  price: Number,
  image: String,
  images: [String],
  type: { type: String, enum: ['tea', 'gift'] },
  giftIndex: Number,
  qty: { type: Number, default: 1 },
}, { timestamps: true });

cartItemSchema.index({ userId: 1, itemId: 1 }, { unique: true });
const CartItem = mongoose.model('cart', cartItemSchema);

// Get cart
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const items = await CartItem.find({ userId: req.params.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add to cart
app.post('/api/cart', async (req, res) => {
  try {
    const { userId, itemId, name, price, image, images, type, giftIndex } = req.body;
    const existing = await CartItem.findOne({ userId, itemId });
    if (existing) {
      existing.qty += 1;
      await existing.save();
      return res.json(existing);
    }
    const item = await CartItem.create({ userId, itemId, name, price, image, images, type, giftIndex, qty: 1 });
    res.status(201).json(item);
  } catch (err) {
    console.error('Cart add error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update qty
app.put('/api/cart/:userId/:itemId', async (req, res) => {
  try {
    const { qty } = req.body;
    if (qty <= 0) {
      await CartItem.deleteOne({ userId: req.params.userId, itemId: req.params.itemId });
      return res.json({ deleted: true });
    }
    const item = await CartItem.findOneAndUpdate(
      { userId: req.params.userId, itemId: req.params.itemId },
      { qty },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove from cart
app.delete('/api/cart/:userId/:itemId', async (req, res) => {
  try {
    await CartItem.deleteOne({ userId: req.params.userId, itemId: req.params.itemId });
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ===== Orders API =====
const orderItemSchema = new mongoose.Schema({
  itemId: String,
  name: String,
  price: Number,
  image: String,
  images: { type: [String], default: [] },
  type: String,
  giftIndex: Number,
  qty: Number,
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: String, required: true, unique: true },
  items: [orderItemSchema],
  total: Number,
  status: { type: String, default: 'confirmed' },
}, { timestamps: true });

const Order = mongoose.model('orders', orderSchema);

// Get orders
app.get('/api/orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Place order (move cart -> order)
app.post('/api/orders', async (req, res) => {
  try {
    const { userId } = req.body;
    const cartItems = await CartItem.find({ userId });
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const order = await Order.create({
      userId,
      orderId: 'ORD-' + Date.now(),
      items: cartItems.map(i => ({
        itemId: i.itemId,
        name: i.name,
        price: i.price,
        image: i.image,
        images: i.images,
        type: i.type,
        giftIndex: i.giftIndex,
        qty: i.qty,
      })),
      total,
      status: 'confirmed',
    });
    // Clear cart
    await CartItem.deleteMany({ userId });
    res.status(201).json(order);
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===== Stripe Payment API =====
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { userId } = req.body;
    const cartItems = await CartItem.find({ userId });
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    // Stripe expects amount in smallest currency unit (yen has no decimals)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'jpy',
      metadata: { userId },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err.message || err);
    res.status(500).json({ error: err.message || 'Payment failed' });
  }
});

// Confirm order after successful payment
app.post('/api/orders/confirm-payment', async (req, res) => {
  try {
    const { userId, paymentIntentId } = req.body;
    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not completed' });
    }
    const cartItems = await CartItem.find({ userId });
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const order = await Order.create({
      userId,
      orderId: 'ORD-' + Date.now(),
      items: cartItems.map(i => ({
        itemId: i.itemId,
        name: i.name,
        price: i.price,
        image: i.image,
        images: i.images,
        type: i.type,
        giftIndex: i.giftIndex,
        qty: i.qty,
      })),
      total,
      status: 'confirmed',
    });
    await CartItem.deleteMany({ userId });
    res.status(201).json(order);
  } catch (err) {
    console.error('Confirm payment error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🚀 これを追加（public を静的配信）- APIルートより後に配置
app.use(express.static('public'));
app.use('/public', express.static('public'));
app.use('/images', express.static('public/images'));
app.use('/image', express.static('image'));

// サーバー起動
app.listen(3002, '0.0.0.0', () => {
  console.log('Server running on port 3002');
});