import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingCart, User, Menu, Search, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UserMenu } from "@/components/ui/user-menu"
import { useAuth } from "@/hooks/useAuth"

interface NavigationProps {
  onAuthClick: () => void
  onCartClick: () => void
  cartItemsCount?: number
  isAuthenticated?: boolean
}

export function Navigation({ 
  onAuthClick, 
  onCartClick,
  cartItemsCount = 0,
  isAuthenticated = false
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, profile } = useAuth()

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-primary">MarmoMart</h1>
            </a>
            <Badge variant="secondary" className="hidden sm:inline-flex text-xs">
              Premium Marble & Tiles
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/products?category=marble" className="text-foreground hover:text-primary transition-colors font-medium">
              Marble
            </a>
            <a href="/products?category=ceramic" className="text-foreground hover:text-primary transition-colors font-medium">
              Ceramic
            </a>
            <a href="/products?category=porcelain" className="text-foreground hover:text-primary transition-colors font-medium">
              Porcelain
            </a>
            <a href="/products?category=granite" className="text-foreground hover:text-primary transition-colors font-medium">
              Granite
            </a>
            <a href="/products" className="text-foreground hover:text-primary transition-colors font-medium">
              All Products
            </a>
          </nav>

          {/* Search Bar - Desktop Only */}
          <div className="flex-1 max-w-sm mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Emergency Contact - Mobile */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              asChild
            >
              <a href="tel:+919876543210">
                <Phone className="h-5 w-5" />
              </a>
            </Button>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* User Account */}
            {user ? (
              <UserMenu user={user} profile={profile} />
            ) : (
              <Button onClick={onAuthClick} size="sm" className="hidden md:flex">
                Login
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">MarmoMart</SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="Search products..." 
                      className="pl-10"
                    />
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      <a 
                        href="/products?category=marble" 
                        className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Italian & Indian Marble
                      </a>
                      <a 
                        href="/products?category=ceramic" 
                        className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Ceramic Tiles
                      </a>
                      <a 
                        href="/products?category=porcelain" 
                        className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Porcelain Tiles
                      </a>
                      <a 
                        href="/products?category=granite" 
                        className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Granite & Natural Stone
                      </a>
                      <a 
                        href="/products" 
                        className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        View All Products
                      </a>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Quick Links
                    </h3>
                    <div className="space-y-2">
                      <a 
                        href="/about" 
                        className="block py-2 text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        About Us
                      </a>
                      <a 
                        href="/contact" 
                        className="block py-2 text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Contact
                      </a>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="space-y-4 pt-4 border-t">
                    <Button 
                      onClick={() => {
                        onCartClick()
                        setMobileMenuOpen(false)
                      }}
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Cart ({cartItemsCount})
                    </Button>
                    
                    {user ? (
                      <div className="space-y-2">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => {
                            onAuthClick()
                            setMobileMenuOpen(false)
                          }}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Dashboard
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => {
                          onAuthClick()
                          setMobileMenuOpen(false)
                        }}
                        className="w-full"
                      >
                        Login / Sign Up
                      </Button>
                    )}

                    {/* Emergency Contact */}
                    <Button 
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href="tel:+919876543210">
                        <Phone className="h-4 w-4 mr-2" />
                        Call: +91 98765 43210
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}