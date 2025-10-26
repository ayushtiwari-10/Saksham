const mongoose = require('mongoose');

const localClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Handicrafts', 'Culinary', 'Arts', 'Technology', 'Lifestyle', 'Business']
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  duration: {
    type: Number, // in hours
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  schedule: [{
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    maxStudents: {
      type: Number,
      default: 10
    },
    enrolledStudents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }],
  materials: [{
    name: String,
    description: String,
    provided: {
      type: Boolean,
      default: false
    }
  }],
  prerequisites: [String],
  tags: [String],
  images: [String], // URLs to uploaded images
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  seoTitle: String,
  seoDescription: String
}, {
  timestamps: true
});

// Index for location-based searches
localClassSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('LocalClass', localClassSchema);
