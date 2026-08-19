import { apiClient } from '../api/client'

import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from '../auth/authTypes'

const AUTH_LOGIN_ENDPOINT = '/api/auth/login'

const AUTH_REGISTER_ENDPOINT = '/api/auth/register'

const AUTH_ME_ENDPOINT = '/api/auth/me'

export function login(
  request: LoginRequest
): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>(
    AUTH_LOGIN_ENDPOINT,
    request
  )
}

export function register(
  request: RegisterRequest
): Promise<AuthUser> {
  const payload = {
    firstName: request.firstName.trim(),
    lastName: request.lastName.trim(),
    email: request.email.trim(),
    phone: request.phone?.trim() || undefined,
    password: request.password,
  }

  return apiClient.post<AuthUser>(
    AUTH_REGISTER_ENDPOINT,
    payload
  )
}

export function getCurrentUser(): Promise<AuthUser> {
  return apiClient.get<AuthUser>(
    AUTH_ME_ENDPOINT
  )
}