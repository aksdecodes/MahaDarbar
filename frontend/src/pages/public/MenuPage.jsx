import React, { useState, useEffect } from 'react';
import PublicHeader from '../../components/public/PublicHeader';
import PublicFooter from '../../components/public/PublicFooter';
import CartDrawer from '../../components/public/CartDrawer';
import CategoryNav from '../../components/public/CategoryNav';
import FoodCard from '../../components/public/FoodCard';
import menuService from '../../services/menuService';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('name');
  
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await menuService.getMenuItems();
        setMenuItems(res || []);
        setFilteredItems(res || []);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    let result = menuItems;

    // Filter by search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(lowerSearch) || 
        (item.description && item.description.toLowerCase().includes(lowerSearch))
      );
    }

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

    setFilteredItems([...result]);
  }, [searchTerm, activeCategory, sortOption, menuItems]);

  return (
    <div className="menu-page">
      <PublicHeader />
      
      <main className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search our menu..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', flex: '1', minWidth: '200px' }}
          />
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="name">Name A-Z</option>
            <option value="price-asc">Price Low-High</option>
            <option value="price-desc">Price High-Low</option>
          </select>
        </div>

        <CategoryNav 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
          categories={categories}
        />

        <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
          Showing {filteredItems.length} items
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredItems.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      <PublicFooter />
      <CartDrawer />
    </div>
  );
};

export default MenuPage;
