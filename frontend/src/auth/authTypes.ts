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
}

export const DEFAULT_AUTH_STATE: AuthState = {
  user: null,
  isAuthenticated: false,
  isGuest: true,
}