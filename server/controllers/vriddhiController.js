const User = require('../models/User');
const Course = require('../models/Course');
const { body, validationResult } = require('express-validator');

// Get user's vriddhi balance and badges
const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('vriddhiBalance badges');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      balance: user.vriddhiBalance,
      badges: user.badges
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Purchase vriddhi coins with real money
const purchaseCoins = [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('coins').isNumeric().withMessage('Coins must be a number'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { amount, coins } = req.body;

      // Validate minimum purchase
      if (amount < 1 || coins < 10) {
        return res.status(400).json({ message: 'Minimum purchase is $1 for 10 coins' });
      }

      // For now, simulate payment processing
      // In production, integrate with Stripe/Razorpay
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Add coins to balance
      user.vriddhiBalance += coins;
      await user.save();

      res.json({
        message: 'Coins purchased successfully',
        balance: user.vriddhiBalance,
        purchased: coins
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];

// Earn coins from task completion (ads, activities)
const earnCoins = [
  body('taskType').isIn(['ad_watch', 'activity_complete', 'survey_complete']).withMessage('Invalid task type'),
  body('coins').isNumeric().withMessage('Coins must be a number'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { taskType, coins } = req.body;

      // Define coin rewards for different tasks
      const rewards = {
        ad_watch: 5,
        activity_complete: 10,
        survey_complete: 15
      };

      const rewardAmount = rewards[taskType] || coins;

      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.vriddhiBalance += rewardAmount;
      await user.save();

      res.json({
        message: 'Coins earned successfully',
        balance: user.vriddhiBalance,
        earned: rewardAmount
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];

// Award badge to user
const awardBadge = [
  body('badge').isIn(['course_creator', 'top_instructor', 'community_helper', 'early_adopter', 'knowledge_sharer']).withMessage('Invalid badge'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { badge } = req.body;

      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if user already has this badge
      if (user.badges.includes(badge)) {
        return res.status(400).json({ message: 'User already has this badge' });
      }

      user.badges.push(badge);
      await user.save();

      res.json({
        message: 'Badge awarded successfully',
        badges: user.badges
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];

// Transfer coins (for barter system)
const transferCoins = [
  body('recipientId').isMongoId().withMessage('Invalid recipient ID'),
  body('amount').isNumeric().withMessage('Amount must be a number'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { recipientId, amount } = req.body;

      if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be positive' });
      }

      const sender = await User.findById(req.userId);
      const recipient = await User.findById(recipientId);

      if (!sender || !recipient) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (sender.vriddhiBalance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }

      // Transfer coins
      sender.vriddhiBalance -= amount;
      recipient.vriddhiBalance += amount;

      await sender.save();
      await recipient.save();

      res.json({
        message: 'Coins transferred successfully',
        balance: sender.vriddhiBalance
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];

// Get available badges for barter
const getAvailableBadges = async (req, res) => {
  try {
    const users = await User.find({
      badges: { $exists: true, $ne: [] },
      _id: { $ne: req.userId }
    }).select('name badges vriddhiBalance');

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Barter: Use badge for free course access
const barterForCourse = [
  body('courseId').isMongoId().withMessage('Invalid course ID'),
  body('badge').isIn(['course_creator', 'top_instructor', 'community_helper', 'early_adopter', 'knowledge_sharer']).withMessage('Invalid badge'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { courseId, badge } = req.body;

      const user = await User.findById(req.userId);
      const course = await Course.findById(courseId);

      if (!user || !course) {
        return res.status(404).json({ message: 'User or course not found' });
      }

      // Check if user has the badge
      if (!user.badges.includes(badge)) {
        return res.status(400).json({ message: 'You do not have this badge' });
      }

      // Check if already enrolled
      const alreadyEnrolled = course.enrolledStudents.some(enrollment =>
        enrollment.student.toString() === req.userId
      );
      if (alreadyEnrolled) {
        return res.status(400).json({ message: 'Already enrolled in this course' });
      }

      // Enroll using badge
      course.enrolledStudents.push({
        student: req.userId,
        enrolledAt: new Date(),
        progress: 0,
        completedLessons: [],
        lastAccessed: new Date(),
      });

      await course.save();

      res.json({
        message: 'Successfully enrolled using badge barter',
        course: course.title
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];

module.exports = {
  getBalance,
  purchaseCoins,
  earnCoins,
  awardBadge,
  transferCoins,
  getAvailableBadges,
  barterForCourse,
};
