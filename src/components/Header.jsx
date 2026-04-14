import React, { useState } from 'react';

function Header({ cartCount }) {
  const [activeNav, setActiveNav] = useState('Home');

  const navLinks = ['Home', 'Tea Collection', 'Gifts', 'About Us', 'Contact'];

  return (
    <header>
      <div className="header-top">
        <a href="#" className="header-left">
          <img src="logo.png" alt="Japanet Tea" className="header-logo" />
          <div className="brand-text">
            <span className="brand-divider"></span>
            <span className="header-tagline">The heart of Japan, in a cup of tea</span>
          </div>
        </a>
        <div className="header-actions">
          <div className="search-box">
            <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" className="search-input" placeholder="Search our teas..." />
          </div>
          <button className="cart-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span id="cart-count">{cartCount}</span>
          </button>
          <a href="#" className="login-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Log in
          </a>
          <a href="#" className="register-btn">Register</a>
        </div>
      </div>
      <nav className="header-nav">
        <div className="nav-inner">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className={`nav-link${activeNav === link ? ' active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveNav(link);
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
