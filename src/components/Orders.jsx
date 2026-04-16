import React from 'react';
import { useLanguage } from '../LanguageContext';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';

function Orders() {
  const { t } = useLanguage();
  const { orders } = useCart();
  const { isLoggedIn } = useAuth();
  const getItemName = (item) => {
    if (item.type === 'gift') {
      return t.giftCollections?.[item.giftIndex]?.name || item.name;
    }
    return t.teaNames?.[item.id] || item.name;
  };

  const statusLabel = (status) => {
    const map = {
      confirmed: t.orderConfirmed || 'Confirmed',
      shipped: t.orderShipped || 'Shipped',
      delivered: t.orderDelivered || 'Delivered',
    };
    return map[status] || status;
  };

  if (!isLoggedIn) {
    requireLogin();
  }

  return (
    <div className="orders-page">
      <h1 className="orders-page-title">{t.ordersTitle || 'Your Orders'}</h1>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <div className="orders-empty-icon">📦</div>
          <p>{t.ordersEmpty || 'No orders yet'}</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-header-left">
                  <span className="order-id">{order.id}</span>
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'long', day: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                </div>
                <span className={`order-status order-status-${order.status}`}>
                  {statusLabel(order.status)}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item">
                    {item.images && item.images.length > 0 ? (
                      <div className="order-item-images">
                        {item.images.map((img, j) => (
                          <img key={j} src={img} alt={getItemName(item)} />
                        ))}
                      </div>
                    ) : (
                      <img src={item.image} alt={getItemName(item)} className="order-item-img" />
                    )}
                    <div className="order-item-info">
                      <span className="order-item-name">{getItemName(item)}</span>
                      <span className="order-item-type">{item.type === 'gift' ? (t.giftSet || 'Gift Set') : (t.teaItem || 'Tea')}</span>
                    </div>
                    <span className="order-item-qty">×{item.qty}</span>
                    <span className="order-item-price">¥{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span className="order-total-label">{t.cartTotal || 'Total'}</span>
                <span className="order-total-value">¥{order.total.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
