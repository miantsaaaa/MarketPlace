import { useCallback, useState } from 'react'

import {
  DEFAULT_AUTH_STATE,
  type AuthState,
  type AuthUser,
} from '../auth/authTypes'

import {
  getStoredUser,
  removeStoredUser,
  saveUser,
} from '../auth/authStorage'

function getInitialAuthState(): AuthState {
  const user = getStoredUser()

  if (!user) {
    return DEFAULT_AUTH_STATE
  }

  return {
    user,
    isAuthenticated: true,
    isGuest: false,
  }
}

export function useAuth() {
  const [authState, setAuthState] =
    useState<AuthState>(getInitialAuthState)

  const login = useCallback((user: AuthUser) => {
    saveUser(user)

    setAuthState({
      user,
      isAuthenticated: true,
      isGuest: false,
    })
  }, [])

  const logout = useCallback(() => {
    removeStoredUser()

    setAuthState({
      ...DEFAULT_AUTH_STATE,
    })
  }, [])

  return {
    ...authState,
    login,
    logout,
  }
}