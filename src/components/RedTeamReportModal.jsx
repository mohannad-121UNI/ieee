import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { Shield, Send, X, AlertTriangle } from 'lucide-react';

export default function RedTeamReportModal({ isOpen, onClose }) {
  const { addReport } = useWarRoom();

  const [formData, setFormData] = useState({
    criticalRisks: 'Target Encoding in preprocessor must strictly fit on train fold to prevent OOF data leakage.',
    mediumRisks: 'Model memory footprint exceeds 12GB on high fold iterations. Limit max depth to 8.',
    alternativeIdeas: 'Construct XGBoost Dart booster pipeline to cross-validate CatBoost predictions.',
    verifiedComponents: 'Metric logic 100% verified against sklearn. CV StratifiedKFold split verified free of fold leakage.',
    recommendedExperiment: 'Test 70% CatBoost + 30% XGBoost blend on OOF predictions.'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addReport({
      member: 'Dyaa',
      type: 'RED_TEAM_REPORT',
      content: formData
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '750px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={24} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '1.4rem' }}>🛡️ Dyaa's Red Team Risk & QA Report</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-red)' }}>🚨 CRITICAL RISKS:</label>
            <textarea rows={2} value={formData.criticalRisks} onChange={e => setFormData({ ...formData, criticalRisks: e.target.value })} style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }} required />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-amber)' }}>⚠️ MEDIUM RISKS:</label>
            <textarea rows={2} value={formData.mediumRisks} onChange={e => setFormData({ ...formData, mediumRisks: e.target.value })} />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-green)' }}>✅ VERIFIED COMPONENTS:</label>
            <textarea rows={2} value={formData.verifiedComponents} onChange={e => setFormData({ ...formData, verifiedComponents: e.target.value })} required />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-purple)' }}>💡 ALTERNATIVE MODEL IDEAS:</label>
            <textarea rows={2} value={formData.alternativeIdeas} onChange={e => setFormData({ ...formData, alternativeIdeas: e.target.value })} />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>🧪 RECOMMENDED EXPERIMENT:</label>
            <input type="text" value={formData.recommendedExperiment} onChange={e => setFormData({ ...formData, recommendedExperiment: e.target.value })} required />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)' }}>
              <Send size={16} /> SEND RED TEAM REPORT TO TEAM HQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
