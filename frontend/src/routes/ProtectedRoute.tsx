import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import {
  hasAnyRole,
  hasRole,
} from '../auth/roleUtils'

import type { UserRole } from '../auth/authTypes'

interface ProtectedRouteProps {
  requiredRole?: UserRole
  requiredRoles?: UserRole[]
}

function ProtectedRoute({
  requiredRole,
  requiredRoles,
}: ProtectedRouteProps) {
  const {
    isAuthenticated,
    isGuest,
    isLoading,
    user,
  } = useAuth()

  const location = useLocation()

  if (isLoading) {
    return (
      <div>
        Vérification de la session...
      </div>
    )
  }
 
  if (
    !isAuthenticated ||
    isGuest ||
    !user
  ) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    )
  }

  if (
    !requiredRole &&
    (!requiredRoles ||
      requiredRoles.length === 0)
  ) {
    return <Outlet />
  }

  if (requiredRole) {
    if (!hasRole(user, requiredRole)) {
      return (
        <Navigate
          to="/403"
          replace
          state={{
            from: location,
          }}
        />
      )
    }

    return <Outlet />
  }
 
  if (
    requiredRoles &&
    requiredRoles.length > 0
  ) {
    if (!hasAnyRole(user, requiredRoles)) {
      return (
        <Navigate
          to="/403"
          replace
          state={{
            from: location,
          }}
        />
      )
    }
  }

  return <Outlet />
}

export default ProtectedRoute