import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user: newUser } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);

      return { success: true };
    } catch (error) {
      // Handle validation errors
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors.map(err => err.msg).join(', ');
        return {
          success: false,
          error: validationErrors
        };
      }

      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);
      const updatedUser = { ...user, ...response.data.user };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      return { success: true };
    } catch (error) {
      // Handle validation errors array from server
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors.map(err => err.msg).join(', ');
        return {
          success: false,
          error: validationErrors
        };
      }

      return {
        success: false,
        error: error.response?.data?.message || 'Profile update failed'
      };
    }
  };

  const completeSurvey = async () => {
    try {
      const response = await api.post('/users/complete-survey');
      const updatedUser = response.data.user;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      console.error('Error completing survey:', error);
      return { success: false, error: error.response?.data?.message || 'Failed to complete survey' };
    }
  };

  const hasCompletedSurvey = () => {
    return user?.surveyCompleted || false;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    completeSurvey,
    hasCompletedSurvey,
    isAuthenticated: !!user,
    isEducator: user?.role === 'teacher' || user?.role === 'admin',
    isLearner: user?.role === 'student'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
