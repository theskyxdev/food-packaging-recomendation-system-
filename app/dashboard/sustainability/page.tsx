"use client"

import { useState } from "react"
import { Leaf, TrendingDown, Recycle, Wind } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const materials = [
  { name: "PET + LDPE", eco: 72, recyclable: true, biodegradable: false, carbon: 3.2, plastic: 40 },
  { name: "PLA Film", eco: 90, recyclable: false, biodegradable: true, carbon: 1.2, plastic: 10 },
  { name: "Al Laminate", eco: 35, recyclable: false, biodegradable: false, carbon: 8.5, plastic: 60 },
  { name: "Cellulose Paper", eco: 85, recyclable: true, biodegradable: true, carbon: 0.8, plastic: 5 },
  { name: "Breathable PE", eco: 62, recyclable: true, biodegradable: false, carbon: 2.8, plastic: 35 },
]

const COLORS = ["#16A34A", "#22C55E", "#60A5FA", "#F59E0B", "#EF4444"]

export default function SustainabilityPage() {
  const [qty, setQty] = useState(10000)

  const carbonData = materials.map(m => ({ name: m.name.split(" ")[0], carbon: m.carbon, eco: m.eco }))
  const pieData = [
    { name: "Recyclable", value: materials.filter(m => m.recyclable).length },
    { name: "Biodegradable", value: materials.filter(m => m.biodegradable).length },
    { name: "Standard", value: materials.filter(m => !m.recyclable && !m.biodegradable).length },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sustainability Analysis</h1>
        <p className="text-sm text-gray-500 mt-1">Eco scores, carbon footprint, and green alternatives for packaging materials.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Avg Eco Score", value: `${Math.round(materials.reduce((a, m) => a + m.eco, 0) / materials.length)}%`, icon: Leaf, color: "bg-green-50 text-green-700" },
          { label: "Recyclable Options", value: `${materials.filter(m => m.recyclable).length}/${materials.length}`, icon: Recycle, color: "bg-blue-50 text-blue-700" },
          { label: "CO₂ Saved (vs Al)", value: `${((8.5 - 1.8) * qty / 1000).toFixed(1)} ton`, icon: Wind, color: "bg-emerald-50 text-emerald-700" },
          { label: "Plastic Reduction", value: "38%", icon: TrendingDown, color: "bg-purple-50 text-purple-700" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className={`w-9 h-9 rounded-xl ${c.color} flex items-center justify-center mb-3`}>
              <c.icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{c.value}</p>
            <p className="text-xs text-gray-500 mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Eco Score Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Eco Score by Material</h3>
          <div className="space-y-4">
            {materials.sort((a, b) => b.eco - a.eco).map((m, i) => (
              <div key={m.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{m.name}</span>
                  <span className="text-sm font-bold text-green-700">{m.eco}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="h-3 rounded-full transition-all"
                    style={{ width: `${m.eco}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                </div>
                <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                  <span>{m.recyclable ? "✅ Recyclable" : "❌ Not Recyclable"}</span>
                  <span>{m.biodegradable ? "✅ Biodegradable" : "❌ Not Biodegradable"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon Footprint */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Carbon Footprint (kg CO₂/kg material)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={carbonData} barSize={35}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v, n) => [v, n === "carbon" ? "CO₂ kg" : "Eco Score"]} />
              <Bar dataKey="carbon" name="Carbon Footprint" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="eco" name="Eco Score" fill="#16A34A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Material Sustainability Distribution</h3>
          <div className="flex items-center space-x-4">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {pieData.map((p, i) => (
                <div key={p.name} className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-gray-600">{p.name}:</span>
                  <span className="font-semibold text-gray-900">{p.value} materials</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Green Alternatives */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Green Alternative Recommendations</h3>
          <div className="space-y-3">
            {[
              { from: "Aluminium Laminate", to: "PLA Compostable Film", saving: "86%", reason: "For ambient dry foods" },
              { from: "LDPE Film", to: "Cellulose Paper Laminate", saving: "68%", reason: "For bakery products" },
              { from: "Standard PET", to: "rPET (Recycled PET)", saving: "45%", reason: "Same performance, lower carbon" },
            ].map(alt => (
              <div key={alt.from} className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    <span className="text-red-500 line-through">{alt.from}</span>
                    <span className="mx-2 text-gray-400">→</span>
                    <span className="text-green-700">{alt.to}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{alt.reason}</p>
                </div>
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">-{alt.saving} CO₂</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
