import { Link } from 'react-router-dom'
import type { SupportedLanguage } from '../i18n'
import { useAuth } from '../hooks/useAuth'

interface NavbarProps {
  t: ReturnType<typeof import('../i18n').getTranslations>
  language: SupportedLanguage
}

function Navbar({ t }: NavbarProps) {
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

      <div className="navbar-auth">
        {isAuthenticated && !isGuest ? (
          <>
            <span className="navbar-user">
              {user?.firstName}
            </span>
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
