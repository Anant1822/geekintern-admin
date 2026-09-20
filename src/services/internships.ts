import api from './api'
import type { Internship, InternshipFilters, PaginatedResponse, InternshipCategory } from '@/types'

export const internshipsService = {
  /** Fetch paginated + filtered internships */
  async getInternships(filters: InternshipFilters = {}): Promise<PaginatedResponse<Internship>> {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value))
      }
    })
    const { data } = await api.get<PaginatedResponse<Internship>>(`/internships?${params.toString()}`)
    return data
  },

  /** Fetch a single internship by ID */
  async getInternship(id: string): Promise<Internship> {
    const { data } = await api.get<Internship>(`/internships/${id}`)
    return data
  },

  /** Fetch all categories */
  async getCategories(): Promise<InternshipCategory[]> {
    const { data } = await api.get<InternshipCategory[]>('/internships/categories')
    return data
  },

  /** Fetch featured internships */
  async getFeaturedInternships(): Promise<Internship[]> {
    const { data } = await api.get<Internship[]>('/internships/featured')
    return data
  },

  /** Get saved internships for the logged-in student */
  async getSavedInternships(): Promise<Internship[]> {
    const { data } = await api.get<Internship[]>('/students/saved-internships')
    return data
  },

  /** Save an internship */
  async saveInternship(internshipId: string): Promise<void> {
    await api.post(`/students/saved-internships/${internshipId}`)
  },

  /** Unsave an internship */
  async unsaveInternship(internshipId: string): Promise<void> {
    await api.delete(`/students/saved-internships/${internshipId}`)
  },

  /** Admin: Create internship */
  async createInternship(payload: Partial<Internship>): Promise<Internship> {
    const { data } = await api.post<Internship>('/admin/internships', payload)
    return data
  },

  /** Admin: Update internship */
  async updateInternship(id: string, payload: Partial<Internship>): Promise<Internship> {
    const { data } = await api.put<Internship>(`/admin/internships/${id}`, payload)
    return data
  },

  /** Admin: Delete internship */
  async deleteInternship(id: string): Promise<void> {
    await api.delete(`/admin/internships/${id}`)
  },
}
