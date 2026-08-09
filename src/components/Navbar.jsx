import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import CompetitionTimer from './CompetitionTimer';
import UserGuideModal from './UserGuideModal';
import { Globe, Users, Shield, Cpu, ExternalLink, BookOpen } from 'lucide-react';

export default function Navbar() {
  const { activeStation, setStation, lang, toggleLanguage, t } = useWarRoom();
  const [showGuide, setShowGuide] = useState(false);

  const isAr = lang === 'ar';

  return (
    <>
      <nav 
        className="glass-panel"
        style={{
          margin: '16px 20px 0 20px',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          borderRadius: '16px',
          borderBottom: '1px solid var(--border-cyan)'
        }}
      >
        {/* Brand & Title */}
        <div 
          onClick={() => setStation('station_select')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00F0FF, #7000FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)',
            overflow: 'hidden',
            padding: '2px'
          }}>
            <img 
              src="/assets/NEXTAURA.png" 
              alt="NextAura" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => { e.target.src = '/assets/NEXTAURA.jpg'; }}
            />
          </div>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '-0.02em' }}>
              {t.brand} <span className="gradient-text-cyan">{t.warRoomTitle}</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {t.ieeeSubtitle}
            </span>
          </div>
        </div>

        {/* Station Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setStation('team_hq')}
            className={`btn-secondary ${activeStation === 'team_hq' ? 'active' : ''}`}
            style={{
              fontSize: '0.85rem',
              padding: '8px 14px',
              borderColor: activeStation === 'team_hq' ? 'var(--accent-purple)' : undefined,
              color: activeStation === 'team_hq' ? 'var(--accent-purple)' : undefined
            }}
          >
            <Users size={15} /> {t.teamHq}
          </button>

          <button
            onClick={() => setStation('mohannad')}
            className={`btn-secondary ${activeStation === 'mohannad' ? 'active' : ''}`}
            style={{
              fontSize: '0.85rem',
              padding: '8px 14px',
              borderColor: activeStation === 'mohannad' ? 'var(--accent-cyan)' : undefined,
              color: activeStation === 'mohannad' ? 'var(--accent-cyan)' : undefined
            }}
          >
            <Cpu size={15} /> 👑 Mohannad
          </button>

          <button
            onClick={() => setStation('moayad')}
            className={`btn-secondary ${activeStation === 'moayad' ? 'active' : ''}`}
            style={{
              fontSize: '0.85rem',
              padding: '8px 14px',
              borderColor: activeStation === 'moayad' ? 'var(--accent-green)' : undefined,
              color: activeStation === 'moayad' ? 'var(--accent-green)' : undefined
            }}
          >
            📊 Moayad
          </button>

          <button
            onClick={() => setStation('dyaa')}
            className={`btn-secondary ${activeStation === 'dyaa' ? 'active' : ''}`}
            style={{
              fontSize: '0.85rem',
              padding: '8px 14px',
              borderColor: activeStation === 'dyaa' ? 'var(--accent-amber)' : undefined,
              color: activeStation === 'dyaa' ? 'var(--accent-amber)' : undefined
            }}
          >
            <Shield size={15} /> 🛡️ Dyaa
          </button>
        </div>

        {/* Competition Timer & Guide & Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CompetitionTimer />

          {/* User Guide Button */}
          <button
            onClick={() => setShowGuide(true)}
            className="btn-secondary"
            style={{
              padding: '8px 12px',
              fontSize: '0.82rem',
              borderColor: 'var(--accent-cyan)',
              color: 'var(--accent-cyan)'
            }}
          >
            <BookOpen size={15} /> {isAr ? '📖 دليل الاستخدام' : '📖 User Guide'}
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="btn-secondary"
            style={{
              padding: '8px 12px',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Globe size={15} color="var(--accent-cyan)" />
            <span>{isAr ? '🇬🇧 English' : '🇸🇦 العربية'}</span>
          </button>
        </div>
      </nav>

      {/* Guide Modal */}
      <UserGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </>
  );
}
