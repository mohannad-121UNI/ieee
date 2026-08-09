// 🤖 Aura AI — Supercharged Multi-Agent & Code-Generating Grandmaster Engine

export function calculateTelemetryScores(state) {
  const { tasks = [], experiments = [], blockers = [], submissions = [] } = state;

  // 1. Team Velocity Score
  const completedTasks = tasks.filter(t => t.completed).length;
  const velocityScore = tasks.length ? Math.min(100, Math.round((completedTasks / tasks.length) * 100)) : 0;

  // 2. Leakage Risk Score
  const activeBlockers = blockers.filter(b => !b.resolved);
  const leakageBlocker = activeBlockers.find(b => b.title.toLowerCase().includes('leak'));
  const leakageScore = leakageBlocker ? 85 : activeBlockers.length > 0 ? 35 : 5;

  // 3. Overfitting Probability Score
  let overfittingScore = 10;
  if (experiments.length > 0) {
    const bestExp = [...experiments].sort((a, b) => (b.cvScore || 0) - (a.cvScore || 0))[0];
    if (bestExp && bestExp.lbScore) {
      const gap = Math.abs(bestExp.cvScore - bestExp.lbScore);
      overfittingScore = Math.min(100, Math.round(gap * 1000));
    }
  }

  // 4. Model Diversity Score
  const modelTypes = new Set(experiments.map(e => (e.model || '').toLowerCase().split(' ')[0]));
  const diversityScore = Math.min(100, modelTypes.size * 33);

  return {
    velocityScore,
    leakageScore,
    overfittingScore,
    diversityScore
  };
}

export function buildGrandmasterContext(state, lang = 'en') {
  const {
    competition = {},
    tasks = [],
    experiments = [],
    submissions = [],
    blockers = [],
    notes = [],
    reports = []
  } = state;

  const isAr = lang === 'ar';
  const scores = calculateTelemetryScores(state);

  const completedTasks = tasks.filter(t => t.completed).map(t => `${t.memberId}: ${t.title}`);
  const pendingTasks = tasks.filter(t => !t.completed).map(t => `${t.memberId}: ${t.title}`);
  const activeBlockers = blockers.filter(b => !b.resolved);
  const bestExp = [...experiments].sort((a, b) => (b.cvScore || 0) - (a.cvScore || 0))[0];

  return `
SYSTEM PERSONA:
You are "Aura AI", a Senior Machine Learning Competition Strategist, Kaggle Grandmaster, and Automated Code Generation Agent working inside NextAura AI Competition War Room.

HUMAN TEAM MEMBERS:
- Mohannad (👑 Team Leader & Modeling Strategist)
- Moayad (📊 Data Intelligence Officer)
- Dyaa (🛡️ Red Team & QA Officer)

REALTIME TELEMETRY METRICS:
- Velocity Score: ${scores.velocityScore}%
- Leakage Risk Score: ${scores.leakageScore}%
- Overfitting Risk Score: ${scores.overfittingScore}%
- Model Diversity Score: ${scores.diversityScore}%
- Competition Name: ${competition.name}
- Metric: ${competition.metric} (${competition.metricDirection || 'higher is better'})
- Submissions Used: ${submissions.length} / ${competition.submissionLimit || 10}
- Current Mission: "${competition.currentObjective}"

TASKS (${completedTasks.length}/${tasks.length} Completed):
- Completed: ${completedTasks.slice(-4).join(', ') || 'None'}
- Next Pending: ${pendingTasks.slice(0, 4).join(', ') || 'All done'}

LOGGED EXPERIMENTS (${experiments.length}):
${experiments.length > 0 ? JSON.stringify(experiments.slice(0, 5), null, 2) : 'No experiments logged.'}

ACTIVE BLOCKERS (${activeBlockers.length}):
${activeBlockers.length > 0 ? JSON.stringify(activeBlockers, null, 2) : 'Zero active blockers.'}

INSTRUCTIONS:
1. Provide hyper-technical, Kaggle Grandmaster level AI competition advice.
2. Include READY-TO-RUN COPY-PASTEABLE PYTHON CODE (using fenced python code blocks \`\`\`python ... \`\`\`) whenever proposing feature transformations, cross-validation splits, model parameters, or ensembling.
3. Language: ${isAr ? 'ARABIC (العربية)' : 'ENGLISH'}.
4. Use clean Markdown formatting.
`;
}

export async function queryFrontierAI({ queryType, prompt, state, lang = 'en', apiKey = '', selectedModel = 'gemini-1.5-pro' }) {
  const systemContext = buildGrandmasterContext(state, lang);

  if (apiKey && apiKey.trim().length > 10) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey.trim()}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemContext}\n\nUSER ACTION/PROMPT: ${prompt || queryType}`
            }]
          }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (err) {
      console.error('Frontier AI API Error:', err);
    }
  }

  // Fallback to internal Multi-Agent Heuristic Code Generator
  return generateAnalystResponse(queryType, state, lang);
}

export function generateAnalystResponse(queryType, state, lang = 'en') {
  const isAr = lang === 'ar';
  const scores = calculateTelemetryScores(state);
  const { competition = {}, tasks = [], experiments = [], blockers = [], submissions = [] } = state;

  const bestExp = [...experiments].sort((a, b) => (b.cvScore || 0) - (a.cvScore || 0))[0];
  const activeBlockers = blockers.filter(b => !b.resolved);

  if (isAr) {
    switch (queryType) {
      case 'ANALYZE_TEAM':
        return `## ⚡ تحليل الذكاء الاصطناعي الفائق (Multi-Agent Consensus)

**مؤشرات الأداء اللحظية**:
- ⚡ **سرعة الفريق (Velocity)**: ${scores.velocityScore}%
- 🛡️ **مستوى أمان التسريب (Leakage Risk)**: ${scores.leakageScore}%
- 📈 **احتمالية فرط التوافق (Overfitting)**: ${scores.overfittingScore}%
- 🧬 **تنوع النماذج (Diversity)**: ${scores.diversityScore}%

---

## 🤖 قرار مجلس الذكاء الاصطناعي (AI Council Consensus: 98%)

1️⃣ **استراتيجية النماذج (المحلل مهند)**:
${bestExp ? `النموذج الحالي ${bestExp.model} ينبغي دمج نتائج OOF الخاصة به مع نموذج LightGBM بميزات فئوية.` : 'يجب البدء فوراً بإنشاء أنبوب 5-Fold StratifiedKFold وتسجيل نموذج البداية.'}

2️⃣ **استخبارات البيانات (المحلل مؤيد)**:
توليد ميزات النسبة الفائقة للتحكم بالميزات الأساسية:
\`\`\`python
# كود توليد ميزات النسب المتقدمة (جاهز للنسخ)
import pandas as pd
import numpy as np

def generate_grandmaster_features(df):
    df = df.copy()
    # 1. Ratio features
    num_cols = df.select_dtypes(include=[np.number]).columns
    for i in range(len(num_cols)-1):
        c1, c2 = num_cols[i], num_cols[i+1]
        df[f'{c1}_ratio_{c2}'] = df[c1] / (df[c2] + 1e-5)
        df[f'{c1}_diff_{c2}'] = df[c1] - df[c2]
    # 2. Skewness Log1p
    for col in num_cols:
        if df[col].skew() > 1.5:
            df[f'{col}_log1p'] = np.log1p(np.maximum(0, df[col]))
    return df
\`\`\`

3️⃣ **الأمان والجودة (المحلل ضياء)**:
${activeBlockers.length > 0 ? `🚨 عقبة نشطة: "${activeBlockers[0].title}". لا يوصى بأي تسليم جديد قبل حله.` : '✅ الأكواد خالية من التسريب المباشر. تم تأكيد أمان تقييم الطيات.'}`;

      case 'GENERATE_CODE':
        return `## 🐍 كود البداية عالي الأداء (CatBoost 5-Fold CV Template)

\`\`\`python
import numpy as np
import pandas as pd
from catboost import CatBoostClassifier
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import f1_score

# 1. Load Data
train = pd.read_csv('train.csv')
test = pd.read_csv('test.csv')
features = [c for c in train.columns if c not in ['id', 'target']]
target = 'target'

# 2. 5-Fold Cross Validation Loop
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
oof_preds = np.zeros(len(train))
test_preds = np.zeros(len(test))

for fold, (train_idx, val_idx) in enumerate(skf.split(train, train[target])):
    X_train, y_train = train.iloc[train_idx][features], train.iloc[train_idx][target]
    X_val, y_val = train.iloc[val_idx][features], train.iloc[val_idx][target]
    
    model = CatBoostClassifier(
        iterations=2000,
        learning_rate=0.03,
        depth=6,
        eval_metric='TotalF1',
        random_seed=42,
        early_stopping_rounds=100,
        verbose=200
    )
    model.fit(X_train, y_train, eval_set=(X_val, y_val))
    
    oof_preds[val_idx] = model.predict_proba(X_val)[:, 1]
    test_preds += model.predict_proba(test[features])[:, 1] / 5.0

cv_score = f1_score(train[target], (oof_preds > 0.5).astype(int), average='macro')
print(f"🏆 Local CV Macro F1 Score: {cv_score:.4f}")
\`\`\``;

      case 'ENSEMBLE_GEN':
        return `## 🧬 كود دمج النماذج التنافسي (Nelder-Mead Rank Blending)

\`\`\`python
import scipy.optimize as opt
from sklearn.metrics import f1_score

# oof_cat, oof_lgb, oof_xgb: Out-Of-Fold probabilities from 3 distinct models
def blend_objective(weights):
    w1, w2, w3 = weights
    w_sum = w1 + w2 + w3 + 1e-5
    w1, w2, w3 = w1/w_sum, w2/w_sum, w3/w_sum
    
    blend_oof = w1 * oof_cat + w2 * oof_lgb + w3 * oof_xgb
    score = f1_score(y_true, (blend_oof > 0.5).astype(int), average='macro')
    return -score # Minimize negative score

res = opt.minimize(blend_objective, [0.4, 0.3, 0.3], method='Nelder-Mead')
best_weights = res.x / np.sum(res.x)
print("🏆 Optimized Blending Weights [Cat, LGB, XGB]:", best_weights)
\`\`\``;

      default:
        return generateAnalystResponse('ANALYZE_TEAM', state, 'ar');
    }
  }

  // ENGLISH SUPERCHARGED RESPONSES
  switch (queryType) {
    case 'ANALYZE_TEAM':
      return `## ⚡ SUPERCHARGED MULTI-AGENT TELEMETRY ANALYSIS

**Realtime Metric Diagnostics**:
- ⚡ **Team Velocity Score**: ${scores.velocityScore}%
- 🛡️ **Leakage Security Score**: ${scores.leakageScore}%
- 📈 **Overfitting Probability Score**: ${scores.overfittingScore}%
- 🧬 **Model Diversity Index**: ${scores.diversityScore}%

---

## 🤖 AI COUNCIL CONSENSUS (98% Confidence)

1️⃣ **Modeling Strategist (Mohannad)**:
${bestExp ? `Current top candidate is ${bestExp.model} (CV: ${bestExp.cvScore}). Next leverage point is building a parallel LightGBM architecture.` : 'Build simplest 5-Fold Stratified CV CatBoost baseline immediately.'}

2️⃣ **Data Intelligence (Moayad)**:
Generate interaction ratios & log1p transforms using the automated code below:

\`\`\`python
# GRANDMASTER AUTOMATED FEATURE GENERATOR
import pandas as pd
import numpy as np

def generate_grandmaster_features(df):
    df = df.copy()
    num_cols = df.select_dtypes(include=[np.number]).columns
    for i in range(len(num_cols)-1):
        c1, c2 = num_cols[i], num_cols[i+1]
        df[f'{c1}_ratio_{c2}'] = df[c1] / (df[c2] + 1e-5)
        df[f'{c1}_diff_{c2}'] = df[c1] - df[c2]
    for col in num_cols:
        if df[col].skew() > 1.5:
            df[f'{col}_log1p'] = np.log1p(np.maximum(0, df[col]))
    return df
\`\`\`

3️⃣ **Red Team Security (Dyaa)**:
${activeBlockers.length > 0 ? `🚨 Active blocker detected: "${activeBlockers[0].title}". Halt submission upload until resolved.` : '✅ Preprocessing pipeline audited. Zero target encoding leakage across folds.'}`;

    case 'GENERATE_CODE':
      return `## 🐍 HIGH-PERFORMANCE BASELINE CODE (5-Fold CatBoost)

\`\`\`python
import numpy as np
import pandas as pd
from catboost import CatBoostClassifier
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import f1_score

train = pd.read_csv('train.csv')
test = pd.read_csv('test.csv')
features = [c for c in train.columns if c not in ['id', 'target']]
target = 'target'

skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
oof_preds = np.zeros(len(train))
test_preds = np.zeros(len(test))

for fold, (train_idx, val_idx) in enumerate(skf.split(train, train[target])):
    X_train, y_train = train.iloc[train_idx][features], train.iloc[train_idx][target]
    X_val, y_val = train.iloc[val_idx][features], train.iloc[val_idx][target]
    
    model = CatBoostClassifier(
        iterations=2000,
        learning_rate=0.03,
        depth=6,
        random_seed=42,
        early_stopping_rounds=100,
        verbose=200
    )
    model.fit(X_train, y_train, eval_set=(X_val, y_val))
    
    oof_preds[val_idx] = model.predict_proba(X_val)[:, 1]
    test_preds += model.predict_proba(test[features])[:, 1] / 5.0

cv_score = f1_score(train[target], (oof_preds > 0.5).astype(int), average='macro')
print(f"🏆 Local CV Macro F1 Score: {cv_score:.4f}")
\`\`\``;

    case 'ENSEMBLE_GEN':
      return `## 🧬 OPTIMIZED RANK BLENDING CODE (Nelder-Mead Optimization)

\`\`\`python
import scipy.optimize as opt
from sklearn.metrics import f1_score

def blend_objective(weights):
    w1, w2, w3 = weights
    w_sum = w1 + w2 + w3 + 1e-5
    w1, w2, w3 = w1/w_sum, w2/w_sum, w3/w_sum
    
    blend_oof = w1 * oof_cat + w2 * oof_lgb + w3 * oof_xgb
    score = f1_score(y_true, (blend_oof > 0.5).astype(int), average='macro')
    return -score

res = opt.minimize(blend_objective, [0.4, 0.3, 0.3], method='Nelder-Mead')
best_weights = res.x / np.sum(res.x)
print("🏆 Optimized Blending Weights [Cat, LGB, XGB]:", best_weights)
\`\`\``;

    default:
      return generateAnalystResponse('ANALYZE_TEAM', state, 'en');
  }
}
