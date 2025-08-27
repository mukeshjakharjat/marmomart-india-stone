import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"
import { Package, ShoppingCart, Users, FileText } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    pendingOrders: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      const [productsResult, ordersResult, usersResult, pendingOrdersResult] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending')
      ])

      setStats({
        products: productsResult.count || 0,
        orders: ordersResult.count || 0,
        users: usersResult.count || 0,
        pendingOrders: pendingOrdersResult.count || 0
      })
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: ShoppingCart,
      color: "text-green-600"
    },
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: FileText,
      color: "text-orange-600"
    }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to your admin dashboard. Here's an overview of your business.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Recent orders and user activities will be displayed here.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • Add new products
              </p>
              <p className="text-sm text-muted-foreground">
                • Process pending orders
              </p>
              <p className="text-sm text-muted-foreground">
                • Manage user roles
              </p>
              <p className="text-sm text-muted-foreground">
                • Review quote requests
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}