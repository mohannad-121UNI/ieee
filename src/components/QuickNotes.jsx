import React, { useState } from 'react';
import { useWarRoom } from '../context/WarRoomContext';
import { MessageSquare, Plus, Send } from 'lucide-react';

export default function QuickNotes() {
  const { notes, addTeamNote } = useWarRoom();
  const [member, setMember] = useState('Mohannad');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTeamNote(member, text.trim());
    setText('');
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <MessageSquare size={20} color="var(--accent-cyan)" /> 📝 Team Quick Notes Board
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <select 
          value={member} 
          onChange={e => setMember(e.target.value)}
          style={{ width: '130px', padding: '8px 10px', fontSize: '0.82rem' }}
        >
          <option value="Mohannad">👑 Mohannad</option>
          <option value="Moayad">📊 Moayad</option>
          <option value="Dyaa">🛡️ Dyaa</option>
        </select>

        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Post quick thought (e.g. 💡 Try log1p target transformation)..."
          style={{ flexGrow: 1, padding: '8px 12px', fontSize: '0.85rem' }}
        />

        <button type="submit" className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
          <Send size={14} /> Post
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
        {notes.map((n) => (
          <div
            key={n.id}
            style={{
              background: 'rgba(21, 31, 54, 0.5)',
              border: '1px solid var(--border-glass)',
              borderRadius: '8px',
              padding: '10px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <span style={{
                fontWeight: '700',
                fontSize: '0.8rem',
                marginRight: '8px',
                color: n.member === 'Mohannad' ? 'var(--accent-cyan)' :
                       n.member === 'Moayad' ? 'var(--accent-green)' : 'var(--accent-amber)'
              }}>
                {n.member}:
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{n.text}</span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
