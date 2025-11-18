// contexts/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    type: 'login' // 'login' or 'register'
  });

  const openLogin = () => setAuthModal({ isOpen: true, type: 'login' });
  const openRegister = () => setAuthModal({ isOpen: true, type: 'register' });
  const closeAuth = () => setAuthModal({ isOpen: false, type: 'login' });

  return (
    <AuthContext.Provider value={{
      authModal,
      openLogin,
      openRegister,
      closeAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};