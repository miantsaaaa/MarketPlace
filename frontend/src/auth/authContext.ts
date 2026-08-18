import { createContext } from 'react'

import type {
  AuthState,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from './authTypes'

export interface AuthContextValue extends AuthState {
  login: (
    request: LoginRequest
  ) => Promise<AuthUser>

  register: (
    request: RegisterRequest
  ) => Promise<AuthUser>

  logout: () => void
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(undefined)