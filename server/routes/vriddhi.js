const express = require('express');
const {
  getBalance,
  purchaseCoins,
  earnCoins,
  awardBadge,
  transferCoins,
  getAvailableBadges,
  barterForCourse,
} = require('../controllers/vriddhiController');
const auth = require('../middleware/auth');

const router = express.Router();

// All vriddhi routes require authentication
router.use(auth);

// Get user's vriddhi balance and badges
router.get('/balance', getBalance);

// Purchase vriddhi coins
router.post('/purchase', purchaseCoins);

// Earn coins from tasks
router.post('/earn', earnCoins);

// Award badge to user
router.post('/badge', awardBadge);

// Transfer coins to another user
router.post('/transfer', transferCoins);

// Get available badges for barter
router.get('/badges', getAvailableBadges);

// Barter badge for course access
router.post('/barter', barterForCourse);

module.exports = router;
