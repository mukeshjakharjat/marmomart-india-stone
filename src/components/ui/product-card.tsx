import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Eye, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Product {
  id: string
  name: string
  description: string | null
  price_per_sqft: number | null
  price_per_piece: number | null
  images: any
  brand: string | null
  material: string | null
  finish: string | null
  is_featured: boolean
}

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, viewMode, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const navigate = useNavigate()

  const formatPrice = (product: Product) => {
    if (product.price_per_sqft) {
      return `₹${product.price_per_sqft}/sq ft`
    } else if (product.price_per_piece) {
      return `₹${product.price_per_piece}/piece`
    }
    return "Price on request"
  }

  const getImageSrc = (images: any) => {
    if (Array.isArray(images) && images.length > 0) {
      return images[0]
    }
    return "/placeholder.svg"
  }

  const handleViewProduct = () => {
    navigate(`/products/${product.id}`)
  }

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative w-32 h-32 flex-shrink-0">
              <img
                src={getImageSrc(product.images)}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
              {product.is_featured && (
                <Badge className="absolute top-2 left-2" variant="secondary">
                  Featured
                </Badge>
              )}
            </div>
            
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-semibold text-lg hover:text-primary cursor-pointer" 
                    onClick={handleViewProduct}>
                  {product.name}
                </h3>
                <div className="flex gap-2 mt-1">
                  {product.brand && (
                    <Badge variant="outline" className="text-xs">{product.brand}</Badge>
                  )}
                  {product.material && (
                    <Badge variant="outline" className="text-xs">{product.material}</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {product.description || "Premium quality marble and tiles with excellent finish."}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-lg font-bold text-primary">{formatPrice(product)}</p>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">(4.8)</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewProduct}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={getImageSrc(product.images)}
            alt={product.name}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg"
            }}
          />
          
          {/* Overlay Actions */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleViewProduct}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              onClick={() => onAddToCart(product)}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.is_featured && (
              <Badge variant="secondary" className="shadow-md">
                Featured
              </Badge>
            )}
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-base hover:text-primary cursor-pointer transition-colors" 
                onClick={handleViewProduct}>
              {product.name}
            </h3>
            <div className="flex gap-1 mt-1 flex-wrap">
              {product.brand && (
                <Badge variant="outline" className="text-xs">{product.brand}</Badge>
              )}
              {product.material && (
                <Badge variant="outline" className="text-xs">{product.material}</Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-bold text-primary">{formatPrice(product)}</p>
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">(4.8)</span>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full"
            variant="outline"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}