import React from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { Award, TrendingUp, CheckCircle, X } from 'lucide-react';

export default function BestCvModal() {
  const { bestCvModal, setBestCvModal, lang } = useWarRoom();
  const isAr = lang === 'ar';

  if (!bestCvModal) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 10005 }}>
      <div 
        className="modal-content glass-panel animate-pulse-glow"
        style={{
          maxWidth: '520px',
          width: '90%',
          padding: '32px',
          textAlign: 'center',
          borderTop: '4px solid var(--accent-green)',
          background: 'linear-gradient(135deg, rgba(16, 23, 42, 0.98), rgba(21, 31, 54, 0.9))'
        }}
      >
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10B981, #00F0FF)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto',
          boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)'
        }}>
          <Award size={38} color="#060911" />
        </div>

        <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--accent-green)', marginBottom: '8px' }}>
          🏆 {isAr ? 'تحقيق أفضل تقييم محلي جديد (NEW BEST CV)!' : 'NEW BEST CV ACHIEVED!'}
        </h2>

        <p style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '20px' }}>
          {bestCvModal.expId} — <span style={{ color: 'var(--accent-cyan)' }}>{bestCvModal.model}</span>
        </p>

        {/* Score Comparison Box */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          padding: '16px',
          background: 'rgba(8, 12, 24, 0.8)',
          borderRadius: '14px',
          border: '1px solid var(--border-glass)',
          marginBottom: '20px'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{isAr ? 'التقييم السابق' : 'PREVIOUS CV'}</span>
            <p style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {bestCvModal.prevCv ? bestCvModal.prevCv : 'N/A'}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)' }}>{isAr ? 'التقييم الجديد' : 'NEW BEST CV'}</span>
            <p style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
              {bestCvModal.newCv}
            </p>
          </div>
        </div>

        <div style={{ fontSize: '0.9rem', color: 'var(--accent-green)', fontWeight: '700', marginBottom: '24px' }}>
          <TrendingUp size={16} /> Improvement Gain: +{bestCvModal.gain}
        </div>

        <button
          onClick={() => setBestCvModal(null)}
          className="btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '1rem', background: 'linear-gradient(135deg, #10B981, #00F0FF)' }}
        >
          <CheckCircle size={18} /> {isAr ? 'تأكيد التسجيل والمتابعة!' : 'Keep Pushing — Continue Mission!'}
        </button>
      </div>
    </div>
  );
}
