import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Search, ShoppingBag, User, Sparkles, MapPin, Clock } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const Header = ({ activeCategory, onSelectCategory }) => {
  const navigate = useNavigate();
  const { totalItemCount, setIsCartOpen, pureVegOnly, setPureVegOnly, searchQuery, setSearchQuery } = useCart();

  const handleScrollTo = (id) => {
    if (onSelectCategory) onSelectCategory(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="darbar-header-container" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top Announcement Bar / Top Header */}
      <div className="darbar-topbar">
        <div className="darbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div className="darbar-topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={13} color="#fcd34d" /> Hotline: <a href="tel:917276826361" style={{ color: '#f3e5ab', textDecoration: 'none', fontWeight: 600 }}>+91 7276826361</a>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={13} color="#fcd34d" /> Taza Kitchen Lane, Ameerpet, Hyderabad
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={13} color="#fcd34d" /> Lunch: 11:30 AM - 4:00 PM | Dinner: 7:00 PM - 10:00 PM
            </span>
          </div>

          <div className="darbar-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: 'rgba(22, 163, 74, 0.25)', color: '#4ade80', padding: '2px 10px', borderRadius: '12px', fontSize: '11.5px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px', border: '1px solid rgba(74, 222, 128, 0.3)' }}>
              <span style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%' }}></span>
              Delivery Status: Accepting Orders (30-45 Mins)
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="darbar-header" style={{ padding: '12px 0' }}>
        <div className="darbar-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="darbar-logo-brand">
            <div className="darbar-logo-icon">MD</div>
            <div>
              <div style={{ fontFamily: "'Rozha One', 'Georgia', serif", fontSize: '22px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.02em' }}>
                महाराष्ट्र दरबार
              </div>
              <div style={{ fontSize: '11px', color: '#f3e5ab', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                MAHARASHTRA DARBAR
              </div>
            </div>
          </Link>

          {/* Search Input Bar */}
          <div style={{ flex: 1, maxWidth: '380px', margin: '0 12px', position: 'relative' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={16} color="#9e1c27" style={{ position: 'absolute', left: '14px', zIndex: 2 }} />
              <input
                type="text"
                placeholder="Search thalis, curries, mess plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 14px 9px 40px',
                  borderRadius: '24px',
                  border: '1.5px solid var(--darbar-gold)',
                  background: '#ffffff',
                  fontSize: '13px',
                  color: '#1f1113',
                  outline: 'none',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
                }}
              />
            </div>
          </div>

          {/* Right Controls: Quick Call, Pure Veg Switch, Cart, LOGIN */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'nowrap' }}>
            
            {/* Quick Call */}
            <a
              href="tel:917276826361"
              className="darbar-nav-item"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(243, 229, 171, 0.4)', padding: '7px 14px' }}
            >
              <Phone size={14} color="#fcd34d" />
              <span>Quick Call</span>
            </a>

            {/* Pure Veg Toggle Switch */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.25)', padding: '5px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: pureVegOnly ? '#4ade80' : '#f3e5ab' }}>
                Pure Veg
              </span>
              <label className="veg-switch">
                <input
                  type="checkbox"
                  checked={pureVegOnly}
                  onChange={(e) => setPureVegOnly(e.target.checked)}
                />
                <span className="veg-slider"></span>
              </label>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #32070c 0%, #4a0c13 100%)',
                border: '1.5px solid var(--darbar-gold)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                transition: 'transform 0.2s'
              }}
            >
              <ShoppingBag size={16} color="#fcd34d" />
              <span>Cart</span>
              <span style={{
                background: '#ea580c',
                color: 'white',
                fontSize: '11px',
                fontWeight: 800,
                borderRadius: '12px',
                padding: '1px 7px',
                minWidth: '20px',
                textAlign: 'center'
              }}>
                {totalItemCount}
              </span>
            </button>

            {/* Account LOGIN Area - Clearly Visible */}
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                color: '#ffffff',
                border: '1.5px solid #fcd34d',
                padding: '8px 18px',
                borderRadius: '24px',
                fontWeight: 800,
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(234, 88, 12, 0.4)',
                transition: 'all 0.2s ease',
                letterSpacing: '0.04em'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <User size={16} color="#ffffff" />
              <span>LOGIN</span>
            </button>

          </div>
        </div>
      </div>

      {/* Category Horizontal Sub-Navigation Bar */}
      <div className="darbar-category-bar" style={{ padding: '8px 0', overflowX: 'auto' }}>
        <div className="darbar-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
          <button
            onClick={() => handleScrollTo('menu-preview-section')}
            className={`category-pill ${activeCategory === 'all' || activeCategory === 'menu-preview-section' ? 'active' : ''}`}
          >
            <Sparkles size={13} style={{ display: 'inline', marginRight: '5px' }} />
            All Dishes
          </button>
          <button
            onClick={() => handleScrollTo('unlimited-thalis')}
            className={`category-pill ${activeCategory === 'unlimited-thali' || activeCategory === 'unlimited-thalis' ? 'active' : ''}`}
          >
            Unlimited Thalis
          </button>
          <button
            onClick={() => handleScrollTo('traditional-thalis')}
            className={`category-pill ${activeCategory === 'traditional-thali' || activeCategory === 'traditional-thalis' ? 'active' : ''}`}
          >
            Traditional Thalis
          </button>
          <button
            onClick={() => handleScrollTo('special-combos')}
            className={`category-pill ${activeCategory === 'special-combos' ? 'active' : ''}`}
          >
            Special Combos
          </button>
          <button
            onClick={() => handleScrollTo('curries-paneer-staples')}
            className={`category-pill ${activeCategory === 'curries-paneer' || activeCategory === 'curries-paneer-staples' ? 'active' : ''}`}
          >
            Curries, Paneer & Staples
          </button>
          <button
            onClick={() => handleScrollTo('non-veg-specials')}
            className={`category-pill ${activeCategory === 'non-veg' || activeCategory === 'non-veg-specials' ? 'active' : ''}`}
          >
            Non-Veg Specials
          </button>
          <button
            onClick={() => handleScrollTo('mess-section')}
            className={`category-pill ${activeCategory === 'mess-section' ? 'active' : ''}`}
          >
            Mess & Tiffin
          </button>
          <button
            onClick={() => handleScrollTo('reviews-section')}
            className={`category-pill ${activeCategory === 'reviews-section' ? 'active' : ''}`}
          >
            Reviews
          </button>
          <button
            onClick={() => handleScrollTo('location-section')}
            className={`category-pill ${activeCategory === 'location-section' ? 'active' : ''}`}
          >
            Location
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
