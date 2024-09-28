'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare, Star, Package, TruckIcon, RefreshCcw, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"
import { database } from "@/lib/firebase"
import { ref, set } from 'firebase/database'

interface UserProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  dob?: string;
  gender?: string;
  sellerSettings?: {
    storeName: string;
    storeDescription: string;
    storeLogo: string;
    storeBanner: string;
    shippingPolicy: string;
    returnPolicy: string;
  };
}

interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  text: string;
  images: string[];
  date: string;
}

export default function Component() {
  const { userId } = useParams()
  const { getUserData } = useAuth()
  const [profileData, setProfileData] = useState<UserProfileData | null>(null)
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      reviewerName: 'Alice Johnson',
      reviewerAvatar: '/placeholder.svg?height=40&width=40',
      rating: 5,
      text: 'Absolutely love the handmade necklace I bought! The craftsmanship is exquisite and it arrived beautifully packaged.',
      images: ['/placeholder.svg?height=100&width=100', '/placeholder.svg?height=100&width=100'],
      date: '2023-09-15',
    },
    {
      id: '2',
      reviewerName: 'Bob Smith',
      reviewerAvatar: '/placeholder.svg?height=40&width=40',
      rating: 4,
      text: 'Great quality products. The wooden coasters I ordered are both functional and stylish. Shipping was a bit slow, though.',
      images: ['/placeholder.svg?height=100&width=100'],
      date: '2023-09-10',
    },
    {
      id: '3',
      reviewerName: 'Carol White',
      reviewerAvatar: '/placeholder.svg?height=40&width=40',
      rating: 5,
      text: 'John\'s customer service is top-notch! He went above and beyond to customize a piece for me. Highly recommended!',
      images: [],
      date: '2023-09-05',
    },
  ])
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth() // Add this line to get the current user

  useEffect(() => {
    const fetchProfileData = async () => {
      if (userId) {
        try {
          const userData = await getUserData(userId as string)
          if (userData) {
            setProfileData({
              id: userData.id,
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              profilePicture: userData.profilePicture || '/placeholder.svg?height=96&width=96',
              bio: userData.bio,
              sellerSettings: userData.sellerSettings || {
                storeName: '',
                storeDescription: '',
                storeLogo: '/placeholder.svg?height=96&width=96',
                storeBanner: '/placeholder.svg?height=192&width=768',
                shippingPolicy: '',
                returnPolicy: '',
              },
            })
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          toast({
            title: "Error",
            description: "Failed to load user profile. Please try again.",
            variant: "destructive"
          })
        }
      }
    }

    fetchProfileData()
  }, [userId, getUserData, toast])

  const handleMessageUser = () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to message a seller.",
        variant: "destructive"
      })
      return
    }

    if (user.uid === userId) {
      toast({
        title: "Error",
        description: "You cannot message yourself.",
        variant: "destructive"
      })
      return
    }

    if (!profileData) {
      toast({
        title: "Error",
        description: "Unable to load seller information. Please try again.",
        variant: "destructive"
      })
      return
    }

    // Create or update the chat entry for the current user
    const currentUserChatRef = ref(database, `chats/${user.uid}/${userId}`)
    set(currentUserChatRef, {
      userId: userId,
      name: `${profileData.firstName} ${profileData.lastName}`,
      avatar: profileData.profilePicture || '/placeholder.svg?height=96&width=96',
      lastMessage: '',
      timestamp: Date.now(),
    })

    // Create or update the chat entry for the seller
    const sellerChatRef = ref(database, `chats/${userId}/${user.uid}`)
    set(sellerChatRef, {
      userId: user.uid,
      name: user.displayName || 'User', // You might want to fetch the current user's name
      avatar: user.photoURL || '/placeholder.svg?height=96&width=96',
      lastMessage: '',
      timestamp: Date.now(),
    })

    // Redirect to the chat page
    router.push('/chat')
  }

  const handleLeaveReview = () => {
    console.log('Leave a review clicked')
  }

  if (!profileData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <Card className="overflow-hidden mb-6">
        <div className="h-48 overflow-hidden">
          <img src={profileData.sellerSettings?.storeBanner} alt="Store Banner" className="w-full object-cover" />
        </div>
        <CardHeader className="flex flex-row items-center space-x-4 pt-6">
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarImage src={profileData.profilePicture} alt={`${profileData.firstName} ${profileData.lastName}`} />
            <AvatarFallback>{profileData.firstName[0]}{profileData.lastName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <CardTitle className="text-3xl font-bold">{profileData.firstName} {profileData.lastName}</CardTitle>
            {profileData.sellerSettings?.storeName && (
              <p className="text-xl text-primary">{profileData.sellerSettings.storeName}</p>
            )}
            <div className="flex items-center mt-2">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">4.8 (120 reviews)</span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button onClick={handleMessageUser} className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Seller
            </Button>
            <Button onClick={handleLeaveReview} variant="outline" className="w-full">
              <Pencil className="mr-2 h-4 w-4" />
              Leave a Review
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            {profileData.bio && (
              <div>
                <h3 className="font-semibold text-lg">About the Seller</h3>
                <p className="text-gray-600">{profileData.bio}</p>
              </div>
            )}
            {profileData.sellerSettings?.storeDescription && (
              <div>
                <h3 className="font-semibold text-lg">Store Description</h3>
                <p className="text-gray-600">{profileData.sellerSettings.storeDescription}</p>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {profileData.sellerSettings && (
              <>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg flex items-center">
                    <TruckIcon className="w-5 h-5 mr-2 text-primary" />
                    Shipping Policy
                  </h3>
                  <p className="text-sm text-gray-600">{profileData.sellerSettings.shippingPolicy}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg flex items-center">
                    <RefreshCcw className="w-5 h-5 mr-2 text-primary" />
                    Return Policy
                  </h3>
                  <p className="text-sm text-gray-600">{profileData.sellerSettings.returnPolicy}</p>
                </div>
              </>
            )}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg flex items-center">
                <Package className="w-5 h-5 mr-2 text-primary" />
                Products
              </h3>
              <p className="text-sm text-gray-600">View all products by this seller</p>
              <Button variant="outline" className="mt-2 w-full">Browse Products</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center mb-2">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src={review.reviewerAvatar} alt={review.reviewerName} />
                    <AvatarFallback>{review.reviewerName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{review.reviewerName}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.text}</p>
                {review.images.length > 0 && (
                  <div className="flex space-x-2 mb-2">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}