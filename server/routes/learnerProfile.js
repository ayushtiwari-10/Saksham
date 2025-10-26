const express = require('express');
const { saveSurvey, getProfile, updateProfile } = require('../controllers/learnerProfileController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

// Save survey data (students only)
router.post('/survey', auth, roleAuth('student'), saveSurvey);

// Get learner profile
router.get('/', auth, roleAuth('student'), getProfile);

// Update learner profile
router.put('/', auth, roleAuth('student'), updateProfile);

module.exports = router;
