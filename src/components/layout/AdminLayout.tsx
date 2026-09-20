import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, Users, Settings, Menu, X, LogOut,
  FileText, MessageSquare, HelpCircle, ChevronRight, Award, Send,
  Sun, Moon
} from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/internships', label: 'Internships', icon: Briefcase },
  { href: '/admin/applications', label: 'Applications', icon: FileText },
  { href: '/admin/users', label: 'Registered Students', icon: Users },
  { href: '/admin/certificates', label: 'Certificate Library', icon: Award },
  { href: '/admin/offer-letters', label: 'Offer Letters', icon: Send },
  { href: '/admin/inquiries', label: 'Inquiries', icon: HelpCircle },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

export function AdminLayout({ children, title = 'Admin' }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? location.pathname === href : location.pathname.startsWith(href)

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-brand-navy dark:bg-slate-950 text-white border-r border-transparent dark:border-slate-800 transition-colors duration-200">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/10 dark:border-slate-800 flex items-center justify-between">
        <div>
          <Link to="/admin">
            <Logo variant="light" size="sm" />
          </Link>
          <p className="text-xs text-white/50 dark:text-slate-400 mt-1 ml-11">Admin Portal</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Admin navigation">
        {ADMIN_LINKS.map((link) => {
          const Icon = link.icon
          const active = isActive(link.href, link.exact)
          return (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                active
                  ? 'bg-white/15 dark:bg-blue-600/30 text-white font-semibold shadow-xs'
                  : 'text-white/65 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-slate-900 hover:text-white dark:hover:text-slate-200'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{link.label}</span>
              {active && <ChevronRight className="h-3 w-3 text-blue-300" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-white/10 dark:border-slate-800 pt-3 space-y-1">
        {/* Quick theme toggle in sidebar for mobile / tablet */}
        <button
          onClick={toggleTheme}
          className="flex w-full items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-white/70 dark:text-slate-400 hover:text-white dark:hover:text-slate-200 hover:bg-white/10 dark:hover:bg-slate-900 transition-colors"
        >
          <span className="flex items-center gap-2.5">
            {theme === 'dark' ? <Moon className="h-4 w-4 text-amber-300" /> : <Sun className="h-4 w-4 text-amber-400" />}
            <span>{theme === 'dark' ? 'Dark Theme' : 'Light Theme'}</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 dark:bg-slate-800">
            Switch
          </span>
        </button>

        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/50 dark:text-slate-400 hover:text-white hover:bg-white/10 dark:hover:bg-slate-900 transition-colors"
        >
          View Public Site
        </Link>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-300 dark:text-red-400 hover:bg-red-900/30 hover:text-red-200 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 fixed inset-y-0 left-0 z-30 shadow-lg">
        <Sidebar />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 lg:hidden transition-transform duration-300 shadow-2xl',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <button className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-1" onClick={() => setSidebarOpen(false)}>
          <X className="h-5 w-5" />
        </button>
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-4 shadow-xs transition-colors duration-200">
          <Button variant="ghost" size="icon-sm" className="lg:hidden text-slate-700 dark:text-slate-200" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>

          <div className="ml-auto flex items-center gap-2.5">
            {/* Theme Toggle Button in Header */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 transition-all duration-200 flex items-center gap-1.5 text-xs font-medium"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-4 w-4 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            <Badge variant="navy" className="text-xs bg-blue-600 dark:bg-blue-700 text-white font-semibold">
              Admin
            </Badge>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">{children}</main>
      </div>
    </div>
  )
}


export default AdminLayout
