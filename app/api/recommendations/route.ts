import { NextRequest, NextResponse } from "next/server"
import { recommendPackaging, type FoodInput } from "@/lib/packagingEngine"

export async function POST(req: NextRequest) {
  try {
    const input: FoodInput = await req.json()

    // Validate
    if (!input.commodityName || !input.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get recommendations
    const recommendations = recommendPackaging(input)

    return NextResponse.json({
      success: true,
      results: recommendations,
      timestamp: new Date(),
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
