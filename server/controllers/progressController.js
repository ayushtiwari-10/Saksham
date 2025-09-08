const Progress = require('../models/Progress');
const Course = require('../models/Course');
const Analytics = require('../models/Analytics');

const getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.userId,
      course: req.params.courseId,
    }).populate('course', 'title lessons');

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { timeSpent, notes } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { user: req.userId, course: req.params.courseId },
      {
        $inc: { timeSpent: timeSpent || 0 },
        $set: { lastAccessed: new Date() },
        ...(notes && { $push: { notes: { lessonId: req.body.lessonId, content: notes } } }),
      },
      { new: true, upsert: true }
    );

    res.json({
      message: 'Progress updated successfully',
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const completeLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    // Check if lesson exists in course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const lessonExists = course.lessons.some(lesson => lesson._id.toString() === lessonId);
    if (!lessonExists) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const progress = await Progress.findOneAndUpdate(
      { user: req.userId, course: courseId },
      {
        $addToSet: {
          completedLessons: {
            lessonId,
            completedAt: new Date(),
          },
        },
        $set: { lastAccessed: new Date() },
      },
      { new: true, upsert: true }
    );

    // Check if all lessons are completed
    if (progress.completedLessons.length === course.lessons.length) {
      // Update analytics
      await Analytics.findOneAndUpdate(
        { course: courseId },
        { $inc: { completions: 1 } },
        { upsert: true }
      );
    }

    res.json({
      message: 'Lesson marked as completed',
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { courseId, quizId } = req.params;
    const { answers, score, maxScore } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { user: req.userId, course: courseId },
      {
        $push: {
          quizScores: {
            quizId,
            score,
            maxScore,
            completedAt: new Date(),
          },
        },
        $set: { lastAccessed: new Date() },
      },
      { new: true, upsert: true }
    );

    // Update analytics with quiz score
    const averageScore = (score / maxScore) * 100;
    await Analytics.findOneAndUpdate(
      { course: courseId },
      {
        $inc: { learnerEngagement: averageScore > 70 ? 1 : 0 },
      },
      { upsert: true }
    );

    res.json({
      message: 'Quiz submitted successfully',
      score: averageScore,
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProgress,
  updateProgress,
  completeLesson,
  submitQuiz,
};
