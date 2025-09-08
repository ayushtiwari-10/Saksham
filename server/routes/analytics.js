const express = require('express');
const { getEducatorAnalytics, getCourseAnalytics, updateAnalytics } = require('../controllers/analyticsController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

// Educator analytics dashboard
router.get('/educator', auth, roleAuth('teacher', 'admin'), getEducatorAnalytics);

// Course-specific analytics
router.get('/course/:courseId', auth, roleAuth('teacher', 'admin'), getCourseAnalytics);

// Update analytics (internal use)
router.post('/update', auth, roleAuth('teacher', 'admin'), updateAnalytics);

module.exports = router;
