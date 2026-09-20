import { useEffect, useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Plus, Search, Pencil, Trash2, Archive, Eye, EyeOff, Star, StarOff, ChevronLeft, ChevronRight, Loader2, Briefcase,
} from 'lucide-react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import LoadingPage from '@/components/common/LoadingPage'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import api from '@/services/api'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import type { Internship } from '@/types'

const PAGE_SIZE = 10

type StatusFilter = 'all' | 'draft' | 'published' | 'archived'

function statusBadge(internship: Internship) {
  if (internship.status === 'archived' || internship.is_active === false) {
    return <Badge className="bg-gray-100 text-gray-600 border-gray-200 text-xs">Archived</Badge>
  }
  if (internship.status === 'draft' || !internship.is_verified) {
    return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">Draft</Badge>
  }
  return <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Published</Badge>
}

export default function AdminInternships() {
  const navigate = useNavigate()
  const { isAdmin, isInitialized } = useAuth()
  const { toast } = useToast()

  const [internships, setInternships] = useState<Internship[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [deleteTarget, setDeleteTarget] = useState<Internship | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [bulkLoading, setBulkLoading] = useState(false)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim())
      setPage(1)
    }, 350)
    return () => clearTimeout(timer)
  }, [searchInput])

  const fetchInternships = useCallback(async () => {
    setLoading(true)
    try {
      const params: Record<string, string | number> = {
        admin: 'true',
        page,
        limit: PAGE_SIZE,
      }
      if (debouncedSearch) params.search = debouncedSearch
      if (statusFilter !== 'all') params.status = statusFilter
      const res = await api.get('/internships', { params })
      const body = res.data
      const list = Array.isArray(body) ? body : (body.data ?? [])
      setInternships(list)
      const totalCount = typeof body?.pagination?.total === 'number'
        ? body.pagination.total
        : (typeof body?.total === 'number' ? body.total : list.length)
      setTotal(totalCount)
    } catch {
      toast({ title: 'Error', description: 'Failed to load internships.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch, statusFilter])

  useEffect(() => { fetchInternships() }, [fetchInternships])

  // ── Actions ──────────────────────────────────────────────────────────────
  const togglePublish = async (internship: Internship) => {
    const willPublish = !(internship.status === 'published' && internship.is_verified)
    const patch = {
      is_verified: willPublish,
      status: willPublish ? 'published' : 'draft',
    }
    try {
      await api.patch(`/internships/${internship.id}`, patch)
      toast({ title: `Internship ${willPublish ? 'published' : 'moved to draft'}.` })
      fetchInternships()
    } catch {
      toast({ title: 'Error', description: 'Could not update status.', variant: 'destructive' })
    }
  }

  const toggleFeatured = async (internship: Internship) => {
    try {
      await api.patch(`/internships/${internship.id}`, { is_featured: !internship.is_featured })
      toast({ title: `Featured ${!internship.is_featured ? 'enabled' : 'disabled'}.` })
      fetchInternships()
    } catch {
      toast({ title: 'Error', description: 'Could not toggle featured.', variant: 'destructive' })
    }
  }

  const archiveInternship = async (internship: Internship) => {
    try {
      await api.patch(`/internships/${internship.id}`, { status: 'archived', is_verified: false })
      toast({ title: 'Internship archived.' })
      fetchInternships()
    } catch {
      toast({ title: 'Error', description: 'Could not archive.', variant: 'destructive' })
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)
    try {
      await api.delete(`/internships/${deleteTarget.id}`)
      toast({ title: 'Internship deleted.' })
      setDeleteTarget(null)
      fetchInternships()
    } catch {
      toast({ title: 'Error', description: 'Could not delete internship.', variant: 'destructive' })
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleBulk = async (action: 'publish' | 'archive') => {
    if (!selected.size) return
    setBulkLoading(true)
    try {
      const patch = action === 'publish'
        ? { is_verified: true, status: 'published' }
        : { status: 'archived', is_verified: false }
      await Promise.all([...selected].map((id) => api.patch(`/internships/${id}`, patch)))
      toast({ title: `Bulk ${action} complete.` })
      setSelected(new Set())
      fetchInternships()
    } catch {
      toast({ title: 'Error', description: `Bulk ${action} failed.`, variant: 'destructive' })
    } finally {
      setBulkLoading(false)
    }
  }

  const toggleSelect = (id: string) =>
    setSelected((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  const toggleAll = () =>
    setSelected(selected.size === internships.length ? new Set() : new Set(internships.map((i) => i.id)))

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1

  return (
    <AdminLayout title="Manage Internships">
      <div className="space-y-5 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Manage Internships</h2>
            <p className="text-sm text-muted-foreground">{total} total internships</p>
          </div>
          <Button asChild className="bg-brand-navy hover:bg-brand-navy/90 text-white gap-2">
            <Link to="/admin/internships/new"><Plus className="h-4 w-4" />Add New</Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or provider…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as StatusFilter); setPage(1) }}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Bulk actions */}
        {selected.size > 0 && (
          <div className="flex items-center gap-3 rounded-lg bg-brand-navy/5 border border-brand-navy/10 px-4 py-2.5">
            <span className="text-sm font-medium">{selected.size} selected</span>
            <Button size="sm" variant="outline" onClick={() => handleBulk('publish')} disabled={bulkLoading} className="gap-1.5">
              {bulkLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Eye className="h-3 w-3" />}
              Publish Selected
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleBulk('archive')} disabled={bulkLoading} className="gap-1.5 text-orange-600 border-orange-200 hover:bg-orange-50">
              <Archive className="h-3 w-3" />
              Archive Selected
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())} className="ml-auto text-xs text-muted-foreground">
              Clear
            </Button>
          </div>
        )}

        {/* Table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          {loading ? (
            <div className="space-y-3 p-4">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : !internships.length ? (
            <EmptyState icon={Briefcase} title="No internships found" description="Adjust your filters or create a new internship." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selected.size === internships.length && internships.length > 0}
                        onChange={toggleAll}
                        className="rounded border-gray-300"
                        aria-label="Select all"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Title / Provider</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Fee</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Featured</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {internships.map((intern) => (
                    <tr key={intern.id} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors group">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.has(intern.id)}
                          onChange={() => toggleSelect(intern.id)}
                          className="rounded border-gray-300"
                          aria-label={`Select ${intern.title}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 leading-tight">{intern.title}</p>
                        <p className="text-xs text-muted-foreground">{intern.provider_name}</p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{intern.category?.name ?? '—'}</td>
                      <td className="px-4 py-3 font-medium">{formatCurrency(intern.application_fee)}</td>
                      <td className="px-4 py-3">{statusBadge(intern)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleFeatured(intern)}
                          className="transition-colors"
                          aria-label={intern.is_featured ? 'Remove featured' : 'Mark featured'}
                          title={intern.is_featured ? 'Featured — click to remove' : 'Mark as featured'}
                        >
                          {intern.is_featured
                            ? <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                            : <StarOff className="h-4 w-4 text-gray-300" />
                          }
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button size="icon" variant="ghost" className="h-8 w-8" asChild title="Edit">
                            <Link to={`/admin/internships/${intern.id}/edit`}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                          <Button
                            size="icon" variant="ghost" className="h-8 w-8"
                            onClick={() => togglePublish(intern)}
                            title={intern.is_verified ? 'Unpublish' : 'Publish'}
                          >
                            {intern.is_verified ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </Button>
                          <Button
                            size="icon" variant="ghost" className="h-8 w-8 text-orange-500"
                            onClick={() => archiveInternship(intern)}
                            title="Archive"
                            disabled={!intern.is_active}
                          >
                            <Archive className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:bg-red-50"
                            onClick={() => setDeleteTarget(intern)}
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
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
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages} — {total} results
            </p>
            <div className="flex items-center gap-2">
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Internship</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to permanently delete{' '}
            <span className="font-semibold text-gray-900">"{deleteTarget?.title}"</span>?
            This action cannot be undone.
          </p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleteLoading}>
              {deleteLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
