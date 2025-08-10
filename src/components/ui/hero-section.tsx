import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Truck, Shield, Award } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="inline-flex items-center gap-2">
                <Award className="h-4 w-4" />
                Premium Quality Since 1995
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Premium <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Marble & Tiles
                </span> for Your Dream Space
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                Discover India's finest collection of marble, ceramic tiles, and decorative stones. 
                From luxury homes to commercial spaces, we deliver excellence.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card border">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Premium Quality</p>
                  <p className="text-sm text-muted-foreground">Certified Materials</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-card border">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Fast Delivery</p>
                  <p className="text-sm text-muted-foreground">Pan India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-card border">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-muted-foreground">Bank Transfer</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-primary/90 hover:bg-primary text-primary-foreground" onClick={() => window.location.href = '/products'}>
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => window.location.href = '/products'}>
              View Catalog
            </Button>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">10,000+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">5,000+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">25+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/60">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="h-32 w-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">
                    Premium Marble Collection
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-card border rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">4.9/5 Rating</p>
                  <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-card border rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-green-500 text-white flex items-center justify-center">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">ISO Certified</p>
                  <p className="text-sm text-muted-foreground">Quality Assured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}