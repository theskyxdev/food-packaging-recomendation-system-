import { NextRequest, NextResponse } from "next/server"

const materials = [
  { id: "1", name: "PET + LDPE", otr: 50, wvtr: 5, costPerKg: 12.5, recyclable: true, eco: 72 },
  { id: "2", name: "HDPE Film", otr: 400, wvtr: 8, costPerKg: 8.5, recyclable: true, eco: 65 },
  { id: "3", name: "BOPP Film", otr: 1500, wvtr: 3, costPerKg: 7.5, recyclable: true, eco: 60 },
]

export async function GET() {
  return NextResponse.json({ success: true, data: materials })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newMaterial = { id: String(materials.length + 1), ...body }
    materials.push(newMaterial)
    return NextResponse.json({ success: true, data: newMaterial }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
