"use client"

import { useRef } from "react"

export default function HomePage({ onCourseClick }) {
  const categories = ["New", "Trending", "Popular", "Top Courses"]
  const coursesRef = useRef(null)
  const recommendedRef = useRef(null)
  const trendingRef = useRef(null)
  const popularRef = useRef(null)
  const topCoursesRef = useRef(null)

  const courses = [
    { id: 1, title: "Marketing", image: "/placeholder-gsq2b.png", price: "Free" },
    { id: 2, title: "Marketing", image: "/placeholder-gsq2b.png", price: "Free" },
    { id: 3, title: "Marketing", image: "/placeholder-gsq2b.png", price: "Free" },
    { id: 4, title: "Marketing", image: "/placeholder-gsq2b.png", price: "Free" },
    { id: 5, title: "Marketing", image: "/placeholder-gsq2b.png", price: "Free" },
    { id: 6, title: "Marketing", image: "/placeholder-gsq2b.png", price: "Free" },
  ]

  const scrollLeft = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const scrollRecommendedLeft = () => {
    if (recommendedRef.current) {
      recommendedRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRecommendedRight = () => {
    if (recommendedRef.current) {
      recommendedRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const scrollTrendingLeft = () => {
    if (trendingRef.current) {
      trendingRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollTrendingRight = () => {
    if (trendingRef.current) {
      trendingRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const scrollPopularLeft = () => {
    if (popularRef.current) {
      popularRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollPopularRight = () => {
    if (popularRef.current) {
      popularRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const scrollTopCoursesLeft = () => {
    if (topCoursesRef.current) {
      topCoursesRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollTopCoursesRight = () => {
    if (topCoursesRef.current) {
      topCoursesRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const recommendedCourses = [
    { id: 7, title: "Marketing", image: "/placeholder-gsq2b.png" },
    { id: 8, title: "Marketing", image: "/placeholder-gsq2b.png" },
    { id: 9, title: "Marketing", image: "/placeholder-gsq2b.png" },
    { id: 10, title: "Marketing", image: "/placeholder-gsq2b.png" },
    { id: 11, title: "Marketing", image: "/placeholder-gsq2b.png" },
    { id: 12, title: "Marketing", image: "/placeholder-gsq2b.png" },
  ]

  const trendingCourses = [
    { id: 13, title: "Web Development", image: "/placeholder-gsq2b.png", price: "$49" },
    { id: 14, title: "Data Science", image: "/placeholder-gsq2b.png", price: "$79" },
    { id: 15, title: "UI/UX Design", image: "/placeholder-gsq2b.png", price: "$39" },
    { id: 16, title: "Mobile Development", image: "/placeholder-gsq2b.png", price: "$59" },
    { id: 17, title: "Digital Marketing", image: "/placeholder-gsq2b.png", price: "$29" },
    { id: 18, title: "Photography", image: "/placeholder-gsq2b.png", price: "$35" },
  ]

  const popularCourses = [
    { id: 19, title: "Python Programming", image: "/placeholder-gsq2b.png", price: "$69" },
    { id: 20, title: "Graphic Design", image: "/placeholder-gsq2b.png", price: "$45" },
    { id: 21, title: "Business Analytics", image: "/placeholder-gsq2b.png", price: "$89" },
    { id: 22, title: "Content Writing", image: "/placeholder-gsq2b.png", price: "$25" },
    { id: 23, title: "Video Editing", image: "/placeholder-gsq2b.png", price: "$55" },
    { id: 24, title: "SEO Optimization", image: "/placeholder-gsq2b.png", price: "$35" },
  ]

  const topCourses = [
    { id: 25, title: "Machine Learning", image: "/placeholder-gsq2b.png", price: "$99" },
    { id: 26, title: "Blockchain", image: "/placeholder-gsq2b.png", price: "$129" },
    { id: 27, title: "Cybersecurity", image: "/placeholder-gsq2b.png", price: "$89" },
    { id: 28, title: "Cloud Computing", image: "/placeholder-gsq2b.png", price: "$79" },
    { id: 29, title: "DevOps", image: "/placeholder-gsq2b.png", price: "$95" },
    { id: 30, title: "AI Development", image: "/placeholder-gsq2b.png", price: "$149" },
  ]

  return (
    <main className="homepage">
      <div className="dashboard-header">
        <div className="welcome-section">
          <div className="user-avatar">P</div>
          <h1>Welcome! <strong>Priyanshi</strong></h1>
        </div>
        <div className="role-select">
          <label htmlFor="role">Role: </label>
          <select id="role" name="role" defaultValue="student">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="nav-search-container">
          <nav className="main-nav">
            <ul>
              <li className="active">Home</li>
              <li>My Library</li>
              <li>Offline</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </nav>
          <div className="search-bar">
            <input type="text" placeholder="Search courses..." />
            <button aria-label="Search">
              🔍
            </button>
          </div>
        </div>
      </div>

      <div className="categories-section">
        <div className="categories">
          {categories.map((category, index) => (
            <button key={index} className={`category-btn ${index === 0 ? "active" : ""}`}>
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="courses-section">
        <button className="nav-arrow left" onClick={scrollLeft}>
          ←
        </button>
        <div className="courses-grid" ref={coursesRef}>
          {courses.map((course) => (
            <div key={course.id} className="course-card" onClick={() => onCourseClick(course)}>
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
              <div className="course-info">
                <h3 className="course-title">{course.title}</h3>
                <span className="course-price">{course.price}</span>
              </div>
              <button className="view-btn">View</button>
            </div>
          ))}
        </div>
        <button className="nav-arrow right" onClick={scrollRight}>
          →
        </button>
      </div>

      <section className="recommended-section">
        <h2 className="section-title">RECOMMENDED FOR YOU</h2>
        <div className="courses-section">
          <button className="nav-arrow left" onClick={scrollRecommendedLeft}>
            ←
          </button>
          <div className="courses-grid" ref={recommendedRef}>
            {recommendedCourses.map((course) => (
              <div key={course.id} className="course-card" onClick={() => onCourseClick(course)}>
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
                <div className="course-info">
                  <h3 className="course-title">{course.title}</h3>
                </div>
                <button className="view-btn">View</button>
              </div>
            ))}
          </div>
          <button className="nav-arrow right" onClick={scrollRecommendedRight}>
            →
          </button>
        </div>
      </section>

      <section className="recommended-section">
        <h2 className="section-title">TRENDING</h2>
        <div className="courses-section">
          <button className="nav-arrow left" onClick={scrollTrendingLeft}>
            ←
          </button>
          <div className="courses-grid" ref={trendingRef}>
            {trendingCourses.map((course) => (
              <div key={course.id} className="course-card" onClick={() => onCourseClick(course)}>
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
                <div className="course-info">
                  <h3 className="course-title">{course.title}</h3>
                  <span className="course-price">{course.price}</span>
                </div>
                <button className="view-btn">View</button>
              </div>
            ))}
          </div>
          <button className="nav-arrow right" onClick={scrollTrendingRight}>
            →
          </button>
        </div>
      </section>

      <section className="recommended-section">
        <h2 className="section-title">POPULAR</h2>
        <div className="courses-section">
          <button className="nav-arrow left" onClick={scrollPopularLeft}>
            ←
          </button>
          <div className="courses-grid" ref={popularRef}>
            {popularCourses.map((course) => (
              <div key={course.id} className="course-card" onClick={() => onCourseClick(course)}>
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
                <div className="course-info">
                  <h3 className="course-title">{course.title}</h3>
                  <span className="course-price">{course.price}</span>
                </div>
                <button className="view-btn">View</button>
              </div>
            ))}
          </div>
          <button className="nav-arrow right" onClick={scrollPopularRight}>
            →
          </button>
        </div>
      </section>

      <section className="recommended-section">
        <h2 className="section-title">TOP COURSES</h2>
        <div className="courses-section">
          <button className="nav-arrow left" onClick={scrollTopCoursesLeft}>
            ←
          </button>
          <div className="courses-grid" ref={topCoursesRef}>
            {topCourses.map((course) => (
              <div key={course.id} className="course-card" onClick={() => onCourseClick(course)}>
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
                <div className="course-info">
                  <h3 className="course-title">{course.title}</h3>
                  <span className="course-price">{course.price}</span>
                </div>
                <button className="view-btn">View</button>
              </div>
            ))}
          </div>
          <button className="nav-arrow right" onClick={scrollTopCoursesRight}>
            →
          </button>
        </div>
      </section>

      <style jsx>{`
        .homepage {
          padding: 30px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .categories-section {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
        }

        .categories {
          display: flex;
          gap: 15px;
        }

        .category-btn {
          background: #b8e6b8;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          color: #1a4d1a;
          font-weight: 600;
        }

        .category-btn.active {
          background: #2d8a7a;
          color: white;
        }

        .courses-section {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 50px;
          position: relative;
        }

        .nav-arrow {
          background: #e0e0e0;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 2;
        }

        .nav-arrow:hover {
          background: #d0d0d0;
        }

        .courses-grid {
          display: flex;
          gap: 25px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 10px 0;
          flex: 1;
        }

        .courses-grid::-webkit-scrollbar {
          display: none;
        }

        .course-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.3s;
          min-width: 280px;
          flex-shrink: 0;
        }

        .course-card:hover {
          transform: translateY(-5px);
        }

        .course-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .course-info {
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .course-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .course-price {
          color: #666;
          font-size: 14px;
        }

        .view-btn {
          background: #2d8a7a;
          color: white;
          border: none;
          padding: 8px 25px;
          border-radius: 15px;
          margin: 0 15px 15px;
          cursor: pointer;
          font-weight: 600;
        }

        .recommended-section {
          margin-top: 40px;
        }

        .section-title {
          font-size: 28px;
          font-weight: bold;
          color: #333;
          text-align: center;
          margin-bottom: 30px;
        }

        .recommended-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.3s;
        }

        .recommended-card:hover {
          transform: translateY(-3px);
        }

        .recommended-image {
          width: 100%;
          height: 120px;
          object-fit: cover;
        }

        .recommended-info {
          padding: 12px;
        }

        .recommended-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
      `}</style>
    </main>
  )
}