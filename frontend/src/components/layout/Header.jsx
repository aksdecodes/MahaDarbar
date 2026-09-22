import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onMenuClick }) => {
  const { admin } = useAuth();
  const location = useLocation();
  
  let pageTitle = 'Dashboard';
  if (location.pathname.startsWith('/members')) {
    pageTitle = 'Members';
  }

  return (
    <header style={{ 
      height: '64px', 
      background: 'white', 
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 90
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={onMenuClick}
          style={{ 
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'none', // hidden on desktop, media query will show it
            color: 'var(--text-secondary)'
          }}
          className="mobile-menu-btn"
        >
          <Menu size={24} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>
          {pageTitle}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
          <Bell size={20} />
          <span style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', background: 'var(--due)', borderRadius: '50%' }}></span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--border)', paddingLeft: '20px' }}>
          <div className="avatar-sm" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)' }}>
            {admin?.name?.charAt(0) || 'A'}
          </div>
          <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', display: 'block' }} className="header-admin-name">
            {admin?.name || 'Admin'}
          </span>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .header-admin-name { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
