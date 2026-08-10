import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  message: string
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: '',
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const message =
      error instanceof Error ? error.message : 'Erreur inconnue'

    return { hasError: true, message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Configuration manquante</h2>
          <p>{this.state.message}</p>
          <p>
            Vérifie que le fichier <code>.env</code> contient bien
            <code> VITE_API_BASE_URL</code>.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
