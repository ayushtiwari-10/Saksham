const express = require('express');
const {
  getLocalClasses,
  getLocalClass,
  createLocalClass,
  updateLocalClass,
  deleteLocalClass,
  enrollInLocalClass,
  getInstructorClasses,
  getStudentClasses
} = require('../controllers/localClassesController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

// Public routes
router.get('/', getLocalClasses);
router.get('/:id', getLocalClass);

// Student routes
router.post('/enroll', auth, roleAuth('student'), enrollInLocalClass);
router.get('/student/enrolled', auth, roleAuth('student'), getStudentClasses);

// Teacher routes
router.post('/', auth, roleAuth('teacher'), createLocalClass);
router.get('/teacher/classes', auth, roleAuth('teacher'), getInstructorClasses);
router.put('/:id', auth, roleAuth('teacher'), updateLocalClass);
router.delete('/:id', auth, roleAuth('teacher'), deleteLocalClass);

module.exports = router;
