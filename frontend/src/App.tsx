import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { useState } from 'react'

import './App.css'

import MainLayout from './layouts/MainLayout'
import CataloguePage from './pages/CataloguePage'
import ErrorBoundary from './components/ErrorBoundary'
import './components/catalogue.css'

import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  type SupportedLanguage,
} from './i18n'

function getInitialLanguage(): SupportedLanguage {
  const params = new URLSearchParams(
    window.location.search
  )

  const requestedLanguage = params.get('lang')

  if (
    requestedLanguage &&
    AVAILABLE_LANGUAGES.includes(
      requestedLanguage as SupportedLanguage
    )
  ) {
    return requestedLanguage as SupportedLanguage
  }

  return DEFAULT_LANGUAGE
}

function App() {
  const [language, setLanguage] =
    useState<SupportedLanguage>(
      getInitialLanguage
    )

  const changeLanguage = (
    newLanguage: SupportedLanguage
  ) => {
    setLanguage(newLanguage)

    const url = new URL(
      window.location.href
    )

    url.searchParams.set(
      'lang',
      newLanguage
    )

    window.history.replaceState(
      {},
      '',
      url
    )
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <MainLayout
                language={language}
                onChangeLanguage={
                  changeLanguage
                }
              />
            }
          >
            <Route
              path="/"
              element={
                <CataloguePage
                  language={language}
                />
              }
            />

            <Route
              path="/produit/:slug"
              element={
                <p>
                  Page détail produit (à venir —
                  Frontend 2)
                </p>
              }
            />

            <Route
              path="/categories"
              element={
                <p>
                  Page catégories (à venir —
                  Frontend 2)
                </p>
              }
            />

            <Route
              path="/shops"
              element={
                <p>
                  Page boutiques (à venir —
                  Frontend 2)
                </p>
              }
            />

            <Route
              path="/login"
              element={
                <p>
                  Page connexion (à venir —
                  Frontend 1)
                </p>
              }
            />

            <Route
              path="/register"
              element={
                <p>
                  Page inscription (à venir —
                  Frontend 1)
                </p>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App