// ============================================================
// DataUpload.jsx — File upload page
// ============================================================

import React from 'react';
import {
  FileSpreadsheet,
  ShieldCheck,
  Zap,
  BarChart3,
} from 'lucide-react';
import FileUpload from '../components/FileUpload';

const FEATURES = [
  {
    icon: FileSpreadsheet,
    title: 'Supported Formats',
    desc: 'Upload CSV (.csv), Excel (.xlsx, .xls) files containing your raw sales data.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Processing',
    desc: 'Your data is processed securely on the server and never shared with third parties.',
  },
  {
    icon: Zap,
    title: 'Instant Analysis',
    desc: 'Charts and KPIs update automatically once your file is uploaded and processed.',
  },
  {
    icon: BarChart3,
    title: 'Rich Insights',
    desc: 'Get automated business insights, trend analysis, and profitability metrics.',
  },
];

const DataUpload = () => {
  return (
    <div className="page page--upload">
      {/* Hero */}
      <div className="upload-hero">
        <div className="upload-hero__badge">
          <FileSpreadsheet size={16} />
          <span>Data Ingestion</span>
        </div>
        <h2 className="upload-hero__title">Upload Sales Data</h2>
        <p className="upload-hero__desc">
          Upload your sales dataset in <strong>CSV</strong> or <strong>Excel</strong> format to analyze
          business performance, revenue trends, and profitability.
        </p>
      </div>

      {/* Feature grid */}
      <div className="upload-features">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="upload-feature-card">
            <div className="upload-feature-card__icon">
              <Icon size={20} />
            </div>
            <div>
              <h4 className="upload-feature-card__title">{title}</h4>
              <p className="upload-feature-card__desc">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload component */}
      <div className="upload-zone-wrapper">
        <FileUpload />
      </div>

      {/* Tips */}
      <div className="upload-tips">
        <h4 className="upload-tips__title">Data Format Guidelines</h4>
        <ul className="upload-tips__list">
          <li>Ensure your file has a header row with column names.</li>
          <li>
            Recommended columns: <code>Order ID</code>, <code>Date</code>, <code>Product</code>,{' '}
            <code>Category</code>, <code>Region</code>, <code>Quantity</code>, <code>Revenue</code>,{' '}
            <code>Profit</code>.
          </li>
          <li>Date values should be in <code>YYYY-MM-DD</code> or <code>DD-MM-YYYY</code> format.</li>
          <li>Revenue and Profit values should be numeric (no currency symbols).</li>
          <li>Maximum file size: 50 MB.</li>
        </ul>
      </div>
    </div>
  );
};

export default DataUpload;
