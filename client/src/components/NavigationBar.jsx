"use client"

export default function Header({ onNavigation, currentPage }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="profile-section">
          <div className="profile-image"></div>
          <div className="welcome-text">
            <div className="welcome">Welcome!</div>
            <div className="abc">ABC</div>
          </div>
        </div>

        <nav className="navigation">
          <button onClick={() => onNavigation("home")} className={`nav-btn ${currentPage === "home" ? "active" : ""}`}>
            Home
          </button>
          <button
            onClick={() => onNavigation("library")}
            className={`nav-btn ${currentPage === "library" ? "active" : ""}`}
          >
            My Library
          </button>
          <button
            onClick={() => onNavigation("offline")}
            className={`nav-btn ${currentPage === "offline" ? "active" : ""}`}
          >
            Offline
          </button>
          <button
            onClick={() => onNavigation("about")}
            className={`nav-btn ${currentPage === "about" ? "active" : ""}`}
          >
            About
          </button>
          <button
            onClick={() => onNavigation("contact")}
            className={`nav-btn ${currentPage === "contact" ? "active" : ""}`}
          >
            Contact
          </button>
          <div className="search-container">
            <input
              type="text"
              placeholder={
                currentPage === "library"
                  ? "Search your class"
                  : currentPage === "offline"
                    ? "Search a Category"
                    : "Search category"
              }
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </nav>

        <div className="social-icons">
          <div className="social-icon cart">🛒</div>
          <div className="social-icon google">G</div>
          <div className="social-icon message">💬</div>
          <div className="social-icon facebook">f</div>
          <div className="social-icon twitter">🐦</div>
        </div>
      </div>

      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/abstract-teal-turquoise-gradient-background-textur.jpg');
          opacity: 0.3;
          z-index: 0;
        }

        .header-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
        }

        .profile-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .profile-image {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #e0e0e0;
          border: 3px solid white;
        }

        .welcome-text {
          background: rgba(0, 0, 0, 0.3);
          padding: 10px 15px;
          border-radius: 10px;
          backdrop-filter: blur(5px);
        }

        .welcome {
          font-size: 24px;
          font-weight: normal;
          margin-bottom: 5px;
          color: #ffffff;
        }

        .abc {
          font-size: 32px;
          font-weight: bold;
          color: #ffffff;
        }

        .navigation {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.95);
          padding: 8px 15px;
          border-radius: 25px;
        }

        .nav-btn {
          background: none;
          border: none;
          padding: 8px 15px;
          border-radius: 15px;
          cursor: pointer;
          font-size: 14px;
          color: #333333;
          font-weight: 500;
          transition: all 0.3s;
        }

        .nav-btn:hover {
          background-color: #f0f0f0;
          color: #000000;
        }

        .nav-btn.active {
          background-color: #2d8a7a;
          color: #ffffff;
        }

        .search-container {
          position: relative;
          margin-left: 10px;
        }

        .search-input {
          padding: 8px 35px 8px 15px;
          border: none;
          border-radius: 15px;
          background: white;
          font-size: 14px;
          width: 200px;
        }

        .search-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }

        .social-icons {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .social-icon {
          width: 45px;
          height: 45px;
          background: white;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .social-icon.cart {
          font-size: 18px;
        }

        .social-icon.google {
          color: #4285f4;
          font-size: 20px;
          font-weight: bold;
        }

        .social-icon.message {
          font-size: 18px;
        }

        .social-icon.facebook {
          color: #1877f2;
          font-size: 20px;
          font-weight: bold;
        }

        .social-icon.twitter {
          font-size: 16px;
        }
      `}</style>
    </header>
  )
}