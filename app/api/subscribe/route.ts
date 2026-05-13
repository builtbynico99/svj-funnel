import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, first_name, phone } = await req.json()

  const formId = process.env.CONVERTKIT_FORM_ID
  const apiKey = process.env.CONVERTKIT_API_KEY

  if (!formId || !apiKey) {
    return NextResponse.json({ error: 'Missing ConvertKit config' }, { status: 500 })
  }

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
