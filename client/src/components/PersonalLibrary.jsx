"use client"
import { useState } from "react"

export default function MyLibraryPage() {
  const [activeTab, setActiveTab] = useState("active")

  const courses = [
    {
      id: 1,
      title: "knitting",
      progress: 30,
      image: "/knitting-course-colorful-yarn-wool.jpg",
    },
    {
      id: 2,
      title: "knitting",
      progress: 30,
      image: "/knitting-course-colorful-yarn-wool.jpg",
    },
    {
      id: 3,
      title: "knitting",
      progress: 30,
      image: "/knitting-course-colorful-yarn-wool.jpg",
    },
  ]

  return (
    <div className="my-library-page">
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number">4</div>
          <div className="stat-label">active course</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">10</div>
          <div className="stat-label">completed course</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">6</div>
          <div className="stat-label">saved for later</div>
        </div>
      </div>

      <div className="courses-section">
        <h2>Your courses</h2>
        <div className="course-tabs">
          <button className={`tab ${activeTab === "active" ? "active" : ""}`} onClick={() => setActiveTab("active")}>
            Active
          </button>
          <button
            className={`tab ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            completed
          </button>
          <button className={`tab ${activeTab === "saved" ? "active" : ""}`} onClick={() => setActiveTab("saved")}>
            saved
          </button>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
              <div className="course-info">
                <h3 className="course-title">{course.title}</h3>
                <div className="progress-info">{course.progress}%</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                </div>
                <button className="continue-btn">Continue</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .my-library-page {
          padding: 40px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-section {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 30px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          min-width: 150px;
        }

        .stat-number {
          font-size: 48px;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 14px;
          color: #666;
          text-transform: lowercase;
        }

        .courses-section h2 {
          font-size: 32px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }

        .course-tabs {
          display: flex;
          gap: 0;
          margin-bottom: 30px;
          background: #e8f5e8;
          border-radius: 25px;
          padding: 5px;
          width: fit-content;
        }

        .tab {
          background: none;
          border: none;
          padding: 12px 25px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 16px;
          color: #666;
          transition: all 0.3s;
        }

        .tab.active {
          background: #4caf50;
          color: white;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .course-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .course-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .course-info {
          padding: 20px;
        }

        .course-title {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
          text-transform: lowercase;
        }

        .progress-info {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e0e0e0;
          border-radius: 4px;
          margin-bottom: 15px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #4caf50;
          border-radius: 4px;
          transition: width 0.3s;
        }

        .continue-btn {
          background: #4caf50;
          color: white;
          border: none;
          padding: 10px 25px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        .continue-btn:hover {
          background: #45a049;
        }
      `}</style>
    </div>
  )
}