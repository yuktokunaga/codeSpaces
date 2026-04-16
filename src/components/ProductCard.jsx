import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

function ProductCard({ product, onAddToCart }) {
  const { t } = useLanguage();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    onAddToCart(product.id);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">¥{product.price.toLocaleString()}</p>
        <button
          className="add-cart-btn"
          onClick={handleClick}
          style={{ backgroundColor: isAdded ? '#2c3e50' : '#27ae60' }}
        >
          {isAdded ? t.added : t.addToCart}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
