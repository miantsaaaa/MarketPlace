import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import { useState } from 'react'

import './App.css'

import MainLayout from './layouts/MainLayout'
import CataloguePage from './pages/CataloguePage'

import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'

import { ForbiddenPage } from './pages/ForbiddenPage'

import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './routes/ProtectedRoute'

import './components/catalogue.css'

import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  getTranslations,
  type SupportedLanguage,
} from './i18n'

function getInitialLanguage(): SupportedLanguage {
  const params = new URLSearchParams(
    window.location.search
  )

  const requestedLanguage =
    params.get('lang')

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

  const t = getTranslations(language)

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
                  Page détail produit
                  (à venir — Frontend 2)
                </p>
              }
            />

            <Route
              path="/categories"
              element={
                <p>
                  Page catégories
                  (à venir — Frontend 2)
                </p>
              }
            />

            <Route
              path="/shops"
              element={
                <p>
                  Page boutiques
                  (à venir — Frontend 2)
                </p>
              }
            />

            <Route
              path="/login"
              element={
                <LoginPage t={t} />
              }
            />

            <Route
              path="/register"
              element={
                <RegisterPage t={t} />
              }
            />

            <Route
              path="/403"
              element={
                <ForbiddenPage />
              }
            />

            {/* Toute personne authentifiée */}
            <Route
              element={
                <ProtectedRoute />
              }
            >
              <Route
                path="/profile"
                element={
                  <ProfilePage
                    language={language}
                  />
                }
              />

              <Route
                path="/private"
                element={
                  <div>
                    <h1>
                      Zone privée
                    </h1>

                    <p>
                      Accessible à tout
                      utilisateur
                      authentifié.
                    </p>
                  </div>
                }
              />
            </Route>

            {/* ADMIN */}
            <Route
              element={
                <ProtectedRoute
                  requiredRole="ADMIN"
                />
              }
            >
              <Route
                path="/admin"
                element={
                  <div>
                    <h1>
                      Zone ADMIN
                    </h1>

                    <p>
                      Accessible uniquement
                      au rôle ADMIN.
                    </p>
                  </div>
                }
              />
            </Route>

            {/* SELLER */}
            <Route
              element={
                <ProtectedRoute
                  requiredRole="SELLER"
                />
              }
            >
              <Route
                path="/seller"
                element={
                  <div>
                    <h1>
                      Zone SELLER
                    </h1>

                    <p>
                      Accessible aux
                      utilisateurs ayant
                      le rôle SELLER.
                    </p>
                  </div>
                }
              />
            </Route>

            {/* DELIVERY */}
            <Route
              element={
                <ProtectedRoute
                  requiredRole="DELIVERY"
                />
              }
            >
              <Route
                path="/delivery"
                element={
                  <div>
                    <h1>
                      Zone DELIVERY
                    </h1>

                    <p>
                      Accessible aux
                      utilisateurs ayant
                      le rôle DELIVERY.
                    </p>
                  </div>
                }
              />
            </Route>

            {/* SUPPORT */}
            <Route
              element={
                <ProtectedRoute
                  requiredRole="SUPPORT"
                />
              }
            >
              <Route
                path="/support"
                element={
                  <div>
                    <h1>
                      Zone SUPPORT
                    </h1>

                    <p>
                      Accessible aux
                      utilisateurs ayant
                      le rôle SUPPORT.
                    </p>
                  </div>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App