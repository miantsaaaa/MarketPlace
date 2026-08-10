import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import type { SupportedLanguage } from '../i18n'
import { getTranslations } from '../i18n'

interface MainLayoutProps {
  language: SupportedLanguage
}

function MainLayout({ language }: MainLayoutProps) {
  const t = getTranslations(language)

  return (
    <div className="catalogue-layout">
      <Navbar t={t} language={language} />
      <main className="catalogue-layout-content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout