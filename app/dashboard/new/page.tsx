"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  RotateCcw, Zap, Droplets, Wheat, FlaskConical,
  Thermometer, Wind, Truck, ChevronDown, CheckCircle2,
  AlertCircle, Info
} from "lucide-react"
import { recommendPackaging, type FoodInput, type MaterialScore } from "@/lib/packagingEngine"
import ResultsSection from "./ResultsSection"

const FOOD_CATEGORIES = [
  "FRESH", "PROCESSED", "FROZEN", "BAKERY", "DAIRY",
  "MEAT", "SEAFOOD", "BEVERAGE", "GRAINS", "PULSES",
  "OIL", "VEGETABLES", "FRUITS"
]

const FOOD_PRESETS: Record<string, Partial<FoodInput>> = {
  Apple: {
    category: "FRUITS", moisturePercent: 85, oilPercent: 0.5, proteinPercent: 0.3,
    sugarPercent: 12, waterActivity: 0.98, pH: 3.5, respirationRate: 30, density: 0.85,
    storageType: "COLD", temperature: 4, humidity: 90,
  },
  Milk: {
    category: "DAIRY", moisturePercent: 87, oilPercent: 3.5, proteinPercent: 3.4,
    sugarPercent: 5, waterActivity: 0.99, pH: 6.7, respirationRate: 0, density: 1.03,
    storageType: "COLD", temperature: 4, humidity: 80,
  },
  Rice: {
    category: "GRAINS", moisturePercent: 12, oilPercent: 0.5, proteinPercent: 7.5,
    sugarPercent: 0.5, waterActivity: 0.55, pH: 7.0, respirationRate: 0, density: 0.85,
    storageType: "AMBIENT", temperature: 25, humidity: 60,
  },
  Tomato: {
    category: "VEGETABLES", moisturePercent: 94, oilPercent: 0.2, proteinPercent: 1.0,
    sugarPercent: 3.0, waterActivity: 0.99, pH: 4.2, respirationRate: 18, density: 0.7,
    storageType: "COLD", temperature: 12, humidity: 85,
  },
  Bread: {
    category: "BAKERY", moisturePercent: 38, oilPercent: 3, proteinPercent: 8,
    sugarPercent: 5, waterActivity: 0.95, pH: 5.8, respirationRate: 0, density: 0.45,
    storageType: "AMBIENT", temperature: 22, humidity: 55,
  },
  Chicken: {
    category: "MEAT", moisturePercent: 65, oilPercent: 12, proteinPercent: 22,
    sugarPercent: 0, waterActivity: 0.99, pH: 5.7, respirationRate: 0, density: 1.1,
    storageType: "COLD", temperature: 2, humidity: 75,
  },
}

const defaultInput: FoodInput = {
  commodityName: "", category: "FRUITS",
  moisturePercent: 85, oilPercent: 0.5, proteinPercent: 0.3,
  sugarPercent: 12, waterActivity: 0.98, pH: 3.5, respirationRate: 30, density: 0.85,
  storageType: "COLD", temperature: 4, humidity: 90,
  transportation: "DOMESTIC", distance: 500,
  shelfLifeRequired: 30, packagingQuantity: 1000,
}

export default function NewRecommendationPage() {
  const router = useRouter()
  const [input, setInput] = useState<FoodInput>({ ...defaultInput, commodityName: "Apple" })
  const [results, setResults] = useState<MaterialScore[] | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function update(field: keyof FoodInput, value: string | number) {
    setInput(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: "" }))
  }

  function applyPreset(name: string) {
    const preset = FOOD_PRESETS[name]
    if (preset) setInput(prev => ({ ...prev, ...preset, commodityName: name }))
  }

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!input.commodityName) errs.commodityName = "Required"
    if (input.moisturePercent < 0 || input.moisturePercent > 100) errs.moisturePercent = "0–100"
    if (input.pH < 0 || input.pH > 14) errs.pH = "0–14"
    if (input.waterActivity < 0 || input.waterActivity > 1) errs.waterActivity = "0–1"
    if (input.shelfLifeRequired < 1) errs.shelfLifeRequired = "Min 1 day"
    if (input.packagingQuantity < 1) errs.packagingQuantity = "Min 1 unit"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleAnalyze() {
    if (!validate()) return
    setAnalyzing(true)
    setResults(null)
    await new Promise(r => setTimeout(r, 1800))
    const recs = recommendPackaging(input)
    setResults(recs)
    setAnalyzing(false)
    setTimeout(() => {
      document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  function handleReset() {
    setInput({ ...defaultInput })
    setResults(null)
    setErrors({})
  }

  return (
    <div className="p-6 space-y-6">
      {/* Section 1: Input Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Enter Food & Storage Details</h2>
              <p className="text-sm text-gray-500">Provide key parameters to get AI-powered packaging recommendations.</p>
            </div>
          </div>
          <button onClick={handleReset} className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg">
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-500 mb-2">Quick Presets</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(FOOD_PRESETS).map(name => (
              <button key={name} onClick={() => applyPreset(name)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${input.commodityName === name ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary hover:text-primary"}`}>
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Form grid matching the screenshot exactly */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Col 1: Food Commodity */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700">Food Commodity *</p>
            <div className="relative">
              <input
                value={input.commodityName}
                onChange={e => update("commodityName", e.target.value)}
                placeholder="e.g. Apple"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {errors.commodityName && <p className="text-xs text-red-500 mt-1">{errors.commodityName}</p>}
            </div>
            <div className="relative">
              <select
                value={input.category}
                onChange={e => update("category", e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none bg-white"
              >
                {FOOD_CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Food image preview */}
            <div className="rounded-xl overflow-hidden border border-gray-200 h-32 bg-gray-50 flex items-center justify-center">
              <span className="text-6xl">{
                { Apple: "🍎", Milk: "🥛", Rice: "🌾", Tomato: "🍅", Bread: "🍞", Chicken: "🍗" }[input.commodityName] || "🥬"
              }</span>
            </div>
          </div>

          {/* Col 2: Food Properties */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">Food Properties</p>
            {([
              { label: "Moisture Content (%)", field: "moisturePercent", icon: <Droplets className="w-4 h-4 text-blue-500" />, min: 0, max: 100, step: 0.1 },
              { label: "Sugar Content (%)", field: "sugarPercent", icon: <FlaskConical className="w-4 h-4 text-yellow-500" />, min: 0, max: 100, step: 0.1 },
              { label: "pH", field: "pH", icon: <FlaskConical className="w-4 h-4 text-purple-500" />, min: 0, max: 14, step: 0.1 },
              { label: "Respiration Rate (mg CO₂/kg·hr)", field: "respirationRate", icon: <Wind className="w-4 h-4 text-green-500" />, min: 0, max: 200, step: 1 },
            ] as const).map(({ label, field, icon, min, max, step }) => (
              <div key={field} className="flex items-center space-x-2">
                <div className="flex-shrink-0">{icon}</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                  <input
                    type="number" min={min} max={max} step={step}
                    value={(input as any)[field]}
                    onChange={e => update(field as keyof FoodInput, parseFloat(e.target.value))}
                    className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {errors[field] && <p className="text-xs text-red-500">{errors[field]}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Col 3: Storage Conditions */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">Storage Conditions</p>
            <div>
              <p className="text-xs text-gray-500 mb-1">Storage Type</p>
              <div className="relative">
                <select value={input.storageType} onChange={e => update("storageType", e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="COLD">Chilled (0–5°C)</option>
                  <option value="AMBIENT">Ambient</option>
                  <option value="FROZEN">Frozen (-18°C)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Temperature (°C)</p>
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <input type="number" value={input.temperature} onChange={e => update("temperature", parseFloat(e.target.value))}
                  className="flex-1 h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Relative Humidity (%)</p>
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <input type="number" min={0} max={100} value={input.humidity} onChange={e => update("humidity", parseFloat(e.target.value))}
                  className="flex-1 h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
          </div>

          {/* Col 4: Transportation + Shelf Life */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">Transportation</p>
            <div>
              <p className="text-xs text-gray-500 mb-1">Transportation Type</p>
              <div className="relative">
                <select value={input.transportation} onChange={e => update("transportation", e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="LOCAL">Local</option>
                  <option value="DOMESTIC">Domestic</option>
                  <option value="EXPORT">Export</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Distance</p>
              <div className="relative">
                <select value={input.distance || 500} onChange={e => update("distance", parseFloat(e.target.value))}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value={100}>Short (&lt;100 km)</option>
                  <option value={500}>Medium (&lt;1000 km)</option>
                  <option value={2000}>Long (&gt;1000 km)</option>
                  <option value={5000}>International</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Shelf Life Required (days)</p>
              <input type="number" min={1} value={input.shelfLifeRequired} onChange={e => update("shelfLifeRequired", parseInt(e.target.value))}
                className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              {errors.shelfLifeRequired && <p className="text-xs text-red-500">{errors.shelfLifeRequired}</p>}
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Packaging Quantity (units)</p>
              <input type="number" min={1} value={input.packagingQuantity} onChange={e => update("packagingQuantity", parseInt(e.target.value))}
                className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>

            {/* Analyze button */}
            <button onClick={handleAnalyze} disabled={analyzing}
              className="w-full mt-2 flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 disabled:opacity-70 text-white py-3 rounded-xl font-semibold text-sm transition-colors">
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>✦ Analyze Packaging →</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analyzing Progress */}
      {analyzing && (
        <div className="bg-white rounded-2xl border border-primary/30 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="font-semibold text-gray-900">Running Packaging Analysis...</p>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            {["Validating food parameters", "Classifying food type", "Detecting barrier requirements", "Matching packaging database", "Scoring materials", "Generating AI insights"].map((step, i) => (
              <div key={step} className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results && !analyzing && (
        <div id="results-section">
          <ResultsSection results={results} input={input} />
        </div>
      )}
    </div>
  )
}
