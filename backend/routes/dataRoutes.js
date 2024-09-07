// routes/dataRoutes.js
const express = require('express');
const { getAllData } = require('../controllers/dataController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/data', getAllData);

module.exports = router;
