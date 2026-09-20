import { useState, useEffect, useCallback } from 'react'
import { useInternshipStore } from '@/store/internship.store'
import { internshipsService } from '@/services/internships'
import type { Internship, PaginatedResponse } from '@/types'

export function useInternships() {
  const { filters, currentPage, setPage } = useInternshipStore()
  const [result, setResult] = useState<PaginatedResponse<Internship>>({
    data: [],
    total: 0,
    page: 1,
    limit: 12,
    total_pages: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchInternships = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await internshipsService.getInternships(filters)
      setResult(data)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load internships'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchInternships()
  }, [fetchInternships])

  const items = Array.isArray(result)
    ? result
    : Array.isArray(result?.data)
    ? result.data
    : []

  const totalCount =
    typeof (result as unknown as { pagination?: { total?: number } })?.pagination?.total === 'number'
      ? (result as unknown as { pagination: { total: number } }).pagination.total
      : typeof result?.total === 'number'
      ? result.total
      : items.length

  const totalPagesCount =
    typeof (result as unknown as { pagination?: { totalPages?: number } })?.pagination?.totalPages === 'number'
      ? (result as unknown as { pagination: { totalPages: number } }).pagination.totalPages
      : typeof result?.total_pages === 'number'
      ? result.total_pages
      : Math.ceil(totalCount / (filters.limit || 12)) || 1

  return {
    internships: items,
    total: totalCount,
    totalPages: totalPagesCount,
    currentPage,
    isLoading,
    error,
    setPage,
    refetch: fetchInternships,
  }
}

export function useInternship(id: string) {
  const [internship, setInternship] = useState<Internship | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setIsLoading(true)
    internshipsService
      .getInternship(id)
      .then((res) => {
        // If wrapped in { success: true, data: ... }
        const item = (res as unknown as { data?: Internship })?.data || res
        setInternship(item)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load internship')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return { internship, isLoading, error }
}
