// Default clean initial seed data for NextAura AI Competition War Room
export const INITIAL_COMPETITION = {
  name: 'IEEE Machine Learning Challenge 2026',
  metric: 'Macro F1-Score',
  metricDirection: 'higher', // 'higher' or 'lower'
  submissionLimit: 10,
  currentObjective: 'Establish robust local validation CV scheme and build initial baseline model.',
  nextAction: 'Mohannad: Complete metric verification; Moayad: Load train/test data & sanity check.',
  startTime: new Date().toISOString(),
  endTime: new Date(Date.now() + 8 * 3600 * 1000).toISOString() // Default 8 hours from now
};

export const INITIAL_TASKS = [
  // MOHANNAD TASKS (10 tasks)
  {
    id: 'moh_1',
    memberId: 'mohannad',
    title: '1️⃣ Read the Challenge Completely',
    explanation: 'Read problem statement twice, identify exact objective, output format, and rules.',
    subtasks: [
      'Read problem statement twice',
      'Identify exact objective',
      'Understand expected output format',
      'Check competition restrictions and rules'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moh_2',
    memberId: 'mohannad',
    title: '2️⃣ Understand the Metric',
    explanation: 'Identify competition metric, determine higher/lower direction, and build local implementation.',
    subtasks: [
      'Identify competition metric',
      'Determine whether higher score is better',
      'Understand mathematical formula & edge cases',
      'Build local implementation of metric',
      'Verify metric implementation'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moh_3',
    memberId: 'mohannad',
    title: '3️⃣ Define Validation Strategy',
    explanation: 'Inspect target distribution & group dependencies to choose optimal split scheme.',
    subtasks: [
      'Inspect target class distribution',
      'Detect time dependency or group IDs',
      'Detect target imbalance',
      'Choose split (KFold / StratifiedKFold / GroupKFold / TimeSeriesSplit)'
    ],
    priority: 'CRITICAL',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moh_4',
    memberId: 'mohannad',
    title: '4️⃣ Build Quick Baseline',
    explanation: 'Create simplest working pipeline, train baseline model, generate OOF predictions & initial submission.',
    subtasks: [
      'Create simplest working pipeline',
      'Train baseline model',
      'Generate Out-Of-Fold (OOF) predictions',
      'Calculate baseline CV score',
      'Generate first test submission file'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moh_5',
    memberId: 'mohannad',
    title: '5️⃣ Select Modeling Strategy',
    explanation: 'Evaluate candidate model families (CatBoost, LightGBM, XGBoost, Random Forest, Neural Networks).',
    subtasks: [
      'Evaluate CatBoost',
      'Evaluate LightGBM',
      'Evaluate XGBoost',
      'Evaluate Random Forest / ExtraTrees',
      'Select candidate model families'
    ],
    priority: 'MEDIUM',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moh_6',
    memberId: 'mohannad',
    title: '6️⃣ Run Controlled Experiments',
    explanation: 'Change one major variable at a time, record every experiment, compare CV scores.',
    subtasks: [
      'Change one major variable at a time',
      'Record every experiment in tracker',
      'Compare CV score & fold std',
      'Decide keep or reject change with reasoning'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moh_7',
    memberId: 'mohannad',
    title: '7️⃣ Monitor CV vs Leaderboard',
    explanation: 'Always compare local CV against Public Leaderboard to spot overfitting or validation drift.',
    subtasks: [
      'Compare local OOF CV against Public LB score',
      'Verify CV/LB alignment direction',
      'Check for possible leaderboard overfitting'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moh_8',
    memberId: 'mohannad',
    title: '8️⃣ Ensemble / Blend',
    explanation: 'Combine diverse high-performing models using weighted averaging, rank blending, or stacking.',
    subtasks: [
      'Check correlation matrix between OOF predictions',
      'Evaluate rank averaging & weighted average',
      'Optimize blending weights',
      'Test Stacking classifier'
    ],
    priority: 'MEDIUM',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moh_9',
    memberId: 'mohannad',
    title: '9️⃣ Final Model Decision',
    explanation: 'Select final candidate model based on CV stability, Red Team QA report, and data findings.',
    subtasks: [
      'Review best overall CV score & fold variance',
      'Review Dyaa Red Team QA clearance report',
      'Review Moayad data leakage report',
      'Select final submission candidate model'
    ],
    priority: 'CRITICAL',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moh_10',
    memberId: 'mohannad',
    title: '🔟 Final Submission',
    explanation: 'Verify prediction file schema, IDs, row count, null values, and submit before deadline.',
    subtasks: [
      'Verify prediction file matches required schema',
      'Check ID column alignment and row counts',
      'Confirm zero NaN or Infinity values exist',
      'Confirm predictions fall within valid range',
      'Save final version & log submission'
    ],
    priority: 'CRITICAL',
    completed: false,
    completedAt: null,
    notes: ''
  },

  // MOAYAD TASKS (10 tasks)
  {
    id: 'moa_1',
    memberId: 'moayad',
    title: '1️⃣ Dataset Sanity Check',
    explanation: 'Load train and test data, inspect shapes, columns, datatypes, and key identifiers.',
    subtasks: [
      'Load train and test datasets',
      'Check dataset shapes and feature count',
      'Check column names and datatypes',
      'Identify target column & ID columns'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moa_2',
    memberId: 'moayad',
    title: '2️⃣ Target Analysis',
    explanation: 'Analyze target distribution, class ratio, skewness, zero values, and extreme values.',
    subtasks: [
      'Identify target type',
      'Compute target class proportions',
      'Check for class imbalance',
      'Identify zero values or extreme anomalies'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moa_3',
    memberId: 'moayad',
    title: '3️⃣ Missing Values Analysis',
    explanation: 'Quantify missingness across columns, identify patterns, and determine imputation strategy.',
    subtasks: [
      'Calculate missing count & percentage per column',
      'Analyze missingness pattern',
      'Determine meaningful missing indicators'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moa_4',
    memberId: 'moayad',
    title: '4️⃣ Duplicate Analysis',
    explanation: 'Detect exact duplicate rows, duplicate IDs, or overlap between train and test datasets.',
    subtasks: [
      'Check exact duplicate rows in train',
      'Check duplicate IDs in train and test',
      'Check near-duplicate features across splits'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moa_5',
    memberId: 'moayad',
    title: '5️⃣ Categorical Features Audit',
    explanation: 'Examine cardinality, rare categories, and check for unseen values in test dataset.',
    subtasks: [
      'Identify categorical columns',
      'Compute unique value cardinality',
      'Find rare category categories',
      'Detect unseen category levels in test set'
    ],
    priority: 'MEDIUM',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moa_6',
    memberId: 'moayad',
    title: '6️⃣ Numerical Features Audit',
    explanation: 'Evaluate distributions, compute skewness, identify outliers, and check correlations.',
    subtasks: [
      'Compute skewness and kurtosis',
      'Detect extreme outliers',
      'Compute correlation matrix against target'
    ],
    priority: 'MEDIUM',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moa_7',
    memberId: 'moayad',
    title: '7️⃣ Leakage Investigation 🚨',
    explanation: 'Aggressively inspect for target leakage, future timestamp leakages, or ID ordering signals.',
    subtasks: [
      'Check target leakage in metadata/timestamps',
      'Check feature correlation with target > 0.95',
      'Inspect ID ordering correlation with target',
      'Verify group leakage across train/test'
    ],
    priority: 'CRITICAL',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moa_8',
    memberId: 'moayad',
    title: '8️⃣ Train vs Test Shift Analysis',
    explanation: 'Compare feature distributions between train and test using Adversarial Validation.',
    subtasks: [
      'Compare train vs test summary statistics',
      'Run Adversarial Validation classifier',
      'Identify high-drift features to drop or reweight'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moa_9',
    memberId: 'moayad',
    title: '9️⃣ Feature Engineering 🧩',
    explanation: 'Construct domain features (ratios, aggregations, frequency encodings, interactions).',
    subtasks: [
      'Create domain ratios & differences',
      'Compute group-by statistics (mean, std, min, max)',
      'Apply frequency encoding on high-cardinality features',
      'Generate polynomial / interaction terms'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'moa_10',
    memberId: 'moayad',
    title: '🔟 Data Report for Mohannad',
    explanation: 'Compile data findings, leakage warnings, and recommended CV setup into a structured report.',
    subtasks: [
      'Summarize train/test shape & target properties',
      'Highlight leakage risks & suspicious columns',
      'List engineered features ready for experimentation',
      'Send formal Data Report to Team HQ'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },

  // DYAA TASKS (8 tasks)
  {
    id: 'dya_1',
    memberId: 'dyaa',
    title: '1️⃣ Independent Challenge Reading',
    explanation: 'Read challenge rules independently without consulting team assumptions.',
    subtasks: [
      'Read problem description & metric independently',
      'Define problem objectives from scratch',
      'Identify non-obvious rules or constraints'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'dya_2',
    memberId: 'dyaa',
    title: '2️⃣ Rules & Restrictions Review',
    explanation: 'Verify competition rules for external data, pretrained models, runtime limits, submission caps.',
    subtasks: [
      'Check external dataset license requirements',
      'Verify pretrained model weight restrictions',
      'Confirm daily submission limit & reset time'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'dya_3',
    memberId: 'dyaa',
    title: '3️⃣ Validation Strategy Attack 🚨',
    explanation: 'Stress-test Mohannad CV split scheme for hidden group leakage, time bias, or duplicate rows.',
    subtasks: [
      'Check for time-series leakage in CV split',
      'Check for group ID leakage across folds',
      'Verify zero fold data leakage in preprocessors'
    ],
    priority: 'CRITICAL',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'dya_4',
    memberId: 'dyaa',
    title: '4️⃣ Metric Verification',
    explanation: 'Build parallel metric code independently and verify with synthetic edge cases.',
    subtasks: [
      'Write independent evaluation function',
      'Test metric on edge predictions',
      'Compare metric output with Mohannad pipeline'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'dya_5',
    memberId: 'dyaa',
    title: '5️⃣ Alternative Modeling Branch',
    explanation: 'Build parallel pipeline using alternative model family to ensure model diversity.',
    subtasks: [
      'Build independent preprocessing & model pipeline',
      'Train alternative model architecture',
      'Compare OOF predictions correlation'
    ],
    priority: 'MEDIUM',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'dya_6',
    memberId: 'dyaa',
    title: '6️⃣ Code & Pipeline Security Audit',
    explanation: 'Audit codebase for train-test contamination, seed instability, index bugs, or scaling errors.',
    subtasks: [
      'Audit preprocessing pipeline for test data leakage',
      'Verify random seeds across all scripts',
      'Check array index alignment & inverse transforms'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'dya_7',
    memberId: 'dyaa',
    title: '7️⃣ Submission QA Verification',
    explanation: 'Verify row counts, ID alignment, NaN/Inf checks, and range validation before uploading.',
    subtasks: [
      'Verify prediction file row count matches test shape',
      'Verify submission IDs match test sample submission',
      'Ensure zero NaN, null, or Inf values exist',
      'Confirm probability predictions sum to 1.0 per row',
      'Execute final SUBMISSION CLEARED protocol'
    ],
    priority: 'CRITICAL',
    completed: false,
    completedAt: null,
    notes: ''
  },
  {
    id: 'dya_8',
    memberId: 'dyaa',
    title: '8️⃣ Red Team Risk Report',
    explanation: 'Submit formal security & risk report detailing potential failure points to Team HQ.',
    subtasks: [
      'Document identified risks (Critical, Medium, Low)',
      'List verified components & alternative ideas',
      'Send formal Red Team Report to Team HQ'
    ],
    priority: 'HIGH',
    completed: false,
    completedAt: null,
    notes: ''
  }
];

export const INITIAL_EXPERIMENTS = [];

export const INITIAL_SUBMISSIONS = [];

export const INITIAL_BLOCKERS = [];

export const INITIAL_NOTES = [];

export const INITIAL_ACTIVITIES = [];
