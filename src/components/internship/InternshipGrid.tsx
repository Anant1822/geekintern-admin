import { InternshipCard, InternshipCardSkeleton } from './InternshipCard'
import { EmptyState } from '@/components/common/EmptyState'
import { Briefcase } from 'lucide-react'
import type { Internship } from '@/types'
import { cn } from '@/lib/utils'

interface InternshipGridProps {
  internships: Internship[]
  isLoading?: boolean
  skeletonCount?: number
  className?: string
  onSaveToggle?: (id: string, saved: boolean) => void
}

export function InternshipGrid({
  internships = [],
  isLoading = false,
  skeletonCount = 12,
  className,
  onSaveToggle,
}: InternshipGridProps) {
  const gridClass = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'

  if (isLoading) {
    return (
      <div className={cn(gridClass, className)}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <InternshipCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!internships || !internships.length) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No internships found"
        description="Try adjusting your filters or search query to find more opportunities."
        className={className}
      />
    )
  }

  return (
    <div className={cn(gridClass, className)}>
      {internships.map((internship) => (
        <InternshipCard
          key={internship.id}
          internship={internship}
          onSaveToggle={onSaveToggle}
        />
      ))}
    </div>
  )
}
