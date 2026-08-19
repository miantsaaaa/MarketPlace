import { useState } from 'react'
import type {
  FormEvent,
  ChangeEvent,
} from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import {
  validateRegisterForm,
} from '../auth/authValidation'

import type {
  RegisterFormData,
  FormErrors,
} from '../auth/authValidation'

import type {
  getTranslations,
} from '../i18n'

import './auth.css'

interface RegisterPageProps {
  t: ReturnType<typeof getTranslations>
}

export function RegisterPage({
  t,
}: RegisterPageProps) {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formData, setFormData] =
    useState<RegisterFormData>({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    })

  const [errors, setErrors] =
    useState<
      FormErrors<RegisterFormData>
    >({})

  const [apiError, setApiError] =
    useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [showPassword, setShowPassword] =
    useState(false)

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const {
      name,
      value,
    } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (
      errors[
        name as keyof RegisterFormData
      ]
    ) {
      setErrors((previous) => ({
        ...previous,
        [name]: undefined,
      }))
    }

    if (apiError) {
      setApiError(null)
    }
  }

  const getTranslationByKey = (
    key?: string
  ): string => {
    if (!key) {
      return ''
    }

    const keys = key.split('.')
    let current: unknown = t

    for (const currentKey of keys) {
      if (
        current &&
        typeof current === 'object' &&
        currentKey in current
      ) {
        current = (
          current as Record<
            string,
            unknown
          >
        )[currentKey]
      } else {
        return key
      }
    }

    return typeof current === 'string'
      ? current
      : key
  }

  const handleSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault()
    setApiError(null)

    const validationErrors =
      validateRegisterForm(formData)

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })

      navigate('/')
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        err.message
      ) {
        setApiError(err.message)
      } else {
        setApiError(
          t.auth.errors.registerFailed
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-container wide">
      <h1 className="auth-title">
        {t.auth.registerTitle}
      </h1>

      {apiError && (
        <div className="auth-alert-error">
          {apiError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="auth-form"
        noValidate
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">
              {t.auth.firstNameLabel}
            </label>

            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={
                t.auth.firstNamePlaceholder
              }
              className={`form-input ${
                errors.firstName
                  ? 'form-input-error'
                  : ''
              }`}
              disabled={isSubmitting}
            />

            {errors.firstName && (
              <span className="error-text">
                {getTranslationByKey(
                  errors.firstName
                )}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">
              {t.auth.lastNameLabel}
            </label>

            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={
                t.auth.lastNamePlaceholder
              }
              className={`form-input ${
                errors.lastName
                  ? 'form-input-error'
                  : ''
              }`}
              disabled={isSubmitting}
            />

            {errors.lastName && (
              <span className="error-text">
                {getTranslationByKey(
                  errors.lastName
                )}
              </span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">
              {t.auth.emailLabel}
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={
                t.auth.emailPlaceholder
              }
              className={`form-input ${
                errors.email
                  ? 'form-input-error'
                  : ''
              }`}
              disabled={isSubmitting}
            />

            {errors.email && (
              <span className="error-text">
                {getTranslationByKey(
                  errors.email
                )}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              {t.auth.phoneLabel}
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={
                t.auth.phonePlaceholder
              }
              className={`form-input ${
                errors.phone
                  ? 'form-input-error'
                  : ''
              }`}
              disabled={isSubmitting}
            />

            {errors.phone && (
              <span className="error-text">
                {getTranslationByKey(
                  errors.phone
                )}
              </span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">
              {t.auth.passwordLabel}
            </label>

            <div className="password-input-wrapper">
              <input
                id="password"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={
                  t.auth.passwordPlaceholder
                }
                className={`form-input ${
                  errors.password
                    ? 'form-input-error'
                    : ''
                }`}
                disabled={isSubmitting}
              />

              <button
                type="button"
                className="password-toggle-btn"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                tabIndex={-1}
                aria-label={
                  showPassword
                    ? t.auth.hidePassword
                    : t.auth.showPassword
                }
              >
                {showPassword ? (
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.038 10.038 0 013.682-.863c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m-1.522 1.282L3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {errors.password && (
              <span className="error-text">
                {getTranslationByKey(
                  errors.password
                )}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              {t.auth.confirmPasswordLabel}
            </label>

            <div className="password-input-wrapper">
              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                name="confirmPassword"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                placeholder={
                  t.auth.passwordPlaceholder
                }
                className={`form-input ${
                  errors.confirmPassword
                    ? 'form-input-error'
                    : ''
                }`}
                disabled={isSubmitting}
              />

              <button
                type="button"
                className="password-toggle-btn"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) => !previous
                  )
                }
                tabIndex={-1}
                aria-label={
                  showConfirmPassword
                    ? t.auth.hidePassword
                    : t.auth.showPassword
                }
              >
                {showConfirmPassword ? (
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.038 10.038 0 013.682-.863c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m-1.522 1.282L3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <span className="error-text">
                {getTranslationByKey(
                  errors.confirmPassword
                )}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="auth-button"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t.auth.submitting
            : t.auth.registerSubmit}
        </button>
      </form>

      <div className="auth-footer">
        <span>
          {t.auth.alreadyAccount}
        </span>

        <Link
          to="/login"
          className="auth-link"
        >
          {t.auth.login}
        </Link>
      </div>
    </div>
  )
}