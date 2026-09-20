import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Users, Briefcase, ClipboardList, Clock, Building2,
  TrendingUp, Plus, Download, ArrowRight, RefreshCw,
  MessageSquare, Settings, CheckCircle2, ChevronRight, ExternalLink,
  Search, ShieldCheck, Mail, Phone, Eye, Award, Send
} from 'lucide-react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import api from '@/services/api'
import { formatDate, cn } from '@/lib/utils'

// ── Types ──────────────────────────────────────────────────────────────────
interface AdminStats {
  total_students: number
  total_internships: number
  total_applications: number
  pending_reviews: number
  college_inquiries_new: number
  unread_messages: number
}

interface DashboardData {
  counts: {
    students: number
    internships: number
    applications: number
    direct_applications: number
    payments: number
    pending_reviews: number
    college_inquiries_new: number
    unread_messages: number
  }
  recent_applications: any[]
  recent_inquiries: any[]
  recent_messages: any[]
}

// ── Stat Card Component (Clickable with direct route link) ──────────────────
interface StatCardProps {
  label: string
  value: string | number
  sublabel: string
  icon: React.ElementType
  color: string
  bg: string
  href: string
  loading?: boolean
}

function StatCard({ label, value, sublabel, icon: Icon, color, bg, href, loading }: StatCardProps) {
  return (
    <Link to={href} className="group block focus:outline-none">
      <Card className="border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 bg-white dark:bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-blue-600 transition-colors" />
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
              {loading ? (
                <Skeleton className="h-8 w-20 mt-1" />
              ) : (
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</p>
              )}
              <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium transition-colors">
                <span>{sublabel}</span>
                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
            <div className={cn('rounded-xl p-3 transition-transform group-hover:scale-110 shadow-xs dark:bg-opacity-20', bg)}>
              <Icon className={cn('h-5 w-5', color)} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// ── Admin Dashboard Component ──────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate()
  const { isAdmin, isInitialized } = useAuth()
  const { toast } = useToast()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get('/admin/dashboard')
      const body = res.data?.data || res.data || {}
      setData(body)
    } catch {
      setError('Failed to load dashboard data. Please check your network.')
      toast({ title: 'Error', description: 'Could not fetch dashboard data.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleExportStudents = async () => {
    try {
      const res = await api.get('/admin/students/export', { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = `students-export-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
      toast({ title: 'Export started', description: 'Students CSV has been downloaded.' })
    } catch {
      toast({ title: 'Export failed', description: 'Could not export students.', variant: 'destructive' })
    }
  }

  const counts = data?.counts

  const STAT_CARDS: StatCardProps[] = [
    {
      label: 'Registered Students',
      value: counts?.students ?? 0,
      sublabel: 'View enrolled learners',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border border-blue-100',
      href: '/admin/users',
    },
    {
      label: 'Internships Published',
      value: counts?.internships ?? 0,
      sublabel: 'Manage open postings',
      icon: Briefcase,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border border-emerald-100',
      href: '/admin/internships',
    },
    {
      label: 'Student Applications',
      value: counts?.applications ?? 0,
      sublabel: 'Candidate submission pipeline',
      icon: ClipboardList,
      color: 'text-purple-600',
      bg: 'bg-purple-50 border border-purple-100',
      href: '/admin/applications',
    },
    {
      label: 'Pending Reviews',
      value: counts?.pending_reviews ?? 0,
      sublabel: 'Needs status action',
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border border-amber-100',
      href: '/admin/applications',
    },
    {
      label: 'College Inquiries',
      value: counts?.college_inquiries_new ?? 0,
      sublabel: 'New partnership inquiries',
      icon: Building2,
      color: 'text-rose-600',
      bg: 'bg-rose-50 border border-rose-100',
      href: '/admin/inquiries',
    },
    {
      label: 'Support Messages',
      value: counts?.unread_messages ?? 0,
      sublabel: 'Unread student messages',
      icon: MessageSquare,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border border-indigo-100',
      href: '/admin/messages',
    },
  ]

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-7 max-w-7xl">
        {/* Top welcome banner & quick actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-sm">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-2">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" /> Admin Command Center
            </span>
            <h2 className="text-2xl font-bold tracking-tight">Platform Control & Analytics</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Real-time monitoring of students, direct applications, college partnerships, and customer support.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchDashboard}
              disabled={loading}
              className="gap-1.5 border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs h-9"
            >
              <RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} />
              Sync Data
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-9 shadow-xs"
            >
              <Link to="/admin/internships/new">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Post Internship
              </Link>
            </Button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center justify-between">
            <span>{error}</span>
            <Button size="sm" variant="outline" onClick={fetchDashboard}>Retry</Button>
          </div>
        )}

        {/* 6 Connected Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAT_CARDS.map((card) => (
            <StatCard key={card.label} {...card} loading={loading} />
          ))}
        </div>

        {/* Hub / Quick Navigation Gateway */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Direct Navigation & Quick Shortcuts
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
              Jump instantly to any section of the Geek Intern administration portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <Link
                to="/admin/users"
                className="flex flex-col items-center text-center p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 mb-2 group-hover:scale-105 transition-transform">
                  <Users className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400">Registered Students</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Profiles & details</span>
              </Link>

              <Link
                to="/admin/applications"
                className="flex flex-col items-center text-center p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 mb-2 group-hover:scale-105 transition-transform">
                  <ClipboardList className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-purple-400">Applications</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Review pipeline</span>
              </Link>

              <Link
                to="/admin/internships"
                className="flex flex-col items-center text-center p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 mb-2 group-hover:scale-105 transition-transform">
                  <Briefcase className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">Internships</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Manage tracks</span>
              </Link>

              <Link
                to="/admin/certificates"
                className="flex flex-col items-center text-center p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 mb-2 group-hover:scale-105 transition-transform">
                  <Award className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-700 dark:group-hover:text-amber-400">Certificates</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Cloud library</span>
              </Link>

              <Link
                to="/admin/offer-letters"
                className="flex flex-col items-center text-center p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 mb-2 group-hover:scale-105 transition-transform">
                  <Send className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-sky-700 dark:group-hover:text-sky-400">Offer Letters</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Codes & documents</span>
              </Link>

              <Link
                to="/admin/inquiries"
                className="flex flex-col items-center text-center p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 mb-2 group-hover:scale-105 transition-transform">
                  <Building2 className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-rose-700 dark:group-hover:text-rose-400">Colleges</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Partnerships</span>
              </Link>

              <Link
                to="/admin/messages"
                className="flex flex-col items-center text-center p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 mb-2 group-hover:scale-105 transition-transform">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-400">Messages</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Read & unread</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Section 1: Recent Applications & Candidate Stream */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Recent Applications
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                Latest student internship registrations requiring review or offer delivery
              </CardDescription>
            </div>
            <Link
              to="/admin/applications"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
            >
              View All Applications <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-3 p-4">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
              </div>
            ) : !data?.recent_applications?.length ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-10">No applications registered yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <th className="px-4 py-3">Applicant Name</th>
                      <th className="px-4 py-3">College & Branch</th>
                      <th className="px-4 py-3">Target Internship</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Applied On</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.recent_applications.map((app: any) => (
                      <tr key={app.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-slate-900 dark:text-white text-xs">{app.full_name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{app.email}</p>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-300">
                          <p className="font-medium text-slate-800 dark:text-slate-200">{app.college_name || '—'}</p>
                          <p className="text-slate-400">{app.branch || '—'}</p>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-300">
                          <span className="font-medium">{app.internship_title || 'General'}</span>
                          {app.duration && <span className="text-slate-400 block text-[11px]">{app.duration}</span>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize',
                            app.status === 'accepted' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' :
                            app.status === 'offer_sent' ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800' :
                            app.status === 'under_review' ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' :
                            app.status === 'payment_pending' ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800' :
                            'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          )}>
                            {app.status?.replace('_', ' ') || 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {formatDate(app.created_at, 'dd MMM yyyy')}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/50 h-8"
                          >
                            <Link to="/admin/applications">
                              Manage <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 2: Recent College Inquiries & Contact Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent College Partnerships */}
          <Card className="border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                  Recent College Inquiries
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                  Colleges requesting MoU or internship batch placements
                </CardDescription>
              </div>
              <Link
                to="/admin/inquiries"
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="space-y-3 p-4">
                  {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : !data?.recent_inquiries?.length ? (
                <p className="text-xs text-slate-400 text-center py-8">No college inquiries submitted yet.</p>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {data.recent_inquiries.map((inq: any) => (
                    <div key={inq.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{inq.college_name}</p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                          {inq.contact_person} • <a href={`mailto:${inq.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">{inq.email}</a>
                        </p>
                        {inq.phone && <p className="text-[10px] text-slate-400 mt-0.5">Tel: {inq.phone}</p>}
                      </div>
                      <div className="text-right shrink-0">
                        <span className={cn(
                          'inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-md border',
                          inq.status === 'resolved' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' :
                          inq.status === 'in_progress' ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800' :
                          'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                        )}>
                          {inq.status || 'new'}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {formatDate(inq.created_at, 'dd MMM')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Contact & Support Messages */}
          <Card className="border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  Recent Support Messages
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                  Direct support and feedback submissions from users
                </CardDescription>
              </div>
              <Link
                to="/admin/messages"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="space-y-3 p-4">
                  {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : !data?.recent_messages?.length ? (
                <p className="text-xs text-slate-400 text-center py-8">No messages received yet.</p>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {data.recent_messages.map((msg: any) => (
                    <div key={msg.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{msg.name}</p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                          {msg.subject ? <span className="font-medium text-slate-800 dark:text-slate-200">{msg.subject} • </span> : null}
                          <a href={`mailto:${msg.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">{msg.email}</a>
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={cn(
                          'inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-md border',
                          msg.status === 'resolved' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' :
                          'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                        )}>
                          {msg.status === 'resolved' ? 'read' : 'unread'}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {formatDate(msg.created_at, 'dd MMM')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Section 3: Bottom Platform Links */}
        <div className="flex flex-wrap items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Geek Intern Administration System Active & Synced</span>
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0 font-medium">
            <Link to="/admin/settings" className="hover:text-blue-600 dark:hover:text-blue-400">Platform Settings</Link>
            <span>•</span>
            <Link to="/admin/users" className="hover:text-blue-600 dark:hover:text-blue-400">Registered Students</Link>
            <span>•</span>
            <Link to="/admin/applications" className="hover:text-blue-600 dark:hover:text-blue-400">Pipeline</Link>
            <span>•</span>
            <Link to="/admin/inquiries" className="hover:text-blue-600 dark:hover:text-blue-400">Colleges</Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
