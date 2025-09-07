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

      if (error || !data || data.length === 0) {
        // Use fallback products for demo
        setProducts([
          {
            id: 'carrara-white-marble',
            name: 'Carrara White Italian Marble',
            price_per_sqft: 450,
            price_per_piece: null,
            images: ['/placeholder.svg'],
            brand: 'MarmoMart Premium',
            material: 'Italian Marble'
          },
          {
            id: 'rajnagar-pink-marble', 
            name: 'Rajnagar Pink Indian Marble',
            price_per_sqft: 180,
            price_per_piece: null,
            images: ['/placeholder.svg'],
            brand: 'MarmoMart Select',
            material: 'Indian Marble'
          },
          {
            id: 'black-galaxy-granite',
            name: 'Black Galaxy Granite',
            price_per_sqft: 280,
            price_per_piece: null,
            images: ['/placeholder.svg'],
            brand: 'MarmoMart Premium',
            material: 'Granite'
          },
          {
            id: 'vitrified-glossy-tile',
            name: 'Premium Glossy Vitrified Tiles',
            price_per_sqft: 85,
            price_per_piece: null,
            images: ['/placeholder.svg'],
            brand: 'Kajaria',
            material: 'Vitrified'
          },
          {
            id: 'ceramic-wall-tile',
            name: 'Designer Ceramic Wall Tiles',
            price_per_sqft: 45,
            price_per_piece: null,
            images: ['/placeholder.svg'],
            brand: 'Somany',
            material: 'Ceramic'
          },
          {
            id: 'porcelain-floor-tile',
            name: 'Luxury Porcelain Floor Tiles',
            price_per_sqft: 120,
            price_per_piece: null,
            images: ['/placeholder.svg'],
            brand: 'Johnson',
            material: 'Porcelain'
          }
        ])
      } else {
        setProducts(data)
      }
    } catch (error) {
      console.error('Failed to load featured products:', error)
      // Fallback products on error
      setProducts([
        {
          id: 'carrara-white-marble',
          name: 'Carrara White Italian Marble',
          price_per_sqft: 450,
          price_per_piece: null,
          images: ['/placeholder.svg'],
          brand: 'MarmoMart Premium',
          material: 'Italian Marble'
        },
        {
          id: 'rajnagar-pink-marble',
          name: 'Rajnagar Pink Indian Marble',
          price_per_sqft: 180,
          price_per_piece: null,
          images: ['/placeholder.svg'],
          brand: 'MarmoMart Select',
          material: 'Indian Marble'
        },
        {
          id: 'black-galaxy-granite',
          name: 'Black Galaxy Granite',
          price_per_sqft: 280,
          price_per_piece: null,
          images: ['/placeholder.svg'],
          brand: 'MarmoMart Premium',
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
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            Premium Collection
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium marble and tiles, 
            carefully curated for exceptional quality and design.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border-0 bg-card/50 backdrop-blur"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={getImageSrc(product.images)}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      size="sm"
                      className="bg-white/90 text-black hover:bg-white shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/products/${product.id}`)
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                  
                  {/* Featured Badge */}
                  <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground shadow-lg">
                    Featured
                  </Badge>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors mb-2">
                      {product.name}
                    </h3>
                    <div className="flex gap-2 mb-3">
                      {product.brand && (
                        <Badge variant="outline" className="text-xs px-2 py-1">{product.brand}</Badge>
                      )}
                      {product.material && (
                        <Badge variant="outline" className="text-xs px-2 py-1">{product.material}</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-primary text-xl">{formatPrice(product)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
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
            className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            onClick={() => navigate('/products')}
          >
            View All Products
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  )
}