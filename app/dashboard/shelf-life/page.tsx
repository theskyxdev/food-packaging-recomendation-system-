"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { TrendingUp, Clock, AlertCircle, CheckCircle2 } from "lucide-react"

function buildFreshnessCurve(traditional: number, optimized: number) {
  const points = []
  for (let day = 0; day <= optimized + 5; day += Math.ceil(optimized / 20)) {
    const tVal = day <= traditional ? Math.max(0, 100 - (day / traditional) * 100) : 0
    const oVal = day <= optimized ? Math.max(0, 100 - (day / optimized) * 100) : 0
    points.push({ day, traditional: Math.round(tVal), optimized: Math.round(oVal) })
  }
  return points
}

const presets = [
  { name: "Apple", trad: 7, factor: 2.0 },
  { name: "Milk", trad: 7, factor: 1.5 },
  { name: "Rice", trad: 180, factor: 1.1 },
  { name: "Tomato", trad: 5, factor: 1.7 },
  { name: "Bread", trad: 5, factor: 1.5 },
  { name: "Fish", trad: 2, factor: 3.0 },
]

export default function ShelfLifePage() {
  const [traditional, setTraditional] = useState(14)
  const [factor, setFactor] = useState(2.0)
  const [commodity, setCommodity] = useState("Apple")

  const optimized = Math.round(traditional * factor)
  const improvement = Math.round((factor - 1) * 100)
  const spoilageRisk = factor >= 2 ? "Low" : factor >= 1.5 ? "Medium" : "High"
  const qualityScore = Math.min(100, Math.round(factor * 45))
  const data = buildFreshnessCurve(traditional, optimized)

  function applyPreset(p: typeof presets[0]) {
    setCommodity(p.name)
    setTraditional(p.trad)
    setFactor(p.factor)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Shelf Life Predictor</h1>
        <p className="text-sm text-gray-500 mt-1">Predict and compare shelf life improvements with optimized packaging.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-5">
          <h3 className="font-semibold text-gray-900">Parameters</h3>

          {/* Presets */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Quick Presets</p>
            <div className="flex flex-wrap gap-2">
              {presets.map(p => (
                <button key={p.name} onClick={() => applyPreset(p)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border ${commodity === p.name ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary"}`}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Commodity Name</label>
              <input value={commodity} onChange={e => setCommodity(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Traditional Shelf Life (days): <strong>{traditional}</strong></label>
              <input type="range" min={1} max={365} value={traditional} onChange={e => setTraditional(+e.target.value)}
                className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Packaging Improvement Factor: <strong>{factor}x</strong></label>
              <input type="range" min={1.0} max={5.0} step={0.1} value={factor} onChange={e => setFactor(+e.target.value)}
                className="w-full accent-primary" />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Traditional Shelf Life</span>
              <span className="font-semibold text-gray-900">{traditional} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Optimized Shelf Life</span>
              <span className="font-bold text-primary">{optimized} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Improvement</span>
              <span className="font-bold text-green-600">↑ {improvement}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Spoilage Risk</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${spoilageRisk === "Low" ? "bg-green-100 text-green-700" : spoilageRisk === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                {spoilageRisk}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Quality Score</span>
              <span className="font-semibold text-blue-600">{qualityScore}/100</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Freshness Curve — {commodity}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" label={{ value: "Days", position: "insideBottomRight", offset: -5 }}
                  tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis label={{ value: "Quality %", angle: -90, position: "insideLeft" }}
                  tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip formatter={(val, name) => [`${val}%`, name === "traditional" ? "Traditional" : "Optimized"]} />
                <ReferenceLine y={20} stroke="#EF4444" strokeDasharray="4 4" label={{ value: "Spoilage Zone", position: "right", fontSize: 10 }} />
                <Line type="monotone" dataKey="traditional" stroke="#9CA3AF" strokeWidth={2} dot={false} name="Traditional" />
                <Line type="monotone" dataKey="optimized" stroke="#16A34A" strokeWidth={2.5} dot={false} name="Optimized" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center space-x-6 mt-3 text-xs">
              <div className="flex items-center space-x-2"><div className="w-4 h-0.5 bg-gray-400" /><span>Traditional Packaging</span></div>
              <div className="flex items-center space-x-2"><div className="w-4 h-0.5 bg-primary" /><span>Optimized Packaging</span></div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold text-primary">{improvement}%</p>
              <p className="text-xs text-gray-500 mt-1">Shelf Life Improvement</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-blue-700">{optimized}</p>
              <p className="text-xs text-gray-500 mt-1">Optimized Days</p>
            </div>
            <div className={`border rounded-2xl p-4 text-center ${spoilageRisk === "Low" ? "bg-green-50 border-green-100" : "bg-yellow-50 border-yellow-100"}`}>
              {spoilageRisk === "Low" ? <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" /> : <AlertCircle className="w-6 h-6 text-yellow-600 mx-auto mb-2" />}
              <p className={`text-3xl font-bold ${spoilageRisk === "Low" ? "text-green-700" : "text-yellow-700"}`}>{spoilageRisk}</p>
              <p className="text-xs text-gray-500 mt-1">Spoilage Risk</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
