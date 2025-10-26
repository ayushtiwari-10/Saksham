import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import '../styles/CourseCreationWizard.css';

const CourseCreationWizard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    duration: '',
    price: 0,
    thumbnail: null,
    videoFiles: [],
    tutorialFiles: [],
    lessons: [],
    tags: [],
    prerequisites: [],
    seoTitle: '',
    seoDescription: '',
    featured: false
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Handicrafts', 'Culinary', 'Arts', 'Technology', 'Lifestyle', 'Business'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.duration) newErrors.duration = 'Duration is required';
        break;
      case 2:
        // File uploads are optional
        break;
      case 3:
        // Course settings validation
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setLoading(true);
    try {
      // Create course first - exclude file fields
      const { thumbnail, videoFiles, tutorialFiles, ...courseFields } = formData;
      const courseData = {
        ...courseFields
      };

      const response = await api.post('/courses', courseData);
      const courseId = response.data.course._id;

      // Upload files if any
      if (formData.thumbnail) {
        const thumbnailFormData = new FormData();
        thumbnailFormData.append('thumbnail', formData.thumbnail);
        thumbnailFormData.append('courseId', courseId);
        try {
          const thumbnailResponse = await api.post('/uploads/course/thumbnail', thumbnailFormData, {
            headers: {
              'Content-Type': undefined,
            },
          });
          console.log('Thumbnail uploaded successfully');
        } catch (uploadError) {
          console.error('Thumbnail upload failed:', uploadError);
          setErrors(prev => ({ ...prev, thumbnail: 'Failed to upload thumbnail' }));
          // Continue with navigation even if thumbnail upload fails
        }
      }

      // Navigate back to teacher dashboard with refresh flag
      navigate('/teacher-dashboard', { state: { refresh: true } });
    } catch (error) {
      console.error('Error creating course:', error);
      console.log('Error response data:', error.response?.data);
      if (error.response?.data?.errors) {
        // Validation errors
        const validationErrors = error.response.data.errors.reduce((acc, err) => {
          acc[err.param] = err.msg;
          return acc;
        }, {});
        setErrors(validationErrors);
      } else {
        setErrors({ submit: error.response?.data?.message || 'Failed to create course' });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="wizard-step">
      <h2>Basic Information</h2>
      <p>Tell us about your course</p>

      <div className="form-group">
        <label htmlFor="title">Course Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter your course title"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Course Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe what students will learn in your course"
          rows="6"
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={errors.category ? 'error' : ''}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="level">Level</label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleInputChange}
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="duration">Duration (hours) *</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="e.g., 10"
            min="1"
            className={errors.duration ? 'error' : ''}
          />
          {errors.duration && <span className="error-message">{errors.duration}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0 for free"
            min="0"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="wizard-step">
      <h2>Course Content</h2>
      <p>Add your course materials</p>

      <div className="form-group">
        <label htmlFor="thumbnail">Course Thumbnail</label>
        <input
          type="file"
          id="thumbnail"
          name="thumbnail"
          onChange={handleFileChange}
          accept="image/*"
        />
        <small>Upload an eye-catching image for your course (optional)</small>
      </div>

      <div className="form-group">
        <label>Course Tags</label>
        <input
          type="text"
          name="tags"
          value={formData.tags.join(', ')}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
          }))}
          placeholder="Enter tags separated by commas"
        />
        <small>Help students find your course with relevant tags</small>
      </div>

      <div className="form-group">
        <label>Prerequisites</label>
        <input
          type="text"
          name="prerequisites"
          value={formData.prerequisites.join(', ')}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            prerequisites: e.target.value.split(',').map(pre => pre.trim()).filter(pre => pre)
          }))}
          placeholder="What should students know before taking this course?"
        />
        <small>Enter prerequisites separated by commas (optional)</small>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="wizard-step">
      <h2>SEO & Settings</h2>
      <p>Optimize your course for search engines</p>

      <div className="form-group">
        <label htmlFor="seoTitle">SEO Title</label>
        <input
          type="text"
          id="seoTitle"
          name="seoTitle"
          value={formData.seoTitle}
          onChange={handleInputChange}
          placeholder="Custom title for search engines"
        />
        <small>Leave empty to use the course title</small>
      </div>

      <div className="form-group">
        <label htmlFor="seoDescription">SEO Description</label>
        <textarea
          id="seoDescription"
          name="seoDescription"
          value={formData.seoDescription}
          onChange={handleInputChange}
          placeholder="Custom description for search engines"
          rows="3"
        />
        <small>Appears in search results (150-160 characters recommended)</small>
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
          />
          <span className="checkmark"></span>
          Feature this course on the homepage
        </label>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="wizard-step">
      <h2>Review & Publish</h2>
      <p>Review your course information before publishing</p>

      <div className="review-section">
        <h3>Course Information</h3>
        <div className="review-item">
          <strong>Title:</strong> {formData.title}
        </div>
        <div className="review-item">
          <strong>Description:</strong> {formData.description}
        </div>
        <div className="review-item">
          <strong>Category:</strong> {formData.category}
        </div>
        <div className="review-item">
          <strong>Level:</strong> {formData.level}
        </div>
        <div className="review-item">
          <strong>Duration:</strong> {formData.duration} hours
        </div>
        <div className="review-item">
          <strong>Price:</strong> ${formData.price}
        </div>
        {formData.tags.length > 0 && (
          <div className="review-item">
            <strong>Tags:</strong> {formData.tags.join(', ')}
          </div>
        )}
      </div>

      {(errors.submit || errors.title || errors.description || errors.category || errors.duration) && (
        <div className="error-message">
          {errors.submit || 'Please fix the validation errors above.'}
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="submit-btn"
        >
          {loading ? 'Creating Course...' : 'Create Course'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="course-wizard">
      <div className="wizard-header">
        <h1>Create New Course</h1>
        <div className="wizard-progress">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Basic Info</span>
          </div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Content</span>
          </div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Settings</span>
          </div>
          <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
            <span className="step-number">4</span>
            <span className="step-label">Review</span>
          </div>
        </div>
      </div>

      <div className="wizard-content">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>

      <div className="wizard-footer">
        <div className="form-actions">
          {currentStep > 1 && (
            <button type="button" onClick={handlePrevious} className="secondary-btn">
              Previous
            </button>
          )}
          {currentStep < 4 && (
            <button type="button" onClick={handleNext} className="primary-btn">
              Next
            </button>
          )}
          {currentStep === 4 && (
            <button type="button" onClick={handleSubmit} disabled={loading} className="submit-btn">
              {loading ? 'Creating Course...' : 'Create Course'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCreationWizard;
