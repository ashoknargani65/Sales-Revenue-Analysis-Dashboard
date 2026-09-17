// ============================================================
// useDashboard.js — Custom hook for dashboard data fetching
// Falls back to mock data when API is not available.
// ============================================================

import { useState, useCallback, useRef } from 'react';
import * as api from '../services/api';
import {
  MOCK_SUMMARY,
  MOCK_REVENUE_TREND,
  MOCK_SALES_TREND,
  MOCK_CATEGORY_ANALYSIS,
  MOCK_REGION_ANALYSIS,
  MOCK_TOP_PRODUCTS,
  MOCK_PROFIT_ANALYSIS,
  MOCK_TRANSACTIONS,
} from '../utils/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const useFetch = (apiFn, mockData) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetch = useCallback(
    async (filters = {}) => {
      setLoading(true);
      setError(null);
      try {
        if (USE_MOCK) {
          await new Promise((r) => setTimeout(r, 600)); // simulate latency
          setData(mockData);
        } else {
          const result = await apiFn(filters);
          setData(result);
        }
      } catch (err) {
        setError(err.message || 'Failed to load data.');
        if (USE_MOCK) setData(mockData); // still show mock on error in dev
      } finally {
        setLoading(false);
      }
    },
    [apiFn, mockData]
  );

  return { data, loading, error, fetch };
};

const useDashboard = () => {
  const summary = useFetch(api.getDashboardSummary, MOCK_SUMMARY);
  const revenueTrend = useFetch(api.getRevenueTrend, MOCK_REVENUE_TREND);
  const salesTrend = useFetch(api.getSalesTrend, MOCK_SALES_TREND);
  const categoryAnalysis = useFetch(api.getCategoryAnalysis, MOCK_CATEGORY_ANALYSIS);
  const regionAnalysis = useFetch(api.getRegionAnalysis, MOCK_REGION_ANALYSIS);
  const topProducts = useFetch(api.getTopProducts, MOCK_TOP_PRODUCTS);
  const profitAnalysis = useFetch(api.getProfitAnalysis, MOCK_PROFIT_ANALYSIS);
  const transactions = useFetch(api.getTransactions, MOCK_TRANSACTIONS);

  const fetchAll = useCallback(
    (filters = {}) => {
      summary.fetch(filters);
      revenueTrend.fetch(filters);
      salesTrend.fetch(filters);
      categoryAnalysis.fetch(filters);
      regionAnalysis.fetch(filters);
      topProducts.fetch(filters);
      profitAnalysis.fetch(filters);
      transactions.fetch(filters);
    },
    [
      summary.fetch,
      revenueTrend.fetch,
      salesTrend.fetch,
      categoryAnalysis.fetch,
      regionAnalysis.fetch,
      topProducts.fetch,
      profitAnalysis.fetch,
      transactions.fetch,
    ]
  );

  return {
    summary,
    revenueTrend,
    salesTrend,
    categoryAnalysis,
    regionAnalysis,
    topProducts,
    profitAnalysis,
    transactions,
    fetchAll,
  };
};

export default useDashboard;
