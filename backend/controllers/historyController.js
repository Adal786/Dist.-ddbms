const History = require('../models/historyModel');
const User = require('../models/userModel');

// Fetch specific history entry by userId and historyId
exports.getUserHistoryById = async (req, res) => {
    const { userId, id } = req.params;

    try {
        const query = { userId };

        if (id) {
            query._id = id;
        }

        // Fetch history based on the query
        const history = await History.findOne(query);

        if (!history) {
            return res.status(404).json({ error: 'History not found.' });
        }

        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching history:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching history.' });
    }
};

exports.getUserHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch all history records for the given userId
        const histories = await History.find({ userId });

        if (histories.length === 0) {
            return res.status(200).json({ error: 'No history found for this user.' });
        }

        res.status(200).json(histories);
    } catch (error) {
        console.error('Error fetching history:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching history.' });
    }
};


exports.getAllUserHistory = async (req, res) => {
    try {
        // Fetch all history entries
        const history = await History.find();

        // Use a for...of loop to handle async operations
        for (const hist of history) {
            const user = await User.findById(hist.userId); // Find user by ID
            hist.userId = user;
        }

        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching history:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching history.' });
    }
};

