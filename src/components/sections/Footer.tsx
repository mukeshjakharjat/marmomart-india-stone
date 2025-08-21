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
    <footer className="bg-card border-t">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">MarmoMart</h3>
              <Badge variant="secondary">Premium Marble & Tiles</Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              India's premier destination for luxury marble, ceramic tiles, and decorative stones. 
              Serving architects, contractors, and homeowners with premium quality materials since 1995.
            </p>
            
            {/* Trust Indicators */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-primary" />
                <span>ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>Quality Assured Products</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Pan India Delivery</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/products" className="block text-muted-foreground hover:text-primary transition-colors">
                All Products
              </a>
              <a href="/products?category=marble" className="block text-muted-foreground hover:text-primary transition-colors">
                Marble Collection
              </a>
              <a href="/products?category=ceramic" className="block text-muted-foreground hover:text-primary transition-colors">
                Ceramic Tiles
              </a>
              <a href="/products?category=porcelain" className="block text-muted-foreground hover:text-primary transition-colors">
                Porcelain Tiles
              </a>
              <a href="/products?featured=true" className="block text-muted-foreground hover:text-primary transition-colors">
                Featured Products
              </a>
              <a href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <div className="space-y-2">
              <p className="text-muted-foreground">Custom Design Consultation</p>
              <p className="text-muted-foreground">Installation Services</p>
              <p className="text-muted-foreground">Project Planning</p>
              <p className="text-muted-foreground">Quality Inspection</p>
              <p className="text-muted-foreground">After-Sales Support</p>
              <p className="text-muted-foreground">Bulk Orders</p>
              <p className="text-muted-foreground">Import Facilitation</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>123 Marble Market</p>
                  <p>Kishangarh, Rajasthan 305801</p>
                  <p>India</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <div className="text-sm">
                  <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary">
                    +91 12345 67890
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <div className="text-sm">
                  <a href="mailto:info@marmomart.com" className="text-muted-foreground hover:text-primary">
                    info@marmomart.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-primary mt-1" />
                <div className="text-sm text-muted-foreground">
                  <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <HeadphonesIcon className="h-4 w-4 text-primary" />
                <div className="text-sm">
                  <p className="text-muted-foreground">24/7 Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 bg-muted/50 rounded-xl p-6">
          <div className="text-center mb-6">
            <h4 className="font-semibold text-lg mb-2">Stay Updated</h4>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for latest product updates, design trends, and exclusive offers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email"
              type="email"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <p>&copy; {currentYear} MarmoMart. All rights reserved.</p>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
          
          {/* Legal Links */}
          <div className="flex items-center gap-4 text-sm">
            <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}