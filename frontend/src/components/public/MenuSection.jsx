import React from 'react';
import { UNLIMITED_THALIS, TRADITIONAL_THALIS, SPECIAL_COMBOS, PANEER_SPECIALITIES, SAOJI_NONVEG_SPECIALS, MAHARASHTRIAN_VEG_CURRIES, HOMESTYLE_DALS, BREADS_RICE } from '../../data/menuData';
import MenuCard from './MenuCard';
import { useCart } from '../../contexts/CartContext';

const MenuSection = () => {
  const { pureVegOnly, searchQuery } = useCart();

  const filterItem = (item) => {
    if (pureVegOnly && item.isVeg === false) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = (item.description || item.desc || '').toLowerCase().includes(q);
      return matchName || matchDesc;
    }
    return true;
  };

  const filteredUnlimited = UNLIMITED_THALIS.filter(filterItem);
  const filteredTraditional = TRADITIONAL_THALIS.filter(filterItem);
  const filteredCombos = SPECIAL_COMBOS.filter(filterItem);
  const filteredPaneer = PANEER_SPECIALITIES.filter(filterItem);
  const filteredSaoji = SAOJI_NONVEG_SPECIALS.filter(filterItem);
  const filteredMaharashtrian = MAHARASHTRIAN_VEG_CURRIES.filter(filterItem);
  const filteredDals = HOMESTYLE_DALS.filter(filterItem);
  const filteredBreads = BREADS_RICE.filter(filterItem);

  return (
    <div id="menu-preview-section" style={{ padding: '60px 0', background: 'var(--darbar-bg)' }}>
      <div className="darbar-container">
        
        {/* SECTION 1: Royal Unlimited Thalis */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-tag">OUR SIGNATURE ROYAL SELECTION</span>
            <h2 className="section-heading">Royal Unlimited Thalis</h2>
            <p className="section-subtext" style={{ margin: '0 auto' }}>
              Served with unlimited hot fresh phulkas, rice, and traditional Maharashtrian curries.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {filteredUnlimited.map(dish => (
              <MenuCard key={dish.id} item={dish} layout="grid" />
            ))}
          </div>
        </div>

        {/* SECTION 2: Traditional Thalis */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ marginBottom: '28px' }}>
            <span className="section-tag">TRADITIONAL FLAVORS & HOMELY TASTE</span>
            <h2 className="section-heading">Traditional Thalis</h2>
            <p className="section-subtext">
              Freshly prepared daily serving home-style cooking for students & professionals.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {filteredTraditional.map(dish => (
              <MenuCard key={dish.id} item={dish} layout="grid" />
            ))}
          </div>
        </div>

        {/* SECTION 3: Special Combos */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ marginBottom: '28px' }}>
            <span className="section-tag">SATISFYING PLATES & COMBOS</span>
            <h2 className="section-heading">Special Combos</h2>
            <p className="section-subtext">
              Quick satisfying meal combinations cooked fresh to order.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredCombos.map(dish => (
              <MenuCard key={dish.id} item={dish} layout="grid" />
            ))}
          </div>
        </div>

        {/* SECTION 4: Curries, Paneer & Mess Staples (A La Carte Kitchen) */}
        <div>
          <div style={{ marginBottom: '32px' }}>
            <span className="section-tag">A LA CARTE KITCHEN</span>
            <h2 className="section-heading">Curries, Paneer & Mess Staples</h2>
            <p className="section-subtext">
              Order individual items for sharing or meal customization.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }} className="carte-responsive-grid">
            
            {/* Column 1: Paneer Specialities */}
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid var(--darbar-border)', boxShadow: 'var(--darbar-shadow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', paddingBottom: '12px', borderBottom: '2px solid var(--darbar-gold)' }}>
                <span className="darbar-badge-veg"></span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--darbar-burgundy)' }}>
                  Paneer Specialities
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredPaneer.map(item => (
                  <MenuCard key={item.id} item={item} layout="compact-list" />
                ))}
              </div>
            </div>

            {/* Column 2: Nagpur Saoji & Non-Veg Specials */}
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid var(--darbar-border)', boxShadow: 'var(--darbar-shadow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', paddingBottom: '12px', borderBottom: '2px solid var(--darbar-red)' }}>
                <span className="darbar-badge-nonveg"></span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--darbar-burgundy)' }}>
                  Saoji & Non-Veg Specials
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredSaoji.map(item => (
                  <MenuCard key={item.id} item={item} layout="compact-list" />
                ))}
              </div>
            </div>

          </div>

          {/* Sub-lists: Maharashtrian Veg Curries, Homestyle Dals, Breads & Rice */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            
            {/* Maharashtrian Veg Curries */}
            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid var(--darbar-border)' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--darbar-burgundy)', marginBottom: '14px', borderBottom: '1px solid var(--darbar-border)', paddingBottom: '8px' }}>
                Maharashtrian Veg Curries
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredMaharashtrian.map(item => (
                  <MenuCard key={item.id} item={item} layout="compact-list" />
                ))}
              </div>
            </div>

            {/* Homestyle Dals */}
            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid var(--darbar-border)' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--darbar-burgundy)', marginBottom: '14px', borderBottom: '1px solid var(--darbar-border)', paddingBottom: '8px' }}>
                Homestyle Dals
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredDals.map(item => (
                  <MenuCard key={item.id} item={item} layout="compact-list" />
                ))}
              </div>
            </div>

            {/* Breads & Rice */}
            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid var(--darbar-border)' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--darbar-burgundy)', marginBottom: '14px', borderBottom: '1px solid var(--darbar-border)', paddingBottom: '8px' }}>
                Breads & Rice
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredBreads.map(item => (
                  <MenuCard key={item.id} item={item} layout="compact-list" />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 840px) {
          .carte-responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MenuSection;
