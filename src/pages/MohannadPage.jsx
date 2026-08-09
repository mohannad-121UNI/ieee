import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import TaskChecklist from '../components/TaskChecklist';
import AIArsenalCard from '../components/AIArsenalCard';
import ExperimentTable from '../components/ExperimentTable';
import CurrentMissionWidget from '../components/CurrentMissionWidget';
import EndgameBanner from '../components/EndgameBanner';
import { Cpu, Plus, Award } from 'lucide-react';

export default function MohannadPage() {
  const { addExperiment, lang, t } = useWarRoom();
  const isAr = lang === 'ar';

  const [showAddModal, setShowAddModal] = useState(false);
  const [model, setModel] = useState('CatBoost');
  const [name, setName] = useState('');
  const [changes, setChanges] = useState('');
  const [cvScore, setCvScore] = useState('');
  const [lbScore, setLbScore] = useState('');
  const [runtime, setRuntime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !cvScore) return;

    addExperiment({
      owner: 'Mohannad',
      model,
      name: name.trim(),
      changes: changes.trim(),
      cvScore: parseFloat(cvScore),
      lbScore: lbScore ? parseFloat(lbScore) : null,
      runtime: runtime || '2m',
      status: 'KEEP',
      notes: notes.trim()
    });

    setName('');
    setChanges('');
    setCvScore('');
    setLbScore('');
    setNotes('');
    setShowAddModal(false);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <EndgameBanner />
      <CurrentMissionWidget filterMember="mohannad" />

      {/* Header Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(112, 0, 255, 0.08))',
          borderTop: '4px solid var(--accent-cyan)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '2px solid var(--accent-cyan)',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)'
          }}>
            <img 
              src="/assets/mohannad.jpg" 
              alt="Mohannad" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = '/assets/mohannad.png'; }}
            />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '900' }}>
              👑 Mohannad — <span className="gradient-text-cyan">{t.mohannadRole}</span>
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {t.mohannadSub}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
          style={{ padding: '12px 24px', fontSize: '0.95rem' }}
        >
          <Plus size={18} /> {t.logExp}
        </button>
      </div>

      {/* Primary AI Arsenal Tool */}
      <AIArsenalCard memberKey="mohannad" />

      {/* Tasks Checklist */}
      <TaskChecklist memberId="mohannad" memberName="Mohannad" />

      {/* Experiments Table */}
      <ExperimentTable />

      {/* Log Experiment Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '520px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>🧪 {t.logExp}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Model Family:</label>
                <select value={model} onChange={e => setModel(e.target.value)}>
                  <option value="CatBoost">CatBoost</option>
                  <option value="LightGBM">LightGBM</option>
                  <option value="XGBoost">XGBoost</option>
                  <option value="NeuralNet">PyTorch / Neural Net</option>
                  <option value="Ensemble">Ensemble / Blending</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Experiment Name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. 5-Fold CatBoost + Ratio Features" required />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Local 5-Fold CV Score:</label>
                <input type="number" step="0.0001" value={cvScore} onChange={e => setCvScore(e.target.value)} placeholder="0.8450" required />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Public LB Score (Optional):</label>
                <input type="number" step="0.0001" value={lbScore} onChange={e => setLbScore(e.target.value)} placeholder="0.8390" />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Runtime:</label>
                <input type="text" value={runtime} onChange={e => setRuntime(e.target.value)} placeholder="2m 15s" />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Notes & Key Changes:</label>
                <input type="text" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Added target encoding inside folds" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">{t.cancel}</button>
                <button type="submit" className="btn-primary">{t.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
