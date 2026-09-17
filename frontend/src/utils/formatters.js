// ============================================================
// formatters.js — Reusable number / date formatting utilities
// ============================================================

/**
 * Format a number as Indian Rupee currency (₹).
 * Large values are shortened to lakhs (L) or crores (Cr).
 */
export const formatCurrency = (value, compact = false) => {
  if (value === null || value === undefined || isNaN(value)) return '—';
  const num = Number(value);

  if (compact) {
    if (Math.abs(num) >= 1_00_00_000) {
      return `₹${(num / 1_00_00_000).toFixed(2)}Cr`;
    }
    if (Math.abs(num) >= 1_00_000) {
      return `₹${(num / 1_00_000).toFixed(2)}L`;
    }
    if (Math.abs(num) >= 1_000) {
      return `₹${(num / 1_000).toFixed(1)}K`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};

/**
 * Format a number as compact INR for KPI cards (₹12.45L).
 */
export const formatCompactCurrency = (value) => formatCurrency(value, true);

/**
 * Format a plain number with Indian locale grouping.
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return Number(value).toLocaleString('en-IN');
};

/**
 * Format a percentage value.
 */
export const formatPercent = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Format a date string into a readable format.
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

/**
 * Format bytes into human-readable file size.
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

/**
 * Return a + or – prefixed string for change indicators.
 */
export const formatChange = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '—';
  const num = Number(value);
  return num >= 0 ? `+${num.toFixed(1)}%` : `${num.toFixed(1)}%`;
};

/**
 * Recharts Y-axis tick formatter for currency.
 */
export const yAxisCurrencyFormatter = (value) => {
  if (Math.abs(value) >= 1_00_000) return `₹${(value / 1_00_000).toFixed(0)}L`;
  if (Math.abs(value) >= 1_000) return `₹${(value / 1_000).toFixed(0)}K`;
  return `₹${value}`;
};
