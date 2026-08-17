import { apiClient } from '../api/client'

import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from '../auth/authTypes'

const AUTH_LOGIN_ENDPOINT =
  '/api/auth/login'

const AUTH_REGISTER_ENDPOINT =
  '/api/auth/register'

const AUTH_ME_ENDPOINT =
  '/api/auth/me'

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
): Promise<AuthResponse> {
  const payload = {
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    phone: request.phone,
    password: request.password,
  }

  return apiClient.post<AuthResponse>(
    AUTH_REGISTER_ENDPOINT,
    payload
  )
}

export function getCurrentUser(): Promise<AuthUser> {
  return apiClient.get<AuthUser>(
    AUTH_ME_ENDPOINT
  )
}