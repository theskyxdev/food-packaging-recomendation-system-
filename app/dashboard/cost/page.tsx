"use client"

import { useState } from "react"
import { DollarSign, TrendingDown, Package, Percent } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function CostCalculatorPage() {
  const [costPerKg, setCostPerKg] = useState(12.5)
  const [quantity, setQuantity] = useState(1000)
  const [weightPerUnit, setWeightPerUnit] = useState(0.05)
  const [traditionalCost, setTraditionalCost] = useState(18.0)
  const [revenuePerUnit, setRevenuePerUnit] = useState(50)
  const [wasteReduction, setWasteReduction] = useState(30)

  const totalPackagingCost = costPerKg * quantity * weightPerUnit
  const costPerUnit = costPerKg * weightPerUnit
  const traditionalTotal = traditionalCost * quantity * weightPerUnit
  const savings = traditionalTotal - totalPackagingCost
  const savingsPercent = Math.round((savings / traditionalTotal) * 100)
  const wasteValueSaved = quantity * revenuePerUnit * (wasteReduction / 100) * 0.1
  const roi = Math.round(((savings + wasteValueSaved) / totalPackagingCost) * 100)

  const data = [
    { name: "Traditional", cost: Math.round(traditionalTotal) },
    { name: "Optimized", cost: Math.round(totalPackagingCost) },
    { name: "Savings", cost: Math.round(savings) },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cost Calculator</h1>
        <p className="text-sm text-gray-500 mt-1">Calculate packaging costs, savings, and ROI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <h3 className="font-semibold text-gray-900">Parameters</h3>
          {[
            { label: "Recommended Material Cost (₹/kg)", val: costPerKg, set: setCostPerKg, min: 1, max: 100, step: 0.5 },
            { label: "Traditional Material Cost (₹/kg)", val: traditionalCost, set: setTraditionalCost, min: 1, max: 100, step: 0.5 },
            { label: "Packaging Quantity (units)", val: quantity, set: setQuantity, min: 1, max: 100000, step: 100 },
            { label: "Weight per Unit (kg)", val: weightPerUnit, set: setWeightPerUnit, min: 0.001, max: 10, step: 0.01 },
            { label: "Revenue per Unit (₹)", val: revenuePerUnit, set: setRevenuePerUnit, min: 1, max: 10000, step: 10 },
            { label: "Waste Reduction (%)", val: wasteReduction, set: setWasteReduction, min: 0, max: 100, step: 5 },
          ].map(({ label, val, set, min, max, step }) => (
            <div key={label}>
              <label className="text-xs text-gray-500 mb-1 block">{label}: <strong>{val}</strong></label>
              <input type="range" min={min} max={max} step={step} value={val}
                onChange={e => set(parseFloat(e.target.value))}
                className="w-full accent-primary" />
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Packaging Cost", value: `₹${totalPackagingCost.toFixed(0)}`, icon: Package, bg: "bg-blue-50 text-blue-700", subtext: `₹${costPerUnit.toFixed(2)}/unit` },
              { label: "Cost Savings", value: `₹${savings.toFixed(0)}`, icon: TrendingDown, bg: "bg-green-50 text-green-700", subtext: `${savingsPercent}% reduction` },
              { label: "Waste Reduction Value", value: `₹${wasteValueSaved.toFixed(0)}`, icon: Percent, bg: "bg-amber-50 text-amber-700", subtext: `${wasteReduction}% waste saved` },
              { label: "ROI", value: `${roi}%`, icon: DollarSign, bg: "bg-purple-50 text-purple-700", subtext: "Return on investment" },
            ].map(card => (
              <div key={card.label} className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                  <card.icon className="w-4 h-4" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
                <p className="text-xs text-green-600 mt-1">{card.subtext}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Cost Comparison (₹)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data} barSize={50}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: any) => [`₹${v}`, "Cost"]} />
                <Bar dataKey="cost" radius={[8, 8, 0, 0]}
                  fill="#16A34A"
                  label={{ position: "top", fontSize: 11, formatter: (v: any) => `₹${v}` }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown Table */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Detailed Cost Breakdown</h3>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Material Cost per kg", `₹${costPerKg}`],
                  ["Total Material Cost", `₹${(costPerKg * quantity * weightPerUnit).toFixed(2)}`],
                  ["Cost per Unit", `₹${costPerUnit.toFixed(3)}`],
                  ["Traditional Total", `₹${traditionalTotal.toFixed(2)}`],
                  ["Cost Saving", `₹${savings.toFixed(2)} (${savingsPercent}%)`],
                  ["Waste Reduction Value", `₹${wasteValueSaved.toFixed(2)}`],
                  ["Total Benefit", `₹${(savings + wasteValueSaved).toFixed(2)}`],
                  ["ROI", `${roi}%`],
                ].map(([label, val]) => (
                  <tr key={label as string}>
                    <td className="py-2.5 text-gray-500">{label}</td>
                    <td className="py-2.5 font-semibold text-gray-900 text-right">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
