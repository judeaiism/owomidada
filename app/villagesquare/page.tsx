import React from 'react'
import VillageSquareClient from '@/components/VillageSquareClient'

// Generate avatar data
const avatars = Array.from({ length: 1000 }, (_, i) => {
  const id = i + 1
  const isFilled = id === 4 || id === 7 || id === 11 || id === 47 || id === 49
  return {
    id,
    imageUrl: isFilled 
      ? id === 4 ? '/vs/4.jpg'
      : id === 7 ? '/vs/owo.JPG' 
      : id === 11 ? '/vs/swanked.jpg'
      : id === 47 ? '/vs/ofr.jpg'
      : '/vs/seo.jpg'
      : `/placeholder.svg?height=50&width=50&text=${id}`,
    link: isFilled 
      ? id === 4 ? 'https://api.whatsapp.com/send?phone=2349079152637'
      : id === 7 ? 'https://severesaints.com' 
      : id === 11 ? 'https://swanked.co.za'
      : id === 47 ? 'https://snapchat.com/t/ha1BmlzJ'
      : 'https://seoperate.com/complete-seo-manager/'
      : 'https://paystack.com/buy/villagesquare-prjsch',
    title: isFilled 
      ? id === 4 ? 'WhatsApp Contact'
      : id === 7 ? 'Severe Saints' 
      : id === 11 ? 'Swanked'
      : id === 47 ? 'OFR'
      : 'SEOperate'
      : `Title ${id}`,
    isFilled
  };
})

export default function VillageSquare() {
  return <VillageSquareClient initialAvatars={avatars} />
}