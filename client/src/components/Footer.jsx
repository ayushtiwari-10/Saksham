import { Link } from "react-router-dom"
import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h2>सक्षम</h2>
              <p>Empowering women through skill development and entrepreneurship</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">
                📘
              </a>
              <a href="#" className="social-link">
                📷
              </a>
              <a href="#" className="social-link">
                🐦
              </a>
              <a href="#" className="social-link">
                💼
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/courses">Browse Courses</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              <li>
                <Link to="/barter">Barter Exchange</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="#help">Help Center</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Get Started</h3>
            <p>Join thousands of women building their skills and businesses</p>
            <div className="footer-actions">
              <Link to="/signup" className="btn btn-primary">
                Start Learning
              </Link>
              <Link to="/teach" className="btn btn-secondary">
                Start Teaching
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-decorative">
            <div className="decorative-element element-1"></div>
            <div className="decorative-element element-2"></div>
            <div className="decorative-element element-3"></div>
          </div>
          <p>&copy; 2024 सक्षम Platform. Made with ❤️ for empowering women.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
