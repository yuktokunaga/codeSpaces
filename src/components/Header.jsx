import React from 'react';
import { NavLink } from 'react-router-dom';

function Header({ cartCount }) {
  return (
    <header>
      {/* TOP SECTION */}
      <div className="header-top">
        <NavLink to="/" className="header-left">
          <img src="logo.png" alt="Japanet Tea" className="header-logo" />
          <div className="brand-text">
            <span className="brand-divider"></span>
            <span className="header-tagline">
              The heart of Japan, in a cup of tea
            </span>
          </div>
        </NavLink>

        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search our teas..."
            />
          </div>

          <button className="cart-btn">
            🛒 <span>{cartCount}</span>
          </button>

          <NavLink to="/login" className="login-btn">
            Log in
          </NavLink>

          <NavLink to="/register" className="register-btn">
            Register
          </NavLink>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="header-nav">
        <div className="nav-inner">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/tea"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Tea Collection
          </NavLink>

          <NavLink
            to="/gifts"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Gifts
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;