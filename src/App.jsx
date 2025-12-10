import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>
          Welcome to <span style={{ color: '#6366f1' }}>YourNext App</span>
        </h1>
        <div className="header-subtitle">A beautiful landing page built with React</div>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Your journey to modern, elegant UIs starts here</h2>
            <p className="hero-desc">
              Build stunning web experiences faster than ever.<br/>
              Clean design, exceptional simplicity, and blazing fast performance.
            </p>
            <button className="cta-btn">Get Started</button>
          </div>
          <div className="hero-image">
            {/* Insert an SVG or illustration here - placeholder for now */}
            <div className="svg-placeholder">
              <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="30" width="160" height="80" rx="20" fill="#6366f1" fillOpacity="0.12" />
                <circle cx="60" cy="70" r="26" fill="#6366f1" fillOpacity="0.25" />
                <rect x="110" y="60" width="40" height="20" rx="10" fill="#6366f1" fillOpacity="0.09" />
              </svg>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
