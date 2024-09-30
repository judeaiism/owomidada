'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useVirtualizer } from '@tanstack/react-virtual'

// Update the type for our avatar data
type AvatarData = {
  id: number
  imageUrl: string
  link: string
  title: string
  isFilled: boolean
}

type VillageSquareClientProps = {
  initialAvatars: AvatarData[]
}

export default function VillageSquareClient({ initialAvatars }: VillageSquareClientProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(initialAvatars.length / 20),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  })

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: 20,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Owomida Village Square</h1>
      <div 
        ref={parentRef} 
        className="h-[80vh] overflow-auto border border-gray-200 rounded-lg"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${columnVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <React.Fragment key={virtualRow.index}>
              {columnVirtualizer.getVirtualItems().map((virtualCol) => {
                const index = virtualRow.index * 20 + virtualCol.index
                const avatar = initialAvatars[index]
                if (!avatar) return null

                return (
                  <div
                    key={avatar.id}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: `${virtualCol.size}px`,
                      height: `${virtualRow.size}px`,
                      transform: `translateX(${virtualCol.start}px) translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <Link href={avatar.link} target="_blank" rel="noopener noreferrer">
                      <Avatar className={avatar.isFilled ? 'ring-2 ring-blue-500' : ''}>
                        <AvatarImage src={avatar.imageUrl} alt={avatar.title} />
                        <AvatarFallback>{avatar.id}</AvatarFallback>
                      </Avatar>
                    </Link>
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}