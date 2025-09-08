const express = require('express');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  bookmarkCourse,
} = require('../controllers/courseController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

// Get all courses
router.get('/', getAllCourses);

// Get course by ID
router.get('/:id', getCourseById);

// Create new course (educators only)
router.post('/', auth, roleAuth('teacher', 'admin'), createCourse);

// Update course (educators only)
router.put('/:id', auth, roleAuth('teacher', 'admin'), updateCourse);

// Delete course (educators only)
router.delete('/:id', auth, roleAuth('teacher', 'admin'), deleteCourse);

// Enroll in course (learners only)
router.post('/:id/enroll', auth, roleAuth('student'), enrollInCourse);

// Bookmark course (learners only)
router.post('/:id/bookmark', auth, roleAuth('student'), bookmarkCourse);

module.exports = router;
