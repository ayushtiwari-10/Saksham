const LocalClass = require('../models/LocalClass');
const User = require('../models/User');

// Get all local classes with filters
const getLocalClasses = async (req, res) => {
  try {
    const {
      category,
      city,
      state,
      level,
      priceMin,
      priceMax,
      date,
      page = 1,
      limit = 10
    } = req.query;

    const query = { status: 'published' };

    if (category) query.category = category;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (state) query['location.state'] = new RegExp(state, 'i');
    if (level) query.level = level;
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = parseFloat(priceMin);
      if (priceMax) query.price.$lte = parseFloat(priceMax);
    }

    if (date) {
      query['schedule.date'] = {
        $gte: new Date(date),
        $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
      };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const classes = await LocalClass.find(query)
      .populate('instructor', 'name email profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await LocalClass.countDocuments(query);

    res.json({
      classes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error getting local classes:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single local class
const getLocalClass = async (req, res) => {
  try {
    const { id } = req.params;

    const localClass = await LocalClass.findById(id)
      .populate('instructor', 'name email profilePicture bio')
      .populate('schedule.enrolledStudents', 'name email');

    if (!localClass) {
      return res.status(404).json({ message: 'Local class not found' });
    }

    res.json(localClass);
  } catch (error) {
    console.error('Error getting local class:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create local class (teachers only)
const createLocalClass = async (req, res) => {
  try {
    const classData = {
      ...req.body,
      instructor: req.userId
    };

    const localClass = new LocalClass(classData);
    await localClass.save();

    await localClass.populate('instructor', 'name email');

    res.status(201).json({
      message: 'Local class created successfully',
      class: localClass
    });
  } catch (error) {
    console.error('Error creating local class:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update local class (instructor only)
const updateLocalClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const localClass = await LocalClass.findById(id);

    if (!localClass) {
      return res.status(404).json({ message: 'Local class not found' });
    }

    if (localClass.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized to update this class' });
    }

    Object.assign(localClass, updates);
    await localClass.save();

    await localClass.populate('instructor', 'name email');

    res.json({
      message: 'Local class updated successfully',
      class: localClass
    });
  } catch (error) {
    console.error('Error updating local class:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete local class (instructor only)
const deleteLocalClass = async (req, res) => {
  try {
    const { id } = req.params;

    const localClass = await LocalClass.findById(id);

    if (!localClass) {
      return res.status(404).json({ message: 'Local class not found' });
    }

    if (localClass.instructor.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this class' });
    }

    await LocalClass.findByIdAndDelete(id);

    res.json({ message: 'Local class deleted successfully' });
  } catch (error) {
    console.error('Error deleting local class:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Enroll in local class
const enrollInLocalClass = async (req, res) => {
  try {
    const { classId, scheduleIndex } = req.body;

    const localClass = await LocalClass.findById(classId);

    if (!localClass) {
      return res.status(404).json({ message: 'Local class not found' });
    }

    if (!localClass.schedule[scheduleIndex]) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const schedule = localClass.schedule[scheduleIndex];

    // Check if student is already enrolled
    if (schedule.enrolledStudents.includes(req.userId)) {
      return res.status(400).json({ message: 'Already enrolled in this session' });
    }

    // Check capacity
    if (schedule.enrolledStudents.length >= schedule.maxStudents) {
      return res.status(400).json({ message: 'Class is full' });
    }

    // Add student to enrolled list
    schedule.enrolledStudents.push(req.userId);
    await localClass.save();

    res.json({
      message: 'Successfully enrolled in local class',
      class: localClass
    });
  } catch (error) {
    console.error('Error enrolling in local class:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get instructor's local classes
const getInstructorClasses = async (req, res) => {
  try {
    const classes = await LocalClass.find({ instructor: req.userId })
      .populate('schedule.enrolledStudents', 'name email')
      .sort({ createdAt: -1 });

    res.json(classes);
  } catch (error) {
    console.error('Error getting instructor classes:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get student's enrolled classes
const getStudentClasses = async (req, res) => {
  try {
    const classes = await LocalClass.find({
      'schedule.enrolledStudents': req.userId
    })
      .populate('instructor', 'name email profilePicture')
      .sort({ 'schedule.date': 1 });

    res.json(classes);
  } catch (error) {
    console.error('Error getting student classes:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getLocalClasses,
  getLocalClass,
  createLocalClass,
  updateLocalClass,
  deleteLocalClass,
  enrollInLocalClass,
  getInstructorClasses,
  getStudentClasses
};
