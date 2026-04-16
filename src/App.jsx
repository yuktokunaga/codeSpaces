import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { AuthProvider, useAuth } from './AuthContext';
import { CartProvider } from './CartContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import TeaCollection from './components/TeaCollection';
import Gift from './Gift';
import Cart from './components/Cart';
import Orders from './components/Orders';

function LoginPopup() {
  const { showLoginPopup, setShowLoginPopup } = useAuth();
  const { t } = useLanguage();
  if (!showLoginPopup) return null;
  return (
    <div className="login-popup-overlay" onClick={() => setShowLoginPopup(false)}>
      <div className="login-popup" onClick={(e) => e.stopPropagation()}>
        <button className="login-popup-close" onClick={() => setShowLoginPopup(false)}>&times;</button>
        <div className="login-popup-icon">🔒</div>
        <h3>{t.loginRequired || 'Login Required'}</h3>
        <p>{t.pleaseLogin || 'Please log in to continue'}</p>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('home');

  if (page === 'login') {
    return (
      <LanguageProvider>
        <AuthProvider>
          <Login onBack={() => setPage('home')} onGoRegister={() => setPage('register')} />
        </AuthProvider>
      </LanguageProvider>
    );
  }

  if (page === 'register') {
    return (
      <LanguageProvider>
        <AuthProvider>
          <Register onBack={() => setPage('home')} onGoLogin={() => setPage('login')} />
        </AuthProvider>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <Header onLogin={() => setPage('login')} onRegister={() => setPage('register')} />

          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/gift" element={<Gift />} />
            <Route path="/tea" element={<TeaCollection />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>

          <Footer />
          <LoginPopup />
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
