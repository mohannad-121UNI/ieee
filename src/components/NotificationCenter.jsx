import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { requestBrowserPermission } from '../services/realtimeSync';
import { Bell, Check, X, ShieldAlert, Award, Clock, Smartphone } from 'lucide-react';

export default function NotificationCenter() {
  const { notifications, lang, t } = useWarRoom();
  const isAr = lang === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [browserPermGranted, setBrowserPermGranted] = useState(() => 
    typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted'
  );

  const handleEnableDesktop = async () => {
    const granted = await requestBrowserPermission();
    setBrowserPermGranted(granted);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary"
        style={{
          padding: '8px 12px',
          fontSize: '0.82rem',
          position: 'relative',
          borderColor: notifications.length > 0 ? 'var(--accent-cyan)' : undefined
        }}
        title="Notification Center"
      >
        <Bell size={16} color={notifications.length > 0 ? 'var(--accent-cyan)' : 'var(--text-main)'} className={notifications.length > 0 ? 'animate-pulse-glow' : ''} />
        {notifications.length > 0 && (
          <span 
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: 'var(--accent-cyan)',
              color: '#060911',
              borderRadius: '999px',
              fontSize: '0.65rem',
              fontWeight: '900',
              padding: '2px 6px',
              boxShadow: '0 0 10px rgba(0, 240, 255, 0.8)'
            }}
          >
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: '46px',
            right: isAr ? 'auto' : '0',
            left: isAr ? '0' : 'auto',
            width: '340px',
            maxHeight: '480px',
            zIndex: 9999,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
            border: '1px solid var(--border-cyan)'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Bell size={16} color="var(--accent-cyan)" /> {isAr ? 'مركز الإشعارات اللحظية' : 'Realtime Notification Center'}
            </h4>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>

          {/* Desktop Notification Enable Banner */}
          {!browserPermGranted && (
            <button
              onClick={handleEnableDesktop}
              className="btn-secondary"
              style={{
                fontSize: '0.78rem',
                padding: '8px 12px',
                borderColor: 'var(--accent-cyan)',
                color: 'var(--accent-cyan)',
                background: 'rgba(0, 240, 255, 0.08)',
                textAlign: 'center'
              }}
            >
              <Smartphone size={14} /> {isAr ? 'تفعيل إشعارات سطح المكتب (Desktop)' : 'Enable Desktop Notifications'}
            </button>
          )}

          {/* Notifications List */}
          <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '340px' }}>
            {notifications.length === 0 ? (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
                {isAr ? 'لا توجد إشعارات سابقة.' : 'No new notifications.'}
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'rgba(21, 31, 54, 0.6)',
                    borderLeft: `3px solid ${
                      n.type === 'success' ? 'var(--accent-green)' :
                      n.type === 'error' ? 'var(--accent-red)' : 'var(--accent-cyan)'
                    }`
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    {n.title}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.4' }}>
                    {n.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
