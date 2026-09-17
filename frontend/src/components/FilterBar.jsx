// ============================================================
// FilterBar.jsx — Global filter panel
// ============================================================

import React, { useState } from 'react';
import { SlidersHorizontal, RotateCcw, Search } from 'lucide-react';
import { REGIONS, CATEGORIES } from '../utils/constants';

const DEFAULT_FILTERS = {
  start_date: '',
  end_date: '',
  region: 'All',
  category: 'All',
  product: '',
  salesperson: '',
};

const FilterBar = ({ onApply, onReset, products = [], salespersons = [] }) => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [expanded, setExpanded] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply?.(filters);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    onReset?.();
  };

  return (
    <div className="filter-bar">
      <button
        className="filter-bar__toggle"
        onClick={() => setExpanded((p) => !p)}
        aria-expanded={expanded}
        aria-controls="filter-content"
      >
        <SlidersHorizontal size={16} />
        <span>Filters</span>
        <span className="filter-bar__chevron" style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>

      {expanded && (
        <div id="filter-content" className="filter-bar__content">
          <div className="filter-bar__grid">
            {/* Date Range */}
            <div className="filter-bar__group">
              <label className="filter-bar__label" htmlFor="start_date">Start Date</label>
              <input
                id="start_date"
                type="date"
                name="start_date"
                value={filters.start_date}
                onChange={handleChange}
                className="filter-bar__input"
              />
            </div>

            <div className="filter-bar__group">
              <label className="filter-bar__label" htmlFor="end_date">End Date</label>
              <input
                id="end_date"
                type="date"
                name="end_date"
                value={filters.end_date}
                onChange={handleChange}
                className="filter-bar__input"
              />
            </div>

            {/* Region */}
            <div className="filter-bar__group">
              <label className="filter-bar__label" htmlFor="region">Region</label>
              <select
                id="region"
                name="region"
                value={filters.region}
                onChange={handleChange}
                className="filter-bar__input"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="filter-bar__group">
              <label className="filter-bar__label" htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleChange}
                className="filter-bar__input"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Product search */}
            <div className="filter-bar__group">
              <label className="filter-bar__label" htmlFor="product">Product</label>
              <div className="filter-bar__input-icon">
                <Search size={14} className="filter-bar__input-icon-icon" />
                <input
                  id="product"
                  type="text"
                  name="product"
                  placeholder="Search product…"
                  value={filters.product}
                  onChange={handleChange}
                  className="filter-bar__input filter-bar__input--has-icon"
                />
              </div>
            </div>

            {/* Salesperson */}
            <div className="filter-bar__group">
              <label className="filter-bar__label" htmlFor="salesperson">Salesperson</label>
              <input
                id="salesperson"
                type="text"
                name="salesperson"
                placeholder="Salesperson name…"
                value={filters.salesperson}
                onChange={handleChange}
                className="filter-bar__input"
              />
            </div>
          </div>

          <div className="filter-bar__actions">
            <button className="btn btn--primary" onClick={handleApply}>
              <SlidersHorizontal size={14} />
              Apply Filters
            </button>
            <button className="btn btn--ghost" onClick={handleReset}>
              <RotateCcw size={14} />
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
