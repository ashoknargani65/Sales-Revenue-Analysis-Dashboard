// ============================================================
// LoadingSpinner.jsx — Reusable loading indicator
// ============================================================

import React from 'react';

const LoadingSpinner = ({ size = 'md', label = 'Loading…', fullPage = false }) => {
  const sizeMap = { sm: 20, md: 36, lg: 56 };
  const px = sizeMap[size] || 36;

  const spinner = (
    <div className="spinner" role="status" aria-label={label} style={{ '--size': `${px}px` }}>
      <div className="spinner__ring" />
      <span className="spinner__label">{label}</span>
    </div>
  );

  if (fullPage) {
    return <div className="spinner-overlay">{spinner}</div>;
  }

  return spinner;
};

export default LoadingSpinner;
