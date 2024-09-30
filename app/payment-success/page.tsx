'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function PaymentSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // You can add any additional logic here, such as clearing the cart
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl mb-8">Thank you for your purchase.</p>
        <Button 
          onClick={() => router.push('/')}
          className="bg-white text-black hover:bg-gray-200"
        >
          Return to Home
        </Button>
      </div>
    </div>
  )
}