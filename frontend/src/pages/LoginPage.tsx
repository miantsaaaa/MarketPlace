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
  validateLoginForm,
} from '../auth/authValidation'

import type {
  LoginFormData,
  FormErrors,
} from '../auth/authValidation'

import type {
  getTranslations,
} from '../i18n'

import './auth.css'

interface LoginPageProps {
  t: ReturnType<typeof getTranslations>
}

export function LoginPage({
  t,
}: LoginPageProps) {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] =
    useState<LoginFormData>({
      email: '',
      password: '',
    })

  const [errors, setErrors] =
    useState<
      FormErrors<LoginFormData>
    >({})

  const [apiError, setApiError] =
    useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [showPassword, setShowPassword] =
    useState(false)

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
        name as keyof LoginFormData
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
      validateLoginForm(formData)

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    try {
      await login(formData)
      navigate('/')
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        err.message
      ) {
        setApiError(err.message)
      } else {
        setApiError(
          t.auth.errors.loginFailed
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">
        {t.auth.loginTitle}
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

        <button
          type="submit"
          className="auth-button"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t.auth.submitting
            : t.auth.loginSubmit}
        </button>
      </form>

      <div className="auth-footer">
        <span>
          {t.auth.noAccount}
        </span>

        <Link
          to="/register"
          className="auth-link"
        >
          {t.auth.register}
        </Link>
      </div>
    </div>
  )
}