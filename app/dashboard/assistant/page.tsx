"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Lightbulb } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const SUGGESTED = [
  "Why is PET recommended for fruits?",
  "Suggest a cheaper alternative to Aluminium Laminate",
  "How can I increase apple shelf life?",
  "Compare PLA vs PET for bakery products",
  "Explain OTR and WVTR",
  "Should I use MAP for chicken?",
  "What packaging is best for rice export?",
  "How to reduce packaging cost by 20%?",
]

const RESPONSES: Record<string, string> = {
  default: "I'm PackIQ AI Assistant, trained on food packaging science. I can help you with packaging material selection, barrier properties, shelf life optimization, and cost reduction strategies. What would you like to know?",
  pet: "**PET (Polyethylene Terephthalate)** is recommended for fruits because:\n\n• **Excellent O₂ barrier** — OTR of 50–80 cc/m²/day prevents oxidation and browning\n• **Moisture control** — Good WVTR helps maintain ideal humidity\n• **Clarity** — Consumers can see product quality\n• **Heat sealable** — Compatible with MAP (Modified Atmosphere Packaging)\n• **Cost-effective** — ₹10–13/kg makes it economically viable\n\nFor apples specifically, a **PET + LDPE laminate** is optimal — PET provides structural integrity while LDPE provides the seal layer.",
  cheaper: "**Cheaper alternatives to Aluminium Laminate** (₹22/kg):\n\n1. **Metalized BOPP** — ₹11/kg, ~65% of Al barrier performance. Good for dry foods.\n2. **BOPP Film** — ₹7.5/kg, suitable for low-moisture products.\n3. **PET + LDPE** — ₹12.5/kg, excellent barrier at 43% cost savings.\n\n⚡ **Recommendation**: For products not requiring near-zero OTR (like grains, pulses), Metalized BOPP offers the best cost-to-barrier ratio.",
  shelflife: "**To maximize apple shelf life:**\n\n1. 🌡️ **Temperature**: Maintain 0–4°C (every 1°C increase halves shelf life)\n2. 📦 **Packaging**: PET + LDPE with MAP (2–3% O₂, 5% CO₂)\n3. 💧 **Humidity**: 90–95% RH prevents moisture loss\n4. 🌬️ **Ethylene**: Use ethylene scavengers (activated carbon sachets)\n5. 📊 **Expected improvement**: 14 days → 28–35 days (100–150% improvement)\n\nWith optimal packaging + cold chain, apple shelf life can reach 60+ days.",
  otr: "**OTR (Oxygen Transmission Rate):**\n• Measures how much O₂ passes through 1 m² of film in 24 hours\n• Unit: cc/m²/day (or mL/m²/day)\n• **Lower OTR = Better oxygen barrier**\n\n| Material | OTR |\n|---|---|\n| Aluminium Foil | 0.01 |\n| Metalized BOPP | 15 |\n| PET + LDPE | 50 |\n| HDPE | 400 |\n| LDPE | 7700 |\n\n**WVTR (Water Vapor Transmission Rate):**\n• Measures moisture passing through film\n• Unit: g/m²/day\n• Critical for dry foods (should be < 5)",
  map: "**MAP (Modified Atmosphere Packaging) for Chicken:**\n\n✅ **Yes, absolutely recommended!**\n\nOptimal MAP composition for fresh chicken:\n• **CO₂**: 30–40% (bacteriostatic, inhibits spoilage bacteria)\n• **O₂**: 60–70% (maintains red color of myoglobin)\n• **N₂**: Balance gas\n\n**Recommended packaging**: Vacuum PA/PE pouches\n- Shelf life extension: 3 days → 10–14 days\n- Temperature must remain ≤ 4°C\n- OTR should be < 50 cc/m²/day",
}

function getResponse(message: string): string {
  const msg = message.toLowerCase()
  if (msg.includes("pet") && msg.includes("fruit")) return RESPONSES.pet
  if (msg.includes("cheaper") || msg.includes("alternative") || msg.includes("aluminium")) return RESPONSES.cheaper
  if (msg.includes("shelf life") || msg.includes("apple")) return RESPONSES.shelflife
  if (msg.includes("otr") || msg.includes("wvtr") || msg.includes("barrier")) return RESPONSES.otr
  if (msg.includes("map") || msg.includes("chicken") || msg.includes("meat")) return RESPONSES.map
  if (msg.includes("pla") && msg.includes("pet")) return "**PLA vs PET Comparison:**\n\n| Property | PLA | PET |\n|---|---|---|\n| Biodegradable | ✅ Yes | ❌ No |\n| OTR | 800 | 50 |\n| Cost | ₹18/kg | ₹10/kg |\n| Eco Score | 90% | 70% |\n| Heat Resistance | Low (60°C) | High (120°C) |\n\n**Use PLA for**: Short shelf life ambient products, bakery, eco-conscious brands\n**Use PET for**: Cold chain, longer shelf life, cost-critical applications"
  return RESPONSES.default
}

function renderMessage(content: string) {
  return content.split("\n").map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold">{line.slice(2, -2)}</p>
    if (line.startsWith("• ")) return <li key={i} className="ml-4 list-disc">{line.slice(2).replace(/\*\*(.*?)\*\*/g, "$1")}</li>
    if (line.startsWith("✅") || line.startsWith("❌") || line.startsWith("🌡️") || line.startsWith("📦") || line.startsWith("⚡") || line.startsWith("💧") || line.startsWith("🌬️") || line.startsWith("📊")) return <p key={i}>{line}</p>
    return <p key={i}>{line.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
  })
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: RESPONSES.default, timestamp: new Date() },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  async function send(text?: string) {
    const msg = text || input.trim()
    if (!msg) return
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: msg, timestamp: new Date() }])
    setIsTyping(true)
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600))
    const response = getResponse(msg)
    setMessages(prev => [...prev, { role: "assistant", content: response, timestamp: new Date() }])
    setIsTyping(false)
  }

  return (
    <div className="p-6 h-[calc(100vh-64px)] flex flex-col space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Packaging Assistant</h1>
        <p className="text-sm text-gray-500 mt-1">Ask anything about food packaging, materials, shelf life, and sustainability.</p>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTED.slice(0, 4).map(s => (
          <button key={s} onClick={() => send(s)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary hover:text-primary transition-colors">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{s}</span>
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-200 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-start space-x-2 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-primary" : "bg-gray-100"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gray-600" />}
                </div>
                <div className={`rounded-2xl px-4 py-3 text-sm space-y-1 ${msg.role === "user" ? "bg-primary text-white rounded-tr-none" : "bg-gray-50 text-gray-800 rounded-tl-none"}`}>
                  {renderMessage(msg.content)}
                  <p className={`text-xs mt-1 ${msg.role === "user" ? "text-white/70" : "text-gray-400"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex space-x-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center space-x-3">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask about packaging materials, shelf life, sustainability..."
              className="flex-1 h-11 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <button onClick={() => send()} disabled={!input.trim() || isTyping}
              className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
