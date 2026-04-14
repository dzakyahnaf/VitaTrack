/* src/hooks/useFetch.js */
import { useState, useEffect } from 'react'

export function useFetch(fetchFn) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const executeFetch = async () => {
      try {
        const result = await fetchFn()
        if (!cancelled) {
          setData(result)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to fetch data')
          setLoading(false)
        }
      }
    }

    // Simulate network delay for that "premium" feel with smooth transitions
    const timer = setTimeout(executeFetch, 600)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [fetchFn])

  return { data, loading, error }
}
