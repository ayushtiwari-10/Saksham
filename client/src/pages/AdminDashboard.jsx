import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/moderation/stats');
      setStats(response.data);
    } catch (err) {
      setError('Failed to load dashboard statistics');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Courses</h3>
          <div className="stat-number">{stats.total}</div>
        </div>

        <div className="stat-card">
          <h3>Approved Courses</h3>
          <div className="stat-number approved">{stats.approved}</div>
        </div>

        <div className="stat-card">
          <h3>Pending Review</h3>
          <div className="stat-number pending">{stats.pending}</div>
        </div>

        <div className="stat-card">
          <h3>Rejected Courses</h3>
          <div className="stat-number rejected">{stats.rejected}</div>
        </div>
      </div>

      <div className="dashboard-actions">
        <div className="action-card">
          <h3>Course Moderation</h3>
          <p>Review and approve/reject course submissions</p>
          <Link to="/admin/moderation" className="action-button">
            Go to Moderation
          </Link>
        </div>

        <div className="action-card">
          <h3>System Analytics</h3>
          <p>View detailed system statistics and reports</p>
          <button className="action-button disabled" disabled>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
