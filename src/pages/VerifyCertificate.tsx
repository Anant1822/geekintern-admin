import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, ShieldCheck, CheckCircle2, AlertCircle, Award, Calendar, Clock, User, Briefcase, FileCheck, ArrowRight } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import api from '@/services/api'

interface CertificateData {
  certificate_id: string
  student_name: string
  domain: string
  duration: string
  issue_date: string
  grade: string
  status: string
  issuer: string
  image_url?: string | null
}

export default function VerifyCertificate() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialId = searchParams.get('id') || ''

  const [certId, setCertId] = useState(initialId)
  const [isLoading, setIsLoading] = useState(false)
  const [certificate, setCertificate] = useState<CertificateData | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [searchedId, setSearchedId] = useState<string>('')

  const handleVerify = async (idToSearch: string) => {
    const cleanId = idToSearch.trim().toUpperCase()
    if (!cleanId) return

    setIsLoading(true)
    setErrorMsg(null)
    setCertificate(null)
    setSearchedId(cleanId)

    try {
      const res = await api.get(`/certificates/verify/${encodeURIComponent(cleanId)}`)
      if (res.data?.success && res.data?.data?.certificate) {
        setCertificate(res.data.data.certificate)
        setSearchParams({ id: cleanId })
      } else {
        setErrorMsg(`Certificate ID "${cleanId}" not found in Geek Intern verification records.`)
      }
    } catch (err: any) {
      console.error('Verification error:', err)
      const msg = err?.response?.data?.message || `Certificate ID "${cleanId}" could not be verified.`
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-verify if ID is in URL
  useEffect(() => {
    if (initialId) {
      handleVerify(initialId)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleVerify(certId)
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-50/70 py-12 sm:py-16">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Geek Intern Verification Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Verify Internship Certificate
            </h1>
            <p className="mt-3 text-slate-600 text-base">
              Validate credentials issued to Geek Intern virtual internship graduates. Enter the unique Certificate ID printed on the document.
            </p>
          </div>

          {/* Search Card */}
          <Card className="border border-slate-200 shadow-sm bg-white mb-8">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Enter Certificate ID (e.g. CF-2026-WD101)"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    className="pl-10 h-11 text-base uppercase font-mono tracking-wide"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !certId.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-11 font-semibold"
                >
                  {isLoading ? 'Verifying...' : 'Verify Credential'}
                </Button>
              </form>

              {/* Sample IDs for demonstration */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>Sample IDs to try:</span>
                {['CF-2026-WD101', 'CF-2026-PY102', 'CF-2026-AI103'].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => {
                      setCertId(sample)
                      handleVerify(sample)
                    }}
                    className="font-mono bg-slate-100 hover:bg-blue-50 hover:text-blue-600 px-2 py-0.5 rounded text-slate-700 font-medium transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Error Result */}
          {errorMsg && (
            <Card className="border-red-200 bg-red-50/50 p-6 text-center animate-in fade-in duration-200">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-red-900 text-lg mb-1">Verification Failed</h3>
              <p className="text-red-700 text-sm max-w-md mx-auto">{errorMsg}</p>
              <p className="text-xs text-red-500 mt-2">
                Please ensure you have entered the Certificate ID exactly as it appears on your certificate, or contact{' '}
                <a href="mailto:thestartup675@gmail.com" className="underline font-medium">thestartup675@gmail.com</a>.
              </p>
            </Card>
          )}

          {/* Success Result */}
          {certificate && (
            <Card className="border-2 border-emerald-500 shadow-md bg-white overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Top Banner */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                  <div>
                    <h3 className="font-bold text-base leading-tight">Verified Credential</h3>
                    <p className="text-xs text-emerald-100 font-mono">ID: {certificate.certificate_id}</p>
                  </div>
                </div>
                <Badge className="bg-white/20 hover:bg-white/20 text-white border-0 text-xs px-2.5 py-1">
                  Active & Valid
                </Badge>
              </div>

              {/* Certificate Details */}
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Awarded To</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                    <User className="h-6 w-6 text-blue-600" />
                    {certificate.student_name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-blue-500" /> Internship Track
                    </span>
                    <p className="font-semibold text-slate-900 text-base">{certificate.domain}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-indigo-500" /> Duration
                    </span>
                    <p className="font-semibold text-slate-900 text-base">{certificate.duration}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-emerald-500" /> Date of Issuance
                    </span>
                    <p className="font-semibold text-slate-900 text-base">{certificate.issue_date}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-amber-500" /> Evaluation Performance
                    </span>
                    <p className="font-semibold text-emerald-600 text-base">Grade {certificate.grade} (Distinction)</p>
                  </div>
                </div>

                {/* Cloud Library Certificate Image if uploaded */}
                {certificate.image_url && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                        Official Issued Document
                      </span>
                      <a
                        href={certificate.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        Open Full Resolution ↗
                      </a>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2 shadow-xs flex items-center justify-center">
                      <img
                        src={certificate.image_url}
                        alt={`Certificate ${certificate.certificate_id}`}
                        className="max-h-[500px] w-full object-contain rounded-lg shadow-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Issuer Info */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800">Issuing Organization:</span> Geek Intern Learning & Virtual Internships
                    <br />
                    <span className="text-slate-500">Official Authenticated Record verified from database.</span>
                  </div>
                  <Link to="/apply">
                    <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs">
                      Apply for Internship
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA Box */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h3 className="text-xl font-bold">Want to earn a verified certificate?</h3>
              <p className="text-blue-100 text-sm mt-1 max-w-md">
                Enroll in any of our 20+ virtual technical internship tracks and build hands-on projects at your own pace.
              </p>
            </div>
            <Link to="/apply" className="shrink-0">
              <Button className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-2.5 h-11 rounded-xl shadow-sm">
                Start Internship <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
