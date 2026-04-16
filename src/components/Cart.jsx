import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import StripeCheckout from './StripeCheckout';

function Cart() {
  const { t } = useLanguage();
  const { cartItems, cartTotal, updateQty, removeFromCart, fetchCart, fetchOrders } = useCart();
  const { isLoggedIn, requireLogin } = useAuth();
  const [ordered, setOrdered] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!isLoggedIn) { requireLogin(); return; }
    setShowCheckout(true);
  };

  const handlePaymentSuccess = async () => {
    await fetchCart();
    await fetchOrders();
    setShowCheckout(false);
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className="cart-page">
        <div className="cart-success">
          <div className="cart-success-icon">✓</div>
          <h2>{t.orderSuccess || 'Order Placed Successfully!'}</h2>
          <p>{t.orderMsg || 'Thank you for your purchase. Your tea is on its way!'}</p>
          <button className="cart-buy-btn" style={{ maxWidth: 300, marginTop: 24 }} onClick={() => navigate('/orders')}>
            {t.viewOrders || 'View Orders'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">{t.cartTitle || 'Your Cart'}</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty-page">
          <p>{t.cartEmpty || 'Your cart is empty'}</p>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-row">
                {item.images && item.images.length > 0 ? (
                  <div className="cart-row-images">
                    {item.images.map((img, i) => (
                      <img key={i} src={img} alt={item.name} />
                    ))}
                  </div>
                ) : (
                  <img src={item.image} alt={item.name} className="cart-row-img" />
                )}
                <div className="cart-row-info">
                  <h3 className="cart-row-name">
                    {item.type === 'gift'
                      ? (t.giftCollections?.[item.giftIndex]?.name || item.name)
                      : (t.teaNames?.[item.id] || item.name)}
                  </h3>
                  <span className="cart-row-type">{item.type === 'gift' ? (t.giftSet || 'Gift Set') : (t.teaItem || 'Tea')}</span>
                </div>
                <div className="cart-row-price">¥{item.price.toLocaleString()}</div>
                <div className="cart-row-qty">
                  <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span className="cart-qty-val">{item.qty}</span>
                  <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <div className="cart-row-subtotal">¥{(item.price * item.qty).toLocaleString()}</div>
                <button className="cart-row-remove" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="cart-summary-title">{t.orderSummary || 'Order Summary'}</h3>
            <div className="cart-summary-row">
              <span>{t.cartSubtotal || 'Subtotal'}</span>
              <span>¥{cartTotal.toLocaleString()}</span>
            </div>
            <div className="cart-summary-row">
              <span>{t.cartShipping || 'Shipping'}</span>
              <span>{t.cartFree || 'Free'}</span>
            </div>
            <div className="cart-summary-divider"></div>
            <div className="cart-summary-row cart-summary-total">
              <span>{t.cartTotal || 'Total'}</span>
              <span>¥{cartTotal.toLocaleString()}</span>
            </div>
            <button className="cart-buy-btn" onClick={handleOrder}>
              {t.cartBuy || 'Place Order'}
            </button>
          </div>

          {showCheckout && (
            <div className="stripe-overlay">
              <div className="stripe-modal">
                <StripeCheckout
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => setShowCheckout(false)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
