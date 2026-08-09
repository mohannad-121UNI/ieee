import React from 'react';
import { MEMBER_CONFIG } from '../config/aiTools';
import AIArsenalCard from '../components/AIArsenalCard';
import TaskChecklist from '../components/TaskChecklist';
import { Crown, Sparkles, CheckCircle, Shield } from 'lucide-react';

export default function MohannadPage() {
  const member = MEMBER_CONFIG.mohannad;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Mohannad Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '32px',
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(112, 0, 255, 0.08))',
          borderTop: '4px solid var(--accent-cyan)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}
      >
        <div className="avatar-frame avatar-frame-cyan" style={{ width: '90px', height: '90px' }}>
          <img 
            src="/assets/mohannad.png" 
            alt="Mohannad" 
            className="avatar-img"
            onError={(e) => { e.target.src = '/assets/mohannad.jpg'; }}
          />
        </div>

        <div style={{ flexGrow: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-cyan">
              <Crown size={12} /> Team Leader
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Station #1</span>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: '900', marginTop: '4px' }}>
            👑 Mohannad — Command Center
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--accent-cyan)', fontWeight: '600', marginTop: '4px' }}>
            {member.subtitle}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {member.responsibilities.map((r, i) => (
              <span key={i} style={{ fontSize: '0.78rem', background: 'rgba(21, 31, 54, 0.8)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI Arsenal */}
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--accent-cyan)" /> 👑 Mohannad's AI Arsenal
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {member.aiTools.map((toolKey) => (
            <AIArsenalCard key={toolKey} toolKey={toolKey} />
          ))}
        </div>
      </div>

      {/* Sequential Task Checklist */}
      <TaskChecklist memberId="mohannad" memberName="Mohannad (Team Leader)" />
    </div>
  );
}
