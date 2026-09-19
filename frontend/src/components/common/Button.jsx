import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  icon: Icon,
  fullWidth = false,
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const widthClass = fullWidth ? 'full-width' : '';
  
  const className = [baseClass, variantClass, sizeClass, widthClass].filter(Boolean).join(' ');

  return (
    <button 
      className={className} 
      disabled={disabled || loading} 
      {...props}
    >
      {loading && <Loader2 className="spinner" size={16} />}
      {!loading && Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

export default Button;
