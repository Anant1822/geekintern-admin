import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Search,
  ArrowRight,
  Sparkles,
  Globe,
  Server,
  Code2,
  Smartphone,
  Terminal,
  Cpu,
  BrainCircuit,
  Bot,
  TrendingUp,
  BarChart3,
  Cloud,
  ShieldCheck,
  Layers,
  Building2,
  Wrench,
  Gauge,
  BatteryCharging,
  Network,
  CircuitBoard,
  CheckCircle2,
  Palette,
  Filter,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { ALL_DOMAINS, CATEGORY_TABS } from '@/data/domains'

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Server,
  Code2,
  Smartphone,
  Terminal,
  Cpu,
  BrainCircuit,
  Bot,
  TrendingUp,
  BarChart3,
  Cloud,
  Sparkles,
  ShieldCheck,
  Layers,
  Palette,
  Building2,
  Wrench,
  Gauge,
  BatteryCharging,
  Network,
  CircuitBoard,
}

export default function BrowseInternships() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All Programs'
  const initialSearch = searchParams.get('q') || ''

  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)

  const filteredDomains = useMemo(() => {
    return ALL_DOMAINS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All Programs' || item.category === activeCategory

      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.skills.some((s) => s.toLowerCase().includes(q))

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <PublicLayout>
      <PageTitle title="Browse All Domains & Categories | Geek Intern" />

      {/* Hero / Header Section */}
      <section className="bg-gradient-to-b from-blue-50/70 via-white to-slate-50/40 border-b border-slate-200/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            31 Industry-Standard Specializations
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Browse All Internship <span className="text-blue-600">Domains</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            Choose your technical engineering track, build verifiable milestone projects, and earn accredited credentials recognized by tech employers worldwide.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by domain, technology, or skills (e.g. Python, React, EV, VLSI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-10 h-12 bg-white border-slate-300 rounded-2xl shadow-sm text-sm focus-visible:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mr-2">
            <Filter className="w-3.5 h-3.5" />
            Categories:
          </div>
          {CATEGORY_TABS.map((tab) => {
            const count =
              tab === 'All Programs'
                ? ALL_DOMAINS.length
                : ALL_DOMAINS.filter((d) => d.category === tab).length

            return (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeCategory === tab
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === tab
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Results Count Bar */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500 border-b border-slate-200/80 pb-3">
          <div>
            Showing <span className="font-bold text-slate-900">{filteredDomains.length}</span> programs in{' '}
            <span className="font-semibold text-blue-600">{activeCategory}</span>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 hover:underline inline-flex items-center gap-1 font-medium"
            >
              <span>Clear Search filter</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Grid of All Domain Programs */}
        {filteredDomains.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-8">
            <Code2 className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No internship tracks found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any domains matching &ldquo;{searchQuery}&rdquo;. Try another keyword or browse all categories.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('All Programs')
              }}
              variant="outline"
              className="mt-5 text-xs h-9"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDomains.map((domain) => {
              const IconComp = iconMap[domain.iconName] || Globe

              return (
                <div
                  key={domain.id}
                  className="rounded-2xl bg-white border border-slate-200 hover:border-blue-400 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 group"
                >
                  <div>
                    {/* Top Row: Icon + Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${domain.bg} ${domain.color} flex items-center justify-center`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {domain.category}
                        </span>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {domain.badge}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                      {domain.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {domain.description}
                    </p>

                    {/* Key Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {domain.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Meta & Apply Action (No Prices) */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{domain.duration}</span>
                    </div>

                    <Link
                      to={`/apply?domain=${encodeURIComponent(domain.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:underline"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
