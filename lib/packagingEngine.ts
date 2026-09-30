// Scientific Packaging Recommendation Engine
// Uses rule-based logic derived from food science literature

export interface FoodInput {
  commodityName: string
  category: string
  moisturePercent: number
  oilPercent: number
  proteinPercent: number
  sugarPercent: number
  waterActivity: number
  pH: number
  respirationRate: number
  density: number
  storageType: string
  temperature: number
  humidity: number
  transportation: string
  distance: number
  shelfLifeRequired: number
  packagingQuantity: number
}

export interface MaterialScore {
  name: string
  type: string
  confidence: number
  otr: number        // cc/m²/day
  wvtr: number       // g/m²/day
  thickness: string  // microns range
  costPerKg: number
  recyclable: boolean
  biodegradable: boolean
  ecoScore: number
  layers: LayerSpec[]
  shelfLifeDays: number
  shelfLifeImprovement: number
  mapNeeded: boolean
  advantages: string[]
  disadvantages: string[]
  warnings: string[]
}

export interface LayerSpec {
  layerNumber: number
  material: string
  thickness: number // microns
  purpose: string
  color: string
}

export interface PackagingRequirements {
  needOxygenBarrier: boolean
  needMoistureBarrier: boolean
  needAromaBarrier: boolean
  needUVBarrier: boolean
  needMechanicalStrength: boolean
  needOilResistance: boolean
  needMAP: boolean
  needBreathableFilm: boolean
  needMicroPerforation: boolean
  needVacuumPackaging: boolean
  needHeatSeal: boolean
  classification: string
}

// Packaging materials database with scientific barrier properties
const MATERIALS_DB = [
  {
    name: "PET + LDPE (3 Layer Laminate)",
    type: "Laminate",
    baseOTR: 50,
    baseWVTR: 5,
    thicknessMin: 80,
    thicknessMax: 120,
    costPerKg: 12.5,
    recyclable: true,
    biodegradable: false,
    ecoScore: 72,
    categories: ["FRUITS", "VEGETABLES", "FRESH", "PROCESSED", "DAIRY"],
    storageTypes: ["COLD", "AMBIENT"],
    suitableFor: { highMoisture: true, midMoisture: true, lowMoisture: false, respiring: true },
    layers: [
      { material: "PET", thickness: 12, purpose: "Strength & Barrier", color: "#93C5FD" },
      { material: "Aluminium", thickness: 7, purpose: "Oxygen Barrier", color: "#D1D5DB" },
      { material: "LDPE", thickness: 60, purpose: "Sealability", color: "#6EE7B7" },
    ],
    advantages: ["Excellent oxygen barrier", "Maintains freshness", "Ideal for chilled storage", "Good mechanical strength", "Suitable for chilled storage", "Widely available and cost-effective"],
    disadvantages: ["Not fully biodegradable", "Recycling requires separation"],
  },
  {
    name: "HDPE Film",
    type: "Monolayer",
    baseOTR: 400,
    baseWVTR: 8,
    thicknessMin: 50,
    thicknessMax: 100,
    costPerKg: 8.5,
    recyclable: true,
    biodegradable: false,
    ecoScore: 65,
    categories: ["DAIRY", "BEVERAGE", "PROCESSED"],
    storageTypes: ["AMBIENT", "COLD"],
    suitableFor: { highMoisture: true, midMoisture: true, lowMoisture: false, respiring: false },
    layers: [
      { material: "HDPE", thickness: 80, purpose: "Moisture Barrier & Strength", color: "#FDE68A" },
    ],
    advantages: ["Excellent moisture barrier", "Low cost", "High recyclability", "Rigid and strong"],
    disadvantages: ["Poor oxygen barrier", "Not suitable for MAP"],
  },
  {
    name: "PP Biaxially Oriented (BOPP)",
    type: "Monolayer",
    baseOTR: 1500,
    baseWVTR: 3,
    thicknessMin: 20,
    thicknessMax: 50,
    costPerKg: 7.5,
    recyclable: true,
    biodegradable: false,
    ecoScore: 60,
    categories: ["GRAINS", "PULSES", "BAKERY", "PROCESSED"],
    storageTypes: ["AMBIENT"],
    suitableFor: { highMoisture: false, midMoisture: true, lowMoisture: true, respiring: false },
    layers: [
      { material: "BOPP", thickness: 30, purpose: "Moisture Barrier & Clarity", color: "#C4B5FD" },
    ],
    advantages: ["Excellent clarity", "Good moisture barrier", "Heat sealable", "Low cost"],
    disadvantages: ["Poor oxygen barrier", "Not for high moisture products"],
  },
  {
    name: "Aluminium Laminate (PET/AL/PE)",
    type: "High Barrier Laminate",
    baseOTR: 0.01,
    baseWVTR: 0.01,
    thicknessMin: 100,
    thicknessMax: 150,
    costPerKg: 22.0,
    recyclable: false,
    biodegradable: false,
    ecoScore: 35,
    categories: ["PROCESSED", "DAIRY", "OIL", "GRAINS", "PULSES"],
    storageTypes: ["AMBIENT", "COLD"],
    suitableFor: { highMoisture: false, midMoisture: true, lowMoisture: true, respiring: false },
    layers: [
      { material: "PET", thickness: 12, purpose: "Printability & Strength", color: "#93C5FD" },
      { material: "Aluminium Foil", thickness: 9, purpose: "Total Barrier (O₂ & Moisture)", color: "#9CA3AF" },
      { material: "PE", thickness: 80, purpose: "Sealability & Protection", color: "#86EFAC" },
    ],
    advantages: ["Near-zero OTR", "Complete moisture barrier", "Excellent UV protection", "Long shelf life"],
    disadvantages: ["Non-recyclable", "High cost", "Not suitable for fresh produce"],
  },
  {
    name: "PLA Compostable Film",
    type: "Biodegradable",
    baseOTR: 800,
    baseWVTR: 150,
    thicknessMin: 25,
    thicknessMax: 60,
    costPerKg: 18.0,
    recyclable: false,
    biodegradable: true,
    ecoScore: 90,
    categories: ["FRESH", "FRUITS", "VEGETABLES", "BAKERY"],
    storageTypes: ["AMBIENT", "COLD"],
    suitableFor: { highMoisture: false, midMoisture: true, lowMoisture: true, respiring: false },
    layers: [
      { material: "PLA", thickness: 40, purpose: "Bio-based Barrier & Compostability", color: "#86EFAC" },
    ],
    advantages: ["100% compostable", "Bio-based", "Excellent sustainability profile", "Growing market acceptance"],
    disadvantages: ["Higher cost", "Poor moisture barrier", "Limited heat resistance"],
  },
  {
    name: "Breathable / Micro-perforated PE",
    type: "Active Packaging",
    baseOTR: 50000,
    baseWVTR: 5000,
    thicknessMin: 25,
    thicknessMax: 50,
    costPerKg: 9.5,
    recyclable: true,
    biodegradable: false,
    ecoScore: 62,
    categories: ["FRESH", "FRUITS", "VEGETABLES"],
    storageTypes: ["COLD"],
    suitableFor: { highMoisture: true, midMoisture: false, lowMoisture: false, respiring: true },
    layers: [
      { material: "LDPE (Micro-perforated)", thickness: 35, purpose: "Controlled Gas Exchange", color: "#FCA5A5" },
    ],
    advantages: ["Ideal for respiring produce", "Extends shelf life naturally", "Prevents condensation", "Cost effective"],
    disadvantages: ["Not for non-respiring products", "Limited mechanical strength"],
  },
  {
    name: "Vacuum PA/PE Pouch",
    type: "Vacuum Packaging",
    baseOTR: 25,
    baseWVTR: 8,
    thicknessMin: 80,
    thicknessMax: 120,
    costPerKg: 14.5,
    recyclable: false,
    biodegradable: false,
    ecoScore: 55,
    categories: ["MEAT", "SEAFOOD", "DAIRY", "PROCESSED"],
    storageTypes: ["COLD", "FROZEN"],
    suitableFor: { highMoisture: true, midMoisture: true, lowMoisture: false, respiring: false },
    layers: [
      { material: "PA (Nylon)", thickness: 15, purpose: "Oxygen Barrier & Puncture Resistance", color: "#FCD34D" },
      { material: "PE", thickness: 80, purpose: "Moisture Barrier & Seal", color: "#86EFAC" },
    ],
    advantages: ["Excellent for vacuum-packed products", "High puncture resistance", "Extended shelf life", "MAP compatible"],
    disadvantages: ["Not recyclable easily", "Requires vacuum equipment"],
  },
  {
    name: "Cellulose / Paper Laminate",
    type: "Paper-based",
    baseOTR: 2000,
    baseWVTR: 200,
    thicknessMin: 50,
    thicknessMax: 100,
    costPerKg: 6.5,
    recyclable: true,
    biodegradable: true,
    ecoScore: 85,
    categories: ["BAKERY", "GRAINS", "PROCESSED"],
    storageTypes: ["AMBIENT"],
    suitableFor: { highMoisture: false, midMoisture: false, lowMoisture: true, respiring: false },
    layers: [
      { material: "Kraft Paper", thickness: 60, purpose: "Structure & Printability", color: "#FDE68A" },
      { material: "PE Coating", thickness: 20, purpose: "Moisture Resistance", color: "#86EFAC" },
    ],
    advantages: ["Recyclable", "Biodegradable", "Good printability", "Consumer-friendly"],
    disadvantages: ["Poor moisture barrier", "Limited oxygen protection"],
  },
  {
    name: "Metalized BOPP Film",
    type: "Metalized",
    baseOTR: 15,
    baseWVTR: 0.5,
    thicknessMin: 20,
    thicknessMax: 45,
    costPerKg: 11.0,
    recyclable: false,
    biodegradable: false,
    ecoScore: 45,
    categories: ["GRAINS", "PULSES", "PROCESSED", "OIL"],
    storageTypes: ["AMBIENT"],
    suitableFor: { highMoisture: false, midMoisture: true, lowMoisture: true, respiring: false },
    layers: [
      { material: "BOPP", thickness: 20, purpose: "Base Film", color: "#C4B5FD" },
      { material: "Aluminium Metalized", thickness: 0.04, purpose: "Light & Oxygen Barrier", color: "#9CA3AF" },
    ],
    advantages: ["Excellent light barrier", "Good oxygen barrier", "Low cost vs aluminium foil", "High aesthetic appeal"],
    disadvantages: ["Not recyclable", "Lower barrier than foil"],
  },
]

// Classify food based on input
export function classifyFood(input: FoodInput): string {
  if (input.waterActivity > 0.95 || input.moisturePercent > 80) return "High Moisture Product"
  if (input.respirationRate > 20) return "Respiring Fresh Produce"
  if (input.storageType === "FROZEN") return "Frozen Product"
  if (input.moisturePercent < 14 && input.waterActivity < 0.6) return "Dry Food / Low Aw"
  if (["MEAT", "SEAFOOD"].includes(input.category)) return "High Protein Perishable"
  if (input.oilPercent > 20) return "High Fat / Oil Product"
  if (["PROCESSED", "BAKERY"].includes(input.category)) return "Processed / Shelf-Stable"
  if (input.moisturePercent > 40) return "Medium Moisture Product"
  return "Standard Food Product"
}

// Determine packaging requirements
export function detectRequirements(input: FoodInput): PackagingRequirements {
  const highMoisture = input.moisturePercent > 60 || input.waterActivity > 0.85
  const respiring = input.respirationRate > 15
  const highFat = input.oilPercent > 15
  const dryFood = input.moisturePercent < 14 && input.waterActivity < 0.65
  const longShelf = input.shelfLifeRequired > 90
  const export_ = input.transportation === "EXPORT"
  const coldChain = input.storageType === "COLD"
  const frozen = input.storageType === "FROZEN"
  const meat = ["MEAT", "SEAFOOD"].includes(input.category)
  const dairyBeverage = ["DAIRY", "BEVERAGE"].includes(input.category)

  return {
    needOxygenBarrier: longShelf || meat || dairyBeverage || dryFood,
    needMoistureBarrier: dryFood || ["GRAINS", "PULSES", "BAKERY"].includes(input.category),
    needAromaBarrier: meat || highFat || export_,
    needUVBarrier: export_ || longShelf || dairyBeverage,
    needMechanicalStrength: export_ || frozen,
    needOilResistance: highFat || input.category === "OIL",
    needMAP: meat || (coldChain && !respiring) || dairyBeverage,
    needBreathableFilm: respiring && coldChain,
    needMicroPerforation: respiring && (input.category === "VEGETABLES" || input.category === "FRUITS"),
    needVacuumPackaging: meat || frozen,
    needHeatSeal: true,
    classification: classifyFood(input),
  }
}

// Score materials against requirements
function scoreMaterial(material: typeof MATERIALS_DB[0], input: FoodInput, req: PackagingRequirements): number {
  let score = 0

  // Category match
  if (material.categories.includes(input.category)) score += 30
  if (material.storageTypes.includes(input.storageType)) score += 20

  // Moisture match
  const isHighMoisture = input.moisturePercent > 60
  const isMidMoisture = input.moisturePercent >= 14 && input.moisturePercent <= 60
  const isLowMoisture = input.moisturePercent < 14
  if (isHighMoisture && material.suitableFor.highMoisture) score += 20
  if (isMidMoisture && material.suitableFor.midMoisture) score += 20
  if (isLowMoisture && material.suitableFor.lowMoisture) score += 20
  if (input.respirationRate > 15 && material.suitableFor.respiring) score += 15

  // Barrier requirements
  if (req.needOxygenBarrier && material.baseOTR < 100) score += 15
  if (req.needMoistureBarrier && material.baseWVTR < 10) score += 10
  if (req.needBreathableFilm && material.baseOTR > 10000) score += 20
  if (req.needVacuumPackaging && material.type === "Vacuum Packaging") score += 25
  if (req.needOilResistance && material.name.includes("PET")) score += 10

  // Transport
  if (input.transportation === "EXPORT" && material.baseOTR < 100) score += 10

  // Shelf life — longer requirement = better barrier needed
  if (input.shelfLifeRequired > 90 && material.baseOTR < 50) score += 10

  // Biodegradable bonus
  if (material.biodegradable) score += 5

  return Math.min(score, 100)
}

// Main recommendation engine
export function recommendPackaging(input: FoodInput): MaterialScore[] {
  const req = detectRequirements(input)
  const results: MaterialScore[] = []

  for (const mat of MATERIALS_DB) {
    const confidence = scoreMaterial(mat, input, req)
    if (confidence < 10) continue

    // Calculate shelf life improvement
    const baseline = input.shelfLifeRequired
    let improvement = 0
    if (mat.baseOTR < 100) improvement += 40
    if (mat.baseOTR < 10) improvement += 25
    if (mat.baseWVTR < 5) improvement += 15
    if (req.needMAP && mat.name.includes("PET")) improvement += 20
    if (mat.suitableFor.respiring) improvement += 30

    const predictedShelf = Math.round(baseline * (1 + improvement / 100))
    const warnings: string[] = []
    if (mat.baseOTR > 500 && req.needOxygenBarrier) warnings.push("OTR may be insufficient for long shelf life")
    if (!mat.biodegradable && input.category === "FRESH") warnings.push("Consider biodegradable alternatives")

    results.push({
      name: mat.name,
      type: mat.type,
      confidence: Math.round(confidence),
      otr: mat.baseOTR,
      wvtr: mat.baseWVTR,
      thickness: `${mat.thicknessMin} – ${mat.thicknessMax} microns`,
      costPerKg: mat.costPerKg,
      recyclable: mat.recyclable,
      biodegradable: mat.biodegradable,
      ecoScore: mat.ecoScore,
      layers: mat.layers.map((l, i) => ({ ...l, layerNumber: i + 1 })),
      shelfLifeDays: predictedShelf,
      shelfLifeImprovement: Math.round(improvement),
      mapNeeded: req.needMAP,
      advantages: mat.advantages,
      disadvantages: mat.disadvantages,
      warnings,
    })
  }

  return results.sort((a, b) => b.confidence - a.confidence).slice(0, 5)
}
