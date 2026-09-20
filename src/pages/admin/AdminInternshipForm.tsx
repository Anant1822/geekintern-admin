import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Trash2, Loader2, Save, Globe } from 'lucide-react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import LoadingPage from '@/components/common/LoadingPage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import api from '@/services/api'
import { cn } from '@/lib/utils'
import type { InternshipCategory } from '@/types'

// ── Schema ─────────────────────────────────────────────────────────────────
const listItemSchema = z.object({ value: z.string().min(1, 'Cannot be empty') })

const internshipSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  provider_name: z.string().min(2, 'Provider name required'),
  category_id: z.string().min(1, 'Category is required'),
  status: z.enum(['draft', 'published']),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  responsibilities: z.array(listItemSchema).min(1, 'Add at least one responsibility'),
  requirements: z.array(listItemSchema).min(1, 'Add at least one requirement'),
  skills_required: z.string(),
  branch_eligibility: z.array(z.string()),
  duration_weeks: z.coerce.number().min(1).max(104),
  work_mode: z.enum(['remote', 'onsite', 'hybrid']),
  location: z.string().optional(),
  start_date: z.string().optional(),
  application_deadline: z.string().min(1, 'Deadline is required'),
  is_paid: z.boolean(),
  stipend_amount: z.coerce.number().min(0).optional(),
  stipend_currency: z.string().optional(),
  application_fee: z.coerce.number().min(0),
  seats_total: z.coerce.number().min(1),
  certification_details: z.string().optional(),
  selection_process: z.string().optional(),
  certificate_conditions: z.string().optional(),
  is_featured: z.boolean(),
  is_verified: z.boolean(),
})

type InternshipFormData = z.infer<typeof internshipSchema>

const BRANCHES = [
  'CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical',
  'Biotechnology', 'MBA', 'MCA', 'BCA', 'Commerce', 'Arts', 'Other',
]

// ── Toggle ──────────────────────────────────────────────────────────────────
function ToggleField({ label, description, checked, onChange }: {
  label: string; description?: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2',
          checked ? 'bg-brand-teal' : 'bg-gray-200'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  )
}

// ── Section Header ────────────────────────────────────────────────────────
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-4">{children}</CardContent>
    </Card>
  )
}

// ── Component ──────────────────────────────────────────────────────────────
export default function AdminInternshipForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const { isAdmin, isInitialized } = useAuth()
  const { toast } = useToast()

  const [categories, setCategories] = useState<InternshipCategory[]>([])
  const [loadingData, setLoadingData] = useState(isEdit)

  useEffect(() => {
    // Admin form accessible
  }, [navigate])

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InternshipFormData>({
    resolver: zodResolver(internshipSchema),
    defaultValues: {
      status: 'draft',
      work_mode: 'remote',
      is_paid: false,
      is_featured: false,
      is_verified: false,
      responsibilities: [{ value: '' }],
      requirements: [{ value: '' }],
      branch_eligibility: [],
      stipend_currency: 'INR',
      application_fee: 0,
      seats_total: 50,
      duration_weeks: 8,
    },
  })

  const { fields: respFields, append: appendResp, remove: removeResp } =
    useFieldArray({ control, name: 'responsibilities' })
  const { fields: reqFields, append: appendReq, remove: removeReq } =
    useFieldArray({ control, name: 'requirements' })

  const isPaid = watch('is_paid')
  const workMode = watch('work_mode')
  const branchEligibility = watch('branch_eligibility')

  // Fetch categories & (if edit) existing internship
  useEffect(() => {
    const load = async () => {
      try {
        const catRes = await api.get('/internships/categories')
        const catList = Array.isArray(catRes.data) ? catRes.data : (catRes.data?.data ?? [])
        setCategories(catList)

        if (isEdit && id) {
          const iRes = await api.get(`/internships/${id}`, { params: { admin: 'true' } })
          const d = iRes.data?.data || iRes.data
          const isDraft = d.status === 'draft' || !d.is_verified
          reset({
            title: d.title,
            provider_name: d.provider_name,
            category_id: d.category_id,
            status: isDraft ? 'draft' : 'published',
            description: d.description,
            responsibilities: (d.responsibilities ?? []).map((v: string) => ({ value: v })),
            requirements: (d.requirements ?? []).map((v: string) => ({ value: v })),
            skills_required: ((d.skills_required || d.required_skills) ?? []).join(', '),
            branch_eligibility: d.branch_eligibility ?? [],
            duration_weeks: d.duration_weeks,
            work_mode: d.work_mode,
            location: d.location ?? '',
            start_date: d.start_date ? d.start_date.split('T')[0] : '',
            application_deadline: d.application_deadline ? d.application_deadline.split('T')[0] : '',
            is_paid: d.is_paid,
            stipend_amount: d.stipend_amount,
            stipend_currency: d.stipend_currency ?? 'INR',
            application_fee: d.application_fee,
            seats_total: d.seats_total || d.max_applicants || 50,
            certification_details: d.certification_details ?? '',
            selection_process: d.selection_process ?? '',
            certificate_conditions: d.certificate_conditions ?? '',
            is_featured: d.is_featured,
            is_verified: d.is_verified,
          })
        }
      } catch {
        toast({ title: 'Error', description: 'Could not load form data.', variant: 'destructive' })
      } finally {
        setLoadingData(false)
      }
    }
    load()
  }, [isEdit, id, reset, toast])

  const buildPayload = (data: Partial<InternshipFormData>, publish: boolean) => ({
    title: data.title?.trim() || 'Untitled Internship Draft',
    provider_name: data.provider_name?.trim() || 'Geekintern',
    category_id: data.category_id || null,
    description: data.description || null,
    responsibilities: (data.responsibilities ?? []).map((r) => r.value).filter(Boolean),
    requirements: (data.requirements ?? []).map((r) => r.value).filter(Boolean),
    skills_required: (data.skills_required || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    branch_eligibility: data.branch_eligibility ?? [],
    duration_weeks: data.duration_weeks || 8,
    work_mode: data.work_mode || 'remote',
    location: data.location || null,
    start_date: data.start_date || null,
    application_deadline: data.application_deadline || null,
    is_paid: Boolean(data.is_paid),
    stipend_amount: data.is_paid ? data.stipend_amount : null,
    stipend_currency: data.is_paid ? data.stipend_currency : null,
    application_fee: data.application_fee ?? 0,
    seats_total: data.seats_total || 50,
    certification_details: data.certification_details || null,
    selection_process: data.selection_process || null,
    certificate_conditions: data.certificate_conditions || null,
    is_featured: Boolean(data.is_featured),
    is_verified: publish,
    status: publish ? 'published' : 'draft',
  })

  const [draftSubmitting, setDraftSubmitting] = useState(false)

  const handleSaveDraft = async () => {
    setDraftSubmitting(true)
    const currentValues = getValues()
    const payload = buildPayload(currentValues, false)
    try {
      if (isEdit && id) {
        await api.patch(`/internships/${id}`, payload)
        toast({ title: 'Internship draft updated successfully.' })
      } else {
        await api.post('/internships', payload)
        toast({ title: 'Internship saved as draft.' })
      }
      navigate('/admin/internships')
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      toast({ title: 'Error', description: message ?? 'Could not save draft.', variant: 'destructive' })
    } finally {
      setDraftSubmitting(false)
    }
  }

  const handlePublish = async (data: InternshipFormData) => {
    const payload = buildPayload(data, true)
    try {
      if (isEdit && id) {
        await api.patch(`/internships/${id}`, payload)
        toast({ title: 'Internship published successfully.' })
      } else {
        await api.post('/internships', payload)
        toast({ title: 'Internship published successfully.' })
      }
      navigate('/admin/internships')
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      toast({ title: 'Error', description: message ?? 'Could not publish internship.', variant: 'destructive' })
    }
  }

  const toggleBranch = (branch: string) => {
    const cur = branchEligibility ?? []
    setValue('branch_eligibility', cur.includes(branch) ? cur.filter((b) => b !== branch) : [...cur, branch])
  }

  const fieldError = (field: keyof InternshipFormData) =>
    errors[field] ? <p className="text-xs text-red-500 mt-1">{errors[field]?.message as string}</p> : null

  if (loadingData) {
    return (
      <AdminLayout title={isEdit ? 'Edit Internship' : 'New Internship'}>
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-brand-navy mb-3" />
          <p className="text-sm text-muted-foreground">Loading internship details...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={isEdit ? 'Edit Internship' : 'New Internship'}>
      <form onSubmit={handleSubmit(handlePublish)} className="space-y-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{isEdit ? 'Edit Internship' : 'Create New Internship'}</h2>
            <p className="text-sm text-muted-foreground">Fill in the details below (Save as Draft requires only basic info)</p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting || draftSubmitting}
              onClick={handleSaveDraft}
              className="gap-2"
            >
              {draftSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || draftSubmitting}
              className="bg-brand-teal hover:bg-brand-teal/90 text-white gap-2"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
              Publish Now
            </Button>
          </div>
        </div>

        {/* Section 1: Basic Info */}
        <SectionCard title="Basic Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Internship Title *</Label>
              <Input id="title" {...register('title')} placeholder="e.g., Frontend Developer Intern" className="mt-1.5" />
              {fieldError('title')}
            </div>
            <div>
              <Label htmlFor="provider_name">Provider / Company Name *</Label>
              <Input id="provider_name" {...register('provider_name')} placeholder="e.g., Acme Corp" className="mt-1.5" />
              {fieldError('provider_name')}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Category *</Label>
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {fieldError('category_id')}
            </div>
            <div>
              <Label>Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </SectionCard>

        {/* Section 2: Description */}
        <SectionCard title="Description">
          <div>
            <Label htmlFor="description">About the Internship *</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe the internship opportunity…"
              rows={5}
              className="mt-1.5"
            />
            {fieldError('description')}
          </div>

          {/* Responsibilities */}
          <div>
            <Label>Responsibilities *</Label>
            <div className="mt-2 space-y-2">
              {respFields.map((field, idx) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    {...register(`responsibilities.${idx}.value`)}
                    placeholder={`Responsibility ${idx + 1}`}
                  />
                  {respFields.length > 1 && (
                    <Button type="button" size="icon" variant="ghost" className="text-red-500 shrink-0" onClick={() => removeResp(idx)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" size="sm" variant="outline" className="gap-1.5" onClick={() => appendResp({ value: '' })}>
                <Plus className="h-3.5 w-3.5" /> Add Responsibility
              </Button>
            </div>
            {errors.responsibilities && <p className="text-xs text-red-500 mt-1">Add at least one responsibility.</p>}
          </div>

          {/* Requirements */}
          <div>
            <Label>Requirements *</Label>
            <div className="mt-2 space-y-2">
              {reqFields.map((field, idx) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    {...register(`requirements.${idx}.value`)}
                    placeholder={`Requirement ${idx + 1}`}
                  />
                  {reqFields.length > 1 && (
                    <Button type="button" size="icon" variant="ghost" className="text-red-500 shrink-0" onClick={() => removeReq(idx)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" size="sm" variant="outline" className="gap-1.5" onClick={() => appendReq({ value: '' })}>
                <Plus className="h-3.5 w-3.5" /> Add Requirement
              </Button>
            </div>
          </div>
        </SectionCard>

        {/* Section 3: Skills & Eligibility */}
        <SectionCard title="Skills & Eligibility">
          <div>
            <Label htmlFor="skills_required">Required Skills</Label>
            <Input
              id="skills_required"
              {...register('skills_required')}
              placeholder="React, TypeScript, Node.js (comma-separated)"
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1">Separate skills with commas</p>
          </div>
          <div>
            <Label>Branch Eligibility</Label>
            <p className="text-xs text-muted-foreground mb-2">Leave all unchecked = all branches eligible</p>
            <div className="flex flex-wrap gap-2">
              {BRANCHES.map((branch) => {
                const checked = (branchEligibility ?? []).includes(branch)
                return (
                  <button
                    key={branch}
                    type="button"
                    onClick={() => toggleBranch(branch)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                      checked
                        ? 'bg-brand-navy text-white border-brand-navy'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    )}
                  >
                    {branch}
                  </button>
                )
              })}
            </div>
          </div>
        </SectionCard>

        {/* Section 4: Duration & Work */}
        <SectionCard title="Duration & Work Details">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="duration_weeks">Duration (Weeks) *</Label>
              <Input id="duration_weeks" type="number" min={1} max={104} {...register('duration_weeks')} className="mt-1.5" />
              {fieldError('duration_weeks')}
            </div>
            <div>
              <Label>Work Mode *</Label>
              <Controller
                name="work_mode"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {(workMode === 'onsite' || workMode === 'hybrid') && (
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register('location')} placeholder="e.g., Bengaluru, Karnataka" className="mt-1.5" />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_date">Start Date</Label>
              <Input id="start_date" type="date" {...register('start_date')} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="application_deadline">Application Deadline *</Label>
              <Input id="application_deadline" type="date" {...register('application_deadline')} className="mt-1.5" />
              {fieldError('application_deadline')}
            </div>
          </div>
        </SectionCard>

        {/* Section 5: Compensation */}
        <SectionCard title="Compensation">
          <Controller
            name="is_paid"
            control={control}
            render={({ field }) => (
              <ToggleField
                label="Paid Internship"
                description="Enable if students receive a stipend"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {isPaid && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <Label htmlFor="stipend_amount">Stipend Amount (per month)</Label>
                <Input id="stipend_amount" type="number" min={0} {...register('stipend_amount')} placeholder="5000" className="mt-1.5" />
              </div>
              <div>
                <Label>Stipend Currency</Label>
                <Controller
                  name="stipend_currency"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value ?? 'INR'} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR ₹</SelectItem>
                        <SelectItem value="USD">USD $</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          )}
        </SectionCard>

        {/* Section 6: Fees & Limits */}
        <SectionCard title="Fees & Limits">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="application_fee">Application Fee (₹) *</Label>
              <Input id="application_fee" type="number" min={0} {...register('application_fee')} className="mt-1.5" />
              <p className="text-xs text-muted-foreground mt-1">Auto-populated from category, override if needed</p>
              {fieldError('application_fee')}
            </div>
            <div>
              <Label htmlFor="seats_total">Max Applicants *</Label>
              <Input id="seats_total" type="number" min={1} {...register('seats_total')} className="mt-1.5" />
              {fieldError('seats_total')}
            </div>
          </div>
        </SectionCard>

        {/* Section 7: Details */}
        <SectionCard title="Additional Details">
          <div>
            <Label htmlFor="certification_details">Certification Details</Label>
            <Textarea id="certification_details" {...register('certification_details')} rows={3} placeholder="Describe the certificate awarded upon completion…" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="selection_process">Selection Process</Label>
            <Textarea id="selection_process" {...register('selection_process')} rows={3} placeholder="Describe the selection/interview process…" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="certificate_conditions">Certificate Conditions</Label>
            <Textarea id="certificate_conditions" {...register('certificate_conditions')} rows={3} placeholder="Conditions for receiving the certificate…" className="mt-1.5" />
          </div>
        </SectionCard>

        {/* Section 8: Flags */}
        <SectionCard title="Visibility Flags">
          <Controller
            name="is_featured"
            control={control}
            render={({ field }) => (
              <ToggleField
                label="Featured Internship"
                description="Shows on homepage featured section"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Separator />
          <Controller
            name="is_verified"
            control={control}
            render={({ field }) => (
              <ToggleField
                label="Mark as Verified / Published"
                description="Verified internships appear in public browse"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </SectionCard>

        {/* Footer actions */}
        <div className="flex gap-3 pb-8">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting || draftSubmitting}
            onClick={handleSaveDraft}
            className="gap-2"
          >
            {draftSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save as Draft
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || draftSubmitting}
            className="bg-brand-teal hover:bg-brand-teal/90 text-white gap-2"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
            Publish Now
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/internships')} className="ml-auto">
            Cancel
          </Button>
        </div>
      </form>
    </AdminLayout>
  )
}
