import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { UploadCloud, Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function SubmissionTracker() {
  const { submissions, addSubmission, experiments, competition } = useWarRoom();
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    experimentId: experiments[0]?.id || '',
    cvScore: experiments[0]?.cvScore || '',
    lbScore: '',
    notes: ''
  });

  const limit = competition.submissionLimit || 10;
  const used = submissions.length;
  const remaining = Math.max(0, limit - used);
  const isLow = remaining <= 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.lbScore) return;
    addSubmission(formData);
    setShowAddModal(false);
    setFormData({ experimentId: '', cvScore: '', lbScore: '', notes: '' });
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UploadCloud size={22} color="var(--accent-cyan)" /> 📤 Submission Quota & Log
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Track daily IEEE leaderboard uploads ({used} of {limit} used)
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <Plus size={16} /> RECORD SUBMISSION
        </button>
      </div>

      {/* Quota Progress Bar */}
      <div style={{ marginBottom: '20px', background: 'rgba(21, 31, 54, 0.6)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>
            SUBMISSIONS USED: <span style={{ color: isLow ? 'var(--accent-red)' : 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{used} / {limit}</span>
          </span>
          <span className={`badge ${isLow ? 'badge-red' : 'badge-cyan'}`}>
            {remaining} REMAINING TODAY
          </span>
        </div>

        <div className="progress-bar-bg" style={{ height: '10px' }}>
          <div 
            className={`progress-bar-fill ${isLow ? 'progress-bar-amber' : 'progress-bar-cyan'}`}
            style={{ width: `${(used / limit) * 100}%` }}
          ></div>
        </div>

        {isLow && (
          <p style={{ fontSize: '0.8rem', color: 'var(--accent-red)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={14} /> ⚠️ Only {remaining} submissions remaining! Use Red Team QA before uploading.
          </p>
        )}
      </div>

      {/* Submission Table Log */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 6px', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ color: 'var(--text-dim)', textAlign: 'left' }}>
              <th style={{ padding: '6px 10px' }}>#</th>
              <th style={{ padding: '6px 10px' }}>Experiment ID</th>
              <th style={{ padding: '6px 10px' }}>Local CV</th>
              <th style={{ padding: '6px 10px' }}>Public LB</th>
              <th style={{ padding: '6px 10px' }}>Timestamp</th>
              <th style={{ padding: '6px 10px' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub.id} style={{ background: 'rgba(21, 31, 54, 0.4)', borderRadius: '8px' }}>
                <td style={{ padding: '10px', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>#{sub.submissionNumber}</td>
                <td style={{ padding: '10px', fontWeight: '700', color: 'var(--accent-cyan)' }}>{sub.experimentId || 'EXP-001'}</td>
                <td style={{ padding: '10px', fontFamily: 'var(--font-mono)' }}>{sub.cvScore}</td>
                <td style={{ padding: '10px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)' }}>{sub.lbScore}</td>
                <td style={{ padding: '10px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {new Date(sub.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td style={{ padding: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{sub.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>📤 Record New Submission</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>LINKED EXPERIMENT:</label>
                <select 
                  value={formData.experimentId} 
                  onChange={e => {
                    const selected = experiments.find(ex => ex.id === e.target.value);
                    setFormData({
                      ...formData,
                      experimentId: e.target.value,
                      cvScore: selected ? selected.cvScore : formData.cvScore
                    });
                  }}
                >
                  {experiments.map(e => (
                    <option key={e.id} value={e.id}>{e.id} — {e.model} ({e.name})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>LOCAL CV SCORE:</label>
                <input type="number" step="any" value={formData.cvScore} onChange={e => setFormData({ ...formData, cvScore: e.target.value })} required />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-purple)' }}>PUBLIC LB SCORE RETURNED:</label>
                <input type="number" step="any" value={formData.lbScore} onChange={e => setFormData({ ...formData, lbScore: e.target.value })} placeholder="0.8102" required />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>NOTES:</label>
                <input type="text" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="e.g. Scored after 5-fold CatBoost" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">RECORD SUBMISSION</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
