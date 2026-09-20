import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  User, Mail, Phone, Lock, Eye, EyeOff,
  GraduationCap, BookOpen, Tag, X, CheckCircle2,
  ChevronRight, ChevronLeft, AlertCircle, Upload,
} from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Logo } from '@/components/common/Logo'
import PageTitle from '@/components/common/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const BRANCHES = [
  'Computer Science','Information Technology','Electronics & Communication',
  'Electrical Engineering','Mechanical Engineering','Civil Engineering',
  'Chemical Engineering','Biotechnology','Other',
] as const

const YEARS_OF_STUDY = ['1st Year','2nd Year','3rd Year','4th Year','5th Year'] as const
const WORK_MODES = ['Remote','Onsite','Hybrid'] as const
const DOMAINS = [
  'Software Development','Web Development','Mobile App Development',
  'Data Science & Analytics','Machine Learning & AI','Cloud Computing',
  'Cybersecurity','DevOps & Infrastructure','UI/UX Design','Product Management',
  'Business Analytics','Digital Marketing','Content Writing','Finance & Accounting',
  'Human Resources','Operations & Supply Chain','Research & Development',
  'Embedded Systems','VLSI Design','Robotics & Automation',
  'Biotechnology & Life Sciences','Civil & Structural','Electrical & Power',
  'Mechanical Engineering','Chemical & Process Engineering',
] as const

const CURRENT_YEAR = new Date().getFullYear()
const GRAD_YEARS = Array.from({ length: 7 }, (_, i) => CURRENT_YEAR + i - 1)

const step1Schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  dob: z.string().optional(),
  gender: z.enum(['Male','Female','Other','Prefer not to say','']).optional(),
  password: z.string().min(8,'Password must be at least 8 characters')
    .regex(/[A-Za-z]/,'Must include at least one letter')
    .regex(/\d/,'Must include at least one number'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match", path: ['confirmPassword'],
})

const step2Schema = z.object({
  collegeName: z.string().min(2,'College name is required'),
  universityName: z.string().min(2,'University name is required'),
  branch: z.enum(BRANCHES, { errorMap: () => ({ message: 'Select a branch' }) }),
  yearOfStudy: z.enum(YEARS_OF_STUDY, { errorMap: () => ({ message: 'Select year of study' }) }),
  graduationYear: z.coerce.number().min(CURRENT_YEAR - 1).max(CURRENT_YEAR + 6),
  resumeFile: z.instanceof(FileList).optional().superRefine((fl, ctx) => {
    if (!fl || fl.length === 0) return
    const file = fl[0]
    const allowed = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(file.type)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Only PDF, DOC, or DOCX files are allowed' })
    if (file.size > 5 * 1024 * 1024) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'File size must be under 5 MB' })
  }),
})

const step3Schema = z.object({
  skills: z.array(z.string()).optional(),
  preferredDomains: z.array(z.string()).optional(),
  preferredLocation: z.string().optional(),
  workMode: z.enum(['Remote','Onsite','Hybrid','']).optional(),
  linkedinUrl: z.string().optional().refine(
    (v) => !v || v.startsWith('https://linkedin.com') || v.startsWith('https://www.linkedin.com'),
    { message: 'Enter a valid LinkedIn URL' }
  ),
  githubUrl: z.string().optional().refine(
    (v) => !v || v.startsWith('https://') || v.startsWith('http://'),
    { message: 'Enter a valid URL' }
  ),
  consent: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms to continue' }) }),
})

type Step1Form = z.infer<typeof step1Schema>
type Step2Form = z.infer<typeof step2Schema>
type Step3Form = z.infer<typeof step3Schema>

function SkillInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState('')
  const addSkill = () => {
    const t = input.trim()
    if (t && !value.includes(t)) onChange([...value, t])
    setInput('')
  }
  const removeSkill = (s: string) => onChange(value.filter((x) => x !== s))
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input placeholder="e.g. React, Python…" value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill() } }} />
        <Button type="button" variant="outline" onClick={addSkill} disabled={!input.trim()}>
          <Tag className="h-4 w-4" />
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs px-2.5 py-1 font-medium">
              {s}
              <button type="button" onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}><X className="h-3 w-3" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-xs text-red-500 mt-1">{msg}</p>
}

export default function StudentRegister() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [step1Data, setStep1Data] = useState<Step1Form | null>(null)
  const [step2Data, setStep2Data] = useState<Step2Form | null>(null)
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const form1 = useForm<Step1Form>({ resolver: zodResolver(step1Schema), defaultValues: step1Data ?? {} })
  const form2 = useForm<Step2Form>({ resolver: zodResolver(step2Schema), defaultValues: step2Data ?? { graduationYear: CURRENT_YEAR + 1 } })
  const form3 = useForm<Step3Form>({ resolver: zodResolver(step3Schema), defaultValues: { skills: [], preferredDomains: [], workMode: '' } })

  const onStep1Next = form1.handleSubmit((data) => { setStep1Data(data); setStep(2) })
  const onStep2Next = form2.handleSubmit((data) => { setStep2Data(data); setStep(3) })
  const onStep3Submit = form3.handleSubmit(async (data) => {
    if (!step1Data || !step2Data) return
    setSubmitError(null)
    try {
      await signUp(step1Data.email, step1Data.password, step1Data.fullName)
      setDone(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed'
      if (msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('already exists')) {
        setSubmitError('An account with this email already exists. Try logging in instead.')
      } else {
        setSubmitError(msg)
      }
    }
  })

  const progressValue = step === 1 ? 33 : step === 2 ? 66 : 100

  if (done) {
    return (
      <PublicLayout>
        <PageTitle title="Verify Email – Intership" />
        <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md text-center bg-white rounded-2xl shadow-lg border border-gray-100 p-10">
            <CheckCircle2 className="h-16 w-16 text-[#0D9488] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#1E3A5F] mb-2">Almost there!</h1>
            <p className="text-muted-foreground mb-6">
              We've sent a verification link to{' '}
              <span className="font-semibold text-foreground">{step1Data?.email}</span>.
              Click the link in your email to activate your account.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Didn&apos;t receive it? Check your spam folder or contact{' '}
              <a href="mailto:support@intership.in" className="text-[#0D9488] hover:underline">support@intership.in</a>
            </p>
            <Button onClick={() => navigate('/dashboard')} className="bg-[#1E3A5F] hover:bg-[#16304f] text-white w-full">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <PageTitle title="Create Account – Intership" />
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10">
            <div className="flex justify-center mb-6"><Logo size="md" /></div>
            <h1 className="text-2xl font-bold text-center text-[#1E3A5F] mb-1">Create your account</h1>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Step {step} of 3 — {step === 1 ? 'Basic Information' : step === 2 ? 'Academic Details' : 'Preferences'}
            </p>
            <Progress value={progressValue} className="mb-8 h-2" />

            {submitError && (
              <div className="flex items-start gap-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /><span>{submitError}</span>
              </div>
            )}

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <form onSubmit={onStep1Next} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input id="fullName" placeholder="Rahul Sharma"
                        className={cn('pl-9', form1.formState.errors.fullName && 'border-red-400')}
                        {...form1.register('fullName')} />
                    </div>
                    <FieldError msg={form1.formState.errors.fullName?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input id="reg-email" type="email" placeholder="you@example.com"
                        className={cn('pl-9', form1.formState.errors.email && 'border-red-400')}
                        {...form1.register('email')} />
                    </div>
                    <FieldError msg={form1.formState.errors.email?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-muted-foreground select-none">+91</span>
                      <Input id="mobile" type="tel" inputMode="numeric" maxLength={10} placeholder="9876543210"
                        className={cn('pl-[4.5rem]', form1.formState.errors.mobile && 'border-red-400')}
                        {...form1.register('mobile')} />
                    </div>
                    <FieldError msg={form1.formState.errors.mobile?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date"
                      max={new Date(Date.now() - 14 * 365.25 * 24 * 3600 * 1000).toISOString().split('T')[0]}
                      {...form1.register('dob')} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="gender">Gender</Label>
                    <select id="gender"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      {...form1.register('gender')}>
                      <option value="">Prefer not to say</option>
                      <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input id="password" type={showPw ? 'text' : 'password'} placeholder="Min 8 chars, letter + number"
                        className={cn('pl-9 pr-10', form1.formState.errors.password && 'border-red-400')}
                        {...form1.register('password')} />
                      <button type="button" aria-label={showPw ? 'Hide' : 'Show'}
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <FieldError msg={form1.formState.errors.password?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input id="confirmPassword" type={showConfirm ? 'text' : 'password'} placeholder="Re-enter password"
                        className={cn('pl-9 pr-10', form1.formState.errors.confirmPassword && 'border-red-400')}
                        {...form1.register('confirmPassword')} />
                      <button type="button" aria-label={showConfirm ? 'Hide' : 'Show'}
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <FieldError msg={form1.formState.errors.confirmPassword?.message} />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button type="submit" className="bg-[#1E3A5F] hover:bg-[#16304f] text-white min-w-[140px]">
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </form>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <form onSubmit={onStep2Next} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="collegeName">College Name *</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input id="collegeName" placeholder="e.g. IIT Bombay, VIT Vellore"
                        className={cn('pl-9', form2.formState.errors.collegeName && 'border-red-400')}
                        {...form2.register('collegeName')} />
                    </div>
                    <FieldError msg={form2.formState.errors.collegeName?.message} />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="universityName">University Name *</Label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input id="universityName" placeholder="e.g. Mumbai University"
                        className={cn('pl-9', form2.formState.errors.universityName && 'border-red-400')}
                        {...form2.register('universityName')} />
                    </div>
                    <FieldError msg={form2.formState.errors.universityName?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="branch">Branch / Stream *</Label>
                    <select id="branch"
                      className={cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', form2.formState.errors.branch && 'border-red-400')}
                      {...form2.register('branch')}>
                      <option value="">Select branch</option>
                      {BRANCHES.map((b) => <option key={b}>{b}</option>)}
                    </select>
                    <FieldError msg={form2.formState.errors.branch?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="yearOfStudy">Year of Study *</Label>
                    <select id="yearOfStudy"
                      className={cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', form2.formState.errors.yearOfStudy && 'border-red-400')}
                      {...form2.register('yearOfStudy')}>
                      <option value="">Select year</option>
                      {YEARS_OF_STUDY.map((y) => <option key={y}>{y}</option>)}
                    </select>
                    <FieldError msg={form2.formState.errors.yearOfStudy?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="graduationYear">Graduation Year *</Label>
                    <select id="graduationYear"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      {...form2.register('graduationYear')}>
                      {GRAD_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <FieldError msg={form2.formState.errors.graduationYear?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="resumeFile">Resume (optional)</Label>
                    <label htmlFor="resumeFile"
                      className="flex items-center gap-2 cursor-pointer h-10 w-full rounded-md border border-dashed border-input bg-background px-3 py-2 text-sm text-muted-foreground hover:border-[#0D9488] hover:text-[#0D9488] transition-colors">
                      <Upload className="h-4 w-4 shrink-0" />
                      <span className="truncate">
                        {form2.watch('resumeFile')?.[0]?.name ?? 'Upload PDF / DOC / DOCX (max 5 MB)'}
                      </span>
                      <input id="resumeFile" type="file" accept=".pdf,.doc,.docx" className="sr-only" {...form2.register('resumeFile')} />
                    </label>
                    <FieldError msg={form2.formState.errors.resumeFile?.message as string | undefined} />
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                  <Button type="submit" className="bg-[#1E3A5F] hover:bg-[#16304f] text-white min-w-[140px]">
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </form>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && (
              <form onSubmit={onStep3Submit} noValidate className="space-y-6">
                <div className="space-y-1.5">
                  <Label>Skills</Label>
                  <p className="text-xs text-muted-foreground">Type a skill and press Enter or comma to add</p>
                  <Controller control={form3.control} name="skills"
                    render={({ field }) => <SkillInput value={field.value ?? []} onChange={field.onChange} />} />
                </div>
                <div className="space-y-2">
                  <Label>Preferred Internship Domains</Label>
                  <p className="text-xs text-muted-foreground">Select all that apply</p>
                  <Controller control={form3.control} name="preferredDomains"
                    render={({ field }) => (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-h-56 overflow-y-auto rounded-lg border border-input p-3">
                        {DOMAINS.map((domain) => (
                          <label key={domain} className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#0D9488] transition-colors">
                            <input type="checkbox" value={domain} checked={field.value?.includes(domain)}
                              onChange={(e) => {
                                const current = field.value ?? []
                                field.onChange(e.target.checked ? [...current, domain] : current.filter((d) => d !== domain))
                              }}
                              className="h-4 w-4 rounded border-gray-300 accent-[#0D9488]" />
                            {domain}
                          </label>
                        ))}
                      </div>
                    )} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="preferredLocation">Preferred Location</Label>
                    <Input id="preferredLocation" placeholder="e.g. Bangalore, Mumbai, Remote"
                      {...form3.register('preferredLocation')} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="workMode">Work Mode Preference</Label>
                    <select id="workMode"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      {...form3.register('workMode')}>
                      <option value="">No preference</option>
                      {WORK_MODES.map((m) => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input id="linkedinUrl" type="url" placeholder="https://linkedin.com/in/yourprofile"
                      className={cn(form3.formState.errors.linkedinUrl && 'border-red-400')}
                      {...form3.register('linkedinUrl')} />
                    <FieldError msg={form3.formState.errors.linkedinUrl?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="githubUrl">GitHub / Portfolio URL</Label>
                    <Input id="githubUrl" type="url" placeholder="https://github.com/yourusername"
                      className={cn(form3.formState.errors.githubUrl && 'border-red-400')}
                      {...form3.register('githubUrl')} />
                    <FieldError msg={form3.formState.errors.githubUrl?.message} />
                  </div>
                </div>
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#0D9488]"
                      {...form3.register('consent')} />
                    <span className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <Link to="/terms" target="_blank" className="text-[#0D9488] hover:underline font-medium">Terms and Conditions</Link>{' '}
                      and{' '}
                      <Link to="/privacy" target="_blank" className="text-[#0D9488] hover:underline font-medium">Privacy Policy</Link>{' '}
                      of Intership. *
                    </span>
                  </label>
                  <FieldError msg={form3.formState.errors.consent?.message} />
                </div>
                <div className="flex justify-between pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                  <Button type="submit" className="bg-[#0D9488] hover:bg-[#0b8278] text-white min-w-[160px]"
                    disabled={form3.formState.isSubmitting}>
                    {form3.formState.isSubmitting
                      ? <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Creating…</span>
                      : 'Create Account'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
