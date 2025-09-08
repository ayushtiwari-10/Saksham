import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Header from "./components/Header"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Personalization from "./pages/Personalization"
import ForgotPassword from "./pages/ForgotPassword"
import StudentDashboard from "./pages/StudentDashboard"
import TeacherDashboard from "./pages/TeacherDashboard"
import Courses from "./pages/Courses"
import Profile from "./pages/Profile.jsx"
import ChatboxPage from "./components/chatbox"
import MyVideosPage from "./components/my-videos"
import SchedulePage from "./components/schedule"
import ClassDashboard from "./components/class-dashboard"
import MyLibrary from "./pages/MyLibrary"
import LocalClassesPage from "./pages/LocalClasses"
import CourseDetails from "./pages/CourseDetails"
import SurveyForm from "./pages/SurveyForm"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/personalization"
              element={
                <ProtectedRoute>
                  <Personalization />
                </ProtectedRoute>
              }
            />
            <Route
              path="/survey-form"
              element={
                <ProtectedRoute>
                  <SurveyForm />
                </ProtectedRoute>
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher-dashboard"
              element={
                <ProtectedRoute>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbox"
              element={
                <ProtectedRoute>
                  <ChatboxPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-videos"
              element={
                <ProtectedRoute>
                  <MyVideosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <SchedulePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/class-dashboard"
              element={
                <ProtectedRoute>
                  <ClassDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-library"
              element={
                <ProtectedRoute>
                  <MyLibrary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/local-classes"
              element={
                <ProtectedRoute>
                  <LocalClassesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course-details"
              element={
                <ProtectedRoute>
                  <CourseDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
