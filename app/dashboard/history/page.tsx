"use client"

import { useState } from "react"
import { Search, Filter, Download, Trash2, Copy, ChevronDown, Clock, Package } from "lucide-react"

const mockHistory = [
  { id: "1", commodity: "Apple", icon: "🍎", category: "FRUITS", material: "PET + LDPE", confidence: 95, shelfLife: 28, improvement: 100, cost: 12.5, ecoScore: 72, date: "2026-09-28", storage: "Cold", transport: "Domestic" },
  { id: "2", commodity: "Milk", icon: "🥛", category: "DAIRY", material: "HDPE Film", confidence: 88, shelfLife: 18, improvement: 20, cost: 8.5, ecoScore: 65, date: "2026-09-27", storage: "Cold", transport: "Local" },
  { id: "3", commodity: "Rice", icon: "🌾", category: "GRAINS", material: "BOPP", confidence: 82, shelfLife: 190, improvement: 6, cost: 7.5, ecoScore: 60, date: "2026-09-25", storage: "Ambient", transport: "Domestic" },
  { id: "4", commodity: "Tomato", icon: "🍅", category: "VEGETABLES", material: "Micro-perforated PE", confidence: 91, shelfLife: 24, improvement: 71, cost: 9.5, ecoScore: 62, date: "2026-09-24", storage: "Cold", transport: "Local" },
  { id: "5", commodity: "Chicken", icon: "🍗", category: "MEAT", material: "Vacuum PA/PE", confidence: 96, shelfLife: 14, improvement: 133, cost: 14.5, ecoScore: 55, date: "2026-09-22", storage: "Cold", transport: "Domestic" },
  { id: "6", commodity: "Bread", icon: "🍞", category: "BAKERY", material: "Cellulose Laminate", confidence: 78, shelfLife: 10, improvement: 43, cost: 6.5, ecoScore: 85, date: "2026-09-20", storage: "Ambient", transport: "Local" },
  { id: "7", commodity: "Cooking Oil", icon: "🫙", category: "OIL", material: "Al Laminate", confidence: 93, shelfLife: 365, improvement: 52, cost: 22.0, ecoScore: 35, date: "2026-09-18", storage: "Ambient", transport: "Export" },
  { id: "8", commodity: "Mango", icon: "🥭", category: "FRUITS", material: "Breathable PE", confidence: 87, shelfLife: 21, improvement: 50, cost: 9.5, ecoScore: 62, date: "2026-09-15", storage: "Cold", transport: "Domestic" },
]

export default function HistoryPage() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("date")

  const filtered = mockHistory.filter(r =>
    r.commodity.toLowerCase().includes(search.toLowerCase()) ||
    r.material.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  )

  function toggleSelect(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recommendation History</h1>
          <p className="text-sm text-gray-500 mt-1">View, search and manage all your packaging recommendations.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90">
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total", value: mockHistory.length, color: "text-blue-700 bg-blue-50" },
          { label: "This Month", value: 5, color: "text-green-700 bg-green-50" },
          { label: "Avg Confidence", value: "88%", color: "text-purple-700 bg-purple-50" },
          { label: "Avg Improvement", value: "72%", color: "text-orange-700 bg-orange-50" },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl ${s.color} p-4`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by commodity, material, category..."
              className="w-full pl-10 pr-4 h-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="h-10 pl-3 pr-8 rounded-xl border border-gray-200 text-sm appearance-none bg-white focus:outline-none">
                <option value="date">Date</option>
                <option value="confidence">Confidence</option>
                <option value="improvement">Improvement</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button className="flex items-center space-x-2 border border-gray-200 px-3 h-10 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="w-10 px-4 py-3"><input type="checkbox" className="rounded" /></th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Commodity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Recommended Material</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Confidence</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Shelf Life</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Improvement</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Eco Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(rec => (
                <tr key={rec.id} className={`hover:bg-gray-50 transition-colors ${selected.includes(rec.id) ? "bg-green-50" : ""}`}>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selected.includes(rec.id)} onChange={() => toggleSelect(rec.id)} className="rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{rec.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{rec.commodity}</p>
                        <p className="text-xs text-gray-500">{rec.category} • {rec.storage}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-800">{rec.material}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${rec.confidence}%` }} />
                      </div>
                      <span className="font-semibold text-primary text-xs">{rec.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{rec.shelfLife} days</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                      ↑ {rec.improvement}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <div className="w-12 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${rec.ecoScore}%` }} />
                      </div>
                      <span className="text-xs text-gray-600">{rec.ecoScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{rec.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {filtered.length} of {mockHistory.length} recommendations</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 bg-primary text-white rounded-lg">1</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
