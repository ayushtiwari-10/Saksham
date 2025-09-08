import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import '../styles/Auth.css'; // Reuse auth styles

const Personalization = () => {
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const predefinedInterests = [
    'Programming', 'Data Science', 'Web Development', 'Mobile Development',
    'Machine Learning', 'Artificial Intelligence', 'Cybersecurity', 'Cloud Computing',
    'DevOps', 'UI/UX Design', 'Digital Marketing', 'Business Analysis',
    'Project Management', 'Graphic Design', 'Photography', 'Writing',
    'Music', 'Cooking', 'Fitness', 'Languages'
  ];

  const handleAddInterest = (interest) => {
    if (interest && !interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
    setNewInterest('');
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (interests.length === 0) {
      alert('Please select at least one interest');
      return;
    }

    setLoading(true);
    try {
      await api.put('/users/learner-profile', { interests });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving interests:', error);
      alert('Failed to save interests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-form-section">
          <h1 className="logo">saksham</h1>

          <div className="auth-form">
            <h2 className="form-title">Personalize Your Experience</h2>
            <p className="form-subtitle">Tell us your interests to get personalized recommendations</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Your Interests</label>
                <div className="interests-grid">
                  {predefinedInterests.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      className={`interest-btn ${interests.includes(interest) ? 'selected' : ''}`}
                      onClick={() => interests.includes(interest)
                        ? handleRemoveInterest(interest)
                        : handleAddInterest(interest)
                      }
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="custom-interest">Add Custom Interest</label>
                <div className="custom-interest-row">
                  <input
                    id="custom-interest"
                    type="text"
                    placeholder="Enter your own interest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                  />
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => handleAddInterest(newInterest)}
                    disabled={!newInterest.trim()}
                  >
                    Add
                  </button>
                </div>
              </div>

              {interests.length > 0 && (
                <div className="form-group">
                  <label>Your Selected Interests</label>
                  <div className="selected-interests">
                    {interests.map(interest => (
                      <span key={interest} className="interest-tag">
                        {interest}
                        <button
                          type="button"
                          onClick={() => handleRemoveInterest(interest)}
                          className="remove-tag"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="btn-row">
                <button type="submit" className="auth-button" disabled={loading}>
                  {loading ? 'Saving...' : 'Continue to Dashboard'}
                </button>
              </div>

              <div className="skip-row">
                <button type="button" onClick={handleSkip} className="skip-btn">
                  Skip for now
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="auth-illustration-section">
          <div className="illustration-card">
            <img
              className="illustration-img"
              src="/online-learning-illustration.png"
              alt="Personalization illustration"
            />
            <div className="curved-panel">
              <div className="panel-text">
                <h3 className="panel-title">Personalized Learning</h3>
                <p className="panel-desc">
                  Get tailored course recommendations based on your interests and goals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalization;
