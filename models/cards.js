const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    suit: { type: String, required: true },
    value: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
