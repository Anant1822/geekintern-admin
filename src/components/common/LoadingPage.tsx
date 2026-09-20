import { Spinner } from '@/components/ui/spinner'
import { Logo } from './Logo'

interface LoadingPageProps {
  message?: string
}

export function LoadingPage({ message = 'Loading...' }: LoadingPageProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white gap-6">
      <Logo size="lg" />
      <Spinner size="lg" className="text-brand-navy" />
      <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
    </div>
  )
}

export default LoadingPage
