import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  Layers,
  FileText,
  CheckCircle2,
  Users,
  Compass,
  LayoutDashboard,
  LogOut,
  Cpu,
  Sun,
  Moon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Logo } from '@/components/common/Logo'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/context/ThemeContext'
import { getInitials, cn } from '@/lib/utils'

interface NavItem {
  label: string
  href?: string
  items?: {
    label: string
    href: string
    description?: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Internships',
    items: [
      {
        label: 'Apply for Internship',
        href: '/apply',
        description: 'Submit your candidate application for verified virtual internships',
        icon: Award,
      },
      {
        label: 'Internship Tracks',
        href: '/browse',
        description: 'Explore web dev, Python, AI, Android, C++, and design roles',
        icon: Compass,
      },
      {
        label: 'Internship Guidelines',
        href: '/internships/guidelines',
        description: 'Review task submission rules, evaluation criteria, and timelines',
        icon: BookOpen,
      },
      {
        label: 'Certificate Verification',
        href: '/verify',
        description: 'Instantly verify completed internship credentials by CID',
        icon: CheckCircle2,
      },
    ],
  },
  {
    label: 'Portfolio',
    items: [
      {
        label: 'Web Portfolio',
        href: '/web-portfolio',
        description: 'Live web applications, dashboards, and client platforms',
        icon: Layers,
      },
      {
        label: 'App Portfolio',
        href: '/app-portfolio',
        description: 'iOS, Android, and Flutter mobile applications',
        icon: Briefcase,
      },
      {
        label: 'Core Portfolio',
        href: '/core-portfolio',
        description: 'Embedded systems, VLSI, IoT, robotics, and hardware capstones',
        icon: Cpu,
      },
    ],
  },
  {
    label: 'More',
    items: [
      {
        label: 'Team Geek Intern',
        href: '/team',
        description: 'Meet leadership, tech mentors, and curriculum architects',
        icon: Users,
      },
      {
        label: 'Student Reviews',
        href: '/student-reviews',
        description: 'Verified student testimonials, ratings, and feedback',
        icon: Award,
      },
      {
        label: 'FAQs',
        href: '/faq',
        description: 'Frequently asked questions about internships and certificates',
        icon: BookOpen,
      },
      {
        label: 'Partner With Us',
        href: '/college-register',
        description: 'Institutional partnerships and college placement drives',
        icon: GraduationCap,
      },
      {
        label: 'Contact Us',
        href: '/contact',
        description: 'Reach our team for candidate support or inquiries',
        icon: Briefcase,
      },
      {
        label: 'Terms & Conditions',
        href: '/terms',
        description: 'Platform policies, guidelines, and compliance',
        icon: FileText,
      },
    ],
  },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { isAuthenticated, user, profile, isAdmin, signOut } = useAuth()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
    setUserMenuOpen(false)
  }, [location.pathname])

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const isLinkActive = (href?: string) => {
    if (!href) return false
    return href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)
  }

  const isDropdownActive = (items?: { href: string }[]) => {
    if (!items) return false
    return items.some((item) => location.pathname.startsWith(item.href))
  }

  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-colors duration-200 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800',
          scrolled ? 'shadow-md shadow-slate-900/5' : 'shadow-xs'
        )}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between gap-2">
            {/* Logo on left */}
            <div className="flex shrink-0 items-center">
              <Link
                to="/"
                className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg transition-transform hover:scale-105 duration-200"
              >
                <Logo variant="auto" size="md" />
              </Link>
            </div>

            {/* Desktop Navigation Links & Dropdowns */}
            <nav className="hidden xl:flex flex-1 items-center justify-center gap-1">
              {NAVIGATION_ITEMS.map((item) => {
                const active = isLinkActive(item.href) || isDropdownActive(item.items)

                if (item.items) {
                  const isOpen = openDropdown === item.label
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        type="button"
                        className={cn(
                          'inline-flex h-9 items-center justify-center rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all duration-200 gap-1 select-none',
                          active || isOpen
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-900 font-semibold'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800'
                        )}
                        aria-expanded={isOpen}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200 text-slate-400',
                            isOpen && 'rotate-180 text-blue-600 dark:text-blue-400'
                          )}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {isOpen && (
                        <div className="absolute left-0 top-full pt-2 z-50 min-w-[300px] max-w-sm animate-in fade-in slide-in-from-top-2 duration-150">
                          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 shadow-2xl ring-1 ring-black/5">
                            <div className="flex flex-col gap-1">
                              {item.items.map((sub) => {
                                const IconComponent = sub.icon || Award
                                const subActive = location.pathname === sub.href
                                return (
                                  <Link
                                    key={sub.label}
                                    to={sub.href}
                                    onClick={() => setOpenDropdown(null)}
                                    className={cn(
                                      'flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors group',
                                      subActive
                                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                                    )}
                                  >
                                    <div className="p-1.5 rounded-md bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors mt-0.5">
                                      <IconComponent className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                      <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight">
                                        {sub.label}
                                      </span>
                                      {sub.description && (
                                        <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                                          {sub.description}
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.label}
                    to={item.href || '/'}
                    className={cn(
                      'inline-flex h-9 items-center justify-center rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all duration-200 select-none',
                      active
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-900 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Right Action Items */}
            <div className="hidden lg:flex shrink-0 items-center gap-2.5">
              {/* Theme Toggle Button (Light/Dark Mode) */}
              <button
                type="button"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle dark mode"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-700" />
                )}
              </button>

              {/* Student Certificate & Application Portal */}
              <Link to="/login">
                <Button
                  variant="outline"
                  className="h-9 px-3.5 rounded-lg border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950 text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
                >
                  <Award className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Student Portal</span>
                </Button>
              </Link>

              {/* Apply Now ↗ button pointing to /apply */}
              <Link to="/apply">
                <Button className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 inline-flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <span>Apply Now</span>
                  <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </Button>
              </Link>

              {/* User Account / Signout Menu if logged in */}
              {isAuthenticated && (
                <div className="relative ml-1">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Avatar className="h-8 w-8 border border-blue-200">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback className="text-xs bg-blue-600 text-white">
                        {getInitials(profile?.full_name ?? user?.email ?? 'U')}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className={cn('h-3.5 w-3.5 text-slate-500 transition-transform', userMenuOpen && 'rotate-180')} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-1 z-50">
                      {isAdmin || user?.email === 'admin@geekintern.com' ? (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <LayoutDashboard className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                          Admin Console
                        </Link>
                      ) : (
                        <Link
                          to="/login"
                          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <Award className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                          My Certificates & Portal
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Header Controls: Theme Toggle, Quick Apply & Menu Hamburger */}
            <div className="flex xl:hidden items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                aria-label="Toggle dark mode"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-700" />
                )}
              </button>

              <Link to="/apply">
                <Button size="sm" className="h-9 px-3 sm:px-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs">
                  Apply ↗
                </Button>
              </Link>

              <button
                className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer with Smooth Slide & Touch friendly items */}
      <div
        className={cn(
          'fixed top-16 md:top-20 inset-x-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 max-h-[85vh] overflow-y-auto xl:hidden transition-all duration-300 ease-in-out px-4 py-5 shadow-2xl',
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <nav className="flex flex-col gap-1.5" aria-label="Mobile navigation">
          {NAVIGATION_ITEMS.map((item) => {
            if (item.items) {
              const isExpanded = mobileExpanded === item.label
              return (
                <div key={item.label} className="border-b border-slate-100 dark:border-slate-800/80 pb-1">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                    className="flex w-full items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={cn('h-4 w-4 text-slate-400 transition-transform', isExpanded && 'rotate-180 text-blue-600 dark:text-blue-400')} />
                  </button>

                  {isExpanded && (
                    <div className="pl-3 py-1.5 flex flex-col gap-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200/80 dark:border-slate-700/60 my-1">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={item.label}
                to={item.href || '/'}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            )
          })}

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full h-11 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950 font-semibold flex items-center justify-center gap-2 text-xs">
                <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Student Certificate Portal
              </Button>
            </Link>
            <Link to="/apply" onClick={() => setMobileOpen(false)}>
              <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20">
                Start Your Internship ↗
              </Button>
            </Link>
          </div>
        </nav>
      </div>

      {/* Spacer for sticky header */}
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  )
}

export default Header
