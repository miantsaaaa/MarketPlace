import { apiClient } from '../api/client'

import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from '../auth/authTypes'

const AUTH_LOGIN_ENDPOINT = '/api/auth/login'

const AUTH_REGISTER_ENDPOINT = '/api/auth/register'

const USERS_ME_ENDPOINT = '/api/users/me'

const SELLER_ROLE_ENDPOINT =
  '/api/users/me/roles/seller'

const DELIVERY_ROLE_ENDPOINT =
  '/api/users/me/roles/delivery'

export interface UpdateCurrentUserRequest {
  firstName: string
  lastName: string
  phone?: string
}

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
    USERS_ME_ENDPOINT
  )
}

export function updateCurrentUser(
  request: UpdateCurrentUserRequest
): Promise<AuthUser> {
  const payload = {
    firstName: request.firstName.trim(),
    lastName: request.lastName.trim(),
    phone: request.phone?.trim() || undefined,
  }

  return apiClient.put<AuthUser>(
    USERS_ME_ENDPOINT,
    payload
  )
}

export function activateSeller(): Promise<AuthUser> {
  return apiClient.post<AuthUser>(
    SELLER_ROLE_ENDPOINT
  )
}

export function activateDelivery(): Promise<AuthUser> {
  return apiClient.post<AuthUser>(
    DELIVERY_ROLE_ENDPOINT
  )
}