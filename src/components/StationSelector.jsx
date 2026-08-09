import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import UserGuideModal from './UserGuideModal';
import { Globe, Users, Cpu, ShieldCheck, Database, Award, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';

export default function StationSelector() {
  const { setStation, lang, toggleLanguage, t } = useWarRoom();
  const [showGuide, setShowGuide] = useState(false);
  const isAr = lang === 'ar';

  const stations = [
    {
      id: 'team_hq',
      name: 'Team HQ & War Room',
      role: 'Unified Command Center',
      sub: t.teamHqSub,
      img: '/assets/NEXTAURA.png',
      fallbackImg: '/assets/NEXTAURA.jpg',
      color: 'var(--accent-purple)',
      btnText: t.openWarRoom,
      badge: 'COMMAND HQ'
    },
    {
      id: 'mohannad',
      name: 'Mohannad',
      role: t.mohannadRole,
      sub: t.mohannadSub,
      img: '/assets/mohannad.jpg',
      fallbackImg: '/assets/mohannad.png',
      color: 'var(--accent-cyan)',
      btnText: t.enterCommand,
      badge: 'LEADER'
    },
    {
      id: 'moayad',
      name: 'Moayad',
      role: t.moayadRole,
      sub: t.moayadSub,
      img: '/assets/moayad.jpg',
      fallbackImg: '/assets/moayad.png',
      color: 'var(--accent-green)',
      btnText: t.enterDataLab,
      badge: 'DATA OFFICER'
    },
    {
      id: 'dyaa',
      name: 'Dyaa',
      role: t.dyaaRole,
      sub: t.dyaaSub,
      img: '/assets/dyaa.jpg',
      fallbackImg: '/assets/dyaa.png',
      color: 'var(--accent-amber)',
      btnText: t.enterRedTeam,
      badge: 'RED TEAM QA'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative'
    }}>
      {/* Top Header Bar */}
      <div style={{
        position: 'absolute',
        top: '24px',
        right: isAr ? 'auto' : '24px',
        left: isAr ? '24px' : 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <button
          onClick={() => setShowGuide(true)}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '0.85rem', borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
        >
          <BookOpen size={16} /> {isAr ? '📖 دليل استخدام الموقع' : '📖 Step-by-Step User Guide'}
        </button>

        <button
          onClick={toggleLanguage}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
        >
          <Globe size={16} color="var(--accent-cyan)" /> {isAr ? '🇬🇧 English' : '🇸🇦 العربية'}
        </button>
      </div>

      {/* Main Title */}
      <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid var(--border-cyan)', marginBottom: '16px' }}>
          <Award size={16} color="var(--accent-cyan)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: '700' }}>IEEE COMPETITION WAR ROOM 2026</span>
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '12px' }}>
          {t.brand} <span className="gradient-text-cyan">{t.warRoomTitle}</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          {t.chooseStation}
        </p>
      </div>

      {/* Station Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '1280px'
      }}>
        {stations.map((st) => (
          <div
            key={st.id}
            className="glass-panel"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              borderTop: `4px solid ${st.color}`,
              transition: 'all 0.3s ease'
            }}
          >
            <span className="badge badge-cyan" style={{ position: 'absolute', top: '16px', right: isAr ? 'auto' : '16px', left: isAr ? '16px' : 'auto', fontSize: '0.65rem' }}>
              {st.badge}
            </span>

            <div>
              {/* Photo Box */}
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '24px',
                overflow: 'hidden',
                marginBottom: '20px',
                border: `2px solid ${st.color}`,
                boxShadow: `0 0 20px ${st.color}40`
              }}>
                <img 
                  src={st.img} 
                  alt={st.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = st.fallbackImg; }}
                />
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px' }}>
                {st.name}
              </h3>
              <p style={{ fontSize: '0.9rem', color: st.color, fontWeight: '700', marginBottom: '8px' }}>
                {st.role}
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '24px' }}>
                {st.sub}
              </p>
            </div>

            <button
              onClick={() => setStation(st.id)}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.9rem',
                background: `linear-gradient(135deg, ${st.color} 0%, #00F0FF 100%)`
              }}
            >
              {st.btnText}
            </button>
          </div>
        ))}
      </div>

      {/* Guide Modal */}
      <UserGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
}
