require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const teaSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  benefit: String,
  image: String
});

const Tea = mongoose.model('teas', teaSchema);

app.get('/api/teas', async (req, res) => {
  const tea = await Tea.find();
  res.json(tea);
});

app.listen(5000, () => console.log("Server running on port 5000"));