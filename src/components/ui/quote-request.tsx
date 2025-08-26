import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Calculator, FileText, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ProductVariant } from "@/data/sampleProducts"

interface QuoteRequestProps {
  productName: string
  selectedVariant?: ProductVariant
  onQuoteSubmit: (quoteData: QuoteData) => void
}

export interface QuoteData {
  productName: string
  selectedVariant?: ProductVariant
  quantity: number
  areaRequired?: number
  projectName: string
  projectAddress: string
  contactName: string
  contactEmail: string
  contactPhone: string
  additionalRequirements: string
  installationRequired: boolean
  estimatedTotal: number
}

export function QuoteRequest({ productName, selectedVariant, onQuoteSubmit }: QuoteRequestProps) {
  const [quantity, setQuantity] = useState(1)
  const [areaRequired, setAreaRequired] = useState("")
  const [projectName, setProjectName] = useState("")
  const [projectAddress, setProjectAddress] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [additionalRequirements, setAdditionalRequirements] = useState("")
  const [installationRequired, setInstallationRequired] = useState(false)
  const { toast } = useToast()

  const calculateEstimatedTotal = () => {
    if (!selectedVariant) return 0
    
    if (selectedVariant.price_per_sqft && areaRequired) {
      return selectedVariant.price_per_sqft * parseFloat(areaRequired)
    } else if (selectedVariant.price_per_piece) {
      return selectedVariant.price_per_piece * quantity
    }
    return 0
  }

  const handleSubmitQuote = () => {
    if (!selectedVariant) {
      toast({
        variant: "destructive",
        title: "Configuration Required",
        description: "Please select a product configuration before requesting a quote."
      })
      return
    }

    if (!contactName || !contactEmail || !contactPhone || !projectName) {
      toast({
        variant: "destructive",
        title: "Required Fields Missing",
        description: "Please fill in all required contact and project information."
      })
      return
    }

    const quoteData: QuoteData = {
      productName,
      selectedVariant,
      quantity: selectedVariant.price_per_sqft ? 1 : quantity,
      areaRequired: selectedVariant.price_per_sqft ? parseFloat(areaRequired) : undefined,
      projectName,
      projectAddress,
      contactName,
      contactEmail,
      contactPhone,
      additionalRequirements,
      installationRequired,
      estimatedTotal: calculateEstimatedTotal()
    }

    onQuoteSubmit(quoteData)
  }

  const isFormValid = selectedVariant && contactName && contactEmail && contactPhone && projectName &&
    (selectedVariant.price_per_sqft ? areaRequired : quantity > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Request Quote
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!selectedVariant && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Please select a product configuration above to proceed with quote request.
            </p>
          </div>
        )}

        {selectedVariant && (
          <>
            {/* Quantity/Area Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Quantity Requirements
              </Label>
              
              {selectedVariant.price_per_sqft ? (
                <div className="space-y-2">
                  <Label htmlFor="area">Area Required (sq ft) *</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="Enter area in sq ft"
                    value={areaRequired}
                    onChange={(e) => setAreaRequired(e.target.value)}
                    min="1"
                    step="0.01"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (pieces) *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    min="1"
                  />
                </div>
              )}

              {calculateEstimatedTotal() > 0 && (
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium">
                    Estimated Total: <span className="text-lg font-bold text-primary">₹{calculateEstimatedTotal().toLocaleString()}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    *Final price may vary based on actual requirements and installation needs
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Project Information */}
            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Project Information
              </Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name *</Label>
                  <Input
                    id="project-name"
                    placeholder="e.g., Kitchen Renovation"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-address">Project Address</Label>
                  <Input
                    id="project-address"
                    placeholder="Enter project location"
                    value={projectAddress}
                    onChange={(e) => setProjectAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="installation"
                  checked={installationRequired}
                  onChange={(e) => setInstallationRequired(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="installation" className="text-sm">
                  I require professional installation services
                </Label>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Contact Information
              </Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Full Name *</Label>
                  <Input
                    id="contact-name"
                    placeholder="Enter your full name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone Number *</Label>
                  <Input
                    id="contact-phone"
                    placeholder="+91 9876543210"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email Address *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>

            <Separator />

            {/* Additional Requirements */}
            <div className="space-y-4">
              <Label htmlFor="requirements">Additional Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="Any specific requirements, customizations, or questions..."
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmitQuote}
              className="w-full"
              size="lg"
              disabled={!isFormValid}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Submit Quote Request
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We'll review your requirements and send you a detailed quote within 24 hours.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}