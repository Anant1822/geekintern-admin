import axios from 'axios'
import { supabase } from '@/lib/supabase'

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

let cachedToken: string | null = null

// Keep cached token updated in sync with auth state
supabase.auth.onAuthStateChange((_event, session) => {
  cachedToken = session?.access_token || null
})

// Immediately seed token from existing session if available
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.access_token) {
    cachedToken = session.access_token
  }
})

// Request interceptor: attach JWT token fast without blocking async calls
api.interceptors.request.use(
  (config) => {
    if (cachedToken) {
      config.headers['Authorization'] = `Bearer ${cachedToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: pass through or reject
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default api
