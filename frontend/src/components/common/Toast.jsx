import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const icons = {
  success: <CheckCircle color="var(--active)" size={20} />,
  error: <AlertCircle color="var(--due)" size={20} />,
  warning: <AlertTriangle color="#f59e0b" size={20} />,
  info: <Info color="#3b82f6" size={20} />
};

const Toast = ({ id, type, message, duration, onRemove }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => onRemove(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onRemove]);

  return (
    <div className={`toast ${type}`}>
      {icons[type]}
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={() => onRemove(id)}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
