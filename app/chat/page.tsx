"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, MessageSquare, Home, List, User, Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

const users = [
  {
    name: "Olivia Martin",
    email: "m@example.com",
    avatar: "https://ui.shadcn.com/avatars/01.png",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@example.com",
    avatar: "https://ui.shadcn.com/avatars/02.png",
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar: "https://ui.shadcn.com/avatars/03.png",
  },
  {
    name: "Jack Williams",
    email: "jack.williams@example.com",
    avatar: "https://ui.shadcn.com/avatars/04.png",
  },
  {
    name: "Sophia Davis",
    email: "sophia.davis@example.com",
    avatar: "https://ui.shadcn.com/avatars/05.png",
  },
]

export default function ChatPage() {
  const [open, setOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<typeof users[0] | null>(null)
  const [isChatOpen, setIsChatOpen] = React.useState(false)

  const handleUserSelect = (user: typeof users[0]) => {
    setSelectedUser(user)
    setIsChatOpen(true)
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
        <div className="ml-auto flex items-center space-x-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a user"
                className="w-[200px] justify-between"
                size="lg"
              >
                {selectedUser ? selectedUser.name : "Select user..."}
                <Menu className="ml-2 h-5 w-5 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandList>
                  <CommandEmpty>No users found.</CommandEmpty>
                  <CommandGroup heading="Users">
                    {users.map((user) => (
                      <CommandItem
                        key={user.email}
                        onSelect={() => {
                          handleUserSelect(user)
                          setOpen(false)
                        }}
                      >
                        {user.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <div className={cn("w-full flex flex-col", isChatOpen ? "hidden md:flex md:w-1/3" : "")}>
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search chats" className="pl-8" />
            </div>
          </div>
          <nav className="flex-1 overflow-auto py-2">
            {users.map((user) => (
              <button
                key={user.email}
                className={cn(
                  "flex items-center w-full p-4 hover:bg-muted transition-colors",
                  selectedUser?.email === user.email && "bg-muted"
                )}
                onClick={() => handleUserSelect(user)}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex-1 text-left">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {"Hey, how's it going?"}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">2m ago</div>
              </button>
            ))}
          </nav>
        </div>
        {isChatOpen && (
          <main className="flex-1 flex flex-col md:w-2/3">
            <div className="flex items-center justify-between p-4 border-b">
              {selectedUser && (
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
              )}
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
                <div className="rounded-lg border p-4">
                  <p className="text-sm">
                    This is where the chat messages would appear. You can implement
                    a real-time chat functionality using technologies like WebSockets
                    or Server-Sent Events.
                  </p>
                </div>
              </div>
            </div>
            <footer className="border-t p-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button size="lg">Send</Button>
              </div>
            </footer>
          </main>
        )}
      </div>
    </div>
  )
}