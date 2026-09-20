import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

const TEAM_MEMBERS = [
  {
    name: 'Vikramaditya Sharma',
    role: 'Founder & Chief Technology Officer',
    bio: 'Former Senior Cloud Systems Architect with over a decade of engineering experience at multinational tech firms. Passionate about democratizing engineering internships.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    domain: 'System Architecture',
  },
  {
    name: 'Priyanka Sen',
    role: 'Head of AI & Curriculum Director',
    bio: 'Deep learning researcher and ex-FinTech ML lead. Designs real-world practical capstones that prepare college students for high-scale machine learning roles.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    domain: 'AI & Data Science',
  },
  {
    name: 'Harsh Vardhan',
    role: 'Lead Mobile Engineering Mentor',
    bio: 'Android & Flutter developer who has architected apps with over 5M+ Play Store downloads. Guides interns on clean architecture and performance profiling.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    domain: 'Mobile Systems',
  },
  {
    name: 'Ritika Roy',
    role: 'Director of University Partnerships',
    bio: 'Dedicated to connecting Indian colleges and university placement cells with verified industrial training programs and virtual internship tracks.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    domain: 'College Alliances',
  },
]

export function Team() {
  return (
    <PublicLayout>
      <PageTitle title="Meet Team Geek Intern | Geek Intern" />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/40 text-slate-900 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
            People Behind Geek Intern
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-950">
            Meet Team <span className="text-[#FF4D5A]">Geek Intern</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A dedicated group of software architects, university mentors, and curriculum designers bridging academic study with actual engineering careers.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-blue-400 transition-all group shadow-sm hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                      {member.domain}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-xs text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-20 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 border border-blue-200 p-10 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl font-bold mb-3 text-slate-950">Want to Collaborate or Mentor?</h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto mb-6">
              We welcome experienced tech leads and university faculty interested in mentoring or partnering with Geek Intern.
            </p>
            <Link to="/contact">
              <Button className="h-10 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/25">
                Contact the Team →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default Team
