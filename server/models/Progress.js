const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  completedLessons: [{
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  timeSpent: {
    type: Number, // in minutes
    default: 0,
  },
  lastAccessed: {
    type: Date,
    default: Date.now,
  },
  quizScores: [{
    quizId: String,
    score: Number,
    maxScore: Number,
    completedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  notes: [{
    lessonId: String,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

// Compound index to ensure one progress per user-course
progressSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
