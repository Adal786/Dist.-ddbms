const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Route to get a specific history entry
router.get('/history/:userId/:id', historyController.getUserHistoryById);
router.get('/history/:userId', historyController.getUserHistory);

// Route to get all history entries for a user
router.get('/admin-history/', historyController.getAllUserHistory);

module.exports = router;
