import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { PIPELINE_PHASES } from '../config/guidedPipelineData';
import { Compass, CheckCircle, Lock, Play, AlertOctagon, ArrowDown, ChevronRight, ChevronDown, Filter, Zap, Shield, Cpu, Users } from 'lucide-react';

export default function PipelineVisualizer() {
  const { guidedSteps, completeStep, lang, t } = useWarRoom();
  const isAr = lang === 'ar';

  const [selectedMember, setSelectedMember] = useState('all');
  const [expandedPhase, setExpandedPhase] = useState(null);

  const filteredSteps = guidedSteps.filter(s => {
    if (selectedMember === 'all') return true;
    return s.owner === selectedMember || s.owner === 'both';
  });

  const totalDone = guidedSteps.filter(s => s.status === 'DONE').length;
  const overallPct = Math.round((totalDone / guidedSteps.length) * 100);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(16, 23, 42, 0.95), rgba(21, 31, 54, 0.85))',
          borderTop: '4px solid var(--accent-cyan)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #00F0FF, #7000FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)'
          }}>
            <Compass size={32} color="#060911" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '900' }}>
              🧭 {isAr ? 'خريطة بروتوكول المسابقة الموجه (38 خطوة)' : 'GUIDED COMPETITION PIPELINE GPS'}
            </h1>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {isAr 
                ? '"من قراءة البيانات إلى التسليم النهائي — خطوة بخطوة بكل دقة"'
                : '"From Dataset → Final Submission — One Exact Step at a Time"'}
            </p>
          </div>
        </div>

        {/* Member Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Filter size={14} /> Filter:
          </span>
          <button
            onClick={() => setSelectedMember('all')}
            className={`btn-secondary ${selectedMember === 'all' ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            All Members
          </button>
          <button
            onClick={() => setSelectedMember('mohannad')}
            className={`btn-secondary ${selectedMember === 'mohannad' ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', padding: '6px 12px', borderColor: selectedMember === 'mohannad' ? 'var(--accent-cyan)' : undefined }}
          >
            👑 Mohannad
          </button>
          <button
            onClick={() => setSelectedMember('moayad')}
            className={`btn-secondary ${selectedMember === 'moayad' ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', padding: '6px 12px', borderColor: selectedMember === 'moayad' ? 'var(--accent-green)' : undefined }}
          >
            📊 Moayad
          </button>
          <button
            onClick={() => setSelectedMember('dyaa')}
            className={`btn-secondary ${selectedMember === 'dyaa' ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', padding: '6px 12px', borderColor: selectedMember === 'dyaa' ? 'var(--accent-amber)' : undefined }}
          >
            🛡️ Dyaa
          </button>
        </div>
      </div>

      {/* Progress Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PIPELINE PROGRESS</span>
          <p style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
            {overallPct}%
          </p>
        </div>
        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>COMPLETED STEPS</span>
          <p style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
            {totalDone} / {guidedSteps.length}
          </p>
        </div>
        <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CRITICAL GATES PASSED</span>
          <p style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)' }}>
            {guidedSteps.filter(s => (s.type === 'review' || s.type === 'blocking') && s.status === 'DONE').length} / 8
          </p>
        </div>
      </div>

      {/* 13 PHASES ACCORDION & STEP TREES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {PIPELINE_PHASES.map((phase) => {
          const phaseSteps = filteredSteps.filter(s => s.phase === phase.id);
          if (phaseSteps.length === 0) return null;

          const phaseDoneCount = phaseSteps.filter(s => s.status === 'DONE').length;
          const phasePct = Math.round((phaseDoneCount / phaseSteps.length) * 100);
          const isExpanded = expandedPhase === phase.id || phasePct < 100;

          return (
            <div 
              key={phase.id}
              className="glass-panel"
              style={{
                padding: '20px',
                borderLeft: `4px solid ${phase.color}`
              }}
            >
              {/* Phase Header */}
              <div 
                onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', flexWrap: 'wrap', gap: '12px' }}
              >
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)' }}>
                    {isAr ? phase.titleAr : phase.titleEn}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {phaseDoneCount} / {phaseSteps.length} steps completed
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '120px' }}>
                    <div className="progress-bar-bg" style={{ height: '6px' }}>
                      <div className="progress-bar-fill" style={{ width: `${phasePct}%`, background: phase.color }}></div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: phase.color }}>
                    {phasePct}%
                  </span>
                  {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
              </div>

              {/* Steps List for Phase */}
              {isExpanded && (
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {phaseSteps.map((step, idx) => (
                    <React.Fragment key={step.id}>
                      <div
                        style={{
                          background: step.status === 'DONE' ? 'rgba(16, 185, 129, 0.06)' :
                                      step.status === 'READY' || step.status === 'IN_PROGRESS' ? 'rgba(0, 240, 255, 0.08)' :
                                      step.status === 'BLOCKED' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(21, 31, 54, 0.4)',
                          border: `1px solid ${
                            step.status === 'DONE' ? 'rgba(16, 185, 129, 0.3)' :
                            step.status === 'READY' || step.status === 'IN_PROGRESS' ? 'var(--accent-cyan)' :
                            step.status === 'BLOCKED' ? 'var(--accent-red)' : 'var(--border-glass)'
                          }`,
                          borderRadius: '12px',
                          padding: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '14px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexGrow: 1 }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: '900', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: '40px' }}>
                            #{step.id}
                          </span>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: step.status === 'DONE' ? 'var(--text-muted)' : 'var(--text-main)' }}>
                                {isAr ? step.titleAr : step.titleEn}
                              </h4>
                              <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                                {step.ownerRole}
                              </span>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                              {isAr ? step.guidanceAr : step.guidanceEn}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge & Action */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className={`badge ${
                            step.status === 'DONE' ? 'badge-green' :
                            step.status === 'READY' || step.status === 'IN_PROGRESS' ? 'badge-cyan animate-pulse-glow' :
                            step.status === 'BLOCKED' ? 'badge-red' : 'badge-amber'
                          }`} style={{ fontSize: '0.7rem' }}>
                            {step.status === 'DONE' ? '✅ DONE' :
                             step.status === 'READY' ? '🔵 READY' :
                             step.status === 'IN_PROGRESS' ? '🔵 IN PROGRESS' :
                             step.status === 'BLOCKED' ? '🚨 BLOCKED' : '🔒 LOCKED'}
                          </span>

                          {(step.status === 'READY' || step.status === 'IN_PROGRESS') && (
                            <button
                              onClick={() => completeStep(step.id, step.ownerRole)}
                              className="btn-primary"
                              style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                            >
                              <CheckCircle size={14} /> Complete
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Animated Arrow Connector */}
                      {idx < phaseSteps.length - 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '-4px 0' }}>
                          <ArrowDown size={16} color="var(--accent-cyan)" className="animate-pulse-glow" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
