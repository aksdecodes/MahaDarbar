import React, { useState } from 'react';
import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import CartDrawer from '../components/public/CartDrawer';
import { CartProvider } from '../contexts/CartContext';
import '../styles/public.css';

const PublicLayout = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <CartProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--darbar-bg)' }}>
        <Header activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default PublicLayout;
