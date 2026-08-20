import { apiClient } from '../api/client'
import type { AuthUser } from '../auth/authTypes'
import type { UpdateUserProfileRequest } from '../types/user'

const USER_ME_ENDPOINT = '/api/users/me'
const ACTIVATE_SELLER_ENDPOINT = '/api/users/me/roles/seller'
const ACTIVATE_DELIVERY_ENDPOINT = '/api/users/me/roles/delivery'

/**
 * Récupère le profil complet de l'utilisateur connecté
 */
export function getUserProfile(): Promise<AuthUser> {
  return apiClient.get<AuthUser>(USER_ME_ENDPOINT)
}

/**
 * Met à jour les informations personnelles (prénom, nom, téléphone)
 */
export function updateUserProfile(
  payload: UpdateUserProfileRequest
): Promise<AuthUser> {
  const formattedPayload = {
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
    phone: payload.phone?.trim() || undefined,
  }

  return apiClient.put<AuthUser>(USER_ME_ENDPOINT, formattedPayload)
}

/**
 * Active le rôle SELLER (Vendeur) pour l'utilisateur
 */
export function activateSellerRole(): Promise<AuthUser> {
  return apiClient.post<AuthUser>(ACTIVATE_SELLER_ENDPOINT, {})
}

/**
 * Active le rôle DELIVERY (Livreur) pour l'utilisateur
 */
export function activateDeliveryRole(): Promise<AuthUser> {
  return apiClient.post<AuthUser>(ACTIVATE_DELIVERY_ENDPOINT, {})
}