import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import ExperimentTable from '../components/ExperimentTable';
import ScoreTrackerChart from '../components/ScoreTrackerChart';
import SubmissionTracker from '../components/SubmissionTracker';
import BlockerCenter from '../components/BlockerCenter';
import QuickNotes from '../components/QuickNotes';
import ActivityFeed from '../components/ActivityFeed';
import AIAnalystPanel from '../components/AIAnalystPanel';
import FinalSubmissionModal from '../components/FinalSubmissionModal';
import GoldenRules from '../components/GoldenRules';
import TeamWorkflow from '../components/TeamWorkflow';
import { AI_TOOLS } from '../config/aiTools';
import { Zap, Award, Edit3, Save, ExternalLink } from 'lucide-react';

export default function TeamHQPage() {
  const { competition, updateCompetition, tasks, experiments, submissions, blockers, lang, t } = useWarRoom();
  const [showFinalModal, setShowFinalModal] = useState(false);

  const [isEditingMission, setIsEditingMission] = useState(false);
  const [tempObj, setTempObj] = useState(competition.currentObjective);
  const [tempNext, setTempNext] = useState(competition.nextAction);

  // Calculate task progress per member
  const mohTasks = tasks.filter(tItem => tItem.memberId === 'mohannad');
  const moaTasks = tasks.filter(tItem => tItem.memberId === 'moayad');
  const dyaTasks = tasks.filter(tItem => tItem.memberId === 'dyaa');

  const mohPct = mohTasks.length ? Math.round((mohTasks.filter(tItem => tItem.completed).length / mohTasks.length) * 100) : 0;
  const moaPct = moaTasks.length ? Math.round((moaTasks.filter(tItem => tItem.completed).length / moaTasks.length) * 100) : 0;
  const dyaPct = dyaTasks.length ? Math.round((dyaTasks.filter(tItem => tItem.completed).length / dyaTasks.length) * 100) : 0;
  const overallPct = tasks.length ? Math.round((tasks.filter(tItem => tItem.completed).length / tasks.length) * 100) : 0;

  // Best scores
  const bestCvExp = [...experiments].sort((a, b) => (b.cvScore || 0) - (a.cvScore || 0))[0];
  const bestLbExp = [...experiments].filter(e => e.lbScore).sort((a, b) => (b.lbScore || 0) - (a.lbScore || 0))[0];
  const activeBlockers = blockers.filter(b => !b.resolved);

  const handleSaveMission = () => {
    updateCompetition({ currentObjective: tempObj, nextAction: tempNext });
    setIsEditingMission(false);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '32px',
          background: 'linear-gradient(135deg, rgba(16, 23, 42, 0.9), rgba(21, 31, 54, 0.8))',
          borderTop: '4px solid var(--accent-purple)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '75px',
            height: '75px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #00F0FF, #7000FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.5)',
            overflow: 'hidden',
            padding: '4px'
          }}>
            <img 
              src="/assets/NEXTAURA.png" 
              alt="NextAura" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => { e.target.src = '/assets/NEXTAURA.jpg'; }}
            />
          </div>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '900' }}>
              {t.brand} <span className="gradient-text-cyan">{lang === 'ar' ? 'غرفة عمليات المسابقة' : 'Competition War Room'}</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              👑 Mohannad + 📊 Moayad + 🛡️ Dyaa — <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>"{t.teamHqSub}"</span>
            </p>
          </div>
        </div>

        {/* Enter Final Submission Mode Button */}
        <button
          onClick={() => setShowFinalModal(true)}
          className="btn-primary"
          style={{
            padding: '14px 28px',
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #8A2BE2 0%, #00F0FF 100%)',
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)'
          }}
        >
          <Award size={20} /> {t.finalSubMode}
        </button>
      </div>

      {/* TOP TEAM DASHBOARD METRICS BAR */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.bestCv}</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
            {bestCvExp ? bestCvExp.cvScore : 'N/A'}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.bestLb}</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)' }}>
            {bestLbExp ? bestLbExp.lbScore : 'N/A'}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.expLogged}</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
            {experiments.length}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.subsUsed}</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '900', color: submissions.length >= 8 ? 'var(--accent-red)' : 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
            {submissions.length} / {competition.submissionLimit || 10}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.tasksCompleted}</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
            {overallPct}%
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center', borderColor: activeBlockers.length ? 'var(--accent-red)' : undefined }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.activeBlockers}</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '900', color: activeBlockers.length ? 'var(--accent-red)' : 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
            {activeBlockers.length}
          </p>
        </div>
      </div>

      {/* TEAM PROGRESS BARS */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={20} color="var(--accent-cyan)" /> {t.realtimeProgress}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span>👑 Mohannad ({lang === 'ar' ? 'البناء والتحليل' : 'Modeling & Strategy'})</span>
              <span style={{ fontWeight: '700', color: 'var(--accent-cyan)' }}>{mohPct}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill progress-bar-cyan" style={{ width: `${mohPct}%` }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span>📊 Moayad ({lang === 'ar' ? 'استخبارات البيانات' : 'Data & Features'})</span>
              <span style={{ fontWeight: '700', color: 'var(--accent-green)' }}>{moaPct}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill progress-bar-green" style={{ width: `${moaPct}%` }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span>🛡️ Dyaa ({lang === 'ar' ? 'الفريق الأحمر وضبط الجودة' : 'Red Team QA'})</span>
              <span style={{ fontWeight: '700', color: 'var(--accent-amber)' }}>{dyaPct}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill progress-bar-amber" style={{ width: `${dyaPct}%` }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span style={{ fontWeight: '700' }}>{t.overallProgress}</span>
              <span style={{ fontWeight: '800', color: 'var(--accent-purple)' }}>{overallPct}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill progress-bar-purple" style={{ width: `${overallPct}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* CURRENT TEAM MISSION & NEXT ACTION CARD */}
      <div 
        className="glass-panel"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.06), rgba(168, 85, 247, 0.06))',
          border: '1px solid var(--border-cyan)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {t.teamMission}
          </h3>
          {!isEditingMission ? (
            <button onClick={() => setIsEditingMission(true)} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
              <Edit3 size={12} /> {t.editMission}
            </button>
          ) : (
            <button onClick={handleSaveMission} className="btn-primary" style={{ padding: '4px 12px', fontSize: '0.78rem' }}>
              <Save size={12} /> {t.save}
            </button>
          )}
        </div>

        {isEditingMission ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>OBJECTIVE:</label>
              <input type="text" value={tempObj} onChange={e => setTempObj(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>NEXT ACTION:</label>
              <input type="text" value={tempNext} onChange={e => setTempNext(e.target.value)} />
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)' }}>
              "{competition.currentObjective}"
            </p>
            <p style={{ fontSize: '0.92rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <strong>{t.nextAction}:</strong> {competition.nextAction}
            </p>
          </div>
        )}
      </div>

      {/* QUICK AI LAUNCH BAR */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {t.quickAiLaunch}
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {Object.keys(AI_TOOLS).map((key) => {
            const tool = AI_TOOLS[key];
            return (
              <a
                key={key}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.85rem', borderColor: `${tool.color}40`, color: tool.color }}
              >
                <span>{tool.icon}</span> {tool.name} <ExternalLink size={13} />
              </a>
            );
          })}
        </div>
      </div>

      {/* EXPERIMENT TRACKER & SCORE TRACKER */}
      <ExperimentTable />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <ScoreTrackerChart />
        <SubmissionTracker />
      </div>

      {/* BLOCKER CENTER & NOTES & ACTIVITY */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <BlockerCenter />
        <QuickNotes />
      </div>

      {/* AI ANALYST PANEL */}
      <AIAnalystPanel />

      <ActivityFeed />
      <TeamWorkflow />
      <GoldenRules />

      <FinalSubmissionModal isOpen={showFinalModal} onClose={() => setShowFinalModal(false)} />
    </div>
  );
}
