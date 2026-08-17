import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  DEFAULT_AUTH_STATE,
  type AuthState,
  type AuthUser,
  type LoginRequest,
  type RegisterRequest,
} from './authTypes'

import {
  clearAuthStorage,
  getStoredToken,
  saveToken,
  saveUser,
} from './authStorage'

import {
  getCurrentUser,
  login as loginRequest,
  register as registerRequest,
} from '../services/authService'

import { AuthContext } from './authContext'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [authState, setAuthState] =
    useState<AuthState>(DEFAULT_AUTH_STATE)

  const logout = useCallback(() => {
    clearAuthStorage()

    setAuthState({
      ...DEFAULT_AUTH_STATE,
      isLoading: false,
    })
  }, [])

  useEffect(() => {
    let mounted = true

    async function restoreSession() {
      const token = getStoredToken()

      if (!token) {
        if (mounted) {
          setAuthState({
            ...DEFAULT_AUTH_STATE,
            isLoading: false,
          })
        }

        return
      }

      try {
        const user = await getCurrentUser()

        if (!mounted) {
          return
        }

        saveUser(user)

        setAuthState({
          user,
          isAuthenticated: true,
          isGuest: false,
          isLoading: false,
        })
      } catch {
        if (!mounted) {
          return
        }

        clearAuthStorage()

        setAuthState({
          ...DEFAULT_AUTH_STATE,
          isLoading: false,
        })
      }
    }

    void restoreSession()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const handleUnauthorized = () => {
      logout()
    }

    window.addEventListener(
      'marketplace-auth-unauthorized',
      handleUnauthorized
    )

    return () => {
      window.removeEventListener(
        'marketplace-auth-unauthorized',
        handleUnauthorized
      )
    }
  }, [logout])

  const login = useCallback(
    async (
      request: LoginRequest
    ): Promise<AuthUser> => {
      const response = await loginRequest(request)

      saveToken(response.token)
      saveUser(response.user)

      setAuthState({
        user: response.user,
        isAuthenticated: true,
        isGuest: false,
        isLoading: false,
      })

      return response.user
    },
    []
  )

  const register = useCallback(
    async (
      request: RegisterRequest
    ): Promise<AuthUser> => {
      const response =
        await registerRequest(request)

      saveToken(response.token)
      saveUser(response.user)

      setAuthState({
        user: response.user,
        isAuthenticated: true,
        isGuest: false,
        isLoading: false,
      })

      return response.user
    },
    []
  )

  const value = useMemo(
    () => ({
      ...authState,
      login,
      register,
      logout,
    }),
    [
      authState,
      login,
      register,
      logout,
    ]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}