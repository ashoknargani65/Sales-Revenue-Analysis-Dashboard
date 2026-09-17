// ============================================================
// constants.js — Application-wide constants
// ============================================================

export const APP_NAME = 'Sales & Revenue Analysis Dashboard';
export const APP_SHORT_NAME = 'Sales Analytics';

export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/sales-analysis', label: 'Sales Analysis', icon: 'TrendingUp' },
  { path: '/products', label: 'Products', icon: 'Package' },
  { path: '/upload', label: 'Data Upload', icon: 'Upload' },
  { path: '/insights', label: 'Insights', icon: 'Lightbulb' },
];

export const ALLOWED_FILE_TYPES = ['.csv', '.xlsx', '.xls'];
export const ALLOWED_MIME_TYPES = [
  'text/csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

export const CHART_COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  purple: '#a855f7',
  pink: '#ec4899',
  orange: '#f97316',
};

export const CATEGORY_COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#a855f7',
  '#ec4899',
  '#f97316',
  '#14b8a6',
];

export const REGIONS = ['All', 'North', 'South', 'East', 'West'];

export const CATEGORIES = [
  'All',
  'Electronics',
  'Furniture',
  'Clothing',
  'Accessories',
  'Office Supplies',
];

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const TABLE_PAGE_SIZES = [10, 25, 50, 100];

export const API_ENDPOINTS = {
  DASHBOARD_SUMMARY: '/dashboard/summary',
  REVENUE_TREND: '/dashboard/revenue-trend',
  SALES_TREND: '/dashboard/sales-trend',
  CATEGORY_ANALYSIS: '/dashboard/category-analysis',
  REGION_ANALYSIS: '/dashboard/region-analysis',
  TOP_PRODUCTS: '/dashboard/top-products',
  PROFIT_ANALYSIS: '/dashboard/profit-analysis',
  TRANSACTIONS: '/transactions',
  PRODUCTS: '/products',
  INSIGHTS: '/insights',
  FILTERS: '/filters',
  UPLOAD: '/upload',
};
