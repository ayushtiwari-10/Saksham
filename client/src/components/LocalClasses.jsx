"use client"

export default function OfflinePage() {
  const guitarClasses = [
    {
      id: 1,
      title: "Khan Guitar Classes",
      instructor: "Sher Nagar",
      distance: "2.5 km away",
      rating: 4.3,
      image: "/knitting-course-colorful-yarn-wool.jpg",
    },
    {
      id: 2,
      title: "Khan Guitar Classes",
      instructor: "Sher Nagar",
      distance: "2.5 km away",
      rating: 4.3,
      image: "/knitting-course-colorful-yarn-wool.jpg",
    },
    {
      id: 3,
      title: "Khan Guitar Classes",
      instructor: "Sher Nagar",
      distance: "2.5 km away",
      rating: 4.3,
      image: "/knitting-course-colorful-yarn-wool.jpg",
    },
    {
      id: 4,
      title: "Khan Guitar Classes",
      instructor: "Sher Nagar",
      distance: "2.5 km away",
      rating: 4.3,
      image: "/knitting-course-colorful-yarn-wool.jpg",
    },
    {
      id: 5,
      title: "Khan Guitar Classes",
      instructor: "Sher Nagar",
      distance: "2.5 km away",
      rating: 4.3,
      image: "/knitting-course-colorful-yarn-wool.jpg",
    },
    {
      id: 6,
      title: "Khan Guitar Classes",
      instructor: "Sher Nagar",
      distance: "2.5 km away",
      rating: 4.3,
      image: "/knitting-course-colorful-yarn-wool.jpg",
    },
  ]

  return (
    <div className="offline-page">
      <div className="content-wrapper">
        <div className="sidebar">
          <div className="location-section">
            <h3>You Location</h3>
            <div className="location">
              <span className="location-icon">📍</span>
              <div>
                <div className="location-name">Sher Nagar,</div>
                <div className="location-city">Jabalpur</div>
              </div>
            </div>
          </div>

          <div className="category-section">
            <h3>Category</h3>
            <div className="category-grid">
              <div className="category-item"></div>
              <div className="category-item"></div>
              <div className="category-item"></div>
              <div className="category-item"></div>
              <div className="category-item"></div>
              <div className="category-item"></div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="classes-grid">
            {guitarClasses.map((guitarClass) => (
              <div key={guitarClass.id} className="class-card">
                <img src={guitarClass.image || "/placeholder.svg"} alt={guitarClass.title} className="class-image" />
                <div className="class-info">
                  <h4 className="class-title">{guitarClass.title}</h4>
                  <div className="class-details">
                    <span className="location-icon">📍</span>
                    <span className="instructor">{guitarClass.instructor}</span>
                    <span className="distance">{guitarClass.distance}</span>
                  </div>
                  <div className="rating-section">
                    <span className="rating">⭐ {guitarClass.rating}</span>
                    <button className="view-btn">View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .offline-page {
          padding: 40px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .content-wrapper {
          display: flex;
          gap: 40px;
        }

        .sidebar {
          width: 300px;
          flex-shrink: 0;
        }

        .location-section, .category-section {
          margin-bottom: 40px;
        }

        .location-section h3, .category-section h3 {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }

        .location {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .location-icon {
          font-size: 20px;
        }

        .location-name {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        .location-city {
          font-size: 14px;
          color: #666;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .category-item {
          width: 80px;
          height: 80px;
          background: #f0f0f0;
          border-radius: 10px;
          border: 2px solid #e0e0e0;
        }

        .main-content {
          flex: 1;
        }

        .classes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .class-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          display: flex;
        }

        .class-image {
          width: 120px;
          height: 120px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .class-info {
          padding: 15px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .class-title {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
        }

        .class-details {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 14px;
          color: #666;
        }

        .instructor {
          font-weight: 500;
        }

        .distance {
          color: #999;
        }

        .rating-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .rating {
          font-size: 14px;
          color: #333;
        }

        .view-btn {
          background: #4caf50;
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 15px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        .view-btn:hover {
          background: #45a049;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
          }
          
          .classes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}