const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// GET /api/users - Fetch all users
router.get('/user', UserController.getAllUsers);

module.exports = router;
