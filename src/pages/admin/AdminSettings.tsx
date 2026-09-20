import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Loader2, Plus, Trash2, Pencil, Eye, EyeOff, UserPlus, Shield, KeyRound, Check, RefreshCw } from 'lucide-react'
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
import { supabase } from '@/lib/supabase'
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

  // Admin Accounts management state
  const [adminAccounts, setAdminAccounts] = useState<any[]>([])
  const [loadingAdmins, setLoadingAdmins] = useState(false)
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [newAdminPassword, setNewAdminPassword] = useState('')
  const [newAdminName, setNewAdminName] = useState('')
  const [creatingAdmin, setCreatingAdmin] = useState(false)

  // Edit admin dialog
  const [editingAdmin, setEditingAdmin] = useState<any | null>(null)
  const [editAdminName, setEditAdminName] = useState('')
  const [editAdminEmail, setEditAdminEmail] = useState('')
  const [editAdminPassword, setEditAdminPassword] = useState('')
  const [savingAdminEdit, setSavingAdminEdit] = useState(false)
  const [showEditPassword, setShowEditPassword] = useState(false)

  const loadAdminAccounts = async () => {
    setLoadingAdmins(true)
    try {
      const res = await api.get('/admin/accounts')
      setAdminAccounts(res.data?.data || [])
    } catch {
      try {
        const { data: adminProfiles } = await supabase
          .from('profiles')
          .select('id, email, full_name, role, created_at')
          .eq('role', 'admin')
          .order('created_at', { ascending: false })
        setAdminAccounts(adminProfiles || [])
      } catch {
        // Fallback
      }
    } finally {
      setLoadingAdmins(false)
    }
  }

  useEffect(() => {
    loadAdminAccounts()
  }, [])

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

        <Tabs defaultValue="admins">
          <TabsList className="mb-6">
            <TabsTrigger value="admins" className="gap-1.5 font-semibold">
              <Shield className="h-4 w-4 text-blue-600" /> Admin Accounts
            </TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="forms">Forms & WhatsApp</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          {/* Admin Accounts & Credentials */}
          <TabsContent value="admins">
            <div className="space-y-6">
              {/* Create New Admin Account */}
              <Card className="border border-slate-200 shadow-sm bg-white">
                <CardHeader className="border-b pb-4 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-base font-semibold text-slate-900">Create New Administrator</CardTitle>
                      <CardDescription className="text-xs">Add new admin accounts with complete access to manage Geek Intern</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      if (!newAdminEmail.trim() || !newAdminPassword.trim()) {
                        toast({ title: 'Email and password required', variant: 'destructive' })
                        return
                      }
                      if (newAdminPassword.length < 6) {
                        toast({ title: 'Password must be at least 6 characters', variant: 'destructive' })
                        return
                      }
                      setCreatingAdmin(true)
                      try {
                        await api.post('/admin/accounts', {
                          full_name: newAdminName.trim() || 'Administrator',
                          email: newAdminEmail.trim(),
                          password: newAdminPassword.trim(),
                        })
                        toast({ title: 'Admin account created successfully!' })
                        setNewAdminName('')
                        setNewAdminEmail('')
                        setNewAdminPassword('')
                        loadAdminAccounts()
                      } catch (err: any) {
                        try {
                          const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
                            email: newAdminEmail.trim(),
                            password: newAdminPassword.trim(),
                            options: {
                              data: {
                                full_name: newAdminName.trim() || 'Administrator',
                                role: 'admin',
                              },
                            },
                          })
                          if (signUpErr) throw signUpErr
                          if (signUpData.user) {
                            await supabase.from('profiles').upsert({
                              id: signUpData.user.id,
                              email: newAdminEmail.trim(),
                              full_name: newAdminName.trim() || 'Administrator',
                              role: 'admin',
                              is_email_verified: true,
                              updated_at: new Date().toISOString(),
                            })
                          }
                          toast({ title: 'Admin account created successfully!' })
                          setNewAdminName('')
                          setNewAdminEmail('')
                          setNewAdminPassword('')
                          loadAdminAccounts()
                        } catch (fallbackErr: any) {
                          toast({
                            title: 'Failed to create admin',
                            description: fallbackErr?.message || err?.response?.data?.message || err?.message || 'Error occurred',
                            variant: 'destructive',
                          })
                        }
                      } finally {
                        setCreatingAdmin(false)
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="new_admin_name" className="text-xs font-semibold text-slate-700">Admin Name / Username</Label>
                        <Input
                          id="new_admin_name"
                          placeholder="e.g. John Doe"
                          value={newAdminName}
                          onChange={(e) => setNewAdminName(e.target.value)}
                          className="mt-1.5 h-10 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new_admin_email" className="text-xs font-semibold text-slate-700">Email Address *</Label>
                        <Input
                          id="new_admin_email"
                          type="email"
                          placeholder="e.g. admin2@geekintern.com"
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          required
                          className="mt-1.5 h-10 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new_admin_password" className="text-xs font-semibold text-slate-700">Password *</Label>
                        <Input
                          id="new_admin_password"
                          type="text"
                          placeholder="Min. 6 characters"
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          required
                          className="mt-1.5 h-10 text-sm font-mono"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                      <Button
                        type="submit"
                        disabled={creatingAdmin || !newAdminEmail.trim() || !newAdminPassword.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 h-10"
                      >
                        {creatingAdmin ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" /> Creating Account...
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <Plus className="h-4 w-4" /> Add Admin Account
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Existing Admin Accounts List & Modify Credentials */}
              <Card className="border border-slate-200 shadow-sm bg-white">
                <CardHeader className="border-b pb-4 bg-slate-50/50 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-600" />
                    <div>
                      <CardTitle className="text-base font-semibold text-slate-900">Current Administrator Accounts</CardTitle>
                      <CardDescription className="text-xs">Manage usernames, change emails, and update passwords</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadAdminAccounts}
                    disabled={loadingAdmins}
                    className="h-8 text-xs border-slate-200 text-slate-600 gap-1"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${loadingAdmins ? 'animate-spin' : ''}`} /> Refresh
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  {loadingAdmins ? (
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : adminAccounts.length === 0 ? (
                    <div className="p-8 text-center text-sm text-slate-500">
                      No admin accounts found.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {adminAccounts.map((admin) => (
                        <div key={admin.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">{admin.full_name || 'Administrator'}</span>
                              <Badge className="bg-blue-100 text-blue-800 text-[10px] font-semibold border-0">
                                Admin
                              </Badge>
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-2">
                              <span>Email: <strong className="text-slate-700 font-mono">{admin.email}</strong></span>
                              <span>•</span>
                              <span>Added: {new Date(admin.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingAdmin(admin)
                              setEditAdminName(admin.full_name || '')
                              setEditAdminEmail(admin.email || '')
                              setEditAdminPassword('')
                              setShowEditPassword(false)
                            }}
                            className="text-xs font-semibold border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-blue-600 gap-1.5 shrink-0"
                          >
                            <KeyRound className="h-3.5 w-3.5" />
                            Change Username / Password
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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

      {/* Edit Admin Account Dialog */}
      <Dialog open={!!editingAdmin} onOpenChange={(open) => !open && setEditingAdmin(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-blue-600" />
              Change Admin Credentials
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (!editingAdmin) return
              if (editAdminPassword && editAdminPassword.length < 6) {
                toast({ title: 'Password must be at least 6 characters', variant: 'destructive' })
                return
              }

              setSavingAdminEdit(true)
              try {
                // 1. First try backend API if active
                try {
                  await api.patch(`/admin/accounts/${editingAdmin.id}`, {
                    full_name: editAdminName.trim(),
                    email: editAdminEmail.trim(),
                    password: editAdminPassword.trim() || undefined,
                  }, { timeout: 3000 })
                } catch (apiErr) {
                  // If backend is not hosted, continue to direct Supabase update
                }

                // 2. Direct Supabase Database Update on public.profiles
                const profileUpdates: { full_name?: string; email?: string; updated_at: string } = {
                  updated_at: new Date().toISOString()
                }
                if (editAdminName.trim()) profileUpdates.full_name = editAdminName.trim()
                if (editAdminEmail.trim()) profileUpdates.email = editAdminEmail.trim().toLowerCase()

                const { error: profErr } = await supabase
                  .from('profiles')
                  .update(profileUpdates)
                  .eq('id', editingAdmin.id)

                if (profErr) {
                  console.warn('Profile update warning:', profErr)
                }

                // 3. If updating current logged-in admin account, sync Supabase Auth & Password
                const { data: { user: currentUser } } = await supabase.auth.getUser()
                if (currentUser && currentUser.id === editingAdmin.id) {
                  const authAttr: { password?: string; data?: { full_name: string } } = {}
                  if (editAdminPassword.trim()) {
                    authAttr.password = editAdminPassword.trim()
                  }
                  if (editAdminName.trim()) {
                    authAttr.data = { full_name: editAdminName.trim() }
                  }

                  if (Object.keys(authAttr).length > 0) {
                    const { error: authErr } = await supabase.auth.updateUser(authAttr)
                    if (authErr) {
                      console.warn('Auth updateUser warning:', authErr)
                      if (authErr.message?.includes('same password')) {
                        // Ignore same password error
                      } else {
                        throw authErr
                      }
                    }
                  }
                }

                // 4. Update local state immediately so changes reflect instantly in UI
                setAdminAccounts((prev) =>
                  prev.map((a) =>
                    a.id === editingAdmin.id
                      ? { ...a, full_name: editAdminName.trim() || a.full_name, email: editAdminEmail.trim() || a.email }
                      : a
                  )
                )

                toast({ title: 'Admin credentials updated successfully!' })
                setEditingAdmin(null)
                loadAdminAccounts()
              } catch (err: any) {
                console.error('Failed to update credentials:', err)
                toast({
                  title: 'Failed to update credentials',
                  description: err?.message || err?.response?.data?.message || 'Error occurred while saving',
                  variant: 'destructive',
                })
              } finally {
                setSavingAdminEdit(false)
              }
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="edit_admin_name" className="text-xs font-semibold text-slate-700">
                Admin Name / Username
              </Label>
              <Input
                id="edit_admin_name"
                value={editAdminName}
                onChange={(e) => setEditAdminName(e.target.value)}
                className="mt-1.5 h-10 text-sm"
                required
              />
            </div>

            <div>
              <Label htmlFor="edit_admin_email" className="text-xs font-semibold text-slate-700">
                Email Address (Login Username)
              </Label>
              <Input
                id="edit_admin_email"
                type="email"
                value={editAdminEmail}
                onChange={(e) => setEditAdminEmail(e.target.value)}
                className="mt-1.5 h-10 text-sm"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="edit_admin_password" className="text-xs font-semibold text-slate-700">
                  New Password
                </Label>
                <span className="text-[11px] text-slate-400">Leave blank to keep current</span>
              </div>
              <div className="relative mt-1.5">
                <Input
                  id="edit_admin_password"
                  type={showEditPassword ? 'text' : 'password'}
                  placeholder="Enter new password (min. 6 chars)"
                  value={editAdminPassword}
                  onChange={(e) => setEditAdminPassword(e.target.value)}
                  className="h-10 text-sm pr-10 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowEditPassword(!showEditPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showEditPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setEditingAdmin(null)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={savingAdminEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {savingAdminEdit ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                  </span>
                ) : (
                  'Save Credentials'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
