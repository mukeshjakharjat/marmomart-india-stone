import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Shield, Clock, CheckCircle, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { PhoneNumberInput } from "./PhoneNumberInput"
import { OTPVerification } from "./OTPVerification"
import { WhatsAppFeatures } from "@/components/ui/whatsapp-features"
import { useWhatsAppAuth } from "@/hooks/useWhatsAppAuth"

interface WhatsAppOTPLoginProps {
  onBack: () => void
  onSelectEmail: () => void
}

export function WhatsAppOTPLogin({ onBack, onSelectEmail }: WhatsAppOTPLoginProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const { sendOTP, verifyOTP, loading } = useWhatsAppAuth()
  const { toast } = useToast()

  // Profile form for new users
  const [profileData, setProfileData] = useState({
    fullName: '',
    businessName: '',
    businessType: '',
    gstNumber: ''
  })

  const handleSendOTP = async (phone: string) => {
    const result = await sendOTP(phone)
    if (result.success) {
      setPhoneNumber(phone)
      setStep('otp')
    }
  }

  const handleVerifyOTP = async (otpCode: string) => {
    const result = await verifyOTP(otpCode)
    if (result.success) {
      if (result.isNewUser) {
        setStep('profile')
      } else {
        // Existing user, sign them in
        try {
          // For demo, create a session for existing user
          const email = `${phoneNumber.replace(/\D/g, '')}@whatsapp.marmomart.com`
          
          // In production, you'd have a proper user lookup and authentication
          toast({
            title: "Welcome Back!",
            description: "Successfully logged in via WhatsApp"
          })
          window.location.href = "/dashboard"
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Login Failed",
            description: error.message || "Please try again"
          })
        }
      }
    }
  }

  const completeRegistration = async () => {
    if (!profileData.fullName) {
      toast({
        variant: "destructive",
        title: "Name Required",
        description: "Please enter your full name"
      })
      return
    }

    try {
      // Create user account with phone number as email
      const email = `${phoneNumber.replace(/\D/g, '')}@whatsapp.marmomart.com`
      const tempPassword = Math.random().toString(36).slice(-8)

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: tempPassword,
        options: {
          data: {
            full_name: profileData.fullName,
            phone: phoneNumber,
            business_name: profileData.businessName,
            business_type: profileData.businessType,
            gst_number: profileData.gstNumber,
            auth_method: 'whatsapp'
          }
        }
      })

      if (authError) throw authError

      toast({
        title: "Account Created!",
        description: "Welcome to MarmoMart. Your account has been created successfully."
      })
      
      window.location.href = "/dashboard"
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Failed to create account"
      })
    }
  }

  return (
    <div className="space-y-6">
      {step === 'phone' && (
        <PhoneNumberInput
          onSendOTP={handleSendOTP}
          onBack={onBack}
          loading={loading}
        />
      )}

      {step === 'otp' && (
        <OTPVerification
          phoneNumber={phoneNumber}
          onVerify={handleVerifyOTP}
          onResend={() => handleSendOTP(phoneNumber)}
          onBack={() => setStep('phone')}
          loading={loading}
        />
      )}

      {step === 'profile' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Complete Your Profile</CardTitle>
            <div className="text-center">
              <Badge variant="secondary">
                <CheckCircle className="h-3 w-3 mr-1" />
                Phone Verified: {phoneNumber}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={profileData.fullName}
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="Your business name (optional)"
                value={profileData.businessName}
                onChange={(e) => setProfileData({...profileData, businessName: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <select
                  id="businessType"
                  value={profileData.businessType}
                  onChange={(e) => setProfileData({...profileData, businessType: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select type</option>
                  <option value="individual">Individual</option>
                  <option value="retailer">Retailer</option>
                  <option value="contractor">Contractor</option>
                  <option value="architect">Architect</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  placeholder="GST number"
                  value={profileData.gstNumber}
                  onChange={(e) => setProfileData({...profileData, gstNumber: e.target.value})}
                />
              </div>
            </div>

            <Button 
              onClick={completeRegistration}
              disabled={loading || !profileData.fullName}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>

            <Button 
              variant="ghost" 
              onClick={() => setStep('phone')}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Phone Number
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'phone' && (
        <>
          <Separator />
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={onSelectEmail}
              className="text-sm"
            >
              Prefer email login instead?
            </Button>
          </div>
          <WhatsAppFeatures />
        </>
      )}
    </div>
  )
}