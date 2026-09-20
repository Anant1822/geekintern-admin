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
      isLoading: true,
      isAdmin: false,
      isInitialized: false,

      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setLoading: (isLoading) => set({ isLoading }),
      setAdmin: (isAdmin) => set({ isAdmin }),

      logout: () =>
        set({ user: null, profile: null, isAdmin: false }),

      initialize: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          if (session?.user) {
            let isAdmin = session.user.user_metadata?.role === 'admin' ||
                          session.user.app_metadata?.role === 'admin'
            if (!isAdmin) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single()
              if (profile?.role === 'admin') {
                isAdmin = true
              }
            }
            set({ user: session.user, isAdmin })
          } else {
            set({ user: null, profile: null, isAdmin: false })
          }
        } catch (err) {
          console.warn('Supabase getSession warning:', err)
          set({ user: null, profile: null, isAdmin: false })
        } finally {
          set({ isLoading: false, isInitialized: true })
        }

        // Listen for subsequent auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (session?.user) {
              let isAdmin = session.user.user_metadata?.role === 'admin' ||
                            session.user.app_metadata?.role === 'admin'
              if (!isAdmin) {
                const { data: profile } = await supabase
                  .from('profiles')
                  .select('role')
                  .eq('id', session.user.id)
                  .single()
                if (profile?.role === 'admin') {
                  isAdmin = true
                }
              }
              set({ user: session.user, isAdmin, isInitialized: true })
            } else {
              set({ user: null, profile: null, isAdmin: false, isInitialized: true })
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
