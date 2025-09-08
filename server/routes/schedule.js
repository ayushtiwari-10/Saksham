const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// Define schedule routes here
router.get('/', scheduleController.getSchedule);

module.exports = router;
