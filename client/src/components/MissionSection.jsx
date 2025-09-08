import "../styles/MissionSection.css";

const MissionSection = () => {
  return (
    <section className="mission-section section">
      <div className="container">
        <h2 className="section-title">Our Mission Behind This Platform</h2>

        <div className="mission-content">
          {/* 1st Item */}
          <div className="mission-item">
            <div className="mission-image">
              <img
                src="/Design-Thinking-Tools_Banner.jpg"   // replace with your illustration
                alt="AI-Powered Hub"
              />
            </div>
            <div className="mission-text">
              <h3>AI-Powered Micro-Jobs Hub</h3>
              <p>
                Discover part-time opportunities matching your skills and
                availability
              </p>
            </div>
          </div>

          {/* 2nd Item (reverse) */}
          <div className="mission-item reverse">
            <div className="mission-image">
              <img
                src="/20943903.jpg"   // replace with your illustration
                alt="Connect Locally"
              />
            </div>
            <div className="mission-text">
              <h3>Connect Locally</h3>
              <p>Find and offer classes in your neighborhood</p>
            </div>
          </div>

          {/* 3rd Item */}
          <div className="mission-item">
            <div className="mission-image">
              <img
                src="/monetize-online.webp"   // replace with your illustration
                alt="Monetize Talents"
              />
            </div>
            <div className="mission-text">
              <h3>Monetize Your Talents</h3>
              <p>
                Turn your expertise into income with our business toolkit
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
