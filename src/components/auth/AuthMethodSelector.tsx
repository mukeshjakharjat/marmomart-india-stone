import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Mail, Shield, Zap, Clock } from "lucide-react"

interface AuthMethodSelectorProps {
  onSelectWhatsApp: () => void
  onSelectEmail: () => void
}

export function AuthMethodSelector({ onSelectWhatsApp, onSelectEmail }: AuthMethodSelectorProps) {
  return (
    <div className="space-y-6">
      {/* WhatsApp Login Option */}
      <Card className="border-green-200 hover:border-green-300 transition-colors cursor-pointer" onClick={onSelectWhatsApp}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">WhatsApp Login</h3>
              <p className="text-sm text-muted-foreground">Quick & secure verification</p>
            </div>
            <Badge variant="secondary" className="ml-auto">
              Recommended
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <Zap className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Instant</p>
            </div>
            <div className="text-center">
              <Shield className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Secure</p>
            </div>
            <div className="text-center">
              <Clock className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">No Password</p>
            </div>
          </div>
          
          <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
            Continue with WhatsApp
          </Button>
        </CardContent>
      </Card>

      {/* Email Login Option */}
      <Card className="hover:border-border transition-colors cursor-pointer" onClick={onSelectEmail}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Email & Password</h3>
              <p className="text-sm text-muted-foreground">Traditional login method</p>
            </div>
          </div>
          
          <Button variant="outline" className="w-full" size="lg">
            Continue with Email
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}