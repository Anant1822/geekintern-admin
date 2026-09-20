import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Building2, ChevronLeft, ChevronRight, Mail, Phone, Globe, Calendar, ExternalLink } from 'lucide-react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import LoadingPage from '@/components/common/LoadingPage'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import api from '@/services/api'
import { formatDate } from '@/lib/utils'

interface CollegeInquiryItem {
  id: string
  college_name: string
  university?: string
  city: string
  state: string
  contact_person: string
  email: string
  phone: string
  student_count?: number
  branches?: string[]
  website?: string
  message?: string
  document_url?: string
  status: 'new' | 'in_progress' | 'resolved'
  created_at: string
}

const PAGE_SIZE = 15

export default function AdminInquiries() {
  const navigate = useNavigate()
  const { isAdmin, isInitialized } = useAuth()
  const { toast } = useToast()

  const [inquiries, setInquiries] = useState<CollegeInquiryItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState<CollegeInquiryItem | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    // Admin inquiries accessible
  }, [navigate])

  const fetchInquiries = useCallback(async () => {
    setLoading(true)
    try {
      const params: Record<string, string | number> = { page, limit: PAGE_SIZE }
      if (search.trim()) params.search = search.trim()
      if (statusFilter !== 'all') params.status = statusFilter
      const res = await api.get('/admin/college-inquiries', { params })
      const body = res.data
      const list = Array.isArray(body) ? body : (body.data ?? [])
      setInquiries(list)
      const totalCount = typeof body?.pagination?.total === 'number'
        ? body.pagination.total
        : (typeof body?.total === 'number' ? body.total : list.length)
      setTotal(totalCount)
    } catch {
      toast({ title: 'Error', description: 'Failed to load college inquiries.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }, [page, search, statusFilter, toast])

  const handleUpdateStatus = async (id: string, newStatus: 'new' | 'in_progress' | 'resolved') => {
    setUpdatingId(id)
    try {
      await api.patch(`/admin/college-inquiries/${id}/status`, { status: newStatus })
      toast({ title: 'Status updated', description: `Inquiry marked as ${newStatus}` })
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      )
      if (selected && selected.id === id) {
        setSelected({ ...selected, status: newStatus })
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to update status.', variant: 'destructive' })
    } finally {
      setUpdatingId(null)
    }
  }

  useEffect(() => { fetchInquiries() }, [fetchInquiries])

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">College Inquiries</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and manage partnership requests from colleges and universities.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'All Inquiries', value: 'all' },
            { label: 'New / Unread', value: 'new' },
            { label: 'In Progress', value: 'in_progress' },
            { label: 'Resolved / Partnered', value: 'resolved' },
          ].map((tab) => (
            <Button
              key={tab.value}
              size="sm"
              variant={statusFilter === tab.value ? 'default' : 'outline'}
              onClick={() => {
                setStatusFilter(tab.value)
                setPage(1)
              }}
              className="text-xs"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by college, contact, or email..."
            className="pl-9"
          />
        </div>

        {/* Table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          {loading ? (
            <div className="space-y-3 p-4">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : !inquiries.length ? (
            <EmptyState
              icon={Building2}
              title="No inquiries found"
              description={search ? 'Try adjusting your search query.' : 'No college inquiries have been submitted yet.'}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-3">College / University</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Contact Person</th>
                    <th className="px-4 py-3">Email & Phone</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{inq.college_name}</p>
                        {inq.university && (
                          <p className="text-xs text-muted-foreground">{inq.university}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">
                        {inq.city ? `${inq.city}, ${inq.state}` : inq.state || '—'}
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-gray-800">
                        {inq.contact_person}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">
                        <div className="font-medium text-gray-900">{inq.email}</div>
                        {inq.phone && <div className="text-muted-foreground">{inq.phone}</div>}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={inq.status || 'new'}
                          disabled={updatingId === inq.id}
                          onChange={(e) =>
                            handleUpdateStatus(inq.id, e.target.value as 'new' | 'in_progress' | 'resolved')
                          }
                          className="text-xs font-medium rounded-md px-2 py-1 border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(inq.created_at)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelected(inq)}
                          className="text-xs"
                        >
                          View Details
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
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Details Dialog */}
        <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-brand-navy" />
                {selected?.college_name}
              </DialogTitle>
            </DialogHeader>
            {selected && (
              <div className="space-y-4 text-sm mt-2">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">University</span>
                  <p className="font-medium text-gray-900">{selected.university || 'Not specified'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Location</span>
                    <p className="text-gray-900">{selected.city}, {selected.state}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Estimated Students</span>
                    <p className="text-gray-900">{selected.student_count ?? 'Not specified'}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Contact Information</span>
                  <div className="space-y-1 mt-1 text-gray-700">
                    <p className="font-medium text-gray-900">{selected.contact_person}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <a href={`mailto:${selected.email}`} className="hover:underline text-brand-navy">{selected.email}</a>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      <a href={`tel:${selected.phone}`} className="hover:underline">{selected.phone}</a>
                    </div>
                    {selected.website && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Globe className="h-3.5 w-3.5" />
                        <a href={selected.website} target="_blank" rel="noreferrer" className="hover:underline text-brand-teal flex items-center gap-1">
                          {selected.website} <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {selected.branches && selected.branches.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Branches Offered</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {selected.branches.map((b, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{b}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selected.message && (
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Message / Requirements</span>
                    <p className="mt-1 p-3 bg-gray-50 rounded-md text-gray-700 leading-relaxed text-xs">
                      {selected.message}
                    </p>
                  </div>
                )}

                {selected.document_url && (
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Attached Document</span>
                    <div className="mt-1">
                      <a
                        href={selected.document_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-brand-teal font-medium hover:underline inline-flex items-center gap-1"
                      >
                        View Attachment <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="pt-2 text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Submitted on {formatDate(selected.created_at)}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
