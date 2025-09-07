import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface OTPSession {
  sessionId: string
  phoneNumber: string
  expiresAt: number
}

export const useWhatsAppAuth = () => {
  const [loading, setLoading] = useState(false)
  const [currentSession, setCurrentSession] = useState<OTPSession | null>(null)
  const { toast } = useToast()

  const sendOTP = async (phoneNumber: string): Promise<{ success: boolean; sessionId?: string }> => {
    setLoading(true)
    
    try {
      // For demo purposes, simulate API call
      // In production, this would call your WhatsApp Business API
      
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store session locally for demo (use proper backend in production)
      const session = {
        sessionId,
        phoneNumber,
        expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
      }
      
      setCurrentSession(session)
      localStorage.setItem('whatsapp_otp_session', JSON.stringify(session))
      localStorage.setItem('whatsapp_otp_code', otp) // For demo only
      
      // In production, you would call Facebook WhatsApp Business API:
      /*
      const response = await fetch('/api/whatsapp/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          template: 'marmomart_otp_template'
        })
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      */
      
      console.log(`Demo OTP for ${phoneNumber}: ${otp}`) // For testing
      
      return { success: true, sessionId }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to Send OTP",
        description: error.message || "Please try again"
      })
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const verifyOTP = async (otp: string): Promise<{ success: boolean; isNewUser?: boolean }> => {
    if (!currentSession) {
      toast({
        variant: "destructive",
        title: "Session Expired",
        description: "Please request a new OTP"
      })
      return { success: false }
    }

    setLoading(true)

    try {
      // For demo purposes, check against stored OTP
      const storedOTP = localStorage.getItem('whatsapp_otp_code')
      
      if (otp !== storedOTP) {
        throw new Error('Invalid OTP')
      }

      if (currentSession.expiresAt < Date.now()) {
        throw new Error('OTP has expired')
      }

      // Clean up demo data
      localStorage.removeItem('whatsapp_otp_session')
      localStorage.removeItem('whatsapp_otp_code')
      
      // In production, verify with your backend:
      /*
      const response = await fetch('/api/whatsapp/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: currentSession.sessionId,
          otp,
          phoneNumber: currentSession.phoneNumber
        })
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      */

      return { success: true, isNewUser: true } // Simulate new user for demo
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message || "Invalid OTP"
      })
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  return {
    sendOTP,
    verifyOTP,
    loading,
    currentSession
  }
}