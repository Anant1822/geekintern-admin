import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import LoadingPage from '@/components/common/LoadingPage'
import ErrorBoundary from '@/components/common/ErrorBoundary'
// Core login page is loaded eagerly for fastest initial render
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminRoute from '@/components/common/AdminRoute'
import { useAuthInit } from '@/hooks/useAuth'

// Lazy load console sub-routes to split code into fast, lightweight chunks
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminInternships = lazy(() => import('@/pages/admin/AdminInternships'))
const AdminInternshipForm = lazy(() => import('@/pages/admin/AdminInternshipForm'))
const AdminApplications = lazy(() => import('@/pages/admin/AdminApplications'))
const AdminUsers = lazy(() => import('@/pages/admin/AdminUsers'))
const AdminCertificates = lazy(() => import('@/pages/admin/AdminCertificates'))
const AdminOfferLetters = lazy(() => import('@/pages/admin/AdminOfferLetters'))
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'))
const AdminInquiries = lazy(() => import('@/pages/admin/AdminInquiries'))
const AdminMessages = lazy(() => import('@/pages/admin/AdminMessages'))

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
