// ============================================================
// SalesAnalysis.jsx — Detailed sales analytics page
// ============================================================

import React, { useEffect, useState, useCallback } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

import ChartCard from '../components/ChartCard';
import FilterBar from '../components/FilterBar';
import KPICard from '../components/KPICard';
import DataTable from '../components/DataTable';
import useDashboard from '../hooks/useDashboard';
import { formatCompactCurrency, formatCurrency, formatNumber, formatPercent, yAxisCurrencyFormatter } from '../utils/formatters';
import { CHART_COLORS, CATEGORY_COLORS } from '../utils/constants';
import { DollarSign, TrendingUp, ShoppingBag, CreditCard } from 'lucide-react';

const CurrencyTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="chart-tooltip__item">
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

const CATEGORY_COLUMNS = [
  { key: 'category', label: 'Category' },
  { key: 'sales', label: 'Sales', align: 'right', render: (v) => formatCurrency(v) },
  { key: 'revenue', label: 'Revenue', align: 'right', render: (v) => formatCurrency(v) },
  { key: 'profit', label: 'Profit', align: 'right', render: (v) => <span className="text-success">{formatCurrency(v)}</span> },
  { key: 'margin', label: 'Margin', align: 'right', render: (_, row) => {
    const margin = row.profit && row.revenue ? ((row.profit / row.revenue) * 100).toFixed(1) + '%' : '—';
    return <span className="badge badge--green">{margin}</span>;
  }},
];

const REGION_COLUMNS = [
  { key: 'region', label: 'Region' },
  { key: 'sales', label: 'Sales', align: 'right', render: (v) => formatCurrency(v) },
  { key: 'revenue', label: 'Revenue', align: 'right', render: (v) => formatCurrency(v) },
  { key: 'profit', label: 'Profit', align: 'right', render: (v) => <span className="text-success">{formatCurrency(v)}</span> },
  { key: 'margin', label: 'Margin', align: 'right', render: (_, row) => {
    const margin = row.profit && row.revenue ? ((row.profit / row.revenue) * 100).toFixed(1) + '%' : '—';
    return <span className="badge badge--green">{margin}</span>;
  }},
];

const SalesAnalysis = () => {
  const {
    summary, revenueTrend, salesTrend, categoryAnalysis,
    regionAnalysis, profitAnalysis, fetchAll,
  } = useDashboard();

  const [activeFilters, setActiveFilters] = useState({});

  const load = useCallback((filters = {}) => {
    setActiveFilters(filters);
    fetchAll(filters);
  }, [fetchAll]);

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const handler = () => load(activeFilters);
    window.addEventListener('dashboard-refresh', handler);
    return () => window.removeEventListener('dashboard-refresh', handler);
  }, [load, activeFilters]);

  const s = summary.data;

  // Combine revenue + sales + profit into one trend dataset
  const combinedTrend = (revenueTrend.data || []).map((r, i) => ({
    month: r.month,
    revenue: r.revenue,
    sales: salesTrend.data?.[i]?.sales,
    profit: profitAnalysis.data?.[i]?.profit,
  }));

  return (
    <div className="page">
      <FilterBar onApply={(f) => load(f)} onReset={() => load({})} />

      {/* Overview KPIs */}
      <section className="kpi-grid" aria-label="Sales overview">
        <KPICard title="Total Sales" value={formatCompactCurrency(s?.total_sales)} change={s?.sales_change} icon={ShoppingBag} color="purple" loading={summary.loading} />
        <KPICard title="Total Revenue" value={formatCompactCurrency(s?.total_revenue)} change={s?.revenue_change} icon={DollarSign} color="indigo" loading={summary.loading} />
        <KPICard title="Total Profit" value={formatCompactCurrency(s?.total_profit)} change={s?.profit_change} icon={TrendingUp} color="emerald" loading={summary.loading} />
        <KPICard title="Avg Order Value" value={formatCompactCurrency(s?.average_order_value)} icon={CreditCard} color="amber" loading={summary.loading} />
      </section>

      {/* Monthly performance combo chart */}
      <ChartCard
        title="Monthly Performance Overview"
        subtitle="Revenue, Sales & Profit trends"
        loading={revenueTrend.loading || salesTrend.loading}
        empty={!combinedTrend.length}
        onRetry={() => load(activeFilters)}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={combinedTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis tickFormatter={yAxisCurrencyFormatter} tick={{ fontSize: 11, fill: '#94a3b8' }} width={70} />
            <Tooltip content={<CurrencyTooltip />} />
            <Legend formatter={(v) => <span style={{ color: '#cbd5e1', fontSize: 12 }}>{v}</span>} />
            <Line type="monotone" dataKey="revenue" name="Revenue" stroke={CHART_COLORS.primary} strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="sales" name="Sales" stroke={CHART_COLORS.secondary} strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="profit" name="Profit" stroke={CHART_COLORS.success} strokeWidth={2} dot={false} strokeDasharray="5 3" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Category Performance */}
      <section className="section">
        <div className="section__header">
          <h2 className="section__title">Category Performance</h2>
          <p className="section__sub">Sales & profit breakdown by category</p>
        </div>

        <div className="charts-row charts-row--2">
          <ChartCard
            title="Sales by Category"
            loading={categoryAnalysis.loading}
            empty={!categoryAnalysis.data?.length}
            onRetry={() => load(activeFilters)}
          >
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={categoryAnalysis.data || []} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tickFormatter={yAxisCurrencyFormatter} tick={{ fontSize: 11, fill: '#94a3b8' }} width={70} />
                <Tooltip content={<CurrencyTooltip />} />
                <Bar dataKey="sales" name="Sales" fill={CHART_COLORS.purple} radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" name="Revenue" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="chart-card">
            <div className="chart-card__header">
              <h3 className="chart-card__title">Category Detail Table</h3>
            </div>
            <div className="chart-card__body">
              <DataTable
                columns={CATEGORY_COLUMNS}
                data={categoryAnalysis.data || []}
                loading={categoryAnalysis.loading}
                searchable={false}
                pageSize={5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Regional Performance */}
      <section className="section">
        <div className="section__header">
          <h2 className="section__title">Regional Performance</h2>
          <p className="section__sub">Sales & revenue by region</p>
        </div>

        <div className="charts-row charts-row--2">
          <ChartCard
            title="Revenue by Region"
            loading={regionAnalysis.loading}
            empty={!regionAnalysis.data?.length}
            onRetry={() => load(activeFilters)}
          >
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={regionAnalysis.data || []} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="region" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis tickFormatter={yAxisCurrencyFormatter} tick={{ fontSize: 11, fill: '#94a3b8' }} width={70} />
                <Tooltip content={<CurrencyTooltip />} />
                <Bar dataKey="revenue" name="Revenue" fill={CHART_COLORS.accent} radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill={CHART_COLORS.success} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="chart-card">
            <div className="chart-card__header">
              <h3 className="chart-card__title">Regional Detail Table</h3>
            </div>
            <div className="chart-card__body">
              <DataTable
                columns={REGION_COLUMNS}
                data={regionAnalysis.data || []}
                loading={regionAnalysis.loading}
                searchable={false}
                pageSize={5}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesAnalysis;
