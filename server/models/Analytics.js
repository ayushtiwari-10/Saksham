const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  completions: {
    type: Number,
    default: 0,
  },
  averageQuizScore: {
    type: Number,
    default: 0,
  },
  learnerEngagement: {
    type: Number,
    default: 0, // Could be a composite score
  },
  trendingTopics: [{
    topic: String,
    score: Number,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Analytics', analyticsSchema);
