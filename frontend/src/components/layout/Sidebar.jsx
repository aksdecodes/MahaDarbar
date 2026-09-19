import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { admin, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/members', label: 'Members', icon: Users },
    { path: '/groceries', label: 'Groceries', icon: ShoppingCart }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">MD</div>
        <div>
          <div style={{ color: 'white', fontWeight: 600, fontSize: '15px' }}>Maharashtra Darbar</div>
          <div style={{ color: 'var(--sidebar-text)', fontSize: '12px' }}>Mess Management</div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              if (window.innerWidth <= 768) onClose();
            }}
            className={`sidebar-nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div className="avatar-sm" style={{ background: 'var(--primary)', color: 'white' }}>
            {admin?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <div style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>{admin?.name || 'Admin'}</div>
            <div style={{ color: 'var(--sidebar-text)', fontSize: '12px' }}>Administrator</div>
          </div>
        </div>
        <button 
          onClick={logout}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            width: '100%', padding: '10px', 
            background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px',
            color: 'var(--sidebar-text)', cursor: 'pointer', fontSize: '14px', transition: 'background 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
