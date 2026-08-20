import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

function ProtectedRoute() {
  const {
    isAuthenticated,
    isGuest,
    isLoading,
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
    isGuest
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

  return <Outlet />
}

export default ProtectedRoute