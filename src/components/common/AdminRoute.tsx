import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import LoadingPage from './LoadingPage'

interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAdmin, isInitialized, isLoading } = useAuth()
  const location = useLocation()

  if (!isInitialized || isLoading) {
    return <LoadingPage message="Checking administrator privileges..." />
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default AdminRoute
