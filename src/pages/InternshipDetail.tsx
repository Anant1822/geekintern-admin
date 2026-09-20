import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Clock, IndianRupee, Calendar, Users,
  BadgeCheck, Wifi, Building2, Monitor, Share2, Bookmark, PhoneCall, MessageCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { Skeleton } from '@/components/ui/skeleton'
import { useInternship } from '@/hooks/useInternships'
import { usePayment } from '@/hooks/usePayment'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/components/ui/toaster'
import {
  formatCurrency, formatDate, formatDuration,
  getWorkModeLabel, isDeadlinePassed, cn
} from '@/lib/utils'

export default function InternshipDetail() {
  const { id } = useParams<{ id: string }>()
  const { internship, isLoading, error } = useInternship(id ?? '')
  const { isAuthenticated } = useAuth()
  const { isProcessing, initiatePayment } = usePayment()
  const navigate = useNavigate()

  const handleApply = () => {
    if (!internship) return
    navigate(`/apply?domain=${encodeURIComponent(internship.title)}&internshipId=${internship.id}`)
  }

  const deadlinePassed = isDeadlinePassed(internship?.application_deadline)

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="container py-8 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-10 w-3/4 mb-3" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
          </div>
          <Skeleton className="h-40 mb-4" />
          <Skeleton className="h-24" />
        </div>
      </PublicLayout>
    )
  }

  if (error || !internship) {
    return (
      <PublicLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-3">Internship Not Found</h1>
          <p className="text-muted-foreground mb-6">This internship may have been removed or does not exist.</p>
          <Button asChild><Link to="/browse">Browse Internships</Link></Button>
        </div>
      </PublicLayout>
    )
  }

  const workModeIcon = internship.work_mode === 'remote' ? Wifi :
    internship.work_mode === 'onsite' ? Building2 : Monitor

  return (
    <PublicLayout>
      <PageTitle title={internship.title} />

      <div className="container py-8 max-w-5xl">
        {/* Breadcrumb */}
        <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2 text-muted-foreground">
          <Link to="/browse"><ArrowLeft className="mr-1.5 h-4 w-4" />Back to Browse</Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title block */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {internship.is_verified && (
                  <div className="flex items-center gap-1 text-brand-teal text-sm font-medium">
                    <BadgeCheck className="h-4 w-4" />
                    Verified
                  </div>
                )}
                {internship.is_featured && <Badge variant="amber">Featured</Badge>}
                {internship.category && <Badge variant="teal">{internship.category.name}</Badge>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{internship.title}</h1>
              <p className="text-lg text-muted-foreground">{internship.provider_name}</p>
            </div>

            {/* Quick facts grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: workModeIcon, label: 'Mode', value: getWorkModeLabel(internship.work_mode) },
                { icon: Clock, label: 'Duration', value: formatDuration(internship.duration_weeks) },
                { icon: IndianRupee, label: 'Stipend', value: internship.is_paid && internship.stipend_amount ? formatCurrency(internship.stipend_amount) + '/mo' : 'Unpaid' },
                { icon: MapPin, label: 'Location', value: internship.location ?? 'Flexible' },
              ].map(({ icon: Icon, label, value }) => (
                <Card key={label}>
                  <CardContent className="p-3 flex flex-col items-center text-center">
                    <Icon className="h-4 w-4 text-muted-foreground mb-1" />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
                    <p className="text-sm font-semibold">{value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold mb-3">About This Internship</h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">{internship.description}</p>
            </div>

            {internship.responsibilities?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Responsibilities</h2>
                <ul className="space-y-2">
                  {internship.responsibilities.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/80">
                      <span className="text-brand-teal mt-0.5">&#10003;</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {internship.requirements?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Requirements</h2>
                <ul className="space-y-2">
                  {internship.requirements.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/80">
                      <span className="text-brand-navy mt-0.5">&#8226;</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {((internship.required_skills?.length ?? 0) > 0 || (internship.skills_required?.length ?? 0) > 0) && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Skills Required</h2>
                <div className="flex flex-wrap gap-2">
                  {(internship.required_skills || internship.skills_required || []).map((skill: string) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="sticky top-24">
              <CardContent className="p-5 space-y-4">
                {/* Deadline */}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Application Deadline</p>
                    <p className={cn('text-sm font-semibold', deadlinePassed && 'text-red-500')}>
                      {deadlinePassed ? 'Deadline Passed' : formatDate(internship.application_deadline)}
                    </p>
                  </div>
                </div>

                {/* Seats */}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Seats Available</p>
                    <p className="text-sm font-semibold">
                      {internship.seats_total
                        ? `${internship.seats_total - (internship.seats_filled ?? 0)} / ${internship.seats_total}`
                        : (internship.max_applicants ? `${internship.max_applicants} max` : 'Open')}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Program Enrollment Info */}
                <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-3.5">
                  <div className="flex items-center gap-2 mb-1 text-blue-700 font-semibold text-xs uppercase tracking-wider">
                    <BadgeCheck className="w-4 h-4" />
                    <span>Open Enrollment</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">Virtual Internship Track</p>
                  <p className="text-xs text-slate-500 mt-1">Self-paced project kit with verified CID credential</p>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* URGENT ADMISSION & VERIFICATION NOTICE (ATTENTION COLOR)      */}
                {/* ------------------------------------------------------------- */}
                <div className="rounded-xl border-2 border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 p-3.5 shadow-xs border-dashed">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <PhoneCall className="h-4 w-4 text-amber-600 animate-pulse" />
                      <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                        Urgent Admission Notice
                      </span>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded-full">
                      URGENT
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-900 mb-1 font-medium">
                    Limited seats available for current cohort. Applications are prioritized upon submission.
                  </p>

                  {/* 
                    // Urgent WhatsApp Message Link (Commented out as requested):
                    // <a
                    //   href="https://wa.me/919876543210?text=Hi%20GeekIntern%2C%20I%20have%20an%20urgent%20query%20about%20the%20internship%20admission."
                    //   target="_blank"
                    //   rel="noopener noreferrer"
                    // >
                    //   <Button type="button" size="sm" className="w-full bg-emerald-600 text-white text-xs font-bold">
                    //     Urgent Contact
                    //   </Button>
                    // </a>
                  */}
                </div>
                {/* ------------------------------------------------------------- */}

                {deadlinePassed ? (
                  <Alert variant="warning">
                    <AlertDescription className="text-sm">The application deadline for this internship has passed.</AlertDescription>
                  </Alert>
                ) : internship.has_applied ? (
                  <Alert variant="success">
                    <AlertDescription className="text-sm">You have already applied for this internship.</AlertDescription>
                  </Alert>
                ) : (
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
                    size="lg"
                    onClick={handleApply}
                  >
                    Start Internship (Apply Now)
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Bookmark className="mr-1.5 h-4 w-4" />Save
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="mr-1.5 h-4 w-4" />Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
