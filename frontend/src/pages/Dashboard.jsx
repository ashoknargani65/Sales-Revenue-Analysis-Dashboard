// ============================================================
// Dashboard.jsx — Main overview page
// ============================================================

import React, { useEffect, useCallback, useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  DollarSign, ShoppingBag, TrendingUp, ShoppingCart, CreditCard, Percent,
} from 'lucide-react';

import KPICard from '../components/KPICard';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import useDashboard from '../hooks/useDashboard';
import { formatCompactCurrency, formatCurrency, formatNumber, formatPercent, formatDate, yAxisCurrencyFormatter } from '../utils/formatters';
import { CATEGORY_COLORS, CHART_COLORS } from '../utils/constants';

// ── Custom tooltip ────────────────────────────────────────────
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

// ── KPI config ────────────────────────────────────────────────
const getKPICards = (s) => [
  { title: 'Total Revenue', value: formatCompactCurrency(s?.total_revenue), change: s?.revenue_change, icon: DollarSign, color: 'indigo' },
  { title: 'Total Sales', value: formatCompactCurrency(s?.total_sales), change: s?.sales_change, icon: ShoppingBag, color: 'purple' },
  { title: 'Total Profit', value: formatCompactCurrency(s?.total_profit), change: s?.profit_change, icon: TrendingUp, color: 'emerald' },
  { title: 'Total Orders', value: formatNumber(s?.total_orders), change: s?.orders_change, icon: ShoppingCart, color: 'cyan' },
  { title: 'Avg Order Value', value: formatCompactCurrency(s?.average_order_value), icon: CreditCard, color: 'amber' },
  { title: 'Profit Margin', value: formatPercent(s?.profit_margin), icon: Percent, color: 'rose' },
];

// ── Transaction table columns ─────────────────────────────────
const TX_COLUMNS = [
  { key: 'order_id', label: 'Order ID' },
  { key: 'date', label: 'Date', render: (v) => formatDate(v) },
  { key: 'product', label: 'Product' },
  { key: 'category', label: 'Category', render: (v) => <span className="badge">{v}</span> },
  { key: 'region', label: 'Region' },
  { key: 'quantity', label: 'Qty', align: 'right' },
  { key: 'revenue', label: 'Revenue', align: 'right', render: (v) => formatCurrency(v) },
  { key: 'profit', label: 'Profit', align: 'right', render: (v) => <span className="text-success">{formatCurrency(v)}</span> },
];

const Dashboard = () => {
  const {
    summary, revenueTrend, salesTrend, categoryAnalysis,
    regionAnalysis, topProducts, profitAnalysis, transactions, fetchAll,
  } = useDashboard();

  const [activeFilters, setActiveFilters] = useState({});

  const load = useCallback((filters = {}) => {
    setActiveFilters(filters);
    fetchAll(filters);
  }, [fetchAll]);

  useEffect(() => { load(); }, []);

  // Listen for navbar refresh
  useEffect(() => {
    const handler = () => load(activeFilters);
    window.addEventListener('dashboard-refresh', handler);
    return () => window.removeEventListener('dashboard-refresh', handler);
  }, [load, activeFilters]);

  const kpiCards = getKPICards(summary.data);

  return (
    <div className="page">
      {/* Filters */}
      <FilterBar onApply={(f) => load(f)} onReset={() => load({})} />

      {/* KPI Cards */}
      <section className="kpi-grid" aria-label="Key performance indicators">
        {kpiCards.map((card) => (
          <KPICard key={card.title} {...card} loading={summary.loading} />
        ))}
      </section>

      {/* Revenue & Sales trends */}
      <div className="charts-row charts-row--2">
        <ChartCard
          title="Revenue Trend"
          subtitle="Monthly revenue performance"
          loading={revenueTrend.loading}
          error={revenueTrend.error}
          empty={!revenueTrend.data?.length}
          onRetry={() => load(activeFilters)}
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueTrend.data || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tickFormatter={yAxisCurrencyFormatter} tick={{ fontSize: 11, fill: '#94a3b8' }} width={70} />
              <Tooltip content={<CurrencyTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke={CHART_COLORS.primary} fill="url(#revGrad)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Sales Trend"
          subtitle="Monthly sales volume"
          loading={salesTrend.loading}
          error={salesTrend.error}
          empty={!salesTrend.data?.length}
          onRetry={() => load(activeFilters)}
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesTrend.data || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tickFormatter={yAxisCurrencyFormatter} tick={{ fontSize: 11, fill: '#94a3b8' }} width={70} />
              <Tooltip content={<CurrencyTooltip />} />
              <Bar dataKey="sales" name="Sales" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Category & Region */}
      <div className="charts-row charts-row--3">
        <ChartCard
          title="Revenue by Category"
          subtitle="Category distribution"
          loading={categoryAnalysis.loading}
          error={categoryAnalysis.error}
          empty={!categoryAnalysis.data?.length}
          onRetry={() => load(activeFilters)}
          className="charts-row__span-2"
        >
          <div className="pie-wrapper">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={categoryAnalysis.data || []}
                  dataKey="revenue"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={3}
                >
                  {(categoryAnalysis.data || []).map((_, idx) => (
                    <Cell key={idx} fill={CATEGORY_COLORS[idx % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Legend formatter={(v) => <span style={{ color: '#cbd5e1', fontSize: 12 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Revenue by Region"
          subtitle="Regional performance"
          loading={regionAnalysis.loading}
          error={regionAnalysis.error}
          empty={!regionAnalysis.data?.length}
          onRetry={() => load(activeFilters)}
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={regionAnalysis.data || []} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis type="number" tickFormatter={yAxisCurrencyFormatter} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis type="category" dataKey="region" tick={{ fontSize: 12, fill: '#94a3b8' }} width={50} />
              <Tooltip content={<CurrencyTooltip />} />
              <Bar dataKey="revenue" name="Revenue" fill={CHART_COLORS.accent} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top Products */}
      <ChartCard
        title="Top 10 Products by Revenue"
        subtitle="Best performing products"
        loading={topProducts.loading}
        error={topProducts.error}
        empty={!topProducts.data?.length}
        onRetry={() => load(activeFilters)}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts.data || []} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
            <XAxis type="number" tickFormatter={yAxisCurrencyFormatter} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis type="category" dataKey="product" tick={{ fontSize: 11, fill: '#94a3b8' }} width={160} />
            <Tooltip content={<CurrencyTooltip />} />
            <Bar dataKey="revenue" name="Revenue" radius={[0, 4, 4, 0]}>
              {(topProducts.data || []).map((_, idx) => (
                <Cell key={idx} fill={CATEGORY_COLORS[idx % CATEGORY_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Recent Transactions */}
      <section className="section">
        <div className="section__header">
          <h2 className="section__title">Recent Transactions</h2>
          <p className="section__sub">Latest order activity</p>
        </div>
        <DataTable
          columns={TX_COLUMNS}
          data={transactions.data || []}
          loading={transactions.loading}
          error={transactions.error}
          searchPlaceholder="Search orders, products…"
          caption="Transaction records"
        />
      </section>
    </div>
  );
};

export default Dashboard;
