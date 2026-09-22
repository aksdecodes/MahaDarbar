import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Calendar } from 'lucide-react';

const LocationSection = () => {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Taza+Kitchen+Lane+Ameerpet+Hyderabad";

  return (
    <section id="location-section" style={{ padding: '60px 0', background: 'var(--darbar-bg)' }}>
      <div className="darbar-container">
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">VISIT US AT AMEERPET</span>
          <h2 className="section-heading">Location & Hospitality Hours</h2>
          <p className="section-subtext" style={{ margin: '0 auto' }}>
            Serving authentic Maharashtrian cuisine and daily mess meals in the heart of Ameerpet.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'stretch' }} className="location-grid-responsive">
          
          {/* Left Column: Details Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Address Card */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid var(--darbar-border)', boxShadow: 'var(--darbar-shadow)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', background: '#f5efe6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--darbar-burgundy)', flexShrink: 0 }}>
                  <MapPin size={22} style={{ margin: 'auto' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--darbar-burgundy)', marginBottom: '4px' }}>
                    Maharashtra Darbar
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--darbar-text-main)', lineHeight: 1.5, marginBottom: '14px' }}>
                    Taza Kitchen Lane, East Srinivasa Colony, Ameerpet, Hyderabad, Telangana 500038
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-darbar-primary"
                      style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '10px' }}
                    >
                      <Navigation size={14} /> Get Directions
                    </a>
                    <a
                      href="tel:917276826361"
                      className="btn-darbar-maroon"
                      style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '10px' }}
                    >
                      <Phone size={14} color="#fcd34d" /> Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Numbers Card */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid var(--darbar-border)', boxShadow: 'var(--darbar-shadow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Phone size={20} color="var(--darbar-maroon)" />
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--darbar-burgundy)' }}>
                  Direct Phone Numbers
                </h4>
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '15px', fontWeight: 700, color: 'var(--darbar-maroon)' }}>
                <a href="tel:917276826361" style={{ color: 'var(--darbar-maroon)', textDecoration: 'none' }}>+91 7276826361</a>
                <a href="tel:919021589596" style={{ color: 'var(--darbar-maroon)', textDecoration: 'none' }}>+91 9021589596</a>
              </div>
            </div>

            {/* Hospitality Hours Card */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid var(--darbar-border)', boxShadow: 'var(--darbar-shadow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Clock size={20} color="var(--darbar-maroon)" />
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--darbar-burgundy)' }}>
                  Hospitality & Mess Hours
                </h4>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13.5px' }}>
                <div style={{ background: '#fdfbf7', padding: '12px', borderRadius: '10px', border: '1px solid var(--darbar-border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--darbar-burgundy)', marginBottom: '2px' }}>🍱 Lunch Feast</div>
                  <div style={{ color: 'var(--darbar-text-muted)' }}>11:30 AM – 04:00 PM</div>
                </div>
                <div style={{ background: '#fdfbf7', padding: '12px', borderRadius: '10px', border: '1px solid var(--darbar-border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--darbar-burgundy)', marginBottom: '2px' }}>🌙 Dinner Feast</div>
                  <div style={{ color: 'var(--darbar-text-muted)' }}>07:00 PM – 10:00 PM</div>
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '12.5px', color: 'var(--darbar-amber)', fontWeight: 600 }}>
                *Daily Mess Hours: 12:00 PM – 03:00 PM & 07:00 PM – 09:30 PM (Open 7 Days a week)*
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed Frame */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid var(--darbar-border)',
            boxShadow: 'var(--darbar-shadow)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            <div style={{ padding: '16px 20px', background: 'var(--darbar-burgundy)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="#fcd34d" /> Maharashtra Darbar Location Map
              </span>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#f3e5ab', fontSize: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
              >
                <span>Open in Maps</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <div style={{ flex: 1, minHeight: '340px', width: '100%', position: 'relative' }}>
              <iframe
                title="Maharashtra Darbar Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4716766467385!2d78.4449!3d17.4363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzEwLjciTiA3OMKwMjYnNDEuNiJF!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '340px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div style={{ padding: '14px 20px', background: '#fdfbf7', borderTop: '1px solid var(--darbar-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'var(--darbar-text-muted)' }}>Landmark: Near Taza Kitchen, Ameerpet</span>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', fontWeight: 800, color: 'var(--darbar-maroon)', textDecoration: 'none' }}>
                Get Live Directions &rarr;
              </a>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 840px) {
          .location-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default LocationSection;
