"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth, database, ref, set, get } from "@/app/lib/firebase"

interface UserInfo {
  fullName: string
  phoneNumber: string
  dateOfBirth: string
  address: string
}

export default function AccountPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
  })
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      // Fetch user info from Realtime Database
      const userRef = ref(database, `users/${user.uid}`)
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserInfo(snapshot.val())
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error)
        })
    }
  }, [user, loading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      await set(ref(database, `users/${user.uid}`), userInfo)
      setMessage("Thông tin đã được cập nhật thành công!")
    } catch (error) {
      console.error("Error updating user info:", error)
      setMessage("Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.")
    }
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading || !user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input id="fullName" name="fullName" value={userInfo.fullName} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Ngày sinh</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={userInfo.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Input id="address" name="address" value={userInfo.address} onChange={handleInputChange} required />
            </div>
            <Button type="submit" className="w-full">
              Cập nhật thông tin
            </Button>
          </form>
          {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
          <div className="mt-6">
            <p className="mb-2">Email: {user.email}</p>
            <Button onClick={handleSignOut} className="w-full mt-4" variant="outline">
              Đăng xuất
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

