'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useVirtualizer } from '@tanstack/react-virtual'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addSquareData } from '@/lib/firebase'
import { useToast } from "@/components/ui/use-toast"

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
  const [avatars, setAvatars] = useState(initialAvatars)
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

  const handleSubmit = async (id: number, link: string, image: File) => {
    try {
      await addSquareData(id, link, image)
      // Don't update the local state, as we don't want to change the page data
      console.log(`Square ${id} data saved to Firebase`)
    } catch (error) {
      console.error("Error updating square:", error)
    }
  }

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
                const avatar = avatars[index]
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
                    {avatar.isFilled ? (
                      <Link href={avatar.link} target="_blank" rel="noopener noreferrer">
                        <Avatar className="ring-2 ring-blue-500">
                          <AvatarImage src={avatar.imageUrl} alt={avatar.title} />
                          <AvatarFallback>{avatar.id}</AvatarFallback>
                        </Avatar>
                      </Link>
                    ) : (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Avatar>
                            <AvatarFallback>{avatar.id}</AvatarFallback>
                          </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <h2 className="text-lg font-semibold mb-2">Rent Square #{avatar.id}</h2>
                          <RentSquareForm id={avatar.id} onSubmit={handleSubmit} />
                        </PopoverContent>
                      </Popover>
                    )}
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

type RentSquareFormProps = {
  id: number
  onSubmit: (id: number, link: string, image: File) => Promise<void>
}

function RentSquareForm({ id, onSubmit }: RentSquareFormProps) {
  const [link, setLink] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (link && image) {
      setIsSubmitting(true)
      try {
        await onSubmit(id, link, image)
        toast({
          title: "Square rented successfully!",
          variant: "default",
        })
        // Short delay to allow the toast to be seen
        setTimeout(() => {
          window.location.href = 'https://paystack.com/buy/villagesquare-prjsch'
        }, 1000)
      } catch (error) {
        console.error("Error submitting form:", error)
        toast({
          title: "Failed to rent the square. Please try again.",
          variant: "destructive",
        })
        setIsSubmitting(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">Rent Square #{id}</h2>
      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">Add your link/URL</label>
        <Input
          id="link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload your image</label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
          disabled={isSubmitting}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Done'}
      </Button>
    </form>
  )
}