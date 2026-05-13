import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const SPREADSHEET_ID = '1W1I28jKYqBLl8U4z5-i_8AsL7wJgYq6C5xdvr18ByUs'

const serviceAccount = {
  client_email: 'svj-funnel@gen-lang-client-0564480370.iam.gserviceaccount.com',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCf+gAB7DX38ziX\nJ5RlyPzRygRdctAm1ab30R0E+FBVWypQMr4Cl7iq3V9VAwlsEJrGiyf/bFPcsArI\nMa62Ave/ZCjxDEZnMlf0FKTmwB6Ep7OCW12zdaEOS/D+vTSQA9q8INJUMAVVQW4M\nWD77i/e1bJBxUkn57mobn7JZGGNCQ8vUQo3KKygIM76gLniIBMEkYVHLmZfkE3PA\nISvR14SAB52Vr/1RUVofuC93iQNjrDGxejcHqUYhBxu7Wa6+YQ40/o0pKwPrrm3p\ni7O+5/Jdlcb8Zx1k2VE28mV+Jy5/n1Zo9XNEFXHwMHLlvwT84X5QuzYCqCsL/+tM\nLCRPnxz3AgMBAAECggEASNC8DCP99JwKWBK14xZ2rO6syfQmdmatFwNhmA+GUTOr\nsNFH11pDvdIBQGqfcUaljFVuoT4ndb3TSogCo+n55m2qjP0vVm19xyVWYYl02qCS\nfnUj0zlpU16RlQF92UdH2nV+Br/MzZ94fbn1AP4Wg8ekf1AbR92TAnvP6+nD1Dbb\nZryQI/4i4gXRWNiuWmPyzjYzAh8fSSjsPyzL4LSw2TFuNZBo19BhZbobCu65j48x\nvqDbcxAOOPykNv8xj1cmftZvAHxzv7klkagAF+8pdHZM8rE32aXtzuXngdeSJipP\n94LBVDlmHAoK+HomaGzrEw1S64KDDGjJuXt05kFbwQKBgQDL6ilLAc15iseQRL3i\ngtuNgsYTENZ3G/E59kdiU8aqwSXVqAFP12E5yCCy81CXj51zLZJguh8v1BnalpJp\nn09K7vQR9Q9ukHjUfhQYR2+QKj4e55GRf/1ogty2a9Jyq0XJAPK6pV9/9Mv4GlN3\nUhFYPVt1Hqq0rRpT3X+KASl75wKBgQDI1sFW9nLfHS2s6xWfwpRYiEfwIhaD+D4N\nte5+skGmxQ7+8o00WTru+k9fxnDaGqncUDhIplDEBlvDP9V1tTadeo35umcr3YKe\nswtkD+Rvjqx8WzjVy19a41KCZWUo38tQUkZfyckzR0XeIo1BeLwJck3nOkctOi9C\nChnDFye0cQKBgB8fr4vOS6F4iDtB8sWm+YHg6wCv+jwV3LzfFUgxx0n6zx6MVR7t\nnd5m6G7H6o4nkn2pAAWZgvcW5ZdSkihi84RZcpFnGSLkFD1CvShzhti3SeIHsFVH\n9tLD3pJNZMKx16X1ahcI9MmgAJ3uzryQnysbumDm/GE1ZqZUUYor4TwTAoGAIDId\nKF21qIK68b915fiBY3flYF92kI1ZFUWXCAR3dc6dSs2DSWMMiYbi9o2PRceEd2b8\nvti6ldIXH8O56na0XKZq4B+7rlKCQAKfztilXCTZDc5p3AwQKzfJ4FF02AqYQzYN\nRgnJEUlZr/SGBHrgWftS9cBn7J4pOUL5QkcR/GECgYBWkGcLHJbxzb6SXjCDWuIN\nTZ4jTaZcyAZerxSZkY9boNxsrFK9Yw4h02720iF9fnrqu29tCqp9wWDU1chy6wdx\n1PgPAqByrKS8t7+8BUaiQs7Z0aVRaBlK410OgRBpqm78HJvULKDAL8XXj3NLZuuI\nzdsTGdocA/wygCRWiGxQGw==\n-----END PRIVATE KEY-----\n',
}

export async function POST(req: NextRequest) {
  const { email, first_name, phone } = await req.json()

  const formId = '9289282'
  const apiKey = 'U7M-qKdpfFCg5_pKCyN3vg'

  const ckRes = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
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

  const ckData = await ckRes.json()

  if (!ckRes.ok) {
    return NextResponse.json({ error: ckData }, { status: ckRes.status })
  }

  // Write to Google Sheets
  try {
    const auth = new google.auth.JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:D',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[first_name, email, phone ?? '', new Date().toISOString()]],
      },
    })
  } catch (err) {
    console.error('Sheets error:', err)
  }

  return NextResponse.json({ success: true })
}
