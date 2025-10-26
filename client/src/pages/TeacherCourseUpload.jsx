import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/TeacherDashboard.css';

const TeacherCourseUpload = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState('video');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
    url: '',
    duration: '',
    tags: ''
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');

    try {
      const uploadData = new FormData();
      uploadData.append('courseId', id);
      uploadData.append('type', uploadType);
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('duration', formData.duration);
      uploadData.append('tags', formData.tags);

      if (uploadType === 'video' || uploadType === 'document') {
        if (!formData.file) {
          throw new Error('Please select a file to upload');
        }
        uploadData.append('file', formData.file);
      } else if (uploadType === 'url') {
        if (!formData.url) {
          throw new Error('Please provide a URL');
        }
        uploadData.append('url', formData.url);
      }

      await api.post('/uploads/course-content', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        file: null,
        url: '',
        duration: '',
        tags: ''
      });

      alert('Content uploaded successfully!');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="teacher-course-upload">
      <div className="upload-header">
        <button onClick={() => navigate(`/teacher/course/${id}`)} className="back-btn">
          ← Back to Course
        </button>
        <h1>Upload Course Content</h1>
      </div>

      <div className="upload-content">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label>Content Type</label>
            <select
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value)}
              required
            >
              <option value="video">Video</option>
              <option value="document">Document</option>
              <option value="url">External Link</option>
            </select>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter content title"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Describe the content"
            />
          </div>

          <div className="form-group">
            <label>Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="Duration in minutes"
            />
          </div>

          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="e.g., beginner, tutorial, practice"
            />
          </div>

          {(uploadType === 'video' || uploadType === 'document') && (
            <div className="form-group">
              <label>File</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept={uploadType === 'video' ? 'video/*' : '.pdf,.doc,.docx,.txt'}
                required
              />
            </div>
          )}

          {uploadType === 'url' && (
            <div className="form-group">
              <label>URL</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://example.com"
                required
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="submit" disabled={uploading} className="upload-btn">
              {uploading ? 'Uploading...' : 'Upload Content'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherCourseUpload;
