"use client"

import { useState } from "react"
import { QrCode, Download, Share2, Printer } from "lucide-react"

interface QRData {
  commodity: string; batchNumber: string; packagingMaterial: string;
  manufacturingDate: string; expiryDate: string; storageConditions: string;
  supplier: string; otr: string; wvtr: string; temperature: string;
}

const defaultData: QRData = {
  commodity: "Apple", batchNumber: "BATCH-2026-09-001",
  packagingMaterial: "PET + LDPE (3 Layer Laminate)",
  manufacturingDate: "2026-09-29", expiryDate: "2026-10-27",
  storageConditions: "Chilled (0–5°C), Humidity 90%",
  supplier: "PackIQ Solutions Pvt. Ltd.",
  otr: "≤ 50 cc/m²/day", wvtr: "≤ 5 g/m²/day",
  temperature: "4°C",
}

export default function QRTracingPage() {
  const [data, setData] = useState<QRData>(defaultData)
  const [generated, setGenerated] = useState(false)

  function update(field: keyof QRData, value: string) {
    setData(prev => ({ ...prev, [field]: value }))
    setGenerated(false)
  }

  const qrContent = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n")

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">QR Traceability</h1>
        <p className="text-sm text-gray-500 mt-1">Generate QR codes with complete packaging and traceability information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Traceability Information</h3>
          <div className="space-y-4">
            {(Object.keys(defaultData) as (keyof QRData)[]).map(field => (
              <div key={field}>
                <label className="text-xs text-gray-500 mb-1 block capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input value={data[field]} onChange={e => update(field, e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            ))}
          </div>
          <button onClick={() => setGenerated(true)}
            className="w-full mt-5 flex items-center justify-center space-x-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90">
            <QrCode className="w-4 h-4" />
            <span>Generate QR Code</span>
          </button>
        </div>

        {/* QR Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col items-center justify-center space-y-4">
          <h3 className="font-semibold text-gray-900 w-full">QR Code Preview</h3>
          {generated ? (
            <>
              {/* SVG-based QR placeholder with real visual pattern */}
              <div className="w-64 h-64 bg-white border-4 border-gray-900 rounded-xl p-3 relative">
                <div className="w-full h-full grid grid-cols-10 gap-0.5">
                  {Array.from({ length: 100 }, (_, i) => (
                    <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? "bg-gray-900" : "bg-white"}`} />
                  ))}
                </div>
                {/* Corner markers */}
                <div className="absolute top-3 left-3 w-10 h-10 border-4 border-gray-900 rounded-sm" />
                <div className="absolute top-3 right-3 w-10 h-10 border-4 border-gray-900 rounded-sm" />
                <div className="absolute bottom-3 left-3 w-10 h-10 border-4 border-gray-900 rounded-sm" />
              </div>

              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{data.commodity}</p>
                <p className="text-sm text-gray-500">{data.batchNumber}</p>
              </div>

              {/* Info preview */}
              <div className="w-full bg-gray-50 rounded-xl p-4 text-xs text-gray-700 space-y-1.5">
                {Object.entries(data).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-500 capitalize">{k.replace(/([A-Z])/g, " $1").trim()}:</span>
                    <span className="font-medium text-gray-900 text-right max-w-[60%] truncate">{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-3 w-full">
                <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-200 py-2.5 rounded-xl text-sm hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  <span>Download PNG</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-200 py-2.5 rounded-xl text-sm hover:bg-gray-50">
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-xl hover:bg-gray-50">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-3 py-10">
              <QrCode className="w-16 h-16 text-gray-200 mx-auto" />
              <p className="text-gray-400 text-sm">Fill in the details and click Generate</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
