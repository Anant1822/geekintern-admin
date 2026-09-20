import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Star,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  Code2,
  Terminal,
  Cpu,
  Globe,
  Database,
  Smartphone,
  ChevronRight,
  FileText,
  TrendingUp,
  BrainCircuit,
  Bot,
  UserCheck,
  MailCheck,
  GitBranch,
  BadgeCheck,
  Zap,
  Briefcase,
  Users,
  Compass,
  Check,
  Server,
  Cloud,
  BarChart3,
  Wrench,
  BatteryCharging,
  Network,
  CircuitBoard,
  Gauge,
  Building2,
  Palette,
  X,
  QrCode,
  MessageCircle,
  HelpCircle,
  Mail,
  MessageSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

const STATS = [
  { target: 80000, decimals: 0, suffix: '+', label: 'Students Joined', sub: 'Across 500+ colleges' },
  { target: 6500, decimals: 0, suffix: '+', label: 'Certificates Issued', sub: 'Independently verified credentials' },
  { target: 750, decimals: 0, suffix: '+', label: 'Clients', sub: 'Corporate & startup partners' },
  { target: 250, decimals: 0, suffix: '+', label: 'Teams', sub: 'Active engineering project squads' },
]

function AnimatedStat({
  target,
  decimals = 0,
  suffix = '',
  duration = 1800,
}: {
  target: number
  decimals?: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const frameRate = 1000 / 60
    const totalFrames = Math.round(duration / frameRate)
    let frame = 0

    const timer = setInterval(() => {
      frame++
      // easeOutExpo function for smooth counting
      const progress = 1 - Math.pow(2, -10 * (frame / totalFrames))
      const currentVal = target * Math.min(progress, 1)

      if (frame >= totalFrames) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(currentVal)
      }
    }, frameRate)

    return () => clearInterval(timer)
  }, [hasStarted, target, duration])

  const formattedValue =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.floor(count).toLocaleString('en-US')

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
      {formattedValue}
      {suffix}
    </div>
  )
}

const PROGRESSION_COMPANIES = [
  { name: 'Google', domain: 'Cloud & Web' },
  { name: 'Microsoft', domain: 'Full Stack' },
  { name: 'Amazon', domain: 'AWS & DevOps' },
  { name: 'TCS', domain: 'Enterprise Software' },
  { name: 'Infosys', domain: 'AI & Data' },
  { name: 'Wipro', domain: 'Cloud Infra' },
  { name: 'Accenture', domain: 'Digital Engineering' },
  { name: 'Cognizant', domain: 'Systems Engineering' },
  { name: 'Capgemini', domain: 'Mobile & Cloud' },
  { name: 'IBM', domain: 'AI & Security' },
  { name: 'Oracle', domain: 'Database & Java' },
  { name: 'Deloitte', domain: 'Data Analytics' },
]

const CATEGORY_TABS = [
  'All Programs',
  'Software & Web',
  'AI & Data',
  'Cloud & DevOps',
  'Design & Creative',
  'Core Engineering',
  'Embedded & IoT',
]

const DOMAIN_PROGRAMS = [
  // 1. Web & Software Engineering
  {
    title: 'Frontend Development',
    category: 'Software & Web',
    description: 'Build responsive, modern web interfaces using HTML5, CSS3, modern JavaScript (ES6+), and React.js.',
    badge: 'Popular',
    icon: Globe,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    title: 'Backend Development',
    category: 'Software & Web',
    description: 'Design robust server architectures, RESTful APIs, JWT authentication, and relational schemas with Node.js and Express.',
    badge: 'In Demand',
    icon: Server,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    title: 'Full Stack Development',
    category: 'Software & Web',
    description: 'Master end-to-end applications by uniting React frontends with PostgreSQL, REST APIs, and Node backends.',
    badge: 'Comprehensive',
    icon: Code2,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
  {
    title: 'Web Development',
    category: 'Software & Web',
    description: 'Create interactive websites, dynamic landing pages, and responsive portals using web design fundamentals.',
    badge: 'Foundational',
    icon: Globe,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
  },
  {
    title: 'Android App Development',
    category: 'Software & Web',
    description: 'Engineer native mobile applications for Android with Kotlin, Jetpack Compose, state management, and REST integrations.',
    badge: 'Mobile',
    icon: Smartphone,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    title: 'Python Programming',
    category: 'Software & Web',
    description: 'Write clean, modular code for algorithmic problems, backends, automation scripts, and file processing systems.',
    badge: 'Versatile',
    icon: Terminal,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    title: 'Java Programming',
    category: 'Software & Web',
    description: 'Learn enterprise software development, object-oriented design patterns, multithreading, and scalable backend structures.',
    badge: 'Enterprise',
    icon: Cpu,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  {
    title: 'C++ Programming',
    category: 'Software & Web',
    description: 'Build high-performance applications, low-latency system software, and data structures using modern C++ and STL.',
    badge: 'Systems',
    icon: Terminal,
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    border: 'border-slate-200',
  },
  {
    title: 'C Programming',
    category: 'Software & Web',
    description: 'Master pointers, memory management, algorithmic problem solving, and low-level computing architectures.',
    badge: 'Core Tech',
    icon: Terminal,
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    title: 'Blockchain Development',
    category: 'Software & Web',
    description: 'Build decentralized applications (dApps), cryptographic protocols, and Solidity smart contracts on EVM networks.',
    badge: 'Web3',
    icon: Code2,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },

  // 2. AI, Machine Learning & Data
  {
    title: 'Artificial Intelligence',
    category: 'AI & Data',
    description: 'Develop intelligent systems capable of natural language processing, LLM agent workflows, and cognitive reasoning.',
    badge: 'Cutting Edge',
    icon: BrainCircuit,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    title: 'Machine Learning',
    category: 'AI & Data',
    description: 'Train predictive models, implement neural networks, tune hyperparameters, and solve classification challenges.',
    badge: 'High Impact',
    icon: Bot,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-100',
  },
  {
    title: 'Data Science',
    category: 'AI & Data',
    description: 'Extract actionable insights from complex datasets using statistical modeling, Pandas, NumPy, and Scikit-Learn.',
    badge: 'Analytics',
    icon: TrendingUp,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
  },
  {
    title: 'Data Analytics',
    category: 'AI & Data',
    description: 'Perform exploratory data analysis, clean structured datasets, run SQL queries, and generate analytical executive summaries.',
    badge: 'Business Tech',
    icon: BarChart3,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    title: 'Power BI',
    category: 'AI & Data',
    description: 'Build interactive executive business dashboards, DAX queries, and KPI reports for enterprise business intelligence.',
    badge: 'BI Suite',
    icon: BarChart3,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-100',
  },

  // 3. Cloud, DevOps & Security
  {
    title: 'Cloud Computing',
    category: 'Cloud & DevOps',
    description: 'Architect scalable cloud environments, virtual instances, serverless computing, and distributed storage systems.',
    badge: 'Cloud Infra',
    icon: Cloud,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
  },
  {
    title: 'AWS Cloud',
    category: 'Cloud & DevOps',
    description: 'Deploy resilient cloud architectures with AWS EC2, S3, IAM security roles, Lambda functions, and RDS databases.',
    badge: 'AWS Certified',
    icon: Cloud,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  {
    title: 'DevOps',
    category: 'Cloud & DevOps',
    description: 'Automate CI/CD pipelines, Docker containerization, Kubernetes clustering, and infrastructure monitoring.',
    badge: 'Automation',
    icon: Sparkles,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
  {
    title: 'Cyber Security',
    category: 'Cloud & DevOps',
    description: 'Protect web applications and infrastructure through vulnerability assessment, network defense, and penetration testing.',
    badge: 'Security',
    icon: ShieldCheck,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },

  // 4. Design & Creative
  {
    title: 'UI/UX Design',
    category: 'Design & Creative',
    description: 'Craft intuitive user experiences, interactive prototypes, design systems, and mobile wireframes using modern Figma.',
    badge: 'Creative',
    icon: Layers,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
  },
  {
    title: 'Graphic Designing',
    category: 'Design & Creative',
    description: 'Create compelling visual assets, digital branding, marketing graphics, vector illustrations, and typography compositions.',
    badge: 'Visual Arts',
    icon: Palette,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },

  // 5. Core Engineering & Simulation
  {
    title: 'Civil Engineering & Structural Design',
    category: 'Core Engineering',
    description: 'Analyze structural loads, foundation designs, concrete modeling, and civil architectural drawings.',
    badge: 'Civil Eng',
    icon: Building2,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    title: 'Mechanical Design & Simulation',
    category: 'Core Engineering',
    description: 'Model mechanical assemblies, stress analyses, thermal simulations, and kinematic mechanisms for fabrication.',
    badge: 'Mechanical',
    icon: Wrench,
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    border: 'border-slate-200',
  },
  {
    title: 'AutoCAD',
    category: 'Core Engineering',
    description: 'Generate precision 2D drafting schematics and 3D architectural/mechanical layouts to industrial drafting standards.',
    badge: 'Drafting',
    icon: Layers,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
  {
    title: 'MATLAB',
    category: 'Core Engineering',
    description: 'Implement mathematical matrix computations, dynamic signal processing, and control system simulations.',
    badge: 'Scientific',
    icon: Gauge,
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    title: 'Electric Vehicle Technology (EV)',
    category: 'Core Engineering',
    description: 'Explore battery management systems (BMS), electric powertrains, regenerative braking, and EV charging architectures.',
    badge: 'Future Tech',
    icon: BatteryCharging,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },

  // 6. Embedded Systems, Hardware & IoT
  {
    title: 'VLSI Design',
    category: 'Embedded & IoT',
    description: 'Design digital logic circuits, Verilog/VHDL hardware architectures, FPGA synthesis, and semiconductor layout verification.',
    badge: 'Semiconductor',
    icon: Cpu,
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    title: 'Embedded Systems & IoT',
    category: 'Embedded & IoT',
    description: 'Interface microcontrollers with sensors, wireless telemetry protocols, and cloud IoT dashboards.',
    badge: 'Embedded',
    icon: Network,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-100',
  },
  {
    title: 'Embedded Systems with Arduino',
    category: 'Embedded & IoT',
    description: 'Build real embedded prototypes with C++, Arduino boards, PWM motor drivers, LCDs, and environmental sensors.',
    badge: 'Hardware',
    icon: CircuitBoard,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
  },
  {
    title: 'IoT Fundamentals',
    category: 'Embedded & IoT',
    description: 'Learn connected sensor architectures, MQTT/HTTP protocols, edge device communications, and cloud data collection.',
    badge: 'Connected',
    icon: Network,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    title: 'PLC & SCADA',
    category: 'Embedded & IoT',
    description: 'Program industrial automation ladder logic, PLC hardware interfacing, and SCADA supervisory control screens.',
    badge: 'Automation',
    icon: Gauge,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    title: 'PCB Design',
    category: 'Embedded & IoT',
    description: 'Create multi-layer circuit schematics, component footprints, routing topologies, and Gerber files using EDA software.',
    badge: 'Electronics',
    icon: CircuitBoard,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
]

const JOURNEY_STEPS = [
  {
    step: '01',
    word: 'Apply',
    tagline: 'Instant Registration',
    icon: UserCheck,
    quote: '“Every great career begins with a single decisive step.”',
    detail: 'Choose your desired specialization from 32+ tech tracks and submit your details in under 2 minutes with no gatekeeping.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    step: '02',
    word: 'Onboard',
    tagline: 'Offer & Task Dossier',
    icon: MailCheck,
    quote: '“Clarity precedes mastery. Know what to build and why.”',
    detail: 'Receive your verified digital Offer Letter alongside curated real-world problem statements, GitHub starter templates, and milestone rubrics within 24 hours.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
  },
  {
    step: '03',
    word: 'Build',
    tagline: 'Practical Code Work',
    icon: GitBranch,
    quote: '“Talk is cheap. Show me the code.”',
    detail: 'Develop production-ready modules, implement industry best practices, solve real technical constraints, and maintain a clean public Git commit history.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
  },
  {
    step: '04',
    word: 'Submit',
    tagline: 'Review & Evaluation',
    icon: Code2,
    quote: '“Excellence is not an act, but a habit of disciplined delivery.”',
    detail: 'Push your completed code to GitHub, deploy the live demo, record a quick architectural walkthrough, and submit for mentor evaluation.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    step: '05',
    word: 'Verify',
    tagline: 'Tamper-Proof CID',
    icon: BadgeCheck,
    quote: '“Authentic work speaks for itself through verifiable proof.”',
    detail: 'Receive your official Certificate of Completion equipped with a tamper-proof digital Certificate ID (CID) and QR code verifiable by recruiters worldwide.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    step: '06',
    word: 'Accelerate',
    tagline: 'Career & LOR',
    icon: Award,
    quote: '“Your portfolio is your ultimate passport to tech opportunities.”',
    detail: 'Earn formal Letters of Recommendation (LOR), pass ATS resume filters with our AI scanner, and get showcased on the Geek Intern talent directory.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
]

const CAREER_TOOLS = [
  {
    title: 'ATS Resume Score Checker',
    desc: 'Upload or paste your developer resume to benchmark against real job descriptions. Get instant keyword matching and score insights.',
    tag: 'Free AI Scanner',
    actionText: 'Scan Resume Free',
    href: '/ats-checker',
    icon: CheckCircle2,
    accent: 'blue',
  },
  {
    title: 'Developer Resume Builder',
    desc: 'Create clean, recruiter-approved developer resumes tailored for ATS parsers. Includes live side-by-side preview and PDF download.',
    tag: 'Interactive Builder',
    actionText: 'Build My Resume',
    href: '/resume-builder',
    icon: FileText,
    accent: 'purple',
  },
  {
    title: 'Portfolio Website Builder',
    desc: 'Transform your GitHub repositories and projects into an elegant personal developer portfolio ready to share with hiring managers.',
    tag: 'Portfolio Generator',
    actionText: 'Create Portfolio',
    href: '/portfolio-builder',
    icon: Layers,
    accent: 'emerald',
  },
]

const PORTFOLIO_PREVIEW = [
  {
    title: 'Nexus Modern E-Commerce Storefront',
    category: 'Full Stack Web',
    type: 'Web',
    tags: ['React', 'Next.js', 'PostgreSQL', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?q=80&w=800&auto=format&fit=crop',
    link: '/web-portfolio',
    desc: 'High-conversion headless storefront with real-time cart state, automated inventory sync, and Stripe checkout authorization.',
  },
  {
    title: 'Pulse AI Workflow Automation Platform',
    category: 'AI & SaaS',
    type: 'Web',
    tags: ['Next.js', 'Python', 'FastAPI', 'LangChain'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    link: '/web-portfolio',
    desc: 'Multi-tenant SaaS application integrating autonomous LLM agents for document extraction, summarization, and reporting.',
  },
  {
    title: 'FinTrack Crypto & Multi-Currency Wallet',
    category: 'Mobile Application',
    type: 'App',
    tags: ['Flutter', 'Dart', 'Firebase', 'Web3'],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop',
    link: '/app-portfolio',
    desc: 'High-security decentralized digital wallet with biometric authentication, candlestick feeds, and asset portfolio analytics.',
  },
]

const SERVICES_LIST = [
  {
    title: 'Web Application Development',
    desc: 'Custom, high-performance web applications built using Next.js, React, TypeScript, and modern scalable cloud backends.',
    icon: Globe,
  },
  {
    title: 'Mobile App Engineering',
    desc: 'Intuitive cross-platform and native iOS/Android applications developed with Flutter and React Native.',
    icon: Smartphone,
  },
  {
    title: 'Custom AI & Agent Solutions',
    desc: 'Autonomous agentic workflows, custom LLM integrations, document search (RAG), and data extraction microservices.',
    icon: BrainCircuit,
  },
  {
    title: 'Cloud DevOps & Infrastructure',
    desc: 'Resilient cloud infrastructure, automated CI/CD deployment pipelines, Docker containerization, and zero-downtime releases.',
    icon: Cpu,
  },
]

// CHANGED QUOTES as requested by the user: "(makes change in qoutes only)"
const STUDENT_TESTIMONIALS = [
  {
    name: 'Aarav Singhania',
    college: 'IIT Roorkee',
    domain: 'Full Stack Web Development',
    rating: 5,
    quote:
      'The hands-on project tasks mirrored real production tickets. Building a full-stack platform with authentication and database schemas made all the difference during my technical interviews.',
  },
  {
    name: 'Meera Nambiar',
    college: 'BITS Pilani',
    domain: 'Machine Learning & AI',
    rating: 5,
    quote:
      'The curriculum pushed me to implement neural network architectures from scratch rather than just running pre-made notebooks. Having a verifiable QR certificate helped me secure an off-campus ML internship.',
  },
  {
    name: 'Tanmay Deshmukh',
    college: 'COEP Technological University',
    domain: 'Android App Development',
    rating: 5,
    quote:
      'The freedom to complete assignments alongside my university semester exams was fantastic. Geek Intern provided clear task guidelines and prompt credential verification upon submission.',
  },
]

const FAQS = [
  {
    question: 'How do I apply for a Geek Intern Virtual Internship?',
    answer:
      'Simply click "Start Your Internship" or "Apply Now" to navigate to our application page. Select your technical domain, provide your basic details, and submit. There are no prerequisite gatekeepings.',
  },
  {
    question: 'Is the virtual internship program remote and self-paced?',
    answer:
      'Yes, 100% of our internships are conducted remotely. You can comfortably plan your schedule around college coursework, assignments, and exams while meeting weekly project milestones.',
  },
  {
    question: 'How are the certificates verified by companies and recruiters?',
    answer:
      'Each certificate issued by Geek Intern carries a globally unique Certificate ID (CID) and a QR code. Employers can enter this ID into our Certificate Verification portal (/verify) to validate student authenticity, domain, and completion date.',
  },
  {
    question: 'What is the duration of the internship programs?',
    answer:
      'Internships are typically 4 weeks or 8 weeks in duration, depending on your preferred pace and project complexity. Fast-track options are available for candidates who submit their tasks early.',
  },
  {
    question: 'Can I get a Letter of Recommendation (LOR)?',
    answer:
      'Yes. Top-performing interns who submit clean code, comprehensive GitHub README documentation, and timely task solutions receive a formal Letter of Recommendation alongside their verified certificate.',
  },
]

export function Home() {
  const [activeCategory, setActiveCategory] = useState('All Programs')
  const [showAllDomains, setShowAllDomains] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [activeJourneyModal, setActiveJourneyModal] = useState<typeof JOURNEY_STEPS[0] | null>(null)

  const allFilteredPrograms =
    activeCategory === 'All Programs'
      ? DOMAIN_PROGRAMS
      : DOMAIN_PROGRAMS.filter((p) => p.category === activeCategory)

  // 2 rows on a 3-column desktop grid = 6 programs
  const displayedPrograms = showAllDomains
    ? allFilteredPrograms
    : allFilteredPrograms.slice(0, 6)

  return (
    <PublicLayout>
      <PageTitle title="Geek Intern - Virtual Internship Programs for Tech Careers" />

      {/* ========================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center bg-gradient-to-b from-blue-50/60 via-white to-slate-50/40 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 pt-16 md:pt-24 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-200/70 dark:border-slate-800 transition-colors duration-200">
        {/* Subtle background ambient accents */}
        <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-[100px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] rounded-full bg-cyan-100/40 dark:bg-cyan-900/15 blur-[120px] pointer-events-none -z-10" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Top Badge: ✱ PROJECT-BASED VIRTUAL INTERNSHIP PROGRAMS */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs md:text-sm font-semibold mb-6 sm:mb-8 shadow-xs">
            <span className="text-base text-blue-600 dark:text-blue-400">✱</span>
            <span className="tracking-wider uppercase">PROJECT-BASED VIRTUAL INTERNSHIP PROGRAMS</span>
          </div>

          {/* Clean Heading with Serif Accent */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.2] mb-5 font-sans text-slate-950 dark:text-white px-2">
            Project-Based Internships to Build Your Portfolio and{' '}
            <span className="font-serif italic text-blue-600 dark:text-blue-400 font-bold">
              Launch Your Tech Career
            </span>.
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal px-2">
            Gain hands-on experience on real problem statements, build production-grade projects, and earn verified credentials with <span className="font-semibold text-slate-800 dark:text-slate-100">Geek Intern</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto sm:max-w-none">
            <Link to="/apply" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 inline-flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98">
                <span>Start Your Internship</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </Button>
            </Link>

            <Link to="/verify" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 rounded-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm shadow-xs inline-flex items-center justify-center gap-2 transition-all"
              >
                <span>Verify Certificate</span>
                <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-400 dark:border-slate-500" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. STATS BAR SECTION */}
      {/* ========================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {STATS.map((stat, i) => (
            <div key={i} className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <AnimatedStat
                target={stat.target}
                decimals={stat.decimals}
                suffix={stat.suffix}
                duration={1800}
              />
              <div className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">{stat.label}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2.5 WHY CHOOSE GEEK INTERN (IMMEDIATELY AFTER HERO & STATS) */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              The Geek Intern Advantage
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Why Students & Colleges <br className="hidden sm:inline" />
              <span className="text-blue-600 dark:text-blue-400">Choose Geek Intern</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              We eliminate theoretical fluff and gatekeeping by giving you direct access to production-grade engineering tasks, industry recognition, and hiring tools.
            </p>
          </div>

          {/* 6 Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Pillar 1 */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-6 sm:p-8 hover:bg-white dark:hover:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">100% Practical & Real-World Code</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  No generic multiple-choice quizzes or boring video playlists. You write real code, architect clean repository trees, and solve industry-standard problem statements.
                </p>
              </div>
              <ul className="space-y-2 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>Production-grade GitHub repo standards</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>Real API & database integrations</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-6 sm:p-8 hover:bg-white dark:hover:bg-slate-900 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">Verifiable Credential Security (CID)</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Every completion certificate includes an immutable, unique Certificate ID (CID) verifiable 24/7 by prospective employers and college academic boards.
                </p>
              </div>
              <ul className="space-y-2 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Instant one-click employer verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Official Letter of Recommendation (LOR)</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-6 sm:p-8 hover:bg-white dark:hover:bg-slate-900 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">Portfolio & Resume Readiness</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Transform raw assignments into impressive portfolio pieces. Evaluate your resume keywords against ATS filters and build interview confidence.
                </p>
              </div>
              <ul className="space-y-2 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span>Interactive ATS Resume Checker</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span>Developer portfolio builder kit</span>
                </li>
              </ul>
            </div>

            {/* Pillar 4 */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-6 sm:p-8 hover:bg-white dark:hover:bg-slate-900 hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">Self-Paced Flexible Timelines</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Never stress about college exams or conflicting laboratory schedules. Complete your projects at your own pace with responsive mentorship.
                </p>
              </div>
              <ul className="space-y-2 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                  <span>Flexible deadlines suited for college students</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                  <span>100% remote virtual environment</span>
                </li>
              </ul>
            </div>

            {/* Pillar 5 */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-6 sm:p-8 hover:bg-white dark:hover:bg-slate-900 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">14+ Engineering Domains</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  From Modern Web (React, Next.js, Node) and Mobile to Artificial Intelligence, Machine Learning, Cyber Security, and Cloud Infrastructure.
                </p>
              </div>
              <ul className="space-y-2 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span>Modern software engineering tracks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span>Open to all college branches & batches</span>
                </li>
              </ul>
            </div>

            {/* Pillar 6 */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-6 sm:p-8 hover:bg-white dark:hover:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">Student Mentorship & Support</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Get dedicated guidance from project mentors and coordinators to help unblock development challenges and review your code repositories.
                </p>
              </div>
              <ul className="space-y-2 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <span>Real human review on code submissions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <span>College NOC & credit transfer assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. EXPLORE OUR INTERNSHIP PROGRAMS */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Code2 className="w-3.5 h-3.5" />
              14+ Technical Tracks Available
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Explore Our <span className="text-blue-600 dark:text-blue-400">Internship Programs</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
              Curated hands-on problem statements designed to transform students and fresh graduates into industry-ready software developers and engineers.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10 sm:mb-12">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Domain Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPrograms.map((prog, idx) => {
              const IconComp = prog.icon
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-slate-950/50 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${prog.bg} dark:bg-opacity-20 ${prog.color} flex items-center justify-center`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {prog.badge}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {prog.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">4–8 Weeks Duration</span>
                    <Link
                      to={`/apply?domain=${encodeURIComponent(prog.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:underline"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* View All Domains Button */}
          <div className="text-center mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            {allFilteredPrograms.length > 6 && (
              <Button
                onClick={() => setShowAllDomains(!showAllDomains)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-7 h-11 rounded-xl shadow-sm inline-flex items-center justify-center gap-2"
              >
                <span>{showAllDomains ? 'Show Less' : 'View All Domains'}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${showAllDomains ? '-rotate-90' : 'rotate-90'}`} />
              </Button>
            )}
            <Link to="/browse" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs px-6 h-11 rounded-xl shadow-sm">
                Browse All Categories Catalog →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SIX-STEP INTERNSHIP JOURNEY */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-slate-100 border-y border-slate-200/80 dark:border-slate-800 relative overflow-hidden transition-colors duration-200">
        <div className="max-w-6xl mx-auto relative">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Interactive Internship Roadmap
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Internship <span className="text-blue-600 dark:text-blue-400">Journey</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3">
              Click any stage number to open its milestone quote and action briefing.
            </p>
          </div>

          {/* Connected Single-Word Flowchart */}
          <div className="relative">
            {/* Desktop connecting gradient bar behind circles */}
            <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-blue-300 dark:from-blue-700 via-indigo-300 dark:via-indigo-700 to-amber-300 dark:to-amber-700 z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4 relative z-10">
              {JOURNEY_STEPS.map((step, idx) => {
                const IconComp = step.icon
                const isSelected = activeJourneyModal?.step === step.step

                return (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    <button
                      type="button"
                      onClick={() => setActiveJourneyModal(step)}
                      aria-label={`Open stage ${step.step}: ${step.word}`}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-slate-900 border-2 flex flex-col items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hover:scale-105 sm:hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/40 ${
                        isSelected
                          ? 'border-blue-600 dark:border-blue-400 shadow-lg shadow-blue-500/25 ring-4 ring-blue-50 dark:ring-blue-950'
                          : 'border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400'
                      }`}
                    >
                      <span className="absolute -top-2 px-2 py-0.5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-mono text-[10px] font-bold shadow-xs tracking-wider">
                        {step.step}
                      </span>
                      <IconComp className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${step.color} group-hover:scale-110 duration-200`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveJourneyModal(step)}
                      className="mt-3 sm:mt-4 focus:outline-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                    >
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                        {step.word}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                        {step.tagline}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveJourneyModal(step)}
                      className="mt-1 sm:mt-2 text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 inline-flex items-center gap-0.5 hover:underline"
                    >
                      <span>Read Quote</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Callout Below Flow */}
          <div className="mt-12 sm:mt-14 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Ready to embark on Stage 1? Applications are open with instant enrollment on all 32 tracks.
              </p>
            </div>
            <Link to="/apply" className="flex-shrink-0 w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs px-5 h-10 rounded-xl font-semibold shadow-sm">
                Apply Now →
              </Button>
            </Link>
          </div>
        </div>

        {/* Modal / Popup Message on Clicking Each Number */}
        {activeJourneyModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setActiveJourneyModal(null)}
          >
            <div
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl shadow-slate-950/20 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveJourneyModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className={`w-12 h-12 rounded-xl ${activeJourneyModal.bg} dark:bg-opacity-20 flex items-center justify-center border ${activeJourneyModal.border} dark:border-slate-700`}>
                  {React.createElement(activeJourneyModal.icon, {
                    className: `w-6 h-6 ${activeJourneyModal.color}`,
                  })}
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Stage {activeJourneyModal.step}
                  </span>
                  <h4 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                    {activeJourneyModal.word}
                  </h4>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 p-4 mb-4">
                <p className="text-sm font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                  {activeJourneyModal.quote}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {activeJourneyModal.detail}
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="outline"
                  onClick={() => setActiveJourneyModal(null)}
                  className="text-xs h-9 rounded-xl border-slate-300 dark:border-slate-700 dark:text-slate-300"
                >
                  Close
                </Button>
                <Link to="/apply">
                  <Button
                    onClick={() => setActiveJourneyModal(null)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-9 rounded-xl font-semibold shadow-xs"
                  >
                    Start Stage 1 →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 4.5 COMPANIES WHERE OUR LEARNERS HAVE PROGRESSED */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Alumni Success
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Companies Where Our <span className="text-blue-600 dark:text-blue-400">Learners Have Progressed</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Our interns have leveraged verified project milestones, GitHub repositories, and verifiable credentials to progress into industry roles.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {PROGRESSION_COMPANIES.map((company, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-white dark:hover:bg-slate-900 hover:shadow-md p-3 sm:p-4 text-center transition-all duration-200 group flex flex-col items-center justify-center min-h-[85px] sm:min-h-[96px]"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {company.name}
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  {company.domain}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-center gap-4 sm:gap-12 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Over <strong className="text-slate-900 dark:text-white font-semibold">1,200+</strong> hiring partner networks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Verifiable QR credentials trusted by recruiters</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Recognized across MNCs, startups & research labs</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. EARN A RECOGNIZED CERTIFICATE OF COMPLETION */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden transition-colors duration-200">
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Information & Value Proposition */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider shadow-xs">
                <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Industry-Recognized Certification
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
                Earn a Recognized <br />
                <span className="text-blue-600 dark:text-blue-400">Certificate of Completion</span>
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                Validate your practical software engineering milestones with an official, tamper-proof digital credential. Each certificate is backed by verifiable project commits, unique Certificate IDs (CID), and scannable QR verification.
              </p>

              {/* 4 Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tamper-Proof CID</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Permanent cryptographic digital record verifiable on /verify 24/7.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Instant QR Scan</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Hiring managers scan directly to authenticate completion and performance grade.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">College NOC / Credits</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Widely accepted by university academic boards for mandatory internship credits.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Letter of Recommendation</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Top contributors receive an official LOR for higher studies and job applications.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link to="/verify" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 h-11 rounded-xl shadow-sm inline-flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Try Verification Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
                <Link to="/apply" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs px-5 h-11 rounded-xl shadow-sm">
                    Start Earning Certificate
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Realistic Demo Certificate Mockup */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl border-4 border-double border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 text-center space-y-4">
                  {/* Issuer Brand Header */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2 text-left">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        GI
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">GEEK INTERN</div>
                        <div className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Virtual Internship Academy</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800 uppercase tracking-wider">
                        Official Credential
                      </span>
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <div className="pt-2">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-bold">Certificate of Completion</div>
                    <h3 className="text-xl sm:text-2xl font-serif italic font-bold text-slate-900 dark:text-white mt-1">
                      Virtual Internship Excellence
                    </h3>
                  </div>

                  {/* Recipient Details */}
                  <div className="py-2">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">This is proudly awarded to</p>
                    <div className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight mt-1 font-sans border-b-2 border-slate-200 dark:border-slate-700 pb-1 max-w-xs mx-auto">
                      Aarav Singhania
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                      for outstanding performance and successful milestone completion in the{' '}
                      <strong className="text-slate-900 dark:text-white font-semibold">Full Stack Web Development</strong> program.
                    </p>
                  </div>

                  {/* Technical Meta Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/80 dark:border-slate-750 text-left">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Duration</div>
                      <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-0.5">8 Weeks (Remote)</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Grade / Status</div>
                      <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Grade A+ (Distinction)</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Issue Date</div>
                      <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-0.5">September 2026</div>
                    </div>
                  </div>

                  {/* Footer Signatures & QR Code */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 p-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center flex-shrink-0">
                        <QrCode className="w-12 h-12 text-slate-800 dark:text-slate-200" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono font-bold text-slate-900 dark:text-white tracking-wider">CID: CF-2026-WD101</div>
                        <div className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">Scan to verify authenticity</div>
                        <div className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold mt-0.5">geekintern.in/verify</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-serif italic text-base text-slate-800 dark:text-slate-200 font-bold">Geek Intern Directorate</div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">Academic Evaluation Board</div>
                      <div className="inline-flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Digitally Signed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <Badge className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-widest text-[11px] mb-3 px-3 py-1">
              Have Questions?
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Frequently Asked <span className="text-blue-600 dark:text-blue-400">Questions</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            {FAQS.map((faq, idx) => {
              const isOpen = faqOpen === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-90 text-blue-600 dark:text-blue-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. FINAL CALL TO ACTION BANNER */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider mb-4">
            Accelerate Your Career
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Ready to Build Real Projects & Get Certified?
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Join thousands of developers and engineering students who leveled up their skills with Geek Intern. Applications are open for upcoming cohorts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/apply" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-12 px-8 rounded-full bg-white hover:bg-slate-100 text-blue-700 font-bold text-sm shadow-xl inline-flex items-center justify-center gap-2">
                <span>Start Your Internship Now</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/browse" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 rounded-full border-white/40 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold"
              >
                Explore All Tracks
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. TALK TO SUPPORT SECTION */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  We Are Here to Help
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-3">
                  Have Questions? <span className="text-blue-600 dark:text-blue-400">Talk to Our Support Team</span>
                </h2>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  Need help with domain selection, offer letter dispatch, project submission, college NOC, or verification? Our dedicated student helpdesk is here to assist you.
                </p>

                {/* Email Support Card */}
                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px] uppercase font-bold tracking-wider">Official Support Email</span>
                    <a
                      href="mailto:thestartup675@gmail.com"
                      className="font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      thestartup675@gmail.com
                    </a>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">We reply to every query promptly within 24 hours.</p>
                  </div>
                </div>
              </div>

              {/* Right CTA Box */}
              <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 sm:p-7 flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-500/20">
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">Online Help Desk</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                  Have an urgent inquiry, verification question, or feedback? Send us a direct message anytime.
                </p>

                <div className="w-full bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 rounded-xl px-3 py-2 mb-4 text-[11px] text-blue-950 dark:text-blue-200 font-medium flex items-center justify-center gap-2 text-center">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span><strong>Quick Tip:</strong> For fastest resolution, reach out via the message box.</span>
                </div>

                <div className="w-full flex flex-col gap-2.5">
                  <Link to="/contact" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-10 sm:h-11 rounded-xl shadow-xs">
                      Send Support Message →
                    </Button>
                  </Link>
                  <a href="mailto:thestartup675@gmail.com" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold h-10 sm:h-11 rounded-xl"
                    >
                      Email Us Directly
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default Home
