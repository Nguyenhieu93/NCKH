"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutDashboard, Settings } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="w-48 bg-[#476647] text-white min-h-[calc(100vh-3rem)]">
      <div className="space-y-1 py-2">
        <Link 
          href="/" 
          className={`flex items-center gap-2 px-3 py-1.5 hover:bg-[#3b533b] transition-colors text-sm ${isActive('/') ? 'bg-[#3b533b]' : ''}`}
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
        <Link 
          href="/dashboard" 
          className={`flex items-center gap-2 px-3 py-1.5 hover:bg-[#3b533b] transition-colors text-sm ${isActive('/dashboard') ? 'bg-[#3b533b]' : ''}`}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboards</span>
        </Link>
        <Link 
          href="/devices" 
          className={`flex items-center gap-2 px-3 py-1.5 hover:bg-[#3b533b] transition-colors text-sm ${isActive('/devices') ? 'bg-[#3b533b]' : ''}`}
        >
          <Settings className="h-4 w-4" />
          <span>Devices</span>
        </Link>
      </div>
    </nav>
  )
}

