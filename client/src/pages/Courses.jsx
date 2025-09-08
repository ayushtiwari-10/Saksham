import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import "../styles/Courses.css";

export default function Courses() {
  const { user, isEducator } = useAuth();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm, selectedCategory, selectedLevel]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    setFilteredCourses(filtered);
  };

  const handleEnrollCourse = async (courseId) => {
    try {
      await api.post(`/courses/${courseId}/enroll`);
      // Refresh courses after enrollment
      fetchCourses();
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const categories = [...new Set(courses.map(course => course.category))];
  const levels = [...new Set(courses.map(course => course.level))];

  if (loading) {
    return <div className="courses-loading">Loading courses...</div>;
  }

  return (
    <div className="courses">
      <div className="courses-container">
        <div className="courses-header">
          <h1>Explore Courses</h1>
          <p>Discover and enroll in courses that match your learning goals</p>
        </div>

        {/* Filters */}
        <div className="courses-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-selects">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div key={course._id} className="course-card">
                <div className="course-image">
                  <img
                    src={course.image || '/course-placeholder.jpg'}
                    alt={course.title}
                    onError={(e) => {
                      e.target.src = '/course-placeholder.jpg';
                    }}
                  />
                  <div className="course-category">{course.category}</div>
                </div>

                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>

                  <div className="course-meta">
                    <span className="course-level">{course.level}</span>
                    <span className="course-duration">{course.duration}h</span>
                    <span className="course-rating">
                      ⭐ {course.rating?.average || 0} ({course.rating?.count || 0})
                    </span>
                  </div>

                  <div className="course-instructor">
                    <span>By: {course.instructor?.name || 'Unknown Instructor'}</span>
                  </div>

                  <div className="course-stats">
                    <span>👥 {course.enrolledStudents?.length || 0} enrolled</span>
                  </div>

                  <div className="course-actions">
                    {!isEducator && (
                      <button
                        onClick={() => handleEnrollCourse(course._id)}
                        className={`enroll-btn ${
                          course.enrolledStudents?.includes(user?.id) ? 'enrolled' : ''
                        }`}
                        disabled={course.enrolledStudents?.includes(user?.id)}
                      >
                        {course.enrolledStudents?.includes(user?.id) ? 'Enrolled' : 'Enroll Now'}
                      </button>
                    )}

                    <button className="view-btn">View Details</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-courses">
              <h3>No courses found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Educator Actions */}
        {isEducator && (
          <div className="educator-actions">
            <button className="create-course-btn">+ Create New Course</button>
          </div>
        )}
      </div>
    </div>
  );
}
