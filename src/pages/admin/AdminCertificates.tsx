import { useEffect, useState, useCallback, useRef } from 'react'
import {
  Award, Search, Plus, Upload, Trash2, Eye, ExternalLink,
  Calendar, CheckCircle2, ShieldCheck, Download, RefreshCw,
  Image as ImageIcon, Sparkles, ChevronLeft, ChevronRight, FileCheck, X
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
import { formatDate, cn } from '@/lib/utils'

interface CertificateItem {
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
  library_uploaded_at?: string | null
}

const PAGE_SIZE = 15

export default function AdminCertificates() {
  const { toast } = useToast()

  const [certificates, setCertificates] = useState<CertificateItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Form Modal for uploading/adding certificate
  const [openModal, setOpenModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [previewCert, setPreviewCert] = useState<CertificateItem | null>(null)

  // Form states
  const [formCertId, setFormCertId] = useState('')
  const [formStudentName, setFormStudentName] = useState('')
  const [formDomain, setFormDomain] = useState('Web Development')
  const [formDuration, setFormDuration] = useState('4 Weeks')
  const [formIssueDate, setFormIssueDate] = useState(new Date().toISOString().split('T')[0])
  const [formGrade, setFormGrade] = useState('A+')
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

  const fetchCertificates = useCallback(async () => {
    setLoading(true)
    try {
      const params: Record<string, string | number> = { page, limit: PAGE_SIZE }
      if (debouncedSearch) params.search = debouncedSearch
      const res = await api.get('/admin/certificates', { params })
      const body = res.data?.data || res.data || {}
      const list = Array.isArray(body?.data) ? body.data : []
      setCertificates(list)
      setTotal(body?.pagination?.total ?? list.length)
    } catch {
      toast({ title: 'Error', description: 'Failed to load certificates library.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, toast])

  useEffect(() => {
    fetchCertificates()
  }, [fetchCertificates])

  const resetForm = () => {
    setFormCertId(`GI-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`)
    setFormStudentName('')
    setFormDomain('Web Development')
    setFormDuration('4 Weeks')
    setFormIssueDate(new Date().toISOString().split('T')[0])
    setFormGrade('A+')
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

  const handleSaveCertificate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formCertId.trim() || !formStudentName.trim()) {
      toast({ title: 'Missing Info', description: 'Certificate Code and Student Name are required.', variant: 'destructive' })
      return
    }

    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('certificate_id', formCertId.trim().toUpperCase())
      formData.append('student_name', formStudentName.trim())
      formData.append('domain', formDomain.trim())
      formData.append('duration', formDuration.trim())
      formData.append('issue_date', formIssueDate.trim())
      formData.append('grade', formGrade.trim())
      formData.append('status', 'verified')
      if (selectedFile) {
        formData.append('image', selectedFile)
      }

      const res = await api.post('/admin/certificates/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (res.data?.success) {
        toast({ title: 'Success', description: 'Certificate and image uploaded to cloud library!' })
        setOpenModal(false)
        fetchCertificates()
      } else {
        throw new Error(res.data?.message || 'Failed to upload certificate')
      }
    } catch (err: any) {
      toast({
        title: 'Upload Failed',
        description: err.response?.data?.message || err.message || 'Could not save certificate.',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (cert: CertificateItem) => {
    if (!window.confirm(`Are you sure you want to delete certificate ${cert.certificate_id} for ${cert.student_name}?`)) {
      return
    }

    try {
      await api.delete(`/admin/certificates/${cert.id}`)
      toast({ title: 'Deleted', description: `Certificate ${cert.certificate_id} removed from library.` })
      fetchCertificates()
    } catch {
      toast({ title: 'Error', description: 'Failed to delete certificate.', variant: 'destructive' })
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1

  return (
    <AdminLayout title="Certificate Library">
      <div className="space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-amber-100 text-amber-800">
                <Award className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Certificate Cloud Library</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Fill certificate code, student details, and upload high-res credential images for student portal display.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchCertificates}
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
              Upload Certificate Code & Image
            </Button>
          </div>
        </div>

        {/* Feature Highlights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-blue-900">Instant Student Portal Access</p>
              <p className="text-blue-700 mt-0.5 leading-relaxed">
                When a student logs into their portal, their certificate code and image are served directly from this cloud library.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50 flex items-start gap-3">
            <Upload className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-amber-900">Cloud Storage Bucket</p>
              <p className="text-amber-700 mt-0.5 leading-relaxed">
                Images and digital credential sheets are permanently hosted on secure Supabase CDN cloud storage.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 flex items-start gap-3">
            <FileCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-emerald-900">Public Verification QR & Link</p>
              <p className="text-emerald-700 mt-0.5 leading-relaxed">
                Every code entered is globally verifiable via <code>/verify?id=...</code> for employers and universities.
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="border border-slate-200 shadow-xs bg-white">
          <CardContent className="p-3.5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search certificate library by code (e.g. GI-2026-GPI83), student name, or domain..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Certificates Table */}
        <Card className="border border-slate-200 shadow-xs overflow-hidden bg-white">
          {loading ? (
            <div className="space-y-3 p-4">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : !certificates.length ? (
            <EmptyState
              icon={Award}
              title="No certificates in library"
              description="Click 'Upload Certificate Code & Image' above to fill the first credential."
              action={
                <Button size="sm" onClick={handleOpenAddModal} className="gap-1.5 bg-blue-600 text-white">
                  <Plus className="h-4 w-4" /> Add Certificate
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-slate-50/80 text-left">
                    {['Certificate Code', 'Student Name', 'Domain & Duration', 'Grade', 'Cloud Image', 'Issue Date', 'Actions'].map((h) => (
                      <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-slate-900 text-white font-mono text-xs px-2.5 py-0.5 font-bold tracking-wide">
                            {cert.certificate_id}
                          </Badge>
                          <Badge className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0">
                            Verified
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        <p className="font-semibold text-slate-900 text-sm">{cert.student_name}</p>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600">
                        <span className="font-medium text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block mb-0.5">
                          {cert.domain}
                        </span>
                        <div className="text-slate-500">{cert.duration || '4 Weeks'}</div>
                      </td>
                      <td className="px-4 py-3.5 text-xs font-bold">
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {cert.grade || 'A+'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        {cert.image_url ? (
                          <div className="flex items-center gap-2">
                            <img
                              src={cert.image_url}
                              alt={cert.certificate_id}
                              className="h-10 w-14 object-cover rounded-md border border-slate-200 shadow-xs cursor-pointer hover:opacity-80"
                              onClick={() => setPreviewCert(cert)}
                            />
                            <div className="text-[11px] text-slate-500">
                              <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                                <CheckCircle2 className="h-3 w-3" /> Cloud Saved
                              </span>
                              <a
                                href={cert.image_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline inline-flex items-center gap-0.5 text-[10px]"
                              >
                                View File ↗
                              </a>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" /> Visual Paper Only
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                        {cert.issue_date ? formatDate(cert.issue_date) : '—'}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs text-blue-700 border-blue-200 hover:bg-blue-50 gap-1 font-semibold"
                            onClick={() => setPreviewCert(cert)}
                          >
                            <Eye className="h-3.5 w-3.5" /> Preview
                          </Button>
                          <a
                            href={`/verify?id=${encodeURIComponent(cert.certificate_id)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" variant="ghost" className="h-8 text-xs text-slate-600 hover:text-slate-900 gap-1">
                              <ExternalLink className="h-3.5 w-3.5" /> Verify
                            </Button>
                          </a>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(cert)}
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
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-1">
            <p>Page {page} of {totalPages} — {total} certificate credentials</p>
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

      {/* Upload Certificate Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              Upload Certificate Code & Cloud Image
            </DialogTitle>
            <DialogDescription>
              Enter the student's verification details and upload the certificate file. Once saved, students can immediately access and download it in their Student Portal.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveCertificate} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="formCertId" className="text-xs font-bold">
                  Certificate Code / ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="formCertId"
                  value={formCertId}
                  onChange={(e) => setFormCertId(e.target.value.toUpperCase())}
                  placeholder="e.g. GI-2026-WD101"
                  className="mt-1 font-mono uppercase font-bold"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1">Unique verification code</p>
              </div>

              <div>
                <Label htmlFor="formStudentName" className="text-xs font-bold">
                  Student Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="formStudentName"
                  value={formStudentName}
                  onChange={(e) => setFormStudentName(e.target.value)}
                  placeholder="e.g. Rahul Verma"
                  className="mt-1"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1">As printed on certificate</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="formDomain" className="text-xs font-bold">Domain / Track</Label>
                <Input
                  id="formDomain"
                  value={formDomain}
                  onChange={(e) => setFormDomain(e.target.value)}
                  placeholder="e.g. Web Development"
                  className="mt-1 text-xs"
                  required
                />
              </div>

              <div>
                <Label htmlFor="formDuration" className="text-xs font-bold">Duration</Label>
                <Input
                  id="formDuration"
                  value={formDuration}
                  onChange={(e) => setFormDuration(e.target.value)}
                  placeholder="e.g. 4 Weeks"
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="formGrade" className="text-xs font-bold">Grade</Label>
                <Input
                  id="formGrade"
                  value={formGrade}
                  onChange={(e) => setFormGrade(e.target.value)}
                  placeholder="e.g. A+"
                  className="mt-1 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="formIssueDate" className="text-xs font-bold">Issue Date</Label>
              <Input
                id="formIssueDate"
                type="date"
                value={formIssueDate}
                onChange={(e) => setFormIssueDate(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            {/* Cloud Library Image Upload */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 bg-slate-50/70 text-center">
              <Label className="text-xs font-bold block mb-1 text-slate-800">
                Certificate Image File (Cloud Library)
              </Label>
              <p className="text-[11px] text-slate-500 mb-3">
                Upload JPG, PNG, or PDF certificate document. Will be stored in the permanent Supabase storage library.
              </p>

              {filePreview ? (
                <div className="space-y-3">
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="max-h-48 mx-auto object-contain rounded-lg border border-slate-300 shadow-sm"
                  />
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs font-medium text-slate-700">{selectedFile?.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-red-600 hover:bg-red-50 text-xs"
                      onClick={() => {
                        setSelectedFile(null)
                        setFilePreview(null)
                        if (fileInputRef.current) fileInputRef.current.value = ''
                      }}
                    >
                      <X className="h-3.5 w-3.5 mr-1" /> Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="certImageFile"
                  />
                  <label
                    htmlFor="certImageFile"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-800 shadow-xs"
                  >
                    <Upload className="h-4 w-4 text-blue-600" />
                    Select Certificate Image
                  </label>
                  {selectedFile && (
                    <p className="text-xs text-slate-600 mt-2 font-medium">{selectedFile.name}</p>
                  )}
                </div>
              )}
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setOpenModal(false)} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" /> Saving to Cloud Library...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" /> Save & Publish to Portal
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewCert} onOpenChange={(open) => !open && setPreviewCert(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between pr-4">
              <span>Certificate Preview</span>
              {previewCert && (
                <Badge className="bg-emerald-600 text-white font-mono text-xs">
                  {previewCert.certificate_id}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {previewCert && (
            <div className="space-y-4 pt-2">
              {/* If cloud image is available */}
              {previewCert.image_url ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Uploaded Cloud Library Image</span>
                    <a
                      href={previewCert.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Download className="h-3.5 w-3.5" /> Download Original ↗
                    </a>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900/5 p-2">
                    <img
                      src={previewCert.image_url}
                      alt={previewCert.certificate_id}
                      className="w-full h-auto object-contain max-h-[500px] rounded-lg mx-auto"
                    />
                  </div>
                </div>
              ) : (
                /* Visual certificate paper fallback */
                <div className="bg-white border-8 border-double border-slate-300 rounded-2xl p-8 text-center shadow-lg relative">
                  <div className="border-b-2 border-slate-200 pb-3 mb-4 flex items-center justify-between">
                    <span className="font-extrabold text-blue-600 text-sm">GEEK INTERN</span>
                    <Badge className="bg-emerald-600 text-white font-mono text-xs">
                      {previewCert.certificate_id}
                    </Badge>
                  </div>
                  <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
                    Certificate of Completion
                  </h3>
                  <h1 className="text-2xl font-bold text-slate-900 my-2">{previewCert.student_name}</h1>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    has successfully completed the virtual internship program in{' '}
                    <span className="font-bold text-blue-700">{previewCert.domain}</span> for duration of{' '}
                    <span className="font-semibold">{previewCert.duration}</span> with{' '}
                    <span className="font-bold text-emerald-600">Grade {previewCert.grade}</span>.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500">
                    <div>Issue Date: <strong className="text-slate-800">{previewCert.issue_date}</strong></div>
                    <div>Status: <strong className="text-emerald-700">Verified & Authentic</strong></div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <a
                  href={`/verify?id=${encodeURIComponent(previewCert.certificate_id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="outline" className="text-xs gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" /> Open Public Verification Page ↗
                  </Button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}