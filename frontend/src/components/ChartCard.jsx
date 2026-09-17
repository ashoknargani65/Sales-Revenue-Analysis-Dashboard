// ============================================================
// ChartCard.jsx — Wrapper card for Recharts charts
// ============================================================

import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import ErrorMessage from './ErrorMessage';

const ChartCard = ({
  title,
  subtitle,
  children,
  loading = false,
  error = null,
  empty = false,
  onRetry,
  className = '',
  actions,
}) => {
  return (
    <div className={`chart-card ${className}`}>
      <div className="chart-card__header">
        <div>
          <h3 className="chart-card__title">{title}</h3>
          {subtitle && <p className="chart-card__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="chart-card__actions">{actions}</div>}
      </div>

      <div className="chart-card__body">
        {loading ? (
          <div className="chart-card__state">
            <LoadingSpinner size="md" label="Loading chart…" />
          </div>
        ) : error ? (
          <div className="chart-card__state">
            <ErrorMessage message={error} onRetry={onRetry} compact />
          </div>
        ) : empty ? (
          <div className="chart-card__state">
            <EmptyState compact />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default ChartCard;
