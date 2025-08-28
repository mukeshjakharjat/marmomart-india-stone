import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Package, 
  MapPin, 
  Settings, 
  LogOut, 
  Edit, 
  Plus,
  Trash2,
  Eye,
  Calendar,
  ShoppingCart,
  FileText,
  Star
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { User as SupabaseUser, Session } from "@supabase/supabase-js"

interface Profile {
  id: string
  full_name?: string
  email?: string
  phone?: string
  business_name?: string
  business_type?: string
  gst_number?: string
}

interface Address {
  id: string
  name: string
  phone: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  pincode: string
  landmark?: string
  is_default: boolean
}

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  created_at: string
  project_name?: string
  order_items: {
    id: string
    quantity: number
    unit_price: number
    total_price: number
    products: {
      name: string
      images: any
    }
  }[]
}

const Dashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const [profileForm, setProfileForm] = useState({
    full_name: '',
    phone: '',
    business_name: '',
    business_type: '',
    gst_number: ''
  })

  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    is_default: false
  })

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (!session?.user) {
          navigate('/auth')
        }
      }
    )

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (!session?.user) {
        navigate('/auth')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    if (!user) return

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
        setProfileForm({
          full_name: profileData.full_name || '',
          phone: profileData.phone || '',
          business_name: profileData.business_name || '',
          business_type: profileData.business_type || '',
          gst_number: profileData.gst_number || ''
        })
      }

      // Fetch addresses
      const { data: addressesData } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })

      setAddresses(addressesData || [])

      // Fetch orders
      const { data: ordersData } = await supabase
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
        .limit(10)

      setOrders(ordersData || [])

    } catch (error: any) {
      console.error('Error fetching user data:', error)
      // Set demo data for fallback
      setOrders([
        {
          id: '1',
          order_number: 'MM20240115001',
          status: 'delivered',
          total_amount: 45000,
          created_at: '2024-01-15T10:30:00Z',
          project_name: 'Living Room Renovation',
          order_items: [
            {
              id: '1',
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

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out"
      })
      navigate('/')
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout"
      })
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileForm)
        .eq('id', user.id)

      if (error) throw error

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully"
      })
      
      fetchUserData()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile"
      })
    }
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      if (editingAddress) {
        const { error } = await supabase
          .from('addresses')
          .update(addressForm)
          .eq('id', editingAddress.id)

        if (error) throw error
        toast({
          title: "Address Updated",
          description: "Address has been updated successfully"
        })
      } else {
        const { error } = await supabase
          .from('addresses')
          .insert([{ ...addressForm, user_id: user.id }])

        if (error) throw error
        toast({
          title: "Address Added",
          description: "New address has been added successfully"
        })
      }

      setShowAddressForm(false)
      setEditingAddress(null)
      setAddressForm({
        name: '',
        phone: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        pincode: '',
        landmark: '',
        is_default: false
      })
      fetchUserData()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save address"
      })
    }
  }

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return

    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId)

      if (error) throw error

      toast({
        title: "Address Deleted",
        description: "Address has been deleted successfully"
      })
      fetchUserData()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete address"
      })
    }
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' }
      case 'confirmed':
        return { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Confirmed' }
      case 'processing':
        return { color: 'text-orange-600', bg: 'bg-orange-100', label: 'Processing' }
      case 'shipped':
        return { color: 'text-purple-600', bg: 'bg-purple-100', label: 'Shipped' }
      case 'delivered':
        return { color: 'text-green-600', bg: 'bg-green-100', label: 'Delivered' }
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Unknown' }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          isAuthenticated={!!user}
          onAuthClick={() => navigate("/auth")}
          onCartClick={() => navigate("/cart")}
          cartItemsCount={0}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isAuthenticated={!!user}
        onAuthClick={() => navigate("/auth")}
        onCartClick={() => navigate("/cart")}
        cartItemsCount={0}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.full_name || user.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{orders.length}</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'delivered').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{addresses.length}</p>
                  <p className="text-sm text-muted-foreground">Saved Addresses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.slice(0, 3).map((order) => {
                    const statusInfo = getStatusInfo(order.status)
                    return (
                      <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div>
                          <p className="font-medium">#{order.order_number}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{order.total_amount.toLocaleString()}</p>
                          <Badge variant="outline" className={statusInfo.color}>
                            {statusInfo.label}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                  {orders.length === 0 && (
                    <p className="text-center text-muted-foreground py-6">
                      No orders yet. Start shopping to see your orders here.
                    </p>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => setActiveTab("orders")}
                  >
                    View All Orders
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate("/products")}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Browse Products
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("addresses")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Manage Addresses
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate("/contact")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profileForm.full_name}
                        onChange={(e) => setProfileForm({...profileForm, full_name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={user.email || ''}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed. Contact support if needed.
                    </p>
                  </div>

                  <Separator />

                  <h3 className="text-lg font-semibold">Business Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business_name">Business Name</Label>
                      <Input
                        id="business_name"
                        value={profileForm.business_name}
                        onChange={(e) => setProfileForm({...profileForm, business_name: e.target.value})}
                        placeholder="Enter business name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business_type">Business Type</Label>
                      <Select 
                        value={profileForm.business_type} 
                        onValueChange={(value) => setProfileForm({...profileForm, business_type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="contractor">Contractor</SelectItem>
                          <SelectItem value="architect">Architect</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gst_number">GST Number</Label>
                    <Input
                      id="gst_number"
                      value={profileForm.gst_number}
                      onChange={(e) => setProfileForm({...profileForm, gst_number: e.target.value})}
                      placeholder="Enter GST number"
                    />
                  </div>

                  <Button type="submit">
                    Update Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Saved Addresses</h2>
              <Button onClick={() => setShowAddressForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </div>

            {showAddressForm && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="addr_name">Name</Label>
                        <Input
                          id="addr_name"
                          value={addressForm.name}
                          onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
                          placeholder="Full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="addr_phone">Phone</Label>
                        <Input
                          id="addr_phone"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                          placeholder="Phone number"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address_line1">Address Line 1</Label>
                      <Input
                        id="address_line1"
                        value={addressForm.address_line1}
                        onChange={(e) => setAddressForm({...addressForm, address_line1: e.target.value})}
                        placeholder="House/Building number, Street name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address_line2">Address Line 2</Label>
                      <Input
                        id="address_line2"
                        value={addressForm.address_line2}
                        onChange={(e) => setAddressForm({...addressForm, address_line2: e.target.value})}
                        placeholder="Area, Locality"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                          placeholder="City"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                          placeholder="State"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          value={addressForm.pincode}
                          onChange={(e) => setAddressForm({...addressForm, pincode: e.target.value})}
                          placeholder="Pincode"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark</Label>
                      <Input
                        id="landmark"
                        value={addressForm.landmark}
                        onChange={(e) => setAddressForm({...addressForm, landmark: e.target.value})}
                        placeholder="Nearby landmark"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is_default"
                        checked={addressForm.is_default}
                        onChange={(e) => setAddressForm({...addressForm, is_default: e.target.checked})}
                      />
                      <Label htmlFor="is_default">Set as default address</Label>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">
                        {editingAddress ? 'Update Address' : 'Add Address'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setShowAddressForm(false)
                          setEditingAddress(null)
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <Card key={address.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold">{address.name}</p>
                        <p className="text-sm text-muted-foreground">{address.phone}</p>
                      </div>
                      {address.is_default && (
                        <Badge variant="default">Default</Badge>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-3">
                      <p>{address.address_line1}</p>
                      {address.address_line2 && <p>{address.address_line2}</p>}
                      <p>{address.city}, {address.state} - {address.pincode}</p>
                      {address.landmark && <p>Near: {address.landmark}</p>}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEditingAddress(address)
                          setAddressForm(address)
                          setShowAddressForm(true)
                        }}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {addresses.length === 0 && (
              <div className="text-center py-8">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No addresses saved yet</p>
                <Button onClick={() => setShowAddressForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Address
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profileForm.full_name}
                        onChange={(e) => setProfileForm({...profileForm, full_name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={user.email || ''}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed. Contact support if needed.
                    </p>
                  </div>

                  <Separator />

                  <h3 className="text-lg font-semibold">Business Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business_name">Business Name</Label>
                      <Input
                        id="business_name"
                        value={profileForm.business_name}
                        onChange={(e) => setProfileForm({...profileForm, business_name: e.target.value})}
                        placeholder="Enter business name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business_type">Business Type</Label>
                      <Select 
                        value={profileForm.business_type} 
                        onValueChange={(value) => setProfileForm({...profileForm, business_type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="contractor">Contractor</SelectItem>
                          <SelectItem value="architect">Architect</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gst_number">GST Number</Label>
                    <Input
                      id="gst_number"
                      value={profileForm.gst_number}
                      onChange={(e) => setProfileForm({...profileForm, gst_number: e.target.value})}
                      placeholder="Enter GST number"
                    />
                  </div>

                  <Button type="submit">
                    Update Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Saved Addresses</h2>
              <Button onClick={() => setShowAddressForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </div>

            {showAddressForm && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="addr_name">Name</Label>
                        <Input
                          id="addr_name"
                          value={addressForm.name}
                          onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
                          placeholder="Full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="addr_phone">Phone</Label>
                        <Input
                          id="addr_phone"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                          placeholder="Phone number"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address_line1">Address Line 1</Label>
                      <Input
                        id="address_line1"
                        value={addressForm.address_line1}
                        onChange={(e) => setAddressForm({...addressForm, address_line1: e.target.value})}
                        placeholder="House/Building number, Street name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address_line2">Address Line 2</Label>
                      <Input
                        id="address_line2"
                        value={addressForm.address_line2}
                        onChange={(e) => setAddressForm({...addressForm, address_line2: e.target.value})}
                        placeholder="Area, Locality"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                          placeholder="City"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                          placeholder="State"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          value={addressForm.pincode}
                          onChange={(e) => setAddressForm({...addressForm, pincode: e.target.value})}
                          placeholder="Pincode"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark</Label>
                      <Input
                        id="landmark"
                        value={addressForm.landmark}
                        onChange={(e) => setAddressForm({...addressForm, landmark: e.target.value})}
                        placeholder="Nearby landmark"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is_default"
                        checked={addressForm.is_default}
                        onChange={(e) => setAddressForm({...addressForm, is_default: e.target.checked})}
                      />
                      <Label htmlFor="is_default">Set as default address</Label>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">
                        {editingAddress ? 'Update Address' : 'Add Address'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setShowAddressForm(false)
                          setEditingAddress(null)
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <Card key={address.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold">{address.name}</p>
                        <p className="text-sm text-muted-foreground">{address.phone}</p>
                      </div>
                      {address.is_default && (
                        <Badge variant="default">Default</Badge>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-3">
                      <p>{address.address_line1}</p>
                      {address.address_line2 && <p>{address.address_line2}</p>}
                      <p>{address.city}, {address.state} - {address.pincode}</p>
                      {address.landmark && <p>Near: {address.landmark}</p>}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEditingAddress(address)
                          setAddressForm(address)
                          setShowAddressForm(true)
                        }}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {addresses.length === 0 && (
              <div className="text-center py-8">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No addresses saved yet</p>
                <Button onClick={() => setShowAddressForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Address
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No orders yet</p>
                    <Button onClick={() => navigate("/products")}>
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const statusInfo = getStatusInfo(order.status)
                      return (
                        <Card key={order.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                              <div>
                                <p className="font-semibold">Order #{order.order_number}</p>
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

                            <div className="space-y-2">
                              {order.order_items.slice(0, 2).map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                  <img
                                    src={Array.isArray(item.products.images) && item.products.images.length > 0 
                                      ? item.products.images[0] 
                                      : "/placeholder.svg"
                                    }
                                    alt={item.products.name}
                                    className="w-10 h-10 object-cover rounded"
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
                              
                              {order.order_items.length > 2 && (
                                <p className="text-sm text-muted-foreground">
                                  +{order.order_items.length - 2} more items
                                </p>
                              )}
                            </div>
                            
                            <div className="flex justify-end mt-4">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Dashboard