import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Ruler, Palette } from "lucide-react"
import type { ProductVariant } from "@/data/sampleProducts"

interface ProductCustomizationProps {
  variants: ProductVariant[]
  onVariantSelect: (variant: ProductVariant) => void
  selectedVariant?: ProductVariant
}

export function ProductCustomization({ variants, onVariantSelect, selectedVariant }: ProductCustomizationProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedFinish, setSelectedFinish] = useState<string>("")
  const [selectedThickness, setSelectedThickness] = useState<string>("")

  // Get unique options from variants
  const sizes = [...new Set(variants.map(v => v.size))]
  const finishes = [...new Set(variants.map(v => v.finish))]
  const thicknesses = [...new Set(variants.map(v => v.thickness))]

  // Filter variants based on selections
  const availableVariants = variants.filter(variant => {
    return (!selectedSize || variant.size === selectedSize) &&
           (!selectedFinish || variant.finish === selectedFinish) &&
           (!selectedThickness || variant.thickness === selectedThickness)
  })

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
    updateVariant(size, selectedFinish, selectedThickness)
  }

  const handleFinishSelect = (finish: string) => {
    setSelectedFinish(finish)
    updateVariant(selectedSize, finish, selectedThickness)
  }

  const handleThicknessSelect = (thickness: string) => {
    setSelectedThickness(thickness)
    updateVariant(selectedSize, selectedFinish, thickness)
  }

  const updateVariant = (size: string, finish: string, thickness: string) => {
    const matchingVariant = variants.find(v => 
      v.size === size && v.finish === finish && v.thickness === thickness
    )
    if (matchingVariant) {
      onVariantSelect(matchingVariant)
    }
  }

  const formatPrice = (variant: ProductVariant) => {
    if (variant.price_per_sqft) {
      return `₹${variant.price_per_sqft}/sq ft`
    } else if (variant.price_per_piece) {
      return `₹${variant.price_per_piece}/piece`
    }
    return "Price on request"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Product Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Size Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            Size Options
          </Label>
          <RadioGroup value={selectedSize} onValueChange={handleSizeSelect}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <RadioGroupItem value={size} id={`size-${size}`} />
                  <Label 
                    htmlFor={`size-${size}`} 
                    className="flex-1 cursor-pointer"
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Finish Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Finish Options
          </Label>
          <RadioGroup value={selectedFinish} onValueChange={handleFinishSelect}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {finishes.map((finish) => (
                <div key={finish} className="flex items-center space-x-2">
                  <RadioGroupItem value={finish} id={`finish-${finish}`} />
                  <Label 
                    htmlFor={`finish-${finish}`} 
                    className="flex-1 cursor-pointer"
                  >
                    {finish}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Thickness Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <Package className="h-4 w-4" />
            Thickness Options
          </Label>
          <RadioGroup value={selectedThickness} onValueChange={handleThicknessSelect}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {thicknesses.map((thickness) => (
                <div key={thickness} className="flex items-center space-x-2">
                  <RadioGroupItem value={thickness} id={`thickness-${thickness}`} />
                  <Label 
                    htmlFor={`thickness-${thickness}`} 
                    className="flex-1 cursor-pointer"
                  >
                    {thickness}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Available Variants */}
        {availableVariants.length > 0 && selectedSize && selectedFinish && selectedThickness && (
          <>
            <Separator />
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Available Configuration
              </Label>
              {availableVariants.map((variant) => (
                <div key={variant.id} className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <p className="font-medium">{variant.size} - {variant.finish} - {variant.thickness}</p>
                      <p className="text-lg font-bold text-primary">{formatPrice(variant)}</p>
                    </div>
                    <Badge variant={variant.stock_quantity > 0 ? "default" : "destructive"}>
                      {variant.stock_quantity > 0 ? `${variant.stock_quantity} in stock` : "Out of stock"}
                    </Badge>
                  </div>
                  {selectedVariant?.id === variant.id && (
                    <Badge variant="secondary" className="mt-2">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Selected
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Selection Status */}
        {(!selectedSize || !selectedFinish || !selectedThickness) && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Please select all options to see available configurations and pricing.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}