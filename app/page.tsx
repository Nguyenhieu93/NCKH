import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Welcome to My Garden</h1>
      <p className="text-lg text-gray-600">
        Monitor your garden&apos;s temperature and humidity in real-time.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/dashboard">View Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/devices">Manage Devices</Link>
        </Button>
      </div>
    </div>
  )
}

