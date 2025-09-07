import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, RefreshCw, ArrowLeft } from "lucide-react"

interface OTPVerificationProps {
  phoneNumber: string
  onVerify: (otp: string) => void
  onResend: () => void
  onBack: () => void
  loading: boolean
}

export function OTPVerification({ phoneNumber, onVerify, onResend, onBack, loading }: OTPVerificationProps) {
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleOTPChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 6)
    setOtp(numericValue)
    
    // Auto-submit when 6 digits are entered
    if (numericValue.length === 6) {
      onVerify(numericValue)
    }
  }

  const handleResend = () => {
    if (countdown === 0) {
      onResend()
      setCountdown(60)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Verify Your Number</h3>
          <p className="text-muted-foreground">
            We've sent a 6-digit code to
          </p>
          <Badge variant="outline" className="mt-2">
            {phoneNumber}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            type="text"
            placeholder="000000"
            value={otp}
            onChange={(e) => handleOTPChange(e.target.value)}
            className="text-center text-2xl tracking-[0.5em] font-mono"
            maxLength={6}
            autoComplete="one-time-code"
          />
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Code expires in 10 minutes</span>
          </div>
        </div>

        <Button 
          onClick={() => onVerify(otp)}
          disabled={loading || otp.length !== 6}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </Button>

        <div className="text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleResend}
            disabled={countdown > 0 || loading}
            className="text-sm"
          >
            {countdown > 0 ? (
              <>
                <Clock className="h-4 w-4 mr-1" />
                Resend in {countdown}s
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-1" />
                Resend Code
              </>
            )}
          </Button>
        </div>

        <Button 
          variant="ghost" 
          onClick={onBack}
          className="w-full"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Change Number
        </Button>
      </div>

      {/* Help Text */}
      <div className="bg-muted/50 p-4 rounded-lg text-center">
        <p className="text-xs text-muted-foreground">
          Didn't receive the code? Check your WhatsApp messages or try resending after the countdown.
        </p>
      </div>
    </div>
  )
}