const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['course', 'lesson', 'topic'],
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // Can store course IDs, lesson IDs, or topic strings
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  confidence: {
    type: Number,
    min: 0,
    max: 1,
    default: 0.5,
  },
  isViewed: {
    type: Boolean,
    default: false,
  },
  viewedAt: Date,
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  },
}, {
  timestamps: true,
});

// Index for efficient queries
recommendationSchema.index({ user: 1, type: 1, expiresAt: 1 });

// Auto-delete expired recommendations
recommendationSchema.pre('find', function() {
  this.where({ expiresAt: { $gt: new Date() } });
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
