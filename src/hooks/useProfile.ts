import { useState, useEffect } from 'react'
import { studentsService } from '@/services/students'
import { useAuthStore } from '@/store/auth.store'
import type { Student } from '@/types'

export function useProfile() {
  const { profile, setProfile } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await studentsService.getMyProfile()
      setProfile(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (payload: Partial<Student>) => {
    setIsLoading(true)
    setError(null)
    try {
      const updated = await studentsService.updateProfile(payload)
      setProfile(updated)
      return updated
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update profile'
      setError(message)
      throw new Error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const uploadResume = async (file: File) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await studentsService.uploadResume(file)
      if (profile) {
        setProfile({ ...profile, resume_url: result.resume_url, resume_filename: result.resume_filename })
      }
      return result
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to upload resume'
      setError(message)
      throw new Error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
    uploadResume,
  }
}
