import React from "react";
import HeroSection from "../components/HeroSection";
import CoursesSection from "../components/CoursesSection";
import MissionSection from "../components/MissionSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing">
      <main>
        <HeroSection />
        <CoursesSection />
        <MissionSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
