import {
  ShieldCheck, Globe2, Briefcase, Clock, Filter, AlertTriangle,
  UserCheck, Search, FileText, Award, ArrowRight, CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MissionCardProps { icon: React.ReactNode; title: string; description: string; accent: "teal" | "amber" | "navy"; }
function MissionCard({ icon, title, description, accent }: MissionCardProps) {
  const colors = {
    teal:  { bar: "bg-[#0D9488]", icon: "bg-teal-50 text-teal-600" },
    amber: { bar: "bg-[#F59E0B]", icon: "bg-amber-50 text-amber-600" },
    navy:  { bar: "bg-[#1E3A5F]", icon: "bg-blue-50 text-[#1E3A5F]" },
  };
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className={cn("h-1.5 w-full", colors[accent].bar)} />
      <CardContent className="pt-6 pb-6 flex flex-col gap-3">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", colors[accent].icon)}>{icon}</div>
        <h3 className="font-bold text-[#1E3A5F] text-lg">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

interface PainPointProps { icon: React.ReactNode; text: string; }
function PainPoint({ icon, text }: PainPointProps) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-red-50">
      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0 mt-0.5">{icon}</div>
      <p className="text-gray-700 font-medium leading-relaxed">{text}</p>
    </div>
  );
}

interface StepCardProps { step: number; title: string; description: string; }
function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-[#1E3A5F] text-white font-bold text-lg flex items-center justify-center mb-4 shadow-md">{step}</div>
      <h4 className="font-semibold text-[#1E3A5F] mb-2">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

interface CompareListProps { items: string[]; color: "navy" | "teal"; }
function CompareList({ items, color }: CompareListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
          <CheckCircle2 className={cn("w-4 h-4 flex-shrink-0 mt-0.5", color === "navy" ? "text-[#1E3A5F]" : "text-[#0D9488]")} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function About() {
  return (
    <PublicLayout>
      {/* 1. Hero */}
      <section className="relative bg-gradient-to-br from-[#1E3A5F] via-[#1a4f6e] to-[#0D9488] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          <Badge className="bg-white/20 text-white hover:bg-white/20 border-0 mb-5 text-xs tracking-widest uppercase">Our Story</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
            About <span className="text-[#F59E0B]">Intership</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            India's trusted internship platform built for college students — branch-specific, verified, and transparent.
          </p>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-teal-50 text-[#0D9488] border-teal-200 mb-4">How It Started</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-5 leading-tight">
              Born from a Real Student Problem
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Intership was founded after witnessing firsthand the struggles Indian college students face when
                searching for quality internships. Engineering students from Tier 2 and Tier 3 colleges spent weeks
                on job boards that offered generic, irrelevant listings — or worse, fell victim to fraudulent
                "internships" that demanded money without delivering results.
              </p>
              <p>
                We built Intership to fix exactly that. Our platform offers{" "}
                <span className="font-semibold text-[#1E3A5F]">branch-specific internship matching</span> — so a
                Civil Engineering student from Nagpur or a CSE student from Kochi sees only opportunities
                genuinely relevant to their field.
              </p>
              <p>
                Every internship listing on Intership is{" "}
                <span className="font-semibold text-[#1E3A5F]">reviewed for authenticity</span>. We maintain
                complete transparency around fees, selection criteria, and stipend details so students can make
                informed decisions with confidence.
              </p>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-100 flex flex-col items-center justify-center gap-4 p-8">
              <div className="w-20 h-20 rounded-2xl bg-[#1E3A5F] flex items-center justify-center shadow-lg">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-[#1E3A5F]">500+</p>
                <p className="text-gray-500 text-sm mt-1">Verified Internships Listed</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                  <p className="text-2xl font-bold text-[#0D9488]">200+</p>
                  <p className="text-xs text-gray-500 mt-1">Partner Colleges</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                  <p className="text-2xl font-bold text-[#F59E0B]">15+</p>
                  <p className="text-xs text-gray-500 mt-1">Branches Covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Mission */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <Badge className="bg-[#1E3A5F]/10 text-[#1E3A5F] border-0 mb-4">Our Mission</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
            Connecting Every Student to Opportunity
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We believe that every college student in India deserves a fair shot at a quality internship —
            regardless of which city they study in or which college they attend.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <MissionCard
            icon={<ShieldCheck className="w-6 h-6" />}
            title="Verified Opportunities"
            description="Every internship on our platform is manually reviewed for authenticity. We verify company existence, contact details, and internship legitimacy before listing."
            accent="teal"
          />
          <MissionCard
            icon={<Globe2 className="w-6 h-6" />}
            title="Accessible to All"
            description="Students from any college — Tier 1, Tier 2, or Tier 3 — and any branch can discover internships perfectly matched to their academic background."
            accent="amber"
          />
          <MissionCard
            icon={<Award className="w-6 h-6" />}
            title="Career Readiness"
            description="We prepare students for professional environments with guidance on applications, resumes, and what to expect during the internship journey."
            accent="navy"
          />
        </div>
      </section>

      {/* 4. Problem We Solve */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-red-50 text-red-600 border-red-100 mb-4">The Problem</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              What Students Face Today
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The internship search in India is broken for most students. Here's what we set out to fix.
            </p>
          </div>
          <div className="space-y-4">
            <PainPoint
              icon={<Clock className="w-5 h-5" />}
              text="Students spend weeks — sometimes months — searching across dozens of scattered platforms for internships relevant to their branch and location, with little to no success."
            />
            <PainPoint
              icon={<Filter className="w-5 h-5" />}
              text="Most internship platforms don't filter by engineering branch or academic specialisation. A Mechanical Engineering student is shown the same listings as a Computer Science student."
            />
            <PainPoint
              icon={<AlertTriangle className="w-5 h-5" />}
              text="Fake internship listings are rampant. Students pay upfront fees only to receive fake certificates or no communication at all — wasting time, money, and morale."
            />
          </div>
        </div>
      </section>

      {/* 5. How Intership Helps */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1E3A5F] to-[#0a3352] text-white">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <Badge className="bg-white/20 text-white border-0 mb-4 hover:bg-white/20">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Intership Helps</h2>
          <p className="text-white/75 max-w-2xl mx-auto">A simple 4-step journey from browsing to internship completion.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-white/20 pointer-events-none" />
          <StepCard step={1} title="Create Your Profile" description="Sign up and fill in your academic details — branch, college, year of study, and skills." />
          <StepCard step={2} title="Browse Matched Internships" description="See internships curated specifically for your branch and location with full details upfront." />
          <StepCard step={3} title="Apply with One Click" description="Pay the transparent application fee and submit your application instantly — no hidden steps." />
          <StepCard step={4} title="Get Selected & Earn Certificate" description="Work with the company, complete the internship, and receive a verified completion certificate." />
        </div>
      </section>

      {/* 6. For Students vs For Colleges */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Built for Everyone in the Ecosystem
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Whether you're a student looking for your first internship or a college placement coordinator,
              Intership has you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="h-2 bg-[#0D9488]" />
              <CardContent className="pt-6 pb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-[#0D9488]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3A5F]">For Students</h3>
                </div>
                <CompareList color="teal" items={[
                  "Branch-specific internship recommendations",
                  "Verified and fraud-free listings only",
                  "Transparent fee structure (₹100–₹150 only)",
                  "Real-time application status tracking",
                  "Verified internship completion certificates",
                  "WhatsApp support for queries",
                  "Students from any college can apply",
                  "Mobile-first, easy to use on any device",
                ]} />
                <Button asChild className="mt-6 bg-[#0D9488] hover:bg-teal-700 text-white w-full">
                  <Link to="/internships">Browse Internships <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="h-2 bg-[#1E3A5F]" />
              <CardContent className="pt-6 pb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Search className="w-5 h-5 text-[#1E3A5F]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3A5F]">For Colleges</h3>
                </div>
                <CompareList color="navy" items={[
                  "Placement coordinator dashboard",
                  "Real-time student application tracking",
                  "Branch-wise placement analytics and reports",
                  "Bulk student onboarding support",
                  "Dedicated partnership manager assigned",
                  "College-specific internship campaigns",
                  "Free onboarding for partner colleges",
                  "Priority listing for partnered institutions",
                ]} />
                <Button asChild className="mt-6 bg-[#1E3A5F] hover:bg-[#162d4a] text-white w-full">
                  <Link to="/college-register">Register Your College <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-[#F59E0B]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">Ready to Get Started?</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Join thousands of students who have already found quality internships through Intership. Or bring
            Intership to your college's placement cell today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#0D9488] hover:bg-teal-700 text-white font-semibold px-8">
              <Link to="/browse">Browse Internships <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white font-semibold px-8">
              <Link to="/college-register">Register as College</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
