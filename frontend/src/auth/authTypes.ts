export type UserStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SUSPENDED'
  | 'BANNED'

export type UserRole =
  | 'BUYER'
  | 'SELLER'
  | 'DELIVERY'
  | 'SUPPORT'
  | 'ADMIN'

export interface AuthUser {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string | null
  status: UserStatus
  roles: UserRole[]
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isGuest: boolean
  isLoading: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

export const DEFAULT_AUTH_STATE: AuthState = {
  user: null,
  isAuthenticated: false,
  isGuest: true,
  isLoading: true,
}