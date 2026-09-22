import React from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, subtotal, openWhatsAppCheckout } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="cart-drawer-backdrop" onClick={() => setIsCartOpen(false)} />

      {/* Drawer */}
      <div className="cart-drawer">
        
        {/* Header */}
        <div style={{
          padding: '20px',
          background: 'var(--darbar-burgundy)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid var(--darbar-gold)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="#fcd34d" />
            <h3 style={{ fontSize: '18px', fontWeight: 800, fontFamily: "'Rozha One', Georgia, serif" }}>
              Your Darbar Order
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--darbar-text-muted)' }}>
              <ShoppingBag size={48} color="var(--darbar-border)" style={{ margin: '0 auto 16px' }} />
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--darbar-burgundy)' }}>
                Your cart is empty
              </div>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>
                Add your favorite thalis, combos, or curries to place an order.
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--darbar-border)' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--darbar-burgundy)' }}>
                  Selected Items ({cartItems.length})
                </span>
                <button
                  onClick={clearCart}
                  style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Trash2 size={13} /> Clear All
                </button>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    background: '#fdfbf7',
                    borderRadius: '12px',
                    border: '1px solid var(--darbar-border)',
                    gap: '12px'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--darbar-burgundy)' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--darbar-maroon)', marginTop: '2px' }}>
                      ₹{item.price * item.quantity} <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--darbar-text-muted)' }}>(₹{item.price} each)</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--darbar-burgundy)', color: 'white', borderRadius: '6px', padding: '3px 8px' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Minus size={13} /></button>
                      <span style={{ fontSize: '13px', fontWeight: 800 }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Plus size={13} /></button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div style={{ padding: '20px', background: '#fdfbf7', borderTop: '2px solid var(--darbar-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
              <span style={{ color: 'var(--darbar-text-muted)' }}>Item Subtotal</span>
              <span style={{ fontWeight: 700, color: 'var(--darbar-burgundy)' }}>₹{subtotal}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px dashed var(--darbar-border)' }}>
              <span style={{ color: 'var(--darbar-text-muted)' }}>Estimated Delivery</span>
              <span style={{ fontWeight: 700, color: '#16a34a' }}>FREE (Within 2.5km)</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, marginBottom: '20px', color: 'var(--darbar-burgundy)' }}>
              <span>Total Payable</span>
              <span>₹{subtotal}</span>
            </div>

            <button
              onClick={openWhatsAppCheckout}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 4px 15px rgba(22, 163, 74, 0.35)',
                transition: 'transform 0.2s'
              }}
            >
              <MessageSquare size={18} />
              <span>Order via WhatsApp</span>
              <ArrowRight size={16} />
            </button>
            <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--darbar-text-muted)', marginTop: '8px' }}>
              Direct instant order message sent to Maharashtra Darbar Kitchen
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default CartDrawer;
