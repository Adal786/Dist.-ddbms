const History = require('../models/historyModel');

exports.getAllHistory = async (req, res) => {
    try {
        const history = await History.find();
        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching all history:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching all history.' });
    }
};
