import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { FlaskConical, Plus, ArrowUpDown, Award, Check, X, AlertTriangle, Clock } from 'lucide-react';

export default function ExperimentTable() {
  const { experiments, addExperiment, updateExperimentStatus, competition } = useWarRoom();
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortAsc, setSortAsc] = useState(competition.metricDirection === 'lower');

  const [newExp, setNewExp] = useState({
    owner: 'Mohannad',
    model: 'CatBoost',
    name: '',
    changes: '',
    cvScore: '',
    cvStd: '',
    lbScore: '',
    runtime: '5m',
    status: 'KEEP',
    notes: ''
  });

  // Sort experiments by CV
  const sortedExperiments = [...experiments].sort((a, b) => {
    const valA = parseFloat(a.cvScore) || 0;
    const valB = parseFloat(b.cvScore) || 0;
    return sortAsc ? valA - valB : valB - valA;
  });

  // Find overall best experiment ID
  const bestExp = [...experiments].sort((a, b) => {
    if (competition.metricDirection === 'lower') {
      return (a.cvScore || Infinity) - (b.cvScore || Infinity);
    }
    return (b.cvScore || -Infinity) - (a.cvScore || -Infinity);
  })[0];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newExp.name || !newExp.cvScore) return;
    addExperiment(newExp);
    setShowAddModal(false);
    setNewExp({
      owner: 'Mohannad',
      model: 'CatBoost',
      name: '',
      changes: '',
      cvScore: '',
      cvStd: '',
      lbScore: '',
      runtime: '5m',
      status: 'KEEP',
      notes: ''
    });
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      {/* Table Header Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FlaskConical size={22} color="var(--accent-cyan)" /> 🧪 ML Experiment Tracker
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Systematic hypothesis logging ({experiments.length} total logged)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem' }}
          >
            <ArrowUpDown size={14} /> Sort CV ({sortAsc ? 'Asc' : 'Desc'})
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Plus size={16} /> LOG EXPERIMENT
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ color: 'var(--text-dim)', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px' }}>ID</th>
              <th style={{ padding: '8px 12px' }}>Owner</th>
              <th style={{ padding: '8px 12px' }}>Model</th>
              <th style={{ padding: '8px 12px' }}>Experiment</th>
              <th style={{ padding: '8px 12px' }}>Changes</th>
              <th style={{ padding: '8px 12px' }}>CV Score</th>
              <th style={{ padding: '8px 12px' }}>Public LB</th>
              <th style={{ padding: '8px 12px' }}>Runtime</th>
              <th style={{ padding: '8px 12px' }}>Status</th>
              <th style={{ padding: '8px 12px' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {sortedExperiments.map((exp) => {
              const isBest = bestExp && bestExp.id === exp.id;

              return (
                <tr
                  key={exp.id}
                  style={{
                    background: isBest ? 'rgba(0, 240, 255, 0.08)' : 'rgba(21, 31, 54, 0.5)',
                    border: isBest ? '2px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
                    borderRadius: '10px',
                    boxShadow: isBest ? 'var(--glow-cyan)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <td style={{ padding: '12px', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                    {isBest ? (
                      <span className="badge badge-cyan" style={{ gap: '4px' }}>
                        <Award size={12} /> {exp.id}
                      </span>
                    ) : (
                      exp.id
                    )}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      fontWeight: '600',
                      color: exp.owner === 'Mohannad' ? 'var(--accent-cyan)' :
                             exp.owner === 'Moayad' ? 'var(--accent-green)' : 'var(--accent-amber)'
                    }}>
                      {exp.owner}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontWeight: '700' }}>{exp.model}</td>
                  <td style={{ padding: '12px', color: 'var(--text-main)' }}>{exp.name}</td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>{exp.changes}</td>
                  <td style={{ padding: '12px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: isBest ? 'var(--accent-cyan)' : 'var(--text-main)' }}>
                    {exp.cvScore} {exp.cvStd ? <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>±{exp.cvStd}</span> : ''}
                  </td>
                  <td style={{ padding: '12px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-purple)' }}>
                    {exp.lbScore || '—'}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-dim)', fontSize: '0.8rem' }}>{exp.runtime}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={`badge ${
                      exp.status === 'BEST' ? 'badge-cyan' :
                      exp.status === 'KEEP' ? 'badge-green' :
                      exp.status === 'DROP' ? 'badge-red' :
                      exp.status === 'TESTING' ? 'badge-purple' : 'badge-amber'
                    }`}>
                      {exp.status === 'KEEP' && '✅ KEEP'}
                      {exp.status === 'DROP' && '❌ DROP'}
                      {exp.status === 'TESTING' && '🧪 TESTING'}
                      {exp.status === 'REVIEW' && '⚠️ REVIEW'}
                      {exp.status === 'BEST' && '🏆 BEST'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{exp.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Experiment Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.3rem' }}>🧪 Log New ML Experiment</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>OWNER:</label>
                <select value={newExp.owner} onChange={e => setNewExp({ ...newExp, owner: e.target.value })}>
                  <option value="Mohannad">Mohannad (Team Leader)</option>
                  <option value="Moayad">Moayad (Data Officer)</option>
                  <option value="Dyaa">Dyaa (Red Team QA)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>MODEL FAMILY:</label>
                <input type="text" value={newExp.model} onChange={e => setNewExp({ ...newExp, model: e.target.value })} placeholder="CatBoost / LightGBM / XGBoost" required />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>EXPERIMENT NAME:</label>
                <input type="text" value={newExp.name} onChange={e => setNewExp({ ...newExp, name: e.target.value })} placeholder="e.g. Ratio Features + Target Enc" required />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>SPECIFIC CHANGES:</label>
                <input type="text" value={newExp.changes} onChange={e => setNewExp({ ...newExp, changes: e.target.value })} placeholder="e.g. Added 6 sensor ratios, lr=0.02" required />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>LOCAL CV SCORE:</label>
                <input type="number" step="any" value={newExp.cvScore} onChange={e => setNewExp({ ...newExp, cvScore: e.target.value })} placeholder="0.8124" required />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>CV STD (OPTIONAL):</label>
                <input type="number" step="any" value={newExp.cvStd} onChange={e => setNewExp({ ...newExp, cvStd: e.target.value })} placeholder="0.0035" />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-purple)' }}>PUBLIC LB SCORE (OPTIONAL):</label>
                <input type="number" step="any" value={newExp.lbScore} onChange={e => setNewExp({ ...newExp, lbScore: e.target.value })} placeholder="0.8102" />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>RUNTIME:</label>
                <input type="text" value={newExp.runtime} onChange={e => setNewExp({ ...newExp, runtime: e.target.value })} placeholder="e.g. 6m 12s" />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>STATUS:</label>
                <select value={newExp.status} onChange={e => setNewExp({ ...newExp, status: e.target.value })}>
                  <option value="KEEP">✅ KEEP</option>
                  <option value="DROP">❌ DROP</option>
                  <option value="TESTING">🧪 TESTING</option>
                  <option value="REVIEW">⚠️ REVIEW</option>
                  <option value="BEST">🏆 BEST</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>NOTES / RATIONALE:</label>
                <input type="text" value={newExp.notes} onChange={e => setNewExp({ ...newExp, notes: e.target.value })} placeholder="Why did the score change?" />
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">LOG EXPERIMENT</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
