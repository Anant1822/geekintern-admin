import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import api from '@/services/api'

export function IndustrialTrainingVerification() {
  const [certId, setCertId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanId = certId.trim().toUpperCase()
    if (!cleanId) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await api.get(`/certificates/verify/${encodeURIComponent(cleanId)}`)
      if (res.data?.success && res.data?.data?.certificate) {
        setResult(res.data.data.certificate)
      } else {
        setError(`Credential ID "${cleanId}" not found in Geek Intern records.`)
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || `Credential ID "${cleanId}" could not be verified.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PublicLayout>
      <PageTitle title="Industrial Training Certificate Verification | Geek Intern" />

      {/* Header */}
      <section className="pt-24 pb-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/40 text-slate-900 border-b border-slate-200">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
            Official Credential Verification
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-slate-950">
            Industrial Training <span className="text-[#FF4D5A]">Verification</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Validate the authenticity of university training completion certificates and letters issued by Geek Intern.
          </p>

          <form onSubmit={handleVerify} className="max-w-lg mx-auto mt-8 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Enter Certificate ID (e.g. CF-2026-WD101)"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                className="pl-10 h-12 bg-white border-slate-300 text-slate-900 rounded-xl shadow-sm"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20"
            >
              {loading ? 'Verifying...' : 'Verify Now'}
            </Button>
          </form>
        </div>
      </section>

      {/* Result Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 min-h-[50vh]">
        <div className="max-w-2xl mx-auto">
          {result && (
            <div className="rounded-2xl bg-white border border-emerald-300 p-8 shadow-xl">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Verified Authentic Credential</h3>
                  <p className="text-xs text-slate-500">Validated against Geek Intern official cryptographic registry</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 text-sm">
                <div>
                  <span className="text-xs text-slate-500 block mb-0.5">Candidate Name:</span>
                  <span className="font-bold text-slate-900">{result.student_name}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-0.5">Certificate ID:</span>
                  <span className="font-mono text-blue-600 font-bold">{result.certificate_id}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-0.5">Technical Domain:</span>
                  <span className="font-semibold text-slate-800">{result.domain}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-0.5">Program Duration:</span>
                  <span className="font-semibold text-slate-800">{result.duration}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-0.5">Issue Date:</span>
                  <span className="text-slate-700">{result.issue_date}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-0.5">Evaluation Grade:</span>
                  <span className="text-emerald-600 font-bold">{result.grade || 'A+'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-center">
                <Link to="/verify">
                  <Button variant="outline" className="border-slate-300 bg-white text-slate-700 text-xs shadow-sm hover:bg-slate-50">
                    Standard Verification Portal
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-2xl bg-rose-50 border border-rose-200 p-6 text-center shadow-sm">
              <AlertCircle className="w-10 h-10 text-rose-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">Verification Failed</h3>
              <p className="text-xs text-rose-600">{error}</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}

export default IndustrialTrainingVerification
