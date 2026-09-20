import type { RazorpayOptions, RazorpaySuccessResponse } from '@/types'

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void
      close: () => void
    }
  }
}

/**
 * Opens the Razorpay checkout modal.
 * Resolves with the payment response on success.
 * Rejects when the modal is dismissed or payment fails.
 */
export function initiateRazorpayPayment(
  options: Omit<RazorpayOptions, 'handler' | 'modal' | 'key'>
): Promise<RazorpaySuccessResponse> {
  return new Promise((resolve, reject) => {
    if (typeof window.Razorpay === 'undefined') {
      reject(new Error('Razorpay SDK not loaded. Please check your internet connection.'))
      return
    }

    const razorpayOptions: RazorpayOptions = {
      ...options,
      key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
      theme: {
        color: '#1E3A5F',
      },
      handler: (response: RazorpaySuccessResponse) => {
        resolve(response)
      },
      modal: {
        ondismiss: () => {
          reject(new Error('Payment cancelled by user'))
        },
      },
    }

    const rzp = new window.Razorpay(razorpayOptions)
    rzp.open()
  })
}
