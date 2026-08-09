import React from 'react';
import { AI_TOOLS } from '../config/aiTools';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function AIArsenalCard({ toolKey }) {
  const tool = AI_TOOLS[toolKey];
  if (!tool) return null;

  return (
    <div 
      className="glass-panel"
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: `4px solid ${tool.color}`
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem' }}>{tool.icon}</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{tool.name}</h4>
          </div>
          <span 
            className="badge" 
            style={{ 
              background: `${tool.color}20`, 
              color: tool.color, 
              borderColor: `${tool.color}40`,
              fontSize: '0.65rem' 
            }}
          >
            {tool.badge}
          </span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: '1.4' }}>
          {tool.description}
        </p>
      </div>

      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary"
        style={{
          width: '100%',
          justifyContent: 'center',
          fontSize: '0.85rem',
          padding: '8px 12px',
          borderColor: `${tool.color}40`,
          color: tool.color
        }}
      >
        OPEN {tool.name.toUpperCase()} <ExternalLink size={14} />
      </a>
    </div>
  );
}
