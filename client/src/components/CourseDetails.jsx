


"use client"

export default function CoursePage({ course, onBack }) {
  const courses = [
    {
      id: 1,
      title: "Marketing",
      description:
        "Learn the basics of digital marketing including social media marketing, email marketing, and content marketing strategies.",
      image: "/placeholder-gsq2b.png",
    },
    {
      id: 2,
      title: "Knitting",
      description:
        "Master the art of knitting with step-by-step tutorials covering basic stitches, patterns, and advanced techniques.",
      image: "/knitting-course-colorful-yarn-wool.jpg",
    },
    {
      id: 3,
      title: "Knitting",
      description:
        "Advanced knitting techniques including cable knitting, colorwork, and creating complex patterns for sweaters and accessories.",
      image: "/knitting-course-colorful-yarn-wool.jpg",
    },
    {
      id: 4,
      title: "Knitting",
      description:
        "Professional knitting course covering garment construction, sizing, and finishing techniques for commercial projects.",
      image: "/knitting-course-colorful-yarn-wool.jpg",
    },
  ]

  return (
    <div className="course-page">
      <div className="course-header">
        <button onClick={onBack} className="back-btn">
          ← Back
        </button>
        <div className="header-content">
          <h1 className="course-category">Marketing</h1>
          <span className="course-count">10 courses</span>
        </div>
      </div>

      <div className="course-list">
        {courses.map((courseItem) => (
          <div key={courseItem.id} className="course-item">
            <img src={courseItem.image || "/placeholder.svg"} alt={courseItem.title} className="course-thumbnail" />
            <div className="course-details">
              <h3 className="course-name">{courseItem.title}</h3>
              <p className="course-description">{courseItem.description}</p>
              <button className="view-course-btn">View</button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .course-page {
          min-height: 100vh;
          background: #f5f5f5;
        }

        .course-header {
          background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
          padding: 30px 20px;
          position: relative;
        }

        .back-btn {
          background: none;
          border: none;
          font-size: 16px;
          color: #2c5530;
          cursor: pointer;
          margin-bottom: 15px;
          font-weight: 500;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 800px;
        }

        .course-category {
          font-size: 48px;
          font-weight: bold;
          color: #2c5530;
          margin: 0;
        }

        .course-count {
          font-size: 24px;
          color: #2c5530;
          font-weight: 600;
        }

        .course-list {
          padding: 30px 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .course-item {
          background: white;
          border-radius: 15px;
          padding: 20px;
          margin-bottom: 20px;
          display: flex;
          gap: 20px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          align-items: center;
        }

        .course-thumbnail {
          width: 120px;
          height: 80px;
          border-radius: 10px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .course-details {
          flex: 1;
        }

        .course-name {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin: 0 0 10px 0;
        }

        .course-description {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin: 0 0 15px 0;
        }

        .view-course-btn {
          background: #4ecdc4;
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
        }

        .view-course-btn:hover {
          background: #44a08d;
        }
      `}</style>
    </div>
  )
}