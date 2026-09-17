// ============================================================
// ErrorMessage.jsx — Error state with retry
// ============================================================

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({
  message = 'Unable to load data.',
  onRetry,
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="error-msg error-msg--compact" role="alert">
        <AlertTriangle size={20} className="error-msg__icon" aria-hidden="true" />
        <span className="error-msg__text">{message}</span>
        {onRetry && (
          <button className="btn btn--ghost btn--sm" onClick={onRetry}>
            <RefreshCw size={12} /> Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="error-msg" role="alert">
      <div className="error-msg__circle">
        <AlertTriangle size={40} aria-hidden="true" />
      </div>
      <h3 className="error-msg__title">Something went wrong</h3>
      <p className="error-msg__text">{message}</p>
      {onRetry && (
        <button className="btn btn--primary" onClick={onRetry}>
          <RefreshCw size={15} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
