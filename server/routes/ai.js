const express = require('express');
const { getPersonalizedRecommendations, getEducatorSuggestions, markRecommendationViewed, getTrendingTopics } = require('../controllers/aiController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

// Learner AI recommendations
router.post('/recommendations', auth, roleAuth('student'), getPersonalizedRecommendations);

// Educator AI suggestions
router.get('/educator-suggestions', auth, roleAuth('teacher', 'admin'), getEducatorSuggestions);

// Mark recommendation as viewed
router.post('/recommendations/:id/viewed', auth, roleAuth('student'), markRecommendationViewed);

// Get trending topics
router.get('/trending-topics', auth, getTrendingTopics);

module.exports = router;
