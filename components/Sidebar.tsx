"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  PlusCircle,
  History,
  Database,
  Package,
  Calculator,
  GitCompare,
  Leaf,
  QrCode,
  FileText,
  Bot,
  Settings,
  ShieldCheck,
  Clock,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "New Recommendation", href: "/dashboard/new", icon: PlusCircle },
  { name: "History", href: "/dashboard/history", icon: History },
  { name: "Packaging Database", href: "/dashboard/materials", icon: Package },
  { name: "Food Database", href: "/dashboard/commodities", icon: Database },
  { name: "Shelf Life Predictor", href: "/dashboard/shelf-life", icon: Clock },
  { name: "Cost Calculator", href: "/dashboard/cost", icon: Calculator },
  { name: "Packaging Comparison", href: "/dashboard/comparison", icon: GitCompare },
  { name: "Sustainability Analysis", href: "/dashboard/sustainability", icon: Leaf },
  { name: "QR Traceability", href: "/dashboard/qr", icon: QrCode },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "AI Assistant", href: "/dashboard/assistant", icon: Bot },
  { name: "Admin Panel", href: "/dashboard/admin", icon: ShieldCheck },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">PackSmart AI</h1>
            <p className="text-xs text-gray-500">Smarter Packaging • Safer Food • Better Tomorrow</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            AK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Akash Kumbhar
            </p>
            <p className="text-xs text-gray-500 truncate">Researcher</p>
          </div>
        </div>
      </div>
    </div>
  )
}
