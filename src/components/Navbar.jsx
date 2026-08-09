import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import CompetitionTimer from './CompetitionTimer';
import UserGuideModal from './UserGuideModal';
import NotificationCenter from './NotificationCenter';
import { Globe, Users, Shield, Cpu, Compass, BookOpen, Volume2, VolumeX, RotateCcw, AlertTriangle } from 'lucide-react';

export default function Navbar() {
  const { activeStation, setStation, lang, toggleLanguage, soundEnabled, toggleSound, resetAllData, t } = useWarRoom();
  const [showGuide, setShowGuide] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const isAr = lang === 'ar';

  const handleConfirmReset = () => {
    resetAllData();
    setShowResetConfirm(false);
  };

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
            onClick={() => setStation('pipeline')}
            className={`btn-secondary ${activeStation === 'pipeline' ? 'active' : ''}`}
            style={{
              fontSize: '0.85rem',
              padding: '8px 14px',
              borderColor: activeStation === 'pipeline' ? 'var(--accent-cyan)' : undefined,
              color: activeStation === 'pipeline' ? 'var(--accent-cyan)' : undefined,
              background: activeStation === 'pipeline' ? 'rgba(0, 240, 255, 0.12)' : undefined
            }}
          >
            <Compass size={15} className="animate-pulse-glow" /> {isAr ? '🗺️ خريطة الـ GPS (38 خطوة)' : '🗺️ Pipeline GPS'}
          </button>

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

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CompetitionTimer />
          <NotificationCenter />

          {/* Reset All Data Button */}
          <button
            onClick={() => setShowResetConfirm(true)}
            className="btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.82rem', borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}
            title={isAr ? 'تصفير كل البيانات للبدء من جديد' : 'Reset all test data & start fresh'}
          >
            <RotateCcw size={15} /> {isAr ? '🔄 تصفير البيانات' : '🔄 Reset All'}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="btn-secondary"
            style={{ padding: '8px', fontSize: '0.82rem', borderColor: soundEnabled ? 'var(--accent-green)' : undefined }}
            title={soundEnabled ? 'Sound ON' : 'Sound OFF'}
          >
            {soundEnabled ? <Volume2 size={16} color="var(--accent-green)" /> : <VolumeX size={16} color="var(--text-dim)" />}
          </button>

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
            <BookOpen size={15} /> {isAr ? '📖 الدليل' : '📖 Guide'}
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

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay" style={{ zIndex: 10010 }}>
          <div className="modal-content glass-panel" style={{ maxWidth: '460px', padding: '24px', textAlign: 'center', borderTop: '4px solid var(--accent-red)' }}>
            <AlertTriangle size={36} color="var(--accent-red)" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent-red)', marginBottom: '8px' }}>
              {isAr ? '🔄 هل أنت تأكد من تصفير كافة البيانات؟' : '🔄 Confirm Complete Reset?'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
              {isAr 
                ? 'سيتم مسح كافة التجارب الاختيارية، وتصفير نسبة الإنجاز والخطوات والعداد والبدء من الصفر تماماً (0%).'
                : 'This will wipe all test steps, experiments, blockers, notifications, and reset progress to 0%.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button onClick={() => setShowResetConfirm(false)} className="btn-secondary">{t.cancel}</button>
              <button onClick={handleConfirmReset} className="btn-primary" style={{ background: 'var(--accent-red)' }}>
                {isAr ? 'نعم، تصفير الآن (0%)' : 'Yes, Reset All to 0%'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      <UserGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </>
  );
}
