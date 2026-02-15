import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireApproval?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireApproval = false,
  requireAdmin = false,
  redirectTo
}) => {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-muted">Učitavanje...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If we have a user but no profile, and we're not requiring approval/admin, allow access
  // This handles cases where profile fetch fails but user is authenticated
  if (!profile && !requireApproval && !requireAdmin) {
    return <>{children}</>
  }

  if (!profile) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && profile.role !== 'admin') {
    return <Navigate to={redirectTo || "/dashboard"} replace />
  }

  // If user is pending and trying to access something that requires approval, redirect to pending page
  if (requireApproval && profile.status === 'pending') {
    return <Navigate to="/pending-approval" replace />
  }

  // If user is rejected, always redirect to pending page
  if (profile.status === 'rejected') {
    return <Navigate to="/pending-approval" replace />
  }

  return <>{children}</>
}