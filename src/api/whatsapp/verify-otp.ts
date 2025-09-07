// WhatsApp OTP Verification API endpoint

interface VerifyOTPRequest {
  sessionId: string
  otp: string
  phoneNumber: string
}

interface VerifyOTPResponse {
  success: boolean
  message: string
  tempPassword?: string
}

export async function verifyWhatsAppOTP(request: VerifyOTPRequest): Promise<VerifyOTPResponse> {
  const { sessionId, otp, phoneNumber } = request
  
  try {
    // Retrieve stored OTP session
    const session = await getOTPSession(sessionId)
    
    if (!session) {
      return {
        success: false,
        message: 'Invalid or expired session'
      }
    }
    
    if (session.phoneNumber !== phoneNumber) {
      return {
        success: false,
        message: 'Phone number mismatch'
      }
    }
    
    if (session.expiresAt < Date.now()) {
      return {
        success: false,
        message: 'OTP has expired'
      }
    }
    
    if (session.otp !== otp) {
      return {
        success: false,
        message: 'Invalid OTP'
      }
    }
    
    // OTP is valid, clean up session
    await cleanupOTPSession(sessionId)
    
    // Generate temporary password for existing users
    const tempPassword = Math.random().toString(36).slice(-12)
    
    return {
      success: true,
      message: 'OTP verified successfully',
      tempPassword
    }
    
  } catch (error: any) {
    console.error('OTP Verification Error:', error)
    return {
      success: false,
      message: 'Verification failed'
    }
  }
}

async function getOTPSession(sessionId: string) {
  // Retrieve from your database or cache
  // Example with Supabase:
  /*
  const { data } = await supabase
    .from('otp_sessions')
    .select('*')
    .eq('session_id', sessionId)
    .single()
  
  return data
  */
  
  // For demo purposes, use memory storage
  const sessions = global.otpSessions || new Map()
  return sessions.get(sessionId)
}

async function cleanupOTPSession(sessionId: string) {
  // Remove from database or cache
  // Example with Supabase:
  /*
  await supabase
    .from('otp_sessions')
    .delete()
    .eq('session_id', sessionId)
  */
  
  // For demo purposes
  const sessions = global.otpSessions || new Map()
  sessions.delete(sessionId)
}