import React, { useState } from 'react';

function ProductCard({ product, onAddToCart }) {
  const [buttonText, setButtonText] = useState('カートに入れる');
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    onAddToCart(product.id);
    setButtonText('追加しました！');
    setIsAdded(true);

    setTimeout(() => {
      setButtonText('カートに入れる');
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
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
