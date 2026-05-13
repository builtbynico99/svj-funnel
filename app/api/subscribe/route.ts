import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, first_name, phone } = await req.json()

  const formId = '9434859'
  const apiKey = 'U7M-qKdpfFCg5_pKCyN3vg'

  const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      email,
      first_name,
      fields: { phone },
      tags: [18774682],
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: res.status })
  }

  return NextResponse.json({ success: true })
}
