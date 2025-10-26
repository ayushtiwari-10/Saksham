import React, { useState } from 'react';
import api from '../services/api';

const StarRating = ({ courseId, currentRating = 0, onRatingUpdate }) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(currentRating);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRating = async (rating) => {
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      const response = await api.post(`/courses/${courseId}/rate`, { rating });
      setSelected(rating);
      if (onRatingUpdate) {
        onRatingUpdate(response.data.rating);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to rate course');
      console.error('Rating error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="star-rating">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hovered || selected) ? 'filled' : ''} ${loading ? 'loading' : ''}`}
            onMouseEnter={() => !loading && setHovered(star)}
            onMouseLeave={() => !loading && setHovered(0)}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      {selected > 0 && (
        <span className="rating-text">{selected}/5</span>
      )}
      {error && (
        <div className="rating-error">{error}</div>
      )}
    </div>
  );
};

export default StarRating;
