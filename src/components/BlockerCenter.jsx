import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { AlertOctagon, Plus, CheckCircle, AlertTriangle, X } from 'lucide-react';

export default function BlockerCenter() {
  const { blockers, addBlocker, toggleBlockerResolved } = useWarRoom();
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: 'Dyaa',
    severity: 'HIGH'
  });

  const activeBlockers = blockers.filter(b => !b.resolved);
  const resolvedBlockers = blockers.filter(b => b.resolved);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    addBlocker(formData);
    setShowAddModal(false);
    setFormData({ title: '', description: '', owner: 'Dyaa', severity: 'HIGH' });
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', borderLeft: activeBlockers.length ? '4px solid var(--accent-red)' : '4px solid var(--accent-green)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertOctagon size={22} color={activeBlockers.length ? 'var(--accent-red)' : 'var(--accent-green)'} />
            🚨 Team Blocker Center
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Detect, flag, and resolve pipeline bottlenecks instantly ({activeBlockers.length} active)
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-danger"
          style={{ padding: '8px 14px', fontSize: '0.8rem' }}
        >
          <Plus size={15} /> FLAG BLOCKER
        </button>
      </div>

      {/* Active Blockers List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        {activeBlockers.length === 0 ? (
          <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center', color: 'var(--accent-green)', fontWeight: '600', fontSize: '0.9rem' }}>
            🎉 Zero active blockers! All systems operational.
          </div>
        ) : (
          activeBlockers.map((b) => (
            <div
              key={b.id}
              style={{
                background: b.severity === 'CRITICAL' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.12)',
                border: `1px solid ${b.severity === 'CRITICAL' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className={`badge ${b.severity === 'CRITICAL' ? 'badge-red' : 'badge-amber'}`}>
                    🚨 {b.severity}
                  </span>
                  <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{b.title}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({b.owner})</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                  {b.description}
                </p>
              </div>

              <button
                onClick={() => toggleBlockerResolved(b.id)}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: 'var(--accent-green)', color: 'var(--accent-green)' }}
              >
                <CheckCircle size={14} /> Resolve
              </button>
            </div>
          ))
        )}
      </div>

      {/* Resolved Blockers Collapsible */}
      {resolvedBlockers.length > 0 && (
        <details style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>
            Show {resolvedBlockers.length} resolved blocker(s)
          </summary>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
            {resolvedBlockers.map(b => (
              <div key={b.id} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', textDecoration: 'line-through', color: 'var(--text-dim)' }}>
                <span>{b.title} ({b.owner})</span>
                <button onClick={() => toggleBlockerResolved(b.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem' }}>Reopen</button>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--accent-red)' }}>🚨 Flag New Blocker</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>BLOCKER TITLE:</label>
                <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Target Leakage in transaction_id" required />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>DESCRIPTION / DETAILS:</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Explain what failed and why..." required />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>OWNER / ASSIGNEE:</label>
                <select value={formData.owner} onChange={e => setFormData({ ...formData, owner: e.target.value })}>
                  <option value="Mohannad">Mohannad (Team Leader)</option>
                  <option value="Moayad">Moayad (Data Officer)</option>
                  <option value="Dyaa">Dyaa (Red Team QA)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>SEVERITY LEVEL:</label>
                <select value={formData.severity} onChange={e => setFormData({ ...formData, severity: e.target.value })}>
                  <option value="MEDIUM">🟡 Medium (Performance hit)</option>
                  <option value="HIGH">🟠 High (Impacting experiments)</option>
                  <option value="CRITICAL">🔴 Critical (Pipeline halted)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-danger">FLAG BLOCKER</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
