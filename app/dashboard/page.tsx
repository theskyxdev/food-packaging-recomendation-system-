"use client"

import Link from "next/link"
import {
  TrendingUp, Package, Leaf, DollarSign,
  ArrowRight, CheckCircle2, Clock, Star,
  BarChart3, Activity, Zap
} from "lucide-react"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts"

const areaData = [
  { month: "Jan", recommendations: 65, shelfLife: 45 },
  { month: "Feb", recommendations: 78, shelfLife: 58 },
  { month: "Mar", recommendations: 90, shelfLife: 72 },
  { month: "Apr", recommendations: 110, shelfLife: 85 },
  { month: "May", recommendations: 135, shelfLife: 98 },
  { month: "Jun", recommendations: 160, shelfLife: 120 },
  { month: "Jul", recommendations: 180, shelfLife: 140 },
  { month: "Aug", recommendations: 210, shelfLife: 165 },
  { month: "Sep", recommendations: 248, shelfLife: 190 },
]

const materialData = [
  { name: "PET", count: 320 },
  { name: "HDPE", count: 240 },
  { name: "PP", count: 190 },
  { name: "LDPE", count: 150 },
  { name: "PLA", count: 110 },
  { name: "Al Lam", count: 90 },
]

const ecoData = [
  { name: "Eco", value: 68 },
  { name: "Standard", value: 32 },
]

const recentRecommendations = [
  { commodity: "Apple", icon: "🍎", storage: "Chilled • 30 days", material: "PET + LDPE", daysAgo: "28 days", color: "text-green-600" },
  { commodity: "Milk", icon: "🥛", storage: "Chilled • 15 days", material: "HDPE", daysAgo: "18 days", color: "text-blue-600" },
  { commodity: "Rice", icon: "🌾", storage: "Ambient • 180 days", material: "PP", daysAgo: "190 days", color: "text-yellow-600" },
  { commodity: "Tomato", icon: "🍅", storage: "Chilled • 21 days", material: "Micro-perforated", daysAgo: "24 days", color: "text-red-600" },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 text-white min-h-[180px] flex items-center">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/70 to-transparent" />
        <div className="relative z-10 flex-1">
          <h1 className="text-3xl font-bold leading-tight mb-2">
            AI-Powered Food Packaging<br />Recommendation System
          </h1>
          <p className="text-gray-300 mb-5 text-sm">
            Right Packaging. Longer Shelf Life. A Greener Future.
          </p>
          <div className="flex items-center space-x-3">
            <Link
              href="/dashboard/new"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>✦ New Recommendation</span>
            </Link>
            <Link
              href="/dashboard/materials"
              className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors border border-white/30"
            >
              <span>View Database</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="relative z-10 hidden md:flex flex-col space-y-2 text-xs">
          {["Better Shelf Life", "Reduced Food Waste", "Cost Optimized", "Sustainable Solutions"].map(f => (
            <div key={f} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left: Stats + Charts */}
        <div className="xl:col-span-3 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard
              title="Total Recommendations"
              value="1,248"
              icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
              bg="bg-blue-50"
              trend="+12% this month"
            />
            <StatCard
              title="Avg. Shelf Life Increase"
              value="86%"
              icon={<TrendingUp className="w-5 h-5 text-green-600" />}
              bg="bg-green-50"
              trend="+4% from last month"
            />
            <StatCard
              title="Packaging Cost Saved"
              value="₹2.4L"
              icon={<DollarSign className="w-5 h-5 text-purple-600" />}
              bg="bg-purple-50"
              trend="+8% this month"
            />
            <StatCard
              title="CO₂ Reduction"
              value="3.2 ton"
              icon={<Leaf className="w-5 h-5 text-emerald-600" />}
              bg="bg-emerald-50"
              trend="+15% improvement"
            />
            <StatCard
              title="Eco Packaging %"
              value="68%"
              icon={<Star className="w-5 h-5 text-yellow-600" />}
              bg="bg-yellow-50"
              trend="+2% this quarter"
            />
            <StatCard
              title="Most Used Material"
              value="PET Film"
              icon={<Package className="w-5 h-5 text-red-600" />}
              bg="bg-red-50"
              trend="320 recommendations"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Area Chart */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Recommendations Trend</h3>
                  <p className="text-xs text-gray-500">Monthly overview</p>
                </div>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="recGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="recommendations" stroke="#16A34A" fill="url(#recGrad)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Top Packaging Materials</h3>
                  <p className="text-xs text-gray-500">By recommendation count</p>
                </div>
                <Package className="w-5 h-5 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={materialData} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#16A34A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Shelf Life Predictor", href: "/dashboard/shelf-life", icon: Clock, color: "bg-blue-50 text-blue-700" },
              { label: "Cost Calculator", href: "/dashboard/cost", icon: DollarSign, color: "bg-purple-50 text-purple-700" },
              { label: "Sustainability", href: "/dashboard/sustainability", icon: Leaf, color: "bg-emerald-50 text-emerald-700" },
              { label: "AI Assistant", href: "/dashboard/assistant", icon: Zap, color: "bg-amber-50 text-amber-700" },
            ].map(item => (
              <Link key={item.label} href={item.href}
                className="flex items-center space-x-3 bg-white rounded-2xl border border-gray-200 p-4 hover:border-primary hover:shadow-md transition-all group"
              >
                <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Quick Stats + Recent */}
        <div className="xl:col-span-1 space-y-4">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Quick Stats</h3>
              <Link href="/dashboard/history" className="text-xs text-primary font-medium hover:underline">View all →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-gray-900">1,248</p>
                <p className="text-xs text-gray-500 mt-0.5">Recommendations</p>
              </div>
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-green-700">86%</p>
                <p className="text-xs text-gray-500 mt-0.5">Avg. Shelf Life Increase</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-yellow-700">42%</p>
                <p className="text-xs text-gray-500 mt-0.5">Potential Food Waste Reduction</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <p className="text-2xl font-bold text-emerald-700">68%</p>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Eco Friendly Options</p>
              </div>
            </div>
          </div>

          {/* Eco Donut */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Eco vs Standard</h3>
            <div className="flex items-center space-x-3">
              <ResponsiveContainer width={80} height={80}>
                <PieChart>
                  <Pie data={ecoData} cx="50%" cy="50%" innerRadius={26} outerRadius={38} dataKey="value" strokeWidth={0}>
                    <Cell fill="#16A34A" />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-xs text-gray-600">Eco: <strong>68%</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-200 flex-shrink-0" />
                  <span className="text-xs text-gray-600">Standard: <strong>32%</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Recommendations */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Recent Recommendations</h3>
              <Link href="/dashboard/history" className="text-xs text-primary font-medium hover:underline">View all →</Link>
            </div>
            <div className="space-y-3">
              {recentRecommendations.map((rec) => (
                <div key={rec.commodity} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{rec.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{rec.commodity}</p>
                      <p className="text-xs text-gray-500">{rec.storage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-semibold ${rec.color}`}>{rec.material}</p>
                    <p className="text-xs text-gray-400">{rec.daysAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title, value, icon, bg, trend
}: {
  title: string; value: string; icon: React.ReactNode; bg: string; trend: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
          {icon}
        </div>
        <TrendingUp className="w-4 h-4 text-green-500" />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600 mt-0.5">{title}</p>
      <p className="text-xs text-green-600 mt-1">{trend}</p>
    </div>
  )
}
