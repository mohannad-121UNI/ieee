import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckSquare, Square, X, Shield, Crown, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FinalSubmissionModal({ isOpen, onClose }) {
  const [checks, setChecks] = useState({
    model_exp: false,
    model_cv: false,
    model_folds: false,
    model_noleak: false,
    data_pipeline: false,
    data_identical: false,
    sub_ids: false,
    sub_order: false,
    sub_cols: false,
    sub_rows: false,
    sub_nonan: false,
    sub_noinf: false,
    sub_range: false,
    dyaa_approval: false,
    mohannad_approval: false
  });

  if (!isOpen) return null;

  const toggleCheck = (key) => {
    const nextState = { ...checks, [key]: !checks[key] };
    setChecks(nextState);

    // Check if all 15 items are checked
    const allChecked = Object.values(nextState).every(Boolean);
    if (allChecked) {
      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti error:', err);
      }
    }
  };

  const isReady = Object.values(checks).every(Boolean);
  const checkedCount = Object.values(checks).filter(Boolean).length;
  const totalCount = Object.keys(checks).length;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '750px', border: isReady ? '2px solid var(--accent-green)' : '1px solid var(--border-purple)', boxShadow: isReady ? '0 0 40px rgba(16, 185, 129, 0.4)' : undefined }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={26} color="var(--accent-purple)" />
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
                🏆 ENTER FINAL SUBMISSION MODE
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Zero-tolerance pre-upload verification protocol ({checkedCount} / {totalCount} verified)
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Verification Checklist Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '6px' }}>
          {/* SECTION 1 — MODEL */}
          <div style={{ background: 'rgba(21, 31, 54, 0.6)', padding: '14px', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}>🤖 MODEL CLEARANCE</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks.model_exp} onChange={() => toggleCheck('model_exp')} /> Correct validated experiment selected
              </label>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks.model_cv} onChange={() => toggleCheck('model_cv')} /> Best verified Local CV score logged
              </label>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks.model_folds} onChange={() => toggleCheck('model_folds')} /> Stable cross-fold performance across all splits
              </label>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks.model_noleak} onChange={() => toggleCheck('model_noleak')} /> Zero target or group leakage suspected
              </label>
            </div>
          </div>

          {/* SECTION 2 — DATA */}
          <div style={{ background: 'rgba(21, 31, 54, 0.6)', padding: '14px', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-green)', marginBottom: '8px' }}>📊 DATA CLEARANCE</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks.data_pipeline} onChange={() => toggleCheck('data_pipeline')} /> Train & test preprocessing executed cleanly
              </label>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks.data_identical} onChange={() => toggleCheck('data_identical')} /> Feature engineering pipeline identical on test data
              </label>
            </div>
          </div>

          {/* SECTION 3 — SUBMISSION FORMAT */}
          <div style={{ background: 'rgba(21, 31, 54, 0.6)', padding: '14px', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-purple)', marginBottom: '8px' }}>📤 SUBMISSION FORMAT CLEARANCE</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks.sub_ids} onChange={() => toggleCheck('sub_ids')} /> Correct test sample IDs
              </label>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks.sub_order} onChange={() => toggleCheck('sub_order')} /> Correct row order
              </label>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks.sub_cols} onChange={() => toggleCheck('sub_cols')} /> Correct column names
              </label>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks.sub_rows} onChange={() => toggleCheck('sub_rows')} /> Correct row count (15,000)
              </label>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks.sub_nonan} onChange={() => toggleCheck('sub_nonan')} /> Zero NaN values
              </label>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks.sub_noinf} onChange={() => toggleCheck('sub_noinf')} /> Zero Infinity values
              </label>
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', gridColumn: 'span 2' }}>
                <input type="checkbox" checked={checks.sub_range} onChange={() => toggleCheck('sub_range')} /> Predictions fall strictly within valid target bounds
              </label>
            </div>
          </div>

          {/* SECTION 4 — APPROVALS */}
          <div style={{ background: 'rgba(21, 31, 54, 0.6)', padding: '14px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={checks.dyaa_approval} onChange={() => toggleCheck('dyaa_approval')} /> 🛡️ DYAA RED TEAM APPROVAL
            </label>

            <label style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={checks.mohannad_approval} onChange={() => toggleCheck('mohannad_approval')} /> 👑 MOHANNAD LEADER APPROVAL
            </label>
          </div>
        </div>

        {/* Bottom Banner & Final Action */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {isReady ? (
            <div className="animate-pulse-glow" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(0, 240, 255, 0.2))', border: '2px solid var(--accent-green)', borderRadius: '14px', color: 'var(--accent-green)' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '6px' }}>
                🟢 READY TO SUBMIT 🏆
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                All 15 verification protocols cleared by Red Team & Team Leader. Submit to IEEE Leaderboard!
              </p>
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Complete all 15 verification checkboxes above to clear final submission mode.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
