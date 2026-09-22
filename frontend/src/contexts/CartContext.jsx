import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('md_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pureVegOnly, setPureVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('md_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cartItems]);

  const addToCart = (dish) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === dish.id || item.name === dish.name);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      }
      return [...prevItems, { ...dish, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id && item.name !== id));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.id === id || item.name === id) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const getWhatsAppMessage = () => {
    if (cartItems.length === 0) return '';
    let message = `*NEW ORDER - MAHARASHTRA DARBAR (AMEERPET)*\n\n`;
    message += `*Items Ordered:*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x ${item.quantity} - ₹${item.price * item.quantity}\n`;
    });
    message += `\n*Total Amount:* ₹${subtotal}\n\n`;
    message += `Please confirm my order & send delivery/pickup details. Thank you!`;
    return encodeURIComponent(message);
  };

  const openWhatsAppCheckout = () => {
    const message = getWhatsAppMessage();
    const phone = '917276826361';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      totalItemCount,
      isCartOpen,
      setIsCartOpen,
      pureVegOnly,
      setPureVegOnly,
      searchQuery,
      setSearchQuery,
      openWhatsAppCheckout,
      getWhatsAppMessage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
