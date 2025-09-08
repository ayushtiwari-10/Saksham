const User = require('../models/User');
const LearnerProfile = require('../models/LearnerProfile');
const { body, validationResult } = require('express-validator');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password').populate('courses.courseId', 'title category');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get learner profile if exists
    const learnerProfile = await LearnerProfile.findOne({ user: req.userId });

    res.json({
      user,
      learnerProfile,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProfile = [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { bio, ...otherUpdates } = req.body;
      delete otherUpdates.password; // Don't allow password updates through this route

      // Prepare updates object
      const updates = { ...otherUpdates };

      // Handle bio and phone separately as they are in the profile subdocument
      if (bio !== undefined) {
        updates['profile.bio'] = bio;
      }
      if (req.body.phone !== undefined) {
        updates['profile.phone'] = req.body.phone;
      }

      const user = await User.findByIdAndUpdate(
        req.userId,
        { $set: updates },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        message: 'Profile updated successfully',
        user,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

const createLearnerProfile = [
  body('age').optional().isNumeric().withMessage('Age must be a number'),
  body('grade').optional().isIn(['Elementary', 'Middle School', 'High School', 'College', 'Graduate', 'Professional']).withMessage('Invalid grade'),
  body('learningPace').optional().isIn(['Slow', 'Medium', 'Fast']).withMessage('Invalid learning pace'),
  body('preferredLearningStyle').optional().isIn(['Visual', 'Text', 'Video', 'Interactive']).withMessage('Invalid learning style'),
  body('availableTimePerDay').optional().isNumeric().withMessage('Available time must be a number'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if profile already exists
      const existingProfile = await LearnerProfile.findOne({ user: req.userId });
      if (existingProfile) {
        return res.status(400).json({ message: 'Learner profile already exists' });
      }

      const profileData = {
        ...req.body,
        user: req.userId,
      };

      const learnerProfile = new LearnerProfile(profileData);
      await learnerProfile.save();

      res.status(201).json({
        message: 'Learner profile created successfully',
        learnerProfile,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

const updateLearnerProfile = [
  body('age').optional().isNumeric().withMessage('Age must be a number'),
  body('grade').optional().isIn(['Elementary', 'Middle School', 'High School', 'College', 'Graduate', 'Professional']).withMessage('Invalid grade'),
  body('learningPace').optional().isIn(['Slow', 'Medium', 'Fast']).withMessage('Invalid learning pace'),
  body('preferredLearningStyle').optional().isIn(['Visual', 'Text', 'Video', 'Interactive']).withMessage('Invalid learning style'),
  body('availableTimePerDay').optional().isNumeric().withMessage('Available time must be a number'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const learnerProfile = await LearnerProfile.findOneAndUpdate(
        { user: req.userId },
        { $set: req.body },
        { new: true, runValidators: true, upsert: true }
      );

      res.json({
        message: 'Learner profile updated successfully',
        learnerProfile,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

const getLearnerProfile = async (req, res) => {
  try {
    const learnerProfile = await LearnerProfile.findOne({ user: req.userId });

    if (!learnerProfile) {
      return res.status(404).json({ message: 'Learner profile not found' });
    }

    res.json(learnerProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const bookmarkCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    await LearnerProfile.findOneAndUpdate(
      { user: req.userId },
      { $addToSet: { bookmarkedCourses: courseId } },
      { upsert: true, new: true }
    );

    res.json({ message: 'Course bookmarked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const unbookmarkCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    await LearnerProfile.findOneAndUpdate(
      { user: req.userId },
      { $pull: { bookmarkedCourses: courseId } },
      { new: true }
    );

    res.json({ message: 'Course unbookmarked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const completeSurvey = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { surveyCompleted: true } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Survey completed successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // In a real application, you would upload to cloud storage (AWS S3, Cloudinary, etc.)
    // For now, we'll just return a mock URL
    const imageUrl = `/uploads/profiles/${req.file.filename}`;

    // Update user's profile image
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { profileImage: imageUrl } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile image uploaded successfully',
      url: imageUrl,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  createLearnerProfile,
  updateLearnerProfile,
  getLearnerProfile,
  bookmarkCourse,
  unbookmarkCourse,
  completeSurvey,
  uploadProfileImage,
};
