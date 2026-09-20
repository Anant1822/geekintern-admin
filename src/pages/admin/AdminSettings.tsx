import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Loader2, Plus, Trash2, Pencil, Eye, EyeOff } from 'lucide-react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import LoadingPage from '@/components/common/LoadingPage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import api from '@/services/api'
import type { FAQ, Testimonial } from '@/types'

// ── Settings schema ────────────────────────────────────────────────────────
const platformSchema = z.object({
  platform_name: z.string().min(1, 'Platform name required'),
  support_email: z.string().email('Enter a valid email'),
})
const feesSchema = z.object({
  standard_fee: z.coerce.number().min(0),
  premium_fee: z.coerce.number().min(0),
})
const formSchema = z.object({
  google_form_url: z.string().url('Enter a valid URL').or(z.literal('')),
  whatsapp_share_text: z.string(),
})
const faqSchema = z.object({
  question: z.string().min(5, 'Question too short'),
  answer: z.string().min(10, 'Answer too short'),
  category: z.string().min(1, 'Category required'),
  order_index: z.coerce.number().min(0),
})

type PlatformForm = z.infer<typeof platformSchema>
type FeesForm = z.infer<typeof feesSchema>
type FormSettings = z.infer<typeof formSchema>
type FAQForm = z.infer<typeof faqSchema>

interface Settings {
  platform_name?: string
  support_email?: string
  standard_fee?: number
  premium_fee?: number
  google_form_url?: string
  whatsapp_share_text?: string
}

// ── Section wrapper ────────────────────────────────────────────────────────
function SettingsSection({
  title, description, children, onSave, saving,
}: {
  title: string; description?: string; children: React.ReactNode; onSave: () => void; saving: boolean
}) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        {children}
        <div className="flex justify-end pt-2">
          <Button onClick={onSave} disabled={saving} className="bg-brand-navy hover:bg-brand-navy/90 text-white gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ── Component ──────────────────────────────────────────────────────────────
export default function AdminSettings() {
  const navigate = useNavigate()
  const { isAdmin, isInitialized } = useAuth()
  const { toast } = useToast()

  const [settings, setSettings] = useState<Settings>({})
  const [loadingSettings, setLoadingSettings] = useState(true)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loadingFaqs, setLoadingFaqs] = useState(true)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)

  // FAQ dialog
  const [faqDialog, setFaqDialog] = useState<{ open: boolean; editing: FAQ | null }>({ open: false, editing: null })

  useEffect(() => {
    // Admin settings accessible
  }, [navigate])

  // Settings forms
  const platformForm = useForm<PlatformForm>({
    resolver: zodResolver(platformSchema),
    defaultValues: { platform_name: '', support_email: '' },
  })
  const feesForm = useForm<FeesForm>({
    resolver: zodResolver(feesSchema),
    defaultValues: { standard_fee: 0, premium_fee: 0 },
  })
  const formSettingsForm = useForm<FormSettings>({
    resolver: zodResolver(formSchema),
    defaultValues: { google_form_url: '', whatsapp_share_text: '' },
  })
  const faqForm = useForm<FAQForm>({
    resolver: zodResolver(faqSchema),
    defaultValues: { question: '', answer: '', category: 'General', order_index: 0 },
  })

  // Load settings
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/admin/settings')
        const rawList = res.data?.data || res.data || []
        const d: Record<string, any> = {}
        if (Array.isArray(rawList)) {
          rawList.forEach((item: any) => {
            if (item.key) d[item.key] = item.value
          })
        } else if (typeof rawList === 'object') {
          Object.assign(d, rawList)
        }
        setSettings(d)
        platformForm.reset({ platform_name: d.platform_name ?? '', support_email: d.support_email ?? '' })
        feesForm.reset({ standard_fee: Number(d.standard_application_fee || d.standard_fee) || 0, premium_fee: Number(d.premium_application_fee || d.premium_fee) || 0 })
        formSettingsForm.reset({ google_form_url: d.google_form_url ?? '', whatsapp_share_text: d.whatsapp_share_text ?? '' })
      } catch {
        toast({ title: 'Error', description: 'Could not load settings.', variant: 'destructive' })
      } finally {
        setLoadingSettings(false)
      }
    }
    load()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Load FAQs
  useEffect(() => {
    api.get('/faqs/admin')
      .then((r) => {
        const list = r.data?.data || r.data || []
        setFaqs(Array.isArray(list) ? list : [])
      })
      .catch(() => {})
      .finally(() => setLoadingFaqs(false))
  }, [])

  // Load testimonials
  useEffect(() => {
    api.get('/testimonials/admin')
      .then((r) => {
        const list = r.data?.data || r.data || []
        setTestimonials(Array.isArray(list) ? list : [])
      })
      .catch(() => {})
      .finally(() => setLoadingTestimonials(false))
  }, [])

  // ── Save helpers ──────────────────────────────────────────────────────────
  const [savingPlatform, setSavingPlatform] = useState(false)
  const [savingFees, setSavingFees] = useState(false)
  const [savingForm, setSavingForm] = useState(false)

  const savePlatform = platformForm.handleSubmit(async (data) => {
    setSavingPlatform(true)
    try {
      await api.patch('/admin/settings/platform_name', { value: data.platform_name })
      if (data.support_email) {
        await api.patch('/admin/settings/support_email', { value: data.support_email })
      }
      toast({ title: 'Platform settings saved.' })
    } catch {
      toast({ title: 'Error saving settings.', variant: 'destructive' })
    } finally {
      setSavingPlatform(false)
    }
  })

  const saveFees = feesForm.handleSubmit(async (data) => {
    setSavingFees(true)
    try {
      await api.patch('/admin/settings/standard_application_fee', { value: String(data.standard_fee) })
      await api.patch('/admin/settings/premium_application_fee', { value: String(data.premium_fee) })
      toast({ title: 'Fee settings saved.' })
    } catch {
      toast({ title: 'Error saving fees.', variant: 'destructive' })
    } finally {
      setSavingFees(false)
    }
  })

  const saveFormSettings = formSettingsForm.handleSubmit(async (data) => {
    setSavingForm(true)
    try {
      await api.patch('/admin/settings/google_form_url', { value: data.google_form_url })
      await api.patch('/admin/settings/whatsapp_share_text', { value: data.whatsapp_share_text })
      toast({ title: 'Form & WhatsApp settings saved.' })
    } catch {
      toast({ title: 'Error saving settings.', variant: 'destructive' })
    } finally {
      setSavingForm(false)
    }
  })

  // ── FAQ CRUD ──────────────────────────────────────────────────────────────
  const openNewFaq = () => {
    faqForm.reset({ question: '', answer: '', category: 'General', order_index: faqs.length })
    setFaqDialog({ open: true, editing: null })
  }

  const openEditFaq = (faq: FAQ) => {
    faqForm.reset({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order_index: faq.order_index,
    })
    setFaqDialog({ open: true, editing: faq })
  }

  const [savingFaq, setSavingFaq] = useState(false)
  const saveFaq = faqForm.handleSubmit(async (data) => {
    setSavingFaq(true)
    try {
      if (faqDialog.editing) {
        await api.patch(`/faqs/${faqDialog.editing.id}`, data)
        setFaqs((prev) => prev.map((f) => f.id === faqDialog.editing!.id ? { ...f, ...data } : f))
      } else {
        const res = await api.post('/faqs', { ...data, is_published: true })
        const created = res.data?.data || res.data
        setFaqs((prev) => [...prev, created])
      }
      toast({ title: `FAQ ${faqDialog.editing ? 'updated' : 'created'}.` })
      setFaqDialog({ open: false, editing: null })
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    } finally {
      setSavingFaq(false)
    }
  })

  const toggleFaqActive = async (faq: FAQ) => {
    try {
      await api.patch(`/faqs/${faq.id}`, { is_published: !faq.is_active })
      setFaqs((prev) => prev.map((f) => f.id === faq.id ? { ...f, is_active: !f.is_active } : f))
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const deleteFaq = async (faq: FAQ) => {
    if (!window.confirm(`Delete FAQ: "${faq.question}"?`)) return
    try {
      await api.delete(`/faqs/${faq.id}`)
      setFaqs((prev) => prev.filter((f) => f.id !== faq.id))
      toast({ title: 'FAQ deleted.' })
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const toggleTestimonial = async (t: Testimonial) => {
    try {
      await api.patch(`/testimonials/${t.id}`, { is_published: !t.is_active })
      setTestimonials((prev) => prev.map((x) => x.id === t.id ? { ...x, is_active: !x.is_active } : x))
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  return (
    <AdminLayout title="Settings">
      <div className="space-y-6 max-w-3xl">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Platform Settings</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Configure platform-wide settings</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="forms">Forms & WhatsApp</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          {/* General */}
          <TabsContent value="general">
            <SettingsSection
              title="Platform Info"
              description="Basic platform details shown to users"
              onSave={savePlatform}
              saving={savingPlatform}
            >
              {loadingSettings ? (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <>
                  <div>
                    <Label htmlFor="platform_name">Platform Name</Label>
                    <Input id="platform_name" {...platformForm.register('platform_name')} className="mt-1.5" />
                    {platformForm.formState.errors.platform_name && (
                      <p className="text-xs text-red-500 mt-1">{platformForm.formState.errors.platform_name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="support_email">Support Email</Label>
                    <Input id="support_email" type="email" {...platformForm.register('support_email')} className="mt-1.5" />
                    {platformForm.formState.errors.support_email && (
                      <p className="text-xs text-red-500 mt-1">{platformForm.formState.errors.support_email.message}</p>
                    )}
                  </div>
                </>
              )}
            </SettingsSection>
          </TabsContent>

          {/* Fees */}
          <TabsContent value="fees">
            <SettingsSection
              title="Application Fees"
              description="Base fees charged per application. Category-specific fees can override these."
              onSave={saveFees}
              saving={savingFees}
            >
              {loadingSettings ? (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <>
                  <div>
                    <Label htmlFor="standard_fee">Standard Application Fee (₹)</Label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                      <Input id="standard_fee" type="number" min={0} {...feesForm.register('standard_fee')} className="pl-7" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Default fee for standard/general internships</p>
                  </div>
                  <div>
                    <Label htmlFor="premium_fee">Premium Application Fee (₹)</Label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                      <Input id="premium_fee" type="number" min={0} {...feesForm.register('premium_fee')} className="pl-7" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Fee for core engineering / premium categories</p>
                  </div>
                </>
              )}
            </SettingsSection>
          </TabsContent>

          {/* Forms & WhatsApp */}
          <TabsContent value="forms">
            <SettingsSection
              title="Google Form & WhatsApp"
              description="Configure the student registration form and WhatsApp share text"
              onSave={saveFormSettings}
              saving={savingForm}
            >
              {loadingSettings ? (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : (
                <>
                  <div>
                    <Label htmlFor="google_form_url">Google Form URL</Label>
                    <Input
                      id="google_form_url"
                      type="url"
                      {...formSettingsForm.register('google_form_url')}
                      placeholder="https://forms.gle/…"
                      className="mt-1.5"
                    />
                    {formSettingsForm.formState.errors.google_form_url && (
                      <p className="text-xs text-red-500 mt-1">{formSettingsForm.formState.errors.google_form_url.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="whatsapp_share_text">WhatsApp Share Text</Label>
                    <Textarea
                      id="whatsapp_share_text"
                      {...formSettingsForm.register('whatsapp_share_text')}
                      rows={5}
                      className="mt-1.5 font-mono text-xs"
                      placeholder="Hey! Apply for internships at Intership → {FORM_URL}"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use <code className="bg-gray-100 px-1 rounded">{'{FORM_URL}'}</code> as placeholder — it will be replaced with the Google Form URL.
                    </p>
                  </div>
                </>
              )}
            </SettingsSection>
          </TabsContent>

          {/* Content */}
          <TabsContent value="content" className="space-y-6">
            {/* FAQs */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Manage FAQs</CardTitle>
                  <CardDescription>Control which FAQs are visible on the site</CardDescription>
                </div>
                <Button size="sm" onClick={openNewFaq} className="bg-brand-navy hover:bg-brand-navy/90 text-white gap-1.5">
                  <Plus className="h-3.5 w-3.5" /> Add FAQ
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {loadingFaqs ? (
                  <div className="space-y-2 p-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                  </div>
                ) : !faqs.length ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No FAQs yet. Add one!</p>
                ) : (
                  <div className="divide-y">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50/60 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 leading-snug">{faq.question}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{faq.answer}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Badge className={faq.is_active
                            ? 'bg-green-100 text-green-700 border-green-200 text-xs'
                            : 'bg-gray-100 text-gray-500 border-gray-200 text-xs'
                          }>
                            {faq.is_active ? 'Active' : 'Hidden'}
                          </Badge>
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => toggleFaqActive(faq)} title={faq.is_active ? 'Hide' : 'Publish'}>
                            {faq.is_active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEditFaq(faq)} title="Edit">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500 hover:bg-red-50" onClick={() => deleteFaq(faq)} title="Delete">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b pb-3">
                <CardTitle className="text-base font-semibold">Manage Testimonials</CardTitle>
                <CardDescription>Publish or hide student testimonials on the homepage</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {loadingTestimonials ? (
                  <div className="space-y-2 p-4">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                  </div>
                ) : !testimonials.length ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No testimonials yet.</p>
                ) : (
                  <div className="divide-y">
                    {testimonials.map((t) => (
                      <div key={t.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/60 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{t.student_name}</p>
                          <p className="text-xs text-muted-foreground truncate">{t.internship_title} @ {t.company_name}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge className={t.is_active
                            ? 'bg-green-100 text-green-700 border-green-200 text-xs'
                            : 'bg-gray-100 text-gray-500 border-gray-200 text-xs'
                          }>
                            {t.is_active ? 'Published' : 'Hidden'}
                          </Badge>
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => toggleTestimonial(t)} title={t.is_active ? 'Hide' : 'Publish'}>
                            {t.is_active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* FAQ Dialog */}
      <Dialog open={faqDialog.open} onOpenChange={(open) => !open && setFaqDialog({ open: false, editing: null })}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{faqDialog.editing ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={saveFaq} className="space-y-4">
            <div>
              <Label htmlFor="faq_question">Question *</Label>
              <Input id="faq_question" {...faqForm.register('question')} className="mt-1.5" placeholder="What is…?" />
              {faqForm.formState.errors.question && (
                <p className="text-xs text-red-500 mt-1">{faqForm.formState.errors.question.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="faq_answer">Answer *</Label>
              <Textarea id="faq_answer" {...faqForm.register('answer')} rows={4} className="mt-1.5" />
              {faqForm.formState.errors.answer && (
                <p className="text-xs text-red-500 mt-1">{faqForm.formState.errors.answer.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="faq_category">Category</Label>
                <Input id="faq_category" {...faqForm.register('category')} className="mt-1.5" placeholder="General" />
              </div>
              <div>
                <Label htmlFor="faq_order">Order Index</Label>
                <Input id="faq_order" type="number" min={0} {...faqForm.register('order_index')} className="mt-1.5" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setFaqDialog({ open: false, editing: null })}>Cancel</Button>
              <Button type="submit" disabled={savingFaq} className="bg-brand-navy hover:bg-brand-navy/90 text-white">
                {savingFaq && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {faqDialog.editing ? 'Update FAQ' : 'Create FAQ'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
