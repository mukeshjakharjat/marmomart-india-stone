import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye, Package, Truck, CheckCircle, Clock, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { User, Session } from "@supabase/supabase-js"

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  created_at: string
  project_name?: string
  order_items: {
    id: string
    product_id: string
    quantity: number
    unit_price: number
    total_price: number
    products: {
      name: string
      images: any
    }
  }[]
}

const Orders = () => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          status,
          total_amount,
          created_at,
          project_name,
          order_items (
            id,
            product_id,
            quantity,
            unit_price,
            total_price,
            products (
              name,
              images
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load orders"
      })
      // Show demo orders if database query fails
      setOrders([
        {
          id: '1',
          order_number: 'ORD-2024-001',
          status: 'delivered',
          total_amount: 45000,
          created_at: '2024-01-15T10:30:00Z',
          project_name: 'Living Room Renovation',
          order_items: [
            {
              id: '1',
              product_id: '1',
              quantity: 50,
              unit_price: 450,
              total_price: 22500,
              products: {
                name: 'Carrara White Marble',
                images: ['/placeholder.svg']
              }
            }
          ]
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleAuthClick = () => {
    navigate("/auth")
  }

  const handleCartClick = () => {
    navigate("/cart")
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' }
      case 'confirmed':
        return { icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Confirmed' }
      case 'processing':
        return { icon: Package, color: 'text-orange-600', bg: 'bg-orange-100', label: 'Processing' }
      case 'shipped':
        return { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Shipped' }
      case 'delivered':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Delivered' }
      default:
        return { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Unknown' }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          isAuthenticated={false}
          onAuthClick={handleAuthClick}
          onCartClick={handleCartClick}
          cartItemsCount={0}
        />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-muted-foreground mb-6">You need to login to view your orders</p>
          <Button onClick={handleAuthClick}>
            Login
          </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          isAuthenticated={!!user}
          onAuthClick={handleAuthClick}
          onCartClick={handleCartClick}
          cartItemsCount={0}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-4 w-1/3"></div>
                  <div className="h-4 bg-muted rounded mb-2 w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                </CardContent>
              </Card>
            ))}
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
        cartItemsCount={0}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
            <Button onClick={() => navigate("/products")}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status)
              const StatusIcon = statusInfo.icon
              
              return (
                <Card key={order.id}>
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">
                          Order #{order.order_number}
                        </CardTitle>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {formatDate(order.created_at)}
                          </div>
                          {order.project_name && (
                            <Badge variant="outline">
                              {order.project_name}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bg}`}>
                          <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                          <span className={`text-sm font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{order.total_amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.order_items.length} items
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      {order.order_items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img
                            src={Array.isArray(item.products.images) && item.products.images.length > 0 
                              ? item.products.images[0] 
                              : "/placeholder.svg"
                            }
                            alt={item.products.name}
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"
                            }}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.products.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity} × ₹{item.unit_price}
                            </p>
                          </div>
                          <p className="font-medium text-sm">
                            ₹{item.total_price.toLocaleString()}
                          </p>
                        </div>
                      ))}
                      
                      {order.order_items.length > 3 && (
                        <p className="text-sm text-muted-foreground">
                          +{order.order_items.length - 3} more items
                        </p>
                      )}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      
                      {order.status === 'delivered' && (
                        <Button size="sm">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders