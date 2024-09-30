'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function PaymentFailedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
        <p className="text-xl mb-8">We're sorry, but your payment could not be processed.</p>
        <div className="space-x-4">
          <Button 
            onClick={() => router.push('/merch')}
            className="bg-white text-black hover:bg-gray-200"
          >
            Try Again
          </Button>
          <Button 
            onClick={() => router.push('/')}
            variant="outline"
            className="text-white border-white hover:bg-gray-800"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}