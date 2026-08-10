import { useCallback, useState } from 'react'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export interface UseApiResult<T> extends UseApiState<T> {
  refetch: () => Promise<void>
}

export function useApi<T>(
  request: () => Promise<T>
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await request()
      setData(result)
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error('Une erreur inconnue est survenue'))
      }
    } finally {
      setLoading(false)
    }
  }, [request])

  return {
    data,
    loading,
    error,
    refetch,
  }
}