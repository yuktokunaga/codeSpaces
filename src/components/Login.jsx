import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { useLanguage } from '../LanguageContext';
import { useAuth } from '../AuthContext';

function Login({ onBack, onGoRegister }) {
  const { t, lang, toggleLang } = useLanguage();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
      } else {
        login(data.user);
        onBack();
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-lang-toggle" onClick={toggleLang} title={lang === 'ja' ? 'Switch to English' : '日本語に切り替え'}>
        <span className={`lang-option${lang === 'ja' ? ' active' : ''}`}>🇯🇵 日本語</span>
        <span className={`lang-option${lang === 'en' ? ' active' : ''}`}>🇺🇸 English</span>
        <span className={`lang-slider ${lang}`} />
      </div>

      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Japanet Tea" className="login-logo" />
          <h1 className="login-brand">Japanet Tea</h1>
          <p className="login-tagline">{t.tagline}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t.loginEmail}</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                className="form-input"
                placeholder={t.loginEmailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t.loginPassword}</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder={t.loginPasswordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>{t.rememberMe}</span>
            </label>
            <a href="#" className="forgot-link">{t.forgotPassword}</a>
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? '...' : t.loginButton}
          </button>

          {error && <p style={{ color: '#e74c3c', textAlign: 'center', marginTop: '8px', fontSize: '14px' }}>{error}</p>}

          <div className="login-divider">
            <span>{t.orContinue}</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn google-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button type="button" className="social-btn line-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#06C755">
                <path d="M12 2C6.48 2 2 5.82 2 10.5c0 4.01 3.44 7.37 8.1 8.23.31.07.74.21.85.48.1.25.07.63.03.88l-.14.82c-.04.25-.2.97.85.53s5.64-3.32 7.7-5.69C21.34 13.54 22 12.08 22 10.5 22 5.82 17.52 2 12 2z"/>
              </svg>
              LINE
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>
            {t.noAccount}{' '}
            <a href="#" className="signup-link" onClick={(e) => { e.preventDefault(); onGoRegister(); }}>{t.signUp}</a>
          </p>
          <a href="#" className="back-link" onClick={(e) => { e.preventDefault(); onBack(); }}>
            ← {t.backToStore}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
