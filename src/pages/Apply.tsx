import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Award, Laptop, Clock, Briefcase, FileText, PhoneCall, MessageCircle, AlertCircle, Mail, KeyRound, Check } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/useToast'
import api from '@/services/api'
import { authService } from '@/services/auth'

const DOMAIN_OPTIONS = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Web Development',
  'Android App Development',
  'Python Programming',
  'Java Programming',
  'C++ Programming',
  'C Programming',
  'Blockchain Development',
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Data Analytics',
  'Power BI',
  'Cloud Computing',
  'AWS Cloud',
  'DevOps',
  'Cyber Security',
  'UI/UX Design',
  'Graphic Designing',
  'Civil Engineering & Structural Design',
  'Mechanical Design & Simulation',
  'AutoCAD',
  'MATLAB',
  'Electric Vehicle Technology (EV)',
  'VLSI Design',
  'Embedded Systems & IoT',
  'Embedded Systems with Arduino',
  'IoT Fundamentals',
  'PLC & SCADA',
  'PCB Design',
]

const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Post Graduate / Masters',
  'Recent Graduate / Fresher',
]

const DURATION_OPTIONS = [
  { value: '4 Weeks', label: '4 Weeks (1 Month) - Fast Track' },
  { value: '8 Weeks', label: '8 Weeks (2 Months) - Recommended' },
  { value: '12 Weeks', label: '12 Weeks (3 Months) - Advanced' },
  { value: '16 Weeks', label: '16 Weeks (4 Months) - Capstone' },
]

export default function Apply() {
  const [searchParams] = useSearchParams()
  const { toast } = useToast()

  const queryDomain = searchParams.get('domain') || searchParams.get('title') || ''
  const queryInternshipId = searchParams.get('internshipId') || ''

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    college_name: '',
    branch: '',
    year_of_study: '3rd Year',
    internship_title: 'Web Development',
    duration: '4 Weeks',
    linkedin_url: '',
    github_url: '',
    resume_url: '',
    message: '',
    is_urgent: false,
    urgent_reason: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null)

  // Supabase Auth Email OTP State
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [otpCooldown, setOtpCooldown] = useState(0)
  const [otpError, setOtpError] = useState<string | null>(null)

  // OTP Countdown timer
  useEffect(() => {
    let timer: any = null
    if (otpCooldown > 0) {
      timer = setInterval(() => setOtpCooldown((prev) => prev - 1), 1000)
    }
    return () => clearInterval(timer)
  }, [otpCooldown])

  // Handle sending OTP via Supabase Auth
  const handleSendEmailOtp = async () => {
    const cleanEmail = formData.email.trim().toLowerCase()
    if (!cleanEmail || !cleanEmail.includes('@')) {
      toast({
        title: 'Valid email required',
        description: 'Please enter a valid email address before requesting an OTP.',
        variant: 'destructive',
      })
      return
    }

    setIsSendingOtp(true)
    setOtpError(null)

    try {
      const { error } = await authService.sendOtp(cleanEmail)
      if (error) {
        console.error('Supabase OTP send error:', error)
        setOtpError(error.message || 'Failed to send OTP. Please check your email or try again.')
        toast({
          title: 'Failed to Send OTP',
          description: error.message || 'Please verify your email address and try again.',
          variant: 'destructive',
        })
      } else {
        setIsOtpSent(true)
        setOtpCooldown(60)
        setOtp('')
        toast({
          title: 'OTP Dispatched!',
          description: `A 6-digit verification code was sent to ${cleanEmail}.`,
        })
      }
    } catch (err: any) {
      console.error('Supabase OTP unexpected error:', err)
      setOtpError(err?.message || 'Failed to send OTP.')
      toast({
        title: 'Error',
        description: 'Unexpected error sending OTP. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSendingOtp(false)
    }
  }

  // Handle verifying OTP via Supabase Auth
  const handleVerifyEmailOtp = async () => {
    const cleanEmail = formData.email.trim().toLowerCase()
    const cleanToken = otp.trim()

    if (!cleanToken || cleanToken.length < 6) {
      setOtpError('Please enter the 6-digit code received on your email.')
      return
    }

    setIsVerifyingOtp(true)
    setOtpError(null)

    try {
      const { data, error } = await authService.verifyOtp(cleanEmail, cleanToken)
      if (error) {
        console.error('Supabase OTP verify error:', error)
        setOtpError(error.message || 'Invalid or expired OTP code.')
        toast({
          title: 'Verification Failed',
          description: error.message || 'Invalid or expired OTP. Please try again.',
          variant: 'destructive',
        })
      } else {
        setIsEmailVerified(true)
        setOtpError(null)
        toast({
          title: 'Email Verified Successfully!',
          description: 'Your email has been authenticated with Supabase.',
        })
      }
    } catch (err: any) {
      console.error('Supabase verify error:', err)
      setOtpError(err?.message || 'Verification failed.')
      toast({
        title: 'Verification Failed',
        description: 'Invalid or expired code. Please retry.',
        variant: 'destructive',
      })
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  // Auto-match queryDomain to options
  useEffect(() => {
    if (queryDomain) {
      const match = DOMAIN_OPTIONS.find((d) =>
        d.toLowerCase().includes(queryDomain.toLowerCase()) ||
        queryDomain.toLowerCase().includes(d.toLowerCase())
      )
      if (match) {
        setFormData((prev) => ({ ...prev, internship_title: match }))
      } else {
        setFormData((prev) => ({ ...prev, internship_title: queryDomain }))
      }
    }
  }, [queryDomain])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // If user changes email after requesting or verifying OTP, reset verification
    if (name === 'email') {
      setIsOtpSent(false)
      setIsEmailVerified(false)
      setOtp('')
      setOtpError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.full_name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: 'Required fields missing',
        description: 'Please fill in your name, email, and mobile number.',
        variant: 'destructive',
      })
      return
    }

    if (!isEmailVerified) {
      toast({
        title: 'Email Verification Required',
        description: 'Please verify your email address by entering the OTP sent to your inbox before submitting.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      // If student marked urgent or added comments, prepend to message
      let fullMessage = formData.message.trim()
      if (formData.is_urgent) {
        const urgentPrefix = `[URGENT CERTIFICATION REQUEST] Reason: ${formData.urgent_reason.trim() || 'Urgent academic/college submission'}`
        fullMessage = fullMessage ? `${urgentPrefix} | Notes: ${fullMessage}` : urgentPrefix
      }

      const payload = {
        ...formData,
        message: fullMessage || null,
        internship_id: queryInternshipId ? queryInternshipId : null,
      }

      await api.post('/applications/apply-direct', payload)

      setSubmittedData(formData)
      setIsSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      toast({
        title: formData.is_urgent ? 'Urgent Application Prioritized!' : 'Application Submitted!',
        description: formData.is_urgent
          ? 'Your urgent application and comment have been flagged for expedited processing.'
          : 'Your internship application has been recorded successfully.',
      })
    } catch (err: any) {
      console.error('Submission error:', err)
      const errorMsg = err?.response?.data?.message || 'Failed to submit application. Please try again.'
      toast({
        title: 'Submission Error',
        description: errorMsg,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-50/70 py-10 sm:py-14">
        <div className="container max-w-4xl">
          {/* Header Bar */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 px-3 py-1 mb-3 text-xs font-semibold gap-1 inline-flex">
              <Sparkles className="h-3.5 w-3.5" /> Geek Intern Virtual Internship Program
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Start Your Virtual Internship
            </h1>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              Gain real-world experience, build industry-standard portfolio projects, and earn a verifiable certificate with a Letter of Recommendation.
            </p>
          </div>

          {/* Success View */}
          {isSubmitted ? (
            <Card className="border-0 shadow-lg bg-white overflow-hidden text-center p-8 sm:p-12 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Application Received Successfully!
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto text-base mb-6">
                Congratulations <span className="font-semibold text-slate-900">{submittedData?.full_name}</span>! You have taken the first step toward advancing your tech career in <span className="font-semibold text-blue-600">{submittedData?.internship_title}</span>.
              </p>

              {/* What happens next box */}
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-6 text-left max-w-xl mx-auto mb-8">
                <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-blue-600" /> What Happens Next?
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                    <span><strong>Offer Letter & Task Kit:</strong> Our onboarding team will send your official offer letter and task guidelines to <strong>{submittedData?.email}</strong> within 24–48 hours.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                    <span><strong>Build & Push to GitHub:</strong> Work through project milestones at your own pace and submit your GitHub repository links for evaluation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                    <span><strong>Certification:</strong> Receive your verified digital certificate with QR code verification and performance-based Letter of Recommendation (LOR).</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/browse">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Explore Other Domains
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                    Return to Homepage
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form */}
              <div className="lg:col-span-8">
                <Card className="border border-slate-200 shadow-sm bg-white">
                  <CardHeader className="border-b border-slate-100 pb-5">
                    <CardTitle className="text-xl font-bold text-slate-900">
                      Applicant Information
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                      Fill out this quick form. No resume or sign-up is mandatory to get started.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Full Name */}
                      <div>
                        <Label htmlFor="full_name" className="text-slate-700 font-medium text-sm">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          placeholder="e.g. Rahul Sharma"
                          value={formData.full_name}
                          onChange={handleChange}
                          required
                          className="mt-1.5"
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
                              Email Address <span className="text-red-500">*</span>
                            </Label>
                            {isEmailVerified && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                <Check className="h-3 w-3" /> Verified
                              </span>
                            )}
                          </div>
                          
                          <div className="relative mt-1.5 flex gap-2">
                            <div className="relative flex-1">
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="e.g. rahul@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={isEmailVerified}
                                className={`pr-9 ${isEmailVerified ? 'bg-slate-50 border-emerald-400 text-slate-700' : ''}`}
                              />
                              <div className="absolute right-3 top-2.5 text-slate-400">
                                <Mail className="h-4 w-4" />
                              </div>
                            </div>
                            
                            {!isEmailVerified && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleSendEmailOtp}
                                disabled={isSendingOtp || otpCooldown > 0 || !formData.email.trim() || !formData.email.includes('@')}
                                className="h-10 px-3 text-xs font-semibold shrink-0 border-blue-200 hover:bg-blue-50 text-blue-700"
                              >
                                {isSendingOtp ? (
                                  <span className="flex items-center gap-1.5">
                                    <span className="h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                    Sending...
                                  </span>
                                ) : otpCooldown > 0 ? (
                                  `Resend in ${otpCooldown}s`
                                ) : isOtpSent ? (
                                  'Resend OTP'
                                ) : (
                                  'Get OTP'
                                )}
                              </Button>
                            )}

                            {isEmailVerified && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setIsEmailVerified(false)
                                  setIsOtpSent(false)
                                  setOtp('')
                                }}
                                className="h-10 px-2.5 text-xs text-slate-500 hover:text-slate-800"
                              >
                                Edit
                              </Button>
                            )}
                          </div>
                          
                          <p className="text-[11px] text-slate-500 mt-1">Offer letter will be sent here</p>

                          {/* OTP Verification Box */}
                          {isOtpSent && !isEmailVerified && (
                            <div className="mt-3 p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 animate-in fade-in slide-in-from-top-2 duration-200 space-y-2.5">
                              <div className="flex items-center justify-between text-xs text-blue-900 font-medium">
                                <span className="flex items-center gap-1.5">
                                  <KeyRound className="h-3.5 w-3.5 text-blue-600" />
                                  Enter Email OTP (Supabase Auth)
                                </span>
                                <span className="text-[11px] text-blue-700/80">Check your inbox/spam</span>
                              </div>

                              <div className="flex gap-2">
                                <Input
                                  type="text"
                                  inputMode="numeric"
                                  maxLength={6}
                                  placeholder="• • • • • •"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                  className="h-9 bg-white text-center font-mono text-base tracking-widest font-bold border-blue-300 focus:border-blue-600"
                                  disabled={isVerifyingOtp}
                                  autoFocus
                                />
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={handleVerifyEmailOtp}
                                  disabled={isVerifyingOtp || otp.trim().length < 6}
                                  className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shrink-0"
                                >
                                  {isVerifyingOtp ? (
                                    <span className="flex items-center gap-1.5">
                                      <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                      Verifying...
                                    </span>
                                  ) : (
                                    'Verify OTP'
                                  )}
                                </Button>
                              </div>

                              {otpError && (
                                <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                                  <AlertCircle className="h-3 w-3 shrink-0" />
                                  {otpError}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-slate-700 font-medium text-sm">
                            Contact / Mobile Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="e.g. 9876543210"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="mt-1.5"
                          />
                          <p className="text-[11px] text-slate-500 mt-1">For program updates & verification</p>
                        </div>
                      </div>

                      {/* College & Branch */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="college_name" className="text-slate-700 font-medium text-sm">
                            College / University Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="college_name"
                            name="college_name"
                            placeholder="e.g. Delhi Technological University"
                            value={formData.college_name}
                            onChange={handleChange}
                            required
                            className="mt-1.5"
                          />
                        </div>

                        <div>
                          <Label htmlFor="branch" className="text-slate-700 font-medium text-sm">
                            Branch / Department <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="branch"
                            name="branch"
                            placeholder="e.g. Computer Science / BCA / IT"
                            value={formData.branch}
                            onChange={handleChange}
                            required
                            className="mt-1.5"
                          />
                        </div>
                      </div>

                      {/* Year of Study & Domain Selection */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-700 font-medium text-sm">
                            Current Year of Study <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.year_of_study}
                            onValueChange={(val) => setFormData((prev) => ({ ...prev, year_of_study: val }))}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select Year" />
                            </SelectTrigger>
                            <SelectContent>
                              {YEAR_OPTIONS.map((yr) => (
                                <SelectItem key={yr} value={yr}>
                                  {yr}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-slate-700 font-medium text-sm">
                            Internship Track / Domain <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.internship_title}
                            onValueChange={(val) => setFormData((prev) => ({ ...prev, internship_title: val }))}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select Domain" />
                            </SelectTrigger>
                            <SelectContent className="max-h-72">
                              {DOMAIN_OPTIONS.map((dom) => (
                                <SelectItem key={dom} value={dom}>
                                  {dom}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Duration */}
                      <div>
                        <Label className="text-slate-700 font-medium text-sm">
                          Preferred Internship Duration <span className="text-red-500">*</span>
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1.5">
                          {DURATION_OPTIONS.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, duration: opt.value }))}
                              className={`p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                                formData.duration === opt.value
                                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-semibold shadow-xs'
                                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {formData.duration === opt.value && (
                                <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* LinkedIn & GitHub */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="linkedin_url" className="text-slate-700 font-medium text-sm">
                            LinkedIn Profile URL <span className="text-slate-400 font-normal">(Optional)</span>
                          </Label>
                          <Input
                            id="linkedin_url"
                            name="linkedin_url"
                            type="url"
                            placeholder="https://linkedin.com/in/username"
                            value={formData.linkedin_url}
                            onChange={handleChange}
                            className="mt-1.5"
                          />
                        </div>

                        <div>
                          <Label htmlFor="github_url" className="text-slate-700 font-medium text-sm">
                            GitHub Profile URL <span className="text-slate-400 font-normal">(Optional)</span>
                          </Label>
                          <Input
                            id="github_url"
                            name="github_url"
                            type="url"
                            placeholder="https://github.com/username"
                            value={formData.github_url}
                            onChange={handleChange}
                            className="mt-1.5"
                          />
                        </div>
                      </div>

                      {/* Resume / Drive link */}
                      <div>
                        <Label htmlFor="resume_url" className="text-slate-700 font-medium text-sm">
                          Resume / Portfolio / Google Drive Link <span className="text-slate-400 font-normal">(Optional)</span>
                        </Label>
                        <Input
                          id="resume_url"
                          name="resume_url"
                          type="url"
                          placeholder="https://drive.google.com/... or portfolio link"
                          value={formData.resume_url}
                          onChange={handleChange}
                          className="mt-1.5"
                        />
                      </div>

                      {/* Message / Goals */}
                      <div>
                        <Label htmlFor="message" className="text-slate-700 font-medium text-sm">
                          Learning Goals / Notes <span className="text-slate-400 font-normal">(Optional)</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={3}
                          placeholder="Tell us about your background or what you hope to achieve during this virtual internship..."
                          value={formData.message}
                          onChange={handleChange}
                          className="mt-1.5"
                        />
                      </div>

                      {/* ------------------------------------------------------------- */}
                      {/* URGENT CERTIFICATION & FAST-TRACK APPLICATION BOX              */}
                      {/* ------------------------------------------------------------- */}
                      <div className="rounded-xl border-2 border-amber-500 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/60 p-4 shadow-sm border-dashed">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 rounded-xl bg-amber-500 text-white shadow-sm shrink-0 mt-0.5 animate-pulse">
                            <AlertCircle className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-extrabold text-amber-950 uppercase tracking-wider">
                                Urgent Certification Request
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-xs">
                                FAST TRACK
                              </span>
                            </div>
                            <p className="text-xs text-amber-900 mt-0.5 font-medium">
                              Need your verified certificate expedited for college submissions, semester credits, or imminent job interviews?
                            </p>
                          </div>
                        </div>

                        {/* Interactive Urgent Certification Checkbox */}
                        <div className="bg-white/80 border border-amber-200 rounded-lg p-3 space-y-2.5">
                          <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              name="is_urgent"
                              checked={formData.is_urgent}
                              onChange={(e) => setFormData((prev) => ({ ...prev, is_urgent: e.target.checked }))}
                              className="h-4 w-4 rounded border-amber-400 text-amber-600 focus:ring-amber-500 cursor-pointer"
                            />
                            <span className="text-xs font-bold text-slate-800">
                              Mark as Priority / Apply for Urgent Certification
                            </span>
                          </label>

                          {formData.is_urgent && (
                            <div className="pt-2 border-t border-amber-100 animate-in fade-in duration-200">
                              <Label htmlFor="urgent_reason" className="text-[11px] font-semibold text-amber-900 block mb-1">
                                Urgent Reason / Student Comment <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="urgent_reason"
                                name="urgent_reason"
                                placeholder="e.g. Urgent college submission by Friday, need fast-track evaluation..."
                                value={formData.urgent_reason}
                                onChange={handleChange}
                                className="h-9 text-xs border-amber-300 focus:border-amber-500 focus:ring-amber-500 bg-white"
                                required={formData.is_urgent}
                              />
                              <p className="text-[10px] text-amber-800/80 mt-1">
                                Mentors will review your urgency note and expedite task assignments and certificate generation.
                              </p>
                            </div>
                          )}

                          {/* 2-Line Urgent Terms & Conditions */}
                          <div className="pt-2 border-t border-amber-200/70 text-[11px] text-amber-950/90 leading-snug">
                            <p className="font-semibold text-amber-900">
                              * Terms & Conditions: Only select this if you genuinely have an impending college submission or job deadline.
                            </p>
                            <p className="text-amber-800/85 mt-0.5">
                              Please do not mark urgent for routine applications so our evaluation team can prioritize critical student cases.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* ------------------------------------------------------------- */}

                      {/* Submit CTA */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting || !isEmailVerified}
                          className={`w-full text-white font-semibold py-3 h-12 text-base rounded-lg shadow-md transition-all flex items-center justify-center gap-2 ${
                            !isEmailVerified
                              ? 'bg-slate-400 hover:bg-slate-500 cursor-not-allowed opacity-90'
                              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                          }`}
                        >
                          {isSubmitting ? (
                            <span>Submitting Application...</span>
                          ) : !isEmailVerified ? (
                            <span className="flex items-center gap-2 text-sm sm:text-base">
                              <KeyRound className="h-4 w-4" />
                              Verify Email with OTP to Proceed
                            </span>
                          ) : (
                            <>
                              <span>Submit Application & Get Offer Letter</span>
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                        <p className="text-center text-xs text-slate-500 mt-2.5">
                          {!isEmailVerified ? (
                            <span className="text-amber-700 font-medium">
                              * Click "Get OTP" next to your email address and enter the 6-digit code received before submitting.
                            </span>
                          ) : (
                            'By submitting, you agree to receive internship updates, task kits, and offer letters from Geek Intern.'
                          )}
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Perks & Program Highlights */}
              <div className="lg:col-span-4 space-y-5">
                <Card className="border border-blue-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-5 shadow-xs">
                  <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" /> Program Perks
                  </h3>
                  <ul className="space-y-3 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Verifiable Certificate:</strong> QR-coded digital certificate shareable on LinkedIn and resumes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Letter of Recommendation (LOR):</strong> Awarded to outstanding performers based on submission quality.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Laptop className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>100% Virtual & Self-Paced:</strong> Work on tasks at your convenience without conflicting with college schedules.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Briefcase className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>GitHub Portfolio:</strong> Build 3-4 real project deliverables to showcase directly to tech recruiters.</span>
                    </li>
                  </ul>
                </Card>

                <Card className="border border-slate-200 bg-white p-5 shadow-xs">
                  <h3 className="font-bold text-slate-900 text-base mb-3">
                    Frequently Asked
                  </h3>
                  <div className="space-y-3 text-xs text-slate-600">
                    <div>
                      <p className="font-semibold text-slate-800">When will I get my offer letter?</p>
                      <p className="mt-0.5">Offer letters and task guidelines are sent via email within 24 to 48 hours of submitting this form.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Is this internship completely online?</p>
                      <p className="mt-0.5">Yes! All Geek Intern internships are 100% remote. You can complete tasks from anywhere in India.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Are beginners eligible?</p>
                      <p className="mt-0.5">Yes, projects range from beginner-friendly tasks to advanced modules with step-by-step briefs.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
