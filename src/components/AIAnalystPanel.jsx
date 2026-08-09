import React, { useState, useEffect } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { generateAnalystResponse } from '../services/aiAnalyst';
import { Bot, Sparkles, RefreshCw, AlertCircle, Key, Check } from 'lucide-react';

export default function AIAnalystPanel() {
  const warRoomState = useWarRoom();
  const { lang, t } = warRoomState;

  const [activeQuery, setActiveQuery] = useState('ANALYZE_TEAM');
  const [customPrompt, setCustomPrompt] = useState('');
  const [aiOutput, setAiOutput] = useState(() => generateAnalystResponse('ANALYZE_TEAM', warRoomState, lang));
  const [isThinking, setIsThinking] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('nextaura_gemini_key') || '');
  const [showKeyModal, setShowKeyModal] = useState(false);

  // Update response when language changes
  useEffect(() => {
    setAiOutput(generateAnalystResponse(activeQuery, warRoomState, lang));
  }, [lang]);

  const handleAction = (queryType) => {
    setActiveQuery(queryType);
    setIsThinking(true);
    setTimeout(() => {
      setAiOutput(generateAnalystResponse(queryType, warRoomState, lang));
      setIsThinking(false);
    }, 350);
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    setIsThinking(true);

    if (apiKey.trim()) {
      // Call live Gemini API if key is entered
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are Aura AI Competition Analyst for team NextAura (Mohannad, Moayad, Dyaa). Language: ${lang}. Context: ${JSON.stringify({
                  comp: warRoomState.competition,
                  tasksCompleted: warRoomState.tasks.filter(t=>t.completed).length,
                  totalTasks: warRoomState.tasks.length,
                  experiments: warRoomState.experiments,
                  blockers: warRoomState.blockers.filter(b=>!b.resolved)
                })}. User query: ${customPrompt}`
              }]
            }]
          })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          setAiOutput(data.candidates[0].content.parts[0].text);
          setCustomPrompt('');
          setIsThinking(false);
          return;
        }
      } catch (err) {
        console.error('Gemini API Error:', err);
      }
    }

    // Fallback to intelligent engine
    setTimeout(() => {
      const response = generateAnalystResponse('WHAT_NEXT', warRoomState, lang);
      setAiOutput(`## 🧠 ${lang === 'ar' ? 'تحليل لـ' : 'ANALYSIS FOR'}: "${customPrompt}"\n\n${response}`);
      setCustomPrompt('');
      setIsThinking(false);
    }, 400);
  };

  const saveKey = () => {
    localStorage.setItem('nextaura_gemini_key', apiKey);
    setShowKeyModal(false);
    warRoomState.addNotification('AI Key Saved 🔑', 'Gemini AI model inference connected.', 'success');
  };

  return (
    <div className="glass-panel" style={{ padding: '28px', borderTop: '4px solid var(--accent-cyan)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00F0FF, #7000FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)'
          }}>
            <Bot size={26} color="#060911" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {t.aiAnalystTitle}
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>AI Teammate #4</span>
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {t.aiAnalystSub}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowKeyModal(true)}
            className="btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.8rem', borderColor: apiKey ? 'var(--accent-green)' : undefined }}
          >
            <Key size={14} /> {apiKey ? '🔑 Key Connected' : t.configureKey}
          </button>

          <button
            onClick={() => handleAction(activeQuery)}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem' }}
          >
            <RefreshCw size={14} className={isThinking ? 'animate-pulse-glow' : ''} /> {t.refreshIntel}
          </button>
        </div>
      </div>

      {/* Quick Action Buttons Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => handleAction('ANALYZE_TEAM')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '7px 12px',
            borderColor: activeQuery === 'ANALYZE_TEAM' ? 'var(--accent-cyan)' : undefined,
            color: activeQuery === 'ANALYZE_TEAM' ? 'var(--accent-cyan)' : undefined
          }}
        >
          {t.btnAnalyze}
        </button>

        <button
          onClick={() => handleAction('WHAT_NEXT')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '7px 12px',
            borderColor: activeQuery === 'WHAT_NEXT' ? 'var(--accent-cyan)' : undefined,
            color: activeQuery === 'WHAT_NEXT' ? 'var(--accent-cyan)' : undefined
          }}
        >
          {t.btnWhatNext}
        </button>

        <button
          onClick={() => handleAction('FIND_RISKS')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '7px 12px',
            borderColor: activeQuery === 'FIND_RISKS' ? 'var(--accent-red)' : undefined,
            color: activeQuery === 'FIND_RISKS' ? 'var(--accent-red)' : undefined
          }}
        >
          {t.btnFindRisks}
        </button>

        <button
          onClick={() => handleAction('HOW_TO_IMPROVE')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '7px 12px',
            borderColor: activeQuery === 'HOW_TO_IMPROVE' ? 'var(--accent-green)' : undefined,
            color: activeQuery === 'HOW_TO_IMPROVE' ? 'var(--accent-green)' : undefined
          }}
        >
          {t.btnImprove}
        </button>

        <button
          onClick={() => handleAction('WORKLOAD_BALANCE')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '7px 12px',
            borderColor: activeQuery === 'WORKLOAD_BALANCE' ? 'var(--accent-amber)' : undefined,
            color: activeQuery === 'WORKLOAD_BALANCE' ? 'var(--accent-amber)' : undefined
          }}
        >
          {t.btnWorkload}
        </button>

        <button
          onClick={() => handleAction('SUGGEST_EXPERIMENT')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '7px 12px',
            borderColor: activeQuery === 'SUGGEST_EXPERIMENT' ? 'var(--accent-purple)' : undefined,
            color: activeQuery === 'SUGGEST_EXPERIMENT' ? 'var(--accent-purple)' : undefined
          }}
        >
          {t.btnSuggestExp}
        </button>

        <button
          onClick={() => handleAction('FINAL_SUBMISSION_REVIEW')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '7px 12px',
            borderColor: activeQuery === 'FINAL_SUBMISSION_REVIEW' ? 'var(--accent-green)' : undefined,
            color: activeQuery === 'FINAL_SUBMISSION_REVIEW' ? 'var(--accent-green)' : undefined
          }}
        >
          {t.btnFinalReview}
        </button>
      </div>

      {/* Free-form Prompt Input Box */}
      <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          type="text"
          value={customPrompt}
          onChange={e => setCustomPrompt(e.target.value)}
          placeholder={t.askAiPlaceholder}
          style={{ flexGrow: 1, padding: '10px 14px', fontSize: '0.9rem' }}
        />
        <button type="submit" className="btn-primary" style={{ padding: '10px 18px' }}>
          <Sparkles size={16} /> {t.askAiBtn}
        </button>
      </form>

      {/* Output Intelligence Box */}
      <div 
        style={{
          background: 'rgba(10, 15, 29, 0.9)',
          border: '1px solid var(--border-cyan)',
          borderRadius: '14px',
          padding: '20px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.92rem',
          lineHeight: '1.7',
          whiteSpace: 'pre-line',
          color: 'var(--text-main)',
          boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.4)'
        }}
      >
        {isThinking ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-cyan)', padding: '20px 0' }}>
            <Sparkles size={20} className="animate-pulse-glow" /> Analyzing multi-station telemetry...
          </div>
        ) : (
          aiOutput
        )}
      </div>

      {/* Key Modal */}
      {showKeyModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '14px' }}>🔑 Configure Gemini AI API Key</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Enter your Gemini API key to enable direct LLM reasoning capabilities inside Aura Analyst.
            </p>
            <input
              type="text"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              style={{ marginBottom: '16px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowKeyModal(false)} className="btn-secondary">Cancel</button>
              <button onClick={saveKey} className="btn-primary"><Check size={14} /> Save Key</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
