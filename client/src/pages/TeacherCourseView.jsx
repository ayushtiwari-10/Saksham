import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getFullImageUrl } from '../utils/imageUtils';
import api from '../services/api';
import '../styles/TeacherDashboard.css';

const TeacherCourseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: '',
    duration: ''
  });

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data);
      setEditForm({
        title: response.data.title,
        description: response.data.description,
        category: response.data.category,
        duration: response.data.duration
      });
    } catch (err) {
      setError('Failed to fetch course details');
      console.error('Error fetching course:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/courses/${id}`, editForm);
      setCourse(response.data.course);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update course');
      console.error('Error updating course:', err);
    }
  };

  const handleCancel = () => {
    setEditForm({
      title: course.title,
      description: course.description,
      category: course.category,
      duration: course.duration
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await api.delete(`/courses/${id}`);
        navigate('/teacher-dashboard');
      } catch (err) {
        setError('Failed to delete course');
        console.error('Error deleting course:', err);
      }
    }
  };

  const handleUpload = () => {
    navigate(`/teacher/course/${id}/upload`);
  };

  const handleViewStudents = () => {
    navigate(`/teacher/course/${id}/students`);
  };

  if (loading) {
    return <div className="loading">Loading course details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!course) {
    return <div className="error">Course not found</div>;
  }

  return (
    <div className="teacher-course-view">
      <div className="course-header">
        <button onClick={() => navigate('/teacher-dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
        <h1>Course Management</h1>
      </div>

      <div className="course-content">
        <div className="course-info">
          <img
            src={getFullImageUrl(course.thumbnail)}
            alt={course.title}
            className="course-thumbnail"
          />

          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                >
                  <option value="Handicrafts">Handicrafts</option>
                  <option value="Culinary">Culinary</option>
                  <option value="Arts">Arts</option>
                  <option value="Technology">Technology</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <div className="form-group">
                <label>Duration (hours)</label>
                <input
                  type="number"
                  value={editForm.duration}
                  onChange={(e) => setEditForm({...editForm, duration: e.target.value})}
                />
              </div>
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">Save</button>
                <button onClick={handleCancel} className="cancel-btn">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="course-details">
              <h2>{course.title}</h2>
              <p className="description">{course.description}</p>
              <div className="course-meta">
                <span className="category">Category: {course.category}</span>
                <span className="duration">Duration: {course.duration} hours</span>
                <span className="students">Enrolled: {course.enrolledStudents?.length || 0} students</span>
              </div>
            </div>
          )}
        </div>

        <div className="course-actions">
          {!isEditing && (
            <>
              <button onClick={handleEdit} className="edit-btn">Edit Course</button>
              <button onClick={handleUpload} className="upload-btn">Upload Content</button>
              <button onClick={handleViewStudents} className="students-btn">View Students</button>
              <button onClick={handleDelete} className="delete-btn">Delete Course</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherCourseView;
