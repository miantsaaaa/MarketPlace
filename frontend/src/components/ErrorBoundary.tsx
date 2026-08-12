import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  message: string
  isConfigError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: '',
    isConfigError: false,
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const message =
      error instanceof Error ? error.message : 'Une erreur inattendue est survenue.'

    // On ne suppose pas systématiquement un problème de config :
    // on ne le signale que si le message correspond vraiment à ce cas.
    const isConfigError = message.includes('VITE_API_BASE_URL')

    return { hasError: true, message, isConfigError }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>
            {this.state.isConfigError
              ? 'Configuration manquante'
              : 'Une erreur est survenue'}
          </h2>

          <p>{this.state.message}</p>

          {this.state.isConfigError && (
            <p>
              Vérifie que le fichier <code>.env</code> contient bien
              <code> VITE_API_BASE_URL</code>.
            </p>
          )}

          {!this.state.isConfigError && (
            <p>
              Essaie de recharger la page. Si le problème persiste,
              contacte l'équipe technique.
            </p>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary