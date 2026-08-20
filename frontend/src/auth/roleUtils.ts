import type {
  AuthUser,
  UserRole,
} from './authTypes'

export function hasRole(
  user: AuthUser | null,
  role: UserRole
): boolean {
  if (!user) {
    return false
  }

  return user.roles.includes(role)
}

export function hasAnyRole(
  user: AuthUser | null,
  roles: UserRole[]
): boolean {
  if (!user) {
    return false
  }

  return roles.some((role) =>
    user.roles.includes(role)
  )
}

export function hasAllRoles(
  user: AuthUser | null,
  roles: UserRole[]
): boolean {
  if (!user) {
    return false
  }

  return roles.every((role) =>
    user.roles.includes(role)
  )
}

export function isAdmin(
  user: AuthUser | null
): boolean {
  return hasRole(user, 'ADMIN')
}

export function isSeller(
  user: AuthUser | null
): boolean {
  return hasRole(user, 'SELLER')
}

export function isDelivery(
  user: AuthUser | null
): boolean {
  return hasRole(user, 'DELIVERY')
}

export function isSupport(
  user: AuthUser | null
): boolean {
  return hasRole(user, 'SUPPORT')
}

export function isBuyer(
  user: AuthUser | null
): boolean {
  return hasRole(user, 'BUYER')
}