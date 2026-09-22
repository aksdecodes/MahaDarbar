import React, { useEffect } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer fixed inset-0 z-[2000] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-[400px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
        
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-poppins text-gray-900">Your Cart</h2>
            <span className="bg-[#FF6B00] text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-lg font-medium mb-2">Your cart is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-[#FF6B00] font-medium hover:underline"
              >
                Browse our menu
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-4 p-3 bg-white border rounded-xl shadow-sm">
                  {/* Veg Indicator */}
                  <div className="flex-shrink-0 pt-1">
                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm mb-1">{item.name}</h4>
                    <div className="font-medium text-[#FF6B00] text-sm mb-2">₹{item.price}</div>
                    
                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <button 
                          onClick={() => {
                            if (item.quantity > 1) updateQuantity(item._id, item.quantity - 1);
                            else removeFromCart(item._id);
                          }}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm font-bold text-gray-600"
                        >
                          -
                        </button>
                        <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm font-bold text-gray-600"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-400 hover:text-red-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end mt-2">
                <button 
                  onClick={clearCart}
                  className="text-xs text-gray-500 hover:text-red-600 underline"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t bg-gray-50 flex flex-col gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-600">Total Amount</span>
              <span className="font-bold text-gray-900 text-xl">₹{cartTotal}</span>
            </div>
            <button 
              disabled
              className="w-full bg-[#FF6B00] text-white font-bold py-3 rounded-xl shadow-md opacity-80 cursor-not-allowed flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <span className="text-xs bg-white/20 px-2 py-1 rounded">(Coming Soon)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
