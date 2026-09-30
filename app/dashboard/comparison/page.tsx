"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts"

const ALL_MATERIALS = [
  { name: "PET + LDPE", otr: 50, wvtr: 5, cost: 12.5, shelfLife: 28, strength: 90, recyclability: 85, biodegradable: 20, eco: 72, color: "#16A34A" },
  { name: "HDPE Film", otr: 400, wvtr: 8, cost: 8.5, shelfLife: 18, strength: 85, recyclability: 90, biodegradable: 10, eco: 65, color: "#3B82F6" },
  { name: "BOPP Film", otr: 1500, wvtr: 3, cost: 7.5, shelfLife: 14, strength: 70, recyclability: 80, biodegradable: 10, eco: 60, color: "#8B5CF6" },
  { name: "Al Laminate", otr: 0.01, wvtr: 0.01, cost: 22.0, shelfLife: 365, strength: 95, recyclability: 10, biodegradable: 5, eco: 35, color: "#F59E0B" },
  { name: "PLA Film", otr: 800, wvtr: 150, cost: 18.0, shelfLife: 14, strength: 45, recyclability: 30, biodegradable: 100, eco: 90, color: "#10B981" },
  { name: "Vacuum PA/PE", otr: 25, wvtr: 8, cost: 14.5, shelfLife: 21, strength: 92, recyclability: 25, biodegradable: 5, eco: 55, color: "#EF4444" },
  { name: "Breathable PE", otr: 50000, wvtr: 5000, cost: 9.5, shelfLife: 21, strength: 50, recyclability: 80, biodegradable: 10, eco: 62, color: "#EC4899" },
  { name: "Metalized BOPP", otr: 15, wvtr: 0.5, cost: 11.0, shelfLife: 180, strength: 75, recyclability: 15, biodegradable: 5, eco: 45, color: "#6366F1" },
]

export default function ComparisonPage() {
  const [selected, setSelected] = useState(["PET + LDPE", "HDPE Film", "PLA Film"])

  function toggle(name: string) {
    if (selected.includes(name)) {
      if (selected.length > 1) setSelected(prev => prev.filter(n => n !== name))
    } else {
      if (selected.length < 5) setSelected(prev => [...prev, name])
    }
  }

  const selectedMats = ALL_MATERIALS.filter(m => selected.includes(m.name))

  const radarData = [
    { subject: "O₂ Barrier", ...Object.fromEntries(selectedMats.map(m => [m.name, Math.max(0, 100 - Math.min(100, Math.log10(m.otr + 1) * 20))])) },
    { subject: "Moisture Barrier", ...Object.fromEntries(selectedMats.map(m => [m.name, Math.max(0, 100 - Math.min(100, m.wvtr * 2))])) },
    { subject: "Eco Score", ...Object.fromEntries(selectedMats.map(m => [m.name, m.eco])) },
    { subject: "Recyclability", ...Object.fromEntries(selectedMats.map(m => [m.name, m.recyclability])) },
    { subject: "Strength", ...Object.fromEntries(selectedMats.map(m => [m.name, m.strength])) },
    { subject: "Cost Eff.", ...Object.fromEntries(selectedMats.map(m => [m.name, Math.max(0, 100 - m.cost * 3)])) },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Packaging Comparison</h1>
        <p className="text-sm text-gray-500 mt-1">Compare up to 5 packaging materials side by side.</p>
      </div>

      {/* Material Selector */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Select Materials ({selected.length}/5)</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_MATERIALS.map(m => (
            <button key={m.name} onClick={() => toggle(m.name)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${selected.includes(m.name) ? "text-white border-transparent" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"}`}
              style={selected.includes(m.name) ? { backgroundColor: m.color, borderColor: m.color } : {}}>
              {selected.includes(m.name) && <X className="w-3.5 h-3.5" />}
              <span>{m.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Performance Radar</h3>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              {selectedMats.map(m => (
                <Radar key={m.name} name={m.name} dataKey={m.name}
                  stroke={m.color} fill={m.color} fillOpacity={0.1} />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart — Eco + Cost */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Eco Score vs Cost/kg</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={selectedMats.map(m => ({ name: m.name.split(" ")[0], ecoScore: m.eco, cost: m.cost }))} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="ecoScore" name="Eco Score" fill="#16A34A" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cost" name="Cost ₹/kg" fill="#60A5FA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Detailed Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Property</th>
                {selectedMats.map(m => (
                  <th key={m.name} className="px-4 py-3 text-center text-xs font-semibold" style={{ color: m.color }}>{m.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { label: "OTR (cc/m²/day)", key: "otr" as const, format: (v: number) => v < 1 ? "< 0.01" : String(v) },
                { label: "WVTR (g/m²/day)", key: "wvtr" as const, format: (v: number) => String(v) },
                { label: "Cost (₹/kg)", key: "cost" as const, format: (v: number) => `₹${v}` },
                { label: "Shelf Life (days)", key: "shelfLife" as const, format: (v: number) => String(v) },
                { label: "Eco Score", key: "eco" as const, format: (v: number) => `${v}%` },
                { label: "Recyclability", key: "recyclability" as const, format: (v: number) => `${v}%` },
                { label: "Biodegradable", key: "biodegradable" as const, format: (v: number) => v >= 80 ? "✅ Yes" : "❌ No" },
              ].map(row => (
                <tr key={row.label} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-700">{row.label}</td>
                  {selectedMats.map(m => (
                    <td key={m.name} className="px-4 py-3 text-center text-gray-900">{row.format(m[row.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
