"use client"

import { Search, Plus, Edit2, Trash2, Filter } from "lucide-react"

const commodities = [
  { id: "1", name: "Apple", category: "FRUITS", moisture: 85, pH: 3.5, aw: 0.98, respiration: 30 },
  { id: "2", name: "Milk", category: "DAIRY", moisture: 87, pH: 6.7, aw: 0.99, respiration: 0 },
  { id: "3", name: "Rice", category: "GRAINS", moisture: 12, pH: 7.0, aw: 0.55, respiration: 0 },
  { id: "4", name: "Tomato", category: "VEGETABLES", moisture: 94, pH: 4.2, aw: 0.99, respiration: 18 },
  { id: "5", name: "Bread", category: "BAKERY", moisture: 38, pH: 5.8, aw: 0.95, respiration: 0 },
]

export default function CommoditiesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Food Commodities Database</h1>
        <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium">
          <Plus className="w-4 h-4" />
          <span>Add Commodity</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center space-x-3">
        <Search className="w-4 h-4 text-gray-400" />
        <input placeholder="Search commodities..." className="flex-1 outline-none text-sm" />
        <button className="flex items-center space-x-2 border border-gray-200 px-3 h-10 rounded-xl text-sm text-gray-600">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Category", "Moisture %", "pH", "Water Activity", "Respiration", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {commodities.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3"><span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs">{c.category}</span></td>
                <td className="px-4 py-3">{c.moisture}%</td>
                <td className="px-4 py-3">{c.pH}</td>
                <td className="px-4 py-3">{c.aw}</td>
                <td className="px-4 py-3">{c.respiration}</td>
                <td className="px-4 py-3 flex space-x-2">
                  <button className="p-1 rounded hover:bg-gray-100"><Edit2 className="w-4 h-4 text-gray-400" /></button>
                  <button className="p-1 rounded hover:bg-red-50"><Trash2 className="w-4 h-4 text-gray-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
