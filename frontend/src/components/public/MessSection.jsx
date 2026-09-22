import React from 'react';
import { Phone, MessageSquare, Utensils, Truck, CalendarCheck, CheckCircle2 } from 'lucide-react';

const MessSection = () => {
  const handleWhatsAppMess = () => {
    const message = encodeURIComponent("Hello Maharashtra Darbar, I want to enroll in the Ameerpet Mess / Tiffin service. Please share monthly plan details & menu.");
    window.open(`https://wa.me/917276826361?text=${message}`, '_blank');
  };

  return (
    <section id="mess-section" style={{ padding: '60px 0', background: '#ffffff' }}>
      <div className="darbar-container">
        
        <div className="mess-banner-box">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '36px', alignItems: 'center' }} className="mess-grid-responsive">
            
            {/* Left Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span style={{
                  color: '#fcd34d',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  DAILY MESS & TIFFIN SERVICE
                </span>
                <h2 style={{
                  fontFamily: "'Rozha One', Georgia, serif",
                  fontSize: 'clamp(26px, 3.5vw, 36px)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.25
                }}>
                  Looking for a Daily Mess or Office Tiffin in Ameerpet?
                </h2>
              </div>

              <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '15px', lineHeight: 1.6 }}>
                Clean, wholesome, and fresh meals at Ameerpet's most loved mess service! Delivery options available for students, coaching students, and working professionals around Ameerpet, SR Nagar, and Punjagutta.
              </p>

              {/* Stat Boxes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }} className="mess-stats-responsive">
                
                <div className="mess-stat-pill">
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#fcd34d', marginBottom: '4px' }}>
                    ₹60 / meal
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
                    Student Mess Pack
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                    Homely Daily Tasty Meal
                  </div>
                </div>

                <div className="mess-stat-pill">
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#fcd34d', marginBottom: '4px' }}>
                    ₹2,800 / mo
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
                    Ladies Kitchen Plus
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                    Monthly Unlimited Meal
                  </div>
                </div>

                <div className="mess-stat-pill">
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#4ade80', marginBottom: '4px' }}>
                    Free Doorstep
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
                    Subscription Delivery
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                    Within 2.5 km of Ameerpet
                  </div>
                </div>

              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: '#f3e5ab' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#4ade80" /> Hot Phulkas & Pure Ghee Dal
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#4ade80" /> Customized Monthly Menu
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#4ade80" /> Breakfast, Lunch & Dinner
                </span>
              </div>
            </div>

            {/* Right Card: Direct Mess Enrollment */}
            <div style={{
              background: '#fdfbf7',
              borderRadius: '20px',
              padding: '30px 24px',
              color: '#1f1113',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              border: '2px solid var(--darbar-gold)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#f5efe6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '1.5px solid var(--darbar-gold)'
              }}>
                <Utensils size={28} color="var(--darbar-burgundy)" />
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--darbar-burgundy)', marginBottom: '8px' }}>
                Direct Mess Enrollment
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--darbar-text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
                Speak directly to our Mess Manager to customize your monthly plan & delivery timings.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href="tel:917276826361"
                  style={{
                    background: 'var(--darbar-burgundy)',
                    color: '#ffffff',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(74, 12, 19, 0.25)'
                  }}
                >
                  <Phone size={16} color="#fcd34d" />
                  <span>Call +91 7276826361</span>
                </a>

                <button
                  onClick={handleWhatsAppMess}
                  style={{
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
                  }}
                >
                  <MessageSquare size={16} color="#ffffff" />
                  <span>WhatsApp Mess Captain</span>
                </button>
              </div>

              <div style={{ fontSize: '11.5px', color: 'var(--darbar-text-muted)', marginTop: '16px' }}>
                ⚡ Instant Mess Seat Booking Available
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .mess-grid-responsive {
            grid-template-columns: 1fr !important;
          }
          .mess-stats-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default MessSection;
