import React from 'react'
import { Link } from 'react-router-dom'
import {
  FileCheck,
  FileText,
  Layers,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  BrainCircuit
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

const TOOLS = [
  {
    title: 'ATS Resume Score Checker',
    description:
      'Upload your resume and benchmark it against real job descriptions. Get a detailed breakdown of keyword matches, formatting readability, and missing skills to pass recruiter screening.',
    icon: FileCheck,
    path: '/ats-checker',
    tag: 'Popular',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    btnBg: 'bg-blue-600 hover:bg-blue-700',
    action: 'Scan Resume Free',
  },
  {
    title: 'Interactive Resume Builder',
    description:
      'Build clean, professional, ATS-optimized developer resumes in minutes. Choose proven tech templates, edit your achievements in real-time, and download your recruiter-ready PDF.',
    icon: FileText,
    path: '/resume-builder',
    tag: 'Free Tool',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    btnBg: 'bg-purple-600 hover:bg-purple-700',
    action: 'Build My Resume',
  },
  {
    title: 'Developer Portfolio Builder',
    description:
      'Turn your GitHub repositories, technical skills, and internship certificates into an elegant personal portfolio website ready to impress prospective hiring managers.',
    icon: Layers,
    path: '/portfolio-builder',
    tag: 'Instant Setup',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    btnBg: 'bg-emerald-600 hover:bg-emerald-700',
    action: 'Generate Portfolio',
  },
]

const BENEFITS = [
  {
    icon: BrainCircuit,
    title: 'Bypass Automated Filters',
    desc: 'Over 75% of tech applications are filtered before human eyes see them. Our tools help you match algorithmic keywords accurately.',
  },
  {
    icon: TrendingUp,
    title: 'Higher Interview Call Rate',
    desc: 'Students utilizing ATS-optimized resumes and interactive GitHub project portfolios experience 3x more interview callbacks.',
  },
  {
    icon: ShieldCheck,
    title: '100% Free for Learners',
    desc: 'All Geek Intern career acceleration utilities are completely free to use without hidden paywalls or subscription traps.',
  },
]

export function CareerTools() {
  return (
    <PublicLayout>
      <PageTitle title="Free AI Career Tools | Geek Intern" />

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/40 text-slate-900 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
            Career Acceleration Suite
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-950">
            Free AI <span className="text-[#FF4D5A]">Career Tools</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Maximize your chances of landing high-paying developer roles with our purpose-built technical preparation toolkit.
          </p>
        </div>
      </section>

      {/* Tools Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOOLS.map((tool, idx) => {
              const IconComp = tool.icon
              return (
                <div
                  key={idx}
                  className={`rounded-2xl bg-white border ${tool.border} p-8 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 shadow-md`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                        {tool.tag}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">{tool.title}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-8">
                      {tool.description}
                    </p>
                  </div>
                  <Link to={tool.path}>
                    <Button className={`w-full ${tool.btnBg} text-white font-semibold text-xs h-11 rounded-xl shadow-md inline-flex items-center justify-center gap-2`}>
                      <span>{tool.action}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Value Props */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-16">
            {BENEFITS.map((item, idx) => {
              const BIcon = item.icon
              return (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-1 border border-blue-100">
                    <BIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default CareerTools
