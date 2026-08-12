import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

  const changeLanguage = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage)

    const url = new URL(window.location.href)
    url.searchParams.set('lang', newLanguage)
    window.history.replaceState({}, '', url)
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <MainLayout
                language={language}
                onChangeLanguage={changeLanguage}
              />
            }
          >
            <Route path="/" element={<CataloguePage language={language} />} />

            {/*
              Route de préparation pour la tâche "Détail produit" (Frontend 2).
              Le routing et la navigation depuis ProductCard sont déjà en place
              (Frontend 1 — Catalogue). Le contenu réel de cette page sera
              développé lors de la prochaine tâche.
            */}
            <Route
              path="/produit/:slug"
              element={<p>Page détail produit (à venir — Frontend 2)</p>}
            />

            {/* Pages ci-dessous : routes placeholder pour éviter des liens morts
                dans la Navbar. Développement réel à faire par Frontend 2. */}
            <Route
              path="/categories"
              element={<p>Page catégories (à venir — Frontend 2)</p>}
            />
            <Route
              path="/shops"
              element={<p>Page boutiques (à venir — Frontend 2)</p>}
            />
            <Route
              path="/login"
              element={<p>Page connexion (à venir — Frontend 2)</p>}
            />
            <Route
              path="/register"
              element={<p>Page inscription (à venir — Frontend 2)</p>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App