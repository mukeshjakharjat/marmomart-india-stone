import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Bell, Package, Headphones, CheckCircle } from "lucide-react"

export function WhatsAppFeatures() {
  const features = [
    {
      icon: Bell,
      title: "Order Updates",
      description: "Get real-time order status updates directly on WhatsApp"
    },
    {
      icon: Package,
      title: "Delivery Notifications",
      description: "Receive delivery confirmations and tracking information"
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Quick customer support via WhatsApp chat"
    },
    {
      icon: CheckCircle,
      title: "Quote Confirmations",
      description: "Instant quote approvals and project updates"
    }
  ]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Badge variant="secondary" className="mb-2">
          <MessageCircle className="h-3 w-3 mr-1" />
          WhatsApp Integration
        </Badge>
        <h3 className="font-semibold">Stay Connected</h3>
        <p className="text-sm text-muted-foreground">
          Get the best experience with WhatsApp notifications
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <Card key={index} className="border-green-100">
            <CardContent className="p-4 text-center">
              <feature.icon className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-sm mb-1">{feature.title}</p>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}