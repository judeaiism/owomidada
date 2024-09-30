import React from 'react'
import VillageSquareClient from '@/components/VillageSquareClient'

// Generate avatar data
const avatars = Array.from({ length: 1000 }, (_, i) => {
  const id = i + 1
  const isFilled = id === 7
  return {
    id,
    imageUrl: isFilled 
      ? '/vs/owo.JPG'
      : `/placeholder.svg?height=50&width=50&text=${id}`,
    link: isFilled 
      ? 'https://severesaints.com'
      : 'https://paystack.com/buy/villagesquare-prjsch',
    title: isFilled ? 'Severe Saints' : `Title ${id}`,
    isFilled
  };
})

export default function VillageSquare() {
  return <VillageSquareClient initialAvatars={avatars} />
}