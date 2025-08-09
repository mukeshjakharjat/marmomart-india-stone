import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
            <Button variant="ghost" className="text-base">Marble</Button>
            <Button variant="ghost" className="text-base">Ceramic Tiles</Button>
            <Button variant="ghost" className="text-base">Porcelain</Button>
            <Button variant="ghost" className="text-base">Decorative</Button>
            <Button variant="ghost" className="text-base">Natural Stone</Button>
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
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}