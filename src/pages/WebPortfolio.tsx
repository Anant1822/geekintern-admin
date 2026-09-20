import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Globe,
  ExternalLink,
  Search,
  Sparkles,
  Github,
  Code2,
  Cpu,
  Database,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
  Server,
  Zap,
  ShieldCheck,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

interface WebProject {
  id: string
  title: string
  subtitle: string
  category: string
  industry: string
  description: string
  keyFeatures: string[]
  metrics: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl: string
  featured?: boolean
}

const WEB_PROJECTS: WebProject[] = [
  {
    id: 'pulse-ai-agent-workflow',
    title: 'Pulse AI — Autonomous Document & Contract Intelligence',
    subtitle: 'Production RAG Pipeline with Semantic Vector Search',
    category: 'AI & SaaS',
    industry: 'Enterprise LegalTech',
    description:
      'Engineered a multi-tenant generative AI platform that ingests complex PDF legal contracts, parses unstructured clauses using LangChain and pgvector embeddings, and produces cited risk summaries in real time.',
    keyFeatures: [
      'Retrieval-Augmented Generation (RAG) using OpenAI & pgvector',
      'Streaming token responses via WebSockets / Server-Sent Events',
      'Role-Based Access Control (RBAC) with secure tenant isolation',
      'Background celery/bull queue for async bulk file processing'
    ],
    metrics: '10x Faster Audit Review • 94% Search Precision',
    technologies: ['React 18', 'FastAPI', 'Python', 'LangChain', 'pgvector', 'PostgreSQL', 'Docker'],
    liveUrl: 'https://github.com/geekintern-internships/pulse-ai-agent',
    githubUrl: 'https://github.com/geekintern-internships/pulse-ai-agent',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'aether-cloud-observability',
    title: 'Aether Cloud Observability & Kubernetes Cluster Monitor',
    subtitle: 'Real-Time Telemetry Dashboard with Distributed Anomaly Detection',
    category: 'SaaS Dashboard',
    industry: 'Cloud DevOps',
    description:
      'Built a distributed telemetry visualizer capturing memory, CPU spikes, Docker container health, and HTTP error rates across microservices clusters. Features custom Chart.js dashboards and instant Slack webhook alerting.',
    keyFeatures: [
      'High-frequency WebSocket metric telemetry pipeline',
      'Interactive time-series charting with timeline zoom & brush',
      'Configurable latency threshold alerts with webhook dispatch',
      'Lightweight Docker daemon collector agent integration'
    ],
    metrics: '< 15ms Render Tick • Zero Memory Leak',
    technologies: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Chart.js', 'Docker', 'Tailwind CSS'],
    liveUrl: 'https://github.com/geekintern-internships/cloud-metrics',
    githubUrl: 'https://github.com/geekintern-internships/cloud-metrics',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'skillcraft-interactive-lms',
    title: 'SkillCraft — Interactive Coding LMS & Sandbox Runtime',
    subtitle: 'Real-Time Browser Code Execution with Automated Test Suites',
    category: 'EdTech',
    industry: 'Developer Education',
    description:
      'Full-stack learning management ecosystem with in-browser Monaco code editor, automated unit test validation, video streaming with resume playback, and cryptographic certificate dispatch upon course completion.',
    keyFeatures: [
      'Isolated browser sandbox executing JavaScript/Python tests',
      'Chunked video streaming with resume-state bookmarking',
      'Interactive peer forum discussion threads with Markdown',
      'Automated verifiable Certificate generation with unique CID'
    ],
    metrics: '50K+ Code Submissions • 99.9% Uptime',
    technologies: ['Next.js 14', 'Prisma ORM', 'PostgreSQL', 'Monaco Editor', 'AWS S3', 'Tailwind CSS'],
    liveUrl: 'https://github.com/geekintern-internships/skillcraft-lms',
    githubUrl: 'https://github.com/geekintern-internships/skillcraft-lms',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'prime-estate-marketplace',
    title: 'PrimeEstate — Geospatial Real Estate & Rental Portal',
    subtitle: 'Map-Driven Property Marketplace with Mortgage Simulation',
    category: 'Marketplace',
    industry: 'PropTech & Housing',
    description:
      'Interactive housing and commercial real estate platform featuring Mapbox GL cluster visualization, dynamic boundary polygons, instant mortgage amortization calculators, and verified owner inquiries.',
    keyFeatures: [
      'Mapbox GL vector tile clustering with smooth pan & zoom',
      'Multi-filter property queries (price per sqft, amenities, locality)',
      'Direct WhatsApp inquiry deep linking & verified agent badges',
      'Real-time mortgage loan payment calculation schedules'
    ],
    metrics: 'Sub-100ms Map Query • 40+ Filter Combos',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB Atlas', 'Mapbox GL', 'Redux Toolkit'],
    liveUrl: 'https://github.com/geekintern-internships/estate-flow',
    githubUrl: 'https://github.com/geekintern-internships/estate-flow',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'caresync-telemed-system',
    title: 'CareSync — HIPAA-Compliant Telehealth & EHR Platform',
    subtitle: 'Peer-to-Peer Video Consultations with Encrypted Prescriptions',
    category: 'HealthTech',
    industry: 'Healthcare & Clinical',
    description:
      'Secure telehealth consultation portal connecting patients and medical specialists. Features WebRTC peer-to-peer encrypted video, calendar slot booking, digital PDF prescription generation, and audit logging.',
    keyFeatures: [
      'End-to-end WebRTC video consults with crystal audio',
      'Doctor slot availability management with calendar sync',
      'Automated digital prescription generation with doctor signature',
      'Strict audit trails complying with health privacy standards'
    ],
    metrics: 'E2E Encryption • 100% Audit Traceable',
    technologies: ['React', 'WebRTC', 'Node.js', 'PostgreSQL', 'Socket.io', 'Tailwind CSS'],
    liveUrl: 'https://github.com/geekintern-internships/caresync-portal',
    githubUrl: 'https://github.com/geekintern-internships/caresync-portal',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'finflow-banking-ledger',
    title: 'FinFlow — Double-Entry Financial Ledger & Payment Gateway',
    subtitle: 'ACID-Compliant Transaction Accounting with Audit Reconciler',
    category: 'FinTech',
    industry: 'Banking & Financial',
    description:
      'High-reliability banking ledger ensuring mathematical zero-sum balancing across multi-currency accounts. Features automated PDF statement extraction, fraud risk rule engine, and Razorpay webhook reconciliation.',
    keyFeatures: [
      'Double-entry bookkeeping engine with strict PostgreSQL constraints',
      'Real-time fraud rule scoring and anomaly flag triggers',
      'Automated monthly PDF bank statement generation',
      'Complete idempotency keys preventing duplicate transactions'
    ],
    metrics: 'Zero Reconciliation Drift • ACID Compliant',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Razorpay', 'Tailwind CSS'],
    liveUrl: 'https://github.com/geekintern-internships/finflow-ledger',
    githubUrl: 'https://github.com/geekintern-internships/finflow-ledger',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'devcollab-kanban-suite',
    title: 'DevCollab — Real-Time Agile Sprint Suite & Task Canvas',
    subtitle: 'Collaborative Kanban Board with Optimistic Offline Sync',
    category: 'SaaS Dashboard',
    industry: 'Productivity & Tech',
    description:
      'Collaborative project workspace enabling engineering squads to manage sprints, drag-and-drop ticket backlogs, assign GitHub pull requests, and track sprint velocity charts with multi-user cursor sync.',
    keyFeatures: [
      'Drag-and-drop Kanban task lanes with optimistic UI updates',
      'Multiplayer presence indicator showing active teammate avatars',
      'Markdown task descriptions with code snippet syntax highlighting',
      'Sprint burndown charts and velocity estimation metrics'
    ],
    metrics: '60fps Drag Experience • Sub-30ms Sync',
    technologies: ['React 18', 'Zustand', 'Node.js', 'Socket.io', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://github.com/geekintern-internships/devcollab-kanban',
    githubUrl: 'https://github.com/geekintern-internships/devcollab-kanban',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'cryptotrack-portfolio-pro',
    title: 'CryptoTrack — Real-Time Decentralized Asset Tracker',
    subtitle: 'Live WebSocket Price Feeds with Web3 Wallet Analytics',
    category: 'FinTech',
    industry: 'Web3 & Blockchain',
    description:
      'Comprehensive crypto portfolio management platform streaming live Binance and CoinGecko order books, calculating profit/loss tax breakdowns, and monitoring Ethereum smart contract token holdings.',
    keyFeatures: [
      'Low-latency WebSocket streaming feeds for live tick updates',
      'Ethers.js integration for reading on-chain token balances',
      'Automated FIFO tax profit & loss calculation reports',
      'Custom price alert triggers delivered directly via Web Push'
    ],
    metrics: '1,000+ Tokens Tracked • Live Tick Streaming',
    technologies: ['React', 'TypeScript', 'WebSockets', 'Ethers.js', 'Chart.js', 'Tailwind CSS'],
    liveUrl: 'https://github.com/geekintern-internships/cryptotrack-pro',
    githubUrl: 'https://github.com/geekintern-internships/cryptotrack-pro',
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=900&auto=format&fit=crop',
  }
]

const CATEGORIES = ['All Projects', 'E-Commerce', 'AI & SaaS', 'SaaS Dashboard', 'EdTech', 'Marketplace', 'HealthTech', 'FinTech']

const ARCHITECTURE_PILLARS = [
  {
    title: 'Production-Grade Architecture',
    desc: 'Every project follows clean repository structures, modular TypeScript types, strict linting, and scalable database schemas.',
    icon: Server
  },
  {
    title: 'Real-World Deliverables',
    desc: 'No theoretical toy examples. Learners build platforms with authentication, state machines, payment webhooks, and live deployments.',
    icon: Code2
  },
  {
    title: 'Verified GitHub Commit Proof',
    desc: 'Each student showcases transparent git commit milestones, PR reviews, and detailed README documentation recruiters love.',
    icon: Github
  },
  {
    title: 'Industry-Standard Tooling',
    desc: 'Built using modern engineering stacks: Next.js 14, React 18, PostgreSQL, Tailwind CSS, Redis, Docker, and Supabase.',
    icon: Zap
  }
]

export function WebPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All Projects')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = WEB_PROJECTS.filter((proj) => {
    const matchesCat = selectedCategory === 'All Projects' || proj.category === selectedCategory
    const matchesSearch =
      !searchQuery ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      proj.industry.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <PublicLayout>
      <PageTitle title="Production Web Development Portfolio | Geek Intern" />

      {/* Hero Header */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/40 text-slate-900 border-b border-slate-200">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-widest text-[11px] mb-4 px-3 py-1 font-semibold">
            Engineering Excellence & Capstones
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-950">
            Web Development <span className="text-blue-600">Portfolio</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Explore battle-tested full-stack web applications, microservices, and AI-enabled software architectures engineered by Geek Intern developers and verified interns.
          </p>

          {/* Key Stats Bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="text-2xl font-extrabold text-slate-900">100%</div>
              <div className="text-xs font-semibold text-blue-600 mt-0.5">Production Code</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="text-2xl font-extrabold text-slate-900">Next.js 14</div>
              <div className="text-xs font-semibold text-blue-600 mt-0.5">Modern App Router</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="text-2xl font-extrabold text-slate-900">PostgreSQL</div>
              <div className="text-xs font-semibold text-blue-600 mt-0.5">Relational Schemas</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <div className="text-2xl font-extrabold text-slate-900">Verified</div>
              <div className="text-xs font-semibold text-blue-600 mt-0.5">GitHub Repositories</div>
            </div>
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto mt-10 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by tech or keyword (e.g. Next.js, Stripe, Docker, AI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-2xl shadow-sm text-sm focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Category Pills & Project Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-6 font-medium">
            <span>Showing <strong className="text-slate-900 font-bold">{filteredProjects.length}</strong> engineering projects</span>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-blue-600 hover:underline">
                Clear search
              </button>
            )}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group rounded-3xl bg-white border border-slate-200 hover:border-blue-300 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-xs"
              >
                <div>
                  {/* Image with overlay badge */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-900 border border-slate-200 shadow-xs">
                      {project.category}
                    </div>
                    {project.featured && (
                      <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
                        Featured Build
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 font-medium">
                      <span>Industry: <strong className="text-slate-800">{project.industry}</strong></span>
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                        Verified Capstone
                      </span>
                    </div>

                    <h2 className="text-lg font-extrabold text-slate-950 mb-1.5 group-hover:text-blue-600 transition-colors leading-snug">
                      {project.title}
                    </h2>

                    <p className="text-xs font-semibold text-blue-600 mb-3">
                      {project.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Key Architectural Highlights */}
                    <div className="mb-5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Engineering Capabilities</div>
                      {project.keyFeatures.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-700 leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Performance / Architectural Metric */}
                    <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold text-slate-700 bg-blue-50/70 border border-blue-100 rounded-lg px-3 py-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{project.metrics}</span>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 mt-2">
                  <div className="flex items-center gap-2 pt-4">
                    <Link
                      to={`/apply?domain=Full Stack Web Development`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-xs font-semibold transition-colors shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Build Similar Project</span>
                    </Link>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Architectural Pillars Section */}
          <div className="mt-24 pt-16 border-t border-slate-200">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <Badge className="bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-widest text-[11px] mb-3 px-3 py-1 font-semibold">
                Geek Intern Standard
              </Badge>
              <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                How Our Learners Build Industry-Grade Software
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                We eliminate boilerplate fluff and provide direct exposure to production engineering requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ARCHITECTURE_PILLARS.map((p, idx) => {
                const Icon = p.icon
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/90 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mb-2">{p.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-20 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-8 md:p-14 text-center max-w-4xl mx-auto shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-4xl font-extrabold mb-3 text-white tracking-tight">
                Ready to Build Your Own Production Portfolio?
              </h3>
              <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                Enroll in the Geek Intern Web Development Virtual Internship track. Build full-stack applications with verified GitHub code proofs and earn your industry credential.
              </p>
              <Link to="/apply?domain=Full Stack Web Development">
                <Button className="h-12 px-8 rounded-full bg-white hover:bg-slate-100 text-blue-700 font-bold text-xs shadow-md">
                  Apply for Web Internship Now →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default WebPortfolio
