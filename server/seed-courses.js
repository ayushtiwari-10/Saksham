const mongoose = require('mongoose');
const Course = require('./models/Course');
const User = require('./models/User');
const Progress = require('./models/Progress');

async function seedCourses() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/saksham', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Find or create a sample instructor
    let instructor = await User.findOne({ email: 'instructor@example.com' });
    if (!instructor) {
      instructor = new User({
        name: 'Sample Instructor',
        email: 'instructor@example.com',
        password: 'password123', // This will be hashed by the model
        role: 'teacher'
      });
      await instructor.save();
      console.log('Created sample instructor');
    }

    // Create a test student
    let student = await User.findOne({ email: 'student@example.com' });
    if (!student) {
      student = new User({
        name: 'Test Student',
        email: 'student@example.com',
        password: 'password123',
        role: 'student'
      });
      await student.save();
      console.log('Created test student');
    }

    // Sample courses data
    const sampleCourses = [
      {
        title: 'Introduction to Handicrafts',
        description: 'Learn the basics of various handicraft techniques including knitting, weaving, and pottery.',
        category: 'Handicrafts',
        duration: 24,
        instructor: instructor._id,
        price: 49.99,
        isActive: true,
        rating: { average: 4.5, count: 25 },
        enrolledStudents: [],
        tags: ['handicrafts', 'crafts', 'beginner'],
        learningObjectives: [
          'Understand basic handicraft materials and tools',
          'Learn fundamental techniques for knitting and weaving',
          'Create simple pottery projects',
          'Develop creativity and fine motor skills'
        ],
        prerequisites: ['No prior experience required', 'Basic interest in crafts'],
        lessons: [
          {
            title: 'Introduction to Handicrafts',
            description: 'Overview of different handicraft types and their history.',
            duration: 2
          },
          {
            title: 'Basic Knitting Techniques',
            description: 'Learn how to cast on, knit, purl, and bind off.',
            duration: 4
          },
          {
            title: 'Weaving Fundamentals',
            description: 'Introduction to loom weaving and basic patterns.',
            duration: 5
          },
          {
            title: 'Pottery Basics',
            description: 'Hand-building techniques and wheel throwing basics.',
            duration: 6
          },
          {
            title: 'Project: Create Your First Craft',
            description: 'Combine techniques to make a simple handicraft project.',
            duration: 7
          }
        ]
      },
      {
        title: 'Italian Cooking Masterclass',
        description: 'Master the art of Italian cuisine with authentic recipes and techniques.',
        category: 'Culinary',
        duration: 32,
        instructor: instructor._id,
        price: 79.99,
        isActive: true,
        rating: { average: 4.8, count: 42 },
        enrolledStudents: [],
        tags: ['cooking', 'italian', 'culinary'],
        learningObjectives: [
          'Master essential Italian cooking techniques',
          'Prepare authentic pasta dishes from scratch',
          'Understand Italian ingredients and flavor profiles',
          'Create complete multi-course Italian meals'
        ],
        prerequisites: ['Basic kitchen safety knowledge', 'Interest in cooking'],
        lessons: [
          {
            title: 'Introduction to Italian Cuisine',
            description: 'History and regional variations of Italian food.',
            duration: 3
          },
          {
            title: 'Pasta Making Basics',
            description: 'How to make fresh pasta dough and shapes.',
            duration: 5
          },
          {
            title: 'Classic Sauces and Risottos',
            description: 'Tomato sauce, pesto, and creamy risotto recipes.',
            duration: 6
          },
          {
            title: 'Main Dishes: Meat and Seafood',
            description: 'Osso buco, seafood linguine, and more.',
            duration: 8
          },
          {
            title: 'Desserts and Wine Pairing',
            description: 'Tiramisu, gelato, and Italian wine basics.',
            duration: 5
          },
          {
            title: 'Final Project: Italian Feast',
            description: 'Prepare a complete 4-course Italian meal.',
            duration: 5
          }
        ]
      },
      {
        title: 'Digital Art Fundamentals',
        description: 'Learn digital art techniques using modern software and tools.',
        category: 'Arts',
        duration: 28,
        instructor: instructor._id,
        price: 59.99,
        isActive: true,
        rating: { average: 4.3, count: 18 },
        enrolledStudents: [],
        tags: ['digital art', 'design', 'creative'],
        learningObjectives: [
          'Master digital drawing tools and brushes',
          'Understand color theory in digital medium',
          'Create professional digital illustrations',
          'Learn composition and perspective techniques'
        ],
        prerequisites: ['Basic computer skills', 'Interest in art'],
        lessons: [
          {
            title: 'Digital Art Setup',
            description: 'Choosing software, tablets, and workspace setup.',
            duration: 2
          },
          {
            title: 'Basic Drawing Tools',
            description: 'Brushes, layers, and selection tools.',
            duration: 4
          },
          {
            title: 'Color Theory and Palettes',
            description: 'Understanding color harmony and digital color modes.',
            duration: 5
          },
          {
            title: 'Digital Illustration Techniques',
            description: 'Line art, shading, and texturing.',
            duration: 6
          },
          {
            title: 'Composition and Perspective',
            description: 'Creating depth and visual interest.',
            duration: 5
          },
          {
            title: 'Project: Digital Portrait',
            description: 'Create a complete digital artwork from sketch to finish.',
            duration: 6
          }
        ]
      },
      {
        title: 'Web Development with React',
        description: 'Build modern web applications using React and JavaScript.',
        category: 'Technology',
        duration: 40,
        instructor: instructor._id,
        price: 99.99,
        isActive: true,
        rating: { average: 4.7, count: 67 },
        enrolledStudents: [],
        tags: ['web development', 'react', 'javascript'],
        learningObjectives: [
          'Understand React fundamentals and component architecture',
          'Build interactive UIs with state management',
          'Integrate APIs and handle data fetching',
          'Deploy React applications to production'
        ],
        prerequisites: ['Basic HTML/CSS/JavaScript knowledge'],
        lessons: [
          {
            title: 'React Introduction',
            description: 'What is React? Setting up development environment.',
            duration: 3
          },
          {
            title: 'Components and Props',
            description: 'Creating reusable components and passing data.',
            duration: 5
          },
          {
            title: 'State and Event Handling',
            description: 'Managing component state and user interactions.',
            duration: 6
          },
          {
            title: 'Hooks and Functional Components',
            description: 'useState, useEffect, and custom hooks.',
            duration: 7
          },
          {
            title: 'Routing with React Router',
            description: 'Navigation and protected routes.',
            duration: 5
          },
          {
            title: 'API Integration',
            description: 'Fetching data, error handling, and loading states.',
            duration: 6
          },
          {
            title: 'State Management with Context',
            description: 'Global state and authentication.',
            duration: 4
          },
          {
            title: 'Project: Build a Full-Stack App',
            description: 'Complete web application with all concepts.',
            duration: 4
          }
        ]
      },
      {
        title: 'Business Strategy Essentials',
        description: 'Learn fundamental business strategies for startups and entrepreneurs.',
        category: 'Business',
        duration: 36,
        instructor: instructor._id,
        price: 89.99,
        isActive: true,
        rating: { average: 4.4, count: 33 },
        enrolledStudents: [],
        tags: ['business', 'strategy', 'entrepreneurship'],
        learningObjectives: [
          'Develop comprehensive business plans',
          'Understand market analysis and competitive positioning',
          'Learn financial planning and budgeting',
          'Master strategic decision-making processes'
        ],
        prerequisites: ['Basic business knowledge recommended'],
        lessons: [
          {
            title: 'Business Planning Fundamentals',
            description: 'Creating mission, vision, and business model canvas.',
            duration: 4
          },
          {
            title: 'Market Research and Analysis',
            description: 'Customer segmentation, competitor analysis, SWOT.',
            duration: 6
          },
          {
            title: 'Financial Planning',
            description: 'Budgeting, forecasting, and funding strategies.',
            duration: 7
          },
          {
            title: 'Marketing and Sales Strategy',
            description: 'Digital marketing, sales funnels, customer acquisition.',
            duration: 6
          },
          {
            title: 'Operations and Management',
            description: 'Team building, operations optimization, scaling.',
            duration: 5
          },
          {
            title: 'Risk Management and Strategy',
            description: 'Identifying risks, contingency planning, pivoting.',
            duration: 4
          },
          {
            title: 'Case Studies and Projects',
            description: 'Real-world business case analysis and planning.',
            duration: 4
          }
        ]
      },
      {
        title: 'Mindful Living and Wellness',
        description: 'Discover techniques for mindful living and personal wellness.',
        category: 'Lifestyle',
        duration: 20,
        instructor: instructor._id,
        price: 39.99,
        isActive: true,
        rating: { average: 4.6, count: 29 },
        enrolledStudents: [],
        tags: ['mindfulness', 'wellness', 'lifestyle'],
        learningObjectives: [
          'Practice daily mindfulness meditation techniques',
          'Develop stress management and emotional regulation skills',
          'Create personalized wellness routines',
          'Understand the science behind mindfulness practices'
        ],
        prerequisites: ['Open mind and willingness to practice'],
        lessons: [
          {
            title: 'Introduction to Mindfulness',
            description: 'What is mindfulness? Benefits and science.',
            duration: 2
          },
          {
            title: 'Basic Meditation Practices',
            description: 'Breath awareness, body scan, and loving-kindness meditation.',
            duration: 4
          },
          {
            title: 'Mindful Living in Daily Life',
            description: 'Applying mindfulness to eating, walking, and working.',
            duration: 3
          },
          {
            title: 'Stress Management Techniques',
            description: 'Coping strategies, relaxation exercises, and journaling.',
            duration: 4
          },
          {
            title: 'Building Wellness Habits',
            description: 'Creating routines, goal setting, and habit tracking.',
            duration: 3
          },
          {
            title: 'Advanced Practices',
            description: 'Visualization, gratitude practice, and self-compassion.',
            duration: 2
          },
          {
            title: 'Personal Wellness Plan',
            description: 'Design your ongoing mindfulness and wellness practice.',
            duration: 2
          }
        ]
      }
    ];

    // Check if courses already exist
    const existingCourses = await Course.countDocuments();
    if (existingCourses > 0) {
      console.log(`Database already has ${existingCourses} courses. Skipping seed.`);
      return;
    }

    // Insert sample courses
    const createdCourses = await Course.insertMany(sampleCourses);
    console.log(`Successfully created ${createdCourses.length} sample courses`);

    // Enroll the test student in the first 3 courses with different progress
    for (let i = 0; i < 3; i++) {
      const course = createdCourses[i];
      course.enrolledStudents.push({
        student: student._id,
        enrolledAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        progress: i * 33, // 0%, 33%, 66%
        completedLessons: [],
        lastAccessed: new Date()
      });
      await course.save();

      // Create progress record
      const progress = new Progress({
        user: student._id,
        course: course._id,
        progress: i * 33,
        completedLessons: []
      });
      await progress.save();
    }

    // Add some fake enrollments to make the courses look more popular
    for (const course of createdCourses) {
      // Add 5-15 fake enrollments per course (skip test student)
      const enrollmentCount = Math.floor(Math.random() * 11) + 5;
      for (let i = 0; i < enrollmentCount; i++) {
        course.enrolledStudents.push({
          student: new mongoose.Types.ObjectId(), // Fake student ID
          enrolledAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
          progress: Math.floor(Math.random() * 100),
          completedLessons: [],
          lastAccessed: new Date()
        });
      }
      await course.save();
    }

    console.log('Sample courses seeded successfully with test student enrollments!');

  } catch (error) {
    console.error('Error seeding courses:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seedCourses();
