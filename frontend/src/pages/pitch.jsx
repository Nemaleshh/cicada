import React from 'react';
import './pitch.css';

const Pitch = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted!');
  };

  return (
    <div className="pitch-container">
      {/* Header */}
      <header className="pitch-header">
        <h1>Unleash Your Creativity: Pitch Your Ideas!</h1>
        <p className="header-subtext">Turn your vision into reality with Cicada's innovation platform</p>
      </header>

      <main className="pitch-main">
        {/* How It Works */}
        <section className="section-card">
          <h2>How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Submit Your Idea</h3>
              <p>Fill out our simple form with details about your concept</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Get Expert Feedback</h3>
              <p>Receive actionable insights from industry professionals</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Connect & Collaborate</h3>
              <p>Get matched with investors and potential collaborators</p>
            </div>
          </div>
        </section>

        {/* Submission Form */}
        <section className="section-card">
          <h2>Pitch Submission</h2>
          <form className="pitch-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Alex Chen" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="alex@example.com" 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="title">Idea Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                placeholder="AI-Powered Recycling System" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Idea Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your idea, target audience, and unique value proposition..."
                rows="6"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="attachment">Attachments (PDF/PPT)</label>
                <input 
                  type="file" 
                  id="attachment" 
                  name="attachment" 
                  accept=".pdf,.ppt,.pptx" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="video">Video Pitch (Optional)</label>
                <input 
                  type="file" 
                  id="video" 
                  name="video" 
                  accept="video/*" 
                />
              </div>
            </div>

            <div className="terms-group">
              <input 
                type="checkbox" 
                id="terms" 
                name="terms" 
                required 
              />
              <label htmlFor="terms">
                I agree to Cicada's terms and wish to share my idea publicly
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Submit Pitch →
            </button>
          </form>
        </section>

        {/* Success Stories */}
        <section className="section-card">
          <h2>Success Stories</h2>
          <div className="success-grid">
            <div className="success-card">
              <h3>EcoCharge</h3>
              <p>Raised $250K seed funding after mentorship through Cicada</p>
              <div className="success-tag">Clean Energy</div>
            </div>
            <div className="success-card">
              <h3>SkillBridge AI</h3>
              <p>Featured in TechCrunch after winning our innovation challenge</p>
              <div className="success-tag">EdTech</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pitch-footer">
        <p>© 2023 Cicada Innovations • Empowering Tomorrow's Visionaries</p>
      </footer>
    </div>
  );
};

export default Pitch;