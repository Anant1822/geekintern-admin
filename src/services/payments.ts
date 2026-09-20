import api from './api'
import type { PaymentOrder, PaymentVerifyPayload, Payment } from '@/types'

export const paymentsService = {
  /** Create a Razorpay order for an internship application fee */
  async createPaymentOrder(internshipId: string): Promise<PaymentOrder> {
    const { data } = await api.post<PaymentOrder>('/payments/create-order', { internship_id: internshipId })
    return data
  },

  /** Verify payment signature after Razorpay callback */
  async verifyPayment(payload: PaymentVerifyPayload): Promise<{ success: boolean; application_id: string }> {
    const { data } = await api.post<{ success: boolean; application_id: string }>(
      '/payments/verify',
      payload
    )
    return data
  },

  /** Get payment history for the logged-in student */
  async getMyPayments(): Promise<Payment[]> {
    const { data } = await api.get<Payment[]>('/students/payments')
    return data
  },
}
