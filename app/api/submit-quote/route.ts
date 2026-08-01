import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    const webhookResponse = await fetch(
      "https://services.leadconnectorhq.com/hooks/E6Zx9hgkIzR16FVsQlAg/webhook-trigger/5fWDz8GiCY8OIP4Tc0fW",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { error: "Webhook delivery failed" },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    )
  }
}
