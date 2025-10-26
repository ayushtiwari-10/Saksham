"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

export default function LocalClasses() {
  const navigate = useNavigate()
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    state: ''
  })

  useEffect(() => {
    fetchClasses()
  }, [filters])

  const fetchClasses = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.category) params.append('category', filters.category)
      if (filters.city) params.append('city', filters.city)
      if (filters.state) params.append('state', filters.state)

      const response = await api.get(`/local-classes?${params}`)
      setClasses(response.data.classes || [])
    } catch (error) {
      console.error('Error fetching local classes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const categories = [
    'Handicrafts', 'Culinary', 'Arts', 'Technology', 'Lifestyle', 'Business'
  ]

  return (
    <div className="offline-page">
      <div className="content-wrapper">
        <div className="sidebar">
          <div className="location-section">
            <h3>Your Location</h3>
            <div className="location">
              <span className="location-icon">📍</span>
              <div>
                <div className="location-name">Sher Nagar,</div>
                <div className="location-city">Jabalpur</div>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3>Filters</h3>
            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>City</label>
              <input
                type="text"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                placeholder="Enter city"
                className="filter-input"
              />
            </div>
            <div className="filter-group">
              <label>State</label>
              <input
                type="text"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                placeholder="Enter state"
                className="filter-input"
              />
            </div>
          </div>
        </div>

        <div className="main-content">
          {loading ? (
            <div className="loading">Loading classes...</div>
          ) : (
            <div className="classes-grid">
              {classes.map((localClass) => (
                <div key={localClass._id} className="class-card">
                  <img
                    src={localClass.images?.[0] || "/placeholder.svg"}
                    alt={localClass.title}
                    className="class-image"
                  />
                  <div className="class-info">
                    <h4 className="class-title">{localClass.title}</h4>
                    <div className="class-details">
                      <span className="location-icon">📍</span>
                      <span className="instructor">{localClass.instructor?.name || 'Unknown'}</span>
                      <span className="distance">{localClass.location?.city}, {localClass.location?.state}</span>
                    </div>
                    <div className="class-meta">
                      <span className="category">{localClass.category}</span>
                      <span className="level">{localClass.level}</span>
                    </div>
                    <div className="rating-section">
                      <span className="price">₹{localClass.price || 'Free'}</span>
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/local-class/${localClass._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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

        .location-section, .filter-section {
          margin-bottom: 40px;
        }

        .location-section h3, .filter-section h3 {
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

        .filter-group {
          margin-bottom: 15px;
        }

        .filter-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #333;
        }

        .filter-select, .filter-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
        }

        .main-content {
          flex: 1;
        }

        .loading {
          text-align: center;
          padding: 40px;
          font-size: 18px;
          color: #666;
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

        .class-meta {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }

        .category, .level {
          font-size: 12px;
          background: #f0f0f0;
          padding: 4px 8px;
          border-radius: 10px;
          color: #666;
        }

        .rating-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price {
          font-size: 16px;
          font-weight: bold;
          color: #4caf50;
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
