import React from 'react';
import { useLanguage } from '../LanguageContext';

function ProductList() {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="home-hero">
        <div className="home-hero-overlay">
          <p className="home-hero-subtitle">{t.homeSubtitle || 'PREMIUM JAPANESE TEA'}</p>
          <h1 className="home-hero-title">{t.homeTitle || 'The Art of Japanese Tea'}</h1>
          <p className="home-hero-desc">{t.homeDesc || 'Carefully sourced from the finest tea gardens across Japan, delivered directly to your door.'}</p>
        </div>
      </section>

      {/* Infographics */}
      <section className="infographic-section">
        <div className="infographic-container">
          <div className="infographic-card">
            <img src="/images/Infographics1.png" alt="Tea benefits" className="scrolling-img" />
          </div>
          <div className="infographic-card">
            <img src="/images/Infographics2.png" alt="Tea sourcing" className="scrolling-img" />
          </div>
          <div className="infographic-card">
            <img src="/images/Infographics3.png" alt="Tea gifting" className="scrolling-img" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductList;
