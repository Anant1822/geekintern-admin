import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ShieldAlert, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert } from '@/components/ui/alert'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/auth'
import { cn } from '@/lib/utils'

// ── Schema ─────────────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type LoginForm = z.infer<typeof loginSchema>

// ── Component ──────────────────────────────────────────────────────────────
export default function AdminLogin() {
  const navigate = useNavigate()
  const { signIn, signOut } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginForm) => {
    setServerError(null)
    try {
      await signIn(data.email, data.password)

      // Check role from fresh session
      const { data: { user } } = await authService.getUser()
      const role = user?.user_metadata?.role ?? user?.app_metadata?.role

      if (role !== 'admin') {
        await signOut()
        setServerError('Unauthorized: your account does not have admin privileges.')
        return
      }

      navigate('/admin', { replace: true })
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Login failed. Check your credentials.'
      setServerError(message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-[#1a3357] to-[#0f2340] flex items-center justify-center p-4">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand-teal/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-amber/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center">
            <Logo variant="light" size="md" />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
              <p className="text-sm text-white/55">Sign in to manage the platform</p>
            </div>
            <Badge className="bg-red-500/20 text-red-300 border border-red-500/40 px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5" />
              Restricted Access
            </Badge>
          </div>

          {/* Error */}
          {serverError && (
            <Alert variant="destructive" className="border-red-400/40 bg-red-500/15 text-red-200 text-sm">
              {serverError}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-white/80 text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="anantmaxx@gmail.com"
                defaultValue="anantmaxx@gmail.com"
                {...register('email')}
                className={cn(
                  'bg-white/10 border-white/20 text-white placeholder:text-white/35 focus:border-brand-teal focus:ring-brand-teal/30',
                  errors.email && 'border-red-400/60'
                )}
              />
              {errors.email && (
                <p className="text-xs text-red-300">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-white/80 text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register('password')}
                  className={cn(
                    'bg-white/10 border-white/20 text-white placeholder:text-white/35 pr-10 focus:border-brand-teal focus:ring-brand-teal/30',
                    errors.password && 'border-red-400/60'
                  )}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-300">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold h-11 rounded-lg mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In to Admin Portal'
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-white/30">
            This area is restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  )
}
