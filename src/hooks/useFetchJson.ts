import { useEffect, useState } from 'react'

type FetchState<T> = {
  data: T | null
  error: string | null
  loading: boolean
}

export function useFetchJson<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Failed to load ${url}`)
        const json = (await response.json()) as T
        if (!cancelled) setState({ data: json, error: null, loading: false })
      } catch (error) {
        if (!cancelled) {
          setState({
            data: null,
            error: error instanceof Error ? error.message : String(error),
            loading: false,
          })
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [url])

  return state
}
