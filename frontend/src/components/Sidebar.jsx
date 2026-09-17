// ============================================================
// Sidebar.jsx — Application sidebar navigation
// ============================================================

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Upload,
  Lightbulb,
  BarChart3,
  X,
  ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/sales-analysis', label: 'Sales Analysis', icon: TrendingUp },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/upload', label: 'Data Upload', icon: Upload },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`} role="navigation" aria-label="Main navigation">
        {/* Sidebar header */}
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <div className="sidebar__logo-icon">
              <BarChart3 size={22} />
            </div>
            <div className="sidebar__logo-text">
              <span className="sidebar__logo-title">Sales Analytics</span>
              <span className="sidebar__logo-sub">BI Dashboard</span>
            </div>
          </div>
          <button
            className="sidebar__close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Divider */}
        <div className="sidebar__divider" />

        {/* Navigation label */}
        <span className="sidebar__section-label">NAVIGATION</span>

        {/* Nav items */}
        <nav className="sidebar__nav">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
              }
              onClick={onClose}
            >
              <Icon size={18} className="sidebar__nav-icon" />
              <span className="sidebar__nav-label">{label}</span>
              <ChevronRight size={14} className="sidebar__nav-arrow" />
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar__footer">
          <div className="sidebar__footer-badge">
            <span className="sidebar__footer-dot" />
            <span className="sidebar__footer-text">Data Analyst Portfolio Project</span>
          </div>
          <p className="sidebar__footer-credit">B.Tech AI & ML</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
