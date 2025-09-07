import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Shield, ArrowLeft, CheckCircle } from "lucide-react"
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'libphonenumber-js'

interface PhoneNumberInputProps {
  onSendOTP: (phoneNumber: string) => void
  onBack: () => void
  loading: boolean
}

export function PhoneNumberInput({ onSendOTP, onBack, loading }: PhoneNumberInputProps) {
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const handleSendOTP = () => {
    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
      return
    }
    onSendOTP(phoneNumber)
  }

  const isValid = phoneNumber && isValidPhoneNumber(phoneNumber)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <MessageCircle className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Enter Your WhatsApp Number</h3>
          <p className="text-muted-foreground">
            We'll send you a verification code via WhatsApp
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">WhatsApp Number</Label>
          <PhoneInput
            international
            defaultCountry="IN"
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value || '')}
            className="phone-input"
            placeholder="Enter your WhatsApp number"
          />
          {phoneNumber && !isValid && (
            <p className="text-xs text-destructive">
              Please enter a valid phone number
            </p>
          )}
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-green-800">Why WhatsApp Login?</p>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• No password to remember</li>
                <li>• Instant verification in seconds</li>
                <li>• Get order updates on WhatsApp</li>
                <li>• Secure end-to-end encryption</li>
              </ul>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSendOTP}
          disabled={loading || !isValid}
          className="w-full bg-green-600 hover:bg-green-700"
          size="lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending Code...
            </>
          ) : (
            <>
              <MessageCircle className="h-4 w-4 mr-2" />
              Send Verification Code
            </>
          )}
        </Button>

        <Button 
          variant="ghost" 
          onClick={onBack}
          className="w-full"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login Options
        </Button>
      </div>

      {/* Security Notice */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Your Privacy is Protected</p>
            <p className="text-xs text-muted-foreground">
              We use WhatsApp's secure messaging to deliver your verification code. 
              Your number is encrypted and never shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}