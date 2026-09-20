import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useInternshipStore } from '@/store/internship.store'
import { useNavigate, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const BRANCHES = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Chemical', 'MBA', 'BBA', 'Other']
const CATEGORIES = ['Web Development', 'App Development', 'VLSI', 'Embedded Systems', 'Data Science', 'AI/ML', 'IoT', 'Design']
const DURATIONS = ['1 Month', '2 Months', '3 Months', '6 Months', '1 Year']

interface SearchBarProps {
  className?: string
  compact?: boolean
}

export function SearchBar({ className, compact = false }: SearchBarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { filters, setFilters, setSearchQuery } = useInternshipStore()
  const [localSearch, setLocalSearch] = useState(filters.search ?? '')

  const handleSearch = () => {
    setSearchQuery(localSearch)
    if (location.pathname !== '/browse') {
      navigate('/browse')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-card-hover border border-gray-100',
        !compact && 'sm:flex-row sm:items-end sm:gap-3 sm:p-5'
      )}>
        {/* Search input */}
        <div className="flex-1 min-w-0">
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wide">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Role, skill, or keyword..."
              className="pl-9"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {!compact && (
          <>
            {/* Category */}
            <div className="flex-1 min-w-0">
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wide">
                Category
              </label>
              <Select onValueChange={(v) => setFilters({ category_id: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Branch */}
            <div className="flex-1 min-w-0">
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wide">
                Branch
              </label>
              <Select onValueChange={(v) => setFilters({ branch: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="All Branches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Branches</SelectItem>
                  {BRANCHES.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="flex-1 min-w-0">
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wide">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="City or Remote"
                  className="pl-9"
                  onChange={(e) => setFilters({ location: e.target.value })}
                />
              </div>
            </div>
          </>
        )}

        {/* Search button */}
        <Button
          onClick={handleSearch}
          size={compact ? 'default' : 'lg'}
          className="shrink-0 bg-brand-navy hover:bg-brand-navy/90"
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  )
}


export default SearchBar
