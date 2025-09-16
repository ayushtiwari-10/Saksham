"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "../styles/Header.css"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  if (["/dashboard", "/class-dashboard", "/student-dashboard"].includes(location.pathname)) {
    return null
  }

  // Nav links
  const publicLinks = [
    { path: "/", label: "Home" },
    { path: "#top-courses", label: "Top Courses" },
    { path: "#mission", label: "Mission" },
    { path: "#faq", label: "FAQ" },
    { path: "#contact", label: "Contact" },
  ]
  const privateLinks = [
    { path: "/courses", label: "Courses" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/profile", label: "Profile" },
  ]

  const navLinks = isAuthenticated ? [...publicLinks, ...privateLinks] : publicLinks

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
            <h1>सक्षम</h1>
          </Link>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            {navLinks.map((link, index) => (
              <Link
                key={link.path || `btn-${index}`}
                to={link.path || "#"}
                className={`nav-link ${location.hash === link.path ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  if (link.path && link.path.startsWith("#")) {
                    const element = document.querySelector(link.path);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                      window.history.replaceState(null, null, link.path);
                    }
                  } else {
                    // For normal navigation
                    window.location.href = link.path;
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-greeting">Hi, {user?.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
