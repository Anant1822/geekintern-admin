import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import LoadingPage from '@/components/common/LoadingPage'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminInternships from '@/pages/admin/AdminInternships'
import AdminInternshipForm from '@/pages/admin/AdminInternshipForm'
import AdminApplications from '@/pages/admin/AdminApplications'
import AdminUsers from '@/pages/admin/AdminUsers'
import AdminCertificates from '@/pages/admin/AdminCertificates'
import AdminOfferLetters from '@/pages/admin/AdminOfferLetters'
import AdminSettings from '@/pages/admin/AdminSettings'
import AdminInquiries from '@/pages/admin/AdminInquiries'
import AdminMessages from '@/pages/admin/AdminMessages'
import { useAuthInit } from '@/hooks/useAuth'

export default function App() {
  useAuthInit()
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* Root defaults to Admin Dashboard */}
          <Route path="/" element={<Navigate to="/admin" replace />} />

          {/* Admin Authentication & Console Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/internships" element={<AdminInternships />} />
          <Route path="/admin/internships/new" element={<AdminInternshipForm />} />
          <Route path="/admin/internships/:id/edit" element={<AdminInternshipForm />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/certificates" element={<AdminCertificates />} />
          <Route path="/admin/offer-letters" element={<AdminOfferLetters />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />
          <Route path="/admin/messages" element={<AdminMessages />} />

          {/* Any other route redirects to admin */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
      <Toaster />
    </ErrorBoundary>
  )
}
