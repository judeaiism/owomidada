'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaymentCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const reference = searchParams.get('reference')
    if (reference) {
      // Verify the transaction on the server
      verifyTransaction(reference)
        .then((success) => {
          if (success) {
            // Payment was successful
            router.push('/payment-success')
          } else {
            // Payment failed
            router.push('/payment-failed')
          }
        })
        .catch((error) => {
          console.error('Error verifying transaction:', error)
          router.push('/payment-error')
        })
    }
  }, [router, searchParams])

  return <div>Processing your payment...</div>
}

async function verifyTransaction(reference: string) {
  // Implement server-side verification here
  // This should be done on your backend for security reasons
  // Return true if the transaction is verified successfully, false otherwise
  return true
}