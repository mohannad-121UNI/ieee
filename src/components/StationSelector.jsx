import React from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { Crown, Database, Shield, Zap, ArrowRight, Languages } from 'lucide-react';

export default function StationSelector() {
  const { changeStation, tasks, lang, setLang, t } = useWarRoom();

  const getMemberProgress = (memberId) => {
    const memberTasks = tasks.filter(t => t.memberId === memberId);
    if (!memberTasks.length) return 0;
    const completed = memberTasks.filter(t => t.completed).length;
    return Math.round((completed / memberTasks.length) * 100);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      position: 'relative'
    }}>
      {/* Top Language Toggle */}
      <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '0.85rem', borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
        >
          <Languages size={16} /> {lang === 'en' ? '🇸🇦 العربية' : '🇬🇧 English'}
        </button>
      </div>

      {/* Header Title Section */}
      <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '999px',
          background: 'rgba(0, 240, 255, 0.1)',
          border: '1px solid var(--border-cyan)',
          marginBottom: '16px'
        }}>
          <Zap size={16} color="var(--accent-cyan)" />
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
            {t.ieeeSubtitle}
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '900',
          lineHeight: '1.15',
          marginBottom: '16px'
        }}>
          ⚡ NextAura AI <span className="gradient-text-cyan">{lang === 'ar' ? 'غرفة العمليات' : 'War Room'}</span> 🧠🏆
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-muted)',
          fontWeight: '500'
        }}>
          {t.chooseStation}
        </p>
      </div>

      {/* Grid of 4 Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '1300px'
      }}>
        {/* CARD 1 — MOHANNAD */}
        <div 
          className="glass-panel glass-panel-interactive"
          style={{
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '4px solid var(--accent-cyan)'
          }}
        >
          <div className="avatar-frame avatar-frame-cyan" style={{ width: '110px', height: '110px', marginBottom: '20px' }}>
            <img 
              src="/assets/mohannad.jpg" 
              alt="Mohannad" 
              className="avatar-img"
              onError={(e) => { e.target.src = '/assets/mohannad.png'; }}
            />
          </div>

          <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>
            <Crown size={12} /> {t.mohannadRole}
          </span>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Mohannad</h2>

          <div style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            marginBottom: '20px',
            flexGrow: 1
          }}>
            <p style={{ color: 'var(--text-main)', fontWeight: '600' }}>👑 Mohannad — Team Leader</p>
            <p>🧠 Modeling & Strategy</p>
            <p>🎯 Integration & Final Decisions</p>
          </div>

          {/* Progress Pill */}
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>{t.tasksProgress}</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: '700' }}>{getMemberProgress('mohannad')}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill progress-bar-cyan" style={{ width: `${getMemberProgress('mohannad')}%` }}></div>
            </div>
          </div>

          <button
            onClick={() => changeStation('mohannad')}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {t.enterCommand}
          </button>
        </div>

        {/* CARD 2 — MOAYAD */}
        <div 
          className="glass-panel glass-panel-interactive"
          style={{
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '4px solid var(--accent-green)'
          }}
        >
          <div className="avatar-frame avatar-frame-green" style={{ width: '110px', height: '110px', marginBottom: '20px' }}>
            <img 
              src="/assets/moayad.jpg" 
              alt="Moayad" 
              className="avatar-img"
              onError={(e) => { e.target.src = '/assets/moayad.png'; }}
            />
          </div>

          <span className="badge badge-green" style={{ marginBottom: '12px' }}>
            <Database size={12} /> {t.moayadRole}
          </span>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Moayad</h2>

          <div style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            marginBottom: '20px',
            flexGrow: 1
          }}>
            <p style={{ color: 'var(--text-main)', fontWeight: '600' }}>📊 Data Intelligence</p>
            <p>🔍 EDA & Leakage Audit</p>
            <p>🧩 Feature Engineering</p>
          </div>

          {/* Progress Pill */}
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>{t.tasksProgress}</span>
              <span style={{ color: 'var(--accent-green)', fontWeight: '700' }}>{getMemberProgress('moayad')}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill progress-bar-green" style={{ width: `${getMemberProgress('moayad')}%` }}></div>
            </div>
          </div>

          <button
            onClick={() => changeStation('moayad')}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
            }}
          >
            {t.enterDataLab}
          </button>
        </div>

        {/* CARD 3 — DYAA */}
        <div 
          className="glass-panel glass-panel-interactive"
          style={{
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '4px solid var(--accent-amber)'
          }}
        >
          <div className="avatar-frame avatar-frame-amber" style={{ width: '110px', height: '110px', marginBottom: '20px' }}>
            <img 
              src="/assets/dyaa.png" 
              alt="Dyaa" 
              className="avatar-img"
              onError={(e) => { e.target.src = '/assets/dyaa.jpg'; }}
            />
          </div>

          <span className="badge badge-amber" style={{ marginBottom: '12px' }}>
            <Shield size={12} /> {t.dyaaRole}
          </span>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Dyaa</h2>

          <div style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            marginBottom: '20px',
            flexGrow: 1
          }}>
            <p style={{ color: 'var(--text-main)', fontWeight: '600' }}>🛡️ Red Team</p>
            <p>✅ Quality Assurance</p>
            <p>🧪 Alternative Solutions</p>
          </div>

          {/* Progress Pill */}
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>{t.tasksProgress}</span>
              <span style={{ color: 'var(--accent-amber)', fontWeight: '700' }}>{getMemberProgress('dyaa')}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill progress-bar-amber" style={{ width: `${getMemberProgress('dyaa')}%` }}></div>
            </div>
          </div>

          <button
            onClick={() => changeStation('dyaa')}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)'
            }}
          >
            {t.enterRedTeam}
          </button>
        </div>

        {/* CARD 4 — TEAM HQ */}
        <div 
          className="glass-panel glass-panel-interactive"
          style={{
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '4px solid var(--accent-purple)'
          }}
        >
          <div 
            className="avatar-frame avatar-frame-purple" 
            style={{ width: '110px', height: '110px', marginBottom: '20px', background: 'rgba(168, 85, 247, 0.2)', padding: '12px' }}
          >
            <img 
              src="/assets/NEXTAURA.png" 
              alt="NextAura Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => { e.target.src = '/assets/NEXTAURA.jpg'; }}
            />
          </div>

          <span className="badge badge-purple" style={{ marginBottom: '12px' }}>
            <Zap size={12} /> Command Center
          </span>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>TEAM HQ</h2>

          <div style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            marginBottom: '20px',
            flexGrow: 1
          }}>
            <p style={{ color: 'var(--text-main)', fontWeight: '600' }}>⚡ NextAura AI Command Center</p>
            <p style={{ fontStyle: 'italic', marginTop: '6px' }}>"{t.teamHqSub}"</p>
          </div>

          <button
            onClick={() => changeStation('team_hq')}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #8A2BE2 0%, #00F0FF 100%)',
              boxShadow: '0 4px 14px rgba(168, 85, 247, 0.4)'
            }}
          >
            {t.openWarRoom}
          </button>
        </div>
      </div>
    </div>
  );
}
