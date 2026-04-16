import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useLanguage } from '../LanguageContext';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';

function Header({ onLogin, onRegister }) {
  const { lang, t, toggleLang } = useLanguage();
  const { cartCount } = useCart();
  const { user, isLoggedIn, logout, requireLogin } = useAuth();
  const navigate = useNavigate();

  const navRoutes = ['/', '/tea', '/gift', '/orders', '/contact'];

  const handleNavClick = (e, index) => {
    if (index === 3 && !isLoggedIn) {
      e.preventDefault();
      requireLogin();
    }
    if (index === 4) {
      e.preventDefault();
      const footer = document.getElementById('footer-id');
      if (footer) footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header>
      <div className="header-top">
        <NavLink to="/" className="header-left">
          <img src={logo} alt="Japanet Tea" className="header-logo" />
          <div className="brand-text">
            <span className="brand-divider"></span>
            <div className="brand-info">
              <span className="brand-name">Japanet Tea</span>
              <span className="header-tagline">{t.tagline}</span>
            </div>
          </div>
        </NavLink>
        <div className="header-actions">
          <div className="search-box">
            <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" className="search-input" placeholder={t.searchPlaceholder} />
          </div>

          <button className="cart-btn" onClick={() => { if (!isLoggedIn) { requireLogin(); return; } navigate('/cart'); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span id="cart-count">{cartCount}</span>}
          </button>

          {isLoggedIn ? (
            <div className="auth-buttons user-info">
              <span className="user-greeting">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {user.name}
              </span>
              <a href="#" className="register-btn" onClick={(e) => { e.preventDefault(); logout(); }}>{t.logoutBtn || 'Logout'}</a>
            </div>
          ) : (
            <div className="auth-buttons">
              <a href="#" className="login-btn" onClick={(e) => { e.preventDefault(); onLogin(); }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {t.login}
              </a>
              <a href="#" className="register-btn" onClick={(e) => { e.preventDefault(); onRegister(); }}>{t.register}</a>
            </div>
          )}
          <div className="lang-switch" onClick={toggleLang} title={lang === 'ja' ? 'Switch to English' : '日本語に切り替え'}>
            <span className={`lang-option${lang === 'ja' ? ' active' : ''}`}>🇯🇵 日本語</span>
            <span className={`lang-option${lang === 'en' ? ' active' : ''}`}>🇺🇸 English</span>
            <span className={`lang-slider ${lang}`} />
          </div>
        </div>
      </div>
      <nav className="header-nav">
        <div className="nav-inner">
          {t.nav.map((link, index) => (
            <NavLink
              key={index}
              to={navRoutes[index]}
              onClick={(e) => handleNavClick(e, index)}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
