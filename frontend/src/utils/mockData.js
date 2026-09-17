// ============================================================
// mockData.js — DEVELOPMENT ONLY mock data
// Replace with real API calls in production.
// ============================================================

export const MOCK_SUMMARY = {
  total_revenue: 1245000,
  total_sales: 1872000,
  total_profit: 485000,
  total_orders: 12450,
  average_order_value: 1498,
  profit_margin: 25.9,
  revenue_change: 12.4,
  sales_change: 8.7,
  profit_change: 15.2,
  orders_change: 6.3,
};

export const MOCK_REVENUE_TREND = [
  { month: 'Jan', revenue: 98000 },
  { month: 'Feb', revenue: 112000 },
  { month: 'Mar', revenue: 130000 },
  { month: 'Apr', revenue: 105000 },
  { month: 'May', revenue: 145000 },
  { month: 'Jun', revenue: 162000 },
  { month: 'Jul', revenue: 138000 },
  { month: 'Aug', revenue: 175000 },
  { month: 'Sep', revenue: 190000 },
  { month: 'Oct', revenue: 168000 },
  { month: 'Nov', revenue: 210000 },
  { month: 'Dec', revenue: 245000 },
];

export const MOCK_SALES_TREND = [
  { month: 'Jan', sales: 148000 },
  { month: 'Feb', sales: 162000 },
  { month: 'Mar', sales: 189000 },
  { month: 'Apr', sales: 154000 },
  { month: 'May', sales: 200000 },
  { month: 'Jun', sales: 225000 },
  { month: 'Jul', sales: 196000 },
  { month: 'Aug', sales: 240000 },
  { month: 'Sep', sales: 258000 },
  { month: 'Oct', sales: 230000 },
  { month: 'Nov', sales: 285000 },
  { month: 'Dec', sales: 335000 },
];

export const MOCK_CATEGORY_ANALYSIS = [
  { category: 'Electronics', revenue: 450000, sales: 520000, profit: 98000 },
  { category: 'Furniture', revenue: 280000, sales: 340000, profit: 56000 },
  { category: 'Clothing', revenue: 210000, sales: 265000, profit: 72000 },
  { category: 'Accessories', revenue: 175000, sales: 220000, profit: 68000 },
  { category: 'Office Supplies', revenue: 130000, sales: 165000, profit: 45000 },
];

export const MOCK_REGION_ANALYSIS = [
  { region: 'South', revenue: 385000, sales: 470000, profit: 105000 },
  { region: 'North', revenue: 310000, sales: 390000, profit: 88000 },
  { region: 'West', revenue: 290000, sales: 360000, profit: 76000 },
  { region: 'East', revenue: 260000, sales: 320000, profit: 62000 },
];

export const MOCK_TOP_PRODUCTS = [
  { product: 'Samsung Galaxy S24', revenue: 125000, units: 84 },
  { product: 'iPhone 15 Pro', revenue: 118000, units: 59 },
  { product: 'Dell XPS 15 Laptop', revenue: 98000, units: 49 },
  { product: 'Sony WH-1000XM5', revenue: 76000, units: 152 },
  { product: 'LG Smart TV 55"', revenue: 68000, units: 68 },
  { product: 'Nike Air Max 270', revenue: 54000, units: 270 },
  { product: 'Ergonomic Chair Pro', revenue: 48000, units: 96 },
  { product: 'Apple Watch Series 9', revenue: 42000, units: 70 },
  { product: 'Kindle Paperwhite', revenue: 38000, units: 190 },
  { product: 'Canon EOS R50', revenue: 32000, units: 32 },
];

export const MOCK_PROFIT_ANALYSIS = [
  { category: 'Electronics', profit: 98000, margin: 21.8 },
  { category: 'Furniture', profit: 56000, margin: 20.0 },
  { category: 'Clothing', profit: 72000, margin: 34.3 },
  { category: 'Accessories', profit: 68000, margin: 38.9 },
  { category: 'Office Supplies', profit: 45000, margin: 34.6 },
];

export const MOCK_TRANSACTIONS = [
  { order_id: 'ORD-10001', date: '2024-12-15', product: 'Samsung Galaxy S24', category: 'Electronics', region: 'South', quantity: 2, revenue: 89998, profit: 17999 },
  { order_id: 'ORD-10002', date: '2024-12-14', product: 'Nike Air Max 270', category: 'Clothing', region: 'North', quantity: 5, revenue: 24995, profit: 8748 },
  { order_id: 'ORD-10003', date: '2024-12-14', product: 'Ergonomic Chair Pro', category: 'Furniture', region: 'West', quantity: 1, revenue: 12499, profit: 2499 },
  { order_id: 'ORD-10004', date: '2024-12-13', product: 'Sony WH-1000XM5', category: 'Electronics', region: 'East', quantity: 3, revenue: 14997, profit: 2999 },
  { order_id: 'ORD-10005', date: '2024-12-13', product: 'Dell XPS 15 Laptop', category: 'Electronics', region: 'South', quantity: 1, revenue: 89999, profit: 17999 },
  { order_id: 'ORD-10006', date: '2024-12-12', product: 'Canon EOS R50', category: 'Electronics', region: 'North', quantity: 1, revenue: 54999, profit: 10999 },
  { order_id: 'ORD-10007', date: '2024-12-12', product: 'Kindle Paperwhite', category: 'Accessories', region: 'West', quantity: 4, revenue: 11996, profit: 4798 },
  { order_id: 'ORD-10008', date: '2024-12-11', product: 'LG Smart TV 55"', category: 'Electronics', region: 'South', quantity: 1, revenue: 55999, profit: 9999 },
  { order_id: 'ORD-10009', date: '2024-12-11', product: 'Apple Watch Series 9', category: 'Electronics', region: 'East', quantity: 2, revenue: 47998, profit: 9599 },
  { order_id: 'ORD-10010', date: '2024-12-10', product: 'Office Desk Organizer', category: 'Office Supplies', region: 'North', quantity: 10, revenue: 5990, profit: 2396 },
];

export const MOCK_PRODUCTS = [
  { rank: 1, product: 'Samsung Galaxy S24', category: 'Electronics', units_sold: 84, revenue: 125000, profit: 25000, margin: 20.0 },
  { rank: 2, product: 'iPhone 15 Pro', category: 'Electronics', units_sold: 59, revenue: 118000, profit: 23600, margin: 20.0 },
  { rank: 3, product: 'Dell XPS 15 Laptop', category: 'Electronics', units_sold: 49, revenue: 98000, profit: 19600, margin: 20.0 },
  { rank: 4, product: 'Sony WH-1000XM5', category: 'Electronics', units_sold: 152, revenue: 76000, profit: 15200, margin: 20.0 },
  { rank: 5, product: 'LG Smart TV 55"', category: 'Electronics', units_sold: 68, revenue: 68000, profit: 13600, margin: 20.0 },
  { rank: 6, product: 'Nike Air Max 270', category: 'Clothing', units_sold: 270, revenue: 54000, profit: 21600, margin: 40.0 },
  { rank: 7, product: 'Ergonomic Chair Pro', category: 'Furniture', units_sold: 96, revenue: 48000, profit: 9600, margin: 20.0 },
  { rank: 8, product: 'Apple Watch Series 9', category: 'Electronics', units_sold: 70, revenue: 42000, profit: 8400, margin: 20.0 },
  { rank: 9, product: 'Kindle Paperwhite', category: 'Accessories', units_sold: 190, revenue: 38000, profit: 15200, margin: 40.0 },
  { rank: 10, product: 'Canon EOS R50', category: 'Electronics', units_sold: 32, revenue: 32000, profit: 6400, margin: 20.0 },
];

export const MOCK_INSIGHTS = [
  {
    id: 1,
    type: 'revenue_leader',
    title: 'Revenue Leader',
    icon: 'TrendingUp',
    color: 'indigo',
    metric: '₹4.50L',
    description: 'Electronics generated the highest revenue this period.',
    change: '+18.4%',
    positive: true,
  },
  {
    id: 2,
    type: 'top_region',
    title: 'Top Region',
    icon: 'MapPin',
    color: 'cyan',
    metric: '₹3.85L',
    description: 'South region generated the highest revenue among all regions.',
    change: '+12.1%',
    positive: true,
  },
  {
    id: 3,
    type: 'top_product',
    title: 'Top Product',
    icon: 'Package',
    color: 'purple',
    metric: '₹1.25L',
    description: 'Samsung Galaxy S24 generated the highest product revenue.',
    change: '+22.7%',
    positive: true,
  },
  {
    id: 4,
    type: 'growth',
    title: 'Revenue Growth',
    icon: 'BarChart2',
    color: 'emerald',
    metric: '+16.8%',
    description: 'Revenue increased by 16.8% compared to the previous month.',
    change: '+16.8%',
    positive: true,
  },
  {
    id: 5,
    type: 'profitability',
    title: 'Top Profitability',
    icon: 'PieChart',
    color: 'amber',
    metric: '38.9%',
    description: 'Accessories achieved the highest profit margin of 38.9%.',
    change: '+3.2%',
    positive: true,
  },
  {
    id: 6,
    type: 'order_trend',
    title: 'Order Volume',
    icon: 'ShoppingCart',
    color: 'rose',
    metric: '12,450',
    description: 'Total orders placed this period, up 6.3% from last period.',
    change: '+6.3%',
    positive: true,
  },
];
