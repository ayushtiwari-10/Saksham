const express = require('express');
const { getProgress, updateProgress, completeLesson, submitQuiz } = require('../controllers/progressController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

// Get progress for a course
router.get('/:courseId', auth, getProgress);

// Update progress (time spent, etc.)
router.put('/:courseId', auth, updateProgress);

// Mark lesson as completed
router.post('/:courseId/lessons/:lessonId/complete', auth, completeLesson);

// Submit quiz answers
router.post('/:courseId/quizzes/:quizId', auth, submitQuiz);

module.exports = router;
