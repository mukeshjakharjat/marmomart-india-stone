import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductCustomization } from "@/components/ui/product-customization"
import { QuoteRequest, type QuoteData } from "@/components/ui/quote-request"
import { ArrowLeft, Ruler, Package, Truck, Star, Heart, Share2, MessageCircle, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { sampleProducts, type SampleProduct, type ProductVariant } from "@/data/sampleProducts"

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const { user } = useAuth()
  const [sampleProduct, setSampleProduct] = useState<SampleProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>()
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    if (!id) return
    
    try {
      // First try to get from Supabase
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single()

      if (error || !data) {
        // Fallback to sample products
        const foundProduct = sampleProducts.find(p => p.id === id)
        if (foundProduct) {
          setSampleProduct(foundProduct)
        } else {
          throw new Error("Product not found")
        }
      }
    } catch (error: any) {
      // Use sample products as fallback
      const foundProduct = sampleProducts.find(p => p.id === id)
      if (foundProduct) {
        setSampleProduct(foundProduct)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Product not found"
        })
        navigate("/products")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAuthClick = () => {
    if (user) {
      navigate("/dashboard")
    } else {
      navigate("/auth")
    }
  }

  const handleCartClick = () => {
    navigate("/cart")
  }

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant)
  }

  const handleQuoteSubmit = (quoteData: QuoteData) => {
    toast({
      title: "Quote Request Submitted!",
      description: "We'll review your requirements and send you a detailed quote within 24 hours."
    })
    
    // Here you could send the quote data to your backend
    console.log("Quote request:", quoteData)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: sampleProduct?.name,
          text: sampleProduct?.description,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link Copied",
          description: "Product link copied to clipboard"
        })
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard"
      })
    }
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

  if (!sampleProduct) {
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

  const images = sampleProduct.images && Array.isArray(sampleProduct.images) && sampleProduct.images.length > 0 
    ? sampleProduct.images 
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
            <div className="aspect-square overflow-hidden rounded-lg bg-card relative">
              <img
                src={images[selectedImage]}
                alt={sampleProduct.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
              
              {/* Action Buttons Overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="bg-white/90 hover:bg-white"
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleShare}
                  className="bg-white/90 hover:bg-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-primary shadow-lg' : 'border-transparent hover:border-muted'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${sampleProduct.name} ${index + 1}`}
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
                <h1 className="text-3xl font-bold text-foreground">{sampleProduct.name}</h1>
                {sampleProduct.is_featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
              </div>
              
              <div className="flex gap-2 mb-4 flex-wrap">
                {sampleProduct.brand && (
                  <Badge variant="outline">{sampleProduct.brand}</Badge>
                )}
                {sampleProduct.material && (
                  <Badge variant="outline">{sampleProduct.material}</Badge>
                )}
                {sampleProduct.category && (
                  <Badge variant="outline">{sampleProduct.category}</Badge>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.8) • 127 reviews</span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {sampleProduct.description}
              </p>

              {/* Quick Contact Buttons */}
              <div className="flex gap-3 mb-6">
                <Button variant="outline" size="sm" asChild>
                  <a href="tel:+919876543210">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Expert
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:info@marmomart.com">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Email Query
                  </a>
                </Button>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {sampleProduct.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(sampleProduct.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-sm text-muted-foreground font-medium">{key}:</span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Product Customization */}
            <ProductCustomization
              variants={sampleProduct.variants}
              onVariantSelect={handleVariantSelect}
              selectedVariant={selectedVariant}
            />

            <Separator />

            {/* Quote Request */}
            <QuoteRequest
              productName={sampleProduct.name}
              selectedVariant={selectedVariant}
              onQuoteSubmit={handleQuoteSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail