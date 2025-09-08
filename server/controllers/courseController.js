const Course = require('../models/Course');
const Progress = require('../models/Progress');
const Analytics = require('../models/Analytics');
const { body, validationResult } = require('express-validator');

const getAllCourses = async (req, res) => {
  try {
    const { category, level, search, page = 1, limit = 10 } = req.query;

    let query = { isActive: true };

    if (category) query.category = category;
    if (level) query.level = level;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const courses = await Course.find(query)
      .populate('instructor', 'name email profile')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Course.countDocuments(query);

    res.json({
      courses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email profile')
      .populate('prerequisites', 'title');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update analytics
    await Analytics.findOneAndUpdate(
      { course: course._id },
      { $inc: { views: 1 } },
      { upsert: true, new: true }
    );

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createCourse = [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').isIn(['Handicrafts', 'Culinary', 'Arts', 'Technology', 'Lifestyle', 'Business']).withMessage('Invalid category'),
  body('duration').isNumeric().withMessage('Duration must be a number'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const courseData = {
        ...req.body,
        instructor: req.userId,
      };

      const course = new Course(courseData);
      await course.save();

      res.status(201).json({
        message: 'Course created successfully',
        course,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

const updateCourse = [
  body('title').optional().trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').optional().trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const course = await Course.findOne({ _id: req.params.id, instructor: req.userId });

      if (!course) {
        return res.status(404).json({ message: 'Course not found or unauthorized' });
      }

      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      res.json({
        message: 'Course updated successfully',
        course: updatedCourse,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id, instructor: req.userId });

    if (!course) {
      return res.status(404).json({ message: 'Course not found or unauthorized' });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.enrolledStudents.includes(req.userId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.enrolledStudents.push(req.userId);
    await course.save();

    // Create progress record
    const progress = new Progress({
      user: req.userId,
      course: course._id,
    });
    await progress.save();

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const bookmarkCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // This would typically update the Learner's profile
    // For now, we'll just return success
    res.json({ message: 'Course bookmarked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  bookmarkCourse,
};
