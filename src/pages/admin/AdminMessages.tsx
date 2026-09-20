import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Mail,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  CheckCheck,
} from 'lucide-react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import api from '@/services/api'
import { formatDate, cn } from '@/lib/utils'

interface ContactMessageItem {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status?: string
  created_at: string
}

const PAGE_SIZE = 15

export default function AdminMessages() {
  const navigate = useNavigate()
  const { isAdmin, isInitialized } = useAuth()
  const { toast } = useToast()

  const [messages, setMessages] = useState<ContactMessageItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeGroup, setActiveGroup] = useState<'all' | 'unread' | 'read'>('all')
  const [counts, setCounts] = useState<{ all: number; unread: number; read: number }>({
    all: 0,
    unread: 0,
    read: 0,
  })
  const [selected, setSelected] = useState<ContactMessageItem | null>(null)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    try {
      const params: Record<string, string | number> = { page, limit: PAGE_SIZE }
      if (search.trim()) params.search = search.trim()
      if (activeGroup !== 'all') params.status = activeGroup
      const res = await api.get('/admin/contact-messages', { params })
      const body = res.data
      const list = Array.isArray(body?.data) ? body.data : (Array.isArray(body) ? body : [])
      setMessages(list)
      if (body?.counts) {
        setCounts(body.counts)
      }
      const totalCount = typeof body?.pagination?.total === 'number'
        ? body.pagination.total
        : (typeof body?.total === 'number' ? body.total : list.length)
      setTotal(totalCount)
    } catch {
      toast({ title: 'Error', description: 'Failed to load contact messages.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }, [page, search, activeGroup, toast])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  const handleToggleStatus = async (msg: ContactMessageItem, targetStatus: 'read' | 'unread') => {
    try {
      await api.patch(`/admin/contact-messages/${msg.id}/status`, { status: targetStatus })
      toast({ title: targetStatus === 'read' ? 'Message marked as read' : 'Message marked as unread' })
      const updatedStatus = targetStatus === 'read' ? 'resolved' : 'new'
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, status: updatedStatus } : m))
      )
      if (selected && selected.id === msg.id) {
        setSelected({ ...selected, status: updatedStatus })
      }
      // Refresh count totals
      setCounts((prev) => ({
        ...prev,
        unread: targetStatus === 'read' ? Math.max(0, prev.unread - 1) : prev.unread + 1,
        read: targetStatus === 'read' ? prev.read + 1 : Math.max(0, prev.read - 1),
      }))
    } catch (err) {
      toast({ title: 'Update failed', description: 'Could not update status.', variant: 'destructive' })
    }
  }

  const handleOpenMessage = async (msg: ContactMessageItem) => {
    setSelected(msg)
    // If currently unread, automatically mark as read
    const isUnread = !msg.status || msg.status === 'new'
    if (isUnread) {
      handleToggleStatus(msg, 'read')
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Contact Messages & Inquiries</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Organized messages and support inquiries received from students, universities, and corporate partners.
          </p>
        </div>

        {/* Group Filter Tabs: All, Unread, Read */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setActiveGroup('all')
              setPage(1)
            }}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all',
              activeGroup === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            )}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>All Messages</span>
            <span
              className={cn(
                'ml-1 px-2 py-0.5 rounded-full text-[11px] font-bold',
                activeGroup === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              )}
            >
              {counts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveGroup('unread')
              setPage(1)
            }}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all',
              activeGroup === 'unread'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-blue-800 border-blue-200 hover:bg-blue-50/70'
            )}
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Unread Messages</span>
            <span
              className={cn(
                'ml-1 px-2 py-0.5 rounded-full text-[11px] font-bold',
                activeGroup === 'unread' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
              )}
            >
              {counts.unread}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveGroup('read')
              setPage(1)
            }}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all',
              activeGroup === 'read'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50/70'
            )}
          >
            <CheckCheck className="h-3.5 w-3.5" />
            <span>Read / Resolved</span>
            <span
              className={cn(
                'ml-1 px-2 py-0.5 rounded-full text-[11px] font-bold',
                activeGroup === 'read' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
              )}
            >
              {counts.read}
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by sender name, email, subject, or message content..."
            className="pl-9 text-sm"
          />
        </div>

        {/* Table */}
        <Card className="border border-slate-200 shadow-xs overflow-hidden bg-white">
          {loading ? (
            <div className="space-y-3 p-4">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : !messages.length ? (
            <EmptyState
              icon={MessageSquare}
              title="No messages found"
              description={search ? 'Try adjusting your search query.' : `No messages in the "${activeGroup}" section.`}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-slate-50/80 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">From</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Preview</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {messages.map((msg) => {
                    const isUnread = !msg.status || msg.status === 'new'
                    return (
                      <tr
                        key={msg.id}
                        className={cn(
                          'hover:bg-slate-50/70 transition-colors',
                          isUnread && 'bg-blue-50/30'
                        )}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          {isUnread ? (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-[10px] font-bold">
                              ● Unread
                            </Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-600 border-slate-200 text-[10px] font-normal">
                              Read
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className={cn('font-medium text-slate-900', isUnread && 'font-bold text-blue-950')}>
                            {msg.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{msg.email}</div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary" className="text-xs font-normal">
                            {msg.subject || 'General'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600 max-w-xs truncate">
                          {msg.message}
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(msg.created_at)}
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenMessage(msg)}
                            className="text-xs font-semibold text-blue-700 border-blue-200 hover:bg-blue-50"
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleToggleStatus(msg, isUnread ? 'read' : 'unread')}
                            className="text-xs text-slate-500 hover:text-slate-800"
                            title={isUnread ? 'Mark as read' : 'Mark as unread'}
                          >
                            {isUnread ? 'Mark Read' : 'Mark Unread'}
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
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
                <Mail className="h-5 w-5 text-brand-navy" />
                {selected?.subject || 'Contact Message'}
              </DialogTitle>
            </DialogHeader>
            {selected && (
              <div className="space-y-4 text-sm mt-2">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Sender</span>
                  <p className="font-medium text-gray-900">{selected.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <a href={`mailto:${selected.email}`} className="text-brand-navy hover:underline flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> {selected.email}
                    </a>
                    {selected.phone && (
                      <a href={`tel:${selected.phone}`} className="text-gray-600 hover:underline flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" /> {selected.phone}
                      </a>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Message</span>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md text-gray-800 leading-relaxed text-xs whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>

                <div className="pt-2 text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Received on {formatDate(selected.created_at)}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const isUnread = !selected.status || selected.status === 'new'
                      handleToggleStatus(selected, isUnread ? 'read' : 'unread')
                    }}
                    className="text-xs"
                  >
                    {!selected.status || selected.status === 'new' ? 'Mark as Read' : 'Mark as Unread'}
                  </Button>
                  <Button asChild size="sm" className="bg-brand-navy hover:bg-brand-navy/90 text-white text-xs">
                    <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}>
                      Reply via Email
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
