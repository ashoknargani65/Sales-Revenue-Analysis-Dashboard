// ============================================================
// DataTable.jsx — Reusable paginated, sortable, searchable table
// ============================================================

import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  error = null,
  pageSize: defaultPageSize = 10,
  searchable = true,
  searchPlaceholder = 'Search…',
  caption,
}) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [data, search]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === 'number') return sortDir === 'asc' ? va - vb : vb - va;
      return sortDir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const SortIcon = ({ colKey }) => {
    if (sortKey !== colKey) return <ChevronsUpDown size={13} className="table__sort-icon" />;
    return sortDir === 'asc' ? (
      <ChevronUp size={13} className="table__sort-icon table__sort-icon--active" />
    ) : (
      <ChevronDown size={13} className="table__sort-icon table__sort-icon--active" />
    );
  };

  return (
    <div className="data-table">
      {/* Toolbar */}
      <div className="data-table__toolbar">
        {caption && <span className="data-table__caption">{caption}</span>}
        {searchable && (
          <div className="data-table__search">
            <Search size={14} aria-hidden="true" />
            <input
              type="search"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="data-table__search-input"
              aria-label="Search table"
            />
          </div>
        )}
        <div className="data-table__page-size">
          <label htmlFor="page-size" className="sr-only">Rows per page</label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="data-table__select"
          >
            {[10, 25, 50].map((s) => <option key={s} value={s}>{s} rows</option>)}
          </select>
        </div>
      </div>

      {/* Table scroll wrapper */}
      <div className="data-table__scroll">
        {loading ? (
          <div className="data-table__state"><LoadingSpinner label="Loading data…" /></div>
        ) : error ? (
          <div className="data-table__state"><p className="error-msg__text">{error}</p></div>
        ) : paginated.length === 0 ? (
          <div className="data-table__state"><EmptyState compact showUploadButton={false} title="No records found." /></div>
        ) : (
          <table className="table" role="table">
            <thead className="table__head">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`table__th ${col.sortable !== false ? 'table__th--sortable' : ''} ${col.align === 'right' ? 'table__th--right' : ''}`}
                    onClick={() => col.sortable !== false && handleSort(col.key)}
                    aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    <span>{col.label}</span>
                    {col.sortable !== false && <SortIcon colKey={col.key} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="table__body">
              {paginated.map((row, idx) => (
                <tr key={idx} className="table__row">
                  {columns.map((col) => (
                    <td key={col.key} className={`table__td ${col.align === 'right' ? 'table__td--right' : ''}`}>
                      {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && paginated.length > 0 && (
        <div className="data-table__pagination">
          <span className="data-table__info">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div className="data-table__pager">
            <button
              className="pager-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === '…' ? (
                  <span key={`ellipsis-${i}`} className="pager-ellipsis">…</span>
                ) : (
                  <button
                    key={p}
                    className={`pager-btn ${page === p ? 'pager-btn--active' : ''}`}
                    onClick={() => setPage(p)}
                    aria-label={`Page ${p}`}
                    aria-current={page === p ? 'page' : undefined}
                  >
                    {p}
                  </button>
                )
              )}
            <button
              className="pager-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
