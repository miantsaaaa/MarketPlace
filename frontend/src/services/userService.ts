import { apiClient } from '../api/client'

import type { AuthUser } from '../auth/authTypes'

export interface UpdateUserProfileRequest {
  firstName: string
  lastName: string
  phone?: string
}

const USERS_ME_ENDPOINT = '/api/users/me'

export function updateUserProfile(
  payload: UpdateUserProfileRequest
): Promise<AuthUser> {
  const formattedPayload = {
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
    phone: payload.phone?.trim() || undefined,
  }

  return apiClient.put<AuthUser>(
    USERS_ME_ENDPOINT,
    formattedPayload
  )
}