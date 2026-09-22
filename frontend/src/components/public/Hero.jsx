import React from 'react';
import { Phone, ArrowRight, ShieldCheck, HeartHandshake, UtensilsCrossed } from 'lucide-react';

const Hero = () => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu-preview-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMess = () => {
    const el = document.getElementById('mess-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-wrapper">
      <div className="darbar-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 420px) 1fr', gap: '48px', alignItems: 'center' }} className="hero-grid-responsive">
          
          {/* Left Column: Stable Ganesh Image Container */}
          <div>
            <div className="hero-image-card">
              <img
                src="/assets/ganesh_idol.jpg"
                alt="Maharashtra Darbar Ganesh Idol"
                loading="eager"
              />
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(50, 7, 12, 0.85)',
                color: '#f3e5ab',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700,
                border: '1px solid rgba(212, 175, 55, 0.5)',
                backdropFilter: 'blur(4px)',
                letterSpacing: '0.05em'
              }}>
                LIVE KITCHEN • AMEERPET
              </div>
              <div style={{
                position: 'absolute',
                bottom: '0',
                insetLineStart: '0',
                insetLineEnd: '0',
                background: 'linear-gradient(to top, rgba(30, 3, 6, 0.95) 0%, transparent 100%)',
                padding: '24px 20px 16px',
                textAlign: 'center'
              }}>
                <div style={{ fontFamily: "'Rozha One', Georgia, serif", color: '#f3e5ab', fontSize: '18px', fontWeight: 700, marginBottom: '2px' }}>
                  स्वाद आणि आपुलकी
                </div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px' }}>
                  Warmth, Taste, and Community Everyday
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Typography & CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Top Tagline Chip */}
            <div>
              <span className="hero-chip">
                ✨ Food • Culture • Community • People • Together
              </span>
            </div>

            {/* Devanagari Brand Heading */}
            <div>
              <h1 style={{
                fontFamily: "'Rozha One', 'Tiro Devanagari Marathi', Georgia, serif",
                fontSize: 'clamp(36px, 5vw, 54px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '0.01em',
                marginBottom: '8px',
                textShadow: '0 4px 15px rgba(0,0,0,0.5)'
              }}>
                महाराष्ट्र दरबार
              </h1>

              {/* Secondary Subheading */}
              <div style={{
                fontFamily: "'Rozha One', Georgia, serif",
                fontSize: 'clamp(20px, 3vw, 26px)',
                fontWeight: 700,
                color: '#fcd34d',
                letterSpacing: '0.02em',
                marginBottom: '14px'
              }}>
                स्वाद महाराष्ट्राचा, मान आपुलकीचा!
              </div>
            </div>

            {/* Paragraph Text */}
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '15.5px',
              lineHeight: 1.6,
              maxWidth: '620px'
            }}>
              Always a warm welcome to students, working pros & families in Ameerpet. Indulge in authentic Nagpur Thalis, spicy Saoji Curries, and daily Eating-Daily mess meals prepared with pure traditional ingredients.
            </p>

            {/* Trust Indicators Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', margin: '4px 0 10px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.08)',
                padding: '7px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.15)'
              }}>
                <ShieldCheck size={16} color="#4ade80" />
                <span>100% Pure Ingredients</span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.08)',
                padding: '7px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.15)'
              }}>
                <UtensilsCrossed size={16} color="#fcd34d" />
                <span>Hygienic Clean & Safe</span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.08)',
                padding: '7px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.15)'
              }}>
                <HeartHandshake size={16} color="#f472b6" />
                <span>Homely Mess Experience</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', marginTop: '6px' }}>
              <button onClick={scrollToMenu} className="btn-darbar-primary">
                <span>Order Online Now</span>
                <ArrowRight size={16} />
              </button>

              <button onClick={scrollToMess} className="btn-darbar-outline">
                <span>Subscribe to Tiffin</span>
              </button>

              <a href="tel:917276826361" className="btn-darbar-maroon">
                <Phone size={16} color="#fcd34d" />
                <span>Call Mess Captain</span>
              </a>
            </div>

            <div style={{ fontSize: '12px', color: '#f3e5ab', fontStyle: 'italic', opacity: 0.9 }}>
              *Ameerpet Mess Service: Daily & Monthly Available*
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            text-align: center;
          }
          .hero-grid-responsive > div:last-child {
            align-items: center;
          }
          .hero-image-card {
            max-width: 320px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
