import React from 'react';
import { useCart } from '../../contexts/CartContext';

const FoodCard = ({ item }) => {
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  
  if (!item) return null;

  const cartItem = cartItems?.find(ci => ci._id === item._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const getCategoryGradient = (category) => {
    switch (category?.toLowerCase()) {
      case 'thali': return 'from-orange-400 to-[#FF6B00]';
      case 'mess': return 'from-[#8B1A1A] to-red-900';
      case 'combos': return 'from-[#D4A843] to-yellow-600';
      case 'veg': return 'from-green-500 to-green-700';
      case 'non-veg': return 'from-red-500 to-red-800';
      default: return 'from-gray-300 to-gray-500';
    }
  };

  const isBestseller = item.tags?.includes('bestseller');

  const handleAdd = () => {
    addToCart(item);
  };

  const handleIncrease = () => {
    updateQuantity(item._id, quantityInCart + 1);
  };

  const handleDecrease = () => {
    if (quantityInCart > 1) {
      updateQuantity(item._id, quantityInCart - 1);
    } else {
      removeFromCart(item._id);
    }
  };

  return (
    <div className="food-card bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col w-full sm:w-[280px]">
      {/* Top Banner/Image Placeholder */}
      <div className={`h-24 bg-gradient-to-r ${getCategoryGradient(item.category)} relative flex items-center justify-center`}>
        {/* Tag / Bestseller */}
        {isBestseller && (
          <div className="absolute top-2 left-2 bg-white text-[#8B1A1A] text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
            ★ Bestseller
          </div>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
        {/* Name and Veg/NonVeg Indicator */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 text-base leading-tight pr-2">{item.name}</h3>
          <div 
            className={`flex-shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center mt-1 ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}
            title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
          >
            <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-[13px] line-clamp-2 mb-3 min-h-[38px]">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="font-bold text-[#FF6B00] text-lg">
            ₹{item.price}
          </div>

          {quantityInCart > 0 ? (
            <div className="flex items-center gap-3 bg-orange-50 rounded-lg p-1 border border-orange-200">
              <button 
                onClick={handleDecrease}
                className="w-7 h-7 flex items-center justify-center bg-white text-gray-700 rounded shadow-sm hover:bg-gray-100 font-bold"
              >
                -
              </button>
              <span className="font-bold w-4 text-center text-[#FF6B00]">{quantityInCart}</span>
              <button 
                onClick={handleIncrease}
                className="w-7 h-7 flex items-center justify-center bg-[#FF6B00] text-white rounded shadow-sm hover:bg-orange-600 font-bold"
              >
                +
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAdd}
              className="bg-[#FF6B00] text-white font-bold px-5 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm text-sm"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
