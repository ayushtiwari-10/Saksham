const express = require('express');
const router = express.Router();
const myVideosController = require('../controllers/myVideosController');

// Define my-videos routes here
router.get('/', myVideosController.getMyVideos);

module.exports = router;
