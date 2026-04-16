import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimer = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(''), 2500);
  };

  // Load cart & orders when user logs in
  const fetchCart = useCallback(async () => {
    if (!isLoggedIn) { setCartItems([]); return; }
    try {
      const res = await fetch(`/api/cart/${user.id}`);
      const data = await res.json();
      setCartItems(data.map(i => ({ id: i.itemId, name: i.name, price: i.price, image: i.image, images: i.images, type: i.type, giftIndex: i.giftIndex, qty: i.qty })));
    } catch (err) { console.error('Fetch cart error:', err); }
  }, [user, isLoggedIn]);

  const fetchOrders = useCallback(async () => {
    if (!isLoggedIn) { setOrders([]); return; }
    try {
      const res = await fetch(`/api/orders/${user.id}`);
      const data = await res.json();
      setOrders(data.map(o => ({ id: o.orderId, date: o.createdAt, items: o.items.map(i => ({ id: i.itemId, name: i.name, price: i.price, image: i.image, images: i.images, type: i.type, giftIndex: i.giftIndex, qty: i.qty })), total: o.total, status: o.status })));
    } catch (err) { console.error('Fetch orders error:', err); }
  }, [user, isLoggedIn]);

  useEffect(() => { fetchCart(); fetchOrders(); }, [fetchCart, fetchOrders]);

  const addToCart = async (item) => {
    if (!isLoggedIn) return false;
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, itemId: item.id, name: item.name, price: item.price, image: item.image, images: item.images, type: item.type, giftIndex: item.giftIndex }),
      });
      await fetchCart();
      showToast(item.name + ' added to cart!');
      return true;
    } catch (err) { console.error('Add to cart error:', err); return false; }
  };

  const removeFromCart = async (id) => {
    if (!isLoggedIn) return;
    try {
      await fetch(`/api/cart/${user.id}/${id}`, { method: 'DELETE' });
      await fetchCart();
    } catch (err) { console.error('Remove error:', err); }
  };

  const updateQty = async (id, qty) => {
    if (!isLoggedIn) return;
    try {
      await fetch(`/api/cart/${user.id}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty }),
      });
      await fetchCart();
    } catch (err) { console.error('Update qty error:', err); }
  };

  const placeOrder = async () => {
    if (!isLoggedIn || cartItems.length === 0) return null;
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      const order = await res.json();
      await fetchCart();
      await fetchOrders();
      return order;
    } catch (err) { console.error('Place order error:', err); return null; }
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQty, orders, placeOrder, fetchCart, fetchOrders }}>
      {children}
      {toastMessage && (
        <div className="cart-toast">
          <span className="cart-toast-icon">✓</span> {toastMessage}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
