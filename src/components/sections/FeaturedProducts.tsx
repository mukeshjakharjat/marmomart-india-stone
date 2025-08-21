import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"

interface FeaturedProduct {
  id: string
  name: string
  price_per_sqft: number | null
  price_per_piece: number | null
  images: any
  brand: string | null
  material: string | null
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price_per_sqft, price_per_piece, images, brand, material')
        .eq('is_featured', true)
        .eq('is_active', true)
        .limit(6)

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Failed to load featured products:', error)
      // Show fallback products for demo
      setProducts([
        {
          id: '1',
          name: 'Carrara White Marble',
          price_per_sqft: 450,
          price_per_piece: null,
          images: ['/placeholder.svg'],
          brand: 'Kajaria',
          material: 'Italian Marble'
        },
        {
          id: '2', 
          name: 'Designer Ceramic Tiles',
          price_per_piece: 125,
          price_per_sqft: null,
          images: ['/placeholder.svg'],
          brand: 'Somany',
          material: 'Ceramic'
        },
        {
          id: '3',
          name: 'Premium Granite Slab',
          price_per_sqft: 350,
          price_per_piece: null,
          images: ['/placeholder.svg'],
          brand: 'Johnson',
          material: 'Granite'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (product: FeaturedProduct) => {
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

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
                <div className="w-full h-48 bg-muted rounded-md mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Premium Collection
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of premium marble and tiles, 
            carefully curated for exceptional quality and design.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={getImageSrc(product.images)}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Add to cart logic here
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Featured Badge */}
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    Featured
                  </Badge>
                </div>
                
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
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
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-primary text-lg">{formatPrice(product)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">(4.8)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => navigate('/products')}
            className="group"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}