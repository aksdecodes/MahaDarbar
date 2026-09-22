import React from 'react';
import { MessageSquare, Star } from 'lucide-react';

const AnnouncementBar = () => {
  const handleWhatsAppEnquiry = () => {
    const message = encodeURIComponent("Hello Maharashtra Darbar, I would like to enquire about the Ameerpet Student Mess & Tiffin Service (₹60/meal pack).");
    window.open(`https://wa.me/917276826361?text=${message}`, '_blank');
  };

  return (
    <div style={{
      background: 'linear-gradient(90deg, #7a1520 0%, #9e1c27 50%, #7a1520 100%)',
      color: '#ffffff',
      padding: '12px 0',
      borderTop: '1px solid rgba(212, 175, 55, 0.4)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.4)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    }}>
      <div className="darbar-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: '#f3e5ab' }}>
          <Star size={16} color="#fcd34d" fill="#fcd34d" />
          <span>Ameerpet Student Pack: Daily Homely Meals Available starting at <strong style={{ color: '#ffffff', fontSize: '16px' }}>₹60 / meal</strong></span>
        </div>

        <button
          onClick={handleWhatsAppEnquiry}
          style={{
            background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
            color: '#ffffff',
            border: '1px solid #fcd34d',
            padding: '6px 18px',
            borderRadius: '20px',
            fontSize: '12.5px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          <MessageSquare size={14} color="#ffffff" />
          <span>Enquire on WhatsApp &gt;</span>
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
