import React from 'react';

const Badge = ({ status, stockStatus, size = 'md', children, type }) => {
  if (stockStatus) {
    let className = 'in-stock';
    let label = 'In Stock';

    if (stockStatus === 'LOW_STOCK') {
      className = 'low-stock';
      label = 'Low Stock';
    } else if (stockStatus === 'OUT_OF_STOCK') {
      className = 'out-of-stock';
      label = 'Out of Stock';
    }

    return (
      <span className={`badge ${className}`}>
        <span className={`status-dot ${className}`}></span>
        {label}
      </span>
    );
  }

  if (status) {
    const isAct = status === 'ACTIVE';
    return (
      <span className={`badge ${isAct ? 'active' : 'due'}`}>
        <span className={`status-dot ${isAct ? 'active' : 'due'}`}></span>
        {status}
      </span>
    );
  }

  if (type) {
    return (
      <span className={`badge ${type.toLowerCase().replace(/\s+/g, '-')}`}>
        {children || type}
      </span>
    );
  }

  return <span className="badge">{children}</span>;
};

export default Badge;
