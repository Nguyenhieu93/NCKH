"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth, createUserWithEmailAndPassword } from "../lib/firebase"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const validatePassword = (password: string) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasNonalphas = /\W/.test(password)

    if (password.length < minLength) {
      return "Password must be at least 8 characters long."
    } else if (!(hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    }
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("") // Clear any previous messages

    const passwordError = validatePassword(password)
    if (passwordError) {
      setMessage(passwordError)
      return
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!")
      return
    }

    try {
      if (!auth) {
        throw new Error("Firebase Auth is not initialized")
      }
      await createUserWithEmailAndPassword(auth, email, password)
      setMessage("Sign up successful!")
      router.push("/")
    } catch (error: any) {
      console.error("Sign-up error:", error)
      if (error.code === "auth/email-already-in-use") {
        setMessage("This email is already in use. Please use a different email or try logging in.")
      } else {
        setMessage("Error during sign up: " + (error.message || "Unknown error occurred"))
      }
    }
  }

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            {message && (
              <p
                className={`text-center text-sm ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}
              >
                {message}
              </p>
            )}
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

