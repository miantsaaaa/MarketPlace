import {
  useEffect,
  useState,
  type FormEvent,
} from 'react'

import {
  useAuthContext,
} from '../auth'

import {
  getTranslations,
  type SupportedLanguage,
} from '../i18n'

import {
  updateUserProfile,
} from '../services/userService'

import type {
  AuthUser,
} from '../auth/authTypes'

import './profile.css'

interface ProfilePageProps {
  language: SupportedLanguage
}

interface ProfileFormErrors {
  firstName?: string
  lastName?: string
  phone?: string
}

type ActivatingRole =
  | 'SELLER'
  | 'DELIVERY'
  | null

function ProfilePage({
  language,
}: ProfilePageProps) {
  const {
    user: authUser,
    isLoading: authLoading,
    refreshUser,
    activateSeller,
    activateDelivery,
  } = useAuthContext()

  const t = getTranslations(language)

  const [profile, setProfile] =
    useState<AuthUser | null>(authUser)

  const [firstName, setFirstName] =
    useState('')

  const [lastName, setLastName] =
    useState('')

  const [phone, setPhone] =
    useState('')

  const [loading, setLoading] =
    useState(true)

  const [submitting, setSubmitting] =
    useState(false)

  const [activatingRole, setActivatingRole] =
    useState<ActivatingRole>(null)

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null)

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null)

  const [errors, setErrors] =
    useState<ProfileFormErrors>({})

  /*
   * Synchronise le formulaire avec l'utilisateur
   * déjà présent dans AuthProvider.
   */
  useEffect(() => {
    if (!authUser) {
      return
    }

    setProfile(authUser)
    setFirstName(authUser.firstName ?? '')
    setLastName(authUser.lastName ?? '')
    setPhone(authUser.phone ?? '')
  }, [authUser])

  /*
   * Recharge le profil depuis GET /api/users/me.
   *
   * Cette logique réutilise refreshUser() déjà présent
   * dans AuthProvider au lieu de recréer un getUserProfile().
   */
  useEffect(() => {
    let mounted = true

    async function loadProfile() {
      try {
        setLoading(true)
        setErrorMessage(null)

        const currentUser =
          await refreshUser()

        if (!mounted) {
          return
        }

        setProfile(currentUser)
        setFirstName(
          currentUser.firstName ?? ''
        )
        setLastName(
          currentUser.lastName ?? ''
        )
        setPhone(
          currentUser.phone ?? ''
        )
      } catch (error: unknown) {
        if (!mounted) {
          return
        }

        const message =
          error instanceof Error
            ? error.message
            : 'Impossible de récupérer le profil.'

        setErrorMessage(message)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    /*
     * AuthProvider doit avoir terminé la restauration
     * de session avant de demander le profil.
     */
    if (!authLoading) {
      void loadProfile()
    }

    return () => {
      mounted = false
    }
  }, [
    authLoading,
    refreshUser,
  ])

  function validateForm(): boolean {
    const newErrors: ProfileFormErrors = {}

    if (!firstName.trim()) {
      newErrors.firstName =
        t.profile.validation.firstNameRequired
    }

    if (!lastName.trim()) {
      newErrors.lastName =
        t.profile.validation.lastNameRequired
    }

    if (
      phone.trim() &&
      !/^[+]?[0-9\s-]{8,15}$/.test(
        phone.trim()
      )
    ) {
      newErrors.phone =
        t.profile.validation.invalidPhone
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  async function handleUpdateProfile(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setSuccessMessage(null)
    setErrorMessage(null)

    if (!validateForm()) {
      return
    }

    try {
      setSubmitting(true)

      /*
       * PUT /api/users/me
       */
      await updateUserProfile({
        firstName,
        lastName,
        phone,
      })

      /*
       * Rechargement du profil via GET /api/users/me
       * afin de garder AuthProvider synchronisé.
       */
      const updatedUser =
        await refreshUser()

      setProfile(updatedUser)

      setSuccessMessage(
        t.profile.updateSuccess
      )

      setErrors({})
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Impossible de mettre à jour le profil.'

      setErrorMessage(message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleActivateRole(
    role: 'SELLER' | 'DELIVERY'
  ) {
    setSuccessMessage(null)
    setErrorMessage(null)

    /*
     * Protection supplémentaire côté interface.
     * Le backend reste évidemment l'autorité.
     */
    if (
      role === 'SELLER' &&
      profile?.roles.includes('SELLER')
    ) {
      return
    }

    if (
      role === 'DELIVERY' &&
      profile?.roles.includes('DELIVERY')
    ) {
      return
    }

    try {
      setActivatingRole(role)

      /*
       * Réutilisation des méthodes existantes
       * de AuthProvider.
       */
      if (role === 'SELLER') {
        await activateSeller()
      } else {
        await activateDelivery()
      }

      /*
       * AuthProvider est déjà mis à jour par
       * activateSeller / activateDelivery.
       *
       * On récupère ensuite la version fraîche
       * du profil pour l'état local.
       */
      const updatedUser =
        await refreshUser()

      setProfile(updatedUser)

      setSuccessMessage(
        t.profile.roleSuccess
      )
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Impossible d’activer ce rôle.'

      setErrorMessage(message)
    } finally {
      setActivatingRole(null)
    }
  }

  if (loading || authLoading) {
    return (
      <main className="profile-container">
        <div className="profile-loading">
          <p>{t.common.loading}</p>
        </div>
      </main>
    )
  }

  const currentUser =
    profile ?? authUser

  if (!currentUser) {
    return (
      <main className="profile-container">
        <div className="profile-card">
          <p>
            Impossible de récupérer les
            informations du profil.
          </p>
        </div>
      </main>
    )
  }

  const hasSellerRole =
    currentUser.roles.includes('SELLER')

  const hasDeliveryRole =
    currentUser.roles.includes('DELIVERY')

  const translatedStatus =
    t.profile.statusText[
      currentUser.status
    ]

  return (
    <main className="profile-container">
      <header className="profile-header">
        <div>
          <p className="profile-eyebrow">
            {t.profile.personalInfo}
          </p>

          <h1>
            {t.profile.title}
          </h1>

          <p className="profile-subtitle">
            {t.profile.subtitle}
          </p>
        </div>
      </header>

      {successMessage && (
        <div
          className="profile-alert profile-alert-success"
          role="status"
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          className="profile-alert profile-alert-error"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <section className="profile-card">
        <div className="profile-card-header">
          <h2>
            {t.profile.personalInfo}
          </h2>
        </div>

        <div className="profile-summary">
          <div className="profile-summary-item">
            <span className="profile-meta-label">
              {t.profile.email}
            </span>

            <span className="profile-meta-value">
              {currentUser.email}
            </span>
          </div>

          <div className="profile-summary-item">
            <span className="profile-meta-label">
              {t.profile.status}
            </span>

            <span
              className={`profile-badge profile-badge-status-${currentUser.status.toLowerCase()}`}
            >
              {translatedStatus}
            </span>
          </div>

          <div className="profile-summary-item">
            <span className="profile-meta-label">
              {t.profile.roles}
            </span>

            <div className="profile-roles">
              {currentUser.roles.map(
                (role) => (
                  <span
                    key={role}
                    className="profile-badge profile-badge-role"
                  >
                    {role}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <form
          className="profile-form"
          onSubmit={handleUpdateProfile}
          noValidate
        >
          <div className="profile-form-grid">
            <div className="profile-field">
              <label htmlFor="profile-first-name">
                {t.profile.firstName}
              </label>

              <input
                id="profile-first-name"
                type="text"
                value={firstName}
                onChange={(event) =>
                  setFirstName(
                    event.target.value
                  )
                }
                disabled={submitting}
                aria-invalid={
                  Boolean(errors.firstName)
                }
              />

              {errors.firstName && (
                <span className="profile-field-error">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="profile-field">
              <label htmlFor="profile-last-name">
                {t.profile.lastName}
              </label>

              <input
                id="profile-last-name"
                type="text"
                value={lastName}
                onChange={(event) =>
                  setLastName(
                    event.target.value
                  )
                }
                disabled={submitting}
                aria-invalid={
                  Boolean(errors.lastName)
                }
              />

              {errors.lastName && (
                <span className="profile-field-error">
                  {errors.lastName}
                </span>
              )}
            </div>

            <div className="profile-field profile-field-full">
              <label htmlFor="profile-email">
                {t.profile.email}
              </label>

              <input
                id="profile-email"
                type="email"
                value={currentUser.email}
                disabled
                readOnly
              />
            </div>

            <div className="profile-field profile-field-full">
              <label htmlFor="profile-phone">
                {t.profile.phone}
              </label>

              <input
                id="profile-phone"
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value
                  )
                }
                disabled={submitting}
                aria-invalid={
                  Boolean(errors.phone)
                }
              />

              {errors.phone && (
                <span className="profile-field-error">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>

          <div className="profile-form-actions">
            <button
              type="submit"
              className="profile-button profile-button-primary"
              disabled={submitting}
            >
              {submitting
                ? t.profile.saving
                : t.profile.saveChanges}
            </button>
          </div>
        </form>
      </section>

      <section className="profile-card">
        <div className="profile-card-header">
          <h2>
            {t.profile.rolesSection}
          </h2>
        </div>

        <div className="profile-role-grid">
          <article className="profile-role-card">
            <div>
              <h3>
                {t.profile.sellerRoleTitle}
              </h3>

              <p>
                {t.profile.sellerRoleDesc}
              </p>
            </div>

            {hasSellerRole ? (
              <button
                type="button"
                className="profile-button profile-button-secondary"
                disabled
              >
                {t.profile.alreadyActive}
              </button>
            ) : (
              <button
                type="button"
                className="profile-button profile-button-primary"
                onClick={() =>
                  void handleActivateRole(
                    'SELLER'
                  )
                }
                disabled={
                  activatingRole !== null
                }
              >
                {activatingRole === 'SELLER'
                  ? t.profile.activating
                  : t.profile.activateSeller}
              </button>
            )}
          </article>

          <article className="profile-role-card">
            <div>
              <h3>
                {t.profile.deliveryRoleTitle}
              </h3>

              <p>
                {t.profile.deliveryRoleDesc}
              </p>
            </div>

            {hasDeliveryRole ? (
              <button
                type="button"
                className="profile-button profile-button-secondary"
                disabled
              >
                {t.profile.alreadyActive}
              </button>
            ) : (
              <button
                type="button"
                className="profile-button profile-button-primary"
                onClick={() =>
                  void handleActivateRole(
                    'DELIVERY'
                  )
                }
                disabled={
                  activatingRole !== null
                }
              >
                {activatingRole ===
                'DELIVERY'
                  ? t.profile.activating
                  : t.profile.activateDelivery}
              </button>
            )}
          </article>
        </div>
      </section>
    </main>
  )
}

export default ProfilePage