// ============================================================
// FileUpload.jsx — Drag-and-drop CSV/Excel upload component
// ============================================================

import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { uploadFile } from '../services/api';
import { formatFileSize } from '../utils/formatters';
import { ALLOWED_FILE_TYPES, ALLOWED_MIME_TYPES } from '../utils/constants';

const STATUS = { IDLE: 'idle', UPLOADING: 'uploading', SUCCESS: 'success', ERROR: 'error' };

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const validateFile = (f) => {
    const ext = '.' + f.name.split('.').pop().toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(ext)) {
      return `Please upload a CSV or Excel file (.csv, .xlsx, .xls). "${f.name}" is not allowed.`;
    }
    if (f.size > 50 * 1024 * 1024) {
      return 'File size must be under 50 MB.';
    }
    return null;
  };

  const handleFile = (f) => {
    const err = validateFile(f);
    if (err) {
      setErrorMsg(err);
      setStatus(STATUS.ERROR);
      return;
    }
    setFile(f);
    setStatus(STATUS.IDLE);
    setErrorMsg('');
    setResult(null);
  };

  const onInputChange = (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const handleUpload = async () => {
    if (!file) return;
    setStatus(STATUS.UPLOADING);
    setProgress(0);
    try {
      const data = await uploadFile(file, (evt) => {
        if (evt.total) setProgress(Math.round((evt.loaded / evt.total) * 100));
      });
      setResult(data);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      setErrorMsg(
        err.message?.includes('Network Error')
          ? 'Cannot reach the server. Please check your connection.'
          : err.message || 'Upload failed. Please try again.'
      );
      setStatus(STATUS.ERROR);
    }
  };

  const reset = () => {
    setFile(null);
    setStatus(STATUS.IDLE);
    setProgress(0);
    setResult(null);
    setErrorMsg('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="file-upload">
      {/* Drop zone */}
      {status !== STATUS.SUCCESS && (
        <div
          className={`drop-zone ${dragging ? 'drop-zone--active' : ''} ${file ? 'drop-zone--has-file' : ''}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => !file && inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && !file && inputRef.current?.click()}
          aria-label="Drop zone for file upload"
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={onInputChange}
            className="sr-only"
            aria-label="Choose file to upload"
          />

          {!file ? (
            <>
              <div className="drop-zone__icon">
                <Upload size={36} />
              </div>
              <p className="drop-zone__heading">Drag &amp; drop your file here</p>
              <p className="drop-zone__sub">or click to browse</p>
              <div className="drop-zone__formats">
                {ALLOWED_FILE_TYPES.map((t) => (
                  <span key={t} className="format-badge">{t.toUpperCase()}</span>
                ))}
              </div>
              <p className="drop-zone__limit">Maximum file size: 50 MB</p>
            </>
          ) : (
            <div className="file-info">
              <div className="file-info__icon">
                <FileText size={28} />
              </div>
              <div className="file-info__details">
                <p className="file-info__name">{file.name}</p>
                <p className="file-info__meta">
                  {formatFileSize(file.size)} &bull;{' '}
                  {file.name.split('.').pop().toUpperCase()}
                </p>
              </div>
              <button
                className="file-info__remove"
                onClick={(e) => { e.stopPropagation(); reset(); }}
                aria-label="Remove file"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Upload progress */}
      {status === STATUS.UPLOADING && (
        <div className="upload-progress">
          <div className="upload-progress__header">
            <Loader2 size={18} className="spin" />
            <span>Uploading… {progress}%</span>
          </div>
          <div className="upload-progress__bar-bg">
            <div className="upload-progress__bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="upload-progress__hint">Processing your data, please wait…</p>
        </div>
      )}

      {/* Success state */}
      {status === STATUS.SUCCESS && (
        <div className="upload-result upload-result--success">
          <CheckCircle2 size={48} className="upload-result__icon" />
          <h3 className="upload-result__title">Upload Successful!</h3>
          <p className="upload-result__desc">Sales data uploaded and processed successfully.</p>
          {result && (
            <div className="upload-result__stats">
              {result.records_uploaded != null && (
                <div className="stat-chip">
                  <span className="stat-chip__label">Records Uploaded</span>
                  <span className="stat-chip__value">{result.records_uploaded?.toLocaleString()}</span>
                </div>
              )}
              {result.records_processed != null && (
                <div className="stat-chip">
                  <span className="stat-chip__label">Records Processed</span>
                  <span className="stat-chip__value">{result.records_processed?.toLocaleString()}</span>
                </div>
              )}
              {result.records_rejected != null && (
                <div className="stat-chip stat-chip--warn">
                  <span className="stat-chip__label">Records Rejected</span>
                  <span className="stat-chip__value">{result.records_rejected?.toLocaleString()}</span>
                </div>
              )}
            </div>
          )}
          <button className="btn btn--ghost" onClick={reset}>Upload Another File</button>
        </div>
      )}

      {/* Error state */}
      {status === STATUS.ERROR && (
        <div className="upload-result upload-result--error">
          <AlertCircle size={36} className="upload-result__icon" />
          <p className="upload-result__desc">{errorMsg}</p>
          <button className="btn btn--ghost" onClick={reset}>Try Again</button>
        </div>
      )}

      {/* Upload CTA */}
      {file && status === STATUS.IDLE && (
        <button className="btn btn--primary btn--lg upload-btn" onClick={handleUpload}>
          <Upload size={18} />
          Upload &amp; Process File
        </button>
      )}
    </div>
  );
};

export default FileUpload;
