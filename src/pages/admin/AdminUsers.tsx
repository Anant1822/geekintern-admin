import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  CheckCircle2,
  Send,
  FileCheck,
  Building,
  Mail,
  Phone,
  ExternalLink,
  BookOpen,
  Calendar,
  Clock,
  Briefcase,
  Users,
  ShieldCheck,
  Award,
} from 'lucide-react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import api from '@/services/api'
import { supabase } from '@/lib/supabase'
import { formatDate, getInitials, cn } from '@/lib/utils'

const PAGE_SIZE = 15

export interface StudentCertificate {
  id: string
  certificate_id: string
  student_name: string
  domain: string
  duration: string
  issue_date: string
  grade: string
  status: string
  created_at: string
  image_url?: string | null
}

export interface StudentOfferLetter {
  id: string
  letter_id: string
  student_name: string
  email: string
  domain: string
  duration: string
  start_date: string
  stipend: string
  status: string
  image_url?: string | null
  uploaded_at?: string | null
}

export interface RegisteredStudentItem {
  id: string
  application_id?: string
  full_name: string
  email: string
  phone?: string
  college_name?: string
  branch?: string
  graduation_year?: string | number
  year_of_study?: string | number
  role?: string
  status?: string
  is_verified?: boolean
  internship_title?: string
  duration?: string
  linkedin_url?: string
  github_url?: string
  resume_url?: string
  message?: string
  source?: string
  created_at: string
  updated_at?: string
  applications_count?: number
  has_certificate?: boolean
  certificate?: StudentCertificate | null
  has_offer_letter?: boolean
  offer_letter?: StudentOfferLetter | null
}

const REGISTERED_STATUS_TABS = [
  { value: 'all', label: 'All Registered', icon: Users, color: 'text-blue-700', activeClass: 'bg-slate-900 text-white border-slate-900' },
  { value: 'accepted', label: 'Accepted / Ongoing', icon: CheckCircle2, color: 'text-emerald-700', activeClass: 'bg-emerald-600 text-white border-emerald-600' },
  { value: 'offer_sent', label: 'Offer Letter Sent', icon: Send, color: 'text-purple-700', activeClass: 'bg-purple-600 text-white border-purple-600' },
  { value: 'completed', label: 'Completed / Certified', icon: FileCheck, color: 'text-blue-700', activeClass: 'bg-blue-600 text-white border-blue-600' },
  { value: 'under_review', label: 'Under Review', icon: Clock, color: 'text-indigo-700', activeClass: 'bg-indigo-600 text-white border-indigo-600' },
  { value: 'pending', label: 'Pending / Applied', icon: Clock, color: 'text-amber-700', activeClass: 'bg-amber-600 text-white border-amber-600' },
]

export default function AdminUsers() {
  const navigate = useNavigate()
  const { isAdmin, isInitialized } = useAuth()
  const { toast } = useToast()

  const [students, setStudents] = useState<RegisteredStudentItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({
    all: 0,
    accepted: 0,
    offer_sent: 0,
    completed: 0,
    under_review: 0,
    pending: 0,
  })
  const [selected, setSelected] = useState<RegisteredStudentItem | null>(null)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim())
      setPage(1)
    }, 350)
    return () => clearTimeout(timer)
  }, [searchInput])

  const fetchStudents = useCallback(async () => {
    setLoading(true)
    try {
      const params: Record<string, string | number> = { page, limit: PAGE_SIZE }
      if (debouncedSearch) params.search = debouncedSearch
      if (statusFilter !== 'all') params.status = statusFilter
      const res = await api.get('/admin/students', { params })
      const body = res.data
      const list = Array.isArray(body?.data) ? body.data : (Array.isArray(body) ? body : [])
      setStudents(list)
      if (body?.status_counts) {
        setStatusCounts(body.status_counts)
      }
      const totalCount = typeof body?.pagination?.total === 'number'
        ? body.pagination.total
        : (typeof body?.total === 'number' ? body.total : list.length)
      setTotal(totalCount)
    } catch {
      // Fallback directly to Supabase client: fetch direct_applications & certificates
      try {
        let appQuery = supabase
          .from('direct_applications')
          .select('*')
          .order('created_at', { ascending: false })

        if (debouncedSearch) {
          appQuery = appQuery.or(`full_name.ilike.%${debouncedSearch}%,email.ilike.%${debouncedSearch}%,phone.ilike.%${debouncedSearch}%,internship_title.ilike.%${debouncedSearch}%,college_name.ilike.%${debouncedSearch}%`)
        }

        const [
          { data: directApps, error: directErr },
          { data: certificates },
          { data: settingsRows },
        ] = await Promise.all([
          appQuery,
          supabase.from('certificates').select('*'),
          supabase.from('app_settings').select('*').in('key', ['certificate_images_library', 'offer_letters_library']),
        ])

        if (directErr) throw directErr

        let imageLibMap: Record<string, { image_url: string }> = {}
        let offerLettersMap: Record<string, any> = {}

        settingsRows?.forEach((row: any) => {
          try {
            if (row.key === 'certificate_images_library' && row.value) {
              imageLibMap = JSON.parse(row.value)
            } else if (row.key === 'offer_letters_library' && row.value) {
              offerLettersMap = JSON.parse(row.value)
            }
          } catch {
            // ignore
          }
        })

        const certMap = new Map<string, any>()
        certificates?.forEach((c: any) => {
          if (c.student_name) {
            const nameKey = c.student_name.toLowerCase().trim()
            const certKey = (c.certificate_id || '').toUpperCase().trim()
            if (!certMap.has(nameKey)) {
              certMap.set(nameKey, {
                ...c,
                image_url: imageLibMap[certKey]?.image_url || null,
              })
            }
          }
        })

        let mappedStudents: RegisteredStudentItem[] = (directApps || []).map((d: any) => {
          const nameKey = (d.full_name || '').toLowerCase().trim()
          const emailKey = (d.email || '').toLowerCase().trim()
          const cert = certMap.get(nameKey) || null
          const offerLetter = offerLettersMap[emailKey] || offerLettersMap[nameKey] || null

          return {
            id: d.id,
            application_id: d.id,
            full_name: d.full_name,
            email: d.email,
            phone: d.phone,
            college_name: d.college_name,
            branch: d.branch,
            graduation_year: d.year_of_study,
            year_of_study: d.year_of_study,
            internship_title: d.internship_title,
            duration: d.duration,
            linkedin_url: d.linkedin_url,
            github_url: d.github_url,
            resume_url: d.resume_url,
            message: d.message,
            role: 'student',
            status: d.status || 'pending',
            is_verified: d.status === 'completed' || d.status === 'accepted' || d.status === 'offer_sent',
            source: 'application_registered',
            created_at: d.created_at,
            updated_at: d.updated_at || d.created_at,
            certificate: cert,
            has_certificate: Boolean(cert),
            offer_letter: offerLetter,
            has_offer_letter: Boolean(offerLetter),
          }
        })

        // Status counts
        const counts: Record<string, number> = {
          all: mappedStudents.length,
          accepted: 0,
          offer_sent: 0,
          completed: 0,
          under_review: 0,
          pending: 0,
        }
        mappedStudents.forEach((s) => {
          const st = (s.status || '').toLowerCase()
          if (st === 'accepted') counts.accepted++
          else if (st === 'offer_sent') counts.offer_sent++
          else if (st === 'completed') counts.completed++
          else if (st === 'under_review') counts.under_review++
          else if (st === 'pending' || st === 'submitted') counts.pending++
        })
        setStatusCounts(counts)

        // Filter
        if (statusFilter && statusFilter !== 'all') {
          if (statusFilter === 'pending') {
            mappedStudents = mappedStudents.filter((s) => s.status === 'pending' || s.status === 'submitted')
          } else {
            mappedStudents = mappedStudents.filter((s) => (s.status || '').toLowerCase() === statusFilter.toLowerCase())
          }
        }

        const totalCount = mappedStudents.length
        const offset = (page - 1) * PAGE_SIZE
        setStudents(mappedStudents.slice(offset, offset + PAGE_SIZE))
        setTotal(totalCount)
      } catch (fallbackErr) {
        console.error('Failed to load students:', fallbackErr)
        toast({ title: 'Error', description: 'Failed to load students.', variant: 'destructive' })
      }
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, statusFilter, toast])

  useEffect(() => { fetchStudents() }, [fetchStudents])

  const handleExport = async () => {
    try {
      const res = await api.get('/admin/students/export', { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = `registered_students_${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
      toast({ title: 'Export downloaded.' })
    } catch {
      toast({ title: 'Export failed.', variant: 'destructive' })
    }
  }

  const getStudentStatusBadge = (st?: string) => {
    const s = (st || 'accepted').toLowerCase()
    switch (s) {
      case 'accepted':
        return (
          <Badge className="bg-emerald-50 text-emerald-800 border-emerald-300 font-medium gap-1 text-[11px]">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Accepted / Ongoing
          </Badge>
        )
      case 'offer_sent':
        return (
          <Badge className="bg-purple-50 text-purple-800 border-purple-300 font-medium gap-1 text-[11px]">
            <Send className="h-3 w-3 text-purple-600" /> Offer Sent
          </Badge>
        )
      case 'completed':
        return (
          <Badge className="bg-blue-50 text-blue-800 border-blue-300 font-medium gap-1 text-[11px]">
            <FileCheck className="h-3 w-3 text-blue-600" /> Certified
          </Badge>
        )
      case 'under_review':
        return (
          <Badge className="bg-indigo-50 text-indigo-800 border-indigo-300 font-medium gap-1 text-[11px]">
            <Clock className="h-3 w-3 text-indigo-600" /> Under Review
          </Badge>
        )
      case 'rejected':
        return (
          <Badge className="bg-rose-50 text-rose-800 border-rose-300 font-medium gap-1 text-[11px]">
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge className="bg-amber-50 text-amber-800 border-amber-300 font-medium gap-1 text-[11px]">
            <Clock className="h-3 w-3 text-amber-600" /> Pending / Applied
          </Badge>
        )
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1

  return (
    <AdminLayout title="Registered Students">
      <div className="space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Registered Students</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Verified students who are accepted, ongoing, offer letter sent, or completed certified learners.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5 shadow-xs border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            <Download className="h-4 w-4" />
            Export Registered CSV
          </Button>
        </div>

        {/* Status Filter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {REGISTERED_STATUS_TABS.map((tab) => {
            const Icon = tab.icon
            const isSelected = statusFilter === tab.value
            const count = statusCounts[tab.value] ?? (tab.value === 'all' ? total : 0)

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => {
                  setStatusFilter(tab.value)
                  setPage(1)
                }}
                className={cn(
                  'flex flex-col items-start justify-between p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group',
                  isSelected
                    ? `${tab.activeClass} shadow-md ring-2 ring-offset-2 ring-slate-400 scale-[1.02]`
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400 hover:shadow-xs'
                )}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={cn(
                      'p-1.5 rounded-lg',
                      isSelected ? 'bg-white/20 text-white' : `${tab.color} dark:text-blue-400 bg-slate-50 dark:bg-slate-700/60 shadow-xs border border-slate-100 dark:border-slate-600`
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={cn(
                      'text-xs font-bold px-2 py-0.5 rounded-full',
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                    )}
                  >
                    {count}
                  </span>
                </div>

                <div className="w-full">
                  <div
                    className={cn(
                      'text-xs font-semibold leading-snug truncate',
                      isSelected ? 'text-white' : 'text-slate-800 dark:text-slate-200'
                    )}
                  >
                    {tab.label}
                  </div>
                  <div
                    className={cn(
                      'text-[10px] mt-0.5',
                      isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                    )}
                  >
                    {isSelected ? 'Active Filter' : 'Click to filter'}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-3.5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search registered students by name, email, phone, college, or domain..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9 text-sm bg-transparent text-slate-900 dark:text-white border-slate-200 dark:border-slate-800"
              />
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900 overflow-hidden">
          {loading ? (
            <div className="space-y-3 p-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !students.length ? (
            <EmptyState
              title="No registered students found"
              description="Accepted applicants and registered students will appear here automatically."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Candidate</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact & College</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Domain</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Enrolled On</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3.5">
                        <button
                          type="button"
                          onClick={() => setSelected(student)}
                          className="flex items-center gap-3 text-left group"
                        >
                          <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-700">
                            <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
                              {getInitials(student.full_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                              {student.full_name}
                              {student.has_certificate && (
                                <Badge className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 text-[10px] px-1.5 py-0 border-0 flex items-center gap-0.5">
                                  <Award className="h-3 w-3" /> Certified
                                </Badge>
                              )}
                            </p>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              {student.source === 'application_registered' ? 'Direct Applicant Lead' : 'Portal Account'}
                            </span>
                          </div>
                        </button>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600 dark:text-slate-300">
                        <div className="font-medium text-slate-800 dark:text-slate-200">{student.email} {student.phone ? `• ${student.phone}` : ''}</div>
                        <div className="text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[240px]">
                          {student.college_name || 'College not specified'}{student.branch ? ` (${student.branch})` : ''}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        {student.internship_title ? (
                          <span className="font-medium text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-800 inline-block">
                            {student.internship_title}
                          </span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 italic">General Track</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {getStudentStatusBadge(student.status)}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(student.created_at)}
                      </td>
                      <td className="px-4 py-3.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 h-8 text-xs font-semibold gap-1"
                          onClick={() => setSelected(student)}
                        >
                          View Full Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-1">
            <p>Page {page} of {totalPages} — {total} registered students</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Comprehensive Student Profile Modal showing ALL Details */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between pr-4 text-slate-900 dark:text-white">
              <span>Complete Student Details</span>
              {selected && getStudentStatusBadge(selected.status)}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-5 pt-2">
              {/* Header profile card */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <Avatar className="h-16 w-16 border-2 border-white dark:border-slate-800 shadow-xs">
                  <AvatarFallback className="bg-blue-600 text-white text-xl font-bold">
                    {getInitials(selected.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug truncate">{selected.full_name}</h3>
                    <Badge className="bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-[10px]">Registered Candidate</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300 mt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <Mail className="h-3.5 w-3.5 text-slate-400" /> {selected.email}
                    </span>
                    {selected.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-slate-400" /> {selected.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Details */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Academic Information
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-white dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <span className="text-slate-400 block mb-0.5">College Name</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selected.college_name || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Branch / Discipline</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selected.branch || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Year of Study</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selected.year_of_study || selected.graduation_year || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Internship Program Enrolled */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-purple-600 dark:text-purple-400" /> Internship Enrollment
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Track / Domain</span>
                    <span className="font-semibold text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800 inline-block">
                      {selected.internship_title || 'General Internship Program'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Duration</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selected.duration || '4 Weeks'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Enrolled / Registered At</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formatDate(selected.created_at)}</span>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/20">
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-amber-900 dark:text-amber-400 flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-amber-600" /> Certificate & Completion Status
                  </h4>
                  {selected.has_certificate ? (
                    <Badge className="bg-emerald-600 text-white text-[11px] px-2 py-0.5 font-semibold">
                      Verified & Issued
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 bg-amber-100/60 dark:bg-amber-900/40 text-[11px] px-2 py-0.5">
                      Pending Completion
                    </Badge>
                  )}
                </div>

                {selected.certificate ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs bg-white dark:bg-slate-800 p-3 rounded-lg border border-amber-100 dark:border-amber-900/40">
                      <div>
                        <span className="text-slate-400 block mb-0.5">Certificate ID</span>
                        <span className="font-bold text-slate-900 dark:text-white font-mono tracking-wide">{selected.certificate.certificate_id}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Domain</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{selected.certificate.domain}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Issue Date</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {selected.certificate.issue_date ? formatDate(selected.certificate.issue_date) : '—'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Grade / Evaluation</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 inline-block">
                          {selected.certificate.grade || 'A+'}
                        </span>
                      </div>
                    </div>

                    {selected.certificate.image_url && (
                      <div className="pt-2 border-t border-amber-100 dark:border-amber-900/40 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={selected.certificate.image_url}
                            alt="Certificate Document"
                            className="h-10 w-14 object-cover rounded border border-amber-200 dark:border-amber-800"
                          />
                          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Cloud Library Image Attached
                          </span>
                        </div>
                        <a
                          href={selected.certificate.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-700 dark:text-blue-400 hover:underline font-semibold"
                        >
                          View Full File ↗
                        </a>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-600 dark:text-slate-400">
                        Duration: <span className="font-medium text-slate-900 dark:text-white">{selected.certificate.duration || '4 Weeks'}</span>
                      </span>
                      <a
                        href={`/verify?id=${encodeURIComponent(selected.certificate.certificate_id)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-blue-700 dark:text-blue-400 hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> View Public Verification Page ↗
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-800/60 p-3 rounded-lg border border-amber-100 dark:border-amber-900/40">
                    <p>No certificate issued yet. Once this student is marked as completed in applications, an official certificate ID and credential link are automatically generated.</p>
                  </div>
                )}
              </div>

              {/* Official Offer Letter Details */}
              <div className="bg-gradient-to-r from-blue-50/70 to-indigo-50/70 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800/60 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                    <h4 className="text-xs uppercase font-bold tracking-wider text-blue-950 dark:text-blue-300">Official Internship Offer Letter</h4>
                  </div>
                  {selected.offer_letter ? (
                    <Badge className="bg-blue-600 text-white text-[11px] px-2 py-0.5">
                      Offer Letter Issued
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 text-[11px] px-2 py-0.5">
                      Not Issued Yet
                    </Badge>
                  )}
                </div>

                {selected.offer_letter ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs bg-white dark:bg-slate-800 p-3 rounded-lg border border-blue-100 dark:border-blue-900/40">
                      <div>
                        <span className="text-slate-400 block mb-0.5">Offer Letter ID</span>
                        <span className="font-bold text-blue-700 dark:text-blue-400 font-mono tracking-wide">{selected.offer_letter.letter_id}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Track / Domain</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{selected.offer_letter.domain}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Start Date</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {selected.offer_letter.start_date ? formatDate(selected.offer_letter.start_date) : 'Immediate'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Stipend</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 inline-block">
                          {selected.offer_letter.stipend || 'Performance Based'}
                        </span>
                      </div>
                    </div>

                    {selected.offer_letter.image_url && (
                      <div className="pt-2 border-t border-blue-100 dark:border-blue-900/40 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={selected.offer_letter.image_url}
                            alt="Offer Letter Document"
                            className="h-10 w-14 object-cover rounded border border-blue-200 dark:border-blue-800"
                          />
                          <span className="text-xs text-blue-700 dark:text-blue-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Cloud Document Uploaded
                          </span>
                        </div>
                        <a
                          href={selected.offer_letter.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-700 dark:text-blue-400 hover:underline font-semibold"
                        >
                          View Document ↗
                        </a>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-600 dark:text-slate-400">
                        Duration: <span className="font-medium text-slate-900 dark:text-white">{selected.offer_letter.duration || '4 Weeks'}</span>
                      </span>
                      <a
                        href={`/verify-offer-letter?id=${encodeURIComponent(selected.offer_letter.letter_id)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-blue-700 dark:text-blue-400 hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> View Public Offer Letter Page ↗
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-800/60 p-3 rounded-lg border border-blue-100 dark:border-blue-900/40 flex items-center justify-between">
                    <p>No offer letter generated yet for this student.</p>
                    <a
                      href="/admin/offer-letters"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      Issue in Offer Letter Library ↗
                    </a>
                  </div>
                )}
              </div>

              {/* External Profiles & Resume */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                  <ExternalLink className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Profiles & Resume Documents
                </h4>
                <div className="flex flex-wrap gap-2 text-xs bg-white dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  {selected.resume_url ? (
                    <a
                      href={selected.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 font-medium transition-colors"
                    >
                      <FileCheck className="h-3.5 w-3.5" /> View Resume Document ↗
                    </a>
                  ) : (
                    <span className="text-slate-400 italic">No resume URL submitted</span>
                  )}
                  {selected.linkedin_url && (
                    <a
                      href={selected.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 font-medium transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> LinkedIn ↗
                    </a>
                  )}
                  {selected.github_url && (
                    <a
                      href={selected.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 font-medium transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> GitHub ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Applicant Message / Notes */}
              {selected.message && (
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Candidate Statement / Message
                  </h4>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>
              )}

              {/* Quick Communication Actions */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <Button asChild size="sm" variant="outline" className="text-xs gap-1.5 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <a href={`mailto:${selected.email}?subject=Intership Update - ${encodeURIComponent(selected.internship_title || 'Internship')}`}>
                    <Mail className="h-3.5 w-3.5" /> Email Student
                  </a>
                </Button>
                {selected.phone && (
                  <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5">
                    <a
                      href={`https://wa.me/91${selected.phone.replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(`Hi ${selected.full_name}, regarding your internship with Geek Intern...`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="h-3.5 w-3.5" /> WhatsApp Student
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
