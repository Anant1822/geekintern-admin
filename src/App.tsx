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
import AdminRoute from '@/components/common/AdminRoute'
import { useAuthInit } from '@/hooks/useAuth'

export default function App() {
  useAuthInit()
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* Admin Authentication Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/login" element={<AdminLogin />} />

          {/* Protected Admin Console Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/internships" element={<AdminRoute><AdminInternships /></AdminRoute>} />
          <Route path="/admin/internships/new" element={<AdminRoute><AdminInternshipForm /></AdminRoute>} />
          <Route path="/admin/internships/:id/edit" element={<AdminRoute><AdminInternshipForm /></AdminRoute>} />
          <Route path="/admin/applications" element={<AdminRoute><AdminApplications /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/certificates" element={<AdminRoute><AdminCertificates /></AdminRoute>} />
          <Route path="/admin/offer-letters" element={<AdminRoute><AdminOfferLetters /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
          <Route path="/admin/inquiries" element={<AdminRoute><AdminInquiries /></AdminRoute>} />
          <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />

          {/* Any other route redirects to /admin */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
      <Toaster />
    </ErrorBoundary>
  )
}
