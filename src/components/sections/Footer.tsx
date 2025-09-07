import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  LinkedinIcon,
  Award,
  Truck,
  Shield,
  HeadphonesIcon
} from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-muted/30 to-muted/50 border-t">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-3">MarmoMart</h3>
              <Badge variant="secondary" className="px-3 py-1">Premium Marble & Tiles</Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed text-base">
              India's premier destination for luxury marble, ceramic tiles, and decorative stones. 
              Serving architects, contractors, and homeowners with premium quality materials since 1995.
            </p>
            
            {/* Trust Indicators */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Award className="h-4 w-4 text-primary" />
                <span className="font-medium">ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span className="font-medium">Quality Assured Products</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span className="font-medium">Pan India Delivery</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xl mb-6">Quick Links</h4>
            <div className="space-y-3">
              <a href="/products" className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                All Products
              </a>
              <a href="/products?category=marble" className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                Marble Collection
              </a>
              <a href="/products?category=ceramic" className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                Ceramic Tiles
              </a>
              <a href="/products?category=porcelain" className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                Porcelain Tiles
              </a>
              <a href="/products?featured=true" className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                Featured Products
              </a>
              <a href="/about" className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                About Us
              </a>
              <a href="/contact" className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                Contact
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-xl mb-6">Our Services</h4>
            <div className="space-y-3">
              <p className="text-muted-foreground font-medium">Custom Design Consultation</p>
              <p className="text-muted-foreground font-medium">Installation Services</p>
              <p className="text-muted-foreground font-medium">Project Planning</p>
              <p className="text-muted-foreground font-medium">Quality Inspection</p>
              <p className="text-muted-foreground font-medium">After-Sales Support</p>
              <p className="text-muted-foreground font-medium">Bulk Orders</p>
              <p className="text-muted-foreground font-medium">Import Facilitation</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-xl mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-muted-foreground font-medium">
                  <p>123 Marble Market</p>
                  <p>Kishangarh, Rajasthan 305801</p>
                  <p>India</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="h-4 w-4 text-primary" />
                <div className="text-sm">
                  <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary font-medium">
                    +91 12345 67890
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Mail className="h-4 w-4 text-primary" />
                <div className="text-sm">
                  <a href="mailto:info@marmomart.com" className="text-muted-foreground hover:text-primary font-medium">
                    info@marmomart.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="h-4 w-4 text-primary mt-1" />
                <div className="text-sm text-muted-foreground font-medium">
                  <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <HeadphonesIcon className="h-4 w-4 text-primary" />
                <div className="text-sm">
                  <p className="text-muted-foreground font-medium">24/7 Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <Card className="mt-16 border-0 bg-gradient-to-r from-primary/5 to-primary/10 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h4 className="font-bold text-2xl mb-3">Stay Updated</h4>
              <p className="text-muted-foreground text-lg">
              Subscribe to our newsletter for latest product updates, design trends, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email"
                className="flex-1 h-12 text-base"
              className="flex-1"
              <Button size="lg" className="px-8">Subscribe</Button>
            <Button>Subscribe</Button>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground font-medium">
            <p>&copy; {currentYear} MarmoMart. All rights reserved.</p>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
              <LinkedinIcon className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
              <Youtube className="h-6 w-6" />
            </a>
          </div>
          
          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
  )
}