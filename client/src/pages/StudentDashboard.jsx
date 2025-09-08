"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'
import "./StudentDashboard.css"

const StudentDashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [selectedRole, setSelectedRole] = useState("Student")
  const [activePage, setActivePage] = useState("Home")
  const [activeTab, setActiveTab] = useState("Active")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const userData = {
    firstName: user?.name?.split(" ")[0] || "User",
    lastName: user?.name?.split(" ")[1] || "",
    profileImage: user?.profileImage || null,
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const generateInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const generateRandomColor = () => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleProfileClick = () => {
    navigate("/profile")
  }

  const handleRoleChange = (e) => {
    const newRole = e.target.value
    setSelectedRole(newRole)
    if (newRole === "Teacher") {
      navigate("/teacher-dashboard")
    }
  }

  const handleNavClick = (page) => {
    setActivePage(page)
    setIsMenuOpen(false) // Close menu on mobile after navigation
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const scrollLeft = (containerId) => {
    const container = document.getElementById(containerId)
    container.scrollBy({ left: -300, behavior: "smooth" })
  }

  const scrollRight = (containerId) => {
    const container = document.getElementById(containerId)
    container.scrollBy({ left: 300, behavior: "smooth" })
  }

  const courseData = [
    {
      title: "Marketing",
      duration: "72hr",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    },
    {
      title: "Knitting",
      duration: "72hr",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    },
    {
      title: "Marketing",
      duration: "72hr",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    },
    {
      title: "Marketing",
      duration: "72hr",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    },
    {
      title: "Marketing",
      duration: "72hr",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    },
    {
      title: "Marketing",
      duration: "72hr",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    },
  ]

  const knittingData = [
    {
      title: "Knitting",
      duration: "72hr",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    },
    {
      title: "Knitting",
      duration: "72hr",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    },
    {
      title: "Knitting",
      duration: "72hr",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    },
    {
      title: "Knitting",
      duration: "72hr",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    },
    {
      title: "Knitting",
      duration: "72hr",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    },
    {
      title: "Knitting",
      duration: "72hr",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    },
  ]

  const myLibraryCourses = [
    {
      title: "Knitting",
      progress: 30,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    },
    {
      title: "Knitting",
      progress: 30,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    },
    {
      title: "Knitting",
      progress: 30,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    },
  ]

  const locationCourses = [
    {
      title: "Khan Guitar Classes",
      location: "Near Shastri Bridge",
      distance: "2.5 km away",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    },
    {
      title: "Khan Guitar Classes",
      location: "Near Shastri Bridge",
      distance: "2.5 km away",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    },
    {
      title: "Khan Guitar Classes",
      location: "Near Shastri Bridge",
      distance: "2.5 km away",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    },
    {
      title: "Khan Guitar Classes",
      location: "Near Shastri Bridge",
      distance: "2.5 km away",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    },
    {
      title: "Khan Guitar Classes",
      location: "Near Shastri Bridge",
      distance: "2.5 km away",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    },
    {
      title: "Khan Guitar Classes",
      location: "Near Shastri Bridge",
      distance: "2.5 km away",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    },
  ]

  const renderHomePage = () => (
    <>
      <div className="category-filter">
        <button className="category-btn active">New</button>
        <button className="category-btn">Trending</button>
        <button className="category-btn">Popular</button>
        <button className="category-btn">Top Courses</button>
        <button className="category-btn"></button>
        <button className="category-btn"></button>
      </div>

      <div className="main-content">
        <section className="course-section">
          <h2 className="section-title">MOST POPULAR</h2>
          <div className="scroll-container">
            <button className="scroll-btn left" onClick={() => scrollLeft("popular-courses")}>
              ‹
            </button>
            <div className="course-grid" id="popular-courses">
              {courseData.map((course, index) => (
                <div key={index} className="course-card">
                  <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
                  <div className="course-info">
                    <h3 className="course-title">{course.title}</h3>
                    <span className="course-duration">{course.duration}</span>
                  </div>
                  <button className="view-btn">View</button>
                </div>
              ))}
            </div>
            <button className="scroll-btn right" onClick={() => scrollRight("popular-courses")}>
              ›
            </button>
          </div>
        </section>

        <section className="course-section">
          <h2 className="section-title">RECOMMENDED FOR YOU</h2>
          <div className="scroll-container">
            <button className="scroll-btn left" onClick={() => scrollLeft("recommended-courses")}>
              ‹
            </button>
            <div className="course-grid" id="recommended-courses">
              {knittingData.map((course, index) => (
                <div key={index} className="course-card">
                  <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
                  <div className="course-info">
                    <h3 className="course-title">{course.title}</h3>
                    <span className="course-duration">{course.duration}</span>
                  </div>
                  <button className="view-btn">View</button>
                </div>
              ))}
            </div>
            <button className="scroll-btn right" onClick={() => scrollRight("recommended-courses")}>
              ›
            </button>
          </div>
        </section>
      </div>
    </>
  )

  const getFilteredCourses = () => {
    switch (activeTab) {
      case "Active":
        return myLibraryCourses
      case "completed":
        return [
          {
            title: "Web Development",
            progress: 100,
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
          },
          {
            title: "Digital Marketing",
            progress: 100,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
          },
        ]
      case "saved":
        return [
          {
            title: "Photography",
            progress: 0,
            image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop",
          },
          {
            title: "Graphic Design",
            progress: 0,
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
          },
          {
            title: "Music Production",
            progress: 0,
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
          },
        ]
      default:
        return myLibraryCourses
    }
  }

  const renderMyLibrary = () => (
    <div className="main-content">
      <div className="course-stats">
        <div className="stat-item">
          <div className="stat-number">4</div>
          <div className="stat-label">active course</div>
        </div>
        <div className="stat-divider">|</div>
        <div className="stat-item">
          <div className="stat-number">10</div>
          <div className="stat-label">completed course</div>
        </div>
        <div className="stat-divider">|</div>
        <div className="stat-item">
          <div className="stat-number">6</div>
          <div className="stat-label">saved for later</div>
        </div>
      </div>

      <div className="your-courses-section">
        <h2 className="section-title">Your courses</h2>
        <div className="course-tabs">
          <button
            className={`course-tab ${activeTab === "Active" ? "active" : ""}`}
            onClick={() => handleTabClick("Active")}
          >
            Active
          </button>
          <button
            className={`course-tab ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => handleTabClick("completed")}
          >
            completed
          </button>
          <button
            className={`course-tab ${activeTab === "saved" ? "active" : ""}`}
            onClick={() => handleTabClick("saved")}
          >
            saved
          </button>
        </div>

        <div className="my-library-grid">
          {getFilteredCourses().map((course, index) => (
            <div key={index} className="my-library-card">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
              <div className="course-info">
                <h3 className="course-title">{course.title}</h3>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <span className="progress-text">{course.progress}%</span>
                </div>
              </div>
              <button className="continue-btn">
                {activeTab === "completed" ? "Review" : activeTab === "saved" ? "Start" : "Continue"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderLocationPage = () => (
    <div className="main-content location-page">
      <div className="location-sidebar">
        <div className="location-section">
          <h3 className="location-title">You Location</h3>
          <div className="location-info">
            <span className="location-icon">📍</span>
            <div className="location-text">
              <div className="location-name">Shakti Nagar,</div>
              <div className="location-city">Jabalpur</div>
            </div>
          </div>
        </div>

        <div className="category-section">
          <h3 className="category-title">Category</h3>
          <div className="category-filters">
            <div className="category-filter-box"></div>
            <div className="category-filter-box"></div>
            <div className="category-filter-box"></div>
            <div className="category-filter-box"></div>
            <div className="category-filter-box"></div>
            <div className="category-filter-box"></div>
          </div>
        </div>
      </div>

      <div className="location-courses">
        <div className="location-course-grid">
          {locationCourses.map((course, index) => (
            <div key={index} className="location-course-card">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="location-course-image" />
              <div className="location-course-info">
                <h3 className="location-course-title">{course.title}</h3>
                <div className="location-details">
                  <span className="location-icon">📍</span>
                  <span className="location-text">{course.location}</span>
                  <span className="distance-text">{course.distance}</span>
                </div>
                <div className="rating-section">
                  <span className="star">⭐</span>
                  <span className="rating">{course.rating}</span>
                </div>
              </div>
              <button className="location-view-btn">View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="student-dashboard">
      <nav className="navbar">
        <div className="navbar-left">
          <div className="profile-section">
            <div
              className="profile-avatar"
              onClick={handleProfileClick}
              style={{
                backgroundImage: userData.profileImage ? `url(${userData.profileImage})` : "none",
                backgroundColor: userData.profileImage ? "transparent" : generateRandomColor(),
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              {!userData.profileImage && generateInitials(userData.firstName, userData.lastName)}
            </div>
            <span className="welcome-text">Welcome!</span>
            <span className="username">{userData.firstName}</span>
          </div>
          <div className="role-dropdown">
            <select value={selectedRole} onChange={handleRoleChange}>
              <option value="Student">Role: Student</option>
              <option value="Teacher">Role: Teacher</option>
            </select>
          </div>
        </div>

        <div className="navbar-center">
          <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <a
              href="#"
              className={`nav-link ${activePage === "Home" ? "active" : ""}`}
              onClick={() => handleNavClick("Home")}
            >
              Home
            </a>
            <a
              href="#"
              className={`nav-link ${activePage === "My Library" ? "active" : ""}`}
              onClick={() => handleNavClick("My Library")}
            >
              My Library
            </a>
            <a
              href="#"
              className={`nav-link ${activePage === "Offline" ? "active" : ""}`}
              onClick={() => handleNavClick("Offline")}
            >
              Offline
            </a>
            <a
              href="#"
              className={`nav-link ${activePage === "About" ? "active" : ""}`}
              onClick={() => handleNavClick("About")}
            >
              About
            </a>
            <a
              href="#"
              className={`nav-link ${activePage === "Contact" ? "active" : ""}`}
              onClick={() => handleNavClick("Contact")}
            >
              Contact
            </a>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder={
                activePage === "Home"
                  ? "Search category"
                  : activePage === "My Library"
                    ? "Search your class"
                    : "Search a Category"
              }
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        <div className="navbar-right">
          <div className="social-icons">
            <div className="icon cart-icon">🛒</div>
            <div className="icon">G</div>
            <div className="icon">💬</div>
            <div className="icon">f</div>
            <div className="icon">🐦</div>
            <div className="icon logout-icon" onClick={() => { logout(); navigate('/login'); }} title="Logout">🚪</div>
          </div>
        </div>
      </nav>

      {activePage === "Home" && renderHomePage()}
      {activePage === "My Library" && renderMyLibrary()}
      {activePage === "Offline" && renderLocationPage()}
    </div>
  )
}

export default StudentDashboard
