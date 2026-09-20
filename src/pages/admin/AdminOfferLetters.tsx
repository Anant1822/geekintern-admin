import { useEffect, useState, useCallback, useRef } from 'react'
import {
  FileText, Search, Plus, Upload, Trash2, Eye, ExternalLink,
  Calendar, CheckCircle2, ShieldCheck, Download, RefreshCw,
  Image as ImageIcon, Sparkles, ChevronLeft, ChevronRight, Send, X, Mail
} from 'lucide-react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { useToast } from '@/hooks/useToast'
import api from '@/services/api'
import { supabase } from '@/lib/supabase'
import { formatDate, cn } from '@/lib/utils'

interface OfferLetterItem {
  id: string
  letter_id: string
  student_name: string
  email: string
  domain: string
  duration: string
  start_date: string
  stipend: string
  status: string
  created_at: string
  image_url?: string | null
  uploaded_at?: string | null
}

const PAGE_SIZE = 15

export default function AdminOfferLetters() {
  const { toast } = useToast()

  const [offerLetters, setOfferLetters] = useState<OfferLetterItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Form Modal for uploading/adding offer letter
  const [openModal, setOpenModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [previewLetter, setPreviewLetter] = useState<OfferLetterItem | null>(null)

  // Form states
  const [formLetterId, setFormLetterId] = useState('')
  const [formStudentName, setFormStudentName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formDomain, setFormDomain] = useState('Full-Stack Web Development')
  const [formDuration, setFormDuration] = useState('4 Weeks')
  const [formStartDate, setFormStartDate] = useState(new Date().toISOString().split('T')[0])
  const [formStipend, setFormStipend] = useState('Performance Based / ₹5,000')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim())
      setPage(1)
    }, 350)
    return () => clearTimeout(timer)
  }, [searchInput])

  const fetchOfferLetters = useCallback(async () => {
    setLoading(true)
    try {
      const params: Record<string, string | number> = { page, limit: PAGE_SIZE }
      if (debouncedSearch) params.search = debouncedSearch
      const res = await api.get('/admin/offer-letters', { params })
      const body = res.data?.data || res.data || {}
      const list = Array.isArray(body?.data) ? body.data : []
      setOfferLetters(list)
      setTotal(body?.pagination?.total ?? list.length)
    } catch {
      try {
        let query = supabase
          .from('offer_letters')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })

        if (debouncedSearch) {
          query = query.or(`student_name.ilike.%${debouncedSearch}%,letter_id.ilike.%${debouncedSearch}%,email.ilike.%${debouncedSearch}%,domain.ilike.%${debouncedSearch}%`)
        }

        const from = (page - 1) * PAGE_SIZE
        const to = from + PAGE_SIZE - 1
        const { data: olData, count: olCount, error: olErr } = await query.range(from, to)

        if (olErr) throw olErr
        setOfferLetters(olData || [])
        setTotal(olCount || 0)
      } catch (fallbackErr) {
        toast({ title: 'Error', description: 'Failed to load offer letters library.', variant: 'destructive' })
      }
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, toast])

  useEffect(() => {
    fetchOfferLetters()
  }, [fetchOfferLetters])

  const resetForm = () => {
    setFormLetterId(`GI-OL-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`)
    setFormStudentName('')
    setFormEmail('')
    setFormDomain('Full-Stack Web Development')
    setFormDuration('4 Weeks')
    setFormStartDate(new Date().toISOString().split('T')[0])
    setFormStipend('Performance Based / ₹5,000')
    setSelectedFile(null)
    setFilePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleOpenAddModal = () => {
    resetForm()
    setOpenModal(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      toast({ title: 'Invalid File', description: 'Please select an image or PDF file.', variant: 'destructive' })
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: 'File Too Large', description: 'Maximum file size is 10 MB.', variant: 'destructive' })
      return
    }
    setSelectedFile(file)
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setFilePreview(url)
    } else {
      setFilePreview(null)
    }
  }

  const handleSaveOfferLetter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formLetterId.trim() || !formStudentName.trim() || !formEmail.trim()) {
      toast({ title: 'Missing Info', description: 'Letter ID, Student Name, and Registered Email are required.', variant: 'destructive' })
      return
    }

    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('letter_id', formLetterId.trim().toUpperCase())
      formData.append('student_name', formStudentName.trim())
      formData.append('email', formEmail.trim().toLowerCase())
      formData.append('domain', formDomain.trim())
      formData.append('duration', formDuration.trim())
      formData.append('start_date', formStartDate.trim())
      formData.append('stipend', formStipend.trim())
      formData.append('status', 'sent')
      if (selectedFile) {
        formData.append('image', selectedFile)
      }

      const res = await api.post('/admin/offer-letters/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (res.data?.success) {
        toast({ title: 'Success', description: 'Offer letter code & image saved to cloud library!' })
        setOpenModal(false)
        fetchOfferLetters()
      } else {
        throw new Error(res.data?.message || 'Failed to upload offer letter')
      }
    } catch (err: any) {
      toast({
        title: 'Upload Failed',
        description: err.response?.data?.message || err.message || 'Could not save offer letter.',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (letter: OfferLetterItem) => {
    if (!window.confirm(`Are you sure you want to delete offer letter ${letter.letter_id} for ${letter.student_name}?`)) {
      return
    }

    try {
      await api.delete(`/admin/offer-letters/${letter.letter_id}`)
      toast({ title: 'Deleted', description: `Offer letter ${letter.letter_id} removed from library.` })
      fetchOfferLetters()
    } catch {
      toast({ title: 'Error', description: 'Failed to delete offer letter.', variant: 'destructive' })
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1

  return (
    <AdminLayout title="Offer Letter Library">
      <div className="space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-blue-100 text-blue-800">
                <Send className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Offer Letter Cloud Library</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Fill offer letter code, candidate details, and upload offer letters to the cloud library for student portal access.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchOfferLetters}
              disabled={loading}
              className="gap-1.5 shadow-xs text-xs h-9"
            >
              <RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} />
              Refresh
            </Button>
            <Button
              size="sm"
              onClick={handleOpenAddModal}
              className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs text-xs h-9"
            >
              <Plus className="h-4 w-4" />
              Upload Offer Letter Code & Image
            </Button>
          </div>
        </div>

        {/* Highlights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-blue-900">Direct Student Portal Sync</p>
              <p className="text-blue-700 mt-0.5 leading-relaxed">
                When a student signs in via OTP or credentials, their offer letter is automatically rendered and ready for download.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 flex items-start gap-3">
            <Upload className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-indigo-900">Offer Letters Cloud Storage</p>
              <p className="text-indigo-700 mt-0.5 leading-relaxed">
                Official offer letters are hosted on Supabase CDN storage bucket with fast public download access.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-emerald-900">Auto Application Status Update</p>
              <p className="text-emerald-700 mt-0.5 leading-relaxed">
                Uploading an offer letter automatically marks the candidate's application as "Offer Letter Sent".
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by candidate name, email, offer letter ID (e.g. GI-OL-2026-XXXX), or track..."
              className="pl-9 bg-white"
            />
          </div>
          {searchInput && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchInput('')}
              className="text-xs text-muted-foreground h-9"
            >
              Clear Search
            </Button>
          )}
        </div>

        {/* Offer Letters Table */}
        <Card className="border shadow-xs bg-white">
          <CardHeader className="p-4 pb-2 border-b flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Cloud Offer Letters ({total})</CardTitle>
              <CardDescription className="text-xs">
                Official internship offer letters issued and accessible in the student portal.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                ))}
              </div>
            ) : offerLetters.length === 0 ? (
              <div className="p-8">
                <EmptyState
                  title="No Offer Letters Found"
                  description={debouncedSearch ? 'No offer letters match your search query.' : 'No offer letters have been uploaded to the cloud library yet.'}
                  action={
                    !debouncedSearch ? (
                      <Button size="sm" onClick={handleOpenAddModal} className="mt-3 gap-1.5">
                        <Plus className="h-4 w-4" />
                        Upload First Offer Letter
                      </Button>
                    ) : undefined
                  }
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50/75 border-b text-gray-500 font-medium text-left">
                    <tr>
                      <th className="py-3 px-4">Offer Letter ID</th>
                      <th className="py-3 px-4">Candidate Details</th>
                      <th className="py-3 px-4">Internship Track</th>
                      <th className="py-3 px-4">Duration & Stipend</th>
                      <th className="py-3 px-4">Start Date</th>
                      <th className="py-3 px-4 text-center">Cloud Document</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {offerLetters.map((letter) => (
                      <tr key={letter.id || letter.letter_id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded inline-flex items-center gap-1.5 border border-blue-100">
                            <Send className="h-3 w-3 text-blue-600" />
                            {letter.letter_id}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-gray-900 text-sm">{letter.student_name}</div>
                          {letter.email && (
                            <div className="text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Mail className="h-3 w-3 text-gray-400" />
                              {letter.email}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="font-normal bg-indigo-50/50 text-indigo-700 border-indigo-200">
                            {letter.domain || 'Internship'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-gray-900 font-medium">{letter.duration || '4 Weeks'}</div>
                          <div className="text-muted-foreground text-[11px]">{letter.stipend || 'Performance Based'}</div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {letter.start_date ? formatDate(letter.start_date) : 'Immediate'}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {letter.image_url ? (
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setPreviewLetter(letter)}
                                className="group relative block w-10 h-10 rounded-md border border-gray-200 overflow-hidden bg-gray-50 hover:border-blue-500 shadow-2xs transition-all"
                                title="Click to view full offer letter"
                              >
                                {letter.image_url.endsWith('.pdf') ? (
                                  <div className="w-full h-full flex items-center justify-center bg-red-50 text-red-600">
                                    <FileText className="h-5 w-5" />
                                  </div>
                                ) : (
                                  <img
                                    src={letter.image_url}
                                    alt={letter.student_name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  />
                                )}
                              </button>
                              <Badge variant="outline" className="text-[10px] text-emerald-700 bg-emerald-50 border-emerald-200 font-normal">
                                Cloud
                              </Badge>
                            </div>
                          ) : (
                            <span className="text-[11px] text-gray-400 italic">No document</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`/verify-offer-letter?id=${encodeURIComponent(letter.letter_id)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex"
                              title="Public Preview & Verification Page"
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </a>
                            {letter.image_url && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPreviewLetter(letter)}
                                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                title="Preview Document Modal"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(letter)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Delete Offer Letter"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-3 border-t flex items-center justify-between bg-gray-50/50">
                <p className="text-xs text-muted-foreground">
                  Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, total)} of {total} offer letters
                </p>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="h-7 text-xs gap-1"
                  >
                    <ChevronLeft className="h-3 w-3" />
                    Previous
                  </Button>
                  <span className="text-xs px-2 text-muted-foreground font-medium">
                    {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="h-7 text-xs gap-1"
                  >
                    Next
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload Modal */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <Send className="h-5 w-5 text-blue-600" />
                Upload Offer Letter Code & Document
              </DialogTitle>
              <DialogDescription className="text-xs">
                Fill the official offer letter code and candidate details. Upload an image or PDF to store on the cloud library.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveOfferLetter} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="letterId" className="text-xs font-semibold">
                      Offer Letter ID / Verification Code *
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormLetterId(`GI-OL-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`)}
                      className="h-6 text-[11px] text-blue-600 hover:text-blue-700 p-0 gap-1"
                    >
                      <Sparkles className="h-3 w-3" />
                      Auto-Generate Code
                    </Button>
                  </div>
                  <Input
                    id="letterId"
                    value={formLetterId}
                    onChange={(e) => setFormLetterId(e.target.value.toUpperCase())}
                    placeholder="e.g. GI-OL-2026-A8K92"
                    className="font-mono font-semibold uppercase text-sm"
                    required
                  />
                  <p className="text-[11px] text-muted-foreground">
                    This unique reference code will appear on the student portal and documents.
                  </p>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="studentName" className="text-xs font-semibold">
                    Candidate Full Name *
                  </Label>
                  <Input
                    id="studentName"
                    value={formStudentName}
                    onChange={(e) => setFormStudentName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs font-semibold">
                    Registered Student Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. student@gmail.com"
                    required
                  />
                  <p className="text-[10px] text-muted-foreground">
                    The offer letter connects to this email in the student portal.
                  </p>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="domain" className="text-xs font-semibold">
                    Internship Domain / Track
                  </Label>
                  <Input
                    id="domain"
                    value={formDomain}
                    onChange={(e) => setFormDomain(e.target.value)}
                    placeholder="e.g. Full-Stack Web Development"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="duration" className="text-xs font-semibold">
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="e.g. 4 Weeks / 1 Month"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="startDate" className="text-xs font-semibold">
                    Internship Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="stipend" className="text-xs font-semibold">
                    Stipend Details
                  </Label>
                  <Input
                    id="stipend"
                    value={formStipend}
                    onChange={(e) => setFormStipend(e.target.value)}
                    placeholder="e.g. Performance Based / ₹5,000 / Unpaid"
                  />
                </div>
              </div>

              {/* File Upload Section */}
              <div className="space-y-2 pt-2 border-t">
                <Label className="text-xs font-semibold flex items-center justify-between">
                  <span>Offer Letter Document / Image</span>
                  <span className="text-muted-foreground font-normal text-[11px]">JPG, PNG, WebP or PDF (Max 10MB)</span>
                </Label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl p-4 text-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-blue-50/30"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {filePreview ? (
                    <div className="space-y-2">
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="max-h-40 mx-auto rounded-lg shadow-xs border object-contain"
                      />
                      <p className="text-xs text-blue-600 font-medium">Click to change document image</p>
                    </div>
                  ) : selectedFile ? (
                    <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-700">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span>{selectedFile.name}</span>
                    </div>
                  ) : (
                    <div className="space-y-1 py-2">
                      <div className="mx-auto w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Upload className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-medium text-gray-700">
                        Click to browse offer letter image or PDF
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Files are automatically hosted in the Supabase offer_letters cloud library
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenModal(false)}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      Uploading to Cloud...
                    </>
                  ) : (
                    <>
                      <Upload className="h-3.5 w-3.5" />
                      Save & Publish to Cloud
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Document Preview Modal */}
        <Dialog open={!!previewLetter} onOpenChange={(open) => !open && setPreviewLetter(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between text-base">
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4 text-blue-600" />
                  Offer Letter: {previewLetter?.letter_id}
                </span>
                {previewLetter?.image_url && (
                  <a
                    href={previewLetter.image_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-normal"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Open Original
                  </a>
                )}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Candidate: <strong className="text-gray-900">{previewLetter?.student_name}</strong> ({previewLetter?.email}) | Domain: {previewLetter?.domain}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2 bg-gray-900/5 rounded-xl p-2 flex items-center justify-center min-h-[300px]">
              {previewLetter?.image_url ? (
                previewLetter.image_url.endsWith('.pdf') ? (
                  <iframe
                    src={previewLetter.image_url}
                    title="Offer Letter PDF"
                    className="w-full h-96 rounded-lg border"
                  />
                ) : (
                  <img
                    src={previewLetter.image_url}
                    alt={previewLetter.student_name}
                    className="max-h-[500px] w-auto max-w-full rounded-lg shadow-sm object-contain"
                  />
                )
              ) : (
                <div className="text-center py-12 text-muted-foreground text-xs">
                  <ImageIcon className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                  No digital document attached to this offer letter.
                </div>
              )}
            </div>

            <DialogFooter className="flex items-center justify-between sm:justify-between w-full">
              <div className="text-xs text-muted-foreground font-mono">
                Code: {previewLetter?.letter_id}
              </div>
              <div className="flex items-center gap-2">
                {previewLetter?.image_url && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 text-xs"
                    onClick={() => {
                      if (previewLetter?.image_url) {
                        const a = document.createElement('a')
                        a.href = previewLetter.image_url
                        a.download = `Offer_Letter_${previewLetter.letter_id}.png`
                        a.target = '_blank'
                        a.click()
                      }
                    }}
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                )}
                <Button size="sm" onClick={() => setPreviewLetter(null)}>
                  Close
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
