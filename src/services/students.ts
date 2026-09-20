import api from './api'
import type { Student, Application } from '@/types'

export const studentsService = {
  /** Get the current student's profile */
  async getMyProfile(): Promise<Student> {
    const { data } = await api.get<Student>('/students/me')
    return data
  },

  /** Update the current student's profile */
  async updateProfile(payload: Partial<Student>): Promise<Student> {
    const { data } = await api.put<Student>('/students/me', payload)
    return data
  },

  /** Upload resume (multipart/form-data) */
  async uploadResume(file: File): Promise<{ resume_url: string; resume_filename: string }> {
    const formData = new FormData()
    formData.append('resume', file)
    const { data } = await api.post<{ resume_url: string; resume_filename: string }>(
      '/students/me/resume',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return data
  },

  /** Get a signed URL for downloading the student's resume */
  async getResumeDownloadUrl(): Promise<{ url: string }> {
    const { data } = await api.get<{ url: string }>('/students/me/resume/download-url')
    return data
  },

  /** Delete the student's account */
  async deleteAccount(): Promise<void> {
    await api.delete('/students/me')
  },

  /** Get the student's applications */
  async getMyApplications(): Promise<Application[]> {
    const { data } = await api.get<Application[]>('/students/applications')
    return data
  },

  /** Withdraw an application */
  async withdrawApplication(applicationId: string): Promise<void> {
    await api.patch(`/students/applications/${applicationId}/withdraw`)
  },

  /** Admin: get all students */
  async getAllStudents(page = 1, limit = 20): Promise<{ data: Student[]; total: number }> {
    const { data } = await api.get(`/admin/users?role=student&page=${page}&limit=${limit}`)
    return data
  },
}
