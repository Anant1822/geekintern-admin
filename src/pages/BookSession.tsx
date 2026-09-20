import React, { useState } from 'react'
import {
  Clock,
  Video,
  CheckCircle2,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

const SESSION_TYPES = [
  {
    id: 'resume-review',
    title: 'Resume & GitHub Portfolio Audit',
    duration: '30 Minutes',
    price: 'Free with Internship',
    desc: 'Line-by-line review of your developer resume, GitHub readme quality, and project commit history to pass recruiter screens.',
  },
  {
    id: 'mock-interview',
    title: 'Technical Mock Coding Interview',
    duration: '45 Minutes',
    price: 'Free with Internship',
    desc: 'Simulated live technical coding interview with algorithmic problem solving, system design basics, and structured feedback.',
  },
  {
    id: 'career-roadmap',
    title: 'Career & Placement Roadmap',
    duration: '30 Minutes',
    price: 'Free with Internship',
    desc: 'Personalized guidance on choosing between Web, AI, Android, or Cloud tracks and planning off-campus placement strategy.',
  },
]

const MENTORS = [
  {
    name: 'Vikramaditya S.',
    role: 'Senior Software Engineer (Ex-Amazon)',
    domain: 'Full Stack & Cloud Architecture',
    rating: 4.9,
    sessions: '420+ Sessions',
  },
  {
    name: 'Priyanka Sen',
    role: 'Lead ML Engineer (Ex-Flipkart)',
    domain: 'AI, NLP & Predictive Modeling',
    rating: 5.0,
    sessions: '310+ Sessions',
  },
  {
    name: 'Harsh Vardhan',
    role: 'Staff Mobile Architect',
    domain: 'Android Jetpack & Flutter Systems',
    rating: 4.9,
    sessions: '280+ Sessions',
  },
]

export function BookSession() {
  const [selectedSession, setSelectedSession] = useState(SESSION_TYPES[0].id)
  const [booked, setBooked] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'Evening (6 PM - 9 PM)',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) {
      alert('Please enter your name and email.')
      return
    }
    setBooked(true)
  }

  return (
    <PublicLayout>
      <PageTitle title="Book 1-on-1 Mentorship Session | Geek Intern" />

      {/* Hero Header */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/40 text-slate-900 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
            Personalized Engineering Guidance
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-950">
            Book a 1-on-1 <span className="text-[#FF4D5A]">Mentorship Session</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Get your code reviewed, practice live mock interviews, and unblock your career roadmap with senior engineers and tech leaders.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 min-h-[70vh]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Mentors & Session Tracks (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-950 mb-4">Choose Your Session Focus</h2>
              <div className="flex flex-col gap-4">
                {SESSION_TYPES.map((sess) => (
                  <div
                    key={sess.id}
                    onClick={() => setSelectedSession(sess.id)}
                    className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                      selectedSession === sess.id
                        ? 'bg-blue-50/50 border-blue-500 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{sess.title}</h3>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        {sess.price}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {sess.desc}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {sess.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-purple-600" />
                        Google Meet / Zoom
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentor Profiles */}
            <div>
              <h2 className="text-2xl font-bold text-slate-950 mb-4">Available Mentors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {MENTORS.map((m, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-3 text-sm shadow-md">
                      {m.name.charAt(0)}
                    </div>
                    <div className="font-bold text-sm text-slate-900">{m.name}</div>
                    <div className="text-[11px] text-blue-600 font-medium mt-0.5">{m.role}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{m.domain}</div>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-1 text-xs text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{m.rating} ({m.sessions})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking Form (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-xl sticky top-24">
              {booked ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Session Requested!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    Thank you, {form.name}. Our mentorship coordinator will reach out to your email ({form.email}) within 24 hours with the calendar invite.
                  </p>
                  <Button
                    onClick={() => setBooked(false)}
                    variant="outline"
                    className="border-slate-300 bg-white text-slate-700 text-xs shadow-sm hover:bg-slate-50"
                  >
                    Book Another Session
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Reserve Your Slot</h3>
                    <p className="text-xs text-slate-500">Fill in your contact info to schedule.</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Full Name</label>
                    <Input
                      required
                      placeholder="e.g. Rahul Verma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-10"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Email Address</label>
                    <Input
                      required
                      type="email"
                      placeholder="rahul@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-10"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">WhatsApp / Phone</label>
                    <Input
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-10"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 mb-1 block">Preferred Date</label>
                      <Input
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-10"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 mb-1 block">Time Slot</label>
                      <select
                        value={form.preferredTime}
                        onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs h-10 rounded-md px-2"
                      >
                        <option>Morning (10 AM - 1 PM)</option>
                        <option>Afternoon (2 PM - 5 PM)</option>
                        <option>Evening (6 PM - 9 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Specific Questions or GitHub Link</label>
                    <Textarea
                      rows={3}
                      placeholder="What would you like the mentor to review?"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="bg-slate-50 border-slate-300 text-slate-900 text-xs"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 mt-2"
                  >
                    Confirm 1-on-1 Session Slot →
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default BookSession
