import { useAuthContext } from '../auth/useAuthContext'

export function useAuth() {
  return useAuthContext()
}