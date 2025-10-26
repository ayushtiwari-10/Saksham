import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/CourseModeration.css';

const CourseModeration = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPendingCourses();
  }, []);

  const fetchPendingCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/moderation/pending');
      setCourses(response.data.courses);
    } catch (err) {
      setError('Failed to load pending courses');
      console.error('Error fetching pending courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (courseId) => {
    const notes = prompt('Enter approval notes (optional):');
    if (notes === null) return; // User cancelled

    try {
      setActionLoading(true);
      await api.post(`/moderation/course/${courseId}/approve`, { notes });
      // Remove from pending list
      setCourses(courses.filter(course => course._id !== courseId));
      alert('Course approved successfully!');
    } catch (err) {
      alert('Failed to approve course. Please try again.');
      console.error('Error approving course:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (courseId) => {
    const notes = prompt('Enter rejection reason (required):');
    if (!notes || notes.trim() === '') {
      alert('Rejection reason is required.');
      return;
    }

    try {
      setActionLoading(true);
      await api.post(`/moderation/course/${courseId}/reject`, { notes });
      // Remove from pending list
      setCourses(courses.filter(course => course._id !== courseId));
      alert('Course rejected.');
    } catch (err) {
      alert('Failed to reject course. Please try again.');
      console.error('Error rejecting course:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const showCourseDetails = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <div className="course-moderation">
        <div className="loading">Loading pending courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-moderation">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="course-moderation">
      <div className="moderation-header">
        <h1>Course Moderation</h1>
        <p>Review and moderate course submissions</p>
      </div>

      {courses.length === 0 ? (
        <div className="no-courses">
          <p>No courses pending moderation.</p>
        </div>
      ) : (
        <div className="courses-list">
          {courses.map(course => (
            <div key={course._id} className="course-card">
              <div className="course-info">
                <h3>{course.title}</h3>
                <p><strong>Instructor:</strong> {course.instructor?.name} ({course.instructor?.email})</p>
                <p><strong>Description:</strong> {course.description?.substring(0, 100)}...</p>
                <p><strong>Status:</strong> {course.moderationStatus}</p>
                {course.aiReviewScore && (
                  <p><strong>AI Score:</strong> {course.aiReviewScore}/100</p>
                )}
              </div>

              <div className="course-actions">
                <button
                  className="btn-details"
                  onClick={() => showCourseDetails(course)}
                >
                  View Details
                </button>
                <button
                  className="btn-approve"
                  onClick={() => handleApprove(course._id)}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Processing...' : 'Approve'}
                </button>
                <button
                  className="btn-reject"
                  onClick={() => handleReject(course._id)}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Processing...' : 'Reject'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedCourse.title}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body">
              <div className="course-details">
                <p><strong>Instructor:</strong> {selectedCourse.instructor?.name}</p>
                <p><strong>Email:</strong> {selectedCourse.instructor?.email}</p>
                <p><strong>Description:</strong> {selectedCourse.description}</p>
                <p><strong>Category:</strong> {selectedCourse.category}</p>
                <p><strong>Level:</strong> {selectedCourse.level}</p>

                {selectedCourse.aiReviewNotes && (
                  <div className="ai-analysis">
                    <h3>AI Analysis</h3>
                    <p><strong>Score:</strong> {selectedCourse.aiReviewScore}/100</p>
                    <p><strong>Notes:</strong> {selectedCourse.aiReviewNotes}</p>
                  </div>
                )}

                {selectedCourse.moderationNotes && (
                  <div className="moderation-notes">
                    <h3>Moderation Notes</h3>
                    <p>{selectedCourse.moderationNotes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseModeration;
