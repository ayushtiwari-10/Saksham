import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Signup.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    if (!form.terms) {
      alert("Please accept the terms and policy");
      return;
    }

    const { name, email, password } = form;
    const result = await register({ name, email, password });
    if (result.success) {
      // Redirect to survey form page for personalization
      window.location.href = "/survey-form";
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        {/* LEFT: Form */}
        <div className="auth-form-section">
          <h1 className="logo">saksham</h1>

          <div className="auth-form">
            <h2 className="form-title">Create your account</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="ex: jon smith"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ex: jon.smith@email.com"
                  value={form.email}
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
                  placeholder="********"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm">Confirm password</label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  placeholder="********"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="checkbox-group">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={form.terms}
                  onChange={handleChange}
                />
                <label htmlFor="terms" className="terms-label">
                  I understood the{" "}
                  <a className="terms-link" href="#terms">
                    terms &amp; policy.
                  </a>
                </label>
              </div>

              <div className="btn-row">
                <button type="submit" className="auth-button">
                  SIGN UP
                </button>
              </div>
            </form>

            <div className="divider"><span>or sign up with</span></div>

            <div className="social-buttons">
              <button className="social-btn google" aria-label="Sign up with Google">
                {/* Google SVG */}
                <svg viewBox="0 0 533.5 544.3" className="social-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                  <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.6h146.9c-6.3 34.1-25.3 62.9-54 82.1v68h87.2c51-47 81.4-116.3 81.4-195.3z"/>
                  <path fill="#34A853" d="M272 544.3c73.7 0 135.6-24.5 180.8-66.6l-87.2-68c-24.2 16.3-55.2 25.9-93.6 25.9-71.9 0-132.9-48.6-154.7-113.9H29.2v71.5C74.6 481.2 166.6 544.3 272 544.3z"/>
                  <path fill="#FBBC05" d="M117.3 322.1c-10.6-31.9-10.6-66.4 0-98.3V152.3H29.2c-39.6 78.3-39.6 170.8 0 249.1l88.1-79.3z"/>
                  <path fill="#EA4335" d="M272 107.7c39 0 74 13.4 101.6 39.6l76.5-76.5C407.6 24.5 345.7 0 272 0 166.6 0 74.6 63.1 29.2 152.3l88.1 71.5c21.8-65.3 82.8-112.1 154.7-116.1z"/>
                </svg>
              </button>

              <button className="social-btn facebook" aria-label="Sign up with Facebook">
                {/* Facebook SVG */}
                <svg viewBox="0 0 24 24" className="social-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                  <path fill="#1877F2" d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.093 10.125 24v-8.44H7.078V12.07h3.047V9.412c0-3.013 1.792-4.676 4.533-4.676 1.313 0 2.686.235 2.686.235v2.97h-1.514c-1.492 0-1.956.927-1.956 1.878v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.093 24 18.1 24 12.073z"/>
                </svg>
              </button>

              <button className="social-btn twitter" aria-label="Sign up with Twitter">
                {/* Twitter SVG */}
                <svg viewBox="0 0 24 24" className="social-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                  <path fill="#1DA1F2" d="M23.954 4.569c-.885.39-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.949.564-2.004.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.725-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.416-1.68 1.318-3.809 2.105-6.102 2.105-.395 0-.779-.023-1.17-.067 2.189 1.402 4.768 2.22 7.557 2.22 9.054 0 14.004-7.497 14.004-13.986 0-.21 0-.423-.016-.634.961-.695 1.8-1.56 2.46-2.548l-.047-.02z"/>
                </svg>
              </button>
            </div>

            <div className="auth-footer">
              <span>Have an account? </span>
              <a className="auth-link" href="/login">SIGN IN</a>
            </div>
          </div>
        </div>

        {/* RIGHT: Illustration & curved panel */}
        <div className="auth-illustration-section">
          <div className="illustration-card">
            <img
              className="illustration-img"
              src="/Mobile login-pana.png"
              alt="AI collaboration illustration"
            />

            <div className="curved-panel">
              <div className="panel-text">
                <h3 className="panel-title">AI-Powered<br />Micro-Jobs Hub</h3>
                <p className="panel-desc">
                  Discover part-time
                  <br />
                  opportunities matching your
                  <br />
                  skills and availability
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
