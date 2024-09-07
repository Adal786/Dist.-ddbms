const express = require('express');
const { getAllHistory } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/admin-history', protect, adminOnly, getAllHistory);

module.exports = router;
