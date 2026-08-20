import { Link } from 'react-router-dom'

export function ForbiddenPage() {
  return (
    <section>
      <h1>403</h1>

      <h2>Accès refusé</h2>

      <p>
        Vous n'avez pas les permissions nécessaires
        pour accéder à cette page.
      </p>

      <Link to="/">
        Retour à l'accueil
      </Link>
    </section>
  )
}