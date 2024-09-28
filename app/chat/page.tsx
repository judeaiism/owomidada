"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, MessageSquare, Home, List, User, Search, X } from "lucide-react"
import { useRouter } from 'next/navigation'
import { auth, database, firestore } from "@/lib/firebase"
import { onValue, ref, push, set } from 'firebase/database'
import { collection, query as firebaseQuery, where, getDocs } from 'firebase/firestore'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUserData, UserData } from "@/hooks/useUserData"
import SearchBar from "@/components/SearchBar"

export default function ChatPage() {
  const [open, setOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<UserData | null>(null)
  const [isChatOpen, setIsChatOpen] = React.useState(false)
  const [chats, setChats] = React.useState<any[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<UserData[]>([])
  const [message, setMessage] = React.useState("")
  const [messages, setMessages] = React.useState<any[]>([])

  const router = useRouter()
  const currentUser = auth.currentUser
  const { userData: currentUserData } = useUserData(currentUser?.uid || null)

  React.useEffect(() => {
    if (!currentUser) {
      router.push('/login')
      return
    }

    const chatsRef = ref(database, `chats/${currentUser.uid}`)
    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const chatsArray = Object.entries(data).map(([id, chat]: [string, any]) => ({
          id,
          ...chat,
        }))
        setChats(chatsArray)
      }
    })

    return () => unsubscribe()
  }, [currentUser, router])

  const handleUserSelect = (user: UserData) => {
    setSelectedUser(user)
    setIsChatOpen(true)
    loadMessages(user.id)
  }

  const loadMessages = (userId: string) => {
    const messagesRef = ref(database, `messages/${currentUser!.uid}/${userId}`)
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const messagesArray = Object.values(data)
        setMessages(messagesArray)
      } else {
        setMessages([])
      }
    })
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      const usersRef = collection(firestore, 'users')
      const q = firebaseQuery(usersRef, where('firstName', '>=', query), where('firstName', '<=', query + '\uf8ff'))
      const querySnapshot = await getDocs(q)
      const results: UserData[] = []
      querySnapshot.forEach((doc) => {
        const userData = doc.data() as Omit<UserData, 'id'>;
        results.push({ 
          id: doc.id, 
          ...userData,
          name: `${userData.firstName} ${userData.lastName}`,
          avatar: userData.profilePicture || "/images/placeholder-avatar.jpg"
        })
      })
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const startNewChat = (user: UserData) => {
    const chatRef = ref(database, `chats/${currentUser!.uid}/${user.id}`)
    set(chatRef, {
      userId: user.id,
      name: user.name ?? `${user.firstName} ${user.lastName}`,
      avatar: user.avatar ?? user.profilePicture ?? "/images/placeholder-avatar.jpg",
      lastMessage: '',
      timestamp: Date.now(),
    })
    handleUserSelect(user)
  }

  const sendMessage = () => {
    if (message.trim() && selectedUser) {
      const messageData = {
        senderId: currentUser!.uid,
        text: message,
        timestamp: Date.now(),
      }
      const chatRef = ref(database, `messages/${currentUser!.uid}/${selectedUser.id}`)
      push(chatRef, messageData)
      const recipientChatRef = ref(database, `messages/${selectedUser.id}/${currentUser!.uid}`)
      push(recipientChatRef, messageData)
      setMessage('')
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="flex items-center px-4 py-4 border-b">
        <Link href="/" className="mr-6">
          <MessageSquare className="h-8 w-8" />
          <span className="sr-only">Home</span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Button asChild variant="ghost" size="lg" className="p-2">
            <Link href="/">
              <Home className="h-6 w-6" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="p-2">
            <Link href="/listing">
              <List className="h-6 w-6" />
              <span className="sr-only">Listing</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="p-2">
            <Link href="/profile">
              <User className="h-6 w-6" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
        </nav>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <div className={cn("w-full flex flex-col", isChatOpen ? "hidden md:flex md:w-1/3" : "")}>
          <div className="p-4 border-b">
            <SearchBar 
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <nav className="flex-1 overflow-auto py-2">
            {searchQuery.length > 2 ? (
              searchResults.map((user) => (
                <button
                  key={user.id}
                  className="flex items-center w-full p-4 hover:bg-muted transition-colors"
                  onClick={() => startNewChat(user)}
                >
                  <img
                    src={user.avatar ?? user.profilePicture ?? "/images/placeholder-avatar.jpg"}
                    alt={user.name ?? `${user.firstName} ${user.lastName}`}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{user.name ?? `${user.firstName} ${user.lastName}`}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {user.email}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              chats.map((chat) => (
                <button
                  key={chat.id}
                  className={cn(
                    "flex items-center w-full p-4 hover:bg-muted transition-colors",
                    selectedUser?.id === chat.userId && "bg-muted"
                  )}
                  onClick={() => handleUserSelect(chat)}
                >
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{chat.name}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {chat.lastMessage}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(chat.timestamp).toLocaleTimeString()}
                  </div>
                </button>
              ))
            )}
          </nav>
        </div>
        {isChatOpen && selectedUser && (
          <main className="flex-1 flex flex-col md:w-2/3">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-lg font-medium leading-none">
                    {selectedUser.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.email}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "max-w-[70%] rounded-lg p-4",
                      msg.senderId === currentUser!.uid
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <footer className="border-t p-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button size="lg" onClick={sendMessage}>Send</Button>
              </div>
            </footer>
          </main>
        )}
      </div>
    </div>
  )
}