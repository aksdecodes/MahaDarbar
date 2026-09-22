import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { UserAuthProvider } from './contexts/UserAuthContext';
import { CartProvider } from './contexts/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <UserAuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserAuthProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
