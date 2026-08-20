import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../auth'
import { getTranslations, type SupportedLanguage } from '../i18n'
import {
  activateDeliveryRole,
  activateSellerRole,
  getUserProfile,
  updateUserProfile,
} from '../services/userService'
import type { AuthUser } from '../auth/authTypes'
import './profile.css'

export const ProfilePage: React.FC = () => {
  const { user: authUser } = useAuthContext()
  const [profile, setProfile] = useState<AuthUser | null>(authUser)

  const currentLang: SupportedLanguage = 'fr'
  const t = getTranslations(currentLang)

  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [activatingRole, setActivatingRole] = useState<'SELLER' | 'DELIVERY' | null>(null)

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; phone?: string }>({})

  useEffect(() => {
    let isMounted = true

    const fetchProfile = async () => {
      try {
        setLoading(true)
        const profileData = await getUserProfile()
        if (isMounted) {
          setProfile(profileData)
          setFirstName(profileData.firstName || '')
          setLastName(profileData.lastName || '')
          setPhone(profileData.phone || '')
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Error fetching profile'
          setErrorMessage(message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchProfile()

    return () => {
      isMounted = false
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: { firstName?: string; lastName?: string; phone?: string } = {}

    if (!firstName.trim()) {
      newErrors.firstName = t.profile.validation.firstNameRequired
    }

    if (!lastName.trim()) {
      newErrors.lastName = t.profile.validation.lastNameRequired
    }

    if (phone.trim() && !/^[+]?[0-9\s-]{8,15}$/.test(phone.trim())) {
      newErrors.phone = t.profile.validation.invalidPhone
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage(null)
    setErrorMessage(null)

    if (!validateForm()) {
      return
    }

    try {
      setSubmitting(true)
      const updatedUser = await updateUserProfile({
        firstName,
        lastName,
        phone: phone || undefined,
      })
      setProfile(updatedUser)
      setSuccessMessage(t.profile.updateSuccess)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error updating profile'
      setErrorMessage(message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleActivateRole = async (role: 'SELLER' | 'DELIVERY') => {
    setSuccessMessage(null)
    setErrorMessage(null)
    setActivatingRole(role)

    try {
      let updatedUser: AuthUser
      if (role === 'SELLER') {
        updatedUser = await activateSellerRole()
      } else {
        updatedUser = await activateDeliveryRole()
      }
      setProfile(updatedUser)
      setSuccessMessage(t.profile.roleSuccess)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error activating role'
      setErrorMessage(message)
    } finally {
      setActivatingRole(null)
    }
  }

  if (loading) {
    return (
      <div className="profile-container">
        <p>{t.common.loading}</p>
      </div>
    )
  }

  const currentUser = profile || authUser

  const hasSellerRole = currentUser?.roles?.includes('SELLER')
  const hasDeliveryRole = currentUser?.roles?.includes('DELIVERY')

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{t.profile.title}</h1>
        <p>{t.profile.subtitle}</p>
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

      <div className="profile-card">
        <h2>{t.profile.personalInfo}</h2>

        <div className="profile-meta">
          <div className="meta-item">
            <span className="meta-label">{t.profile.email}</span>
            <span>{currentUser?.email}</span>
          </div>

          <div className="meta-item">
            <span className="meta-label">{t.profile.status}</span>
            <div>
              <span className={`badge badge-status-${currentUser?.status?.toLowerCase()}`}>
                {currentUser?.status
                  ? t.profile.statusText[currentUser.status as keyof typeof t.profile.statusText]
                  : ''}
              </span>
            </div>
          </div>

          <div className="meta-item">
            <span className="meta-label">{t.profile.roles}</span>
            <div className="roles-list">
              {currentUser?.roles?.map((role: string) => (
                <span key={role} className="badge badge-role">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label htmlFor="firstName">{t.profile.firstName}</label>
            <input
              id="firstName"
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">{t.profile.lastName}</label>
            <input
              id="lastName"
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t.profile.phone}</label>
            <input
              id="phone"
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+261340000000"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? t.profile.saving : t.profile.saveChanges}
          </button>
        </form>
      </div>

      <div className="profile-card">
        <h2>{t.profile.rolesSection}</h2>

        <div className="role-activation-grid">
          <div className="role-card">
            <div>
              <h3>{t.profile.sellerRoleTitle}</h3>
              <p>{t.profile.sellerRoleDesc}</p>
            </div>
            {hasSellerRole ? (
              <button className="btn-secondary" disabled>
                {t.profile.alreadyActive}
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={() => handleActivateRole('SELLER')}
                disabled={activatingRole === 'SELLER'}
              >
                {activatingRole === 'SELLER' ? t.profile.activating : t.profile.activateSeller}
              </button>
            )}
          </div>

          <div className="role-card">
            <div>
              <h3>{t.profile.deliveryRoleTitle}</h3>
              <p>{t.profile.deliveryRoleDesc}</p>
            </div>
            {hasDeliveryRole ? (
              <button className="btn-secondary" disabled>
                {t.profile.alreadyActive}
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={() => handleActivateRole('DELIVERY')}
                disabled={activatingRole === 'DELIVERY'}
              >
                {activatingRole === 'DELIVERY'
                  ? t.profile.activating
                  : t.profile.activateDelivery}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}