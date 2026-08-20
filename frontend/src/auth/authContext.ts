import { createContext } from 'react'

import type {
  AuthState,
  AuthUser,
  LoginRequest,
  RegisterRequest,
  UserRole,
} from './authTypes'

export interface AuthContextValue extends AuthState {
  login: (
    request: LoginRequest
  ) => Promise<AuthUser>

  register: (
    request: RegisterRequest
  ) => Promise<AuthUser>

  logout: () => void

  refreshUser: () => Promise<AuthUser>

  activateSeller: () => Promise<AuthUser>

  activateDelivery: () => Promise<AuthUser>

  hasRole: (
    role: UserRole
  ) => boolean

  hasAnyRole: (
    roles: UserRole[]
  ) => boolean

  hasAllRoles: (
    roles: UserRole[]
  ) => boolean
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined
  )