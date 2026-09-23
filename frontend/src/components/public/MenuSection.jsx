import React from 'react';
import {
  UNLIMITED_THALIS,
  TRADITIONAL_THALIS,
  SPECIAL_COMBOS,
  PANEER_SPECIALITIES,
  SAOJI_NONVEG_SPECIALS,
  MAHARASHTRIAN_VEG_CURRIES,
  HOMESTYLE_DALS,
  BREADS_RICE
} from '../../data/menuData';
import MenuCard from './MenuCard';
import { useCart } from '../../contexts/CartContext';

const MenuSection = () => {
  const { pureVegOnly, searchQuery } = useCart();

  const filterItem = (item) => {
    if (pureVegOnly && item.isVeg === false) return false;
    if (searchQuery) {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      const matchName = (item.name || '').toLowerCase().includes(q);
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

  const totalMatchCount =
    filteredUnlimited.length +
    filteredTraditional.length +
    filteredCombos.length +
    filteredPaneer.length +
    filteredSaoji.length +
    filteredMaharashtrian.length +
    filteredDals.length +
    filteredBreads.length;

  const scrollOffsetStyle = { scrollMarginTop: '130px' };

  return (
    <div id="menu-preview-section" style={{ padding: '60px 0', background: 'var(--darbar-bg)' }}>
      <div className="darbar-container">
        
        {/* No Search Results Message */}
        {totalMatchCount === 0 && searchQuery && (
          <div style={{
            textAlign: 'center',
            padding: '48px 24px',
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid var(--darbar-border)',
            boxShadow: 'var(--darbar-shadow)',
            margin: '20px 0'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--darbar-burgundy)', marginBottom: '8px' }}>
              No menu items found for "{searchQuery}"
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--darbar-text-muted)' }}>
              Please try searching for other terms like "thali", "paneer", "chicken", "dal", or "combos".
            </p>
          </div>
        )}

        {/* SECTION 1: ROYAL UNLIMITED THALIS */}
        {filteredUnlimited.length > 0 && (
          <div id="unlimited-thalis" style={{ ...scrollOffsetStyle, marginBottom: '50px' }}>
            <div style={{ marginBottom: '24px' }}>
              <span className="section-tag">DARBAR'S PRIDE • UNLIMITED</span>
              <h2 className="section-heading">Royal Unlimited Thalis</h2>
              <p className="section-subtext">
                Hearty Maharashtrian Pangat thali dining with unlimited servings.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {filteredUnlimited.map(item => (
                <MenuCard key={item.id} item={item} layout="grid" />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: TRADITIONAL THALIS */}
        {filteredTraditional.length > 0 && (
          <div id="traditional-thalis" style={{ ...scrollOffsetStyle, marginBottom: '50px' }}>
            <div style={{ marginBottom: '24px' }}>
              <span className="section-tag">TRADITIONS & AUTHENTIC REGIONAL TASTE</span>
              <h2 className="section-heading">Traditional Thalis</h2>
              <p className="section-subtext">
                Prepared fresh every single morning & evening.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {filteredTraditional.map(item => (
                <MenuCard key={item.id} item={item} layout="grid" />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: SPECIAL COMBOS */}
        {filteredCombos.length > 0 && (
          <div id="special-combos" style={{ ...scrollOffsetStyle, marginBottom: '50px' }}>
            <div style={{ marginBottom: '24px' }}>
              <span className="section-tag">UNBEATABLE VALUE COMBOS</span>
              <h2 className="section-heading">Special Combos</h2>
              <p className="section-subtext">
                Quick satisfying meal pairs crafted for office lunch hours & quick bites.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {filteredCombos.map(item => (
                <MenuCard key={item.id} item={item} layout="grid" />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: A LA CARTE & NON-VEG KITCHEN */}
        {(filteredPaneer.length > 0 || filteredSaoji.length > 0 || filteredMaharashtrian.length > 0 || filteredDals.length > 0 || filteredBreads.length > 0) && (
          <div>
            {/* TOP HEADINGS - TWO COLUMNS */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px',
                marginBottom: '32px'
              }}
              className="carte-responsive-grid"
            >
              {/* LEFT HEADER */}
              <div id="curries-paneer-staples" style={scrollOffsetStyle}>
                <span className="section-tag">A LA CARTE KITCHEN</span>
                <h2 className="section-heading">Curries, Paneer & Mess Staples</h2>
                <p className="section-subtext">
                  Order individual items for sharing or meal customization.
                </p>
              </div>

              {/* RIGHT HEADER */}
              <div id="non-veg-specials" style={scrollOffsetStyle}>
                <span className="section-tag">NON-VEG KITCHEN</span>
                <h2 className="section-heading">Saoji & Non-Veg Specials</h2>
                <p className="section-subtext">
                  Authentic Maharashtrian non-vegetarian dishes prepared fresh.
                </p>
              </div>
            </div>

            {/* PANEER + NON-VEG CARDS */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px',
                marginBottom: '40px'
              }}
              className="carte-responsive-grid"
            >
              {/* COLUMN 1: PANEER SPECIALITIES */}
              <div
                style={{
                  background: '#ffffff',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid var(--darbar-border)',
                  boxShadow: 'var(--darbar-shadow)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '18px',
                    paddingBottom: '12px',
                    borderBottom: '2px solid var(--darbar-gold)'
                  }}
                >
                  <span className="darbar-badge-veg"></span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--darbar-burgundy)' }}>
                    Paneer Specialities
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {filteredPaneer.length > 0 ? (
                    filteredPaneer.map(item => (
                      <MenuCard key={item.id} item={item} layout="compact-list" />
                    ))
                  ) : (
                    <div style={{ fontSize: '13px', color: 'var(--darbar-text-muted)', fontStyle: 'italic' }}>No paneer items match.</div>
                  )}
                </div>
              </div>

              {/* COLUMN 2: NON-VEG SPECIALS */}
              <div
                style={{
                  background: '#ffffff',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid var(--darbar-border)',
                  boxShadow: 'var(--darbar-shadow)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '18px',
                    paddingBottom: '12px',
                    borderBottom: '2px solid var(--darbar-red)'
                  }}
                >
                  <span className="darbar-badge-nonveg"></span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--darbar-burgundy)' }}>
                    Non-Veg Specials
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {filteredSaoji.length > 0 ? (
                    filteredSaoji.map(item => (
                      <MenuCard key={item.id} item={item} layout="compact-list" />
                    ))
                  ) : (
                    <div style={{ fontSize: '13px', color: 'var(--darbar-text-muted)', fontStyle: 'italic' }}>No non-veg items match.</div>
                  )}
                </div>
              </div>
            </div>

            {/* SUB-LISTS: MAHARASHTRIAN VEG CURRIES, HOMESTYLE DALS, BREADS & RICE */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px'
              }}
            >
              {/* MAHARASHTRIAN VEG CURRIES */}
              {filteredMaharashtrian.length > 0 && (
                <div
                  style={{
                    background: '#ffffff',
                    padding: '20px',
                    borderRadius: '14px',
                    border: '1px solid var(--darbar-border)'
                  }}
                >
                  <h4
                    style={{
                      fontSize: '16px',
                      fontWeight: 800,
                      color: 'var(--darbar-burgundy)',
                      marginBottom: '14px',
                      borderBottom: '1px solid var(--darbar-border)',
                      paddingBottom: '8px'
                    }}
                  >
                    Maharashtrian Veg Curries
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredMaharashtrian.map(item => (
                      <MenuCard key={item.id} item={item} layout="compact-list" />
                    ))}
                  </div>
                </div>
              )}

              {/* HOMESTYLE DALS */}
              {filteredDals.length > 0 && (
                <div
                  style={{
                    background: '#ffffff',
                    padding: '20px',
                    borderRadius: '14px',
                    border: '1px solid var(--darbar-border)'
                  }}
                >
                  <h4
                    style={{
                      fontSize: '16px',
                      fontWeight: 800,
                      color: 'var(--darbar-burgundy)',
                      marginBottom: '14px',
                      borderBottom: '1px solid var(--darbar-border)',
                      paddingBottom: '8px'
                    }}
                  >
                    Homestyle Dals
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredDals.map(item => (
                      <MenuCard key={item.id} item={item} layout="compact-list" />
                    ))}
                  </div>
                </div>
              )}

              {/* BREADS & RICE */}
              {filteredBreads.length > 0 && (
                <div
                  style={{
                    background: '#ffffff',
                    padding: '20px',
                    borderRadius: '14px',
                    border: '1px solid var(--darbar-border)'
                  }}
                >
                  <h4
                    style={{
                      fontSize: '16px',
                      fontWeight: 800,
                      color: 'var(--darbar-burgundy)',
                      marginBottom: '14px',
                      borderBottom: '1px solid var(--darbar-border)',
                      paddingBottom: '8px'
                    }}
                  >
                    Breads & Rice
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredBreads.map(item => (
                      <MenuCard key={item.id} item={item} layout="compact-list" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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
