import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Globe, MessageCircle, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 text-slate-700 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo variant="dark" size="md" className="mb-4" />
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Geek Intern delivers industry-standard virtual internships, verified certifications, and career acceleration tools empowering learners worldwide to build real projects and launch engineering careers.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link to="/apply">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
                  <span>Start Your Internship</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
              <span className="text-slate-300">•</span>
              <Link to="/verify">
                <span className="text-xs font-bold text-slate-600 hover:text-slate-900">
                  Verify Credentials
                </span>
              </Link>
            </div>
          </div>

          {/* Internships Column */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-wider">
              Internships
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link to="/apply" className="hover:text-blue-600 transition-colors">
                  Apply for Internship
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-blue-600 transition-colors">
                  Internship Tracks
                </Link>
              </li>
              <li>
                <Link to="/internships/guidelines" className="hover:text-blue-600 transition-colors">
                  Internship Guidelines
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-600 transition-colors font-medium text-blue-600">
                  Student Certificate Portal
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-blue-600 transition-colors">
                  Certificate Verification
                </Link>
              </li>
              <li>
                <Link to="/verify-offer-letter" className="hover:text-blue-600 transition-colors">
                  Offer Letter Verification
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Training & Portfolio */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link to="/web-portfolio" className="hover:text-blue-600 transition-colors">
                  Web Portfolio
                </Link>
              </li>
              <li>
                <Link to="/app-portfolio" className="hover:text-blue-600 transition-colors">
                  App Portfolio
                </Link>
              </li>
              <li>
                <Link to="/core-portfolio" className="hover:text-blue-600 transition-colors">
                  Core Engineering Portfolio
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 transition-colors">
                  Our Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">
                  About Geek Intern
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-blue-600 transition-colors">
                  Team Geek Intern
                </Link>
              </li>
              <li>
                <Link to="/student-reviews" className="hover:text-blue-600 transition-colors">
                  Student Reviews
                </Link>
              </li>
              <li>
                <Link to="/college-register" className="hover:text-blue-600 transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-slate-200" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <p>&copy; {currentYear} Geek Intern. All rights reserved.</p>
            <span>•</span>
            <Link to="/admin/login" className="text-slate-400 hover:text-slate-600 transition-colors">
              Admin Portal
            </Link>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
          <p className="text-slate-500">Empowering 1M+ Developers Across 25+ Countries</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
