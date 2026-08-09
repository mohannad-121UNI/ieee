import React from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { Activity, Clock } from 'lucide-react';

export default function ActivityFeed() {
  const { activities } = useWarRoom();

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Activity size={20} color="var(--accent-green)" /> 🔄 Live Activity Audit Feed
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
        {activities.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No recent activity recorded.</p>
        ) : (
          activities.map((act) => (
            <div
              key={act.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.83rem',
                padding: '8px 12px',
                background: 'rgba(21, 31, 54, 0.4)',
                borderRadius: '8px',
                borderLeft: `3px solid ${
                  act.member === 'Mohannad' ? 'var(--accent-cyan)' :
                  act.member === 'Moayad' ? 'var(--accent-green)' : 'var(--accent-amber)'
                }`
              }}
            >
              <div>
                <span style={{
                  fontWeight: '700',
                  color: act.member === 'Mohannad' ? 'var(--accent-cyan)' :
                         act.member === 'Moayad' ? 'var(--accent-green)' : 'var(--accent-amber)',
                  marginRight: '6px'
                }}>
                  {act.member}
                </span>
                <span style={{ color: 'var(--text-main)' }}>{act.action}</span>
              </div>

              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={11} /> {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
