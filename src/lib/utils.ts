import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isPast, parseISO } from 'date-fns'
import type { ApplicationStatus, WorkMode, PaymentStatus } from '@/types'

/** Merge Tailwind classes without conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a number as Indian Rupee currency */
export function formatCurrency(amount: number | undefined | null): string {
  if (amount === undefined || amount === null) return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Format an ISO date string to readable format */
export function formatDate(dateString: string | undefined | null, fmt = 'dd MMM yyyy'): string {
  if (!dateString) return '—'
  try {
    return format(parseISO(dateString), fmt)
  } catch {
    return dateString
  }
}

/** Format a date as relative time (e.g. "3 days ago") */
export function formatRelativeDate(dateString: string | undefined | null): string {
  if (!dateString) return '—'
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true })
  } catch {
    return dateString
  }
}

/** Check if a deadline has passed */
export function isDeadlinePassed(deadline: string | undefined | null): boolean {
  if (!deadline) return false
  try {
    return isPast(parseISO(deadline))
  } catch {
    return false
  }
}

/** Get human-readable work mode label */
export function getWorkModeLabel(mode: WorkMode | string): string {
  const labels: Record<string, string> = {
    remote: 'Remote',
    onsite: 'On-site',
    hybrid: 'Hybrid',
  }
  return labels[mode] ?? mode
}

/** Get human-readable application status label */
export function getStatusLabel(status: ApplicationStatus | string): string {
  const labels: Record<string, string> = {
    pending: 'Under Review',
    reviewing: 'Reviewing',
    accepted: 'Accepted',
    rejected: 'Not Selected',
    withdrawn: 'Withdrawn',
  }
  return labels[status] ?? status
}

/** Get Tailwind color class for application status */
export function getStatusColor(status: ApplicationStatus | string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    reviewing: 'bg-blue-100 text-blue-800 border-blue-200',
    accepted: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    withdrawn: 'bg-gray-100 text-gray-600 border-gray-200',
  }
  return colors[status] ?? 'bg-gray-100 text-gray-600 border-gray-200'
}

/** Get Tailwind color class for payment status */
export function getPaymentStatusColor(status: PaymentStatus | string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-blue-100 text-blue-800',
  }
  return colors[status] ?? 'bg-gray-100 text-gray-600'
}

/** Truncate text to a max length */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

/** Format duration in weeks to readable string */
export function formatDuration(weeks: number): string {
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''}`
  const months = Math.floor(weeks / 4)
  const remaining = weeks % 4
  if (remaining === 0) return `${months} month${months !== 1 ? 's' : ''}`
  return `${months}m ${remaining}w`
}

/** Get initials from a name for avatar fallback */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/** Build WhatsApp share URL */
export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

/** Replace {FORM_URL} placeholder in WhatsApp text */
export function getWhatsAppShareText(): string {
  const template = import.meta.env.VITE_WHATSAPP_SHARE_TEXT as string
  const formUrl = import.meta.env.VITE_GOOGLE_FORM_URL as string
  return template?.replace('{FORM_URL}', formUrl) ?? ''
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Debounce a function */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}
