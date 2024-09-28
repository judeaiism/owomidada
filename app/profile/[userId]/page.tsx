'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"

interface UserProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  // Add any other fields you want to display
}

export default function UserProfilePage() {
  const { userId } = useParams()
  const { getUserData } = useAuth()
  const [profileData, setProfileData] = useState<UserProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const userData = await getUserData(userId as string)
          if (userData) {
            setProfileData(userData as UserProfileData)
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
          toast({
            title: "Error",
            description: "Failed to load user profile. Please try again.",
            variant: "destructive"
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchUserProfile()
  }, [userId, getUserData, toast])

  const handleMessageUser = () => {
    // Implement logic to start a chat with this user
    router.push(`/chat?userId=${userId}`)
  }

  if (isLoading) {
    return <div>Loading user profile...</div>
  }

  if (!profileData) {
    return <div>User profile not found.</div>
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profileData.profilePicture} alt={`${profileData.firstName} ${profileData.lastName}`} />
              <AvatarFallback>{profileData.firstName[0]}{profileData.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
              <p className="text-gray-500">{profileData.email}</p>
            </div>
          </div>
          {profileData.bio && (
            <div>
              <h3 className="font-semibold">Bio</h3>
              <p>{profileData.bio}</p>
            </div>
          )}
          <Button onClick={handleMessageUser}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Message User
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}