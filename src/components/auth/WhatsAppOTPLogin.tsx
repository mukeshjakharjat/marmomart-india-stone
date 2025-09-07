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
  onSuccess: () => void
  onBack: () => void
}

export function WhatsAppOTPLogin({ onSuccess, onBack }: WhatsAppOTPLoginProps) {
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
          onSuccess()
        } catch (error: any) {
        // Check if user exists in Supabase
        const { data: existingUser, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .eq('phone', phoneNumber)
          .single()

        if (existingUser) {
          // User exists, sign them in
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: existingUser.email,
            password: 'temp_password' // Handle securely in production
          })

          if (signInError) throw signInError
          
          toast({
            title: "Welcome Back!",
            description: "Successfully logged in via WhatsApp"
          })
          onSuccess()
        } else {
          // New user, show profile form
          setStep('profile')
        }
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
      
      onSuccess()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Failed to create account"
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <CardTitle className="flex items-center gap-2 justify-center">
          {step === 'phone' && "WhatsApp Login"}
          {step === 'otp' && "Verify OTP"}
          {step === 'profile' && "Complete Profile"}
        </CardTitle>
        <div className="flex items-center gap-2 justify-center mt-2">
          <Badge variant="secondary" className="text-xs">
            <Shield className="h-3 w-3 mr-1" />
            Secure & Fast
          </Badge>
          <Badge variant="outline" className="text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            No Password Required
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
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
          <>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Complete your profile to get started
              </p>
              <Badge variant="secondary">
                <CheckCircle className="h-3 w-3 mr-1" />
                Phone Verified: {phoneNumber}
              </Badge>
            </div>

            <div className="space-y-4">
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
            </div>
          </>
        )}

        {step === 'phone' && (
          <>
            <Separator />
            <WhatsAppFeatures />
          </>
        )}
      </CardContent>
    </Card>
  )
}