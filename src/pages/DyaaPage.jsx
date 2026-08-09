import React, { useState } from 'react';
import { MEMBER_CONFIG } from '../config/aiTools';
import { useWarRoom } from '../context/WarRoomContext';
import AIArsenalCard from '../components/AIArsenalCard';
import TaskChecklist from '../components/TaskChecklist';
import RedTeamReportModal from '../components/RedTeamReportModal';
import { Shield, Sparkles, Send, ShieldCheck, AlertOctagon } from 'lucide-react';

export default function DyaaPage() {
  const member = MEMBER_CONFIG.dyaa;
  const { tasks } = useWarRoom();
  const [showReportModal, setShowReportModal] = useState(false);

  const dyaTasks = tasks.filter(t => t.memberId === 'dyaa');
  const qaTask = dyaTasks.find(t => t.id === 'dya_7'); // Submission QA task
  const isSubmissionCleared = qaTask && qaTask.completed;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Dyaa Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '32px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(239, 68, 68, 0.08))',
          borderTop: '4px solid var(--accent-amber)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}
      >
        <div className="avatar-frame avatar-frame-amber" style={{ width: '90px', height: '90px' }}>
          <img 
            src="/assets/dyaa.jpg" 
            alt="Dyaa" 
            className="avatar-img"
            onError={(e) => { e.target.src = '/assets/dyaa.png'; }}
          />
        </div>

        <div style={{ flexGrow: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-amber">
              <Shield size={12} /> Red Team / QA Officer
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Station #3</span>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: '900', marginTop: '4px' }}>
            🛡️ Dyaa — Red Team Center
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--accent-amber)', fontWeight: '700', marginTop: '4px' }}>
            # CHALLENGE OUR ASSUMPTIONS
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {member.responsibilities.map((r, i) => (
              <span key={i} style={{ fontSize: '0.78rem', background: 'rgba(21, 31, 54, 0.8)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => setShowReportModal(true)}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
              padding: '12px 20px'
            }}
          >
            <Send size={18} /> 📤 SEND RED TEAM REPORT
          </button>
        </div>
      </div>

      {/* Submission Clearance Badge Panel */}
      <div 
        className="glass-panel"
        style={{
          padding: '24px',
          textAlign: 'center',
          border: isSubmissionCleared ? '2px solid var(--accent-green)' : '1px solid var(--border-glass)',
          background: isSubmissionCleared ? 'rgba(16, 185, 129, 0.08)' : 'rgba(21, 31, 54, 0.5)'
        }}
      >
        {isSubmissionCleared ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={48} color="var(--accent-green)" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--accent-green)' }}>
              🛡️ SUBMISSION CLEARED
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
              Dyaa has audited submission row count, IDs, columns, NaN values, and range bounds. Safe for uploading!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <AlertOctagon size={40} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-amber)' }}>
              ⚠️ SUBMISSION QA PENDING CLEARANCE
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Complete Task 7️⃣ ("Submission QA Verification") below to issue the official clearance badge.
            </p>
          </div>
        )}
      </div>

      {/* AI Arsenal */}
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--accent-amber)" /> 🛡️ Dyaa's AI Arsenal
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {member.aiTools.map((toolKey) => (
            <AIArsenalCard key={toolKey} toolKey={toolKey} />
          ))}
        </div>
      </div>

      {/* Sequential Task Checklist */}
      <TaskChecklist memberId="dyaa" memberName="Dyaa (Red Team QA)" />

      <RedTeamReportModal isOpen={showReportModal} onClose={() => setShowReportModal(false)} />
    </div>
  );
}
