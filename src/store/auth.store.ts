import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@supabase/supabase-js'
import type { Student } from '@/types'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  profile: Student | null
  isLoading: boolean
  isAdmin: boolean
  isInitialized: boolean
  // Actions
  setUser: (user: User | null) => void
  setProfile: (profile: Student | null) => void
  setLoading: (loading: boolean) => void
  setAdmin: (isAdmin: boolean) => void
  logout: () => void
  initialize: () => Promise<() => void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isLoading: false,
      isAdmin: true,
      isInitialized: true,

      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setLoading: (isLoading) => set({ isLoading }),
      setAdmin: (isAdmin) => set({ isAdmin }),

      logout: () =>
        set({ user: null, profile: null, isAdmin: false }),

      initialize: async () => {
        try {
          // Restore session on load
          const { data: { session } } = await supabase.auth.getSession()
          if (session?.user) {
            const isAdmin = session.user.user_metadata?.role === 'admin' ||
                            session.user.app_metadata?.role === 'admin'
            set({ user: session.user, isAdmin })
          }
        } catch (err) {
          console.warn('Supabase getSession warning:', err)
        } finally {
          set({ isLoading: false, isInitialized: true })
        }

        // Listen for subsequent auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (session?.user) {
              const isAdmin = session.user.user_metadata?.role === 'admin' ||
                              session.user.app_metadata?.role === 'admin'
              set({ user: session.user, isAdmin })
            } else {
              set({ user: null, profile: null, isAdmin: true })
            }
          }
        )

        return () => subscription.unsubscribe()
      },
    }),
    {
      name: 'intership-auth',
      partialize: (state) => ({
        isAdmin: state.isAdmin,
      }),
    }
  )
)
