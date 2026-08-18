import { useContext } from 'react'

import {
  AuthContext,
  type AuthContextValue,
} from './authContext'

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuthContext doit être utilisé à l’intérieur de AuthProvider'
    )
  }

  return context
}