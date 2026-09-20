import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto'
  compact?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { icon: 32, text: 'text-lg', subText: 'text-[8px]' },
  md: { icon: 40, text: 'text-xl', subText: 'text-[9px]' },
  lg: { icon: 48, text: 'text-2xl', subText: 'text-[10px]' },
}

export function Logo({ variant = 'auto', compact = false, className, size = 'md' }: LogoProps) {
  const { icon, text, subText } = sizeMap[size]
  const textColor =
    variant === 'light'
      ? 'text-white'
      : variant === 'dark'
      ? 'text-slate-900'
      : 'text-slate-900 dark:text-white'

  return (
    <div className={cn('flex items-center gap-2.5 select-none group', className)}>
      {/* Modern Geek Intern Shield / Hexagon Code Icon */}
      <div
        style={{ width: icon, height: icon }}
        className="relative flex items-center justify-center flex-shrink-0"
      >
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="geekintern-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="60%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="geekintern-accent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <filter id="cf-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2563EB" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Rounded Squircle Container */}
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="24"
            fill="url(#geekintern-grad)"
            filter="url(#cf-shadow)"
          />

          {/* Subtle geometric inner highlight */}
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="22"
            stroke="white"
            strokeOpacity="0.25"
            strokeWidth="2"
          />

          {/* Left bracket '<' */}
          <path
            d="M38 34L25 50L38 66"
            stroke="white"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right bracket '>' */}
          <path
            d="M62 34L75 50L62 66"
            stroke="white"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stylized 'G' / forward accent inside core */}
          <path
            d="M55 36C45 36 43 43 43 50C43 57 46 64 56 64C61 64 64 61 64 57V50H53"
            stroke="url(#geekintern-accent)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Core tech dot */}
          <circle cx="50" cy="50" r="3" fill="white" />
        </svg>
      </div>

      {/* Wordmark and Tagline */}
      {!compact && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center">
            <span className={cn('font-extrabold tracking-tight font-sans', text, textColor)}>
              Geek<span className="text-blue-600">Intern</span>
            </span>
          </div>
          <span className={cn('font-semibold uppercase tracking-[0.2em] text-slate-500 mt-0.5', subText)}>
            Build. Innovate. Excel
          </span>
        </div>
      )}
    </div>
  )
}

export default Logo
