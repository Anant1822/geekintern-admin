import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Stat {
  label: string
  value: number
  suffix?: string
  prefix?: string
}

const DEFAULT_STATS: Stat[] = [
  { label: 'Students Registered', value: 5000, suffix: '+' },
  { label: 'Internship Listings', value: 200, suffix: '+' },
  { label: 'Partner Colleges', value: 50, suffix: '+' },
  { label: 'Successful Placements', value: 1000, suffix: '+' },
]

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

function StatCounter({ value, suffix = '', prefix = '', duration = 1500 }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const steps = 60
    const increment = value / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [hasStarted, value, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  )
}

interface StatsSectionProps {
  stats?: Stat[]
  className?: string
  dark?: boolean
}

export function StatsSection({ stats = DEFAULT_STATS, className, dark = false }: StatsSectionProps) {
  return (
    <div className={cn('py-12', className)}>
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className={cn(
                'text-4xl sm:text-5xl font-extrabold mb-2',
                dark ? 'text-white' : 'text-brand-navy'
              )}>
                <StatCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </p>
              <p className={cn(
                'text-sm font-medium',
                dark ? 'text-white/70' : 'text-muted-foreground'
              )}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default StatsSection
