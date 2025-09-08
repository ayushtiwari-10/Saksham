import React from "react";
import "../styles/HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Center text */}
      <div className="hero-center">
        <h1 className="hero-text">
          <span className="word teach">Teach,</span>
          <span className="word learn">Learn</span>
          <span className="word and">And</span>
          <span className="word lead">Lead</span>
        </h1>
        {/* Button moved here just below text */}
        <button className="lets-begin-btn">Let’s Begin</button>
      </div>

      {/* Left illustration (only image now) */}
      <div className="hero-left">
        <img
          src="/online-learning-illustration.png"
          alt="Books"
          className="books-image"
        />
      </div>

      {/* Right illustration (main one) */}
      <div className="hero-right">
        <img
          src="/stui.png"
          alt="Online Learning"
          className="online-learning-image"
        />
        <p className="online-tag">ONLINE LEARNING</p>
      </div>

      {/* Extra illustration near it */}
      <img
        src="/stuii.png"
        alt="Extra Illustration"
        className="float-img extra-img"
      />

      {/* Floating extra images */}
      <img
        src="/ai-powered-team-collaboration-illustration.png"
        alt="Team Collaboration"
        className="float-img team-collab-img"
      />

      <img
        src="/hehe.jpg"
        alt="Light Bulb"
        className="float-img bulb-img"
      />
    </section>
  );
}
