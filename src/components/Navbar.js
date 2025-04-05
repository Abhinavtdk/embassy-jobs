import React from 'react';
import './Navbar.css';

function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">International Jobs Portal</div>
      <div className="navbar-links">
        <button 
          className={`nav-link ${activePage === 'jobs' ? 'active' : ''}`}
          onClick={() => setActivePage('jobs')}
        >
          Jobs
        </button>
        <button 
          className={`nav-link ${activePage === 'links' ? 'active' : ''}`}
          onClick={() => setActivePage('links')}
        >
          Links
        </button>
      </div>
    </nav>
  );
}

export default Navbar;