const express = require('express');
const router = express.Router();
const chatboxController = require('../controllers/chatboxController');

// Define chatbox routes here
router.get('/', chatboxController.getChatbox);

module.exports = router;
