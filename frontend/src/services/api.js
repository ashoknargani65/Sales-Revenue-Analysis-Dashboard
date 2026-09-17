// ============================================================
// api.js — Centralized API service using Axios
// All requests use VITE_API_URL from environment variables.
// ============================================================

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor ──────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ── Response interceptor ─────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

// ── Helper to build query string from filter params ──────────
const buildParams = (filters = {}) => {
  const params = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'All' && value !== '') {
      params[key] = value;
    }
  });
  return params;
};

// ── Dashboard endpoints ──────────────────────────────────────

export const getDashboardSummary = (filters = {}) =>
  apiClient.get('/dashboard/summary', { params: buildParams(filters) });

export const getRevenueTrend = (filters = {}) =>
  apiClient.get('/dashboard/revenue-trend', { params: buildParams(filters) });

export const getSalesTrend = (filters = {}) =>
  apiClient.get('/dashboard/sales-trend', { params: buildParams(filters) });

export const getCategoryAnalysis = (filters = {}) =>
  apiClient.get('/dashboard/category-analysis', { params: buildParams(filters) });

export const getRegionAnalysis = (filters = {}) =>
  apiClient.get('/dashboard/region-analysis', { params: buildParams(filters) });

export const getTopProducts = (filters = {}) =>
  apiClient.get('/dashboard/top-products', { params: buildParams(filters) });

export const getProfitAnalysis = (filters = {}) =>
  apiClient.get('/dashboard/profit-analysis', { params: buildParams(filters) });

// ── Transactions endpoint ────────────────────────────────────

export const getTransactions = (filters = {}, page = 1, pageSize = 10, search = '') =>
  apiClient.get('/transactions', {
    params: { ...buildParams(filters), page, page_size: pageSize, search },
  });

// ── Products endpoint ────────────────────────────────────────

export const getProducts = (filters = {}, page = 1, pageSize = 10, search = '', sortBy = 'revenue', sortOrder = 'desc') =>
  apiClient.get('/products', {
    params: { ...buildParams(filters), page, page_size: pageSize, search, sort_by: sortBy, sort_order: sortOrder },
  });

// ── Insights endpoint ────────────────────────────────────────

export const getInsights = (filters = {}) =>
  apiClient.get('/insights', { params: buildParams(filters) });

// ── Filters meta endpoint ────────────────────────────────────

export const getFilters = () => apiClient.get('/filters');

// ── File upload endpoint ─────────────────────────────────────

export const uploadFile = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });
};
