# सक्षम - AI-Powered Learning Platform

A comprehensive learning platform with AI personalization features, designed for learners and educators. Features course management, AI-powered recommendations, progress tracking, and analytics.

## Features

- **AI-Powered Personalization**: Get personalized course recommendations based on learning style, goals, and progress
- **Dual User Roles**: Separate dashboards for Learners and Educators
- **Progress Tracking**: Detailed progress tracking with time spent, quiz scores, and completion status
- **Analytics Dashboard**: Educator analytics including course performance, learner engagement, and completion rates
- **Secure Authentication**: JWT-based authentication with role-based access control
- **Course Management**: Create, update, and manage courses with multimedia content
- **Bookmarking System**: Save favorite courses for later access
- **Real-time Notifications**: Get updates on course progress and new recommendations

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens with role-based access
- **AI Integration**: OpenAI GPT-4 for personalization
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, rate limiting, input validation
- **File Upload**: Multer for multimedia content

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd saksham-platform
   \`\`\`

2. **Install dependencies for all parts**
   \`\`\`bash
   npm run install-all
   \`\`\`

3. **Set up environment variables**
   - Copy `server/.env.example` to `server/.env`
   - Update the MongoDB URI and JWT secret

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/saksham`

5. **Run the application**
   \`\`\`bash
   # Run both frontend and backend concurrently
   npm run dev
   
   # Or run them separately:
   # Backend (from root directory)
   npm run server
   
   # Frontend (from root directory)  
   npm run client
   \`\`\`

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

\`\`\`
saksham-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   └── App.jsx        # Main app component
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── server.js         # Main server file
└── package.json          # Root package.json
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course (auth required)
- `POST /api/courses/:id/enroll` - Enroll in course (auth required)

### Users
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update user profile (auth required)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
