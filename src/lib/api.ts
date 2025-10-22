import ky from 'ky'

/**
 * Configured ky instance for API requests
 * Automatically handles JSON, authentication cookies, and errors
 * Note: This is client-side only - cookies are automatically included
 */
export const api = ky.create({
  prefixUrl: '/api',
  timeout: 30000,
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error
        if (response && response.body) {
          try {
            const body = (await response.json()) as {
              error?: string
              message?: string
            }
            error.message = body.error || body.message || error.message
          } catch {
            // Keep original error message if parsing fails
          }
        }
        return error
      },
    ],
  },
})

/**
 * Generic API fetch utility with type safety
 * @template T - The expected response type
 * @param endpoint - API endpoint (without /api prefix)
 * @param options - ky options
 * @returns Typed response data
 */
export async function fetchApi<T>(
  endpoint: string,
  options?: Parameters<typeof api>[1]
): Promise<T> {
  return api(endpoint, options).json<T>()
}

/**
 * Convenience methods for common HTTP verbs
 */
export const apiClient = {
  get: <T>(endpoint: string, options?: Parameters<typeof api.get>[1]) =>
    api.get(endpoint, options).json<T>(),

  post: <T>(
    endpoint: string,
    json?: unknown,
    options?: Parameters<typeof api.post>[1]
  ) => api.post(endpoint, { json, ...options }).json<T>(),

  put: <T>(
    endpoint: string,
    json?: unknown,
    options?: Parameters<typeof api.put>[1]
  ) => api.put(endpoint, { json, ...options }).json<T>(),

  patch: <T>(
    endpoint: string,
    json?: unknown,
    options?: Parameters<typeof api.patch>[1]
  ) => api.patch(endpoint, { json, ...options }).json<T>(),

  delete: <T>(endpoint: string, options?: Parameters<typeof api.delete>[1]) =>
    api.delete(endpoint, options).json<T>(),
}
