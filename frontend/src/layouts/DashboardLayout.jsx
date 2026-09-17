// ============================================================
// DashboardLayout.jsx — Main application shell
// ============================================================

import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isConnected] = useState(true); // will reflect real API status later

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Emit a custom event that pages can listen to for re-fetching
    window.dispatchEvent(new CustomEvent('dashboard-refresh'));
    setTimeout(() => setIsRefreshing(false), 1200);
  }, []);

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <TopNavbar
          onMenuClick={() => setSidebarOpen((o) => !o)}
          isConnected={isConnected}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
        <main className="app-content" id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
