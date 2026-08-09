import React from 'react';
import { Network, ArrowRight } from 'lucide-react';

export default function TeamWorkflow() {
  const phases = [
    {
      num: 'PHASE 1',
      title: 'UNDERSTAND 🧠',
      details: ['👑 Mohannad: Metric & Objective', '📊 Moayad: Data Structure & Types', '🛡️ Dyaa: Rules & Hidden Constraints']
    },
    {
      num: 'PHASE 2',
      title: 'BASELINE 🚀',
      details: ['👑 Mohannad: Simplest Working Pipeline', '📊 Moayad: EDA & Missing Values', '🛡️ Dyaa: Local Metric Verification']
    },
    {
      num: 'PHASE 3',
      title: 'IMPROVE 🧪',
      details: ['👑 Mohannad: GBDT Modeling Iteration', '📊 Moayad: Domain Feature Ratios', '🛡️ Dyaa: Alternative XGBoost Branch']
    },
    {
      num: 'PHASE 4',
      title: 'VERIFY 🛡️',
      details: ['👑 Mohannad: Local CV Stability', '📊 Moayad: Distribution Drift Check', '🛡️ Dyaa: Target Leakage Audit']
    },
    {
      num: 'PHASE 5',
      title: 'ENSEMBLE 🧬',
      details: ['👑 Mohannad: Stacking & Rank Blend', '📊 Moayad: OOF Prediction Matrix', '🛡️ Dyaa: Blending Weight Sanity']
    },
    {
      num: 'PHASE 6',
      title: 'FINAL 🏆',
      details: ['👑 Mohannad: Final Candidate Lock', '📊 Moayad: Submission File Export', '🛡️ Dyaa: Final QA Clearance & Upload']
    }
  ];

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
        <Network size={22} color="var(--accent-cyan)" /> 📋 6-PHASE COMPETITION WORKFLOW PROTOCOL
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        {phases.map((p, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(21, 31, 54, 0.6)',
              border: '1px solid var(--border-glass)',
              borderRadius: '12px',
              padding: '14px',
              position: 'relative'
            }}
          >
            <span style={{ fontSize: '0.68rem', fontWeight: '800', color: 'var(--accent-purple)' }}>{p.num}</span>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--accent-cyan)', margin: '2px 0 8px 0' }}>{p.title}</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {p.details.map((d, i) => (
                <li key={i}>• {d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
