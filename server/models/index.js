// Import all models to ensure they're registered with mongoose
require('./User');
require('./Course');
require('./Progress');
require('./Analytics');
require('./LearnerProfile');
require('./Recommendation');

console.log('All models imported and registered successfully');
