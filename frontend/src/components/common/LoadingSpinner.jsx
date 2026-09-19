import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ fullPage = false, message = 'Loading...' }) => {
  const containerStyle = fullPage ? {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg)'
  } : {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={containerStyle}>
      <Loader2 size={40} color="var(--primary)" className="spinner" />
      {message && <div style={{ marginTop: '16px', color: 'var(--text-secondary)', fontWeight: 500 }}>{message}</div>}
    </div>
  );
};

export default LoadingSpinner;
