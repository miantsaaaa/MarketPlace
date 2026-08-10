const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error(
    'VITE_API_BASE_URL n’est pas configurée. Vérifiez le fichier .env.'
  )
}

export const API_CONFIG = {
  baseUrl: API_BASE_URL.replace(/\/$/, ''),
} as const