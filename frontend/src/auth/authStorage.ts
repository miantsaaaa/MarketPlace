import type { AuthUser } from './authTypes'

const AUTH_USER_KEY = 'marketplace_auth_user'
const AUTH_TOKEN_KEY = 'marketplace_auth_token'

export function getStoredUser(): AuthUser | null {
  const storedUser = localStorage.getItem(AUTH_USER_KEY)

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as AuthUser
  } catch {
    localStorage.removeItem(AUTH_USER_KEY)
    return null
  }
}

export function saveUser(user: AuthUser): void {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

export function removeStoredUser(): void {
  localStorage.removeItem(AUTH_USER_KEY)
}

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function saveToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function removeStoredToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function clearAuthStorage(): void {
  removeStoredUser()
  removeStoredToken()
}