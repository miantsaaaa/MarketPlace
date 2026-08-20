import { Link } from 'react-router-dom'
import { AVAILABLE_LANGUAGES, getTranslations } from '../i18n'
import type { SupportedLanguage } from '../i18n'
import { useAuth } from '../hooks/useAuth'

interface NavbarProps {
  t: ReturnType<typeof getTranslations>
  language: SupportedLanguage
  onChangeLanguage: (language: SupportedLanguage) => void
}

function Navbar({ t, language, onChangeLanguage }: NavbarProps) {
  const { isAuthenticated, isGuest, user, logout } = useAuth()

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        {t.common.appName}
      </Link>

      <nav className="navbar-links">
        <Link to="/">{t.navigation.home}</Link>
        <Link to="/categories">{t.navigation.categories}</Link>
        <Link to="/shops">{t.navigation.shops}</Link>
      </nav>

      <div className="navbar-language">
        {AVAILABLE_LANGUAGES.map((languageCode) => {
          const languageTranslations = getTranslations(languageCode)

          const label =
            languageCode === 'fr'
              ? languageTranslations.language.french
              : languageCode === 'en'
                ? languageTranslations.language.english
                : languageTranslations.language.malagasySoon

          const isMalagasyPlaceholder = languageCode === 'mg'

          return (
            <button
              key={languageCode}
              type="button"
              className={language === languageCode ? 'active' : ''}
              disabled={isMalagasyPlaceholder}
              onClick={() => onChangeLanguage(languageCode)}
              title={
                isMalagasyPlaceholder
                  ? languageTranslations.language.malagasySoon
                  : undefined
              }
            >
              {label}
            </button>
          )
        })}
      </div>

      <div className="navbar-auth">
        {isAuthenticated && !isGuest ? (
          <>
            <Link to="/profile" className="navbar-user">
              {user?.firstName || user?.email || 'Profil'}
            </Link>
            <button type="button" onClick={logout}>
              {t.auth.logout ?? 'Déconnexion'}
            </button>
          </>
        ) : (
          <>
            <Link to="/login">{t.navigation.login}</Link>
            <Link to="/register">{t.navigation.register}</Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar