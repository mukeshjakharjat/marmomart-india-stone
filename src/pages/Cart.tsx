import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { User, Session } from "@supabase/supabase-js"

interface CartItem {
  id: string
  name: string
  price_per_sqft: number | null
  price_per_piece: number | null
  quantity: number
  area_sqft: number | null
  room_details: string
  images: any
}

const Cart = () => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [projectName, setProjectName] = useState("")
  const [projectAddress, setProjectAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [installationRequired, setInstallationRequired] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleAuthClick = () => {
    navigate("/auth")
  }

  const handleCartClick = () => {
    // Already on cart page
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
      return
    }
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId))
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart"
    })
  }

  const calculateItemTotal = (item: CartItem) => {
    if (item.price_per_sqft && item.area_sqft) {
      return item.price_per_sqft * item.area_sqft
    } else if (item.price_per_piece) {
      return item.price_per_piece * item.quantity
    }
    return 0
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0)
  }

  const handleCheckout = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Please Login",
        description: "You need to login to place an order"
      })
      navigate("/auth")
      return
    }

    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty Cart",
        description: "Please add items to your cart before checking out"
      })
      return
    }

    try {
      // Create order - order_number will be generated automatically by the database
      const orderData = {
        user_id: user.id,
        total_amount: calculateTotal(),
        shipping_address: {
          // This would come from user's saved addresses
          name: "Default Address",
          address_line1: projectAddress || "To be updated"
        },
        project_name: projectName,
        project_address: projectAddress,
        notes: notes,
        installation_required: installationRequired,
        total_area: cartItems.reduce((total, item) => total + (item.area_sqft || 0), 0)
      }

      // Create order with generated order number
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          ...orderData,
          order_number: '', // This will be replaced by the database trigger/function
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price_per_sqft || item.price_per_piece || 0,
        total_price: calculateItemTotal(item),
        area_sqft: item.area_sqft,
        room_details: item.room_details
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${order.order_number} has been placed`
      })

      // Clear cart
      setCartItems([])
      navigate("/orders")

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: error.message || "Failed to place order"
      })
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          isAuthenticated={!!user}
          onAuthClick={handleAuthClick}
          onCartClick={handleCartClick}
          cartItemsCount={0}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some beautiful marble and tiles to get started</p>
            <Button onClick={() => navigate("/products")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isAuthenticated={!!user}
        onAuthClick={handleAuthClick}
        onCartClick={handleCartClick}
        cartItemsCount={cartItems.length}
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={(Array.isArray(item.images) && item.images.length > 0) ? item.images[0] : "/placeholder.svg"}
                      alt={item.name}
                      className="w-full sm:w-24 h-24 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-2">
                          <p className="text-primary font-semibold">
                            {item.price_per_sqft 
                              ? `₹${item.price_per_sqft}/sq ft` 
                              : `₹${item.price_per_piece}/piece`
                            }
                          </p>
                          {item.area_sqft && (
                            <p className="text-sm text-muted-foreground">
                              Area: {item.area_sqft} sq ft
                            </p>
                          )}
                          {item.room_details && (
                            <p className="text-sm text-muted-foreground">
                              Room: {item.room_details}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-semibold">₹{calculateItemTotal(item).toLocaleString()}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary & Project Details */}
          <div className="space-y-6">
            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="e.g., Living Room Renovation"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project-address">Project Address</Label>
                  <Textarea
                    id="project-address"
                    placeholder="Enter project/delivery address"
                    value={projectAddress}
                    onChange={(e) => setProjectAddress(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Special Instructions</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requirements or notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{calculateItemTotal(item).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                >
                  Place Order
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigate("/products")}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart