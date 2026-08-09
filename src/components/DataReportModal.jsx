import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { Database, Send, X, AlertTriangle, Sparkles } from 'lucide-react';

export default function DataReportModal({ isOpen, onClose }) {
  const { addReport } = useWarRoom();

  const [formData, setFormData] = useState({
    trainShape: '45,000 rows × 38 columns',
    testShape: '15,000 rows × 37 columns',
    target: 'target_class (Categorical, 4 unique classes)',
    metric: 'Macro F1-Score',
    missing: 'sensor_8 has 12% missing values. Created binary missing indicator sensor_8_isna.',
    categorical: 'device_type (4 levels), region_code (12 levels). Rare categories grouped into "Other".',
    numerical: 'Features val_1 & val_4 skewed right (skew > 2.8). Applied log1p transform.',
    outliers: 'Detected 42 extreme outliers (> 4 std dev) in sensor_2. Capped at 99.5th percentile.',
    leakageRisks: 'ALERT: transaction_id shows 0.94 correlation with target ordering! Must drop transaction_id.',
    trainTestShift: 'Adversarial Validation AUC = 0.54. Minimal feature drift between train & test.',
    importantFeatures: 'sensor_4, val_1_log1p, device_type_target_enc',
    featureIdeas: 'Sensor interaction ratios: sensor_1 / (sensor_2 + 1e-5), group means by region_code',
    recommendedCv: '5-Fold StratifiedKFold (due to 7.2% minor class imbalance)',
    warnings: 'Do not use transaction_id in model training!'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addReport({
      member: 'Moayad',
      type: 'DATA_REPORT',
      content: formData
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '750px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={24} color="var(--accent-green)" />
            <h3 style={{ fontSize: '1.4rem' }}>📊 Moayad's Data Intelligence Report</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>TRAIN SHAPE:</label>
            <input type="text" value={formData.trainShape} onChange={e => setFormData({ ...formData, trainShape: e.target.value })} required />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>TEST SHAPE:</label>
            <input type="text" value={formData.testShape} onChange={e => setFormData({ ...formData, testShape: e.target.value })} required />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>TARGET COLUMN & TYPE:</label>
            <input type="text" value={formData.target} onChange={e => setFormData({ ...formData, target: e.target.value })} required />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>METRIC:</label>
            <input type="text" value={formData.metric} onChange={e => setFormData({ ...formData, metric: e.target.value })} required />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-red)' }}>🚨 LEAKAGE RISKS (CRITICAL):</label>
            <textarea rows={2} value={formData.leakageRisks} onChange={e => setFormData({ ...formData, leakageRisks: e.target.value })} style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }} required />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>🧩 FEATURE IDEAS (WHY THEY HELP):</label>
            <textarea rows={2} value={formData.featureIdeas} onChange={e => setFormData({ ...formData, featureIdeas: e.target.value })} required />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>MISSING VALUES SUMMARY:</label>
            <textarea rows={2} value={formData.missing} onChange={e => setFormData({ ...formData, missing: e.target.value })} />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>TRAIN/TEST SHIFT:</label>
            <textarea rows={2} value={formData.trainTestShift} onChange={e => setFormData({ ...formData, trainTestShift: e.target.value })} />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>RECOMMENDED CV STRATEGY:</label>
            <input type="text" value={formData.recommendedCv} onChange={e => setFormData({ ...formData, recommendedCv: e.target.value })} required />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-amber)' }}>WARNINGS:</label>
            <input type="text" value={formData.warnings} onChange={e => setFormData({ ...formData, warnings: e.target.value })} />
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #10B981 0%, #00F0FF 100%)' }}>
              <Send size={16} /> SEND DATA REPORT TO TEAM HQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
