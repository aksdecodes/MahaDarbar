import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MENU_CATEGORIES, UNLIMITED_THALIS, TRADITIONAL_THALIS, SPECIAL_COMBOS, PANEER_SPECIALITIES, SAOJI_NONVEG_SPECIALS } from '../data/menuData';
import MenuCard from '../components/public/MenuCard';
import { useCart } from '../contexts/CartContext';
import { ArrowLeft, Sparkles } from 'lucide-react';

const MenuPage = () => {
  const { category: urlCategory } = useParams();
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState(urlCategory || 'all');
  const { pureVegOnly, searchQuery } = useCart();

  const allItems = [
    ...UNLIMITED_THALIS,
    ...TRADITIONAL_THALIS,
    ...SPECIAL_COMBOS,
    ...PANEER_SPECIALITIES.map(p => ({ ...p, category: 'curries-paneer', description: p.desc })),
    ...SAOJI_NONVEG_SPECIALS.map(s => ({ ...s, category: 'non-veg', description: s.desc }))
  ];

  const filteredItems = allItems.filter(item => {
    if (selectedCat !== 'all' && item.category !== selectedCat) return false;
    if (pureVegOnly && item.isVeg === false) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || (item.description || '').toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ padding: '40px 0 80px', background: 'var(--darbar-bg)', minHeight: '80vh' }}>
      <div className="darbar-container">
        
        {/* Navigation Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', color: 'var(--darbar-burgundy)', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={16} /> Back to Homepage
          </button>
          <span style={{ fontSize: '13px', color: 'var(--darbar-text-muted)', fontWeight: 600 }}>
            Showing {filteredItems.length} items
          </span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: "'Rozha One', Georgia, serif", fontSize: '32px', fontWeight: 800, color: 'var(--darbar-burgundy)', marginBottom: '8px' }}>
            Maharashtra Darbar Menu
          </h1>
          <p style={{ color: 'var(--darbar-text-muted)', fontSize: '15px' }}>
            Explore our authentic Maharashtrian thalis, combos, curries, and daily specials.
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '32px' }}>
          {MENU_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`category-pill ${selectedCat === cat.id ? 'active' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {filteredItems.map(item => (
            <MenuCard key={item.id} item={item} layout="grid" />
          ))}
        </div>

      </div>
    </div>
  );
};

export default MenuPage;
