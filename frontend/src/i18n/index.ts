import fr from './fr'
import en from './en'
import mg from './mg'

export const translations = {
  fr,
  en,
  mg,
} as const

export type SupportedLanguage =
  keyof typeof translations

export const DEFAULT_LANGUAGE: SupportedLanguage =
  'fr'

export const AVAILABLE_LANGUAGES:
  SupportedLanguage[] =
  Object.keys(
    translations
  ) as SupportedLanguage[]

export const getTranslations = (
  language: SupportedLanguage =
    DEFAULT_LANGUAGE
) => {
  return translations[language]
}

export { fr, en, mg }