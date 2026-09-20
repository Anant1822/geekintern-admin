import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Smartphone,
  Search,
  Sparkles,
  Github,
  Apple
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

interface MobileApp {
  id: string
  name: string
  category: string
  platforms: ('iOS' | 'Android' | 'Flutter' | 'React Native')[]
  description: string
  technologies: string[]
  imageUrl: string
  githubUrl?: string
  featured?: boolean
}

const MOBILE_APPS: MobileApp[] = [
  {
    id: 'fintrack-wallet',
    name: 'FinTrack Crypto & Multi-Currency Wallet',
    category: 'FinTech',
    platforms: ['Flutter', 'iOS', 'Android'],
    description:
      'High-security decentralized digital wallet enabling token transfers, biometric face recognition authentication, real-time market candlestick feeds, and portfolio analytics.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Web3.dart', 'Bloc Pattern'],
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/geekintern-internships/fintrack-wallet',
    featured: true,
  },
  {
    id: 'fitpulse-companion',
    name: 'FitPulse Daily Workout & Gym Coach',
    category: 'Health & Fitness',
    platforms: ['React Native', 'iOS', 'Android'],
    description:
      'Interactive fitness companion with AI-curated workout splits, Apple HealthKit & Google Fit step synchronization, heart rate monitors, and calorie macros breakdown.',
    technologies: ['React Native', 'TypeScript', 'Redux Toolkit', 'HealthKit', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/geekintern-internships/fitpulse-companion',
    featured: true,
  },
  {
    id: 'quickbite-delivery',
    name: 'QuickBite On-Demand Food Delivery',
    category: 'Delivery & Logistics',
    platforms: ['Flutter', 'Android'],
    description:
      'Real-time courier and customer dispatch application featuring live GPS delivery driver tracking via Google Maps, customized restaurant menus, and payment checkouts.',
    technologies: ['Flutter', 'Google Maps API', 'Socket.io', 'Express.js', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/geekintern-internships/quickbite-delivery',
  },
  {
    id: 'devconnect-community',
    name: 'DevConnect Social Network for Engineers',
    category: 'Social Networking',
    platforms: ['React Native', 'iOS', 'Android'],
    description:
      'Mobile developer community platform offering real-time direct messaging, code snippet sharing with syntax highlights, community channels, and referral boards.',
    technologies: ['React Native', 'Supabase', 'PostgreSQL', 'Tailwind', 'Expo'],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/geekintern-internships/devconnect-mobile',
    featured: true,
  },
  {
    id: 'zenmind-meditation',
    name: 'ZenMind Mindfulness & Sleep Tracker',
    category: 'Lifestyle',
    platforms: ['iOS'],
    description:
      'Audio-guided meditation and ambient white noise app with offline audio caching, daily mindfulness streaks, custom timer intervals, and soothing haptic feedback.',
    technologies: ['Swift', 'SwiftUI', 'AVFoundation', 'CoreData', 'Combine'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/geekintern-internships/zenmind-ios',
  },
  {
    id: 'agrisense-iot',
    name: 'AgriSense Smart Farming Telemetry',
    category: 'Agriculture & IoT',
    platforms: ['Android'],
    description:
      'Agricultural dashboard monitoring soil moisture, ambient humidity, automated sprinkler controls, and micro-climate forecasting using MQTT sensors.',
    technologies: ['Kotlin', 'Jetpack Compose', 'MQTT', 'Room DB', 'Retrofit'],
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/geekintern-internships/agrisense-android',
  },
]

const PLATFORM_FILTERS = ['All Platforms', 'Flutter', 'React Native', 'iOS', 'Android']

export function AppPortfolio() {
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredApps = MOBILE_APPS.filter((app) => {
    const matchesPlatform =
      selectedPlatform === 'All Platforms' || app.platforms.includes(selectedPlatform as any)
    const matchesSearch =
      !searchQuery ||
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesPlatform && matchesSearch
  })

  return (
    <PublicLayout>
      <PageTitle title="Mobile App Portfolio | Geek Intern" />

      {/* Hero Header */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50/40 text-slate-900 border-b border-slate-200">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
            Mobile Solutions
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-950">
            Mobile Application <span className="text-[#FF4D5A]">Portfolio</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            High-performance cross-platform and native iOS & Android applications engineered for speed, offline reliability, and delightful mobile UX.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto mt-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search apps by stack (Flutter, Kotlin, React Native...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Filter Tabs & App Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          {/* Platform Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {PLATFORM_FILTERS.map((plat) => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedPlatform === plat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                {plat}
              </button>
            ))}
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApps.map((app) => (
              <article
                key={app.id}
                className="group rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={app.imageUrl}
                    alt={app.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-900 border border-slate-200 shadow-sm">
                    {app.category}
                  </div>
                  {app.featured && (
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold tracking-wide uppercase shadow">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Platform badges */}
                    <div className="flex items-center gap-1.5 mb-3">
                      {app.platforms.map((p) => (
                        <span
                          key={p}
                          className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200"
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {app.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {app.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {app.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      to={`/apply?domain=Android App Development`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2.5 text-xs font-semibold transition-colors shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Learn Mobile Dev</span>
                    </Link>
                    {app.githubUrl && (
                      <a
                        href={app.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
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

          {/* CTA Box */}
          <div className="mt-20 rounded-2xl bg-gradient-to-r from-emerald-50 via-slate-50 to-teal-50 border border-emerald-200 p-8 md:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-slate-950">Want to Build Android or Flutter Apps?</h3>
            <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
              Join Geek Intern mobile internship track and learn native Android, Kotlin, or Flutter architecture with real project deliverables.
            </p>
            <Link to="/apply?domain=Android App Development">
              <Button className="h-11 px-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-lg shadow-emerald-600/20">
                Apply for Mobile Internship →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default AppPortfolio
