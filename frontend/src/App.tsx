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
  const [language] = useState<SupportedLanguage>(getInitialLanguage)

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout language={language} />}>
            <Route path="/" element={<CataloguePage language={language} />} />
            <Route
              path="/produit/:slug"
              element={<p>Page détail produit (à venir — Frontend 2)</p>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App