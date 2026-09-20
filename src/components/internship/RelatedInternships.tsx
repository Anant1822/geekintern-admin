import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { InternshipCard } from './InternshipCard'
import { Button } from '@/components/ui/button'
import type { Internship } from '@/types'
import { cn } from '@/lib/utils'

interface RelatedInternshipsProps {
  internships: Internship[]
  className?: string
}

export function RelatedInternships({ internships, className }: RelatedInternshipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  if (!internships.length) return null

  return (
    <div className={cn('relative', className)}>
      {/* Scroll buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex shadow-md"
        onClick={() => scroll('left')}
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex shadow-md"
        onClick={() => scroll('right')}
        aria-label="Scroll right"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {internships.map((internship) => (
          <div key={internship.id} className="snap-start shrink-0 w-72 sm:w-80">
            <InternshipCard internship={internship} />
          </div>
        ))}
      </div>
    </div>
  )
}
