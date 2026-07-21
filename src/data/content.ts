export const LINKS = {
  email: 'lohith.mothu7@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lohithmothu/',
  github: 'https://github.com/krishna-lohith',
  medium: 'https://medium.com/@krishnalohith77',
  deshmate: 'https://www.deshmate.com',
  porzolio: 'https://porzolio.vercel.app/',
  churnDemo: 'https://annclassificationchurn-srgf6gbtvlvj3aipqmz8r9.streamlit.app/',
  imdbDemo: 'https://rnn-imdb-review-classification-eunnmruxwtpattzw4pjqoa.streamlit.app/',
  churnRepo: 'https://github.com/krishna-lohith/ANN_Binary_Classification_Churn',
  imdbRepo: 'https://github.com/krishna-lohith/RNN-IMDB-Review-Classification',
  resume: '/Lohith_Mothukuri_Resume.pdf',
}

export const STATS = [
  { value: 1, suffix: 'M+', label: 'transactions scored daily', decimals: 0 },
  { value: 4, suffix: '+', label: 'years building ML systems', decimals: 0 },
  { value: 200, prefix: '<', suffix: 'ms', label: 'p95 inference latency', decimals: 0 },
  { value: 2, suffix: '', label: 'products shipped solo', decimals: 0 },
]

export interface Job {
  company: string
  role: string
  period: string
  location: string
  accent: 'cyan' | 'amber'
  bullets: { text: string; metric?: string }[]
}

export const EXPERIENCE: Job[] = [
  {
    company: 'Visa',
    role: 'Machine Learning Engineer - Gen AI',
    period: 'Aug 2024 - Present',
    location: 'Atlanta, GA',
    accent: 'cyan',
    bullets: [
      { text: 'Dispute-propensity models (XGBoost, Optuna) with probability scoring across 1M+ daily transactions', metric: '+12% precision' },
      { text: 'Anomaly-detection pipelines (Isolation Forest, PyTorch) strengthening fraud investigation', metric: '-15% false positives' },
      { text: 'Agentic RAG pipeline (LangChain, LangGraph, FAISS, GPT-4) with context-window optimization', metric: '-35% lookup time' },
      { text: 'AI-agent workflows with MCP, LLM outputs validated against JSON schemas via Pydantic', metric: '-25% malformed output' },
      { text: 'FastAPI models on AWS Lambda with Prometheus and drift monitoring', metric: '<200ms p95' },
    ],
  },
  {
    company: 'American Airlines',
    role: 'Data Scientist',
    period: 'Dec 2022 - Jul 2023',
    location: 'Hyderabad, India',
    accent: 'amber',
    bullets: [
      { text: 'Flight-cancellation classification on weather and crew data (XGBoost, Logistic Regression)', metric: '87% accuracy' },
      { text: 'Feature engineering and preprocessing pipelines with Scikit-learn', metric: '-18% training variance' },
      { text: 'Automated Airflow + S3 pipelines consolidating 5+ operational systems' },
      { text: 'Power BI dashboards tracking load-factor and fuel KPIs across 3+ hubs' },
    ],
  },
  {
    company: 'Concentrix',
    role: 'Senior Representative, Data Analyst - BFSI',
    period: 'Sep 2021 - Dec 2022',
    location: 'Hyderabad, India',
    accent: 'cyan',
    bullets: [
      { text: 'Quantitative analysis for 5+ enterprise BFSI clients across risk and compliance' },
      { text: 'Oracle SQL migration and Power Query ETL workflows', metric: '+25% query speed' },
      { text: 'Anomaly detection across 1M+ financial records, foundations for fraud modeling' },
      { text: 'Automated reporting with Excel macros and Power BI Service', metric: '-40% manual effort' },
    ],
  },
  {
    company: 'RealPage',
    role: 'Process Associate, Real Estate Analytics',
    period: 'Jul 2021 - Sep 2021',
    location: 'Hyderabad, India',
    accent: 'amber',
    bullets: [
      { text: 'Cleaned and validated real-estate transaction datasets with SQL quality checks' },
      { text: '15+ recurring leasing and operations reports', metric: '-30% prep time' },
    ],
  },
]

export const SKILL_GROUPS = [
  {
    title: 'Machine Learning',
    items: ['XGBoost', 'Scikit-learn', 'Optuna', 'Isolation Forest', 'Statistical Modeling', 'Clustering'],
  },
  {
    title: 'Deep Learning',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'ANN / RNN', 'Fine-Tuning', 'RLHF'],
  },
  {
    title: 'GenAI & LLM',
    items: ['LangChain', 'LangGraph', 'LlamaIndex', 'RAG / Agentic AI', 'GPT-4 / Claude', 'MCP', 'FAISS / Pinecone / ChromaDB', 'Hugging Face'],
  },
  {
    title: 'MLOps & Deployment',
    items: ['FastAPI', 'MLflow', 'DVC', 'Docker', 'Prometheus', 'Evidently AI', 'Pydantic', 'CI/CD'],
  },
  {
    title: 'Cloud & Data Eng',
    items: ['AWS (EC2, Lambda, S3)', 'Airflow', 'Databricks', 'DBT', 'Redshift', 'PostgreSQL'],
  },
  {
    title: 'Analytics & BI',
    items: ['Python', 'SQL', 'Power BI', 'DAX', 'Advanced Excel', 'Data Governance'],
  },
]

export const MARQUEE_ITEMS = [
  'PyTorch', 'LangChain', 'XGBoost', 'GPT-4', 'AWS', 'FastAPI', 'RAG', 'LangGraph',
  'TensorFlow', 'MLflow', 'FAISS', 'Docker', 'Airflow', 'Hugging Face', 'SQL', 'MCP',
]

export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  url: string
  badge?: string
  accent: 'cyan' | 'amber'
  features: string[]
  stack: string[]
  highlights: { label: string; value: string }[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'deshmate',
    name: 'DeshMate',
    tagline: 'Roommates who feel like home.',
    description:
      'A production roommate-matching marketplace for immigrant students and professionals across the US. Matches people by community, language, food, and lifestyle rather than just rent and location. Built, launched, and operated end to end by one person, shipping daily releases to real users.',
    url: 'https://www.deshmate.com',
    badge: 'Live - ML/AI integration in progress',
    accent: 'amber',
    features: [
      '36+ cultural and language communities across US metros',
      'Google OAuth and verified-email auth with photo listings',
      'Map-based search, saved rooms, reviews, and direct contact',
      'Admin moderation dashboard with automated removal emails',
      'Sub-second loads on a zero-framework stack with near-zero infra spend',
      'Currently integrating ML/AI: smarter matching and recommendations',
    ],
    stack: ['JavaScript (ES6)', 'Supabase', 'PostgreSQL + RLS', 'Vercel Serverless', 'Google OAuth 2.0', 'Resend API', 'Leaflet.js', 'GitHub Actions', 'Cloudflare'],
    highlights: [
      { label: 'Communities', value: '36+' },
      { label: 'Load time', value: '<1s' },
      { label: 'Releases', value: 'Daily' },
    ],
  },
  {
    slug: 'porzolio',
    name: 'Porzolio',
    tagline: 'Your work, beautifully arranged.',
    description:
      'A no-code portfolio builder where users drag, resize, and style blocks on a free-form canvas and publish instantly as a shareable public profile. Powered by a custom vanilla-JS canvas engine bridged into React, with multi-tenant data secured by Postgres Row Level Security.',
    url: 'https://porzolio.vercel.app/',
    badge: 'Beta - actively evolving',
    accent: 'cyan',
    features: [
      'Free-form canvas: drag, resize, z-order, undo, rich-text toolbar',
      'Blocks for text, links, images, video, audio, PDFs, and resumes',
      'Multi-page workspaces, starter templates, opt-in Explore directory',
      'Each site persisted as a single JSON block document with autosave',
      'Sanitized user HTML to prevent stored XSS',
      'Link enrichment via Microlink, YouTube Embed, and GitHub APIs',
    ],
    stack: ['Next.js 16', 'React 19', 'Supabase', 'PostgreSQL RLS', 'Vanilla JS canvas engine', 'Vercel'],
    highlights: [
      { label: 'Canvas engine', value: 'Custom' },
      { label: 'Auth', value: 'OAuth + magic link' },
      { label: 'Persistence', value: 'Autosave JSON' },
    ],
  },
]

export const ML_PROJECTS = [
  {
    name: 'Customer Churn Prediction',
    desc: 'ANN binary classifier for bank customer churn with feature engineering and hyperparameter tuning.',
    stack: 'TensorFlow / Keras / Scikit-learn',
    repo: LINKS.churnRepo,
    demo: LINKS.churnDemo,
  },
  {
    name: 'IMDB Sentiment Analysis',
    desc: 'SimpleRNN text classifier with tokenization and embedding layers for binary sentiment.',
    stack: 'TensorFlow / Keras / NLP',
    repo: LINKS.imdbRepo,
    demo: LINKS.imdbDemo,
  },
]

export const IMPACT_METRICS = [
  { label: 'Dispute-model precision lift', value: 12, unit: '%', dir: 'up' as const },
  { label: 'False positives reduced', value: 15, unit: '%', dir: 'down' as const },
  { label: 'Policy lookup time cut', value: 35, unit: '%', dir: 'down' as const },
  { label: 'Malformed LLM output cut', value: 25, unit: '%', dir: 'down' as const },
  { label: 'Manual reporting effort cut', value: 40, unit: '%', dir: 'down' as const },
]
