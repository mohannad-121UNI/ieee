import React from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ScoreTrackerChart() {
  const { experiments, competition } = useWarRoom();

  const validExps = experiments.filter(e => e.cvScore !== undefined && e.cvScore !== null);
  const bestCvExp = [...validExps].sort((a, b) => (b.cvScore || 0) - (a.cvScore || 0))[0];
  const bestLbExp = [...validExps].filter(e => e.lbScore).sort((a, b) => (b.lbScore || 0) - (a.lbScore || 0))[0];

  const bestCv = bestCvExp ? bestCvExp.cvScore : 'N/A';
  const bestLb = bestLbExp ? bestLbExp.lbScore : 'N/A';

  // Calculate CV vs LB gap
  let gapWarning = null;
  if (bestCvExp && bestCvExp.lbScore) {
    const gap = Math.abs(bestCvExp.cvScore - bestCvExp.lbScore);
    if (gap > 0.03) {
      gapWarning = {
        type: 'danger',
        title: '🚨 Large CV / LB Gap Detected!',
        desc: `Local CV (${bestCvExp.cvScore}) and Public LB (${bestCvExp.lbScore}) differ by ${gap.toFixed(4)}. High risk of Public LB overfitting or train/test distribution drift!`
      };
    } else if (bestCvExp.cvScore > bestCvExp.lbScore) {
      gapWarning = {
        type: 'warning',
        title: '🟡 CV Improved + LB Slightly Unchanged',
        desc: 'Keep investigating feature engineering or trust local validation. Public LB is evaluated on a small test subset.'
      };
    } else {
      gapWarning = {
        type: 'success',
        title: '🟢 CV and Leaderboard are Aligned',
        desc: 'Strong improvement! Both Local CV and Public LB indicate genuine model generalization.'
      };
    }
  } else {
    gapWarning = {
      type: 'info',
      title: 'ℹ️ Awaiting Public Leaderboard Verification',
      desc: 'Local CV is established. Submit your predictions to verify Public LB alignment.'
    };
  }

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="var(--accent-purple)" /> 📈 Score Progression & CV/LB Alignment
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Real-time validation tracking vs Public Leaderboard
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', textAlign: 'right' }}>
          <div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>BEST LOCAL CV</p>
            <p style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              {bestCv}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>BEST PUBLIC LB</p>
            <p style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)' }}>
              {bestLb}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Warning Alert Banner */}
      <div 
        style={{
          background: gapWarning.type === 'danger' ? 'rgba(239, 68, 68, 0.12)' :
                      gapWarning.type === 'warning' ? 'rgba(245, 158, 11, 0.12)' :
                      gapWarning.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(0, 240, 255, 0.1)',
          border: `1px solid ${
            gapWarning.type === 'danger' ? 'rgba(239, 68, 68, 0.3)' :
            gapWarning.type === 'warning' ? 'rgba(245, 158, 11, 0.3)' :
            gapWarning.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(0, 240, 255, 0.3)'
          }`,
          borderRadius: '12px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        {gapWarning.type === 'danger' && <AlertTriangle size={22} color="var(--accent-red)" style={{ flexShrink: 0 }} />}
        {gapWarning.type === 'warning' && <AlertTriangle size={22} color="var(--accent-amber)" style={{ flexShrink: 0 }} />}
        {gapWarning.type === 'success' && <CheckCircle size={22} color="var(--accent-green)" style={{ flexShrink: 0 }} />}
        {gapWarning.type === 'info' && <Info size={22} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />}

        <div>
          <h4 style={{
            fontSize: '0.95rem',
            fontWeight: '700',
            color: gapWarning.type === 'danger' ? 'var(--accent-red)' :
                   gapWarning.type === 'warning' ? 'var(--accent-amber)' :
                   gapWarning.type === 'success' ? 'var(--accent-green)' : 'var(--accent-cyan)'
          }}>
            {gapWarning.title}
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-main)', marginTop: '2px' }}>
            {gapWarning.desc}
          </p>
        </div>
      </div>

      {/* Visual Progression Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {validExps.map((e, idx) => (
          <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.82rem' }}>
            <span style={{ width: '70px', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>{e.id}</span>
            <span style={{ width: '130px', color: 'var(--text-muted)' }}>{e.model}</span>
            
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {/* CV bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '24px', fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>CV</span>
                <div className="progress-bar-bg" style={{ flexGrow: 1, height: '8px' }}>
                  <div className="progress-bar-fill progress-bar-cyan" style={{ width: `${Math.min(100, (e.cvScore / (competition.metricDirection === 'lower' ? 1.0 : 1.0)) * 100)}%` }}></div>
                </div>
                <span style={{ width: '50px', textAlign: 'right', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>{e.cvScore}</span>
              </div>

              {/* LB bar */}
              {e.lbScore && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '24px', fontSize: '0.7rem', color: 'var(--accent-purple)' }}>LB</span>
                  <div className="progress-bar-bg" style={{ flexGrow: 1, height: '6px' }}>
                    <div className="progress-bar-fill progress-bar-purple" style={{ width: `${Math.min(100, (e.lbScore / 1.0) * 100)}%` }}></div>
                  </div>
                  <span style={{ width: '50px', textAlign: 'right', fontWeight: '700', color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)' }}>{e.lbScore}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
