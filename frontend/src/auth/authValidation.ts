import type { LoginRequest, RegisterRequest } from './authTypes'

export type LoginFormData = LoginRequest

export interface RegisterFormData extends RegisterRequest {
  confirmPassword: string
}

export type FormErrors<T> = Partial<Record<keyof T, string>>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/

export function validateLoginForm(data: LoginFormData): FormErrors<LoginFormData> {
  const errors: FormErrors<LoginFormData> = {}

  if (!data.email.trim()) {
    errors.email = 'auth.errors.emailRequired'
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'auth.errors.emailInvalid'
  }

  if (!data.password) {
    errors.password = 'auth.errors.passwordRequired'
  }

  return errors
}

export function validateRegisterForm(data: RegisterFormData): FormErrors<RegisterFormData> {
  const errors: FormErrors<RegisterFormData> = {}

  if (!data.firstName.trim()) {
    errors.firstName = 'auth.errors.firstNameRequired'
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'auth.errors.lastNameRequired'
  }

  if (!data.email.trim()) {
    errors.email = 'auth.errors.emailRequired'
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'auth.errors.emailInvalid'
  }

  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'auth.errors.phoneRequired'
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = 'auth.errors.phoneInvalid'
  }

  if (!data.password) {
    errors.password = 'auth.errors.passwordRequired'
  } else if (data.password.length < 6) {
    errors.password = 'auth.errors.passwordTooShort'
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'auth.errors.confirmPasswordRequired'
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'auth.errors.passwordsDoNotMatch'
  }

  return errors
}