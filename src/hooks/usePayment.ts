import { useState } from 'react'
import { paymentsService } from '@/services/payments'
import { initiateRazorpayPayment } from '@/lib/razorpay'
import { useAuth } from './useAuth'

interface UsePaymentReturn {
  isProcessing: boolean
  error: string | null
  initiatePayment: (internshipId: string, internshipTitle: string) => Promise<{ application_id: string } | null>
}

export function usePayment(): UsePaymentReturn {
  const { user, profile } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initiatePayment = async (
    internshipId: string,
    internshipTitle: string
  ): Promise<{ application_id: string } | null> => {
    setIsProcessing(true)
    setError(null)

    try {
      // Step 1: Create order on backend
      const order = await paymentsService.createPaymentOrder(internshipId)

      // Step 2: Open Razorpay modal
      const response = await initiateRazorpayPayment({
        amount: order.amount,
        currency: order.currency,
        name: 'Intership',
        description: `Application fee - ${internshipTitle}`,
        order_id: order.order_id,
        prefill: {
          name: profile?.full_name ?? '',
          email: user?.email ?? '',
          contact: profile?.phone ?? '',
        },
      })

      // Step 3: Verify payment on backend
      const result = await paymentsService.verifyPayment({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        internship_id: internshipId,
      })

      return { application_id: result.application_id }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Payment failed'
      setError(message)
      return null
    } finally {
      setIsProcessing(false)
    }
  }

  return { isProcessing, error, initiatePayment }
}
