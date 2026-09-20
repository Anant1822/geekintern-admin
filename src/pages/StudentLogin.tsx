import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Award,
  Search,
  CheckCircle2,
  Clock,
  Download,
  Printer,
  ExternalLink,
  ShieldCheck,
  Building,
  GraduationCap,
  Calendar,
  AlertCircle,
  FileCheck,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  BookOpen,
  ArrowLeft,
  Share2,
  Send,
} from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import PageTitle from '@/components/common/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import api from '@/services/api'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/auth.store'

interface DirectApplication {
  id: string
  full_name: string
  email: string
  phone: string
  college_name: string
  branch: string
  internship_title: string
  duration: string
  status: string
  created_at: string
}

interface Certificate {
  id: string
  certificate_id: string
  student_name: string
  domain: string
  duration: string
  issue_date: string
  grade: string
  status: string
  image_url?: string | null
}

interface OfferLetter {
  id: string
  letter_id: string
  student_name: string
  email: string
  domain: string
  duration: string
  start_date: string
  stipend: string
  status: string
  image_url?: string | null
  uploaded_at?: string | null
}

interface PortalData {
  student: {
    name: string
    email: string
    phone: string
    college: string
    branch: string
  }
  applications: DirectApplication[]
  certificates: Certificate[]
  offer_letters?: OfferLetter[]
}

export default function StudentLogin() {
  const [searchParams] = useSearchParams()
  const initialIdentifier = searchParams.get('email') || searchParams.get('id') || ''

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)
  const [devHint, setDevHint] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [portalData, setPortalData] = useState<PortalData | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'certificates' | 'offer_letters' | 'applications'>('certificates')
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const [selectedOfferLetter, setSelectedOfferLetter] = useState<OfferLetter | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const certPrintRef = useRef<HTMLDivElement>(null)

  const { user: authUser, signOut: authSignOut } = useAuth()
  const setAuthUser = useAuthStore((s) => s.setUser)
  const setAuthAdmin = useAuthStore((s) => s.setAdmin)

  // Auto-populate email if passed in query param
  useEffect(() => {
    if (initialIdentifier && !email) {
      setEmail(initialIdentifier)
    }
  }, [initialIdentifier])

  // Helper to load student records from backend
  const loadPortalDataForUser = async (userEmail: string) => {
    try {
      const res = await api.post('/certificates/portal-login', { identifier: userEmail })
      if (res.data?.success && res.data?.data) {
        const data: PortalData = res.data.data
        setPortalData(data)
        if (data.certificates && data.certificates.length > 0) {
          setSelectedCert(data.certificates[0])
          setActiveTab('certificates')
        } else if (data.offer_letters && data.offer_letters.length > 0) {
          setSelectedOfferLetter(data.offer_letters[0])
          setActiveTab('offer_letters')
        } else {
          setActiveTab('applications')
        }
        if (data.offer_letters && data.offer_letters.length > 0) {
          setSelectedOfferLetter(data.offer_letters[0])
        }
        return true
      }
    } catch (err: any) {
      console.warn('Could not fetch portal data for email:', err?.message)
    }
    return false
  }

  // If already logged into Supabase Auth and no portal data loaded, load user's data
  useEffect(() => {
    if (authUser?.email && !portalData) {
      loadPortalDataForUser(authUser.email)
    }
  }, [authUser?.email])

  // Countdown timer for resending OTP
  useEffect(() => {
    let interval: any = null
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [otpTimer])

  // Step 1: Request OTP to Gmail
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid registered Gmail / Email address.')
      return
    }

    setIsLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      const res = await api.post('/certificates/send-otp', { email: cleanEmail })
      if (res.data?.success) {
        setOtpSent(true)
        setOtpTimer(60)
        setSuccessMsg(`One-Time Password (OTP) dispatched to ${cleanEmail}. Valid for 10 minutes.`)
        if (res.data.data?.devHint) {
          setDevHint(res.data.data.devHint)
        }
      }
    } catch (err: any) {
      console.error('Send OTP error:', err)
      const msg =
        err?.response?.data?.message ||
        'No student application found matching this email. Please check your registered email.'
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
    }
  }

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanEmail = email.trim().toLowerCase()
    const cleanOtp = otp.trim()

    if (!cleanOtp || cleanOtp.length < 4) {
      setErrorMsg('Please enter the verification code sent to your email.')
      return
    }

    setIsLoading(true)
    setErrorMsg(null)

    try {
      const res = await api.post('/certificates/verify-otp', { email: cleanEmail, otp: cleanOtp })
      if (res.data?.success && res.data?.data) {
        const data: PortalData = res.data.data
        setPortalData(data)
        if (data.certificates && data.certificates.length > 0) {
          setSelectedCert(data.certificates[0])
          setActiveTab('certificates')
        } else if (data.offer_letters && data.offer_letters.length > 0) {
          setSelectedOfferLetter(data.offer_letters[0])
          setActiveTab('offer_letters')
        } else {
          setActiveTab('applications')
        }
        if (data.offer_letters && data.offer_letters.length > 0) {
          setSelectedOfferLetter(data.offer_letters[0])
        }
      }
    } catch (err: any) {
      console.error('Verify OTP error:', err)
      setErrorMsg(err?.response?.data?.message || 'Invalid or expired OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }


  const handlePrint = () => {
    window.print()
  }

  const handleShare = (certId: string) => {
    const url = `${window.location.origin}/verify?id=${encodeURIComponent(certId)}`
    navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white font-medium">Completed & Certified</Badge>
      case 'selected':
        return <Badge className="bg-blue-600 hover:bg-blue-600 text-white font-medium">Selected / In Progress</Badge>
      case 'under_review':
        return <Badge className="bg-amber-500 hover:bg-amber-500 text-white font-medium">Under Review</Badge>
      case 'rejected':
        return <Badge className="bg-red-500 hover:bg-red-500 text-white font-medium">Application Closed</Badge>
      default:
        return <Badge className="bg-slate-500 hover:bg-slate-500 text-white font-medium">Application Received</Badge>
    }
  }

  return (
    <PublicLayout>
      <PageTitle title="Student Login & Certificate Portal | Geek Intern" />

      <div className="min-h-[80vh] bg-slate-50/50 py-10 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Encrypted Student Credential Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Student Login & Certificate Access
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Secure authentication via One-Time Password (OTP) dispatched to your registered email to protect and access candidate credentials.
            </p>
          </div>

          {!portalData ? (
            /* Secure OTP Login Card */
            <Card className="max-w-md mx-auto border-slate-200 shadow-xl bg-white rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-300" />
                    Student OTP Verification
                  </h2>
                  <Badge className="bg-white/20 text-white text-[10px] border-0">256-bit Encrypted</Badge>
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  Enter your registered email to receive an instant login code
                </p>
              </div>

              <CardContent className="p-6 sm:p-8 space-y-5">
                <div>
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Registered Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="name@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pr-10 h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                            disabled={isLoading}
                            required
                          />
                          <div className="absolute right-3 top-3 text-slate-400">
                            <Mail className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          We will send a secure 6-digit verification code to your email. Password is not required.
                        </p>
                      </div>

                      {errorMsg && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
                          <div>{errorMsg}</div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isLoading || !email.trim()}
                        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/20 text-sm transition-all"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending OTP...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Send Login OTP
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 text-xs text-blue-800 flex items-center justify-between">
                        <div className="truncate mr-2">
                          Code sent to: <span className="font-semibold">{email}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false)
                            setOtp('')
                            setDevHint(null)
                          }}
                          className="text-blue-600 font-semibold underline shrink-0 hover:text-blue-800"
                        >
                          Change
                        </button>
                      </div>

                      {devHint && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs flex items-center justify-between">
                          <span>Your Verification Code: <strong className="font-mono text-sm tracking-widest text-emerald-700">{devHint}</strong></span>
                          <button
                            type="button"
                            onClick={() => setOtp(devHint)}
                            className="text-emerald-700 underline font-semibold ml-2"
                          >
                            Auto-Fill
                          </button>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Enter 6-Digit Verification Code <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          maxLength={6}
                          placeholder="• • • • • •"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                          className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-center font-mono text-xl tracking-[0.4em] font-bold"
                          disabled={isLoading}
                          autoFocus
                          required
                        />
                      </div>

                      {errorMsg && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
                          <div>{errorMsg}</div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isLoading || otp.length < 4}
                        className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-600/20 text-sm transition-all"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Verifying Code...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Verify & Access Portal
                            <CheckCircle2 className="h-4 w-4" />
                          </span>
                        )}
                      </Button>

                      <div className="text-center pt-2">
                        <button
                          type="button"
                          disabled={otpTimer > 0 || isLoading}
                          onClick={() => handleSendOtp()}
                          className="text-xs text-blue-600 hover:underline disabled:text-slate-400 font-medium"
                        >
                          {otpTimer > 0 ? `Resend code in ${otpTimer}s` : 'Resend Verification Code'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 text-center">
                  <p className="text-xs text-slate-500">
                    Need to submit a new application?{' '}
                    <Link to="/apply" className="font-semibold text-blue-600 hover:underline">
                      Apply Now ↗
                    </Link>
                  </p>
                  <p className="text-xs text-slate-500">
                    Recruiter or Verification Agency?{' '}
                    <Link to="/verify" className="font-semibold text-blue-600 hover:underline">
                      Public Certificate Verification ↗
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Student Portal Dashboard View */
            <div className="space-y-8">
              {/* Profile Card & Back Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                    {portalData.student.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900">{portalData.student.name}</h2>
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]">
                        Verified Student
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        {portalData.student.email}
                      </span>
                      {portalData.student.college && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                          {portalData.student.college}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      setPortalData(null)
                      if (authUser) {
                        await authSignOut()
                      }
                    }}
                    className="text-xs text-slate-600 border-slate-200 hover:bg-slate-50"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                    Sign Out / Switch Student
                  </Button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('certificates')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'certificates'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Award className="h-4 w-4" />
                  <span>Verified Certificates ({portalData.certificates.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('offer_letters')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'offer_letters'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Send className="h-4 w-4" />
                  <span>My Offer Letter ({(portalData.offer_letters || []).length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('applications')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'applications'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>My Applications ({portalData.applications.length})</span>
                </button>
              </div>

              {/* Tab 1: Certificates View */}
              {activeTab === 'certificates' && (
                <div className="space-y-6">
                  {portalData.certificates.length === 0 ? (
                    <Card className="border-dashed border-2 border-slate-200 bg-white p-8 text-center rounded-2xl">
                      <Award className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <h3 className="text-base font-bold text-slate-800">Certificate In Progress</h3>
                      <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                        Your internship application is active. Your verifiable certificate will automatically appear
                        here upon internship completion and review by the Geek Intern mentors.
                      </p>
                      <Button
                        size="sm"
                        onClick={() => setActiveTab('applications')}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                      >
                        Check Application Status
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Certificate Selector List (if multiple) */}
                      {portalData.certificates.length > 1 && (
                        <div className="space-y-3 lg:col-span-1">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Available Credentials
                          </h4>
                          {portalData.certificates.map((cert) => (
                            <div
                              key={cert.certificate_id}
                              onClick={() => setSelectedCert(cert)}
                              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                selectedCert?.certificate_id === cert.certificate_id
                                  ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-slate-900">{cert.domain}</span>
                                <Badge className="bg-emerald-600 text-white text-[10px]">Verified</Badge>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 font-mono">ID: {cert.certificate_id}</p>
                              <p className="text-xs text-slate-400 mt-0.5">Issued: {cert.issue_date}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Certificate Card & Actions */}
                      <div className={portalData.certificates.length > 1 ? 'lg:col-span-2' : 'lg:col-span-3'}>
                        {selectedCert && (
                          <div className="space-y-4">
                            {/* Actions toolbar */}
                            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                              <div>
                                <h3 className="text-sm font-bold text-slate-900">Certificate Actions</h3>
                                <p className="text-xs text-slate-500">Official Geek Intern Certified Document</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleShare(selectedCert.certificate_id)}
                                  className="text-xs border-slate-300 text-slate-700 hover:bg-slate-50"
                                >
                                  <Share2 className="h-3.5 w-3.5 mr-1.5" />
                                  {copiedLink ? 'Link Copied!' : 'Share'}
                                </Button>
                                {selectedCert.image_url && (
                                  <a
                                    href={selectedCert.image_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="inline-flex"
                                  >
                                    <Button
                                      size="sm"
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm"
                                    >
                                      <Download className="h-3.5 w-3.5 mr-1.5" />
                                      Download Cloud Certificate
                                    </Button>
                                  </a>
                                )}
                                <Button
                                  size="sm"
                                  onClick={handlePrint}
                                  variant={selectedCert.image_url ? 'outline' : 'default'}
                                  className={selectedCert.image_url ? 'text-xs border-slate-300' : 'bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm'}
                                >
                                  <Download className="h-3.5 w-3.5 mr-1.5" />
                                  Print / Save PDF
                                </Button>
                                <Link to={`/verify?id=${encodeURIComponent(selectedCert.certificate_id)}`}>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                                  >
                                    <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                                    Public Verification Page
                                  </Button>
                                </Link>
                              </div>
                            </div>

                            {/* Cloud Certificate Image Banner (if uploaded by Admin to cloud library) */}
                            {selectedCert.image_url && (
                              <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-4 sm:p-6 shadow-md">
                                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-emerald-600 text-white text-xs">
                                      Official Cloud Credential
                                    </Badge>
                                    <span className="text-xs text-slate-500">Issued by Geek Intern</span>
                                  </div>
                                  <a
                                    href={selectedCert.image_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:underline font-semibold inline-flex items-center gap-1"
                                  >
                                    Open Full Size ↗
                                  </a>
                                </div>
                                <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center p-2">
                                  <img
                                    src={selectedCert.image_url}
                                    alt={`Certificate ${selectedCert.certificate_id}`}
                                    className="max-h-[600px] w-full object-contain rounded-lg shadow-xs"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Print / Visual Certificate Paper */}
                            <div
                              ref={certPrintRef}
                              className="bg-white border-8 border-double border-slate-300 rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center"
                              style={{ minHeight: '520px' }}
                            >
                              {/* Watermark Logo Background */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                                <Award className="h-96 w-96 text-blue-900" />
                              </div>

                              {/* Corner Badges */}
                              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-6">
                                <div className="text-left">
                                  <span className="font-extrabold text-blue-600 tracking-wider text-sm sm:text-base">
                                    GEEK INTERN
                                  </span>
                                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                                    Virtual Internship Program
                                  </p>
                                </div>
                                <Badge className="bg-emerald-600 text-white font-mono text-xs px-3 py-1 shadow-sm">
                                  ID: {selectedCert.certificate_id}
                                </Badge>
                              </div>

                              {/* Certificate Header */}
                              <div className="space-y-2 my-4">
                                <h2 className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold">
                                  Certificate of Completion
                                </h2>
                                <p className="text-xs text-slate-400 italic">This is to certify that</p>
                                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight my-2">
                                  {selectedCert.student_name}
                                </h1>
                                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                                  has successfully completed the intensive practical virtual internship in{' '}
                                  <span className="font-bold text-blue-700">{selectedCert.domain}</span> over a duration
                                  of <span className="font-semibold text-slate-800">{selectedCert.duration}</span> with an
                                  overall evaluation grade of{' '}
                                  <span className="font-bold text-emerald-600">Grade {selectedCert.grade}</span>.
                                </p>
                              </div>

                              {/* Details Grid */}
                              <div className="grid grid-cols-3 gap-4 my-8 py-4 border-y border-slate-200/80 max-w-lg mx-auto text-xs">
                                <div>
                                  <span className="text-slate-400 block text-[10px] uppercase">Domain</span>
                                  <span className="font-bold text-slate-800">{selectedCert.domain}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block text-[10px] uppercase">Issue Date</span>
                                  <span className="font-bold text-slate-800">{selectedCert.issue_date}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block text-[10px] uppercase">Performance</span>
                                  <span className="font-bold text-emerald-600">Grade {selectedCert.grade}</span>
                                </div>
                              </div>

                              {/* Signatures & Seal */}
                              <div className="flex items-center justify-between pt-6 max-w-xl mx-auto text-xs">
                                <div className="text-center">
                                  <div className="h-8 border-b border-slate-400 flex items-end justify-center pb-1">
                                    <span className="font-serif italic font-bold text-blue-900 text-sm">Geek Intern Mentor</span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">
                                    Program Director
                                  </span>
                                </div>

                                <div className="h-16 w-16 rounded-full border-2 border-emerald-500 bg-emerald-50/50 flex flex-col items-center justify-center text-emerald-700 shadow-sm">
                                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                                  <span className="text-[8px] font-bold uppercase tracking-tighter">VERIFIED</span>
                                </div>

                                <div className="text-center">
                                  <div className="h-8 border-b border-slate-400 flex items-end justify-center pb-1">
                                    <span className="font-serif italic font-bold text-blue-900 text-sm">Academic Board</span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">
                                    Evaluation Committee
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Offer Letters View */}
              {activeTab === 'offer_letters' && (
                <div className="space-y-6">
                  {(!portalData.offer_letters || portalData.offer_letters.length === 0) ? (
                    <Card className="border-dashed border-2 border-slate-200 bg-white p-8 text-center rounded-2xl">
                      <Send className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <h3 className="text-base font-bold text-slate-800">Offer Letter Under Processing</h3>
                      <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                        Your application is currently under review by our mentors. Once selected, your official internship offer letter with verification code will appear here for instant download.
                      </p>
                      <Button
                        size="sm"
                        onClick={() => setActiveTab('applications')}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                      >
                        Check Application Progression
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Offer Letter Selector (if multiple) */}
                      {portalData.offer_letters.length > 1 && (
                        <div className="space-y-3 lg:col-span-1">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Available Offer Letters
                          </h4>
                          {portalData.offer_letters.map((letter) => (
                            <div
                              key={letter.letter_id}
                              onClick={() => setSelectedOfferLetter(letter)}
                              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                selectedOfferLetter?.letter_id === letter.letter_id
                                  ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-slate-900">{letter.domain}</span>
                                <Badge className="bg-blue-600 text-white text-[10px]">Official</Badge>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 font-mono">ID: {letter.letter_id}</p>
                              <p className="text-xs text-slate-400 mt-0.5">Start: {letter.start_date || 'Immediate'}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Offer Letter Content & Actions */}
                      <div className={portalData.offer_letters.length > 1 ? 'lg:col-span-2' : 'lg:col-span-3'}>
                        {selectedOfferLetter && (
                          <div className="space-y-4">
                            {/* Actions toolbar */}
                            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                              <div>
                                <h3 className="text-sm font-bold text-slate-900">Internship Offer Letter</h3>
                                <p className="text-xs text-slate-500">Official Geek Intern Onboarding & Acceptance Document</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {selectedOfferLetter.image_url && (
                                  <a
                                    href={selectedOfferLetter.image_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="inline-flex"
                                  >
                                    <Button
                                      size="sm"
                                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
                                    >
                                      <Download className="h-3.5 w-3.5 mr-1.5" />
                                      Download Official Document
                                    </Button>
                                  </a>
                                )}
                                <Button
                                  size="sm"
                                  onClick={handlePrint}
                                  variant="outline"
                                  className="text-xs border-slate-300 text-slate-700 hover:bg-slate-50"
                                >
                                  <Printer className="h-3.5 w-3.5 mr-1.5" />
                                  Print / Save PDF
                                </Button>
                                <Link to={`/verify-offer-letter?id=${encodeURIComponent(selectedOfferLetter.letter_id)}`} target="_blank">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs border-blue-300 text-blue-700 hover:bg-blue-50"
                                  >
                                    <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                                    Public Verification Page ↗
                                  </Button>
                                </Link>
                              </div>
                            </div>

                            {/* Cloud Offer Letter Image Banner (if uploaded by Admin) */}
                            {selectedOfferLetter.image_url ? (
                              <div className="bg-white rounded-2xl border-2 border-blue-500/40 p-4 sm:p-6 shadow-md">
                                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-blue-600 text-white text-xs">
                                      Official Offer Letter
                                    </Badge>
                                    <span className="text-xs text-slate-500 font-mono font-bold text-blue-700">
                                      Code: {selectedOfferLetter.letter_id}
                                    </span>
                                  </div>
                                  <a
                                    href={selectedOfferLetter.image_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:underline font-semibold inline-flex items-center gap-1"
                                  >
                                    Open Full Size ↗
                                  </a>
                                </div>
                                <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center p-2">
                                  {selectedOfferLetter.image_url.endsWith('.pdf') ? (
                                    <iframe
                                      src={selectedOfferLetter.image_url}
                                      title="Offer Letter Document"
                                      className="w-full h-[650px] rounded-lg border"
                                    />
                                  ) : (
                                    <img
                                      src={selectedOfferLetter.image_url}
                                      alt={`Offer Letter ${selectedOfferLetter.letter_id}`}
                                      className="max-h-[700px] w-full object-contain rounded-lg shadow-xs"
                                    />
                                  )}
                                </div>
                              </div>
                            ) : null}

                            {/* Letter Details Card */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                <div>
                                  <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                                    Letter of Engagement / Internship Offer
                                  </span>
                                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                                    {selectedOfferLetter.domain}
                                  </h2>
                                </div>
                                <div className="text-right">
                                  <span className="text-[11px] text-slate-400 block uppercase">Reference Code</span>
                                  <span className="font-mono font-bold text-blue-600 text-sm">
                                    {selectedOfferLetter.letter_id}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50/60 p-4 rounded-xl border border-slate-100 text-xs">
                                <div>
                                  <span className="text-slate-400 block text-[10px] uppercase">Candidate</span>
                                  <span className="font-bold text-slate-800">{selectedOfferLetter.student_name}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                                  <span className="font-bold text-slate-800">{selectedOfferLetter.duration || '4 Weeks'}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block text-[10px] uppercase">Start Date</span>
                                  <span className="font-bold text-slate-800">{selectedOfferLetter.start_date || 'Immediate'}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block text-[10px] uppercase">Stipend</span>
                                  <span className="font-bold text-emerald-600">{selectedOfferLetter.stipend || 'Performance Based'}</span>
                                </div>
                              </div>

                              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                                <p>
                                  Dear <strong className="text-slate-900">{selectedOfferLetter.student_name}</strong>,
                                </p>
                                <p>
                                  We are thrilled to offer you the position of <strong className="text-slate-900">{selectedOfferLetter.domain} Intern</strong> at Geek Intern. During this program, you will work on production projects, receive mentorship, build real-world software components, and gain recognized industry experience.
                                </p>
                                <p>
                                  Please keep your unique Offer Letter ID (<strong className="font-mono text-blue-600">{selectedOfferLetter.letter_id}</strong>) safe for onboarding verification and future certificate issuance.
                                </p>
                              </div>

                              {/* Signatures & Seal */}
                              <div className="flex items-center justify-between pt-6 border-t border-slate-100 text-xs">
                                <div className="text-center">
                                  <div className="h-8 border-b border-slate-400 flex items-end justify-center pb-1">
                                    <span className="font-serif italic font-bold text-blue-900 text-sm">Talent Acquisition</span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">
                                    Geek Intern Hiring Team
                                  </span>
                                </div>

                                <div className="h-16 w-16 rounded-full border-2 border-blue-500 bg-blue-50/50 flex flex-col items-center justify-center text-blue-700 shadow-sm">
                                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                                  <span className="text-[8px] font-bold uppercase tracking-tighter">ACCEPTED</span>
                                </div>

                                <div className="text-center">
                                  <div className="h-8 border-b border-slate-400 flex items-end justify-center pb-1">
                                    <span className="font-serif italic font-bold text-blue-900 text-sm">Academic Director</span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">
                                    Internship Program
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Applications Tracker View */}
              {activeTab === 'applications' && (
                <div className="space-y-4">
                  {portalData.applications.length === 0 ? (
                    <Card className="border-slate-200 bg-white p-8 text-center rounded-2xl">
                      <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <h3 className="text-base font-bold text-slate-800">No Applications Found</h3>
                      <p className="text-xs text-slate-500 mt-1 mb-4">
                        You have not submitted an application yet or your record was registered under another email.
                      </p>
                      <Link to="/apply">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                          Apply for Internship Now ↗
                        </Button>
                      </Link>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {portalData.applications.map((app) => (
                        <Card key={app.id} className="border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
                          <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-slate-900">{app.internship_title}</h3>
                                {getStatusBadge(app.status)}
                              </div>
                              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                                <span>Duration: {app.duration}</span>
                                <span>•</span>
                                <span>Applied on: {new Date(app.created_at).toLocaleDateString()}</span>
                              </p>
                            </div>

                            {app.status === 'completed' && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setActiveTab('certificates')
                                  const matchingCert = portalData.certificates.find(
                                    (c) => c.domain === app.internship_title
                                  )
                                  if (matchingCert) setSelectedCert(matchingCert)
                                }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5"
                              >
                                <Award className="h-3.5 w-3.5" />
                                View Certificate
                              </Button>
                            )}
                          </div>

                          {/* Progress Stages Tracker */}
                          <div className="p-5 sm:p-6 bg-slate-50/50">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3 block">
                              Application Progression
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div
                                className={`p-3 rounded-xl border text-center ${
                                  ['applied', 'submitted', 'under_review', 'selected', 'completed'].includes(
                                    app.status.toLowerCase()
                                  )
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold'
                                    : 'bg-white border-slate-200 text-slate-400'
                                }`}
                              >
                                <span className="text-xs block">1. Applied</span>
                                <span className="text-[10px] text-slate-500 font-normal">Details Received</span>
                              </div>

                              <div
                                className={`p-3 rounded-xl border text-center ${
                                  ['under_review', 'selected', 'completed'].includes(app.status.toLowerCase())
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold'
                                    : 'bg-white border-slate-200 text-slate-400'
                                }`}
                              >
                                <span className="text-xs block">2. Under Review</span>
                                <span className="text-[10px] text-slate-500 font-normal">Profile Evaluation</span>
                              </div>

                              <div
                                className={`p-3 rounded-xl border text-center ${
                                  ['selected', 'completed'].includes(app.status.toLowerCase())
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold'
                                    : 'bg-white border-slate-200 text-slate-400'
                                }`}
                              >
                                <span className="text-xs block">3. In Progress</span>
                                <span className="text-[10px] text-slate-500 font-normal">Project & Tasks</span>
                              </div>

                              <div
                                className={`p-3 rounded-xl border text-center ${
                                  app.status.toLowerCase() === 'completed'
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold'
                                    : 'bg-white border-slate-200 text-slate-400'
                                }`}
                              >
                                <span className="text-xs block">4. Certified</span>
                                <span className="text-[10px] text-slate-500 font-normal">Certificate Issued</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
