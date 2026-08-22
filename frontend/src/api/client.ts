import { getStoredToken } from '../auth/authStorage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error(
    'VITE_API_BASE_URL est manquante dans les variables d’environnement.'
  )
}

const normalizedApiBaseUrl =
  API_BASE_URL.replace(/\/+$/, '')

function notifyUnauthorized(): void {
  window.dispatchEvent(
    new CustomEvent('marketplace-auth-unauthorized')
  )
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = getStoredToken()

  const headers = new Headers(options?.headers)
  headers.set(
    'ngrok-skip-browser-warning',
    'true'
  )
  if (
    options?.body !== undefined &&
    !headers.has('Content-Type')
  ) {
    headers.set(
      'Content-Type',
      'application/json'
    )
  }

  /*
   * Ajout du JWT lorsqu'une session existe.
   */
  if (token) {
    headers.set(
      'Authorization',
      `Bearer ${token}`
    )
  }

  const normalizedEndpoint =
    endpoint.startsWith('/')
      ? endpoint
      : `/${endpoint}`

  const response = await fetch(
    `${normalizedApiBaseUrl}${normalizedEndpoint}`,
    {
      ...options,
      headers,
    }
  )

  /*
   * Une réponse 401 indique que la session JWT
   * n'est plus valide.
   */
  if (response.status === 401) {
    notifyUnauthorized()

    throw new Error(
      'Session expirée ou token invalide.'
    )
  }

  /*
   * Les autres erreurs HTTP sont propagées
   * avec le message retourné par l'API lorsqu'il existe.
   */
  if (!response.ok) {
    let message =
      `Erreur API : ${response.status} ${response.statusText}`

    try {
      const errorBody = await response.json()

      if (
        errorBody &&
        typeof errorBody.message === 'string'
      ) {
        message = errorBody.message
      }
    } catch {
      /*
       * Certaines réponses HTTP peuvent ne pas
       * contenir de JSON.
       */
    }

    throw new Error(message)
  }

  /*
   * 204 No Content : aucune donnée JSON à parser.
   */
  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export const apiClient = {
  get<T>(
    endpoint: string
  ): Promise<T> {
    return request<T>(
      endpoint,
      {
        method: 'GET',
      }
    )
  },

  post<T>(
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    return request<T>(
      endpoint,
      {
        method: 'POST',
        body:
          body !== undefined
            ? JSON.stringify(body)
            : undefined,
      }
    )
  },

  put<T>(
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    return request<T>(
      endpoint,
      {
        method: 'PUT',
        body:
          body !== undefined
            ? JSON.stringify(body)
            : undefined,
      }
    )
  },

  patch<T>(
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    return request<T>(
      endpoint,
      {
        method: 'PATCH',
        body:
          body !== undefined
            ? JSON.stringify(body)
            : undefined,
      }
    )
  },

  delete<T>(
    endpoint: string
  ): Promise<T> {
    return request<T>(
      endpoint,
      {
        method: 'DELETE',
      }
    )
  },
}
