import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { User } from '@supabase/supabase-js'

export const useAdmin = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (currentUser) {
        const { data: hasAdminRole } = await supabase.rpc('has_role', {
          _user_id: currentUser.id,
          _role: 'admin'
        })
        setIsAdmin(!!hasAdminRole)
      } else {
        setIsAdmin(false)
      }
      
      setLoading(false)
    }

    checkAdminStatus()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)
        
        if (currentUser) {
          supabase.rpc('has_role', {
            _user_id: currentUser.id,
            _role: 'admin'
          }).then(({ data }) => {
            setIsAdmin(!!data)
            setLoading(false)
          })
        } else {
          setIsAdmin(false)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, isAdmin, loading }
}