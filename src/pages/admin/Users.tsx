import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { UserPlus, Shield, ShieldCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: string
  full_name?: string
  email?: string
  phone?: string
  business_name?: string
  business_type?: string
  created_at: string
  user_roles?: Array<{
    role: string
  }>
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      // Fetch user roles separately
      const userIds = data.map(user => user.id)
      const { data: rolesData } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .in('user_id', userIds)
      
      // Merge the data
      const usersWithRoles = data.map(user => ({
        ...user,
        user_roles: rolesData?.filter(role => role.user_id === user.id) || []
      }))
      
      setUsers(usersWithRoles || [])
    }

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive"
      })
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    // First, remove existing roles
    await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)

    // Then add the new role if it's not 'user' (default)
    if (newRole !== 'user') {
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: newRole as 'admin' | 'manager' | 'user' }])

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update user role",
          variant: "destructive"
        })
        return
      }
    }

    toast({
      title: "Success",
      description: "User role updated successfully"
    })
    fetchUsers()
  }

  const getUserRole = (user: User) => {
    if (user.user_roles && user.user_roles.length > 0) {
      return user.user_roles[0].role
    }
    return 'user'
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive'
      case 'manager': return 'default'
      case 'user': return 'secondary'
      default: return 'secondary'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return ShieldCheck
      case 'manager': return Shield
      case 'user': return UserPlus
      default: return UserPlus
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div>Loading users...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage user accounts and roles
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const role = getUserRole(user)
                  const RoleIcon = getRoleIcon(role)
                  
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.full_name || 'Not provided'}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || '-'}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {user.business_name || '-'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user.business_type || '-'}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <RoleIcon className="h-4 w-4" />
                          <Badge variant={getRoleColor(role)}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={role}
                          onValueChange={(value) => handleRoleUpdate(user.id, value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}