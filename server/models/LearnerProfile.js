const mongoose = require('mongoose');

const learnerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    min: 5,
    max: 100,
  },
  grade: {
    type: String,
    enum: ['Elementary', 'Middle School', 'High School', 'College', 'Graduate', 'Professional'],
  },
  skillsToLearn: [{
    type: String,
    trim: true,
  }],
  interests: [{
    type: String,
    trim: true,
  }],
  learningPace: {
    type: String,
    enum: ['Slow', 'Medium', 'Fast'],
    default: 'Medium',
  },
  preferredLearningStyle: {
    type: String,
    enum: ['Visual', 'Text', 'Video', 'Interactive'],
    default: 'Video',
  },
  learningGoals: [{
    type: String,
    trim: true,
  }],
  availableTimePerDay: {
    type: Number, // in minutes
    min: 15,
    max: 480,
  },
  completedCourses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  bookmarkedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('LearnerProfile', learnerProfileSchema);
