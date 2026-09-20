import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { authService } from '@/services/auth'

export function useAuth() {
  const store = useAuthStore()

  const signIn = async (email: string, password: string) => {
    const { data, error } = await authService.signIn(email, password)
    if (error) throw error
    return data
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await authService.signUp(email, password, fullName)
    if (error) throw error
    return data
  }

  const signOut = async () => {
    await authService.signOut()
    store.logout()
  }

  const resetPassword = async (email: string) => {
    const { error } = await authService.resetPassword(email)
    if (error) throw error
  }

  return {
    user: store.user,
    profile: store.profile,
    isLoading: store.isLoading,
    isAdmin: store.isAdmin,
    isAuthenticated: !!store.user,
    isInitialized: store.isInitialized,
    signIn,
    signUp,
    signOut,
    resetPassword,
    setProfile: store.setProfile,
  }
}

/** Hook that initialises auth on mount and returns unsubscribe */
export function useAuthInit() {
  const initialize = useAuthStore((s) => s.initialize)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    initialize().then((unsub) => {
      cleanup = unsub
    })
    return () => cleanup?.()
  }, [initialize])
}
