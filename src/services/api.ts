import axios from 'axios'
import { supabase } from '@/lib/supabase'

const customApiUrl = import.meta.env.VITE_API_URL as string
const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
const apiBaseURL = customApiUrl || (isLocalhost ? 'http://localhost:3001/api' : '')

export const isBackendAvailable = !!(customApiUrl || isLocalhost)

const api = axios.create({
  baseURL: apiBaseURL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: isLocalhost ? 5000 : 2500,
})

// Fast reject interceptor if deployed on web without backend server URL configured
api.interceptors.request.use(
  (config) => {
    if (!isBackendAvailable) {
      return Promise.reject(new Error('No backend API configured for remote environment'))
    }
    if (cachedToken) {
      config.headers['Authorization'] = `Bearer ${cachedToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

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



// Response interceptor: pass through or reject
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default api
