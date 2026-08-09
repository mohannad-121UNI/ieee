import React from 'react';
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

function AppContent() {
  const { activeStation, notifications } = useWarRoom();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Toast Notifications Overlay */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px'
      }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            className="glass-panel animate-pulse-glow"
            style={{
              padding: '14px 18px',
              borderLeft: `4px solid ${
                n.type === 'success' ? 'var(--accent-green)' :
                n.type === 'error' ? 'var(--accent-red)' : 'var(--accent-cyan)'
              }`,
              background: 'rgba(10, 15, 29, 0.95)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {n.title}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {n.message}
            </p>
          </div>
        ))}
      </div>

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
