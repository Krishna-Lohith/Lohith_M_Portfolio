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
  { value: 4, suffix: '+', label: 'years across data, ML, and GenAI', decimals: 0 },
  { value: 95, suffix: '%+', label: 'CodeGenie retrieval accuracy', decimals: 0 },
  { value: 20, prefix: '-', suffix: '%', label: 'GenAI operating cost cut', decimals: 0 },
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
    role: 'AI/ML Engineer',
    period: 'Aug 2024 - Present',
    location: 'Atlanta, GA',
    accent: 'cyan',
    bullets: [
      { text: 'Fraud- and anomaly-detection models (XGBoost, Optuna, Isolation Forest, PyTorch) with probability scoring for transaction risk and dispute propensity, plus MLflow-tracked MLOps from training to deployment', metric: '+12% precision' },
      { text: 'Fine-tuned foundation LLMs (GPT-4, Claude) for financial-risk and regulatory-compliance tasks using LoRA, QLoRA, and PEFT, with a benchmarking harness measuring accuracy, latency, and cost' },
      { text: "Shipped Visa's first GenAI-powered BI chatbot end to end, grounding answers on live transaction data via RAG, vector databases, and function calling, with multi-provider inference across GPT, Claude, and LLaMA" },
      { text: 'Text2SQL agent turning natural language into daily reporting, integrated with Power BI so users see conversational answers beside visual transaction trends', metric: '-40% data-team reliance' },
      { text: 'Operational Assistant on LangGraph and AWS Bedrock that auto-triages and routes tickets, plus ReAct agents pulling real-time logs for LLM root-cause analysis, governed by human-in-the-loop gates', metric: 'lower MTTR' },
      { text: 'Multi-agent workflows (LangGraph, CrewAI, Semantic Kernel) wired to Jira, Confluence, GitHub, Checkmarx, Nexus IQ, and CI/CD through a custom MCP integration layer with PR-aware security remediation' },
      { text: 'Built an MCP Registry and Agent-2-Agent (A2A) Registry as the single source of truth for deployed MCP servers and agents, with A2A protocol support for cross-agent orchestration' },
      { text: 'Routed tasks across models by complexity (open-source, Claude Code, Codex) while holding quality steady, verified through the benchmarking harness', metric: '-20% GenAI cost' },
      { text: 'Production observability and AI governance: deterministic and LLM-as-judge graders, LangSmith tracing, audit logging, and circuit-breaker guardrails', metric: '-30% review effort' },
      { text: 'CodeGenie, a RAG-based enterprise code-and-architecture search using embedding retrieval and knowledge-graph injection, served via FastAPI on AWS (Bedrock, SageMaker, OpenSearch)', metric: '95%+ accuracy' },
      { text: 'Deployed the agentic platform on Kubernetes (Amazon EKS/ECS) with Docker and Terraform, moving services off VMs and onboarding engineers through MCP and A2A walkthroughs' },
    ],
  },
  {
    company: 'American Airlines',
    role: 'Data Scientist',
    period: 'Dec 2022 - Jul 2023',
    location: 'Hyderabad, India',
    accent: 'amber',
    bullets: [
      { text: 'Flight-cancellation classification on weather and crew data (XGBoost, Logistic Regression), enabling proactive operational planning', metric: '87% accuracy' },
      { text: 'Feature engineering and preprocessing (Pandas, NumPy, SciPy, Scikit-learn) with encoding, scaling, and outlier handling', metric: '-18% training variance' },
      { text: 'Cross-validation and ROC-AUC tuning of classification thresholds, balancing false cancellations against missed disruptions' },
      { text: 'Automated Airflow + S3 ETL pipelines with validation checks, consolidating 5+ operational systems into model-ready datasets' },
      { text: 'Flask REST API with scheduled batch scoring and drift monitoring to hold accuracy as seasonal flight patterns shifted' },
      { text: 'Power BI dashboards (DAX, Redshift, DBT) tracking load-factor and fuel KPIs across 3+ hubs' },
    ],
  },
  {
    company: 'Concentrix',
    role: 'Senior Representative, Data Analyst - BFSI',
    period: 'Sep 2021 - Dec 2022',
    location: 'Hyderabad, India',
    accent: 'cyan',
    bullets: [
      { text: 'Quantitative analysis and reporting for 5+ enterprise BFSI clients across risk, compliance, and operations' },
      { text: 'Oracle SQL migration and Power Query ETL workflows', metric: '+25% query speed' },
      { text: '10+ interactive Power BI dashboards (DAX, data modeling) accelerating finance-stakeholder decisions' },
      { text: 'EDA and feature engineering detecting anomalies across 1M+ financial records, building foundations for fraud modeling' },
      { text: 'Automated reporting (Excel macros, Power BI Service) with data-quality and governance frameworks', metric: '-40% manual effort' },
    ],
  },
  {
    company: 'RealPage',
    role: 'Process Associate, Real Estate Analytics',
    period: 'Jul 2021 - Sep 2021',
    location: 'Hyderabad, India',
    accent: 'amber',
    bullets: [
      { text: 'Cleaned and validated real-estate transaction datasets with Excel and SQL data-quality checks' },
      { text: '15+ recurring leasing and operations reports in Excel and Google Sheets', metric: '-30% prep time' },
    ],
  },
]

export const SKILL_GROUPS = [
  {
    title: 'Generative & Agentic AI',
    items: ['RAG', 'Multi-Agent Workflows', 'ReAct Agents', 'Function Calling', 'LoRA / QLoRA / PEFT', 'Prompt Engineering', 'Guardrails', 'Human-in-the-Loop', 'Knowledge Graphs'],
  },
  {
    title: 'LLM & Agent Frameworks',
    items: ['LangChain', 'LangGraph', 'LangSmith', 'CrewAI', 'Semantic Kernel', 'MCP', 'A2A Protocol', 'GPT-4 / Claude / LLaMA', 'FAISS / Pinecone / ChromaDB'],
  },
  {
    title: 'Machine Learning',
    items: ['XGBoost', 'Scikit-learn', 'Optuna', 'Isolation Forest', 'Logistic Regression', 'Feature Engineering', 'Anomaly Detection', 'Statistical Modeling'],
  },
  {
    title: 'Deep Learning & NLP',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'ANN / RNN', 'NLP', 'Tokenization', 'Embeddings'],
  },
  {
    title: 'MLOps, Cloud & Deployment',
    items: ['AWS Bedrock', 'SageMaker', 'OpenSearch', 'Lambda / S3 / EC2', 'FastAPI', 'Flask', 'MLflow', 'Docker', 'Kubernetes (EKS/ECS)', 'Terraform', 'CI/CD', 'Observability'],
  },
  {
    title: 'Data Engineering & BI',
    items: ['Python', 'SQL (PostgreSQL, MySQL, Oracle)', 'Apache Airflow', 'DBT', 'Redshift', 'ETL Pipelines', 'Power BI / DAX', 'Data Governance'],
  },
]

export const MARQUEE_ITEMS = [
  'LangGraph', 'MCP', 'AWS Bedrock', 'RAG', 'CrewAI', 'PyTorch', 'XGBoost', 'A2A',
  'LangChain', 'Terraform', 'Claude', 'FastAPI', 'Kubernetes', 'LoRA', 'SageMaker', 'MLflow',
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
      'Zero-framework stack: sub-second loads, near-zero infra spend',
      'CDN edge deploys with CI smoke tests and uptime alerting',
    ],
    stack: ['JavaScript (ES6)', 'Supabase', 'PostgreSQL + RLS', 'Vercel Serverless', 'Google OAuth 2.0', 'Resend API', 'Leaflet.js', 'GitHub Actions', 'Cloudflare DNS'],
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
      'Multi-tenant security via RLS and Supabase Auth, HTML sanitized against stored XSS',
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

export const EDUCATION = [
  {
    degree: 'MS, Computer Science',
    school: 'Auburn University at Montgomery',
    location: 'Montgomery, AL',
    period: '2023 - 2025',
  },
  {
    degree: 'BTech, Electronics & Communication Engineering',
    school: 'Anurag University',
    location: 'India',
    period: '2016 - 2020',
  },
]

export const IMPACT_METRICS = [
  { label: 'CodeGenie retrieval accuracy', value: 95, unit: '%', dir: 'up' as const },
  { label: 'Data-team reliance for reporting cut', value: 40, unit: '%', dir: 'down' as const },
  { label: 'Developer code-review effort cut', value: 30, unit: '%', dir: 'down' as const },
  { label: 'GenAI operating cost cut', value: 20, unit: '%', dir: 'down' as const },
  { label: 'Fraud-detection precision lift', value: 12, unit: '%', dir: 'up' as const },
]
