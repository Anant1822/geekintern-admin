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
import api, { isBackendAvailable } from '@/services/api'
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
    const fetchFromSupabaseDirect = async () => {
      let query = supabase
        .from('direct_applications')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })

      if (debouncedSearch) {
        query = query.or(`full_name.ilike.%${debouncedSearch}%,email.ilike.%${debouncedSearch}%,college_name.ilike.%${debouncedSearch}%`)
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      const from = (page - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1
      const { data: directData, count: directCount, error: directErr } = await query.range(from, to)

      if (directErr) throw directErr

      const transformed: RegisteredStudentItem[] = (directData || []).map((app: any) => ({
        id: app.id,
        full_name: app.full_name || 'Student Candidate',
        email: app.email,
        phone: app.phone || '',
        college_name: app.college_name || '',
        branch: app.branch || '',
        year_of_study: app.year_of_study || '',
        created_at: app.created_at,
        role: 'student',
        target_internship: app.internship_title || 'Internship Lead',
        internship_title: app.internship_title,
        internship_duration: app.duration,
        resume_url: app.resume_url,
        linkedin_url: app.linkedin_url,
        github_url: app.github_url,
        status: app.status || 'pending',
        has_certificate: false,
        has_offer_letter: false,
        is_registered_account: false,
      }))

      setStudents(transformed)
      setTotal(directCount || 0)
    }

    try {
      if (!isBackendAvailable) {
        await fetchFromSupabaseDirect()
        return
      }

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
      try {
        await fetchFromSupabaseDirect()
      } catch (fallbackErr) {
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
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Registered Students</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Verified students who are accepted, ongoing, offer letter sent, or completed certified learners.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5 shadow-xs">
            <Download className="h-4 w-4" />
            Export Registered CSV
          </Button>
        </div>

        {/* Search Input */}
        <Card className="border border-slate-200 shadow-xs bg-white">
          <CardContent className="p-3.5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search registered students by name, email, phone, college, or domain..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Student Table */}
        <Card className="border border-slate-200 shadow-xs overflow-hidden bg-white">
          {loading ? (
            <div className="space-y-3 p-4">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : !students.length ? (
            <EmptyState icon={GraduationCap} title="No registered students found" description="Try switching status tabs or adjusting your search term." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-slate-50/80 text-left">
                    {['Student Name', 'General Details', 'Enrolled Track', 'Status', 'Registered', 'Action'].map((h) => (
                      <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-blue-50/40 transition-colors group">
                      <td className="px-4 py-3.5">
                        <button
                          type="button"
                          onClick={() => setSelected(student)}
                          className="flex items-center gap-2.5 text-left group-hover:opacity-95 focus:outline-hidden"
                        >
                          <Avatar className="h-9 w-9 border border-slate-200 group-hover:border-blue-400 transition-colors">
                            <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                              {getInitials(student.full_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight flex items-center gap-1.5">
                              <span>{student.full_name}</span>
                              {student.has_certificate && (
                                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 text-[10px] px-1.5 py-0 border-0 flex items-center gap-0.5">
                                  <Award className="h-3 w-3" /> Certified
                                </Badge>
                              )}
                            </p>
                            <span className="text-[11px] text-slate-500">
                              {student.source === 'application_registered' ? 'Direct Applicant Lead' : 'Portal Account'}
                            </span>
                          </div>
                        </button>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600">
                        <div className="font-medium text-slate-800">{student.email} {student.phone ? `• ${student.phone}` : ''}</div>
                        <div className="text-slate-500 mt-0.5 truncate max-w-[240px]">
                          {student.college_name || 'College not specified'}{student.branch ? ` (${student.branch})` : ''}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        {student.internship_title ? (
                          <span className="font-medium text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block">
                            {student.internship_title}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">General Track</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {getStudentStatusBadge(student.status)}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                        {formatDate(student.created_at)}
                      </td>
                      <td className="px-4 py-3.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-700 border-blue-200 hover:bg-blue-50 h-8 text-xs font-semibold gap-1"
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between pr-4">
              <span>Complete Student Details</span>
              {selected && getStudentStatusBadge(selected.status)}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-5 pt-2">
              {/* Header profile card */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Avatar className="h-16 w-16 border-2 border-white shadow-xs">
                  <AvatarFallback className="bg-blue-600 text-white text-xl font-bold">
                    {getInitials(selected.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 text-lg leading-snug truncate">{selected.full_name}</h3>
                    <Badge className="bg-blue-100 text-blue-800 text-[10px]">Registered Candidate</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-1">
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
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-blue-600" /> Academic Information
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-white p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block mb-0.5">College Name</span>
                    <span className="font-semibold text-slate-800">{selected.college_name || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Branch / Discipline</span>
                    <span className="font-semibold text-slate-800">{selected.branch || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Year of Study</span>
                    <span className="font-semibold text-slate-800">{selected.year_of_study || selected.graduation_year || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Internship Program Enrolled */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-purple-600" /> Internship Enrollment
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Track / Domain</span>
                    <span className="font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block">
                      {selected.internship_title || 'General Internship Program'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Duration</span>
                    <span className="font-semibold text-slate-800">{selected.duration || '4 Weeks'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Enrolled / Registered At</span>
                    <span className="font-semibold text-slate-800">{formatDate(selected.created_at)}</span>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-amber-600" /> Certificate & Completion Status
                  </h4>
                  {selected.has_certificate ? (
                    <Badge className="bg-emerald-600 text-white text-[11px] px-2 py-0.5 font-semibold">
                      Verified & Issued
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-amber-800 border-amber-300 bg-amber-100/60 text-[11px] px-2 py-0.5">
                      Pending Completion
                    </Badge>
                  )}
                </div>

                {selected.certificate ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs bg-white p-3 rounded-lg border border-amber-100">
                      <div>
                        <span className="text-slate-400 block mb-0.5">Certificate ID</span>
                        <span className="font-bold text-slate-900 font-mono tracking-wide">{selected.certificate.certificate_id}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Domain</span>
                        <span className="font-semibold text-slate-800">{selected.certificate.domain}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Issue Date</span>
                        <span className="font-semibold text-slate-800">
                          {selected.certificate.issue_date ? formatDate(selected.certificate.issue_date) : '—'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Grade / Evaluation</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                          {selected.certificate.grade || 'A+'}
                        </span>
                      </div>
                    </div>

                    {selected.certificate.image_url && (
                      <div className="pt-2 border-t border-amber-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={selected.certificate.image_url}
                            alt="Certificate Document"
                            className="h-10 w-14 object-cover rounded border border-amber-200"
                          />
                          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Cloud Library Image Attached
                          </span>
                        </div>
                        <a
                          href={selected.certificate.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-700 hover:underline font-semibold"
                        >
                          View Full File ↗
                        </a>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-600">
                        Duration: <span className="font-medium text-slate-900">{selected.certificate.duration || '4 Weeks'}</span>
                      </span>
                      <a
                        href={`/verify?id=${encodeURIComponent(selected.certificate.certificate_id)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> View Public Verification Page ↗
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-600 bg-white/70 p-3 rounded-lg border border-amber-100">
                    <p>No certificate issued yet. Once this student is marked as completed in applications, an official certificate ID and credential link are automatically generated.</p>
                  </div>
                )}
              </div>

              {/* Official Offer Letter Details */}
              <div className="bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-blue-700" />
                    <h4 className="text-xs uppercase font-bold tracking-wider text-blue-950">Official Internship Offer Letter</h4>
                  </div>
                  {selected.offer_letter ? (
                    <Badge className="bg-blue-600 text-white text-[11px] px-2 py-0.5">
                      Offer Letter Issued
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-slate-600 border-slate-300 bg-white/60 text-[11px] px-2 py-0.5">
                      Not Issued Yet
                    </Badge>
                  )}
                </div>

                {selected.offer_letter ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs bg-white p-3 rounded-lg border border-blue-100">
                      <div>
                        <span className="text-slate-400 block mb-0.5">Offer Letter ID</span>
                        <span className="font-bold text-blue-700 font-mono tracking-wide">{selected.offer_letter.letter_id}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Track / Domain</span>
                        <span className="font-semibold text-slate-800">{selected.offer_letter.domain}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Start Date</span>
                        <span className="font-semibold text-slate-800">
                          {selected.offer_letter.start_date ? formatDate(selected.offer_letter.start_date) : 'Immediate'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Stipend</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                          {selected.offer_letter.stipend || 'Performance Based'}
                        </span>
                      </div>
                    </div>

                    {selected.offer_letter.image_url && (
                      <div className="pt-2 border-t border-blue-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={selected.offer_letter.image_url}
                            alt="Offer Letter Document"
                            className="h-10 w-14 object-cover rounded border border-blue-200"
                          />
                          <span className="text-xs text-blue-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Cloud Document Uploaded
                          </span>
                        </div>
                        <a
                          href={selected.offer_letter.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-700 hover:underline font-semibold"
                        >
                          View Document ↗
                        </a>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-600">
                        Duration: <span className="font-medium text-slate-900">{selected.offer_letter.duration || '4 Weeks'}</span>
                      </span>
                      <a
                        href={`/verify-offer-letter?id=${encodeURIComponent(selected.offer_letter.letter_id)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> View Public Offer Letter Page ↗
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-600 bg-white/70 p-3 rounded-lg border border-blue-100 flex items-center justify-between">
                    <p>No offer letter generated yet for this student.</p>
                    <a
                      href="/admin/offer-letters"
                      className="text-xs text-blue-600 hover:underline font-semibold"
                    >
                      Issue in Offer Letter Library ↗
                    </a>
                  </div>
                )}
              </div>

              {/* External Profiles & Resume */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <ExternalLink className="h-4 w-4 text-emerald-600" /> Profiles & Resume Documents
                </h4>
                <div className="flex flex-wrap gap-2 text-xs bg-white p-4 rounded-xl border border-slate-200">
                  {selected.resume_url ? (
                    <a
                      href={selected.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-medium transition-colors"
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-medium transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> LinkedIn ↗
                    </a>
                  )}
                  {selected.github_url && (
                    <a
                      href={selected.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 font-medium transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> GitHub ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Applicant Message / Notes */}
              {selected.message && (
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-1.5">
                    Candidate Statement / Message
                  </h4>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>
              )}

              {/* Quick Communication Actions */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <Button asChild size="sm" variant="outline" className="text-xs gap-1.5">
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
