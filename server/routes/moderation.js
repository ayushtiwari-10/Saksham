const express = require('express');
const {
  analyzeCourseContent,
  getPendingModeration,
  approveCourse,
  rejectCourse,
  getModerationStats
} = require('../controllers/contentModerationController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

// Analyze course content (teachers can request analysis)
router.post('/course/:courseId/analyze', auth, roleAuth('teacher', 'admin'), analyzeCourseContent);

// Get courses pending moderation (admins only)
router.get('/pending', auth, roleAuth('admin'), getPendingModeration);

// Approve course (admins only)
router.post('/course/:courseId/approve', auth, roleAuth('admin'), approveCourse);

// Reject course (admins only)
router.post('/course/:courseId/reject', auth, roleAuth('admin'), rejectCourse);

// Get moderation statistics (admins only)
router.get('/stats', auth, roleAuth('admin'), getModerationStats);

module.exports = router;
