const Analytics = require('../models/Analytics');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
const User = require('../models/User');

const getEducatorAnalytics = async (req, res) => {
  try {
    // Get all courses by this educator
    const courses = await Course.find({ instructor: req.userId });
    const courseIds = courses.map(c => c._id);

    // Get analytics for these courses
    const analytics = await Analytics.find({ course: { $in: courseIds } })
      .populate('course', 'title category level');

    // Get progress data for enrolled students
    const progressData = await Progress.find({ course: { $in: courseIds } })
      .populate('user', 'name email')
      .populate('course', 'title');

    // Aggregate data
    const totalViews = analytics.reduce((sum, a) => sum + a.views, 0);
    const totalCompletions = analytics.reduce((sum, a) => sum + a.completions, 0);
    const averageQuizScore = analytics.length > 0
      ? analytics.reduce((sum, a) => sum + a.averageQuizScore, 0) / analytics.length
      : 0;

    // Calculate completion rates
    const completionRates = courses.map(course => {
      const courseAnalytics = analytics.find(a => a.course.toString() === course._id.toString());
      const enrolledCount = course.enrolledStudents.length;
      const completionCount = courseAnalytics ? courseAnalytics.completions : 0;

      return {
        courseId: course._id,
        courseTitle: course.title,
        enrolled: enrolledCount,
        completed: completionCount,
        completionRate: enrolledCount > 0 ? (completionCount / enrolledCount) * 100 : 0,
      };
    });

    // Get top-performing courses
    const topCourses = completionRates
      .sort((a, b) => b.completionRate - a.completionRate)
      .slice(0, 5);

    // Get learner progress stats
    const learnerStats = progressData.reduce((stats, progress) => {
      const courseId = progress.course.toString();
      if (!stats[courseId]) {
        stats[courseId] = {
          courseTitle: progress.course.title,
          totalStudents: 0,
          averageProgress: 0,
          totalTimeSpent: 0,
        };
      }
      stats[courseId].totalStudents += 1;
      stats[courseId].totalTimeSpent += progress.timeSpent;
      return stats;
    }, {});

    res.json({
      overview: {
        totalCourses: courses.length,
        totalViews,
        totalCompletions,
        averageQuizScore: Math.round(averageQuizScore * 100) / 100,
      },
      completionRates,
      topCourses,
      learnerStats: Object.values(learnerStats),
      detailedAnalytics: analytics,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCourseAnalytics = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Verify educator owns this course
    const course = await Course.findOne({ _id: courseId, instructor: req.userId });
    if (!course) {
      return res.status(404).json({ message: 'Course not found or unauthorized' });
    }

    // Get analytics
    const analytics = await Analytics.findOne({ course: courseId });

    // Get progress data
    const progressData = await Progress.find({ course: courseId })
      .populate('user', 'name email');

    // Calculate engagement metrics
    const totalEnrolled = course.enrolledStudents.length;
    const completedCount = progressData.filter(p => p.completedLessons.length === course.lessons.length).length;
    const averageTimeSpent = progressData.length > 0
      ? progressData.reduce((sum, p) => sum + p.timeSpent, 0) / progressData.length
      : 0;

    // Quiz performance
    const quizScores = progressData.flatMap(p => p.quizScores);
    const averageQuizScore = quizScores.length > 0
      ? quizScores.reduce((sum, q) => sum + (q.score / q.maxScore) * 100, 0) / quizScores.length
      : 0;

    res.json({
      course: {
        id: course._id,
        title: course.title,
        enrolled: totalEnrolled,
        completed: completedCount,
        completionRate: totalEnrolled > 0 ? (completedCount / totalEnrolled) * 100 : 0,
      },
      engagement: {
        totalViews: analytics ? analytics.views : 0,
        averageTimeSpent: Math.round(averageTimeSpent),
        averageQuizScore: Math.round(averageQuizScore * 100) / 100,
      },
      studentProgress: progressData.map(p => ({
        studentId: p.user._id,
        studentName: p.user.name,
        completedLessons: p.completedLessons.length,
        totalLessons: course.lessons.length,
        timeSpent: p.timeSpent,
        lastAccessed: p.lastAccessed,
        quizScores: p.quizScores,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateAnalytics = async (req, res) => {
  try {
    const { courseId, views, completions, quizScore, engagement } = req.body;

    const analytics = await Analytics.findOneAndUpdate(
      { course: courseId },
      {
        $inc: {
          views: views || 0,
          completions: completions || 0,
        },
        $set: {
          averageQuizScore: quizScore || 0,
          learnerEngagement: engagement || 0,
        },
      },
      { upsert: true, new: true }
    );

    res.json({ message: 'Analytics updated successfully', analytics });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getEducatorAnalytics,
  getCourseAnalytics,
  updateAnalytics,
};
