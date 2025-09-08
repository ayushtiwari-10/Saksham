const LearnerProfile = require('../models/LearnerProfile');
const Recommendation = require('../models/Recommendation');
const Progress = require('../models/Progress');
const Course = require('../models/Course');
const { generateRecommendations, generateEducatorSuggestions } = require('../utils/openai');

const getPersonalizedRecommendations = async (req, res) => {
  try {
    const learnerProfile = await LearnerProfile.findOne({ user: req.userId });

    if (!learnerProfile) {
      return res.status(404).json({ message: 'Learner profile not found. Please complete your profile first.' });
    }

    // Check for cached recommendations
    const cachedRecommendations = await Recommendation.find({
      user: req.userId,
      type: 'course',
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 }).limit(5);

    if (cachedRecommendations.length > 0) {
      return res.json({
        recommendations: cachedRecommendations,
        cached: true,
      });
    }

    // Generate new recommendations using AI
    const aiResponse = await generateRecommendations(learnerProfile);

    // Save recommendations to database
    const recommendations = [];
    for (const rec of aiResponse.recommendations || []) {
      const recommendation = new Recommendation({
        user: req.userId,
        type: 'course',
        content: rec,
        reason: rec.description || 'Personalized recommendation',
        confidence: 0.8,
      });
      await recommendation.save();
      recommendations.push(recommendation);
    }

    res.json({
      recommendations,
      learningPath: aiResponse.learningPath,
      schedule: aiResponse.schedule,
      tips: aiResponse.tips,
      cached: false,
    });
  } catch (error) {
    console.error('AI Recommendations error:', error);
    res.status(500).json({ message: 'Failed to generate recommendations', error: error.message });
  }
};

const getEducatorSuggestions = async (req, res) => {
  try {
    // Get analytics for educator's courses
    const courses = await Course.find({ instructor: req.userId });
    const courseIds = courses.map(c => c._id);

    const analytics = await require('../models/Analytics').find({ course: { $in: courseIds } });

    // Aggregate analytics data
    const aggregatedData = {
      views: analytics.reduce((sum, a) => sum + a.views, 0),
      completions: analytics.reduce((sum, a) => sum + a.completions, 0),
      averageQuizScore: analytics.length > 0
        ? analytics.reduce((sum, a) => sum + a.averageQuizScore, 0) / analytics.length
        : 0,
      learnerEngagement: analytics.length > 0
        ? analytics.reduce((sum, a) => sum + a.learnerEngagement, 0) / analytics.length
        : 0,
      trendingTopics: [], // Would need to implement topic extraction
    };

    const suggestions = await generateEducatorSuggestions(aggregatedData);

    res.json({
      suggestions,
      analytics: aggregatedData,
    });
  } catch (error) {
    console.error('Educator Suggestions error:', error);
    res.status(500).json({ message: 'Failed to generate suggestions', error: error.message });
  }
};

const markRecommendationViewed = async (req, res) => {
  try {
    const recommendation = await Recommendation.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      {
        isViewed: true,
        viewedAt: new Date(),
      },
      { new: true }
    );

    if (!recommendation) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }

    res.json({ message: 'Recommendation marked as viewed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTrendingTopics = async (req, res) => {
  try {
    // Simple implementation - in a real app, this would use more sophisticated analysis
    const courses = await Course.find({ isActive: true })
      .sort({ 'rating.average': -1 })
      .limit(10);

    const topics = courses.map(course => ({
      topic: course.title,
      category: course.category,
      popularity: course.rating.average,
    }));

    res.json({ trendingTopics: topics });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getPersonalizedRecommendations,
  getEducatorSuggestions,
  markRecommendationViewed,
  getTrendingTopics,
};
