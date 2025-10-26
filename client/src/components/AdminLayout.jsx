import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AdminLayout.css';

const AdminLayout = ({ children }) => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <div className="nav-brand">
          <h2>Admin Panel</h2>
        </div>

        <div className="nav-links">
          <Link
            to="/admin/dashboard"
            className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/moderation"
            className={`nav-link ${location.pathname === '/admin/moderation' ? 'active' : ''}`}
          >
            Course Moderation
          </Link>
        </div>

        <div className="nav-user">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
