const OpenAI = require('openai');

let openai = null;

// Initialize OpenAI client only if API key is available
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const generateRecommendations = async (learnerProfile) => {
  if (!openai) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const prompt = `Based on this learner profile, suggest personalized learning recommendations:

Learner Profile:
- Age: ${learnerProfile.age || 'Not specified'}
- Grade/Education Level: ${learnerProfile.grade || 'Not specified'}
- Skills to Learn: ${learnerProfile.skillsToLearn?.join(', ') || 'Not specified'}
- Interests: ${learnerProfile.interests?.join(', ') || 'Not specified'}
- Learning Pace: ${learnerProfile.learningPace || 'Medium'}
- Preferred Learning Style: ${learnerProfile.preferredLearningStyle || 'Video'}
- Learning Goals: ${learnerProfile.learningGoals?.join(', ') || 'Not specified'}
- Available Time per Day: ${learnerProfile.availableTimePerDay || 'Not specified'} minutes

Please provide:
1. 3-5 course recommendations with brief descriptions
2. Suggested learning path
3. Daily study schedule based on available time
4. Tips for their preferred learning style

Format as JSON with keys: recommendations, learningPath, schedule, tips`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate AI recommendations');
  }
};

const generateEducatorSuggestions = async (analyticsData) => {
  if (!openai) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const prompt = `Based on this course analytics data, suggest improvements and new topics:

Analytics:
- Course Views: ${analyticsData.views}
- Completions: ${analyticsData.completions}
- Average Quiz Score: ${analyticsData.averageQuizScore}%
- Learner Engagement: ${analyticsData.learnerEngagement}/10
- Trending Topics: ${analyticsData.trendingTopics?.map(t => t.topic).join(', ') || 'None'}

Please provide:
1. 3-5 topic suggestions for new courses
2. Content improvement recommendations
3. Engagement strategies

Format as JSON with keys: topicSuggestions, improvements, strategies`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate educator suggestions');
  }
};

module.exports = {
  generateRecommendations,
  generateEducatorSuggestions,
};
