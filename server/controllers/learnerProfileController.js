const LearnerProfile = require('../models/LearnerProfile');
const User = require('../models/User');

const saveSurvey = async (req, res) => {
  try {
    const { interests, goals, experienceLevel, preferredCategories, learningStyle } = req.body;

    let profile = await LearnerProfile.findOne({ user: req.userId });

    if (profile) {
      // Update existing profile
      profile.interests = interests || profile.interests;
      profile.goals = goals || profile.goals;
      profile.experienceLevel = experienceLevel || profile.experienceLevel;
      profile.preferredCategories = preferredCategories || profile.preferredCategories;
      profile.learningStyle = learningStyle || profile.learningStyle;
      profile.surveyCompleted = true;
      profile.updatedAt = new Date();
    } else {
      // Create new profile
      profile = new LearnerProfile({
        user: req.userId,
        interests: interests || [],
        goals: goals || [],
        experienceLevel: experienceLevel || 'beginner',
        preferredCategories: preferredCategories || [],
        learningStyle: learningStyle || 'visual',
        surveyCompleted: true
      });
    }

    await profile.save();

    res.json({
      message: 'Survey saved successfully',
      profile
    });
  } catch (error) {
    console.error('Error saving survey:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await LearnerProfile.findOne({ user: req.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = new Date();

    const profile = await LearnerProfile.findOneAndUpdate(
      { user: req.userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      profile
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  saveSurvey,
  getProfile,
  updateProfile
};
