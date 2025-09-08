const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Handicrafts", "Culinary", "Arts", "Technology", "Lifestyle", "Business"],
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: {
      type: Number, // in hours
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    lessons: [
      {
        title: String,
        content: String,
        videoUrl: String,
        pdfUrl: String,
        notes: String,
        quiz: {
          questions: [{
            question: String,
            options: [String],
            correctAnswer: Number,
            explanation: String,
          }],
        },
        duration: Number, // in minutes
      },
    ],
    resources: [{
      title: String,
      type: {
        type: String,
        enum: ['pdf', 'video', 'link', 'document'],
      },
      url: String,
      description: String,
    }],
    prerequisites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    }],
    tags: [String],
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Course", courseSchema)
