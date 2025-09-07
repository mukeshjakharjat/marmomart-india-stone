import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" 
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const categories = [
  {
    id: "marble",
    name: "Premium Marble",
    description: "Italian & Indian marble with exceptional finish",
    image: "/placeholder.svg",
    productCount: "500+",
    featured: true
  },
  {
    id: "ceramic",
    name: "Ceramic Tiles", 
    description: "Designer ceramic tiles for walls and floors",
    image: "/placeholder.svg",
    productCount: "800+",
    featured: false
  },
  {
    id: "porcelain",
    name: "Porcelain Collection",
    description: "High-quality porcelain tiles with durability", 
    image: "/placeholder.svg",
    productCount: "600+",
    featured: true
  },
  {
    id: "granite",
    name: "Granite Slabs",
    description: "Natural granite for kitchens and countertops",
    image: "/placeholder.svg", 
    productCount: "300+",
    featured: false
  },
  {
    id: "decorative", 
    name: "Decorative Stones",
    description: "Unique decorative stones for accent walls",
    image: "/placeholder.svg",
    productCount: "200+", 
    featured: false
  },
  {
    id: "natural-stone",
    name: "Natural Stone",
    description: "Authentic natural stone with organic patterns",
    image: "/placeholder.svg",
    productCount: "400+",
    featured: true
  }
]

export function Categories() {
  const navigate = useNavigate()

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            Explore Categories
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            From luxury marble to designer tiles, discover our extensive range 
            of premium materials for every project need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden border-0 bg-card/50 backdrop-blur"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Featured Badge */}
                  {category.featured && (
                    <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground shadow-lg">
                      Popular
                    </Badge>
                  )}
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xl mb-2">{category.name}</h3>
                        <p className="text-sm text-white/90 mb-3 leading-relaxed">{category.description}</p>
                        <Badge variant="outline" className="text-white border-white/40 bg-white/20 backdrop-blur">
                          {category.productCount} Products
                        </Badge>
                      </div>
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20">
          <Card className="border-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">2,800+</p>
                  <p className="text-muted-foreground font-medium">Total Products</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">50+</p>
                  <p className="text-muted-foreground font-medium">Premium Brands</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">25+</p>
                  <p className="text-muted-foreground font-medium">Years Experience</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">5,000+</p>
                  <p className="text-muted-foreground font-medium">Happy Clients</p>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </section>
  )
}