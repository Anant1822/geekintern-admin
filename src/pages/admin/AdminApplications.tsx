import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Loader2,
  SlidersHorizontal,
  Phone,
  Mail,
  ExternalLink,
  MessageSquare,
  GraduationCap,
  Calendar,
  Building,
  Clock,
  CheckCircle2,
  XCircle,
  FileCheck,
  Send,
  Users,
  Sparkles,
} from 'lucide-react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import LoadingPage from '@/components/common/LoadingPage'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import api from '@/services/api'
import { supabase } from '@/lib/supabase'
import { formatDate, cn } from '@/lib/utils'

const PAGE_SIZE = 15

const ALL_STATUSES = [
  {
    value: 'all',
    label: 'All Leads',
    icon: Users,
    color: 'text-slate-700 dark:text-slate-300',
    bgColor: 'bg-slate-50 dark:bg-slate-800/80',
    borderColor: 'border-slate-200 dark:border-slate-700',
    activeBg: 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100',
    badgeClass: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
  },
  {
    value: 'pending',
    label: 'New / Pending',
    icon: Clock,
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50/70 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800/60',
    activeBg: 'bg-amber-600 text-white border-amber-600',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
  },
  {
    value: 'under_review',
    label: 'Under Review',
    icon: Search,
    color: 'text-indigo-700 dark:text-indigo-400',
    bgColor: 'bg-indigo-50/70 dark:bg-indigo-950/30',
    borderColor: 'border-indigo-200 dark:border-indigo-800/60',
    activeBg: 'bg-indigo-600 text-white border-indigo-600',
    badgeClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300',
  },
  {
    value: 'accepted',
    label: 'Accepted / Ongoing',
    icon: CheckCircle2,
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50/70 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800/60',
    activeBg: 'bg-emerald-600 text-white border-emerald-600',
    badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
  },
  {
    value: 'offer_sent',
    label: 'Offer Sent',
    icon: Send,
    color: 'text-purple-700 dark:text-purple-400',
    bgColor: 'bg-purple-50/70 dark:bg-purple-950/30',
    borderColor: 'border-purple-200 dark:border-purple-800/60',
    activeBg: 'bg-purple-600 text-white border-purple-600',
    badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300',
  },
  {
    value: 'completed',
    label: 'Completed & Certified',
    icon: FileCheck,
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-50/70 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800/60',
    activeBg: 'bg-blue-600 text-white border-blue-600',
    badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
  },
  {
    value: 'rejected',
    label: 'Rejected',
    icon: XCircle,
    color: 'text-rose-700 dark:text-rose-400',
    bgColor: 'bg-rose-50/70 dark:bg-rose-950/30',
    borderColor: 'border-rose-200 dark:border-rose-800/60',
    activeBg: 'bg-rose-600 text-white border-rose-600',
    badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
  },
]

export interface CustomerApplication {
  id: string
  full_name: string
  email: string
  phone: string
  college_name: string
  branch: string
  year_of_study: string
  internship_id?: string
  internship_title: string
  duration: string
  linkedin_url?: string
  github_url?: string
  resume_url?: string
  message?: string
  status: string
  created_at: string
}

export default function AdminApplications() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [applications, setApplications] = useState<CustomerApplication[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'pending' | 'complete'>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null)

  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({
    all: 0,
    pending: 0,
    under_review: 0,
    payment_pending: 0,
    payment_complete: 0,
    offer_sent: 0,
    accepted: 0,
    completed: 0,
    rejected: 0,
  })

  // Debounce search input by 350ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim())
      setPage(1)
    }, 350)
    return () => clearTimeout(timer)
  }, [searchInput])

  const fetchApplications = useCallback(async (isInitial = false) => {
    if (isInitial) {
      setLoading(true)
    } else {
      setIsFetching(true)
    }
    try {
      const params: Record<string, string | number> = { page, limit: PAGE_SIZE }
      if (debouncedSearch) params.search = debouncedSearch
      if (statusFilter !== 'all') params.status = statusFilter
      if (statusFilter === 'under_review' && paymentFilter !== 'all') {
        params.payment = paymentFilter
      }
      if (dateFrom) params.date_from = dateFrom
      if (dateTo) params.date_to = dateTo

      const res = await api.get('/admin/applications', { params })
      const body = res.data
      setApplications(Array.isArray(body?.data) ? body.data : (Array.isArray(body) ? body : []))
      if (body?.status_counts) {
        setStatusCounts(body.status_counts)
      }
      const totalCount = typeof body?.pagination?.total === 'number'
        ? body.pagination.total
        : (typeof body?.total === 'number' ? body.total : (Array.isArray(body?.data) ? body.data.length : 0))
      setTotal(totalCount)
    } catch {
      // Direct Supabase fallback
      try {
        const offset = (page - 1) * PAGE_SIZE
        let query = supabase
          .from('direct_applications')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })

        if (statusFilter && statusFilter !== 'all') {
          if (statusFilter === 'pending') {
            query = query.or('status.eq.pending,status.eq.submitted')
          } else {
            query = query.eq('status', statusFilter)
          }
        }

        if (debouncedSearch) {
          query = query.or(`full_name.ilike.%${debouncedSearch}%,email.ilike.%${debouncedSearch}%,phone.ilike.%${debouncedSearch}%,internship_title.ilike.%${debouncedSearch}%,college_name.ilike.%${debouncedSearch}%`)
        }

        if (dateFrom) {
          query = query.gte('created_at', `${dateFrom}T00:00:00Z`)
        }
        if (dateTo) {
          query = query.lte('created_at', `${dateTo}T23:59:59Z`)
        }

        query = query.range(offset, offset + PAGE_SIZE - 1)

        const { data, count, error } = await query
        if (error) throw error

        setApplications((data as CustomerApplication[]) ?? [])
        setTotal(count ?? data?.length ?? 0)

        // Compute counts
        const { data: allStatuses } = await supabase.from('direct_applications').select('status')
        if (allStatuses) {
          const counts: Record<string, number> = {
            all: allStatuses.length,
            pending: 0,
            under_review: 0,
            payment_pending: 0,
            payment_complete: 0,
            offer_sent: 0,
            accepted: 0,
            completed: 0,
            rejected: 0,
          }
          allStatuses.forEach((row: any) => {
            const s = row.status?.toLowerCase()
            if (s === 'submitted' || s === 'pending') {
              counts.pending = (counts.pending || 0) + 1
            } else if (s === 'payment_pending') {
              counts.payment_pending = (counts.payment_pending || 0) + 1
              counts.under_review = (counts.under_review || 0) + 1
            } else if (s === 'payment_complete') {
              counts.payment_complete = (counts.payment_complete || 0) + 1
              counts.under_review = (counts.under_review || 0) + 1
            } else if (counts[s] !== undefined) {
              counts[s] = (counts[s] || 0) + 1
            }
          })
          setStatusCounts(counts)
        }
      } catch (fallbackErr) {
        console.error('Failed to load applications:', fallbackErr)
        toast({ title: 'Error', description: 'Failed to load applications.', variant: 'destructive' })
      }
    } finally {
      setLoading(false)
      setIsFetching(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch, statusFilter, paymentFilter, dateFrom, dateTo])

  useEffect(() => {
    fetchApplications(loading && applications.length === 0)
  }, [fetchApplications])

  const handleStatusUpdate = async (id: string, status: string) => {
    setUpdatingStatusId(id)
    try {
      await api.patch(`/admin/applications/${id}/status`, { status })
      toast({ title: 'Status updated successfully!' })
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      )
    } catch {
      try {
        const { error } = await supabase
          .from('direct_applications')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', id)
        if (error) throw error
        toast({ title: 'Status updated successfully!' })
        setApplications((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status } : a))
        )
      } catch (fallbackErr) {
        console.error('Status update failed', fallbackErr)
        toast({ title: 'Update Failed', description: 'Could not update status.', variant: 'destructive' })
      }
    } finally {
      setUpdatingStatusId(null)
    }
  }

  const handleExport = async () => {
    try {
      const res = await api.get('/admin/applications/export', { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = `geekintern_leads_${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
      toast({ title: 'Export downloaded', description: 'Customer leads exported to CSV.' })
    } catch (err) {
      console.error('Export error', err)
      toast({ title: 'Export failed', description: 'Could not download CSV export.', variant: 'destructive' })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return (
          <Badge className="bg-emerald-50 text-emerald-800 border-emerald-300 font-medium gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Accepted
          </Badge>
        )
      case 'offer_sent':
        return (
          <Badge className="bg-purple-50 text-purple-800 border-purple-300 font-medium gap-1">
            <Send className="h-3 w-3 text-purple-600" /> Offer Sent
          </Badge>
        )
      case 'completed':
        return (
          <Badge className="bg-blue-50 text-blue-800 border-blue-300 font-medium gap-1">
            <FileCheck className="h-3 w-3 text-blue-600" /> Certified
          </Badge>
        )
      case 'under_review':
        return (
          <Badge className="bg-indigo-50 text-indigo-800 border-indigo-300 font-medium gap-1">
            <Search className="h-3 w-3 text-indigo-600" /> Under Review
          </Badge>
        )
      case 'payment_pending':
        return (
          <Badge className="bg-amber-50 text-amber-900 border-amber-300 font-medium gap-1">
            <Clock className="h-3 w-3 text-amber-600" /> Payment Pending
          </Badge>
        )
      case 'payment_complete':
        return (
          <Badge className="bg-emerald-50 text-emerald-900 border-emerald-300 font-medium gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Payment Complete
          </Badge>
        )
      case 'rejected':
        return (
          <Badge className="bg-rose-50 text-rose-800 border-rose-300 font-medium gap-1">
            <XCircle className="h-3 w-3 text-rose-600" /> Rejected
          </Badge>
        )
      case 'submitted':
      case 'pending':
      default:
        return (
          <Badge className="bg-amber-50 text-amber-800 border-amber-300 font-medium gap-1">
            <Clock className="h-3 w-3 text-amber-600" /> Pending
          </Badge>
        )
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1

  return (
    <AdminLayout title="Customer Applications & Leads">
      <div className="space-y-5 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Applicant Leads ({total})
            </h2>
            <p className="text-sm text-slate-500">
              Customer inquiries and virtual internship applications submitted via website
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters((f) => !f)}
              className="gap-1.5"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <Button
              size="sm"
              onClick={handleExport}
              className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            >
              <Download className="h-4 w-4" />
              Export Leads (CSV)
            </Button>
          </div>
        </div>

        {/* Status List & Differentiators at Top of Page */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {ALL_STATUSES.map((s) => {
            const Icon = s.icon
            const isSelected = statusFilter === s.value
            const count = statusCounts[s.value] ?? (s.value === 'all' ? total : 0)

            return (
              <button
                key={s.value}
                type="button"
                onClick={() => {
                  setStatusFilter(s.value)
                  if (s.value !== 'under_review') {
                    setPaymentFilter('all')
                  }
                  setPage(1)
                }}
                className={cn(
                  'flex flex-col items-start justify-between p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group',
                  isSelected
                    ? `${s.activeBg} shadow-md ring-2 ring-offset-2 ring-slate-400 scale-[1.02]`
                    : `${s.bgColor} ${s.borderColor} hover:border-slate-400 hover:shadow-xs bg-white`
                )}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={cn(
                      'p-1.5 rounded-lg',
                      isSelected ? 'bg-white/20 text-white' : `${s.color} bg-white shadow-xs border border-slate-100`
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={cn(
                      'text-xs font-bold px-2 py-0.5 rounded-full',
                      isSelected ? 'bg-white/20 text-white' : s.badgeClass
                    )}
                  >
                    {count}
                  </span>
                </div>

                <div className="w-full">
                  <div
                    className={cn(
                      'text-xs font-semibold leading-snug truncate',
                      isSelected ? 'text-white' : 'text-slate-800'
                    )}
                  >
                    {s.label}
                  </div>
                  <div
                    className={cn(
                      'text-[10px] mt-0.5',
                      isSelected ? 'text-white/80' : 'text-slate-500'
                    )}
                  >
                    {isSelected ? 'Active Filter' : 'Click to filter'}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Sub-group bar for "Under Review": Payment Pending vs Payment Complete */}
        {statusFilter === 'under_review' && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl animate-in fade-in duration-200">
            <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5 mr-1">
              <Search className="h-3.5 w-3.5 text-indigo-600" />
              Under Review Sub-Groups:
            </span>
            <button
              type="button"
              onClick={() => {
                setPaymentFilter('all')
                setPage(1)
              }}
              className={cn(
                'text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all',
                paymentFilter === 'all'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              )}
            >
              All Under Review ({statusCounts.under_review ?? 0})
            </button>
            <button
              type="button"
              onClick={() => {
                setPaymentFilter('pending')
                setPage(1)
              }}
              className={cn(
                'text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all',
                paymentFilter === 'pending'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-50/60'
              )}
            >
              <Clock className="h-3.5 w-3.5" />
              Payment Pending ({statusCounts.payment_pending ?? 0})
            </button>
            <button
              type="button"
              onClick={() => {
                setPaymentFilter('complete')
                setPage(1)
              }}
              className={cn(
                'text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all',
                paymentFilter === 'complete'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50/60'
              )}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Payment Complete ({statusCounts.payment_complete ?? 0})
            </button>
          </div>
        )}

        {/* Search & Secondary Filters */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                {isFetching ? (
                  <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 animate-spin" />
                ) : (
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                )}
                <Input
                  placeholder="Search by student name, email, phone, college, or domain..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-9 bg-transparent text-slate-900 dark:text-white border-slate-200 dark:border-slate-800"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v)
                  setPage(1)
                }}
              >
                <SelectTrigger className="w-full sm:w-52 bg-transparent text-slate-900 dark:text-white border-slate-200 dark:border-slate-800">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label} ({statusCounts[s.value] ?? (s.value === 'all' ? total : 0)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {showFilters && (
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex-1">
                  <Label className="text-xs mb-1 text-slate-600 dark:text-slate-400">From Date</Label>
                  <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="bg-transparent text-slate-900 dark:text-white border-slate-200 dark:border-slate-800" />
                </div>
                <div className="flex-1">
                  <Label className="text-xs mb-1 text-slate-600 dark:text-slate-400">To Date</Label>
                  <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="bg-transparent text-slate-900 dark:text-white border-slate-200 dark:border-slate-800" />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDateFrom('')
                      setDateTo('')
                    }}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    Reset Dates
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Table of Leads */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900 overflow-hidden relative">
          {/* Subtle background fetching progress bar */}
          {isFetching && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-100 dark:bg-blue-950 overflow-hidden z-20">
              <div className="h-full bg-blue-600 animate-pulse w-full"></div>
            </div>
          )}

          {loading ? (
            <div className="space-y-3 p-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !applications.length ? (
            <EmptyState
              title="No customer applications found"
              description="New student applications from the website will appear here in real-time."
            />
          ) : (
            <div className={cn("overflow-x-auto transition-opacity duration-150", isFetching && "opacity-75")}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Applicant</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact & WhatsApp</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">College & Branch</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Internship Domain</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Duration</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Applied Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-3 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {applications.map((app) => {
                    const cleanPhone = (app.phone || '').replace(/\D/g, '')
                    const whatsappLink = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                      `Hello ${app.full_name}, thank you for applying for the ${app.internship_title} virtual internship at Geek Intern! We are preparing your offer letter and task kit.`
                    )}`

                    const isExpanded = expandedId === app.id

                    return (
                      <React.Fragment key={app.id}>
                        <tr
                          key={app.id}
                          className={cn(
                            'hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors cursor-pointer',
                            isExpanded && 'bg-blue-50/30 dark:bg-blue-950/30'
                          )}
                          onClick={() => setExpandedId(isExpanded ? null : app.id)}
                        >
                          {/* Name & Email */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <div className="font-semibold text-slate-900 dark:text-white">{app.full_name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                              <Mail className="h-3 w-3" />
                              <a
                                href={`mailto:${app.email}`}
                                onClick={(e) => e.stopPropagation()}
                                className="hover:underline text-blue-600 dark:text-blue-400"
                              >
                                {app.email}
                              </a>
                            </div>
                          </td>

                          {/* Phone & WhatsApp */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <div className="text-slate-800 dark:text-slate-200 font-medium text-xs flex items-center gap-1.5">
                              <Phone className="h-3 w-3 text-slate-400" />
                              <span>{app.phone}</span>
                            </div>
                            {cleanPhone && (
                              <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 mt-1"
                              >
                                WhatsApp Chat ↗
                              </a>
                            )}
                          </td>

                          {/* College & Branch */}
                          <td className="px-4 py-3.5">
                            <div className="text-slate-800 dark:text-slate-200 text-xs font-medium max-w-[180px] truncate">
                              {app.college_name}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 max-w-[180px] truncate">
                              {app.branch} ({app.year_of_study})
                            </div>
                          </td>

                          {/* Domain */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className="font-medium text-blue-900 dark:text-blue-200 text-xs bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-800">
                              {app.internship_title}
                            </span>
                          </td>

                          {/* Duration */}
                          <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-600 dark:text-slate-300">
                            {app.duration || '4 Weeks'}
                          </td>

                          {/* Applied Date */}
                          <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                            {formatDate(app.created_at, 'dd MMM yyyy')}
                          </td>


                          {/* Status */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            {getStatusBadge(app.status)}
                          </td>

                          {/* Expand */}
                          <td className="px-3 py-3.5 text-right text-slate-400">
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </td>
                        </tr>

                        {/* Detailed Card View on Row Click */}
                        {isExpanded && (
                          <tr key={`${app.id}-details`} className="bg-slate-50/80 dark:bg-slate-800/50">
                            <td colSpan={8} className="p-6 border-t border-b border-slate-200 dark:border-slate-800">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Academic & Profile Links */}
                                <div className="space-y-3">
                                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                                    Academic Details & Links
                                  </h4>
                                  <div className="text-xs space-y-2 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                      <Building className="h-3.5 w-3.5 text-slate-400" />
                                      <span><strong className="text-slate-900 dark:text-white">College:</strong> {app.college_name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                                      <span><strong className="text-slate-900 dark:text-white">Branch / Year:</strong> {app.branch} ({app.year_of_study})</span>
                                    </div>
                                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
                                      {app.linkedin_url && (
                                        <a
                                          href={app.linkedin_url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
                                        >
                                          <ExternalLink className="h-3 w-3" /> LinkedIn Profile
                                        </a>
                                      )}
                                      {app.github_url && (
                                        <a
                                          href={app.github_url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-slate-800 dark:text-slate-300 hover:underline inline-flex items-center gap-1 font-medium"
                                        >
                                          <ExternalLink className="h-3 w-3" /> GitHub Profile
                                        </a>
                                      )}
                                      {app.resume_url && (
                                        <a
                                          href={app.resume_url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium"
                                        >
                                          <ExternalLink className="h-3 w-3" /> Resume / Drive Link
                                        </a>
                                      )}
                                      {!app.linkedin_url && !app.github_url && !app.resume_url && (
                                        <span className="text-slate-400 italic">No external links provided</span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Applicant Message */}
                                <div className="space-y-3">
                                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                                    Learning Goals & Message
                                  </h4>
                                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 min-h-[100px]">
                                    {app.message ? (
                                      <p className="whitespace-pre-wrap">{app.message}</p>
                                    ) : (
                                      <p className="text-slate-400 italic">No custom notes submitted by applicant.</p>
                                    )}
                                  </div>
                                </div>

                                {/* Manage Application Status */}
                                <div className="space-y-3">
                                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                                    Update Application Status
                                  </h4>
                                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                                    <Select
                                      defaultValue={app.status}
                                      onValueChange={(val) => handleStatusUpdate(app.id, val)}
                                      disabled={updatingStatusId === app.id}
                                    >
                                      <SelectTrigger className="w-full bg-transparent text-slate-900 dark:text-white border-slate-200 dark:border-slate-800">
                                        <SelectValue placeholder="Select Status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="under_review">Under Review</SelectItem>
                                        <SelectItem value="payment_pending">Payment Pending</SelectItem>
                                        <SelectItem value="payment_complete">Payment Complete</SelectItem>
                                        <SelectItem value="accepted">Accepted / Ongoing</SelectItem>
                                        <SelectItem value="offer_sent">Offer Letter Sent</SelectItem>
                                        <SelectItem value="completed">Completed & Certified</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                      </SelectContent>
                                    </Select>

                                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                      Changing status updates the internal applicant pipeline in real-time.
                                    </div>

                                    <a
                                      href={whatsappLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-xs shadow-xs"
                                    >
                                      <MessageSquare className="h-3.5 w-3.5" />
                                      Send WhatsApp Offer Kit
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  )
}
