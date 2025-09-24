const express = require('express');
const {
  getProfile,
  updateProfile,
  createLearnerProfile,
  updateLearnerProfile,
  getLearnerProfile,
  bookmarkCourse,
  unbookmarkCourse,
  completeSurvey,
  completePersonalization,
  uploadProfileImage,
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profiles/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Get user profile
router.get('/profile', auth, getProfile);

// Update user profile
router.put('/profile', auth, updateProfile);

// Upload profile image
router.post('/upload-profile-image', auth, upload.single('profileImage'), uploadProfileImage);

// Learner profile endpoints (learners only)
router.post('/learner-profile', auth, roleAuth('student'), createLearnerProfile);
router.put('/learner-profile', auth, roleAuth('student'), updateLearnerProfile);
router.get('/learner-profile', auth, roleAuth('student'), getLearnerProfile);

// Bookmark/unbookmark courses (learners only)
router.post('/bookmark', auth, roleAuth('student'), bookmarkCourse);
router.delete('/bookmark', auth, roleAuth('student'), unbookmarkCourse);

// Complete survey endpoint
router.post('/complete-survey', auth, roleAuth('student'), completeSurvey);

// Complete personalization endpoint
router.post('/complete-personalization', auth, roleAuth('student'), completePersonalization);

module.exports = router;
