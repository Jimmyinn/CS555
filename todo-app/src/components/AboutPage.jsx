export default function AboutPage({ goBack }) {
  return (
    <>
      <div className="header-top">
        <h1 className="title">ABOUT</h1>
      </div>

      <button className="clear-btn" onClick={goBack}>
        ← Back
      </button>

      <div className="settings-card about-container">
        <section className="about-hero">
          <p className="hero-text">
            A minimalistic and modern to-do webpage that beats out competitors. 
            Enjoy a small learning curve while being able to use advanced features that 
            work seamlessly across all your devices.
          </p>
        </section>

        <hr className="divider" />

        <section className="features-section">
          <h2 className="section-subtitle">Features</h2>
          <ul className="feature-list">
            <li><strong>Add Tasks</strong> – Create new tasks with optional descriptions.</li>
            <li><strong>Task Tags</strong> – Advanced filtering with multiple tags.</li>
            <li><strong>Persistent Storage</strong> – Automatically saved to your browser.</li>
            <li><strong>Import/Export</strong> – Portability via JSON layouts.</li>
            <li><strong>Responsive</strong> – Desktop and mobile optimized.</li>
          </ul>
        </section>

        <section className="prereq-section">
          <h2 className="section-subtitle">Prerequisites</h2>
          <div className="badge-group">
            <code className="code-badge">Node.js 18+</code>
            <code className="code-badge">npm</code>
          </div>
        </section>

        <footer className="team-footer">
          <p className="team-label">The Team</p>
          <div className="team-grid">
            <p><strong>Product Owner:</strong> Madison Wong</p>
            <p><strong>Scrum Master:</strong> Hissam Effendi</p>
            <p><strong>Developers:</strong> Jimmy Zhang, Sebastian Sztolberg, Robbie Kirschner, Zineddine Bacha</p>
          </div>
        </footer>
      </div>
    </>
  );
}