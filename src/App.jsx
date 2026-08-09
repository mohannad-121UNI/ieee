import React, { useState, useEffect } from 'react';
import { WarRoomProvider, useWarRoom } from './context/WarRoomContext';
import Navbar from './components/Navbar';
import StationSelector from './components/StationSelector';
import TeamHQPage from './pages/TeamHQPage';
import MohannadPage from './pages/MohannadPage';
import MoayadPage from './pages/MoayadPage';
import DyaaPage from './pages/DyaaPage';
import PipelineVisualizer from './components/PipelineVisualizer';
import AIChatModal from './components/AIChatModal';
import BestCvModal from './components/BestCvModal';

function ToastContainer() {
  const { notifications } = useWarRoom();
  const [activeToasts, setActiveToasts] = useState([]);

  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[0]; // Most recent notification
      setActiveToasts(prev => {
        if (prev.some(t => t.id === latest.id)) return prev;
        return [latest, ...prev].slice(0, 2); // Max 2 visible toasts
      });

      // Auto-dismiss after 3.5 seconds
      const timer = setTimeout(() => {
        setActiveToasts(prev => prev.filter(t => t.id !== latest.id));
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '360px',
      pointerEvents: 'none'
    }}>
      {activeToasts.map((n) => (
        <div
          key={n.id}
          className="glass-panel animate-pulse-glow"
          style={{
            padding: '12px 16px',
            borderLeft: `4px solid ${
              n.type === 'success' ? 'var(--accent-green)' :
              n.type === 'error' ? 'var(--accent-red)' : 'var(--accent-cyan)'
            }`,
            background: 'rgba(10, 15, 29, 0.95)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            borderRadius: '12px',
            pointerEvents: 'auto'
          }}
        >
          <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)' }}>
            {n.title}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.4' }}>
            {n.message}
          </p>
        </div>
      ))}
    </div>
  );
}

function AppContent() {
  const { activeStation } = useWarRoom();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Toast Notifications Overlay (Auto-dismisses in 3 seconds, max 2 toasts) */}
      <ToastContainer />

      {/* Main Page Router */}
      {activeStation === 'station_select' ? (
        <StationSelector />
      ) : (
        <>
          <Navbar />
          <main style={{ flexGrow: 1 }}>
            {activeStation === 'pipeline' && <PipelineVisualizer />}
            {activeStation === 'team_hq' && <TeamHQPage />}
            {activeStation === 'mohannad' && <MohannadPage />}
            {activeStation === 'moayad' && <MoayadPage />}
            {activeStation === 'dyaa' && <DyaaPage />}
          </main>
        </>
      )}

      {/* Floating Interactive Live AI Chat Modal */}
      <AIChatModal />

      {/* New Best CV Event Modal */}
      <BestCvModal />
    </div>
  );
}

export default function App() {
  return (
    <WarRoomProvider>
      <AppContent />
    </WarRoomProvider>
  );
}
