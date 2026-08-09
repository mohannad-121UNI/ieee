// Centralized Configuration for AI Tools & External Services
export const AI_TOOLS = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: '🧠',
    url: 'https://chatgpt.com',
    description: 'Strategy • Reasoning • Modeling',
    badge: 'PRIMARY',
    color: '#10A37F'
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: '🔢',
    url: 'https://chat.deepseek.com',
    description: 'Math • Independent Reasoning • Algorithm Check',
    badge: 'SECONDARY',
    color: '#4E6EEF'
  },
  codex: {
    id: 'codex',
    name: 'Codex',
    icon: '💻',
    url: 'https://chatgpt.com/?model=gpt-4o',
    description: 'Implementation • Notebook Building • Debugging',
    badge: 'CODING',
    color: '#00F0FF'
  },
  antigravity: {
    id: 'antigravity',
    name: 'Antigravity',
    icon: '⚡',
    url: 'https://antigravity.google',
    description: 'Agentic Coding • Multi-Step Execution',
    badge: 'EXECUTOR',
    color: '#A855F7'
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini Pro',
    icon: '🔵',
    url: 'https://gemini.google.com',
    description: 'Dataset Understanding • Documents • EDA • Feature Ideas',
    badge: 'PRIMARY',
    color: '#1A73E8'
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    icon: '🟠',
    url: 'https://claude.ai',
    description: 'Independent Reasoning • Code Review • Red Team',
    badge: 'REVIEWER',
    color: '#D97706'
  }
};

export const MEMBER_CONFIG = {
  mohannad: {
    id: 'mohannad',
    name: 'Mohannad',
    title: '👑 Team Leader',
    subtitle: 'Modeling & Strategy • Integration & Final Decisions',
    roleTag: 'Team Leader & Strategy',
    image: '/assets/mohannad.jpg',
    fallbackImage: '/assets/mohannad.png',
    color: '#00F0FF',
    accentGradient: 'linear-gradient(135deg, #00F0FF, #7000FF)',
    responsibilities: [
      '🧠 Modeling Strategy',
      '🎯 Competition Strategy',
      '📐 Metric Understanding',
      '🔬 Cross Validation Setup',
      '🤖 Model Selection & Tuning',
      '🧪 Experimentation & Tracking',
      '🧬 Ensemble & Blending',
      '🏆 Final Decision Making'
    ],
    aiTools: ['chatgpt', 'deepseek', 'codex', 'antigravity']
  },
  moayad: {
    id: 'moayad',
    name: 'Moayad',
    title: '📊 Data Intelligence Officer',
    subtitle: 'EDA • Data Quality • Feature Engineering',
    roleTag: 'Data & Feature Engineering',
    image: '/assets/moayad.png',
    fallbackImage: '/assets/moayad.jpg',
    color: '#10B981',
    accentGradient: 'linear-gradient(135deg, #10B981, #00F0FF)',
    responsibilities: [
      '🔍 Exploratory Data Analysis (EDA)',
      '🧹 Data Cleaning & Quality Sanity Check',
      '🧩 Advanced Feature Engineering',
      '🚨 Target & Data Leakage Detection',
      '📈 Distribution Analysis',
      '🔀 Train/Test Shift & Covariate Shift'
    ],
    aiTools: ['gemini', 'chatgpt', 'claude', 'codex']
  },
  dyaa: {
    id: 'dyaa',
    name: 'Dyaa',
    title: '🛡️ Red Team / QA Officer',
    subtitle: 'Quality Assurance • Bug Detection • Alternative Solutions',
    roleTag: 'Red Team & QA',
    image: '/assets/dyaa.jpg',
    fallbackImage: '/assets/dyaa.png',
    color: '#F59E0B',
    accentGradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
    responsibilities: [
      '✅ Quality Assurance & Pipeline Audit',
      '🚨 Error Detection & Edge Case Testing',
      '🧪 Independent Solution Branch',
      '🧠 Alternative Model Approach',
      '🐞 Code Review & Debugging',
      '📋 Submission Format & Sanity Validation',
      '📄 Documenting Risks & Challenges'
    ],
    aiTools: ['claude', 'deepseek', 'gemini', 'codex', 'antigravity']
  },
  team_hq: {
    id: 'team_hq',
    name: 'TEAM HQ',
    title: '⚡ NextAura AI Command Center',
    subtitle: 'One team. One scoreboard. One mission. 🏆',
    roleTag: 'Central Command',
    image: '/assets/NEXTAURA.png',
    fallbackImage: '/assets/NEXTAURA.jpg',
    color: '#A855F7',
    accentGradient: 'linear-gradient(135deg, #8A2BE2, #00F0FF)',
    responsibilities: ['Unified Command', 'Realtime Sync', 'Competition Tracking']
  }
};
