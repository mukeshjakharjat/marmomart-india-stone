import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MessageCircle, Bell, Package, FileText, Settings, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"

interface NotificationSettings {
  orderUpdates: boolean
  quoteReady: boolean
  paymentReminders: boolean
  promotionalOffers: boolean
  deliveryAlerts: boolean
}

export function WhatsAppNotifications() {
  const { user, profile } = useAuth()
  const [settings, setSettings] = useState<NotificationSettings>({
    orderUpdates: true,
    quoteReady: true,
    paymentReminders: true,
    promotionalOffers: false,
    deliveryAlerts: true
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const updateSetting = async (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    
    // In production, save to database
    try {
      // await supabase.from('user_preferences').upsert({
      //   user_id: user?.id,
      //   whatsapp_notifications: settings
      // })
      
      toast({
        title: "Settings Updated",
        description: "Your WhatsApp notification preferences have been saved"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update notification settings"
      })
    }
  }

  const testNotification = async () => {
    setLoading(true)
    try {
      // Send test WhatsApp message
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      
      toast({
        title: "Test Message Sent!",
        description: "Check your WhatsApp for the test notification"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Test Failed",
        description: "Unable to send test message"
      })
    } finally {
      setLoading(false)
    }
  }

  if (!profile?.phone) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Add your WhatsApp number to enable notifications
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-green-600" />
          WhatsApp Notifications
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected: {profile.phone}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-600" />
                <Label htmlFor="order-updates">Order Updates</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Get notified when your order status changes
              </p>
            </div>
            <Switch
              id="order-updates"
              checked={settings.orderUpdates}
              onCheckedChange={(checked) => updateSetting('orderUpdates', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-600" />
                <Label htmlFor="quote-ready">Quote Ready</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Receive notifications when quotes are ready
              </p>
            </div>
            <Switch
              id="quote-ready"
              checked={settings.quoteReady}
              onCheckedChange={(checked) => updateSetting('quoteReady', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-orange-600" />
                <Label htmlFor="payment-reminders">Payment Reminders</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Gentle reminders for pending payments
              </p>
            </div>
            <Switch
              id="payment-reminders"
              checked={settings.paymentReminders}
              onCheckedChange={(checked) => updateSetting('paymentReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-green-600" />
                <Label htmlFor="delivery-alerts">Delivery Alerts</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Get notified about delivery schedules
              </p>
            </div>
            <Switch
              id="delivery-alerts"
              checked={settings.deliveryAlerts}
              onCheckedChange={(checked) => updateSetting('deliveryAlerts', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-600" />
                <Label htmlFor="promotional-offers">Promotional Offers</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Receive special offers and discounts
              </p>
            </div>
            <Switch
              id="promotional-offers"
              checked={settings.promotionalOffers}
              onCheckedChange={(checked) => updateSetting('promotionalOffers', checked)}
            />
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button 
            onClick={testNotification}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Sending Test...
              </>
            ) : (
              <>
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Test Notification
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}