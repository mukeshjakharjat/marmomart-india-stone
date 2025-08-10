import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, ArrowLeft, Ruler, Package, Truck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { User, Session } from "@supabase/supabase-js"

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
  thickness: string | null
  origin_country: string | null
  specifications: any
  is_featured: boolean
  min_order_quantity: number
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [areaRequired, setAreaRequired] = useState("")
  const [roomDetails, setRoomDetails] = useState("")

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    if (!id) return
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single()

      if (error) throw error
      setProduct(data)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load product details"
      })
      navigate("/products")
    } finally {
      setLoading(false)
    }
  }

  const handleAuthClick = () => {
    navigate("/auth")
  }

  const handleCartClick = () => {
    navigate("/cart")
  }

  const handleAddToCart = () => {
    if (!product) return
    
    toast({
      title: "Added to Cart",
      description: `${product.name} (Qty: ${quantity}) has been added to your cart`
    })
  }

  const formatPrice = (product: Product) => {
    if (product.price_per_sqft) {
      return `₹${product.price_per_sqft}/sq ft`
    } else if (product.price_per_piece) {
      return `₹${product.price_per_piece}/piece`
    }
    return "Price on request"
  }

  const calculateTotal = () => {
    if (!product) return 0
    
    if (product.price_per_sqft && areaRequired) {
      return product.price_per_sqft * parseFloat(areaRequired)
    } else if (product.price_per_piece) {
      return product.price_per_piece * quantity
    }
    return 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          isAuthenticated={!!user}
          onAuthClick={handleAuthClick}
          onCartClick={handleCartClick}
          cartItemsCount={0}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-full h-96 bg-muted rounded-lg"></div>
                <div className="flex gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-20 h-20 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-20 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          isAuthenticated={!!user}
          onAuthClick={handleAuthClick}
          onCartClick={handleCartClick}
          cartItemsCount={0}
        />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/products")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  const images = product.images && Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : ["/placeholder.svg"]

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isAuthenticated={!!user}
        onAuthClick={handleAuthClick}
        onCartClick={handleCartClick}
        cartItemsCount={0}
      />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/products")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-card">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
                {product.is_featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
              </div>
              
              <div className="flex gap-2 mb-4">
                {product.brand && (
                  <Badge variant="outline">{product.brand}</Badge>
                )}
                {product.material && (
                  <Badge variant="outline">{product.material}</Badge>
                )}
                {product.finish && (
                  <Badge variant="outline">{product.finish}</Badge>
                )}
              </div>

              <p className="text-2xl font-bold text-primary mb-4">
                {formatPrice(product)}
              </p>

              <p className="text-muted-foreground leading-relaxed">
                {product.description || "Premium quality marble and tiles with excellent finish and durability."}
              </p>
            </div>

            <Separator />

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4">
              {product.dimensions && (
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="text-muted-foreground">Size:</span> {product.dimensions}
                  </span>
                </div>
              )}
              {product.thickness && (
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="text-muted-foreground">Thickness:</span> {product.thickness}
                  </span>
                </div>
              )}
              {product.origin_country && (
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="text-muted-foreground">Origin:</span> {product.origin_country}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="text-muted-foreground">Min Order:</span> {product.min_order_quantity}
                </span>
              </div>
            </div>

            <Separator />

            {/* Order Form */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Order Details</h3>
                
                {product.price_per_sqft ? (
                  <div className="space-y-2">
                    <Label htmlFor="area">Area Required (sq ft)</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="Enter area in sq ft"
                      value={areaRequired}
                      onChange={(e) => setAreaRequired(e.target.value)}
                      min={product.min_order_quantity}
                    />
                    {areaRequired && (
                      <p className="text-sm text-muted-foreground">
                        Total: ₹{calculateTotal().toLocaleString()}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (pieces)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      min={product.min_order_quantity}
                    />
                    <p className="text-sm text-muted-foreground">
                      Total: ₹{calculateTotal().toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="room-details">Room/Project Details (Optional)</Label>
                  <Textarea
                    id="room-details"
                    placeholder="Describe your room or project requirements..."
                    value={roomDetails}
                    onChange={(e) => setRoomDetails(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleAddToCart}
                  className="w-full"
                  size="lg"
                  disabled={product.price_per_sqft ? !areaRequired : quantity < product.min_order_quantity}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail