// ============================================================
// TopNavbar.jsx — Top application navigation bar
// ============================================================

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, RefreshCw, Wifi, WifiOff, UserCircle2 } from 'lucide-react';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/sales-analysis': 'Sales Analysis',
  '/products': 'Products',
  '/upload': 'Data Upload',
  '/insights': 'Business Insights',
};

const TopNavbar = ({ onMenuClick, isConnected, onRefresh, isRefreshing }) => {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || 'Dashboard';

  return (
    <header className="topnav" role="banner">
      <div className="topnav__left">
        <button
          className="topnav__menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle sidebar menu"
        >
          <Menu size={20} />
        </button>
        <div className="topnav__title-group">
          <h1 className="topnav__title">{title}</h1>
          <span className="topnav__breadcrumb">Sales &amp; Revenue Analysis Dashboard</span>
        </div>
      </div>

      <div className="topnav__right">
        {/* Connection status */}
        <div className={`topnav__status ${isConnected ? 'topnav__status--ok' : 'topnav__status--err'}`}>
          {isConnected ? <Wifi size={14} /> : <WifiOff size={14} />}
          <span>{isConnected ? 'Data Connected' : 'No Connection'}</span>
        </div>

        {/* Refresh button */}
        <button
          className={`topnav__btn ${isRefreshing ? 'topnav__btn--spinning' : ''}`}
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh dashboard data"
          title="Refresh data"
        >
          <RefreshCw size={16} className={isRefreshing ? 'spin' : ''} />
          <span className="topnav__btn-label">Refresh</span>
        </button>

        {/* User avatar */}
        <button className="topnav__avatar" aria-label="User profile">
          <UserCircle2 size={28} />
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
