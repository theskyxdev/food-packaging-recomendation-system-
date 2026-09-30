"use client"

import { useState } from "react"
import { FileText, Download, Printer, FileSpreadsheet, Eye, Plus } from "lucide-react"

const reports = [
  { id: "1", title: "Apple Packaging Analysis Report", commodity: "Apple", material: "PET + LDPE", date: "2026-09-28", format: "PDF", size: "2.4 MB", status: "Ready" },
  { id: "2", title: "Monthly Summary — September 2026", commodity: "Multiple", material: "Various", date: "2026-09-25", format: "Excel", size: "1.1 MB", status: "Ready" },
  { id: "3", title: "Chicken Vacuum Packaging Report", commodity: "Chicken", material: "Vacuum PA/PE", date: "2026-09-22", format: "PDF", size: "1.8 MB", status: "Ready" },
  { id: "4", title: "Sustainability Analysis Q3 2026", commodity: "Various", material: "Various", date: "2026-09-20", format: "PDF", size: "3.2 MB", status: "Ready" },
]

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false)
  const [selected, setSelected] = useState("")

  async function generateReport(format: string) {
    setGenerating(true)
    setSelected(format)
    await new Promise(r => setTimeout(r, 2000))
    setGenerating(false)
    setSelected("")
    alert(`${format} report generated successfully!`)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-1">Generate, view and download professional packaging reports.</p>
      </div>

      {/* Generate New Report */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Generate New Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { format: "PDF", icon: FileText, color: "text-red-500 bg-red-50", desc: "Professional PDF report with charts and branding" },
            { format: "Excel", icon: FileSpreadsheet, color: "text-green-500 bg-green-50", desc: "Excel spreadsheet with data tables and analysis" },
            { format: "Print", icon: Printer, color: "text-blue-500 bg-blue-50", desc: "Print-optimized report layout" },
          ].map(({ format, icon: Icon, color, desc }) => (
            <button key={format} onClick={() => generateReport(format)}
              className="flex items-start space-x-4 p-4 border border-gray-200 rounded-xl hover:border-primary hover:bg-gray-50 transition-all text-left">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                {generating && selected === format
                  ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  : <Icon className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{format}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Report Options */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Recommendation</label>
            <select className="w-full h-9 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none">
              <option>Apple — Sep 28</option>
              <option>Milk — Sep 27</option>
              <option>Rice — Sep 25</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Include Sections</label>
            <select className="w-full h-9 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none">
              <option>All Sections</option>
              <option>Summary Only</option>
              <option>Technical Details</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Language</label>
            <select className="w-full h-9 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none">
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Branding</label>
            <select className="w-full h-9 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none">
              <option>PackIQ Branding</option>
              <option>No Branding</option>
              <option>Custom Logo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Report Preview Structure</h3>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-primary px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">PackIQ — Packaging Recommendation Report</h2>
                <p className="text-sm text-white/70">AI-Powered Analysis | September 28, 2026</p>
              </div>
              <div className="text-right text-sm text-white/70">
                <p>Commodity: Apple</p>
                <p>Generated by PackIQ v1.0</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4 text-sm">
            {["1. Executive Summary", "2. Food Commodity Details & Properties", "3. Packaging Requirement Analysis", "4. Top Recommended Material — PET + LDPE", "5. Packaging Layer Structure", "6. Barrier Property Specifications", "7. Shelf Life Prediction & Freshness Curve", "8. Cost & ROI Analysis", "9. Sustainability & Eco Score", "10. QR Traceability Code"].map((section, i) => (
              <div key={section} className="flex items-center space-x-3 py-1.5 border-b border-gray-50">
                <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</div>
                <span className="text-gray-700">{section}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Past Reports */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Past Reports</h3>
          <button className="flex items-center space-x-2 text-sm text-primary font-medium">
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Report Title", "Commodity", "Format", "Date", "Size", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reports.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{r.title}</td>
                <td className="px-4 py-3 text-gray-600">{r.commodity}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${r.format === "PDF" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                    {r.format}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{r.date}</td>
                <td className="px-4 py-3 text-gray-500">{r.size}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
