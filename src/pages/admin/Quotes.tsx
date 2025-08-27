import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { Eye, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QuoteRequest {
  id: string
  order_number: string
  project_name?: string
  total_amount: number
  status: string
  created_at: string
  profiles?: {
    full_name?: string
    email?: string
  }
  order_items?: Array<{
    quantity: number
    area_sqft?: number
    room_details?: string
    products?: {
      name: string
      sku: string
    }
  }>
}

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    // Fetch orders that are essentially quote requests
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      // Fetch profiles separately
      const userIds = data.map(order => order.user_id)
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds)
      
      // Fetch order items with products
      const orderIds = data.map(order => order.id)
      const { data: orderItemsData } = await supabase
        .from('order_items')
        .select('order_id, quantity, area_sqft, room_details, product_id')
        .in('order_id', orderIds)
      
      const productIds = orderItemsData?.map(item => item.product_id) || []
      const { data: productsData } = await supabase
        .from('products')
        .select('id, name, sku')
        .in('id', productIds)
      
      // Merge all the data
      const quotesWithData = data.map(order => ({
        ...order,
        profiles: profilesData?.find(profile => profile.id === order.user_id),
        order_items: orderItemsData?.filter(item => item.order_id === order.id).map(item => ({
          ...item,
          products: productsData?.find(product => product.id === item.product_id)
        }))
      }))
      
      setQuotes(quotesWithData || [])
    }

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load quote requests",
        variant: "destructive"
      })
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (quoteId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', quoteId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update quote status",
        variant: "destructive"
      })
    } else {
      toast({
        title: "Success",
        description: "Quote status updated successfully"
      })
      fetchQuotes()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary'
      case 'quoted': return 'default'
      case 'approved': return 'default'
      case 'rejected': return 'destructive'
      default: return 'secondary'
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div>Loading quote requests...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quote Requests</h2>
          <p className="text-muted-foreground">
            Manage customer quote requests and proposals
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quote Request List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Estimated Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">
                      {quote.order_number}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {quote.profiles?.full_name || 'Unknown'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {quote.profiles?.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {quote.project_name || 'Not specified'}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {quote.order_items?.slice(0, 2).map((item, index) => (
                          <div key={index} className="text-sm">
                            <p className="font-medium">
                              {item.products?.name}
                            </p>
                            <p className="text-muted-foreground">
                              Qty: {item.quantity}
                              {item.area_sqft && ` | ${item.area_sqft} sqft`}
                            </p>
                          </div>
                        ))}
                        {(quote.order_items?.length || 0) > 2 && (
                          <p className="text-sm text-muted-foreground">
                            +{(quote.order_items?.length || 0) - 2} more items
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>₹{quote.total_amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(quote.status)}>
                        {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(quote.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleStatusUpdate(quote.id, 'quoted')}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}