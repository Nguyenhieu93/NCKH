"use client"

import Link from "next/link"
import { Leaf, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/contexts/AuthContext"
import { auth } from "@/app/lib/firebase"

export function Header() {
  const { user } = useAuth()

  const handleSignOut = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="bg-[#476647] text-white p-2 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 hover:opacity-90">
        <Leaf className="h-5 w-5" />
        <h1 className="text-lg font-semibold">My Garden</h1>
      </Link>
      <div className="flex gap-2">
        {user ? (
          <>
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-[#3b533b]" asChild>
              <Link href="/account">
                <User className="mr-2 h-4 w-4" />
                Account
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-white hover:text-white border-white hover:border-white hover:bg-[#3b533b] bg-transparent"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-[#3b533b]" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-white hover:text-white border-white hover:border-white hover:bg-[#3b533b] bg-transparent"
              asChild
            >
              <Link href="/signup">Signup</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

