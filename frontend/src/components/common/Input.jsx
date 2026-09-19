import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, required, className, ...props }, ref) => {
  return (
    <div className={`form-group ${className || ''}`}>
      {label && (
        <label className={`form-label ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      {props.type === 'textarea' ? (
        <textarea 
          ref={ref}
          className={`form-input ${error ? 'error' : ''}`}
          {...props}
        />
      ) : (
        <input 
          ref={ref}
          className={`form-input ${error ? 'error' : ''}`}
          {...props}
        />
      )}
      {error && <div className="form-error">{error}</div>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
