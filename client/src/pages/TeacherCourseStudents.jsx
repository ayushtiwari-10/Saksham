import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/TeacherDashboard.css';

const TeacherCourseStudents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourseAndStudents();
  }, [id]);

  const fetchCourseAndStudents = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data);

      // Get student details for enrolled students
      const enrolledStudents = response.data.enrolledStudents || [];
      const studentIds = enrolledStudents.map(enrollment => enrollment.student);

      if (studentIds.length > 0) {
        // Fetch student details (this might need a separate API endpoint)
        // For now, we'll display the enrollment data
        setStudents(enrolledStudents);
      } else {
        setStudents([]);
      }
    } catch (err) {
      setError('Failed to fetch course and students');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getProgressPercentage = (progress) => {
    return Math.round(progress * 100);
  };

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="teacher-course-students">
      <div className="students-header">
        <button onClick={() => navigate(`/teacher/course/${id}`)} className="back-btn">
          ← Back to Course
        </button>
        <h1>Enrolled Students</h1>
        {course && <h2>{course.title}</h2>}
      </div>

      <div className="students-content">
        {students.length === 0 ? (
          <div className="no-students">
            <p>No students enrolled in this course yet.</p>
          </div>
        ) : (
          <div className="students-list">
            <div className="students-summary">
              <p>Total enrolled: {students.length} students</p>
            </div>

            <div className="students-table">
              <div className="table-header">
                <div className="col-student">Student</div>
                <div className="col-enrolled">Enrolled Date</div>
                <div className="col-progress">Progress</div>
                <div className="col-last-access">Last Access</div>
              </div>

              {students.map((enrollment, index) => (
                <div key={index} className="table-row">
                  <div className="col-student">
                    {/* Student name would come from populated data */}
                    Student {enrollment.student}
                  </div>
                  <div className="col-enrolled">
                    {formatDate(enrollment.enrolledAt)}
                  </div>
                  <div className="col-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${getProgressPercentage(enrollment.progress)}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {getProgressPercentage(enrollment.progress)}%
                    </span>
                  </div>
                  <div className="col-last-access">
                    {enrollment.lastAccessed ? formatDate(enrollment.lastAccessed) : 'Never'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourseStudents;
