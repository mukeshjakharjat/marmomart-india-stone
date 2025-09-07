import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { WhatsAppOTPLogin } from "@/components/auth/WhatsAppOTPLogin"
import { AuthMethodSelector } from "@/components/auth/AuthMethodSelector"
import { AuthMethodSelector } from "@/components/auth/AuthMethodSelector"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react"

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [authMethod, setAuthMethod] = useState<'email' | 'whatsapp'>('email')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const { toast } = useToast()

  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    businessName: "",
    businessType: "",
    gstNumber: "",
    agreeTerms: false
  })

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/")
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          navigate("/")
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      })

      if (error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message
        })
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully logged in"
        })
        navigate("/dashboard")
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match"
      })
      return
    }

    if (!signupData.agreeTerms) {
      toast({
        variant: "destructive",
        title: "Terms Required",
        description: "Please agree to terms and conditions"
      })
      return
    }

    setLoading(true)

    try {
      const redirectUrl = `${window.location.origin}/`
      
      const { error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: signupData.fullName,
            phone: signupData.phone,
            business_name: signupData.businessName,
            business_type: signupData.businessType,
            gst_number: signupData.gstNumber
          }
        }
      })

      if (error) {
        toast({
          variant: "destructive",
          title: "Signup Failed", 
          description: error.message
        })
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account"
        })
        // Auto login after successful signup
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: signupData.email,
          password: signupData.password,
        })
        
        if (!signInError) {
          navigate("/dashboard")
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Logo */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">MarmoMart</h1>
          <p className="text-muted-foreground">Premium Marble & Tiles</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Choose your preferred login method
            </CardDescription>
          </CardHeader>
          <CardContent>
            {authMethod === 'email' ? (
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Login
                  </Button>
                </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name *</Label>
                      <Input
                        id="signup-name"
                        placeholder="Your name"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone *</Label>
                      <Input
                        id="signup-phone"
                        placeholder="Phone number"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password *</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password *</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input
                      id="business-name"
                      placeholder="Your business name"
                      value={signupData.businessName}
                      onChange={(e) => setSignupData({...signupData, businessName: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-type">Business Type</Label>
                      <Select value={signupData.businessType} onValueChange={(value) => setSignupData({...signupData, businessType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="contractor">Contractor</SelectItem>
                          <SelectItem value="architect">Architect</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gst-number">GST Number</Label>
                      <Input
                        id="gst-number"
                        placeholder="GST number"
                        value={signupData.gstNumber}
                        onChange={(e) => setSignupData({...signupData, gstNumber: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms"
                      checked={signupData.agreeTerms}
                      onCheckedChange={(checked) => setSignupData({...signupData, agreeTerms: checked as boolean})}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions *
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
                  </TabsContent>
                </Tabs>
            ) : authMethod === 'whatsapp' ? (
            ) : (
              <AuthMethodSelector
                  onBack={() => setAuthMethod('email')}
                onSelectEmail={() => setAuthMethod('email')}
            ) : (
              <AuthMethodSelector
                onSelectWhatsApp={() => setAuthMethod('whatsapp')}
                onSelectEmail={() => setAuthMethod('email')}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}