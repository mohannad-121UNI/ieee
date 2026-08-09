import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import TaskChecklist from '../components/TaskChecklist';
import AIArsenalCard from '../components/AIArsenalCard';
import DataReportModal from '../components/DataReportModal';
import CurrentMissionWidget from '../components/CurrentMissionWidget';
import EndgameBanner from '../components/EndgameBanner';
import { Database, FileText } from 'lucide-react';

export default function MoayadPage() {
  const { lang, t } = useWarRoom();
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <EndgameBanner />
      <CurrentMissionWidget filterMember="moayad" />

      {/* Header Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(0, 240, 255, 0.08))',
          borderTop: '4px solid var(--accent-green)',
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
            border: '2px solid var(--accent-green)',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)'
          }}>
            <img 
              src="/assets/moayad.jpg" 
              alt="Moayad" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = '/assets/moayad.png'; }}
            />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '900' }}>
              📊 Moayad — <span className="gradient-text-green">{t.moayadRole}</span>
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {t.moayadSub}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="btn-primary"
          style={{ padding: '12px 24px', fontSize: '0.95rem', background: 'linear-gradient(135deg, #10B981, #00F0FF)' }}
        >
          <FileText size={18} /> {t.sendDataReport}
        </button>
      </div>

      {/* Primary AI Arsenal Tool */}
      <AIArsenalCard memberKey="moayad" />

      {/* Tasks Checklist */}
      <TaskChecklist memberId="moayad" memberName="Moayad" />

      {/* Data Report Modal */}
      <DataReportModal isOpen={showReportModal} onClose={() => setShowReportModal(false)} />
    </div>
  );
}
