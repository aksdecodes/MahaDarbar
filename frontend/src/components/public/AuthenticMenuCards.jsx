import React, { useState } from 'react';
import { PHYSICAL_MENU_CARDS } from '../../data/menuData';
import { ZoomIn, X } from 'lucide-react';

const AuthenticMenuCards = () => {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section style={{ padding: '60px 0', background: 'var(--darbar-bg)' }}>
      <div className="darbar-container">
        
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-tag">PHYSICAL MENU CARD GALLERY</span>
          <h2 className="section-heading">Authentic Darbar Menu Cards</h2>
          <p className="section-subtext" style={{ margin: '0 auto' }}>
            Explore our printed menu cards so you can view all items, prices, and mess details.
          </p>
        </div>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {PHYSICAL_MENU_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => setActiveImage(card)}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--darbar-border)',
                boxShadow: 'var(--darbar-shadow)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--darbar-shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--darbar-shadow)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden', background: '#f5efe6' }}>
                <img
                  src={card.image}
                  alt={card.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(74, 12, 19, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.25s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <span style={{ background: '#ffffff', color: 'var(--darbar-burgundy)', padding: '8px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ZoomIn size={14} /> Expand Menu Card
                  </span>
                </div>
              </div>

              <div style={{ padding: '14px', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--darbar-burgundy)' }}>
                  {card.title}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--darbar-text-muted)', marginTop: '2px' }}>
                  {card.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Expanded Modal */}
      {activeImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(6px)'
        }} onClick={() => setActiveImage(null)}>
          <div style={{
            position: 'relative',
            maxWidth: '850px',
            maxHeight: '90vh',
            background: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveImage(null)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'rgba(0,0,0,0.7)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>
            <img
              src={activeImage.image}
              alt={activeImage.title}
              style={{ width: '100%', height: 'auto', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
            />
            <div style={{ padding: '12px', background: 'var(--darbar-burgundy)', color: '#ffffff', textAlign: 'center', fontWeight: 700 }}>
              {activeImage.title}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuthenticMenuCards;
