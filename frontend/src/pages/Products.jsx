// ============================================================
// Products.jsx — Product analysis page
// ============================================================

import React, { useEffect, useState, useCallback } from 'react';
import { Package, Trophy, DollarSign, TrendingUp, Star } from 'lucide-react';
import KPICard from '../components/KPICard';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getProducts } from '../services/api';
import { MOCK_PRODUCTS } from '../utils/mockData';
import { formatCurrency, formatPercent, formatNumber } from '../utils/formatters';
import { CATEGORIES } from '../utils/constants';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const PRODUCT_COLUMNS = [
  { key: 'rank', label: '#', sortable: false, render: (v) => <span className="rank-badge">{v}</span> },
  { key: 'product', label: 'Product Name' },
  { key: 'category', label: 'Category', render: (v) => <span className="badge">{v}</span> },
  { key: 'units_sold', label: 'Units Sold', align: 'right', render: (v) => formatNumber(v) },
  { key: 'revenue', label: 'Revenue', align: 'right', render: (v) => formatCurrency(v) },
  { key: 'profit', label: 'Profit', align: 'right', render: (v) => <span className="text-success">{formatCurrency(v)}</span> },
  {
    key: 'margin', label: 'Margin', align: 'right',
    render: (v) => {
      const n = Number(v);
      const cls = n >= 35 ? 'badge--green' : n >= 20 ? 'badge--amber' : 'badge--red';
      return <span className={`badge ${cls}`}>{formatPercent(v)}</span>;
    }
  },
];

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [categoryFilter, setCategoryFilter] = useState('All');

  const load = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 700));
        setData(MOCK_PRODUCTS);
      } else {
        const result = await getProducts(filters);
        setData(result?.data || result || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load products.');
      if (USE_MOCK) setData(MOCK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const handler = () => load(activeFilters);
    window.addEventListener('dashboard-refresh', handler);
    return () => window.removeEventListener('dashboard-refresh', handler);
  }, [load, activeFilters]);

  const handleApply = (f) => { setActiveFilters(f); load(f); };
  const handleReset = () => { setActiveFilters({}); load({}); };

  // Derived summary cards
  const topRevenue = [...data].sort((a, b) => b.revenue - a.revenue)[0];
  const topProfit = [...data].sort((a, b) => b.profit - a.profit)[0];
  const topMargin = [...data].sort((a, b) => b.margin - a.margin)[0];

  const catTotals = data.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.revenue;
    return acc;
  }, {});
  const bestCategory = Object.entries(catTotals).sort(([, a], [, b]) => b - a)[0]?.[0];

  // Filter by category in UI
  const displayData = categoryFilter === 'All'
    ? data
    : data.filter((p) => p.category === categoryFilter);

  return (
    <div className="page">
      <FilterBar onApply={handleApply} onReset={handleReset} />

      {/* Summary cards */}
      <section className="kpi-grid" aria-label="Product highlights">
        <KPICard title="Top Product" value={topRevenue?.product || '—'} icon={Trophy} color="amber" loading={loading} subtitle="By Revenue" />
        <KPICard title="Highest Revenue" value={formatCurrency(topRevenue?.revenue)} icon={DollarSign} color="indigo" loading={loading} />
        <KPICard title="Most Profitable" value={topProfit?.product || '—'} icon={TrendingUp} color="emerald" loading={loading} subtitle="By Profit" />
        <KPICard title="Best Category" value={bestCategory || '—'} icon={Star} color="purple" loading={loading} subtitle="By Revenue" />
      </section>

      {/* Category quick filter */}
      <div className="quick-filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`quick-filter__btn ${categoryFilter === cat ? 'quick-filter__btn--active' : ''}`}
            onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product table */}
      <section className="section">
        <div className="section__header">
          <div>
            <h2 className="section__title">Product Analysis</h2>
            <p className="section__sub">{displayData.length} products {categoryFilter !== 'All' ? `in ${categoryFilter}` : ''}</p>
          </div>
        </div>

        {error && <ErrorMessage message={error} onRetry={() => load(activeFilters)} />}

        <DataTable
          columns={PRODUCT_COLUMNS}
          data={displayData}
          loading={loading}
          searchPlaceholder="Search products…"
          caption="Product performance"
          pageSize={10}
        />
      </section>
    </div>
  );
};

export default Products;
