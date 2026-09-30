"use client"

import { Search, Bell, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search food commodity (e.g. milk, apple, rice...)"
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4 ml-6">
        {/* Language */}
        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Globe className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">English</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
          >
            3
          </Badge>
        </button>

        {/* User Avatar */}
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-900 text-right">Akash Kumbhar</p>
            <p className="text-xs text-gray-500 text-right">Researcher</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            AK
          </div>
        </div>
      </div>
    </header>
  )
}
