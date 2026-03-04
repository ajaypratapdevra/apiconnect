const Card = require('../models/Card');

exports.getCards = async (req, res) => {
    const cards = await Card.find();
    res.json(cards);
};

exports.createCard = async (req, res) => {
    const card = await Card.create(req.body);
    res.status(201).json(card);
};
