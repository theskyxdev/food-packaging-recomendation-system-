import { NextRequest, NextResponse } from "next/server"

const commodities = [
  { id: "1", name: "Apple", category: "FRUITS", moisture: 85, pH: 3.5 },
  { id: "2", name: "Milk", category: "DAIRY", moisture: 87, pH: 6.7 },
  { id: "3", name: "Rice", category: "GRAINS", moisture: 12, pH: 7.0 },
]

export async function GET() {
  return NextResponse.json({ success: true, data: commodities })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newCommodity = { id: String(commodities.length + 1), ...body }
    commodities.push(newCommodity)
    return NextResponse.json({ success: true, data: newCommodity }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
