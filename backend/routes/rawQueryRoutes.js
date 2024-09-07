const express = require('express');
const { executeRawQuery, query } = require('../controllers/rawQueryController');
const router = express.Router();

// Route to execute a raw query
router.post('/rawquery/:id', executeRawQuery);

// Route to handle the standard query
router.post('/query/:id', query);

module.exports = router;
