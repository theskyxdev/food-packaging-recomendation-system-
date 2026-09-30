export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: 'ADMIN' | 'RESEARCHER' | 'INDUSTRY' | 'FARMER';
}

export interface FoodProperties {
  moisturePercent: number;
  oilPercent: number;
  proteinPercent: number;
  sugarPercent: number;
  waterActivity: number;
  pH: number;
  respirationRate: number;
  density: number;
}

export interface RecommendationInput {
  commodityName: string;
  category: string;
  properties: FoodProperties;
  storageType: 'AMBIENT' | 'COLD' | 'FROZEN';
  temperature: number;
  humidity: number;
  transportation: 'LOCAL' | 'DOMESTIC' | 'EXPORT';
  distance?: number;
  shelfLifeRequired: number;
  packagingQuantity: number;
}

export interface PackagingMaterial {
  id: string;
  name: string;
  type: string;
  oxygenTransmission: number;
  waterVaporTransmission: number;
  thickness?: number;
  costPerKg: number;
  recyclable: boolean;
  biodegradable: boolean;
  oilResistance: boolean;
  uvBarrier: boolean;
  mechanicalStrength: 'HIGH' | 'MEDIUM' | 'LOW';
  heatSealable: boolean;
  imageUrl?: string;
  description?: string;
  carbonFootprint?: number;
}

export interface RecommendationResult {
  id: string;
  recommendedMaterial: PackagingMaterial;
  confidenceScore: number;
  predictedShelfLife: number;
  shelfLifeImprovement: number;
  estimatedCost: number;
  ecoScore: number;
  mapRecommendation: boolean;
  aiExplanation?: string;
  warnings?: string;
  layers: PackagingLayer[];
}

export interface PackagingLayer {
  id: string;
  material: PackagingMaterial;
  layerNumber: number;
  thickness: number;
  purpose: string;
}

export interface DashboardStats {
  totalRecommendations: number;
  shelfLifeImprovement: number;
  costSaved: number;
  co2Reduction: number;
  ecoPackagingPercent: number;
  mostUsedMaterial: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}
