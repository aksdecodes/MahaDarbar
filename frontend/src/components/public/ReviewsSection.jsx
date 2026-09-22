import React from 'react';
import { CUSTOMER_REVIEWS } from '../../data/menuData';
import { Star, Quote } from 'lucide-react';

const ReviewsSection = () => {
  return (
    <section id="reviews-section" style={{ padding: '60px 0', background: '#ffffff' }}>
      <div className="darbar-container">
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">REAL VOICES FROM OUR CUSTOMERS</span>
          <h2 className="section-heading">Loved by Students & Families Alike</h2>
          <p className="section-subtext" style={{ margin: '0 auto' }}>
            Real voices from Maharashtra Darbar's growing community in Ameerpet.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              style={{
                background: '#fdfbf7',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid var(--darbar-border)',
                boxShadow: 'var(--darbar-shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <Quote size={32} color="rgba(122, 21, 32, 0.12)" style={{ position: 'absolute', top: '20px', right: '20px' }} />

              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} color="#d97706" fill="#d97706" />
                  ))}
                </div>

                <p style={{ fontSize: '14.5px', color: 'var(--darbar-text-main)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '20px' }}>
                  "{rev.review}"
                </p>
              </div>

              <div style={{ paddingTop: '14px', borderTop: '1px solid var(--darbar-border)' }}>
                <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--darbar-burgundy)' }}>
                  {rev.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--darbar-amber)', fontWeight: 600, marginTop: '2px' }}>
                  {rev.category}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
