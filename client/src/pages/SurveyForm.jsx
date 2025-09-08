"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "../styles/SurveyForm.css"

const SurveyForm = () => {
  const navigate = useNavigate()
  const { completeSurvey } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    interests: [],
    purpose: "",
    country: "",
    state: "",
    city: "",
    age: "",
    education: "",
    language: "",
  })

  const handleInterestChange = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    console.log("Form submitted:", formData)
    const result = await completeSurvey()
    if (result.success) {
      alert("Survey completed! Check console for data.")
      navigate("/student-dashboard")
    } else {
      alert("Failed to complete survey: " + result.error)
    }
  }

  return (
    <div className="survey-container">
      <div className="survey-background">
        <div className="geometric-pattern"></div>
        <div className="survey-card">
          {currentStep === 1 && (
            <div className="step-content">
              <h3>How old are you?</h3>
              <div className="age-options">
                <label className="age-option">
                  <input
                    type="radio"
                    name="age"
                    value="12-18"
                    checked={formData.age === "12-18"}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                  12-18
                </label>
                <label className="age-option">
                  <input
                    type="radio"
                    name="age"
                    value="18-25"
                    checked={formData.age === "18-25"}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                  18-25
                </label>
                <label className="age-option">
                  <input
                    type="radio"
                    name="age"
                    value="25-40"
                    checked={formData.age === "25-40"}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                  25-40
                </label>
                <label className="age-option">
                  <input
                    type="radio"
                    name="age"
                    value="40+"
                    checked={formData.age === "40+"}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                  40 above
                </label>
              </div>

              <h3>What is your current education level?</h3>
              <div className="education-options">
                <label className="education-option">
                  <input
                    type="radio"
                    name="education"
                    value="school"
                    checked={formData.education === "school"}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                  />
                  School
                </label>
                <label className="education-option">
                  <input
                    type="radio"
                    name="education"
                    value="undergraduate"
                    checked={formData.education === "undergraduate"}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                  />
                  Undergraduate
                </label>
                <label className="education-option">
                  <input
                    type="radio"
                    name="education"
                    value="postgraduate"
                    checked={formData.education === "postgraduate"}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                  />
                  Postgraduate
                </label>
                <label className="education-option">
                  <input
                    type="radio"
                    name="education"
                    value="homemaker"
                    checked={formData.education === "homemaker"}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                  />
                  Homemaker
                </label>
                <label className="education-option">
                  <input
                    type="radio"
                    name="education"
                    value="job"
                    checked={formData.education === "job"}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                  />
                  Job Holder
                </label>
                <label className="education-option">
                  <input
                    type="radio"
                    name="education"
                    value="other"
                    checked={formData.education === "other"}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                  />
                  Other
                </label>
              </div>

              <h3>What is your preferred language for learning?</h3>
              <div className="language-options">
                <label className="language-option">
                  <input
                    type="radio"
                    name="language"
                    value="english"
                    checked={formData.language === "english"}
                    onChange={(e) => handleInputChange("language", e.target.value)}
                  />
                  English
                </label>
                <label className="language-option">
                  <input
                    type="radio"
                    name="language"
                    value="hindi"
                    checked={formData.language === "hindi"}
                    onChange={(e) => handleInputChange("language", e.target.value)}
                  />
                  Hindi
                </label>
                <select
                  value={formData.language === "english" || formData.language === "hindi" ? "" : formData.language}
                  onChange={(e) => handleInputChange("language", e.target.value)}
                  className="language-dropdown"
                >
                  <option value="">Other</option>
                  <option value="marathi">Marathi</option>
                  <option value="gujarati">Gujarati</option>
                  <option value="tamil">Tamil</option>
                  <option value="telugu">Telugu</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-content">
              <h2>What is your main purpose of using Saksham?</h2>
              <div className="radio-options">
                <div className="option-row">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="purpose"
                      value="academic"
                      checked={formData.purpose === "academic"}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                    />
                    <span className="radio-mark"></span>
                    Academic support
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="purpose"
                      value="skill"
                      checked={formData.purpose === "skill"}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                    />
                    <span className="radio-mark"></span>
                    Skill development
                  </label>
                </div>
                <div className="option-row">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="purpose"
                      value="hobbies"
                      checked={formData.purpose === "hobbies"}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                    />
                    <span className="radio-mark"></span>
                    Hobbies & interests
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="purpose"
                      value="career"
                      checked={formData.purpose === "career"}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                    />
                    <span className="radio-mark"></span>
                    Career growth
                  </label>
                </div>
                <div className="option-row">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="purpose"
                      value="other"
                      checked={formData.purpose === "other"}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                    />
                    <span className="radio-mark"></span>
                    Other
                  </label>
                </div>
              </div>

              <div className="location-section">
                <h3>Where are you located?</h3>
                <div className="dropdown-row">
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    className="dropdown"
                  >
                    <option value="">Country</option>
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                    <option value="canada">Canada</option>
                  </select>
                  <select
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="dropdown"
                  >
                    <option value="">State</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="delhi">Delhi</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="gujarat">Gujarat</option>
                  </select>
                </div>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="dropdown full-width"
                >
                  <option value="">City/Area</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="pune">Pune</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="delhi">Delhi</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-content">
              <h2>Which subjects or skills are you most interested in?</h2>
              <div className="options-grid">
                <div className="option-row">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes("cooking")}
                      onChange={() => handleInterestChange("cooking")}
                    />
                    <span className="checkmark"></span>
                    Cooking & Culinary Arts
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes("art")}
                      onChange={() => handleInterestChange("art")}
                    />
                    <span className="checkmark"></span>
                    Art & Creativity
                  </label>
                </div>
                <div className="option-row">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes("education")}
                      onChange={() => handleInterestChange("education")}
                    />
                    <span className="checkmark"></span>
                    Education & Teaching
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes("business")}
                      onChange={() => handleInterestChange("business")}
                    />
                    <span className="checkmark"></span>
                    Business & Entrepreneurship
                  </label>
                </div>
                <div className="option-row">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes("performing")}
                      onChange={() => handleInterestChange("performing")}
                    />
                    <span className="checkmark"></span>
                    Performing Arts & Music
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes("technology")}
                      onChange={() => handleInterestChange("technology")}
                    />
                    <span className="checkmark"></span>
                    Technology & Digital Skills
                  </label>
                </div>
                <div className="option-row">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes("writing")}
                      onChange={() => handleInterestChange("writing")}
                    />
                    <span className="checkmark"></span>
                    Writing & Storytelling
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes("fitness")}
                      onChange={() => handleInterestChange("fitness")}
                    />
                    <span className="checkmark"></span>
                    Fitness & Wellness
                  </label>
                </div>
                <div className="option-row">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes("content")}
                      onChange={() => handleInterestChange("content")}
                    />
                    <span className="checkmark"></span>
                    Content Creation
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes("lifestyle")}
                      onChange={() => handleInterestChange("lifestyle")}
                    />
                    <span className="checkmark"></span>
                    Lifestyle & Personal Growth
                  </label>
                </div>
                <div className="option-row">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes("other")}
                      onChange={() => handleInterestChange("other")}
                    />
                    <span className="checkmark"></span>
                    Other
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="navigation-buttons">
            <button className="nav-button prev-button" onClick={prevStep} disabled={currentStep === 1}>
              ← PREVIOUS
            </button>
            <button className="nav-button next-button" onClick={currentStep === 3 ? handleSubmit : nextStep}>
              {currentStep === 3 ? "SUBMIT" : "NEXT →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SurveyForm
