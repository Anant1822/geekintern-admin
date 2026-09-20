import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  Printer
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

export function ResumeBuilder() {
  const [personal, setPersonal] = useState({
    fullName: 'Rahul Verma',
    title: 'Full Stack Software Engineer',
    email: 'rahul.verma@example.com',
    phone: '+91 98765 43210',
    location: 'New Delhi, India',
    github: 'github.com/rahulverma',
    linkedin: 'linkedin.com/in/rahulverma',
    summary:
      'Passionate Full Stack Developer with hands-on experience in React, TypeScript, Node.js, and PostgreSQL. Proven track record of developing responsive web applications, integrating secure payment APIs, and maintaining version-controlled repositories.',
  })

  const [skills, setSkills] = useState({
    languages: 'TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3',
    frameworks: 'React, Next.js, Node.js, Express, Tailwind CSS, Redux Toolkit',
    tools: 'Git, GitHub, Docker, Postman, Supabase, PostgreSQL, Linux',
  })

  const [experience, setExperience] = useState([
    {
      title: 'Virtual Web Development Intern',
      company: 'Geek Intern',
      period: 'May 2024 – June 2024',
      bullet1: 'Engineered a full-stack e-commerce web platform utilizing Next.js and Tailwind CSS, boosting load performance by 28%.',
      bullet2: 'Implemented secure payment processing via Stripe webhooks and managed authenticated session cookies.',
      bullet3: 'Collaborated with mentors during weekly code reviews, maintaining 100% clean GitHub git commits.',
    },
  ])

  const [projects, setProjects] = useState([
    {
      name: 'TaskFlow - Kanban Project Management',
      tech: 'React, Node.js, PostgreSQL, Socket.io',
      desc: 'Collaborative task planner with drag-and-drop kanban boards, real-time board sync across team members, and role-based permissions.',
    },
    {
      name: 'Pulse AI - Document Analyzer',
      tech: 'Python, FastAPI, LangChain, OpenAI API',
      desc: 'Autonomous agentic workflow app extracting key insights, summarizations, and risk clauses from PDF contracts.',
    },
  ])

  const [education, setEducation] = useState({
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Delhi Technological University',
    year: '2021 – 2025',
    cgpa: '8.8 / 10.0',
  })

  const handlePrint = () => {
    window.print()
  }

  return (
    <PublicLayout>
      <PageTitle title="Developer Resume Builder | Geek Intern" />

      {/* Header */}
      <section className="print:hidden pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/40 text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <Badge className="bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-widest text-[11px] mb-2 px-3 py-1">
              ATS-Optimized Generator
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Developer <span className="text-[#FF4D5A]">Resume Builder</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Edit your details on the left. The live ATS-formatted preview updates in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/ats-checker">
              <Button variant="outline" className="border-slate-300 bg-white text-slate-700 text-xs shadow-sm hover:bg-slate-50">
                Scan ATS Score
              </Button>
            </Link>
            <Button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 h-10 rounded-xl shadow-md shadow-blue-600/25 inline-flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Workspace */}
      <div className="bg-slate-100/70 print:bg-white text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
          {/* Form Editor Column (5 Cols) */}
          <div className="print:hidden lg:col-span-5 flex flex-col gap-6 max-h-[85vh] overflow-y-auto pr-2">
            {/* Personal Details Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Personal Information</span>
              </h3>
              <div className="flex flex-col gap-3">
                <Input
                  placeholder="Full Name"
                  value={personal.fullName}
                  onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                  className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                />
                <Input
                  placeholder="Professional Headline / Title"
                  value={personal.title}
                  onChange={(e) => setPersonal({ ...personal, title: e.target.value })}
                  className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Email"
                    value={personal.email}
                    onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                    className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                  />
                  <Input
                    placeholder="Phone"
                    value={personal.phone}
                    onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                    className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="GitHub URL"
                    value={personal.github}
                    onChange={(e) => setPersonal({ ...personal, github: e.target.value })}
                    className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                  />
                  <Input
                    placeholder="LinkedIn URL"
                    value={personal.linkedin}
                    onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })}
                    className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                  />
                </div>
                <Textarea
                  placeholder="Summary"
                  rows={3}
                  value={personal.summary}
                  onChange={(e) => setPersonal({ ...personal, summary: e.target.value })}
                  className="bg-slate-50 border-slate-300 text-slate-900 text-xs"
                />
              </div>
            </div>

            {/* Technical Skills Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Technical Skills</h3>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold mb-1 block">
                    Languages
                  </label>
                  <Input
                    value={skills.languages}
                    onChange={(e) => setSkills({ ...skills, languages: e.target.value })}
                    className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold mb-1 block">
                    Frameworks & Libraries
                  </label>
                  <Input
                    value={skills.frameworks}
                    onChange={(e) => setSkills({ ...skills, frameworks: e.target.value })}
                    className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold mb-1 block">
                    Databases & Tools
                  </label>
                  <Input
                    value={skills.tools}
                    onChange={(e) => setSkills({ ...skills, tools: e.target.value })}
                    className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                  />
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Internship & Experience</h3>
              <div className="flex flex-col gap-2.5">
                <Input
                  placeholder="Role Title"
                  value={experience[0].title}
                  onChange={(e) => {
                    const copy = [...experience]
                    copy[0].title = e.target.value
                    setExperience(copy)
                  }}
                  className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Company"
                    value={experience[0].company}
                    onChange={(e) => {
                      const copy = [...experience]
                      copy[0].company = e.target.value
                      setExperience(copy)
                    }}
                    className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                  />
                  <Input
                    placeholder="Period"
                    value={experience[0].period}
                    onChange={(e) => {
                      const copy = [...experience]
                      copy[0].period = e.target.value
                      setExperience(copy)
                    }}
                    className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                  />
                </div>
                <Textarea
                  placeholder="Bullet 1"
                  rows={2}
                  value={experience[0].bullet1}
                  onChange={(e) => {
                    const copy = [...experience]
                    copy[0].bullet1 = e.target.value
                    setExperience(copy)
                  }}
                  className="bg-slate-50 border-slate-300 text-slate-900 text-xs"
                />
                <Textarea
                  placeholder="Bullet 2"
                  rows={2}
                  value={experience[0].bullet2}
                  onChange={(e) => {
                    const copy = [...experience]
                    copy[0].bullet2 = e.target.value
                    setExperience(copy)
                  }}
                  className="bg-slate-50 border-slate-300 text-slate-900 text-xs"
                />
              </div>
            </div>

            {/* Education Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Education</h3>
              <div className="flex flex-col gap-2.5">
                <Input
                  placeholder="Degree"
                  value={education.degree}
                  onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                  className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                />
                <Input
                  placeholder="University / College"
                  value={education.institution}
                  onChange={(e) => setEducation({ ...education, institution: e.target.value })}
                  className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Year"
                    value={education.year}
                    onChange={(e) => setEducation({ ...education, year: e.target.value })}
                    className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                  />
                  <Input
                    placeholder="CGPA / Percentage"
                    value={education.cgpa}
                    onChange={(e) => setEducation({ ...education, cgpa: e.target.value })}
                    className="bg-slate-50 border-slate-300 text-slate-900 text-xs h-9"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Live Printable Preview Column (7 Cols) */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              id="resume-printable"
              className="w-full max-w-[800px] min-h-[1050px] bg-white text-slate-900 p-10 sm:p-14 shadow-xl border border-slate-200 rounded-sm font-sans flex flex-col justify-between print:shadow-none print:border-none print:p-0 print:m-0 print:w-full"
            >
              <div>
                {/* Header */}
                <div className="border-b-2 border-slate-900 pb-4 mb-5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-950">
                    {personal.fullName || 'YOUR NAME'}
                  </h1>
                  <p className="text-sm font-semibold text-blue-700 mt-0.5">
                    {personal.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2 font-medium">
                    <span>{personal.email}</span>
                    <span>•</span>
                    <span>{personal.phone}</span>
                    <span>•</span>
                    <span>{personal.location}</span>
                    <span>•</span>
                    <span>{personal.github}</span>
                    <span>•</span>
                    <span>{personal.linkedin}</span>
                  </div>
                </div>

                {/* Summary */}
                {personal.summary && (
                  <div className="mb-5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                      Professional Summary
                    </h2>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {personal.summary}
                    </p>
                  </div>
                )}

                {/* Technical Skills */}
                <div className="mb-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                    Technical Skills
                  </h2>
                  <div className="text-xs text-slate-800 flex flex-col gap-1">
                    <div>
                      <span className="font-bold text-slate-950">Languages: </span>
                      <span>{skills.languages}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-950">Frameworks & Libraries: </span>
                      <span>{skills.frameworks}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-950">Databases & Tools: </span>
                      <span>{skills.tools}</span>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                    Internship & Practical Experience
                  </h2>
                  {experience.map((exp, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-950">
                          {exp.title} <span className="font-normal text-slate-600">| {exp.company}</span>
                        </span>
                        <span className="font-semibold text-slate-600 text-[11px]">{exp.period}</span>
                      </div>
                      <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-1">
                        <li>{exp.bullet1}</li>
                        <li>{exp.bullet2}</li>
                        {exp.bullet3 && <li>{exp.bullet3}</li>}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Projects */}
                <div className="mb-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                    Key Technical Projects
                  </h2>
                  {projects.map((proj, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-950">{proj.name}</span>
                        <span className="text-[11px] font-semibold text-blue-700">{proj.tech}</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                    Education
                  </h2>
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-950">{education.degree}</span>
                      <div className="text-slate-600 text-[11px]">{education.institution}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-slate-700">{education.year}</span>
                      <div className="text-slate-600 text-[11px]">CGPA: {education.cgpa}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[9px] text-slate-400 text-center pt-6 border-t border-slate-100">
                Generated via Geek Intern ATS-Optimized Career Tools • https://geekintern.in
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}

export default ResumeBuilder
