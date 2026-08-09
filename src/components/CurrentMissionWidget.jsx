import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import DatasetUploadModal from './DatasetUploadModal';
import { Compass, CheckCircle, Copy, Check, Lock, Play, AlertOctagon, ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Bot, Sparkles, Shield, Cpu, Users, Database, Upload } from 'lucide-react';

export default function CurrentMissionWidget({ filterMember = null }) {
  const { guidedSteps, completeStep, markStepBlocked, lang, t, addNotification } = useWarRoom();
  const isAr = lang === 'ar';

  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [blockedReasonInput, setBlockedReasonInput] = useState('');
  const [isBlockingModal, setIsBlockingModal] = useState(false);

  // Find active/ready step matching the filter or first ready step
  let currentStep = guidedSteps.find(s => s.status === 'READY' || s.status === 'IN_PROGRESS');

  if (filterMember && currentStep && currentStep.owner !== filterMember && currentStep.owner !== 'both') {
    // If current step is not for this member, find their next ready step
    const memberReady = guidedSteps.find(s => (s.status === 'READY' || s.status === 'IN_PROGRESS') && (s.owner === filterMember || s.owner === 'both'));
    if (memberReady) {
      currentStep = memberReady;
    }
  }

  if (!currentStep) {
    const nextLocked = guidedSteps.find(s => s.status === 'LOCKED');
    currentStep = nextLocked || guidedSteps[guidedSteps.length - 1];
  }

  const prevStep = guidedSteps.find(s => s.id === currentStep.id - 1);
  const nextStep = guidedSteps.find(s => s.id === currentStep.id + 1);

  const doneCount = guidedSteps.filter(s => s.status === 'DONE').length;
  const progressPct = Math.round((doneCount / guidedSteps.length) * 100);

  const handleCopyPrompt = () => {
    if (currentStep.aiPrompt) {
      navigator.clipboard.writeText(currentStep.aiPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      addNotification('Prompt Copied! 📋', 'AI Prompt copied to clipboard.', 'success');
    }
  };

  const handleDone = () => {
    completeStep(currentStep.id, currentStep.ownerRole);
  };

  const handleBlockSubmit = () => {
    if (!blockedReasonInput.trim()) return;
    markStepBlocked(currentStep.id, blockedReasonInput.trim(), currentStep.ownerRole);
    setBlockedReasonInput('');
    setIsBlockingModal(false);
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'sequential':
        return <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>🔵 {isAr ? 'خطوة تسلسلية (Sequential)' : 'Sequential Step'}</span>;
      case 'parallel':
        return <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>🟣 {isAr ? 'خطوة متوازية (Parallel)' : 'Parallel Step'}</span>;
      case 'review':
        return <span className="badge badge-amber" style={{ fontSize: '0.68rem' }}>🟠 {isAr ? 'بوابة مراجعة (Review Gate)' : 'Review Gate'}</span>;
      case 'blocking':
        return <span className="badge badge-red" style={{ fontSize: '0.68rem' }}>🔴 {isAr ? 'بوابة فحص قاطعة (Blocking Gate)' : 'Blocking Gate'}</span>;
      default:
        return null;
    }
  };

  return (
    <div 
      className="glass-panel"
      style={{
        padding: '24px',
        borderTop: `4px solid ${currentStep.status === 'DONE' ? 'var(--accent-green)' : 'var(--accent-cyan)'}`,
        background: 'linear-gradient(135deg, rgba(16, 23, 42, 0.95), rgba(21, 31, 54, 0.85))'
      }}
    >
      {/* Top Header GPS Tag */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00F0FF, #7000FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)'
          }}>
            <Compass size={20} color="#060911" className="animate-pulse-glow" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: '800', letterSpacing: '0.05em' }}>
                📍 LIVE COMPETITION GPS
              </span>
              {getTypeBadge(currentStep.type)}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-main)', marginTop: '2px' }}>
              {isAr ? 'المهمة الحالية للفريق' : 'YOUR CURRENT MISSION'} — STEP {currentStep.id} OF {guidedSteps.length}
            </h3>
          </div>
        </div>

        {/* Global GPS Progress Bar */}
        <div style={{ textAlign: isAr ? 'left' : 'right', minWidth: '180px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            {isAr ? 'تقدم البرتوكول الموجه' : 'Guided GPS Progress'}: <strong style={{ color: 'var(--accent-green)' }}>{progressPct}%</strong>
          </div>
          <div className="progress-bar-bg" style={{ height: '8px' }}>
            <div className="progress-bar-fill progress-bar-green" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>
      </div>

      {/* VISUAL STEP PROGRESSION ARROWS BAR (Prev -> CURRENT -> Next) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '20px',
        padding: '12px',
        background: 'rgba(8, 12, 24, 0.6)',
        borderRadius: '12px',
        border: '1px solid var(--border-glass)'
      }}>
        {/* Previous Step */}
        <div style={{ opacity: prevStep ? 0.8 : 0.4, fontSize: '0.8rem' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--accent-green)', fontWeight: '700' }}>
            {prevStep ? `✅ PREVIOUS (STEP ${prevStep.id})` : 'START OF PIPELINE'}
          </div>
          <div style={{ fontWeight: '700', color: 'var(--text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {prevStep ? (isAr ? prevStep.titleAr : prevStep.titleEn) : 'Initialization'}
          </div>
        </div>

        {/* Current Step (Highlighted) */}
        <div style={{
          background: 'rgba(0, 240, 255, 0.1)',
          border: '1px solid var(--accent-cyan)',
          padding: '8px 12px',
          borderRadius: '8px',
          boxShadow: '0 0 12px rgba(0, 240, 255, 0.2)'
        }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="animate-pulse-glow">🔵</span> CURRENT TASK (STEP {currentStep.id})
          </div>
          <div style={{ fontWeight: '900', color: 'var(--text-main)', marginTop: '2px', fontSize: '0.88rem' }}>
            {isAr ? currentStep.titleAr : currentStep.titleEn}
          </div>
        </div>

        {/* Next Step */}
        <div style={{ opacity: 0.6, fontSize: '0.8rem' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Lock size={10} /> NEXT (STEP {nextStep ? nextStep.id : 'END'})
          </div>
          <div style={{ fontWeight: '700', color: 'var(--text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {nextStep ? (isAr ? nextStep.titleAr : nextStep.titleEn) : 'Final Submission'}
          </div>
        </div>
      </div>

      {/* Main Mission Guidance Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
              👤 {currentStep.ownerRole}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              AI Tool: <strong style={{ color: 'var(--accent-cyan)' }}>{currentStep.aiTool}</strong>
            </span>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '12px' }}>
            {isAr ? currentStep.guidanceAr : currentStep.guidanceEn}
          </p>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', background: 'rgba(21, 31, 54, 0.5)', padding: '8px 12px', borderRadius: '8px', borderLeft: '3px solid var(--accent-cyan)' }}>
            <strong>Required Output:</strong> {currentStep.requiredOutput}
          </div>
        </div>

        {/* Copyable AI Prompt Box */}
        {currentStep.aiPrompt && (
          <div style={{
            background: 'rgba(8, 12, 24, 0.9)',
            border: '1px solid var(--border-cyan)',
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} /> {isAr ? 'كود/برومبت الذكاء الاصطناعي المباشر' : 'RECOMMENDED AI PROMPT'}
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={handleCopyPrompt}
                    className="btn-secondary"
                    style={{ padding: '3px 8px', fontSize: '0.72rem', borderColor: copied ? 'var(--accent-green)' : undefined, color: copied ? 'var(--accent-green)' : undefined }}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ البرومبت' : 'Copy Prompt')}
                  </button>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.4', maxHeight: showPrompt ? 'none' : '60px', overflow: 'hidden' }}>
                "{currentStep.aiPrompt}"
              </p>
            </div>

            <button
              onClick={() => setShowPrompt(!showPrompt)}
              style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.72rem', cursor: 'pointer', marginTop: '6px', textAlign: isAr ? 'right' : 'left' }}
            >
              {showPrompt ? (isAr ? 'إخفاء التفاصيل ▲' : 'Show Less ▲') : (isAr ? 'عرض البرومبت كاملاً ▼' : 'Expand Full Prompt ▼')}
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-glass)' }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--accent-green)' }}>
          {isAr ? currentStep.handoffMessageAr : currentStep.handoffMessageEn}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowDataModal(true)}
            className="btn-secondary"
            style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)', fontSize: '0.85rem' }}
          >
            <Upload size={16} /> {isAr ? '📁 رفع/تخزين ملف البيانات' : '📁 Upload / Store Dataset'}
          </button>

          <button
            onClick={() => setIsBlockingModal(true)}
            className="btn-secondary"
            style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)', fontSize: '0.85rem' }}
          >
            <AlertOctagon size={16} /> {isAr ? '🚨 التبليغ عن عقبة' : '🚨 Flag Blocker'}
          </button>

          <button
            onClick={handleDone}
            className="btn-primary"
            style={{ background: 'linear-gradient(135deg, #10B981, #00F0FF)', fontSize: '0.9rem', padding: '10px 22px' }}
          >
            <CheckCircle size={18} /> {isAr ? '✅ إكمال الخطوة وتمرير المهمة' : '✅ MARK STEP DONE & HANDOFF'}
          </button>
        </div>

        <DatasetUploadModal isOpen={showDataModal} onClose={() => setShowDataModal(false)} />
      </div>

      {/* Blocker Modal */}
      {isBlockingModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-red)', marginBottom: '12px' }}>
              🚨 {isAr ? 'التبليغ عن عقبة في الخطوة' : 'Flag Blocker on Current Step'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              {isAr ? 'اكتب سبب العقبة ليتم التبليغ عنها وحظر التمرير لحين حلها:' : 'Enter the exact reason blocking this step:'}
            </p>
            <input
              type="text"
              value={blockedReasonInput}
              onChange={e => setBlockedReasonInput(e.target.value)}
              placeholder="e.g. Target column missing in test.csv"
              style={{ marginBottom: '16px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setIsBlockingModal(false)} className="btn-secondary">{t.cancel}</button>
              <button onClick={handleBlockSubmit} className="btn-primary" style={{ background: 'var(--accent-red)' }}>
                {isAr ? 'إرسال التنبيه' : 'Flag Blocker'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
