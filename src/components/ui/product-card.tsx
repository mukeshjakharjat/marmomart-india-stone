import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye } from "lucide-react"
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
  dimensions: string | null
  is_featured: boolean
}

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
  onAddToCart: (product: Product) => void
}

export const ProductCard = ({ product, viewMode, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate()
  
  const primaryImage = product.images && Array.isArray(product.images) && product.images.length > 0 
    ? product.images[0] 
    : "/placeholder.svg"

  const formatPrice = (product: Product) => {
    if (product.price_per_sqft) {
      return `₹${product.price_per_sqft}/sq ft`
    } else if (product.price_per_piece) {
      return `₹${product.price_per_piece}/piece`
    }
    return "Price on request"
  }

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`)
  }

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 h-48 flex-shrink-0">
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-l-lg"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg"
              }}
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-card-foreground">{product.name}</h3>
              {product.is_featured && (
                <Badge variant="secondary">Featured</Badge>
              )}
            </div>
            
            <div className="flex gap-2 mb-3">
              {product.brand && (
                <Badge variant="outline">{product.brand}</Badge>
              )}
              {product.material && (
                <Badge variant="outline">{product.material}</Badge>
              )}
            </div>

            <p className="text-muted-foreground mb-4 line-clamp-2">
              {product.description || "No description available"}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-primary">
                {formatPrice(product)}
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleViewDetails}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm" onClick={() => onAddToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg"
            }}
          />
          {product.is_featured && (
            <Badge className="absolute top-2 right-2" variant="secondary">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-card-foreground line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex gap-1 mb-3 flex-wrap">
          {product.brand && (
            <Badge variant="outline" className="text-xs">{product.brand}</Badge>
          )}
          {product.material && (
            <Badge variant="outline" className="text-xs">{product.material}</Badge>
          )}
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description || "Premium quality marble and tiles"}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product)}
          </span>
          {product.dimensions && (
            <span className="text-xs text-muted-foreground">{product.dimensions}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={handleViewDetails}>
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
        <Button size="sm" className="flex-1" onClick={() => onAddToCart(product)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}