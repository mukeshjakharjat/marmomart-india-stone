import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Award, Users, Truck, Shield } from "lucide-react"
import { useNavigate } from "react-router-dom"

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isAuthenticated={false}
        onAuthClick={() => navigate("/auth")}
        onCartClick={() => navigate("/cart")}
        cartItemsCount={0}
      />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About MarmoMart India Stone</h1>
          
          <div className="mb-12">
            <p className="text-lg text-muted-foreground text-center mb-6">
              Your trusted partner for premium marble, tiles, and natural stones across India
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2015, MarmoMart India Stone has established itself as a leading provider of 
              premium marble, tiles, and natural stones across India. With our commitment to quality 
              and customer satisfaction, we have successfully completed over 10,000 projects ranging 
              from residential homes to commercial complexes.
            </p>
            <p className="text-muted-foreground">
              Our journey began with a simple vision: to make high-quality natural stones accessible 
              to everyone while maintaining the highest standards of craftsmanship and service. Today, 
              we are proud to be the preferred choice for architects, interior designers, and homeowners 
              across the country.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Premium Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Sourced directly from the finest quarries across India and Italy
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Expert Team</h3>
                  <p className="text-sm text-muted-foreground">
                    Skilled craftsmen and installation experts with 15+ years experience
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Pan-India Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Safe and timely delivery to over 500+ cities across India
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                  <p className="text-sm text-muted-foreground">
                    5-year warranty on all products with comprehensive after-sales support
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Natural Stones</h3>
                <ul className="list-disc ml-6 text-muted-foreground">
                  <li>Italian Marble (Carrara, Statuario, Calacatta)</li>
                  <li>Indian Marble (Makrana, Rajnagar, Dungri)</li>
                  <li>Granite (Black Galaxy, Tan Brown, Kashmir White)</li>
                  <li>Sandstone (Jodhpur, Dholpur, Agra Red)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Tiles & Ceramics</h3>
                <ul className="list-disc ml-6 text-muted-foreground">
                  <li>Vitrified Tiles (Polished, Matt, Sugar Finish)</li>
                  <li>Ceramic Tiles (Wall, Floor, Decorative)</li>
                  <li>Porcelain Tiles (Full Body, Glazed)</li>
                  <li>Mosaic Tiles (Glass, Stone, Metal)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Our Commitment</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-muted-foreground mb-4">
                At MarmoMart India Stone, we are committed to:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground space-y-2">
                <li>Providing authentic, certified natural stones with proper documentation</li>
                <li>Maintaining competitive pricing without compromising on quality</li>
                <li>Ensuring timely delivery and professional installation services</li>
                <li>Supporting sustainable quarrying practices and environmental responsibility</li>
                <li>Offering comprehensive customer support before, during, and after purchase</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Head Office</h3>
                <p className="text-muted-foreground mb-2">
                  MarmoMart India Stone Pvt. Ltd.<br />
                  123, Stone Market Complex<br />
                  Andheri East, Mumbai - 400069<br />
                  Maharashtra, India
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
                <p className="text-muted-foreground mb-2">
                  Phone: +91 98765 43210<br />
                  Email: info@marmomartindia.com<br />
                  Website: www.marmomartindia.com<br />
                  Hours: Mon-Sat, 9 AM to 6 PM
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About