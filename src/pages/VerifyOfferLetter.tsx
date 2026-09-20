import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Search, ShieldCheck, CheckCircle2, AlertCircle, Send, Calendar, Clock,
  User, Briefcase, FileCheck, ArrowRight, Download, Printer, ExternalLink,
  Sparkles, Mail, Building, FileText, Share2
} from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import PageTitle from '@/components/common/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import api from '@/services/api'
import { formatDate } from '@/lib/utils'

interface OfferLetterData {
  letter_id: string
  student_name: string
  email: string
  domain: string
  duration: string
  start_date: string
  stipend: string
  status: string
  issuer: string
  image_url?: string | null
  created_at?: string
}

export default function VerifyOfferLetter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialId = searchParams.get('id') || ''

  const [letterId, setLetterId] = useState(initialId)
  const [isLoading, setIsLoading] = useState(false)
  const [offerLetter, setOfferLetter] = useState<OfferLetterData | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [searchedId, setSearchedId] = useState<string>('')
  const [copiedLink, setCopiedLink] = useState(false)

  const handleVerify = async (idToSearch: string) => {
    const cleanId = idToSearch.trim().toUpperCase()
    if (!cleanId) return

    setIsLoading(true)
    setErrorMsg(null)
    setOfferLetter(null)
    setSearchedId(cleanId)

    try {
      const res = await api.get(`/certificates/verify-offer-letter/${encodeURIComponent(cleanId)}`)
      if (res.data?.success && res.data?.data?.offer_letter) {
        setOfferLetter(res.data.data.offer_letter)
        setSearchParams({ id: cleanId })
      } else {
        setErrorMsg(`Offer Letter ID "${cleanId}" not found in Geek Intern verification records.`)
      }
    } catch (err: any) {
      console.error('Offer letter verification error:', err)
      const msg = err?.response?.data?.message || `Offer Letter ID "${cleanId}" could not be verified.`
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-verify if ID is passed in query string
  useEffect(() => {
    if (initialId) {
      handleVerify(initialId)
    }
  }, [initialId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleVerify(letterId)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  return (
    <PublicLayout>
      <PageTitle title="Verify Internship Offer Letter | Geek Intern Verification Portal" />

      <div className="min-h-screen bg-slate-50/70 py-12 sm:py-16">
        <div className="container max-w-4xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Geek Intern Official Document Verification
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Verify Internship Offer Letter
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Validate internship engagement and onboarding documents issued by Geek Intern. Enter the unique Offer Letter ID printed on the official letter or document header.
            </p>
          </div>

          {/* Search Card */}
          <Card className="border border-slate-200 shadow-sm bg-white mb-8">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Enter Offer Letter ID (e.g. GI-OL-2026-DEMO1)"
                    value={letterId}
                    onChange={(e) => setLetterId(e.target.value)}
                    className="pl-10 h-11 text-sm sm:text-base uppercase font-mono tracking-wide"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !letterId.trim()}
                  className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs transition-all"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Verify Document
                    </span>
                  )}
                </Button>
              </form>
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
                <span>Looking for a certificate instead? <Link to="/verify" className="text-blue-600 hover:underline font-medium">Verify Certificate ↗</Link></span>
                <span className="font-mono text-[11px] text-slate-400">Format: GI-OL-YYYY-XXXXX</span>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {errorMsg && (
            <Card className="border-red-200 bg-red-50/70 mb-8 animate-in fade-in">
              <CardContent className="p-5 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 text-sm">Offer Letter Not Found</h3>
                  <p className="text-xs text-red-700 mt-0.5 leading-relaxed">{errorMsg}</p>
                  <p className="text-xs text-red-600 mt-2">
                    Please double-check the Offer Letter ID. If you recently received your offer letter, please verify the exact reference code provided in your email.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Verified Offer Letter Card */}
          {offerLetter && (
            <div className="space-y-6 animate-in fade-in">
              {/* Verification Status Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Verified Authentic Internship Offer Letter</h3>
                    <p className="text-xs text-emerald-700">Issued and digitally sealed by Geek Intern</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleShare}
                    className="text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-100/60 h-8"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    {copiedLink ? 'Link Copied!' : 'Share Verification Link'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => window.print()}
                    variant="outline"
                    className="text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-100/60 h-8"
                  >
                    <Printer className="h-3 w-3 mr-1" />
                    Print / Save
                  </Button>
                </div>
              </div>

              {/* Cloud Uploaded Document Banner (if image/PDF exists) */}
              {offerLetter.image_url && (
                <Card className="border-2 border-blue-500/40 shadow-sm bg-white overflow-hidden rounded-2xl">
                  <CardHeader className="bg-slate-50/60 border-b border-slate-100 p-4 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        Original Cloud Document
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Official document hosted in Geek Intern cloud archive
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={offerLetter.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Open High-Res ↗
                      </a>
                      <a
                        href={offerLetter.image_url}
                        download={`Offer_Letter_${offerLetter.letter_id}.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 gap-1.5">
                          <Download className="h-3.5 w-3.5" />
                          Download Document
                        </Button>
                      </a>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 bg-slate-900/5 flex items-center justify-center">
                    {offerLetter.image_url.endsWith('.pdf') ? (
                      <iframe
                        src={offerLetter.image_url}
                        title={`Offer Letter ${offerLetter.letter_id}`}
                        className="w-full h-[650px] rounded-lg border border-slate-200"
                      />
                    ) : (
                      <img
                        src={offerLetter.image_url}
                        alt={`Offer Letter ${offerLetter.letter_id}`}
                        className="max-h-[750px] w-auto max-w-full rounded-lg shadow-md object-contain border border-slate-200"
                      />
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Offer Letter Document Details Sheet */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                {/* Top header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                      Official Letter of Engagement
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {offerLetter.domain} Intern
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Issued by <strong className="text-slate-800">{offerLetter.issuer}</strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block uppercase">Verification Code</span>
                    <span className="font-mono font-bold text-blue-600 text-base bg-blue-50 px-2.5 py-1 rounded border border-blue-100 inline-block">
                      {offerLetter.letter_id}
                    </span>
                  </div>
                </div>

                {/* Candidate & Term Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Candidate Name</span>
                    <span className="font-bold text-slate-900 text-sm mt-0.5 block">{offerLetter.student_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Program Duration</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">{offerLetter.duration || '4 Weeks'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Commencement Date</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                      {offerLetter.start_date ? formatDate(offerLetter.start_date) : 'Immediate'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Stipend / Honorarium</span>
                    <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{offerLetter.stipend || 'Performance Based'}</span>
                  </div>
                </div>

                {/* Engagement Text */}
                <div className="space-y-3 text-xs text-slate-600 leading-relaxed pt-2">
                  <p>
                    Dear <strong className="text-slate-900">{offerLetter.student_name}</strong>,
                  </p>
                  <p>
                    We are pleased to extend this official offer of internship for the role of <strong className="text-slate-900">{offerLetter.domain} Intern</strong> at Geek Intern.
                  </p>
                  <p>
                    During this experiential learning tenure, you will work on live software features, participate in architecture design, submit weekly milestones, and receive dedicated mentorship from senior engineers.
                  </p>
                  <p>
                    Upon satisfactory completion of your project tasks, you will be awarded an industry-accredited virtual internship certificate verifiable in our public database.
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
                    <span className="text-[8px] font-bold uppercase tracking-tighter">OFFICIAL</span>
                  </div>

                  <div className="text-center">
                    <div className="h-8 border-b border-slate-400 flex items-end justify-center pb-1">
                      <span className="font-serif italic font-bold text-blue-900 text-sm">Program Director</span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">
                      Academic Board
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Portal CTA */}
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-blue-900">Are you the candidate named on this document?</p>
                  <p className="text-blue-700 mt-0.5">Sign into the student portal to track onboarding, tasks, and future certificates.</p>
                </div>
                <Link to={`/login?email=${encodeURIComponent(offerLetter.email || '')}`}>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 text-xs">
                    Open Student Portal
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
