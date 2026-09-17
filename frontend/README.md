# Sales & Revenue Analysis Dashboard

> A professional, production-quality Business Intelligence frontend built with **React + Vite**, designed for Data Analyst / BI Developer portfolios.

---

## Overview

This dashboard provides a comprehensive view of sales and revenue performance through interactive charts, KPI cards, regional analysis, product analysis, and AI-generated business insights.

Designed to connect to a **Python + FastAPI** backend via REST APIs, with mock data fallback for frontend development.

---

## Features

- 📊 **Dashboard** — KPI cards, Revenue Trend, Sales Trend, Category Pie chart, Regional Bar chart, Top Products, Recent Transactions
- 📈 **Sales Analysis** — Monthly performance, Category & Regional breakdown tables + charts
- 📦 **Products** — Searchable, sortable product table with summary cards and category filters
- 📤 **Data Upload** — Drag-and-drop CSV/Excel upload with progress, success & error states
- 💡 **Business Insights** — Automatically generated insight cards from backend analytics
- 🔄 **Loading / Error / Empty states** for every data section
- 🎛️ **Global Filter Bar** — Date range, Region, Category, Product, Salesperson
- 📱 **Fully responsive** — Works on mobile, tablet, laptop, desktop

---

## Technology Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Recharts | Data visualization |
| Axios | HTTP client |
| Lucide React | Icon library |
| Vanilla CSS | Styling (dark BI theme) |

---

## Folder Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── TopNavbar.jsx
│   │   ├── KPICard.jsx
│   │   ├── ChartCard.jsx
│   │   ├── FilterBar.jsx
│   │   ├── DataTable.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── FileUpload.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── SalesAnalysis.jsx
│   │   ├── Products.jsx
│   │   ├── DataUpload.jsx
│   │   └── Insights.jsx
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   ├── services/
│   │   └── api.js
│   ├── hooks/
│   │   └── useDashboard.js
│   ├── utils/
│   │   ├── formatters.js
│   │   ├── constants.js
│   │   └── mockData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── vite.config.js
└── README.md
```

---

## Installation & Running Locally

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd frontend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your values (VITE_USE_MOCK=true for dev without backend)

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL of the FastAPI backend | `http://localhost:8000` |
| `VITE_USE_MOCK` | Use mock data (no backend needed) | `true` / `false` |

**For production on Vercel**, set `VITE_API_URL` to your Render backend URL in the Vercel project settings under _Environment Variables_.

---

## Build for Production

```bash
npm run build       # Creates optimized dist/ folder
npm run preview     # Preview production build locally
```

---

## Vercel Deployment

1. Push the `frontend/` folder to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Set **Framework Preset** to `Vite`.
4. Add environment variable `VITE_API_URL` pointing to your Render backend.
5. Deploy.

---

## Backend API Connection

This frontend is designed to connect to a **Python + FastAPI** backend. Expected endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/summary` | KPI totals |
| GET | `/dashboard/revenue-trend` | Monthly revenue |
| GET | `/dashboard/sales-trend` | Monthly sales |
| GET | `/dashboard/category-analysis` | Category breakdown |
| GET | `/dashboard/region-analysis` | Regional breakdown |
| GET | `/dashboard/top-products` | Top 10 products |
| GET | `/dashboard/profit-analysis` | Profit by category |
| GET | `/transactions` | Recent transactions |
| GET | `/products` | Product list |
| GET | `/insights` | AI insights |
| POST | `/upload` | File upload (multipart) |

All GET endpoints accept query params: `region`, `category`, `start_date`, `end_date`, `product`.

---

## Screenshots

> _Add screenshots here after deployment_

---

## Future Improvements

- Add date comparison (current vs. previous period)
- Export charts as PNG / PDF
- Dark/light theme toggle
- Real-time data updates via WebSocket
- Email report generation

---

**Portfolio Project** | B.Tech AI & ML | Data Analyst / BI Developer
