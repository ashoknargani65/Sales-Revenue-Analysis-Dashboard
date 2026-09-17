// ============================================================
// KPICard.jsx — Individual KPI metric card with change indicator
// ============================================================

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const KPICard = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'indigo',
  loading = false,
  subtitle,
}) => {
  const isPositive = change > 0;
  const isNeutral = change === 0 || change == null;

  if (loading) {
    return (
      <div className="kpi-card kpi-card--loading" aria-busy="true">
        <div className="kpi-card__skeleton kpi-card__skeleton--icon" />
        <div className="kpi-card__skeleton kpi-card__skeleton--title" />
        <div className="kpi-card__skeleton kpi-card__skeleton--value" />
        <div className="kpi-card__skeleton kpi-card__skeleton--change" />
      </div>
    );
  }

  return (
    <article className={`kpi-card kpi-card--${color}`} aria-label={`${title}: ${value}`}>
      <div className="kpi-card__header">
        <div className={`kpi-card__icon-wrap kpi-card__icon-wrap--${color}`}>
          <Icon size={20} aria-hidden="true" />
        </div>
        <div
          className={`kpi-card__change ${
            isNeutral
              ? 'kpi-card__change--neutral'
              : isPositive
              ? 'kpi-card__change--up'
              : 'kpi-card__change--down'
          }`}
        >
          {isNeutral ? (
            <Minus size={12} />
          ) : isPositive ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          {change != null && (
            <span>
              {isPositive ? '+' : ''}
              {change.toFixed(1)}%
            </span>
          )}
        </div>
      </div>

      <div className="kpi-card__body">
        <p className="kpi-card__title">{title}</p>
        <p className="kpi-card__value">{value}</p>
        {subtitle && <p className="kpi-card__subtitle">{subtitle}</p>}
      </div>

      <div className={`kpi-card__bar kpi-card__bar--${color}`} />
    </article>
  );
};

export default KPICard;
