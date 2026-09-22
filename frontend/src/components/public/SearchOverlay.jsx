import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const SearchOverlay = ({ isOpen, onClose, menuItems = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'auto';
      setSearchTerm('');
      setResults([]);
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = menuItems.filter(item => 
      item.name?.toLowerCase().includes(lowerTerm) ||
      item.description?.toLowerCase().includes(lowerTerm) ||
      item.category?.toLowerCase().includes(lowerTerm)
    );
    setResults(filtered);
  }, [searchTerm, menuItems]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay fixed inset-0 z-[3000] bg-white flex flex-col">
      {/* Search Header */}
      <div className="border-b border-gray-200 p-4 flex items-center gap-4 bg-white sticky top-0">
        <Search className="w-6 h-6 text-gray-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for dishes, thalis, or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 text-lg font-medium outline-none placeholder-gray-400 bg-transparent"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="p-2 text-gray-400 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        )}
        <button 
          onClick={onClose}
          className="ml-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          {searchTerm && results.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg">No results found for "{searchTerm}"</p>
              <p className="text-sm mt-2">Try searching for 'thali', 'paneer', or 'chicken'</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {results.map(item => (
                <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-orange-200 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                      </div>
                      <h4 className="font-bold text-gray-800">{item.name}</h4>
                      <span className="text-[10px] uppercase font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-2">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-1 mb-2">{item.description}</p>
                    <div className="font-bold text-[#FF6B00]">₹{item.price}</div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      addToCart(item);
                      onClose(); // Optional: close search on add, or leave open to add more
                    }}
                    className="ml-4 bg-orange-50 hover:bg-[#FF6B00] text-[#FF6B00] hover:text-white border border-[#FF6B00] px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm"
                  >
                    ADD
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Quick suggestions when empty */}
          {!searchTerm && (
            <div className="mt-8">
              <h3 className="text-gray-400 font-medium text-sm mb-4 uppercase tracking-wider">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {['Unlimited Thali', 'Chicken Saoji', 'Paneer Butter Masala', 'Student Mess', 'Veg Combo'].map((term, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSearchTerm(term)}
                    className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
