"use client"

import { useState } from "react"
import { CheckCircle2, Copy, AlertCircle, Leaf, DollarSign, Layers } from "lucide-react"
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import type { MaterialScore, FoodInput } from "@/lib/packagingEngine"

type Tab = "Recommended" | "Comparison" | "Details" | "Sustainability"

interface Props { results: MaterialScore[]; input: FoodInput }

export default function ResultsSection({ results, input }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Recommended")
  const [selectedIdx, setSelectedIdx] = useState(0)
  const best = results[0]
  const selected = results[selectedIdx]

  const radarData = [
    { subject: "O₂ Barrier", value: Math.max(0, 100 - Math.min(100, selected.otr / 10)) },
    { subject: "Moisture", value: Math.max(0, 100 - Math.min(100, selected.wvtr * 10)) },
    { subject: "Eco Score", value: selected.ecoScore },
    { subject: "Recyclability", value: selected.recyclable ? 90 : 20 },
    { subject: "Strength", value: 75 },
    { subject: "Cost Eff.", value: Math.max(0, 100 - (selected.costPerKg - 5) * 4) },
  ]

  const comparisonData = results.map(r => ({
    name: r.name.split(" ")[0],
    confidence: r.confidence,
    ecoScore: r.ecoScore,
    shelfLife: r.shelfLifeDays,
    cost: r.costPerKg,
  }))

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">AI Recommendation Results</h2>
            <p className="text-sm text-gray-500">Optimized packaging material and specifications based on your inputs.</p>
          </div>
        </div>
        {/* Tab bar */}
        <div className="flex bg-gray-100 rounded-xl p-1 text-xs font-medium">
          {(["Recommended", "Comparison", "Details", "Sustainability"] as Tab[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === tab ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Recommended" && (
        <div className="space-y-6">
          {/* Best Match Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Material Info */}
            <div className="md:col-span-1 space-y-4">
              <div className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Best Match</span>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">{best.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs font-bold">
                    {best.confidence}% Match
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mock image */}
              <div className="rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 h-36 flex items-center justify-center">
                <span className="text-5xl">📦</span>
              </div>

              <p className="text-sm text-gray-600">
                Provides excellent oxygen barrier, maintains freshness, and suitable for chilled storage. Ideal for fruits like apple.
              </p>

              <div className="space-y-1.5">
                {best.advantages.slice(0, 4).map(a => (
                  <div key={a} className="flex items-center space-x-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>

              {/* Other options */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500">Other Options</p>
                {results.slice(1).map((r, i) => (
                  <button key={r.name} onClick={() => setSelectedIdx(i + 1)}
                    className={`w-full text-left flex items-center justify-between p-2.5 rounded-xl border transition-colors text-sm ${selectedIdx === i + 1 ? "border-primary bg-green-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <span className="font-medium text-gray-800 truncate">{r.name}</span>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{r.confidence}%</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Middle: Key Specifications */}
            <div className="md:col-span-1">
              <h4 className="font-semibold text-gray-900 mb-4">Key Specifications</h4>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Oxygen Transmission Rate (OTR)", `≤ ${selected.otr} cc/m²/day`],
                    ["Water Vapor Transmission Rate (WVTR)", `≤ ${selected.wvtr} g/m²/day`],
                    ["Film Thickness", selected.thickness],
                    ["Sealability", "Excellent"],
                    ["Gas Permeability", selected.otr > 500 ? "High" : "Low"],
                    ["Mechanical Strength", "High"],
                    ["MAP Suitability", selected.mapNeeded ? "Yes (O₂: 3–5%, CO₂: 3–7%)" : "Not Required"],
                  ].map(([label, val]) => (
                    <tr key={label as string}>
                      <td className="py-2 pr-4 text-gray-500">• {label}</td>
                      <td className="py-2 text-gray-900 font-medium text-right">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Radar */}
              <div className="mt-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Performance Profile</p>
                <ResponsiveContainer width="100%" height={180}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <Radar name="Score" dataKey="value" stroke="#16A34A" fill="#16A34A" fillOpacity={0.15} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right: Shelf Life + Warnings */}
            <div className="md:col-span-1 space-y-4">
              {/* Shelf Life */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Predicted Shelf Life</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Current (Traditional)</span>
                      <span>{input.shelfLifeRequired} days</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-400 h-2 rounded-full" style={{ width: `${Math.min(100, (input.shelfLifeRequired / best.shelfLifeDays) * 100)}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>With Recommended Packaging</span>
                      <span className="font-bold text-primary">{best.shelfLifeDays} days</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-3xl font-bold text-primary">↑ {best.shelfLifeImprovement}%</p>
                  <p className="text-xs text-gray-500 mt-1">Shelf life improvement</p>
                </div>
              </div>

              {/* Packaging Layers */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Layers className="w-4 h-4 text-gray-600" />
                  <h4 className="font-semibold text-gray-900">Packaging Structure</h4>
                </div>
                <div className="space-y-2">
                  {selected.layers.map((layer) => (
                    <div key={layer.layerNumber} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-16 text-center py-1.5 rounded-lg text-xs font-medium text-white" style={{ backgroundColor: layer.color }}>
                        {layer.material.split(" ")[0]}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-800">Layer {layer.layerNumber}: {layer.material} ({layer.thickness} μm)</div>
                        <div className="text-xs text-gray-500">– {layer.purpose}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warnings */}
              {selected.warnings.length > 0 && (
                <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <p className="text-xs font-semibold text-yellow-700">Warnings</p>
                  </div>
                  {selected.warnings.map(w => (
                    <p key={w} className="text-xs text-yellow-700">• {w}</p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row: Sustainability + Cost + Layers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            {/* Sustainability */}
            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-2xl border border-green-100">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#16A34A" strokeWidth="3"
                    strokeDasharray={`${(best.ecoScore / 100) * 94.2} 94.2`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-green-700">{best.ecoScore}%</span>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-green-800">Sustainability Analysis</p>
                <div className="flex items-center space-x-1 text-green-700 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Recyclable: {best.recyclable ? "Yes" : "No"} ({best.name.split(" ")[0]})</span>
                </div>
                <div className="flex items-center space-x-1 text-green-700 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Biodegradable Alt.: {best.biodegradable ? "This material" : "PLA (optional)"}</span>
                </div>
                <div className="flex items-center space-x-1 text-green-700 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Estimated CO₂ Reduction: 32%</span>
                </div>
                <div className="flex items-center space-x-1 text-green-700 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Sustainable Option Available: Yes</span>
                </div>
              </div>
            </div>

            {/* Cost */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <div className="flex items-center space-x-2 mb-3">
                <DollarSign className="w-4 h-4 text-amber-600" />
                <p className="font-semibold text-amber-800">Cost Analysis (per kg)</p>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Packaging Cost</span>
                  <span className="font-bold text-gray-900">₹{best.costPerKg} / kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alternative (Biodegradable)</span>
                  <span className="font-bold text-gray-900">₹{(best.costPerKg * 1.44).toFixed(1)} / kg</span>
                </div>
              </div>
              <div className="mt-3 flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>20% cost reduction possible with optimized thickness</span>
              </div>
            </div>

            {/* Packaging structure visual */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center space-x-2 mb-3">
                <Layers className="w-4 h-4 text-gray-600" />
                <p className="font-semibold text-gray-800">Packaging Structure</p>
              </div>
              <div className="space-y-1.5">
                {selected.layers.map(l => (
                  <div key={l.layerNumber} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                      <span className="text-gray-700">Layer {l.layerNumber}: {l.material} ({l.thickness} μm)</span>
                    </div>
                    <span className="text-gray-500">– {l.purpose}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Comparison" && (
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-900">Material Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="confidence" fill="#16A34A" name="Confidence %" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ecoScore" fill="#60A5FA" name="Eco Score" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {["Material", "Confidence", "Eco Score", "Shelf Life", "Cost/kg", "Recyclable", "Biodegradable"].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 rounded">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((r, i) => (
                  <tr key={r.name} className={i === 0 ? "bg-green-50" : ""}>
                    <td className="px-4 py-3 font-medium text-gray-900 flex items-center space-x-2">
                      {i === 0 && <span className="text-xs bg-primary text-white px-1.5 py-0.5 rounded">Best</span>}
                      <span>{r.name}</span>
                    </td>
                    <td className="px-4 py-3"><span className="font-semibold text-primary">{r.confidence}%</span></td>
                    <td className="px-4 py-3">{r.ecoScore}%</td>
                    <td className="px-4 py-3">{r.shelfLifeDays} days</td>
                    <td className="px-4 py-3">₹{r.costPerKg}/kg</td>
                    <td className="px-4 py-3">{r.recyclable ? "✅" : "❌"}</td>
                    <td className="px-4 py-3">{r.biodegradable ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Details" && (
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-900">Technical Details — {best.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "OTR", value: `${best.otr} cc/m²/day`, desc: "Oxygen Transmission Rate" },
              { label: "WVTR", value: `${best.wvtr} g/m²/day`, desc: "Water Vapor Transmission Rate" },
              { label: "Thickness", value: best.thickness, desc: "Film Thickness Range" },
              { label: "Cost", value: `₹${best.costPerKg}/kg`, desc: "Estimated Material Cost" },
              { label: "Type", value: best.type, desc: "Film Type" },
              { label: "Layers", value: `${best.layers.length} layer(s)`, desc: "Packaging Structure" },
            ].map(({ label, value, desc }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4 space-y-1">
                <p className="text-xs text-gray-500">{desc}</p>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-primary font-medium">{label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">✅ Advantages</p>
              <ul className="space-y-1.5">
                {best.advantages.map(a => (
                  <li key={a} className="flex items-start space-x-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">⚠️ Disadvantages</p>
              <ul className="space-y-1.5">
                {best.disadvantages.map(d => (
                  <li key={d} className="flex items-start space-x-2 text-sm text-gray-700">
                    <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Sustainability" && (
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-900">Sustainability Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map((r, i) => (
              <div key={r.name} className={`rounded-2xl border p-4 ${i === 0 ? "border-primary bg-green-50" : "border-gray-200 bg-white"}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-sm text-gray-900 truncate">{r.name}</p>
                  {i === 0 && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Best Eco</span>}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#16A34A" strokeWidth="3"
                        strokeDasharray={`${(r.ecoScore / 100) * 94.2} 94.2`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-green-700">{r.ecoScore}%</span>
                    </div>
                  </div>
                  <div className="text-xs space-y-1 text-gray-600">
                    <p>Recyclable: <strong>{r.recyclable ? "Yes" : "No"}</strong></p>
                    <p>Biodegradable: <strong>{r.biodegradable ? "Yes" : "No"}</strong></p>
                    <p>Eco Score: <strong className="text-green-700">{r.ecoScore}/100</strong></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
