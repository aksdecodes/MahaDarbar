import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageSquare, Clock, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#290509', color: '#f3e5ab', borderTop: '3px solid var(--darbar-gold)', paddingTop: '60px', paddingBottom: '30px' }}>
      <div className="darbar-container">
        
        {/* Main Columns Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: '32px', marginBottom: '48px' }} className="footer-grid-responsive">
          
          {/* Column 1: Brand & Story */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #7a1520 0%, #4a0c13 100%)',
                border: '1px solid var(--darbar-gold)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '18px',
                color: 'var(--darbar-gold)'
              }}>
                MD
              </div>
              <div>
                <div style={{ fontFamily: "'Rozha One', Georgia, serif", fontSize: '20px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                  महाराष्ट्र दरबार
                </div>
                <div style={{ fontSize: '10.5px', color: '#f3e5ab', letterSpacing: '0.08em' }}>
                  MAHARASHTRA DARBAR
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
              Bringing the true taste of Maharashtra to Ameerpet, Hyderabad. Serving authentic Nagpur Thalis, Saoji Curries, and daily mess meals prepared with love and pure ingredients.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: '#f3e5ab' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="#fcd34d" /> Taza Kitchen Lane, Ameerpet, Hyderabad
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} color="#fcd34d" /> +91 7276826361 / +91 9021589596
              </span>
            </div>
          </div>

          {/* Column 2: Menu Categories */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '16px', borderBottom: '1.5px solid rgba(212, 175, 55, 0.3)', paddingBottom: '8px' }}>
              Our Menu
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><a href="#menu-preview-section" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Unlimited Thalis</a></li>
              <li><a href="#menu-preview-section" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Traditional Thalis</a></li>
              <li><a href="#menu-preview-section" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Special Combos</a></li>
              <li><a href="#menu-preview-section" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Paneer Specialities</a></li>
              <li><a href="#menu-preview-section" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Saoji Non-Veg</a></li>
            </ul>
          </div>

          {/* Column 3: Mess & Tiffin */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '16px', borderBottom: '1.5px solid rgba(212, 175, 55, 0.3)', paddingBottom: '8px' }}>
              Mess & Tiffin
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><a href="#mess-section" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Daily Mess Pack (₹60)</a></li>
              <li><a href="#mess-section" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Monthly Subscription</a></li>
              <li><a href="#mess-section" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Office Tiffin Box</a></li>
              <li><a href="#mess-section" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Ladies Kitchen Plus</a></li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '16px', borderBottom: '1.5px solid rgba(212, 175, 55, 0.3)', paddingBottom: '8px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><Link to="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Home</Link></li>
              <li><a href="#menu-preview-section" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Menu</a></li>
              <li><a href="#reviews-section" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Reviews</a></li>
              <li><a href="#location-section" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Location</a></li>
              <li><Link to="/login" style={{ color: '#fcd34d', fontWeight: 700, textDecoration: 'none' }}>Admin Login</Link></li>
            </ul>
          </div>

          {/* Column 5: Hospitality Hours */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '16px', borderBottom: '1.5px solid rgba(212, 175, 55, 0.3)', paddingBottom: '8px' }}>
              Hospitality Hours
            </h4>
            <div style={{ fontSize: '12.5px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'rgba(255,255,255,0.8)' }}>
              <div>
                <strong style={{ color: '#ffffff' }}>Lunch Feast:</strong><br />11:30 AM – 04:00 PM
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>Dinner Feast:</strong><br />07:00 PM – 10:00 PM
              </div>
              <div style={{ color: '#fcd34d', fontWeight: 600, fontSize: '11.5px', marginTop: '4px' }}>
                Open 7 Days A Week
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.6)'
        }}>
          <div>
            © 2026 Maharashtra Darbar, Ameerpet. Celebrating Maharashtrian Culinary Heritage. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Crafted with</span>
            <Heart size={13} color="#ef4444" fill="#ef4444" />
            <span>for Ameerpet Foodies</span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid-responsive {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 550px) {
          .footer-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
