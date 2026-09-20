// ============================================================
// Intership – Shared TypeScript Types
// ============================================================

export type WorkMode = 'remote' | 'onsite' | 'hybrid'
export type ApplicationStatus = 'pending' | 'reviewing' | 'accepted' | 'rejected' | 'withdrawn'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type UserRole = 'student' | 'college' | 'admin'

// ── Auth ──────────────────────────────────────────────────────
export interface User {
  id: string
  email: string
  role: UserRole
  created_at: string
}

export interface Profile {
  id: string
  user_id: string
  full_name: string
  email: string
  phone?: string
  avatar_url?: string
  role: UserRole
  created_at: string
  updated_at: string
}

// ── Student ───────────────────────────────────────────────────
export interface Student {
  id: string
  user_id: string
  full_name: string
  email: string
  phone?: string
  college_name?: string
  branch?: string
  graduation_year?: number
  cgpa?: number
  skills: string[]
  bio?: string
  linkedin_url?: string
  github_url?: string
  portfolio_url?: string
  resume_url?: string
  resume_filename?: string
  avatar_url?: string
  is_verified: boolean
  created_at: string
  updated_at: string
}

// ── College ───────────────────────────────────────────────────
export interface College {
  id: string
  name: string
  city: string
  state: string
  website?: string
  contact_email?: string
  contact_phone?: string
  logo_url?: string
  is_verified: boolean
  created_at: string
}

// ── Category ──────────────────────────────────────────────────
export interface InternshipCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon_name: string
  color: string
  internship_count?: number
}

// ── Internship ────────────────────────────────────────────────
export interface Internship {
  id: string
  title: string
  provider_name: string
  provider_logo?: string
  category_id: string
  category?: InternshipCategory
  description: string
  responsibilities: string[]
  requirements: string[]
  skills_required: string[]
  required_skills?: string[]
  work_mode: WorkMode
  location?: string
  duration_weeks: number
  stipend_amount?: number
  is_paid: boolean
  application_fee: number
  seats_total?: number
  seats_filled?: number
  max_applicants?: number
  application_deadline: string
  deadline?: string
  is_active?: boolean
  is_verified: boolean
  is_featured: boolean
  status?: 'draft' | 'published' | 'archived' | 'deleted' | string
  created_at: string
  updated_at: string
  // Computed
  is_saved?: boolean
  has_applied?: boolean
}

export interface InternshipFilters {
  search?: string
  category_id?: string
  branch?: string
  work_mode?: WorkMode | ''
  location?: string
  min_duration?: number
  max_duration?: number
  is_paid?: boolean | null
  deadline_after?: string
  page?: number
  limit?: number
  sort_by?: 'created_at' | 'deadline' | 'stipend' | 'title'
  sort_order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  total_pages: number
}

// ── Application ───────────────────────────────────────────────
export interface Application {
  id: string
  student_id: string
  internship_id: string
  student?: Student
  internship?: Internship
  status: ApplicationStatus
  cover_letter?: string
  payment_id?: string
  payment?: Payment
  applied_at: string
  updated_at: string
}

// ── Payment ───────────────────────────────────────────────────
export interface Payment {
  id: string
  student_id: string
  internship_id: string
  application_id?: string
  razorpay_order_id: string
  razorpay_payment_id?: string
  razorpay_signature?: string
  amount: number
  currency: string
  status: PaymentStatus
  created_at: string
  updated_at: string
}

export interface PaymentOrder {
  order_id: string
  amount: number
  currency: string
  receipt: string
}

export interface PaymentVerifyPayload {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
  internship_id: string
}

// ── Testimonial ───────────────────────────────────────────────
export interface Testimonial {
  id: string
  student_name: string
  college_name: string
  internship_title: string
  company_name: string
  content: string
  rating: number
  avatar_url?: string
  is_placeholder: boolean
  is_active: boolean
  created_at: string
}

// ── FAQ ───────────────────────────────────────────────────────
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order_index: number
  is_active: boolean
}

// ── Contact Inquiry ───────────────────────────────────────────
export interface ContactInquiry {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  is_read: boolean
  replied_at?: string
  created_at: string
}

// ── Stats ─────────────────────────────────────────────────────
export interface PlatformStats {
  total_students: number
  total_internships: number
  total_colleges: number
  total_placements: number
}

// ── Admin ─────────────────────────────────────────────────────
export interface AdminMessage {
  id: string
  from_name: string
  from_email: string
  subject: string
  body: string
  is_read: boolean
  created_at: string
}

// ── Razorpay ──────────────────────────────────────────────────
export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: {
    color?: string
  }
  handler?: (response: RazorpaySuccessResponse) => void
  modal?: {
    ondismiss?: () => void
  }
}

export interface RazorpaySuccessResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}
