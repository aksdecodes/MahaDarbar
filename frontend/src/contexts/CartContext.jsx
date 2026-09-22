import { createContext, useState, useContext, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) {
        return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems(prev => prev.filter(i => i._id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(i => i._id !== itemId));
      return;
    }
    setCartItems(prev => prev.map(i => i._id === itemId ? { ...i, quantity } : i));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems, cartCount, cartTotal, isCartOpen,
      setIsCartOpen, addToCart, removeFromCart, updateQuantity, clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export default CartContext;
