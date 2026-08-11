import { useState } from 'react'
import './App.css'
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  getTranslations,
  type SupportedLanguage,
} from './i18n'

function getInitialLanguage(): SupportedLanguage {
  const params = new URLSearchParams(window.location.search)
  const requestedLanguage = params.get('lang')

  if (
    requestedLanguage &&
    AVAILABLE_LANGUAGES.includes(requestedLanguage as SupportedLanguage)
  ) {
    return requestedLanguage as SupportedLanguage
  }

  return DEFAULT_LANGUAGE
}

function App() {
  const [language, setLanguage] =
    useState<SupportedLanguage>(getInitialLanguage)

  const t = getTranslations(language)

  const changeLanguage = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage)

    const url = new URL(window.location.href)

    url.searchParams.set('lang', newLanguage)

    window.history.replaceState({}, '', url)
  }

  return (
    <div className="app">
      <main className="app-content">
        <h1>{t.common.appName}</h1>

        <p className="app-status">
          {t.navigation.catalogue}
        </p>

        <p className="app-api">
          {t.common.search}
        </p>

        <div className="language-selector">
          <span>{t.common.language} :</span>

          {AVAILABLE_LANGUAGES.map((languageCode) => {
            const languageTranslations = getTranslations(languageCode)

            const languageLabel =
              languageCode === 'fr'
                ? languageTranslations.language.french
                : languageCode === 'en'
                  ? languageTranslations.language.english
                  : languageTranslations.language.malagasy

            return (
              <button
                key={languageCode}
                type="button"
                className={language === languageCode ? 'active' : ''}
                onClick={() => changeLanguage(languageCode)}
              >
                {languageLabel}
              </button>
            )
          })}
        </div>

        <p className="current-language">
          {t.language.current}:{' '}
          <strong>{language.toUpperCase()}</strong>
        </p>
      </main>
    </div>
  )
}

export default App