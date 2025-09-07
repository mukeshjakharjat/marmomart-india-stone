// WhatsApp OTP API endpoint
// This would be deployed as a serverless function or API route

interface WhatsAppOTPRequest {
  phoneNumber: string
  template: string
}

interface WhatsAppOTPResponse {
  success: boolean
  sessionId: string
  message: string
}

export async function sendWhatsAppOTP(request: WhatsAppOTPRequest): Promise<WhatsAppOTPResponse> {
  const { phoneNumber, template } = request
  
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  
  // Create session ID for tracking
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  try {
    // Facebook WhatsApp Business API call
    const whatsappResponse = await fetch('https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'template',
        template: {
          name: template, // Your approved template name
          language: {
            code: 'en'
          },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: otp
                }
              ]
            }
          ]
        }
      })
    })

    const result = await whatsappResponse.json()

    if (whatsappResponse.ok) {
      // Store OTP in your database/cache with expiration
      await storeOTPSession(sessionId, phoneNumber, otp)
      
      return {
        success: true,
        sessionId,
        message: 'OTP sent successfully'
      }
    } else {
      throw new Error(result.error?.message || 'Failed to send WhatsApp message')
    }
  } catch (error: any) {
    console.error('WhatsApp OTP Error:', error)
    return {
      success: false,
      sessionId: '',
      message: error.message || 'Failed to send OTP'
    }
  }
}

async function storeOTPSession(sessionId: string, phoneNumber: string, otp: string) {
  // Store in your database or Redis cache
  // Example with Supabase:
  /*
  await supabase
    .from('otp_sessions')
    .insert({
      session_id: sessionId,
      phone_number: phoneNumber,
      otp_code: otp,
      expires_at: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    })
  */
  
  // For demo purposes, store in memory (use proper storage in production)
  global.otpSessions = global.otpSessions || new Map()
  global.otpSessions.set(sessionId, {
    phoneNumber,
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000
  })
}