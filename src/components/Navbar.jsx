import React from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { MEMBER_CONFIG } from '../config/aiTools';
import { Zap, RefreshCw, Languages } from 'lucide-react';
import CompetitionTimer from './CompetitionTimer';

export default function Navbar() {
  const { activeStation, changeStation, lang, setLang, t } = useWarRoom();

  const currentMember = MEMBER_CONFIG[activeStation] || MEMBER_CONFIG.team_hq;

  return (
    <header style={{
      background: 'rgba(10, 15, 29, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-glass)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand / Logo */}
        <div 
          onClick={() => changeStation('team_hq')} 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '900', fontFamily: 'var(--font-heading)' }}>
                {t.brand}
              </span>
              <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{t.ieeeSubtitle}</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {t.warRoomTitle}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          <button
            onClick={() => changeStation('team_hq')}
            className="btn-secondary"
            style={{
              fontSize: '0.85rem',
              padding: '8px 14px',
              borderColor: activeStation === 'team_hq' ? 'var(--accent-purple)' : undefined,
              color: activeStation === 'team_hq' ? 'var(--accent-purple)' : undefined,
              background: activeStation === 'team_hq' ? 'rgba(168, 85, 247, 0.12)' : undefined
            }}
          >
            <Zap size={15} /> {t.teamHq}
          </button>

          <button
            onClick={() => changeStation('mohannad')}
            className="btn-secondary"
            style={{
              fontSize: '0.85rem',
              padding: '8px 14px',
              borderColor: activeStation === 'mohannad' ? 'var(--accent-cyan)' : undefined,
              color: activeStation === 'mohannad' ? 'var(--accent-cyan)' : undefined,
              background: activeStation === 'mohannad' ? 'rgba(0, 240, 255, 0.12)' : undefined
            }}
          >
            👑 Mohannad
          </button>

          <button
            onClick={() => changeStation('moayad')}
            className="btn-secondary"
            style={{
              fontSize: '0.85rem',
              padding: '8px 14px',
              borderColor: activeStation === 'moayad' ? 'var(--accent-green)' : undefined,
              color: activeStation === 'moayad' ? 'var(--accent-green)' : undefined,
              background: activeStation === 'moayad' ? 'rgba(16, 185, 129, 0.12)' : undefined
            }}
          >
            📊 Moayad
          </button>

          <button
            onClick={() => changeStation('dyaa')}
            className="btn-secondary"
            style={{
              fontSize: '0.85rem',
              padding: '8px 14px',
              borderColor: activeStation === 'dyaa' ? 'var(--accent-amber)' : undefined,
              color: activeStation === 'dyaa' ? 'var(--accent-amber)' : undefined,
              background: activeStation === 'dyaa' ? 'rgba(245, 158, 11, 0.12)' : undefined
            }}
          >
            🛡️ Dyaa
          </button>
        </nav>

        {/* Right Info & Language Switcher Widgets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Language Selector Button */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.85rem', borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
            title="Toggle Arabic / English Translation"
          >
            <Languages size={15} /> {lang === 'en' ? '🇸🇦 العربية' : '🇬🇧 English'}
          </button>

          <CompetitionTimer />

          {/* Active Station Widget */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{
                background: 'rgba(21, 31, 54, 0.9)',
                border: '1px solid var(--border-glass)',
                borderRadius: '12px',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: `2px solid ${currentMember.color || 'var(--accent-cyan)'}`
              }}>
                <img 
                  src={currentMember.image} 
                  alt={currentMember.name} 
                  className="avatar-img"
                  onError={(e) => { e.target.src = currentMember.fallbackImage; }}
                />
              </div>
              <div style={{ lineHeight: '1.2' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.activeStation}</p>
                <p style={{ fontSize: '0.85rem', fontWeight: '700', color: currentMember.color || 'var(--accent-cyan)' }}>
                  {currentMember.name}
                </p>
              </div>
            </div>

            <button
              onClick={() => changeStation('station_select')}
              className="btn-secondary"
              style={{ padding: '8px 12px', fontSize: '0.8rem' }}
              title="Switch Station"
            >
              <RefreshCw size={14} /> {t.switchStation}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
