import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';

const MemberLayout = () => {
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkStyle = ({ isActive }) => ({
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    color: isActive ? '#FF9933' : '#555',
    borderBottom: isActive ? '3px solid #FF9933' : '3px solid transparent',
    fontWeight: isActive ? 'bold' : 'normal',
    display: 'inline-block'
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header */}
      <header style={{ background: 'white', borderBottom: '1px solid #eee', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#FF9933', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.2rem' }}>MD</div>
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#333' }}>Maharashtra Darbar</h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ color: '#666' }}>Hello, <strong>{user?.name || 'Member'}</strong></span>
          <button 
            onClick={handleLogout}
            style={{ background: 'transparent', border: '1px solid #ccc', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', color: '#555' }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ background: 'white', borderBottom: '1px solid #eee', padding: '0 2rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <NavLink to="/member/dashboard" style={navLinkStyle}>Dashboard</NavLink>
        <NavLink to="/member/payments" style={navLinkStyle}>Payments</NavLink>
        <NavLink to="/member/profile" style={navLinkStyle}>Profile</NavLink>
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MemberLayout;
