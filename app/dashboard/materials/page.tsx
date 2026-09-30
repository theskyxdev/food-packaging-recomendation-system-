"use client"

import { useState } from "react"
import { Search, Plus, Edit2, Trash2, ChevronDown, Package, Filter } from "lucide-react"

const materials = [
  { id: "1", name: "PET Film", type: "Monolayer", otr: 80, wvtr: 15, thickness: "12–50 μm", costPerKg: 10.5, recyclable: true, biodegradable: false, strength: "HIGH", categories: ["Fruits", "Vegetables", "Dairy"], ecoScore: 70 },
  { id: "2", name: "HDPE Film", type: "Monolayer", otr: 400, wvtr: 8, thickness: "50–100 μm", costPerKg: 8.5, recyclable: true, biodegradable: false, strength: "HIGH", categories: ["Dairy", "Beverage"], ecoScore: 65 },
  { id: "3", name: "BOPP Film", type: "Monolayer", otr: 1500, wvtr: 3, thickness: "20–50 μm", costPerKg: 7.5, recyclable: true, biodegradable: false, strength: "MEDIUM", categories: ["Grains", "Bakery"], ecoScore: 60 },
  { id: "4", name: "LDPE Film", type: "Monolayer", otr: 7700, wvtr: 20, thickness: "25–100 μm", costPerKg: 7.0, recyclable: true, biodegradable: false, strength: "LOW", categories: ["Fresh", "Vegetables"], ecoScore: 58 },
  { id: "5", name: "Aluminium Foil Laminate", type: "High Barrier Laminate", otr: 0.01, wvtr: 0.01, thickness: "100–150 μm", costPerKg: 22.0, recyclable: false, biodegradable: false, strength: "HIGH", categories: ["Processed", "Dairy", "Oil"], ecoScore: 35 },
  { id: "6", name: "PLA Compostable", type: "Biodegradable", otr: 800, wvtr: 150, thickness: "25–60 μm", costPerKg: 18.0, recyclable: false, biodegradable: true, strength: "LOW", categories: ["Fresh", "Bakery"], ecoScore: 90 },
  { id: "7", name: "Vacuum PA/PE", type: "Vacuum Packaging", otr: 25, wvtr: 8, thickness: "80–120 μm", costPerKg: 14.5, recyclable: false, biodegradable: false, strength: "HIGH", categories: ["Meat", "Seafood"], ecoScore: 55 },
  { id: "8", name: "Breathable PE Film", type: "Active Packaging", otr: 50000, wvtr: 5000, thickness: "25–50 μm", costPerKg: 9.5, recyclable: true, biodegradable: false, strength: "LOW", categories: ["Fresh", "Vegetables", "Fruits"], ecoScore: 62 },
  { id: "9", name: "Metalized BOPP", type: "Metalized", otr: 15, wvtr: 0.5, thickness: "20–45 μm", costPerKg: 11.0, recyclable: false, biodegradable: false, strength: "MEDIUM", categories: ["Grains", "Processed"], ecoScore: 45 },
  { id: "10", name: "Cellulose Paper Laminate", type: "Paper-based", otr: 2000, wvtr: 200, thickness: "50–100 μm", costPerKg: 6.5, recyclable: true, biodegradable: true, strength: "LOW", categories: ["Bakery", "Grains"], ecoScore: 85 },
]

export default function MaterialsPage() {
  const [search, setSearch] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  const filtered = materials.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Packaging Materials Database</h1>
          <p className="text-sm text-gray-500 mt-1">{materials.length} materials in database</p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          <span>Add Material</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Materials", value: materials.length, color: "bg-blue-50 text-blue-700" },
          { label: "Recyclable", value: materials.filter(m => m.recyclable).length, color: "bg-green-50 text-green-700" },
          { label: "Biodegradable", value: materials.filter(m => m.biodegradable).length, color: "bg-emerald-50 text-emerald-700" },
          { label: "Avg Eco Score", value: Math.round(materials.reduce((a, m) => a + m.ecoScore, 0) / materials.length), color: "bg-purple-50 text-purple-700" },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl ${s.color} p-4`}>
            <p className="text-2xl font-bold">{s.value}{s.label === "Avg Eco Score" ? "%" : ""}</p>
            <p className="text-sm mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search materials by name or type..."
            className="w-full pl-10 pr-4 h-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <button className="flex items-center space-x-2 border border-gray-200 px-3 h-10 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Material Name", "Type", "OTR (cc/m²/day)", "WVTR (g/m²/day)", "Thickness", "Cost/kg", "Recyclable", "Biodegradable", "Eco Score", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(mat => (
                <tr key={mat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Package className="w-4 h-4 text-gray-500" />
                      </div>
                      <span className="font-medium text-gray-900">{mat.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{mat.type}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{mat.otr}</td>
                  <td className="px-4 py-3 text-gray-700">{mat.wvtr}</td>
                  <td className="px-4 py-3 text-gray-700">{mat.thickness}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">₹{mat.costPerKg}</td>
                  <td className="px-4 py-3">{mat.recyclable ? <span className="text-green-600">✅ Yes</span> : <span className="text-red-400">❌ No</span>}</td>
                  <td className="px-4 py-3">{mat.biodegradable ? <span className="text-green-600">✅ Yes</span> : <span className="text-red-400">❌ No</span>}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${mat.ecoScore}%` }} />
                      </div>
                      <span className="text-xs font-medium text-green-700">{mat.ecoScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600">
                        <Edit2 className="w-3.5 h-3.5" />
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
      </div>

      {/* Add Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Packaging Material</h3>
            <div className="grid grid-cols-2 gap-4">
              {["Material Name", "Type", "OTR (cc/m²/day)", "WVTR (g/m²/day)", "Thickness (μm)", "Cost per kg (₹)"].map(field => (
                <div key={field}>
                  <label className="text-xs text-gray-500 mb-1 block">{field}</label>
                  <input className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
              <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90">Add Material</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
