import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import "../styles/Profile.css";


const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "student",
    bio: "",
    phone: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "student",
        bio: user.profile?.bio || "",
        phone: user.profile?.phone || "",
        profileImage: user.profileImage || null,
      });
      setImagePreview(user.profileImage || null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileData((prev) => ({
        ...prev,
        profileImage: file,
      }))

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateInitials = (name) => {
    const names = name.split(" ")
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase()
    }
    return name.charAt(0).toUpperCase()
  }

  const generateRandomColor = () => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      // Handle profile image upload separately if a new file is selected
      let profileImageUrl = null;
      if (profileData.profileImage && profileData.profileImage instanceof File) {
        const formData = new FormData();
        formData.append('profileImage', profileData.profileImage);

        const uploadResponse = await api.post('/users/upload-profile-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        profileImageUrl = uploadResponse.data.url;
      }

      const updatePayload = {
        name: profileData.name,
        role: profileData.role,
        bio: profileData.bio,
        phone: profileData.phone,
      };

      if (profileImageUrl) {
        updatePayload.profileImage = profileImageUrl;
      }

      const result = await updateProfile(updatePayload);

      if (result.success) {
        alert("Profile updated successfully!");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = () => {
    // Navigate to the appropriate dashboard based on user role
    if (user?.role === 'teacher') {
      navigate('/teacher-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Profile Settings</h1>
        <p className="profile-subtitle">Update your personal information</p>
      </div>

      <div className="profile-form-container">
        <div className="profile-image-section">
          <div className="profile-image-wrapper">
            <div className="profile-image-display">
              {imagePreview ? (
                <img src={imagePreview || "/placeholder.svg"} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-image-placeholder" style={{ backgroundColor: generateRandomColor() }}>
                  <span>{generateInitials(profileData.name)}</span>
                </div>
              )}
            </div>
            <button className="upload-btn" onClick={() => document.getElementById("imageUpload").click()}>
              Upload Photo
            </button>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <form className="profile-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              className="form-input"
              placeholder="Enter your email address"
              readOnly
              style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
            />
            <small style={{ color: '#666', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              Email cannot be changed. Contact support if needed.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select id="role" name="role" value={profileData.role} onChange={handleInputChange} className="form-select">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Tell us about yourself..."
              rows="4"
            />
          </div>

          {error && (
            <div className="error-message" style={{
              color: 'red',
              marginBottom: '15px',
              padding: '10px',
              backgroundColor: '#ffebee',
              border: '1px solid #f44336',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="cancel-btn" disabled={loading}>
              Cancel
            </button>
            <button type="button" onClick={handleSave} className="save-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
