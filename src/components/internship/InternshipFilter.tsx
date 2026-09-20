import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useInternshipStore } from '@/store/internship.store'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { id: '1', name: 'Frontend Development' },
  { id: '2', name: 'Backend Development' },
  { id: '3', name: 'Full Stack Development' },
  { id: '4', name: 'Web Development' },
  { id: '5', name: 'Android App Development' },
  { id: '6', name: 'Python Programming' },
  { id: '7', name: 'Java Programming' },
  { id: '8', name: 'C++ Programming' },
  { id: '9', name: 'C Programming' },
  { id: '10', name: 'Blockchain Development' },
  { id: '11', name: 'Artificial Intelligence' },
  { id: '12', name: 'Machine Learning' },
  { id: '13', name: 'Data Science' },
  { id: '14', name: 'Data Analytics' },
  { id: '15', name: 'Power BI' },
  { id: '16', name: 'Cloud Computing' },
  { id: '17', name: 'AWS Cloud' },
  { id: '18', name: 'DevOps' },
  { id: '19', name: 'Cyber Security' },
  { id: '20', name: 'UI/UX Design' },
  { id: '21', name: 'Civil Engineering & Structural Design' },
  { id: '22', name: 'Mechanical Design & Simulation' },
  { id: '23', name: 'AutoCAD' },
  { id: '24', name: 'MATLAB' },
  { id: '25', name: 'Electric Vehicle Technology (EV)' },
  { id: '26', name: 'VLSI Design' },
  { id: '27', name: 'Embedded Systems & IoT' },
  { id: '28', name: 'Embedded Systems with Arduino' },
  { id: '29', name: 'IoT Fundamentals' },
  { id: '30', name: 'PLC & SCADA' },
  { id: '31', name: 'PCB Design' },
]

const WORK_MODES = [
  { value: 'remote', label: 'Remote' },
  { value: 'onsite', label: 'On-site' },
  { value: 'hybrid', label: 'Hybrid' },
]

const DURATION_OPTIONS = [
  { value: '', label: 'Any Duration' },
  { value: '4', label: 'Up to 1 Month' },
  { value: '8', label: 'Up to 2 Months' },
  { value: '12', label: 'Up to 3 Months' },
  { value: '24', label: 'Up to 6 Months' },
]

interface InternshipFilterProps {
  className?: string
  onClose?: () => void
}

export function InternshipFilter({ className, onClose }: InternshipFilterProps) {
  const { filters, setFilters, resetFilters } = useInternshipStore()

  const activeFilterCount = [
    filters.category_id,
    filters.work_mode,
    filters.location,
    filters.branch,
    filters.is_paid !== null && filters.is_paid !== undefined,
    filters.max_duration,
  ].filter(Boolean).length

  const handleReset = () => {
    resetFilters()
    onClose?.()
  }

  return (
    <div className={cn('space-y-5', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-sm">Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="teal" className="text-[10px]">{activeFilterCount} active</Badge>
          )}
        </div>
        {onClose && (
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</Label>
        <Select
          value={filters.category_id ?? ''}
          onValueChange={(v) => setFilters({ category_id: v || undefined })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Branch */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Branch / Stream</Label>
        <Input
          placeholder="e.g. Computer Science"
          value={filters.branch ?? ''}
          onChange={(e) => setFilters({ branch: e.target.value || undefined })}
        />
      </div>

      {/* Work Mode */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Work Mode</Label>
        <div className="flex flex-wrap gap-2">
          {WORK_MODES.map((mode) => (
            <button
              key={mode.value}
              onClick={() => setFilters({ work_mode: filters.work_mode === mode.value ? '' : mode.value as 'remote' | 'onsite' | 'hybrid' })}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                filters.work_mode === mode.value
                  ? 'bg-brand-navy text-white border-brand-navy'
                  : 'border-input text-muted-foreground hover:border-brand-navy hover:text-brand-navy'
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Location</Label>
        <Input
          placeholder="City or state"
          value={filters.location ?? ''}
          onChange={(e) => setFilters({ location: e.target.value || undefined })}
        />
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Max Duration</Label>
        <Select
          value={filters.max_duration?.toString() ?? ''}
          onValueChange={(v) => setFilters({ max_duration: v ? parseInt(v) : undefined })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any Duration" />
          </SelectTrigger>
          <SelectContent>
            {DURATION_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Paid / Unpaid */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Stipend</Label>
        <div className="flex gap-2">
          {[
            { value: null, label: 'All' },
            { value: true, label: 'Paid' },
            { value: false, label: 'Unpaid' },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              onClick={() => setFilters({ is_paid: opt.value })}
              className={cn(
                'flex-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                filters.is_paid === opt.value
                  ? 'bg-brand-teal text-white border-brand-teal'
                  : 'border-input text-muted-foreground hover:border-brand-teal hover:text-brand-teal'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <Button variant="outline" className="w-full" onClick={handleReset}>
        <X className="mr-2 h-4 w-4" />
        Clear All Filters
      </Button>
    </div>
  )
}
