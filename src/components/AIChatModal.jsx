import React, { useState, useEffect, useRef } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { generateAnalystResponse, buildGrandmasterContext } from '../services/aiAnalyst';
import { MessageSquare, Send, X, Bot, Sparkles, User, Minimize2, Maximize2, RefreshCw } from 'lucide-react';

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

export default function AIChatModal() {
  const warRoomState = useWarRoom();
  const { lang, t, tasks, experiments, blockers, submissions } = warRoomState;
  const isAr = lang === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: isAr 
        ? `أهلاً بك! أنا **مساعد Aura الذكي المباشر (Powered by Gemini)** 🤖\n\nأراقب تتبع فريق **NextAura** (👑 مهند، 📊 مؤيد، 🛡️ ضياء) لحظة بلحظة.\n\nيمكنك سؤالي عن أي شيء: حالة الفريق، مهام أي عضو، بناء النماذج، أخطاء التسريب، أو طلب كتابة أكواد Python!`
        : `Welcome! I am **Aura Live AI Chat Assistant (Powered by Gemini)** 🤖\n\nI track NextAura team progress (**Mohannad**, **Moayad**, **Dyaa**) in real time.\n\nAsk me anything: individual member progress, competition strategy, ML code generation, or dataset shift!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Build context
    const grandmasterContext = buildGrandmasterContext(warRoomState, lang);
    const fullPrompt = `${grandmasterContext}\n\nUSER QUESTION: ${textToSend.trim()}`;

    let aiResponseText = '';

    // Call Gemini API
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: fullPrompt }]
          }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        aiResponseText = data.candidates[0].content.parts[0].text;
      }
    } catch (err) {
      console.error('Gemini API call error:', err);
    }

    // Fallback if API response is empty
    if (!aiResponseText) {
      aiResponseText = generateAnalystResponse('WHAT_NEXT', warRoomState, lang);
    }

    const aiMsg = {
      id: Date.now() + 1,
      sender: 'ai',
      text: aiResponseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleQuickPrompt = (promptText) => {
    handleSend(promptText);
  };

  return (
    <>
      {/* Floating Chat Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-primary animate-pulse-glow"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: isAr ? '24px' : 'auto',
            right: isAr ? 'auto' : '24px',
            zIndex: 9990,
            padding: '14px 22px',
            fontSize: '0.95rem',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.6)'
          }}
        >
          <Bot size={22} /> {isAr ? '💬 شات الذكاء الاصطناعي المباشر' : '💬 Live AI Assistant Chat'}
        </button>
      )}

      {/* Floating Interactive Chat Window */}
      {isOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: isAr ? '24px' : 'auto',
            right: isAr ? 'auto' : '24px',
            width: isMinimized ? '320px' : '440px',
            height: isMinimized ? '60px' : '620px',
            maxWidth: '92vw',
            maxHeight: '85vh',
            zIndex: 9995,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid var(--accent-cyan)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '14px 18px',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(112, 0, 255, 0.2))',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00F0FF, #7000FF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={20} color="#060911" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800' }}>
                  Aura AI Live Chat
                </h4>
                <p style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)' }}>
                  ⚡ Gemini API Connected • Progress Tracker
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Quick Prompt Chips */}
              <div style={{
                padding: '10px 14px',
                background: 'rgba(15, 23, 42, 0.7)',
                borderBottom: '1px solid var(--border-glass)',
                display: 'flex',
                gap: '6px',
                overflowX: 'auto'
              }}>
                <button
                  onClick={() => handleQuickPrompt(isAr ? 'كيف أداء مهند وتكاليفه؟' : 'How is Mohannad doing?')}
                  className="btn-secondary"
                  style={{ fontSize: '0.72rem', padding: '4px 8px', flexShrink: 0 }}
                >
                  👑 Mohannad Status
                </button>
                <button
                  onClick={() => handleQuickPrompt(isAr ? 'ماذا يعمل مؤيد الآن؟' : 'What is Moayad working on?')}
                  className="btn-secondary"
                  style={{ fontSize: '0.72rem', padding: '4px 8px', flexShrink: 0 }}
                >
                  📊 Moayad Status
                </button>
                <button
                  onClick={() => handleQuickPrompt(isAr ? 'هل اعتمد ضياء الجودة؟' : 'Has Dyaa cleared QA?')}
                  className="btn-secondary"
                  style={{ fontSize: '0.72rem', padding: '4px 8px', flexShrink: 0 }}
                >
                  🛡️ Dyaa QA Check
                </button>
                <button
                  onClick={() => handleQuickPrompt(isAr ? 'اكتب كود CatBoost Baseline' : 'Generate CatBoost Code')}
                  className="btn-secondary"
                  style={{ fontSize: '0.72rem', padding: '4px 8px', flexShrink: 0 }}
                >
                  🐍 Python Code
                </button>
              </div>

              {/* Chat Message List */}
              <div style={{
                flexGrow: 1,
                padding: '16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                background: 'rgba(8, 12, 24, 0.6)'
              }}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.sender === 'user' ? (isAr ? 'flex-start' : 'flex-end') : (isAr ? 'flex-end' : 'flex-start')
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '4px',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)'
                    }}>
                      {msg.sender === 'ai' ? (
                        <>
                          <Bot size={12} color="var(--accent-cyan)" />
                          <span style={{ color: 'var(--accent-cyan)', fontWeight: '700' }}>Aura AI</span>
                        </>
                      ) : (
                        <>
                          <User size={12} color="var(--accent-purple)" />
                          <span style={{ color: 'var(--accent-purple)', fontWeight: '700' }}>You</span>
                        </>
                      )}
                      <span>• {msg.timestamp}</span>
                    </div>

                    <div
                      style={{
                        maxWidth: '90%',
                        padding: '12px 16px',
                        borderRadius: '14px',
                        fontSize: '0.88rem',
                        lineHeight: '1.6',
                        whiteSpace: 'pre-line',
                        background: msg.sender === 'user'
                          ? 'linear-gradient(135deg, #7000FF 0%, #00F0FF 100%)'
                          : 'rgba(21, 31, 54, 0.9)',
                        color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                        border: msg.sender === 'ai' ? '1px solid var(--border-glass)' : 'none',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontSize: '0.82rem' }}>
                    <Sparkles size={16} className="animate-pulse-glow" /> 
                    {isAr ? 'جاري التحليل واستدعاء Gemini...' : 'Aura AI is thinking & querying Gemini API...'}
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                style={{
                  padding: '12px 16px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  borderTop: '1px solid var(--border-glass)',
                  display: 'flex',
                  gap: '8px'
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={isAr ? 'اسأل Aura AI عن أي شيء أو حالة الفريق...' : 'Ask Aura AI anything or check team progress...'}
                  style={{ flexGrow: 1, padding: '10px 14px', fontSize: '0.88rem' }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '10px 16px' }}>
                  <Send size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
