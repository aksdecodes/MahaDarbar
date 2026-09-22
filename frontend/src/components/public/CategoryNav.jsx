import React from 'react';

const CategoryNav = ({ categories = [], activeCategory, onCategoryChange }) => {
  return (
    <div className="category-nav w-full overflow-x-auto hide-scrollbar py-2">
      <div className="flex gap-2 px-4 w-max">
        <button
          onClick={() => onCategoryChange('All')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategory === 'All' 
              ? 'bg-[#FF6B00] text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => onCategoryChange(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat 
                ? 'bg-[#FF6B00] text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
