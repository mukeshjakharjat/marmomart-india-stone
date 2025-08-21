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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Explore Categories
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From luxury marble to designer tiles, discover our extensive range 
            of premium materials for every project need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Featured Badge */}
                  {category.featured && (
                    <Badge className="absolute top-3 right-3" variant="secondary">
                      Popular
                    </Badge>
                  )}
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                        <p className="text-sm text-white/80 mb-2">{category.description}</p>
                        <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                          {category.productCount} Products
                        </Badge>
                      </div>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">2,800+</p>
            <p className="text-muted-foreground">Total Products</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">50+</p>
            <p className="text-muted-foreground">Premium Brands</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">25+</p>
            <p className="text-muted-foreground">Years Experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">5,000+</p>
            <p className="text-muted-foreground">Happy Clients</p>
          </div>
        </div>
      </div>
    </section>
  )
}