import React, { useState, useEffect } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { queryFrontierAI, generateAnalystResponse } from '../services/aiAnalyst';
import { Bot, Sparkles, RefreshCw, Key, Check, Cpu, Zap, Dna, ShieldAlert, TrendingUp } from 'lucide-react';

export default function AIAnalystPanel() {
  const warRoomState = useWarRoom();
  const { lang, t } = warRoomState;
  const isAr = lang === 'ar';

  const [activeQuery, setActiveQuery] = useState('ANALYZE_TEAM');
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-pro');
  const [aiOutput, setAiOutput] = useState(() => generateAnalystResponse('ANALYZE_TEAM', warRoomState, lang));
  const [isThinking, setIsThinking] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('nextaura_gemini_key') || '');
  const [showKeyModal, setShowKeyModal] = useState(false);

  useEffect(() => {
    setAiOutput(generateAnalystResponse(activeQuery, warRoomState, lang));
  }, [lang]);

  const handleAction = async (queryType, customText = '') => {
    setActiveQuery(queryType);
    setIsThinking(true);

    const output = await queryFrontierAI({
      queryType,
      prompt: customText,
      state: warRoomState,
      lang,
      apiKey,
      selectedModel
    });

    setAiOutput(output);
    setIsThinking(false);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    handleAction('CUSTOM', customPrompt);
    setCustomPrompt('');
  };

  const saveKey = () => {
    localStorage.setItem('nextaura_gemini_key', apiKey);
    setShowKeyModal(false);
    warRoomState.addNotification('AI Key Saved 🔑', 'Frontier AI model inference connected.', 'success');
  };

  return (
    <div className="glass-panel" style={{ padding: '28px', borderTop: '4px solid var(--accent-cyan)' }}>
      {/* Top Bar Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #00F0FF, #7000FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)'
          }}>
            <Bot size={28} color="#060911" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900' }}>
                {t.aiAnalystTitle}
              </h3>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                <Cpu size={12} /> GRANDMASTER ENGINE
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {isAr ? 'محلل الاستراتيجية التنافسية وبناء النماذج المتقدم' : 'Elite Competition AI Strategist & Telemetry Intelligence'}
            </p>
          </div>
        </div>

        {/* AI Model Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
            style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto', background: 'rgba(21, 31, 54, 0.9)', borderColor: 'var(--border-cyan)', color: 'var(--accent-cyan)' }}
          >
            <option value="gemini-1.5-pro">⚡ Gemini 1.5/2.5 Pro (Grandmaster)</option>
            <option value="gemini-1.5-flash">⚡ Gemini Flash (Fast Reasoning)</option>
            <option value="heuristic">🔮 Grandmaster Heuristic Engine</option>
          </select>

          <button
            onClick={() => setShowKeyModal(true)}
            className="btn-secondary"
            style={{ padding: '7px 12px', fontSize: '0.8rem', borderColor: apiKey ? 'var(--accent-green)' : undefined, color: apiKey ? 'var(--accent-green)' : undefined }}
          >
            <Key size={14} /> {apiKey ? (isAr ? '🔑 المفتاح متصل' : '🔑 Key Connected') : t.configureKey}
          </button>

          <button
            onClick={() => handleAction(activeQuery)}
            className="btn-secondary"
            style={{ padding: '7px 14px', fontSize: '0.8rem' }}
          >
            <RefreshCw size={14} className={isThinking ? 'animate-pulse-glow' : ''} /> {t.refreshIntel}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => handleAction('ANALYZE_TEAM')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '8px 14px',
            borderColor: activeQuery === 'ANALYZE_TEAM' ? 'var(--accent-cyan)' : undefined,
            color: activeQuery === 'ANALYZE_TEAM' ? 'var(--accent-cyan)' : undefined,
            background: activeQuery === 'ANALYZE_TEAM' ? 'rgba(0, 240, 255, 0.12)' : undefined
          }}
        >
          🧠 {t.btnAnalyze}
        </button>

        <button
          onClick={() => handleAction('WHAT_NEXT')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '8px 14px',
            borderColor: activeQuery === 'WHAT_NEXT' ? 'var(--accent-cyan)' : undefined,
            color: activeQuery === 'WHAT_NEXT' ? 'var(--accent-cyan)' : undefined,
            background: activeQuery === 'WHAT_NEXT' ? 'rgba(0, 240, 255, 0.12)' : undefined
          }}
        >
          🎯 {t.btnWhatNext}
        </button>

        <button
          onClick={() => handleAction('FIND_RISKS')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '8px 14px',
            borderColor: activeQuery === 'FIND_RISKS' ? 'var(--accent-red)' : undefined,
            color: activeQuery === 'FIND_RISKS' ? 'var(--accent-red)' : undefined,
            background: activeQuery === 'FIND_RISKS' ? 'rgba(239, 68, 68, 0.12)' : undefined
          }}
        >
          🚨 {t.btnFindRisks}
        </button>

        <button
          onClick={() => handleAction('ENSEMBLE_GEN')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '8px 14px',
            borderColor: activeQuery === 'ENSEMBLE_GEN' ? 'var(--accent-purple)' : undefined,
            color: activeQuery === 'ENSEMBLE_GEN' ? 'var(--accent-purple)' : undefined,
            background: activeQuery === 'ENSEMBLE_GEN' ? 'rgba(168, 85, 247, 0.12)' : undefined
          }}
        >
          🧬 {isAr ? 'استراتيجية الـ Ensemble' : 'Ensemble Strategy'}
        </button>

        <button
          onClick={() => handleAction('HOW_TO_IMPROVE')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '8px 14px',
            borderColor: activeQuery === 'HOW_TO_IMPROVE' ? 'var(--accent-green)' : undefined,
            color: activeQuery === 'HOW_TO_IMPROVE' ? 'var(--accent-green)' : undefined
          }}
        >
          📈 {t.btnImprove}
        </button>

        <button
          onClick={() => handleAction('WORKLOAD_BALANCE')}
          className="btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '8px 14px',
            borderColor: activeQuery === 'WORKLOAD_BALANCE' ? 'var(--accent-amber)' : undefined,
            color: activeQuery === 'WORKLOAD_BALANCE' ? 'var(--accent-amber)' : undefined
          }}
        >
          ⚖️ {t.btnWorkload}
        </button>
      </div>

      {/* Free-form Prompt Input */}
      <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          type="text"
          value={customPrompt}
          onChange={e => setCustomPrompt(e.target.value)}
          placeholder={t.askAiPlaceholder}
          style={{ flexGrow: 1, padding: '12px 16px', fontSize: '0.92rem' }}
        />
        <button type="submit" className="btn-primary" style={{ padding: '12px 22px' }}>
          <Sparkles size={18} /> {t.askAiBtn}
        </button>
      </form>

      {/* Output Display Box */}
      <div 
        style={{
          background: 'rgba(8, 12, 24, 0.95)',
          border: '1px solid var(--border-cyan)',
          borderRadius: '16px',
          padding: '24px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          lineHeight: '1.8',
          whiteSpace: 'pre-line',
          color: 'var(--text-main)',
          boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.5)'
        }}
      >
        {isThinking ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-cyan)', padding: '24px 0', fontSize: '1rem' }}>
            <Sparkles size={24} className="animate-pulse-glow" /> 
            {isAr ? 'جاري تحليل كامل بيانات الفريق وتجهيز التوصيات الاستراتيجية...' : 'Analyzing full multi-station telemetry & calculating Grandmaster strategy...'}
          </div>
        ) : (
          aiOutput
        )}
      </div>

      {/* Key Configure Modal */}
      {showKeyModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '520px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>🔑 {isAr ? 'إعداد مفتاح الذكاء الاصطناعي Gemini' : 'Configure Gemini AI Key'}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
              {isAr 
                ? 'أدخل مفتاح Gemini API لربط المحلل مباشرة بنماذج Gemini 1.5/2.5 Pro الفائقة للحصول على تحليلات تفصيلية عميقة.'
                : 'Enter your Gemini API key to query Gemini 1.5/2.5 Pro directly with full telemetry context.'}
            </p>
            <input
              type="text"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              style={{ marginBottom: '18px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowKeyModal(false)} className="btn-secondary">{t.cancel}</button>
              <button onClick={saveKey} className="btn-primary"><Check size={14} /> {t.save}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
