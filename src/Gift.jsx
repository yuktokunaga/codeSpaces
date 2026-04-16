import React from 'react';
import { useLanguage } from './LanguageContext';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

const darjeeling = "/images/Darjeeling.jpg";
const earlgrey = "/images/earl.jpg";
const assam = "/images/assam.jpg";
const chamomile = "/images/chamomile.jpg";
const matcha = "/images/matcha.jpg";
const oolong = "/images/oolong.jpg";
const green = "/images/green.jpg";
const white = "/images/white.jpg";
const masala = "/images/masala.jpg";
const herbal = "/images/herbal.jpg";

const giftCollections = [
  {
    id: "coll-1",
    name: "The Traditional Morning Set",
    basePrice: 4500,
    teas: [darjeeling, green, assam, masala],
    consistsOf: "Darjeeling, Classic Green, Robust Assam, and Warming Masala.",
    occasion: "Best for family breakfast gatherings or a productive start at the office.",
  },
  {
    id: "coll-2",
    name: "Zen & Longevity Box",
    basePrice: 5800,
    teas: [matcha, white, oolong, herbal],
    consistsOf: "Ceremonial Matcha, Anti-aging White Tea, Slimming Oolong, and Detox Herbal.",
    occasion: "A perfect health-focused gift for seniors or wellness enthusiasts.",
  },
  {
    id: "coll-3",
    name: "The Relaxation Suite",
    basePrice: 3200,
    teas: [chamomile, earlgrey, herbal, green],
    consistsOf: "Calming Chamomile, Stress-reducing Earl Grey, Soothing Herbal Mix, and Green Tea.",
    occasion: "Ideal for evening winding down or a thoughtful 'Thinking of You' gesture.",
  },
  {
    id: "coll-4",
    name: "Premium Earl Lover's Collection",
    basePrice: 4200,
    teas: [earlgrey, green, white, assam],
    consistsOf: "Earl Grey, Fresh Green Tea, Delicate White Tea, and Robust Assam.",
    occasion: "Perfect for tea connoisseurs and classic tea lovers.",
  },
  {
    id: "coll-5",
    name: "Wellness Warrior Pack",
    basePrice: 5500,
    teas: [matcha, herbal, oolong, chamomile],
    consistsOf: "Energizing Matcha, Detox Herbal, Metabolism-boosting Oolong, and Calming Chamomile.",
    occasion: "A thoughtful gift for health-conscious friends and fitness enthusiasts.",
  },
  {
    id: "coll-6",
    name: "Executive's Afternoon Escape",
    basePrice: 4000,
    teas: [darjeeling, oolong, white, masala],
    consistsOf: "Premium Darjeeling, Silky Oolong, Elegant White Tea, and Aromatic Masala.",
    occasion: "Designed for busy professionals who deserve a quality afternoon break.",
  }
];

function Gifts() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { isLoggedIn, requireLogin } = useAuth();

  return (
    <div className="gift-page">
      {/* Hero Header */}
      <div className="gift-hero">
        <p className="gift-hero-subtitle">{t.giftSubtitle}</p>
        <h1 className="gift-hero-title">{t.giftTitle}</h1>
        <p className="gift-hero-desc">{t.giftDesc}</p>
      </div>

      {/* Collection Grid */}
      <div className="gift-grid">
        {giftCollections.map((collection, idx) => {
          const translated = t.giftCollections[idx];
          return (
            <div key={collection.id} className="gift-card">
              {/* Discount Badge */}
              <div className="gift-badge">{t.giftOff}</div>

              {/* 4-Image Grid */}
              <div className="gift-images">
                {collection.teas.slice(0, 4).map((img, index) => (
                  <div key={index} className="gift-image-wrapper">
                    <img src={img} alt="Tea" className="gift-image" />
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="gift-content">
                <h3 className="gift-name">{translated.name}</h3>

                <div className="gift-details">
                  <div className="gift-detail-row">
                    <span className="gift-label">{t.giftIncludes}</span>
                    <p className="gift-detail-text">{translated.consistsOf}</p>
                  </div>
                  <div className="gift-detail-row">
                    <span className="gift-label">{t.giftPerfectFor}</span>
                    <p className="gift-detail-text">{translated.occasion}</p>
                  </div>
                </div>

                <div className="gift-footer">
                  <div className="gift-pricing">
                    <p className="gift-price">¥{Math.round(collection.basePrice * 0.9).toLocaleString()}</p>
                    <p className="gift-original-price">¥{collection.basePrice.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) { requireLogin(); return; }
                      addToCart({
                        id: collection.id,
                        name: collection.name,
                        giftIndex: idx,
                        price: Math.round(collection.basePrice * 0.9),
                        images: collection.teas.slice(0, 4),
                        type: 'gift'
                      });
                    }}
                    className="gift-cart-btn"
                  >
                    {t.addToCart}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Gifts;
