// ============================================================
// EmptyState.jsx — Empty data state component
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseZap, Upload } from 'lucide-react';

const EmptyState = ({
  title = 'No sales data available.',
  description = 'Upload a CSV or Excel file to begin analyzing your business data.',
  showUploadButton = true,
  compact = false,
  icon: Icon = DatabaseZap,
}) => {
  const navigate = useNavigate();

  if (compact) {
    return (
      <div className="empty-state empty-state--compact">
        <Icon size={28} className="empty-state__icon" aria-hidden="true" />
        <p className="empty-state__title">{title}</p>
      </div>
    );
  }

  return (
    <div className="empty-state" role="status">
      <div className="empty-state__circle">
        <Icon size={48} className="empty-state__icon" aria-hidden="true" />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__desc">{description}</p>
      {showUploadButton && (
        <button
          className="btn btn--primary"
          onClick={() => navigate('/upload')}
        >
          <Upload size={16} />
          Upload Data
        </button>
      )}
    </div>
  );
};

export default EmptyState;
