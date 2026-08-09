import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import TaskChecklist from '../components/TaskChecklist';
import AIArsenalCard from '../components/AIArsenalCard';
import RedTeamReportModal from '../components/RedTeamReportModal';
import CurrentMissionWidget from '../components/CurrentMissionWidget';
import EndgameBanner from '../components/EndgameBanner';
import { Shield, AlertTriangle } from 'lucide-react';

export default function DyaaPage() {
  const { lang, t } = useWarRoom();
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <EndgameBanner />
      <CurrentMissionWidget filterMember="dyaa" />

      {/* Header Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(239, 68, 68, 0.08))',
          borderTop: '4px solid var(--accent-amber)',
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
            border: '2px solid var(--accent-amber)',
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.4)'
          }}>
            <img 
              src="/assets/dyaa.jpg" 
              alt="Dyaa" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = '/assets/dyaa.png'; }}
            />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '900' }}>
              🛡️ Dyaa — <span style={{ color: 'var(--accent-amber)' }}>{t.dyaaRole}</span>
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {t.dyaaSub}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="btn-primary"
          style={{ padding: '12px 24px', fontSize: '0.95rem', background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}
        >
          <AlertTriangle size={18} /> {t.sendRedReport}
        </button>
      </div>

      {/* Primary AI Arsenal Tool */}
      <AIArsenalCard memberKey="dyaa" />

      {/* Tasks Checklist */}
      <TaskChecklist memberId="dyaa" memberName="Dyaa" />

      {/* Red Team Report Modal */}
      <RedTeamReportModal isOpen={showReportModal} onClose={() => setShowReportModal(false)} />
    </div>
  );
}
