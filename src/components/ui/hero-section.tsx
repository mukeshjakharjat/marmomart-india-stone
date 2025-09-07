import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Truck, Shield, Award, Play, CheckCircle, Users, Building, Home } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2">
                <Award className="h-4 w-4" />
                India's #1 Premium Marble Destination
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
                Transform Your Space with 
                <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Premium Marble & Tiles
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Discover India's finest collection of Italian marble, designer tiles, and natural stones. 
                From luxury homes to commercial spaces, we deliver unmatched quality and craftsmanship.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Premium Quality</p>
                      <p className="text-xs text-muted-foreground">ISO Certified</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Fast Delivery</p>
                      <p className="text-xs text-muted-foreground">Pan India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-card/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">5-Year Warranty</p>
                      <p className="text-xs text-muted-foreground">Quality Assured</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={() => navigate('/products')}
              >
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/20 hover:bg-primary/5 group"
                onClick={() => navigate('/contact')}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Showroom Tour
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">25+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">10,000+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">5,000+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Hero Visual */}
          <div className="relative">
            {/* Main Hero Image */}
            <div className="relative h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-6 p-8">
                    <div className="h-32 w-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center backdrop-blur">
                      <Award className="h-16 w-16 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">Premium Collection</h3>
                      <p className="text-muted-foreground">Italian & Indian Marble</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Achievement Cards */}
            <Card className="absolute -bottom-6 -left-6 bg-card/95 backdrop-blur border-0 shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">4.9/5</p>
                    <p className="text-sm text-muted-foreground">Customer Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="absolute -top-6 -right-6 bg-card/95 backdrop-blur border-0 shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">ISO 9001</p>
                    <p className="text-sm text-muted-foreground">Certified Quality</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="absolute top-1/2 -left-4 bg-card/95 backdrop-blur border-0 shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white flex items-center justify-center">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">500+</p>
                    <p className="text-sm text-muted-foreground">Cities Served</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customer Types Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-8">Trusted by Professionals Across India</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Architects & Designers</h3>
                <p className="text-sm text-muted-foreground">
                  Premium materials for luxury projects and commercial spaces
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Contractors & Builders</h3>
                <p className="text-sm text-muted-foreground">
                  Bulk supply with competitive pricing and timely delivery
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Homeowners</h3>
                <p className="text-sm text-muted-foreground">
                  Beautiful tiles and marble for dream home renovations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}