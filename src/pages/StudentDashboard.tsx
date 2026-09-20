import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, Bookmark, User, Settings,
  CheckCircle2, Clock, TrendingUp, AlertCircle, Download,
  Edit2, Save, X, Camera, Plus, ExternalLink, Trash2, Eye, EyeOff, Lock,
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import PageTitle from '@/components/common/PageTitle'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { studentsService } from '@/services/students'
import { authService } from '@/services/auth'
import type { Application, Student } from '@/types'
import { cn, formatDate, getStatusLabel, getStatusColor, getInitials } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// ── Types ─────────────────────────────────────────────────────
type TabId = 'overview' | 'applications' | 'saved' | 'profile' | 'settings'

// ── Helpers ───────────────────────────────────────────────────
function calcProfileCompletion(profile: Student | null): number {
  if (!profile) return 0
  const checks = [
    !!profile.full_name,
    !!profile.email,
    !!profile.phone,
    !!profile.college_name,
    !!profile.branch,
    !!profile.graduation_year,
    profile.skills && profile.skills.length > 0,
    !!profile.bio,
    !!profile.linkedin_url,
    !!profile.resume_url,
    !!profile.avatar_url,
  ]
  const done = checks.filter(Boolean).length
  return Math.round((done / checks.length) * 100)
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border', getStatusColor(status))}>
      {getStatusLabel(status)}
    </span>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-white p-5 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}

// ── Change password schema ─────────────────────────────────────
const changePwSchema = z.object({
  newPassword: z.string().min(8, 'Min 8 characters').regex(/[A-Za-z]/, 'Include a letter').regex(/\d/, 'Include a number'),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] })
type ChangePwForm = z.infer<typeof changePwSchema>

// ── Edit profile schema ────────────────────────────────────────
const editProfileSchema = z.object({
  full_name: z.string().min(2, 'Required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit number').optional().or(z.literal('')),
  bio: z.string().max(500).optional(),
  college_name: z.string().optional(),
  branch: z.string().optional(),
  graduation_year: z.coerce.number().optional(),
  skills_raw: z.string().optional(),
  linkedin_url: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  github_url: z.string().url('Enter a valid URL').optional().or(z.literal('')),
})
type EditProfileForm = z.infer<typeof editProfileSchema>

// ─────────────────────────────────────────────────────────────
// Tab: Overview
// ─────────────────────────────────────────────────────────────
function OverviewTab({ profile, applications, loadingApps }: {
  profile: Student | null
  applications: Application[]
  loadingApps: boolean
}) {
  const completion = calcProfileCompletion(profile)
  const firstName = profile?.full_name?.split(' ')[0] ?? 'Student'

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-xl bg-gradient-to-r from-[#1E3A5F] to-[#0D9488] p-6 text-white">
        <h2 className="text-xl font-bold mb-1">Hello, {firstName}! 👋</h2>
        <p className="text-white/80 text-sm">Ready to find your next internship? Your profile is {completion}% complete.</p>
      </div>

      {/* Profile completion prompt */}
      {completion < 70 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800">Complete your profile to get noticed</p>
            <p className="text-xs text-amber-700 mt-0.5">A complete profile increases your chances of being selected.</p>
          </div>
          <Link to="?tab=profile">
            <Button size="sm" variant="outline" className="border-amber-400 text-amber-800 hover:bg-amber-100 text-xs">
              Complete Profile
            </Button>
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Applications', value: loadingApps ? '–' : applications.length, icon: Briefcase, color: 'text-[#1E3A5F] bg-blue-50' },
          { label: 'Profile Complete', value: `${completion}%`, icon: CheckCircle2, color: 'text-[#0D9488] bg-teal-50' },
          { label: 'Active Reviews', value: loadingApps ? '–' : applications.filter((a) => a.status === 'reviewing' || a.status === 'pending').length, icon: Clock, color: 'text-amber-600 bg-amber-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border bg-white p-5 flex items-center gap-4">
            <div className={cn('h-10 w-10 rounded-full flex items-center justify-center', color)}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1E3A5F]">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Profile completion bar */}
      <div className="rounded-xl border bg-white p-5 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Profile Completion</p>
          <span className="text-sm font-bold text-[#0D9488]">{completion}%</span>
        </div>
        <Progress value={completion} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {completion < 100
            ? 'Add more details to your profile to reach 100%'
            : 'Your profile is complete! 🎉'}
        </p>
      </div>

      {/* Recent applications */}
      <div className="rounded-xl border bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#1E3A5F]">Recent Applications</h3>
          <Link to="?tab=applications" className="text-xs text-[#0D9488] hover:underline">View all</Link>
        </div>
        {loadingApps ? (
          <div className="space-y-3">{[1,2].map((i) => <SkeletonCard key={i} />)}</div>
        ) : applications.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No applications yet.{' '}
            <Link to="/browse" className="text-[#0D9488] hover:underline">Browse internships →</Link>
          </p>
        ) : (
          <div className="space-y-3">
            {applications.slice(0, 3).map((app) => (
              <div key={app.id} className="flex items-center justify-between gap-4 rounded-lg border p-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{app.internship?.title ?? 'Internship'}</p>
                  <p className="text-xs text-muted-foreground">{app.internship?.provider_name}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Tab: Applications
// ─────────────────────────────────────────────────────────────
function ApplicationsTab({ applications, loading }: { applications: Application[]; loading: boolean }) {
  const handleDownload = async (applicationId: string) => {
    try {
      const { url } = await studentsService.getResumeDownloadUrl()
      window.open(url, '_blank')
    } catch {
      // silent fail - receipt download not critical
    }
  }

  if (loading) {
    return <div className="space-y-3">{[1,2,3].map((i) => <SkeletonCard key={i} />)}</div>
  }

  if (applications.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No applications yet"
        description="Browse internships and apply to get started on your career journey."
        action={<Link to="/browse"><Button className="bg-[#1E3A5F] hover:bg-[#16304f] text-white">Browse Internships</Button></Link>}
      />
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{applications.length} application{applications.length !== 1 ? 's' : ''} found</p>
      {applications.map((app) => (
        <div key={app.id} className="rounded-xl border bg-white p-5">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-[#1E3A5F] truncate">{app.internship?.title ?? 'Internship'}</h3>
                <StatusBadge status={app.status} />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{app.internship?.provider_name ?? '–'}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>Applied: {formatDate(app.applied_at)}</span>
                {app.payment && (
                  <span className={cn('font-medium', app.payment.status === 'paid' ? 'text-green-600' : 'text-red-600')}>
                    Fee: {app.payment.status === 'paid' ? 'Paid ✓' : 'Not Paid'}
                  </span>
                )}
              </div>
            </div>
            {app.payment?.status === 'paid' && (
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 text-xs"
                onClick={() => handleDownload(app.id)}
              >
                <Download className="h-3.5 w-3.5 mr-1" /> Receipt
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Tab: Saved
// ─────────────────────────────────────────────────────────────
function SavedTab() {
  return (
    <EmptyState
      icon={Bookmark}
      title="No saved internships"
      description="Browse internships and save the ones you like to find them easily later."
      action={<Link to="/browse"><Button className="bg-[#1E3A5F] hover:bg-[#16304f] text-white">Browse Internships</Button></Link>}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// Tab: Profile
// ─────────────────────────────────────────────────────────────
function ProfileTab({ profile, onSaved }: { profile: Student | null; onSaved: () => void }) {
  const { updateProfile, uploadResume, isLoading } = useProfile()
  const [editMode, setEditMode] = useState(false)
  const [resumeLoading, setResumeLoading] = useState(false)
  const [resumeError, setResumeError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      full_name: profile?.full_name ?? '',
      phone: profile?.phone ?? '',
      bio: profile?.bio ?? '',
      college_name: profile?.college_name ?? '',
      branch: profile?.branch ?? '',
      graduation_year: profile?.graduation_year,
      skills_raw: profile?.skills?.join(', ') ?? '',
      linkedin_url: profile?.linkedin_url ?? '',
      github_url: profile?.github_url ?? '',
    },
  })

  useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name,
        phone: profile.phone ?? '',
        bio: profile.bio ?? '',
        college_name: profile.college_name ?? '',
        branch: profile.branch ?? '',
        graduation_year: profile.graduation_year,
        skills_raw: profile.skills?.join(', ') ?? '',
        linkedin_url: profile.linkedin_url ?? '',
        github_url: profile.github_url ?? '',
      })
    }
  }, [profile, reset])

  const onSubmit = async (data: EditProfileForm) => {
    setSaveError(null)
    try {
      const skills = data.skills_raw
        ? data.skills_raw.split(',').map((s) => s.trim()).filter(Boolean)
        : []
      await updateProfile({
        full_name: data.full_name,
        phone: data.phone || undefined,
        bio: data.bio || undefined,
        college_name: data.college_name || undefined,
        branch: data.branch || undefined,
        graduation_year: data.graduation_year,
        skills,
        linkedin_url: data.linkedin_url || undefined,
        github_url: data.github_url || undefined,
      })
      setEditMode(false)
      onSaved()
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save')
    }
  }

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(file.type)) { setResumeError('Only PDF, DOC, or DOCX allowed'); return }
    if (file.size > 5 * 1024 * 1024) { setResumeError('File must be under 5 MB'); return }
    setResumeError(null)
    setResumeLoading(true)
    try {
      await uploadResume(file)
      onSaved()
    } catch (err: unknown) {
      setResumeError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setResumeLoading(false)
    }
  }

  const SectionRow = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="grid grid-cols-3 gap-2 py-2.5 border-b last:border-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="col-span-2 text-sm font-medium text-foreground">{value ?? '—'}</dd>
    </div>
  )

  if (!profile) return <div className="space-y-3">{[1,2,3].map((i) => <SkeletonCard key={i} />)}</div>

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar_url} />
            <AvatarFallback className="bg-[#1E3A5F] text-white text-xl">
              {getInitials(profile.full_name)}
            </AvatarFallback>
          </Avatar>
          <label htmlFor="avatarUpload" className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-[#0D9488] text-white flex items-center justify-center cursor-pointer hover:bg-[#0b8278] transition-colors" aria-label="Upload photo">
            <Camera className="h-3.5 w-3.5" />
            <input id="avatarUpload" type="file" accept="image/*" className="sr-only" />
          </label>
        </div>
        <div>
          <p className="font-semibold text-[#1E3A5F] text-lg">{profile.full_name}</p>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          {profile.college_name && <p className="text-xs text-muted-foreground">{profile.college_name}</p>}
        </div>
      </div>

      <Separator />

      {/* Edit toggle */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#1E3A5F]">Profile Details</h3>
        {!editMode ? (
          <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
            <Edit2 className="h-4 w-4 mr-1.5" /> Edit Profile
          </Button>
        ) : (
          <Button variant="ghost" size="sm" onClick={() => { setEditMode(false); setSaveError(null) }}>
            <X className="h-4 w-4 mr-1.5" /> Cancel
          </Button>
        )}
      </div>

      {saveError && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /><span>{saveError}</span>
        </div>
      )}

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="pf-name">Full Name *</Label>
              <Input id="pf-name" {...register('full_name')} className={cn(errors.full_name && 'border-red-400')} />
              {errors.full_name && <p className="text-xs text-red-500">{errors.full_name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pf-phone">Mobile Number</Label>
              <Input id="pf-phone" type="tel" maxLength={10} placeholder="10-digit number" {...register('phone')} className={cn(errors.phone && 'border-red-400')} />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="pf-bio">Bio / About</Label>
              <textarea id="pf-bio" rows={3} placeholder="Brief introduction about yourself..."
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...register('bio')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pf-college">College Name</Label>
              <Input id="pf-college" {...register('college_name')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pf-branch">Branch</Label>
              <Input id="pf-branch" {...register('branch')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pf-gradyear">Graduation Year</Label>
              <Input id="pf-gradyear" type="number" {...register('graduation_year')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pf-skills">Skills (comma-separated)</Label>
              <Input id="pf-skills" placeholder="React, Python, Excel" {...register('skills_raw')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pf-linkedin">LinkedIn URL</Label>
              <Input id="pf-linkedin" type="url" placeholder="https://linkedin.com/in/..." {...register('linkedin_url')} className={cn(errors.linkedin_url && 'border-red-400')} />
              {errors.linkedin_url && <p className="text-xs text-red-500">{errors.linkedin_url.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pf-github">GitHub / Portfolio URL</Label>
              <Input id="pf-github" type="url" placeholder="https://github.com/..." {...register('github_url')} className={cn(errors.github_url && 'border-red-400')} />
              {errors.github_url && <p className="text-xs text-red-500">{errors.github_url.message}</p>}
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-[#0D9488] hover:bg-[#0b8278] text-white" disabled={isSubmitting || isLoading}>
              {isSubmitting || isLoading
                ? <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Saving…</span>
                : <><Save className="h-4 w-4 mr-1.5" />Save Changes</>}
            </Button>
          </div>
        </form>
      ) : (
        <dl className="rounded-xl border bg-white p-4">
          <SectionRow label="Full Name" value={profile.full_name} />
          <SectionRow label="Email" value={profile.email} />
          <SectionRow label="Mobile" value={profile.phone} />
          <SectionRow label="Bio" value={profile.bio} />
          <SectionRow label="College" value={profile.college_name} />
          <SectionRow label="Branch" value={profile.branch} />
          <SectionRow label="Graduation Year" value={profile.graduation_year} />
          <SectionRow label="Skills" value={profile.skills?.join(', ')} />
          <SectionRow label="LinkedIn" value={profile.linkedin_url} />
          <SectionRow label="GitHub" value={profile.github_url} />
        </dl>
      )}

      <Separator />

      {/* Resume */}
      <div>
        <h3 className="font-semibold text-[#1E3A5F] mb-3">Resume</h3>
        {profile.resume_filename ? (
          <div className="flex items-center gap-3 rounded-lg border border-dashed p-4">
            <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 font-bold text-xs">PDF</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile.resume_filename}</p>
              <p className="text-xs text-muted-foreground">Current resume on file</p>
            </div>
            <label htmlFor="resumeUpload" className="cursor-pointer">
              <Button type="button" variant="outline" size="sm" asChild>
                <span>{resumeLoading ? 'Uploading…' : 'Replace'}</span>
              </Button>
              <input id="resumeUpload" type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={handleResumeUpload} disabled={resumeLoading} />
            </label>
          </div>
        ) : (
          <label htmlFor="resumeUploadNew" className="flex flex-col items-center justify-center rounded-lg border border-dashed border-input p-8 cursor-pointer hover:border-[#0D9488] hover:bg-teal-50/30 transition-colors">
            <Plus className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-muted-foreground">Upload your resume</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX — max 5 MB</p>
            <input id="resumeUploadNew" type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={handleResumeUpload} disabled={resumeLoading} />
          </label>
        )}
        {resumeError && <p className="text-xs text-red-500 mt-2">{resumeError}</p>}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Tab: Settings
// ─────────────────────────────────────────────────────────────
function SettingsTab() {
  const { signOut } = useAuth()
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwSuccess, setPwSuccess] = useState(false)
  const [pwError, setPwError] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteInput, setDeleteInput] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ChangePwForm>({
    resolver: zodResolver(changePwSchema),
  })

  const onChangePw = async (data: ChangePwForm) => {
    setPwError(null)
    setPwSuccess(false)
    try {
      const { error } = await authService.updatePassword(data.newPassword)
      if (error) throw error
      setPwSuccess(true)
      reset()
    } catch (err: unknown) {
      setPwError(err instanceof Error ? err.message : 'Failed to update password')
    }
  }

  const handleDelete = async () => {
    if (deleteInput !== 'DELETE') return
    setDeleteLoading(true)
    setDeleteError(null)
    try {
      await studentsService.deleteAccount()
      await signOut()
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete account')
      setDeleteLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-xl">
      {/* Change Password */}
      <div className="rounded-xl border bg-white p-6">
        <h3 className="font-semibold text-[#1E3A5F] mb-4 flex items-center gap-2">
          <Lock className="h-4 w-4" /> Change Password
        </h3>
        {pwSuccess && (
          <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-2.5 mb-4">
            <CheckCircle2 className="h-4 w-4" /> Password updated successfully!
          </div>
        )}
        {pwError && (
          <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5 mb-4">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /><span>{pwError}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(onChangePw)} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input id="newPassword" type={showPw ? 'text' : 'password'} placeholder="Min 8 chars, letter + number"
                className={cn('pr-10', errors.newPassword && 'border-red-400')}
                {...register('newPassword')} />
              <button type="button" onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Toggle">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input id="confirmPassword" type={showConfirm ? 'text' : 'password'} placeholder="Re-enter new password"
                className={cn('pr-10', errors.confirmPassword && 'border-red-400')}
                {...register('confirmPassword')} />
              <button type="button" onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Toggle">
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>
          <Button type="submit" className="bg-[#1E3A5F] hover:bg-[#16304f] text-white" disabled={isSubmitting}>
            {isSubmitting
              ? <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Updating…</span>
              : 'Update Password'}
          </Button>
        </form>
      </div>

      {/* Email Preferences (placeholder) */}
      <div className="rounded-xl border bg-white p-6">
        <h3 className="font-semibold text-[#1E3A5F] mb-4">Email Preferences</h3>
        <div className="space-y-3">
          {[
            'New internship recommendations',
            'Application status updates',
            'Platform announcements',
            'Weekly digest',
          ].map((label) => (
            <label key={label} className="flex items-center justify-between">
              <span className="text-sm">{label}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#0D9488]" />
            </label>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Email preference management coming soon.</p>
      </div>

      {/* Delete Account */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
          <Trash2 className="h-4 w-4" /> Delete Account
        </h3>
        <p className="text-sm text-red-600 mb-4">
          Permanently deletes your account and all associated data. This action cannot be undone.
        </p>
        <Button variant="outline" className="border-red-400 text-red-700 hover:bg-red-100" onClick={() => setDeleteOpen(true)}>
          Delete My Account
        </Button>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteOpen} onOpenChange={(o) => { setDeleteOpen(o); setDeleteInput(''); setDeleteError(null) }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-700">Delete Account</DialogTitle>
            <DialogDescription>
              This will permanently delete your account and all data. Type{' '}
              <span className="font-mono font-bold">DELETE</span> to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {deleteError && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /><span>{deleteError}</span>
              </div>
            )}
            <Input
              placeholder='Type "DELETE" to confirm'
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
            />
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteOpen(false)}>Cancel</Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                disabled={deleteInput !== 'DELETE' || deleteLoading}
                onClick={handleDelete}
              >
                {deleteLoading
                  ? <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Deleting…</span>
                  : 'Delete Forever'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function StudentDashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = (searchParams.get('tab') as TabId) || 'overview'
  const { profile, fetchProfile } = useProfile()
  const [applications, setApplications] = useState<Application[]>([])
  const [loadingApps, setLoadingApps] = useState(true)

  const fetchApps = useCallback(async () => {
    setLoadingApps(true)
    try {
      const data = await studentsService.getMyApplications()
      setApplications(data ?? [])
    } catch {
      // ignore
    } finally {
      setLoadingApps(false)
    }
  }, [])

  useEffect(() => {
    fetchApps()
  }, [fetchApps])

  return (
    <DashboardLayout>
      <PageTitle title="Student Dashboard" />
      <div className="space-y-6">
        <Tabs
          value={activeTab}
          onValueChange={(val) => setSearchParams({ tab: val })}
          className="space-y-6"
        >
          <TabsList className="bg-white border p-1 rounded-xl flex flex-wrap gap-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 text-xs sm:text-sm">
              <LayoutDashboard className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2 text-xs sm:text-sm">
              <Briefcase className="h-4 w-4" /> Applications
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2 text-xs sm:text-sm">
              <Bookmark className="h-4 w-4" /> Saved
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 text-xs sm:text-sm">
              <User className="h-4 w-4" /> My Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 text-xs sm:text-sm">
              <Settings className="h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab profile={profile} applications={applications} loadingApps={loadingApps} />
          </TabsContent>
          <TabsContent value="applications">
            <ApplicationsTab applications={applications} loading={loadingApps} />
          </TabsContent>
          <TabsContent value="saved">
            <SavedTab />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileTab profile={profile} onSaved={fetchProfile} />
          </TabsContent>
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

