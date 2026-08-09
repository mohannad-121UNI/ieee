import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { Upload, FileText, Check, Database, AlertCircle, X } from 'lucide-react';

export default function DatasetUploadModal({ isOpen, onClose }) {
  const { competition, updateCompetition, lang, t, addNotification } = useWarRoom();
  const isAr = lang === 'ar';

  const [problemDesc, setProblemDesc] = useState('');
  const [metricName, setMetricName] = useState(competition.metric || 'Macro F1-Score');
  const [metricDir, setMetricDir] = useState(competition.metricDirection || 'higher');
  const [fileName, setFileName] = useState('');
  const [fileDetails, setFileDetails] = useState(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n').filter(l => l.trim().length > 0);
      const header = lines[0] ? lines[0].split(',') : [];

      const info = {
        name: file.name,
        rows: lines.length - 1,
        cols: header.length,
        columns: header.slice(0, 15) // First 15 columns preview
      };

      setFileDetails(info);
    };

    reader.readAsText(file);
  };

  const handleSave = () => {
    updateCompetition({
      metric: metricName,
      metricDirection: metricDir,
      datasetInfo: fileDetails,
      problemDescription: problemDesc
    });

    addNotification('📁 Data Saved to War Room!', `Dataset metadata saved: ${fileName || 'CSV File'} (${fileDetails?.rows || 0} rows).`, 'success');
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 10005 }}>
      <div className="modal-content glass-panel" style={{ maxWidth: '580px', width: '90%', padding: '28px', borderTop: '4px solid var(--accent-cyan)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={24} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>
              {isAr ? '📁 تحميل وتخزين بيانات المسابقة في غرفة العمليات' : '📁 Upload & Store Competition Data'}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Upload File Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            {isAr ? '1. اختر ملف البيانات (train.csv / test.csv):' : '1. Select Dataset File (train.csv / test.csv):'}
          </label>
          <div style={{
            border: '2px dashed var(--border-cyan)',
            borderRadius: '14px',
            padding: '24px',
            textAlign: 'center',
            background: 'rgba(0, 240, 255, 0.04)',
            cursor: 'pointer'
          }}>
            <input 
              type="file" 
              accept=".csv,.txt,.json" 
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="competition_file_input"
            />
            <label htmlFor="competition_file_input" style={{ cursor: 'pointer' }}>
              <Upload size={32} color="var(--accent-cyan)" style={{ margin: '0 auto 8px auto' }} />
              <p style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                {fileName ? `File Selected: ${fileName}` : (isAr ? 'اضغط هنا لرفع ملف train.csv' : 'Click to Upload train.csv or dataset file')}
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Supports .csv files</span>
            </label>
          </div>

          {fileDetails && (
            <div style={{ marginTop: '12px', padding: '12px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-green)', fontSize: '0.82rem', color: 'var(--accent-green)' }}>
              ✓ Loaded: {fileDetails.rows} rows, {fileDetails.cols} columns.
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Columns preview: {fileDetails.columns.join(', ')}...
              </div>
            </div>
          )}
        </div>

        {/* Problem & Metric Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              {isAr ? '2. اسم وتدقيق دالة التقييم Metric:' : '2. Evaluation Metric Name:'}
            </label>
            <input 
              type="text" 
              value={metricName} 
              onChange={e => setMetricName(e.target.value)} 
              placeholder="e.g. Macro F1-Score, RMSE, LogLoss"
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              {isAr ? 'اتجاه دالة التقييم:' : 'Metric Optimization Direction:'}
            </label>
            <select value={metricDir} onChange={e => setMetricDir(e.target.value)}>
              <option value="higher">Higher is Better (e.g. Accuracy, F1, ROC-AUC)</option>
              <option value="lower">Lower is Better (e.g. RMSE, MAE, LogLoss)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              {isAr ? '3. نص وصف المسابقة وقواعدها (اختياري):' : '3. Competition Description / Rules Text:'}
            </label>
            <textarea
              rows={3}
              value={problemDesc}
              onChange={e => setProblemDesc(e.target.value)}
              placeholder="Paste competition details here..."
              style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} className="btn-secondary">{t.cancel}</button>
          <button onClick={handleSave} className="btn-primary">
            <Check size={16} /> {isAr ? 'حفظ البيانات واختتام الخطوة' : 'Save & Confirm Data'}
          </button>
        </div>
      </div>
    </div>
  );
}
