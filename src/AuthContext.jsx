import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('jt_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('jt_user', JSON.stringify(userData));
    setShowLoginPopup(false);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('jt_user');
  };

  const requireLogin = () => {
    setShowLoginPopup(true);
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, showLoginPopup, setShowLoginPopup, requireLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
