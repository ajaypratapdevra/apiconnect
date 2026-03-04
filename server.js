const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());
const bookingRoutes = require("./booking-system");

// 🔗 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// =======================
// Card Schema & Model
// =======================
const cardSchema = new mongoose.Schema({
  suit: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);

// =======================
// ROUTES
// =======================

// GET All Cards
app.get('/cards', async (req, res) => {
  const cards = await Card.find();
  res.status(200).json(cards);
});

// GET Single Card
app.get('/cards/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json(card);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// POST Create Card
app.post('/cards', async (req, res) => {
  try {
    const newCard = await Card.create(req.body);
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT Update Card
app.put('/cards/:id', async (req, res) => {
  try {
    const updated = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Card not found" });

    res.status(200).json(updated);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// DELETE Card
app.delete('/cards/:id', async (req, res) => {
  try {
    const deleted = await Card.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Card not found" });

    res.status(200).json({ message: "Card deleted successfully" });
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// =======================

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
