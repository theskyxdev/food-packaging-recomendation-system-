"use client"

import { Users, TrendingUp, Package, FileText, BarChart3 } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "Total Users", value: "847", icon: Users, color: "text-blue-600 bg-blue-50" },
          { label: "Recommendations", value: "12,340", icon: BarChart3, color: "text-green-600 bg-green-50" },
          { label: "Materials", value: "42", icon: Package, color: "text-purple-600 bg-purple-50" },
          { label: "Reports Generated", value: "3,284", icon: FileText, color: "text-orange-600 bg-orange-50" },
          { label: "Avg Rating", value: "4.8/5", icon: TrendingUp, color: "text-yellow-600 bg-yellow-50" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center mb-3`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">User Management</h3>
          <div className="space-y-2 text-sm">
            {[{ role: "Admin", count: 3 }, { role: "Researcher", count: 45 }, { role: "Industry", count: 312 }, { role: "Farmer", count: 487 }].map(r => (
              <div key={r.role} className="flex justify-between items-center">
                <span className="text-gray-600">{r.role}s</span>
                <span className="font-semibold text-gray-900">{r.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-2 text-sm">
            {["45 recommendations generated today", "12 new materials added", "3 system updates deployed", "89% database uptime"].map((item, i) => (
              <div key={i} className="text-gray-600 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
