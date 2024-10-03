import React from 'react'
import VillageSquareClient from '@/components/VillageSquareClient'

// Generate avatar data
const avatars = Array.from({ length: 1000 }, (_, i) => {
  const id = i + 1
  const isFilled = id === 7 || id === 11
  return {
    id,
    imageUrl: isFilled 
      ? id === 7 ? '/vs/owo.JPG' : '/vs/swanked.jpg'
      : `/placeholder.svg?height=50&width=50&text=${id}`,
    link: isFilled 
      ? id === 7 ? 'https://severesaints.com' : 'https://swanked.co.za'
      : 'https://paystack.com/buy/villagesquare-prjsch',
    title: isFilled ? (id === 7 ? 'Severe Saints' : 'Swanked') : `Title ${id}`,
    isFilled
  };
})

export default function VillageSquare() {
  return <VillageSquareClient initialAvatars={avatars} />
}