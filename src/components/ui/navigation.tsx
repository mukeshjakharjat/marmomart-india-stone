import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingCart, User, Menu, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface NavigationProps {
  isAuthenticated?: boolean
  onAuthClick: () => void
  onCartClick: () => void
  cartItemsCount?: number
}

export function Navigation({ 
  isAuthenticated = false, 
  onAuthClick, 
  onCartClick,
  cartItemsCount = 0 
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">MarmoMart</h1>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Premium Marble & Tiles
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/products" className="text-foreground hover:text-primary transition-colors">Marble</a>
            <a href="/products" className="text-foreground hover:text-primary transition-colors">Ceramic Tiles</a>
            <a href="/products" className="text-foreground hover:text-primary transition-colors">Porcelain</a>
            <a href="/products" className="text-foreground hover:text-primary transition-colors">Decorative</a>
            <a href="/products" className="text-foreground hover:text-primary transition-colors">Natural Stone</a>
          </nav>

          {/* Search Bar */}
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
          <div className="flex items-center space-x-4">
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
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem>Addresses</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onAuthClick}>Login</Button>
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
                  <SheetTitle>MarmoMart</SheetTitle>
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
                        href="/products" 
                        className="block py-2 text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Marble
                      </a>
                      <a 
                        href="/products" 
                        className="block py-2 text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Ceramic Tiles
                      </a>
                      <a 
                        href="/products" 
                        className="block py-2 text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Porcelain
                      </a>
                      <a 
                        href="/products" 
                        className="block py-2 text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Decorative
                      </a>
                      <a 
                        href="/products" 
                        className="block py-2 text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Natural Stone
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
                    
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          Orders
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          Addresses
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-destructive">
                          Logout
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
                        Login
                      </Button>
                    )}
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