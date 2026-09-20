import { create } from 'zustand'
import type { InternshipFilters } from '@/types'

interface InternshipState {
  filters: InternshipFilters
  searchQuery: string
  currentPage: number
  // Actions
  setFilters: (filters: Partial<InternshipFilters>) => void
  setSearchQuery: (query: string) => void
  setPage: (page: number) => void
  resetFilters: () => void
}

const defaultFilters: InternshipFilters = {
  search: '',
  category_id: '',
  branch: '',
  work_mode: '',
  location: '',
  is_paid: null,
  page: 1,
  limit: 12,
  sort_by: 'created_at',
  sort_order: 'desc',
}

export const useInternshipStore = create<InternshipState>()((set, get) => ({
  filters: defaultFilters,
  searchQuery: '',
  currentPage: 1,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters, page: 1 },
      currentPage: 1,
    })),

  setSearchQuery: (query) =>
    set((state) => ({
      searchQuery: query,
      filters: { ...state.filters, search: query, page: 1 },
      currentPage: 1,
    })),

  setPage: (page) =>
    set((state) => ({
      currentPage: page,
      filters: { ...state.filters, page },
    })),

  resetFilters: () =>
    set({ filters: defaultFilters, searchQuery: '', currentPage: 1 }),
}))
