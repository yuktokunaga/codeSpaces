import React from 'react';
import { useLanguage } from '../LanguageContext';

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer" id="footer-id">
      <div className="footer-content">
        <div className="footer-section footer-brand">
          <h3 className="footer-logo-text">Japanet Tea</h3>
          <p className="footer-tagline">{t.footerTagline}</p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">{t.shop}</h4>
          <ul className="footer-links">
            <li><a href="#">{t.teaCollection}</a></li>
            <li><a href="#">{t.giftSets}</a></li>
            <li><a href="#">{t.accessories}</a></li>
            <li><a href="#">{t.newArrivals}</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">{t.company}</h4>
          <ul className="footer-links">
            <li><a href="#">{t.aboutUs}</a></li>
            <li><a href="#">{t.ourStory}</a></li>
            <li><a href="#">{t.sustainability}</a></li>
            <li><a href="#">{t.careers}</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">{t.support}</h4>
          <ul className="footer-links">
            <li><a href="#">{t.contactUs}</a></li>
            <li><a href="#">{t.faqs}</a></li>
            <li><a href="#">{t.shippingReturns}</a></li>
            <li><a href="#">{t.privacyPolicy}</a></li>
          </ul>
        </div>

        <div className="footer-section footer-contact">
          <h4 className="footer-heading">{t.contactTitle || 'Contact'}</h4>
          <div className="footer-contact-info">
            <p className="footer-contact-item">{t.contactAddress || 'Nagasaki, Japan'}</p>
            <p className="footer-contact-item footer-contact-email">{t.contactEmail || 'support@japanettea.com'}</p>
            <p className="footer-contact-item">{t.contactPhone || '+81 350 TEA 825'}</p>
          </div>
        </div>

        <div className="footer-section footer-newsletter">
          <h4 className="footer-heading">{t.newsletterTitle || 'Join the Ceremony'}</h4>
          <p className="footer-newsletter-text">{t.newsletterDesc || 'Get 10% off your first harvest.'}</p>
          <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={t.newsletterPlaceholder || 'Email Address'}
              className="footer-newsletter-input"
            />
            <button type="submit" className="footer-newsletter-btn">{t.newsletterJoin || 'JOIN'}</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {t.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
