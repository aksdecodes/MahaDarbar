import React from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const MenuCard = ({ item, layout = 'grid' }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartEntry = cartItems.find(i => i.id === item.id || i.name === item.name);
  const qtyInCart = cartEntry ? cartEntry.quantity : 0;

  if (layout === 'compact-list') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 14px',
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid var(--darbar-border)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <span className={item.isVeg !== false ? 'darbar-badge-veg' : 'darbar-badge-nonveg'}></span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--darbar-burgundy)' }}>
              {item.name}
            </div>
            {item.desc && (
              <div style={{ fontSize: '12px', color: 'var(--darbar-text-muted)' }}>
                {item.desc}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontWeight: 800, fontSize: '15px', color: 'var(--darbar-maroon)' }}>
            ₹{item.price}
          </span>
          {qtyInCart > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--darbar-burgundy)', color: 'white', borderRadius: '6px', padding: '2px 8px' }}>
              <button onClick={() => updateQuantity(item.id, qtyInCart - 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Minus size={13} /></button>
              <span style={{ fontSize: '13px', fontWeight: 800 }}>{qtyInCart}</span>
              <button onClick={() => updateQuantity(item.id, qtyInCart + 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Plus size={13} /></button>
            </div>
          ) : (
            <button onClick={() => addToCart(item)} className="add-cart-btn">
              <Plus size={14} /> ADD
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="darbar-food-card">
      {item.image && (
        <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden', background: '#f5efe6' }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          />
          {item.tag && (
            <span style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'var(--darbar-burgundy)',
              color: '#f3e5ab',
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '12px',
              border: '1px solid var(--darbar-gold)'
            }}>
              {item.tag}
            </span>
          )}
        </div>
      )}

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className={item.isVeg !== false ? 'darbar-badge-veg' : 'darbar-badge-nonveg'}></span>
            {item.badge && (
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--darbar-amber)', background: '#fff7ed', padding: '2px 8px', borderRadius: '10px' }}>
                {item.badge}
              </span>
            )}
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--darbar-burgundy)', marginBottom: '6px' }}>
            {item.name}
          </h3>

          <p style={{ fontSize: '13px', color: 'var(--darbar-text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
            {item.description || item.desc}
          </p>

          {item.features && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {item.features.map((feat, idx) => (
                <span key={idx} style={{ fontSize: '11px', background: '#f4eee7', color: 'var(--darbar-burgundy)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                  {feat}
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--darbar-border)' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--darbar-text-muted)', display: 'block' }}>Price</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--darbar-maroon)' }}>
              ₹{item.price}
            </span>
          </div>

          {qtyInCart > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--darbar-burgundy)', color: 'white', borderRadius: '8px', padding: '6px 12px' }}>
              <button onClick={() => updateQuantity(item.id, qtyInCart - 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Minus size={14} /></button>
              <span style={{ fontSize: '14px', fontWeight: 800, minWidth: '18px', textAlign: 'center' }}>{qtyInCart}</span>
              <button onClick={() => updateQuantity(item.id, qtyInCart + 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Plus size={14} /></button>
            </div>
          ) : (
            <button onClick={() => addToCart(item)} className="add-cart-btn">
              <Plus size={15} /> + ADD TO CART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
