import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Login.css"; // make sure the path matches your project

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const { login, hasCompletedSurvey } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      // Check if user has completed survey
      // Use async check for updated user state
      const surveyCompleted = hasCompletedSurvey();
      if (surveyCompleted) {
        window.location.href = "/student-dashboard";
      } else {
        window.location.href = "/survey-form";
      }
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        {/* LEFT SIDE: brand + form */}
        <section className="login-left">
          <h1 className="brand-title">saksham</h1>

          <div className="form-wrap">
            <h2 className="form-heading">Login to your account</h2>

            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ex: jon.smith@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row-forgot">
                <a href="/forgot-password" className="link-forgot">
                  Forgot Password
                </a>
              </div>

              <button type="submit" className="btn-login">
                LOGIN
              </button>
            </form>

            <div className="divider">
              <span>or login with</span>
            </div>

            <div className="social-row">
              {/* Google */}
              <button className="social-btn" aria-label="Continue with Google">
                <svg
                  className="social-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.651 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.905 5.053 29.731 3 24 3 12.402 3 3 12.402 3 24s9.402 21 21 21c10.5 0 19.5-7.5 19.5-21 0-1.346-.111-2.333-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.817C14.5 16.21 18.816 12 24 12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.905 5.053 29.731 3 24 3 16.318 3 9.656 7.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 45c5.159 0 9.86-1.977 13.397-5.197l-6.174-5.224C29.206 36.875 26.743 38 24 38c-5.2 0-9.614-3.317-11.279-7.95l-6.53 5.03C9.5 40.548 16.24 45 24 45z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.039 12.039 0 01-4.08 5.579l6.174 5.224C39.03 35.948 42 30.5 42 24c0-1.346-.111-2.333-.389-3.917z"
                  />
                </svg>
              </button>

              {/* Facebook */}
              <button className="social-btn" aria-label="Continue with Facebook">
                <svg
                  className="social-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#1877F2"
                    d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.093 10.125 24v-8.44H7.078V12.07h3.047V9.412c0-3.013 1.792-4.676 4.533-4.676 1.313 0 2.686.235 2.686.235v2.97h-1.514c-1.492 0-1.956.927-1.956 1.878v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.093 24 18.1 24 12.073z"
                  />
                </svg>
              </button>

              {/* Twitter/X */}
              <button className="social-btn" aria-label="Continue with Twitter">
                <svg
                  className="social-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 1227"
                >
                  <path
                    fill="#1DA1F2"
                    d="M714 519l356-519H861L599 361 343 0H0l360 506L0 1227h336l268-389 264 389h343L714 519zm-92 133l-75 108-238 345H95l298-433L95 82h216l236 341 78 112 78-112 237-341h216L809 616l297 429H972L622 652z"
                  />
                </svg>
              </button>
            </div>

            <div className="signup-row">
              <span>Create your account? </span>
              <a className="link-signup" href="/signup">
                SIGN UP
              </a>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE: illustration + curved white panel */}
        <section className="login-right">
          <div className="illustration-card">
            <img
              className="illustration-img"
              /* Use your own asset here if you have one */
              src="/Login-amico.png"
              alt="Team learning illustration"
            />

            {/* Curved white overlay panel */}
            <div className="curved-panel">
              <div className="panel-text">
                <h3>AI-Powered<br />Micro-Jobs Hub</h3>
                <p>
                  Discover part-time
                  <br />
                  opportunities matching your
                  <br />
                  skills and availability
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
