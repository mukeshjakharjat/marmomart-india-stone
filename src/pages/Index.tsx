import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Navigation } from "@/components/ui/navigation"
import { HeroSection } from "@/components/ui/hero-section"
import { supabase } from "@/integrations/supabase/client"
import type { User, Session } from "@supabase/supabase-js"

const Index = () => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const navigate = useNavigate()

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
    // TODO: Implement cart functionality
    console.log("Cart clicked")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isAuthenticated={!!user}
        onAuthClick={handleAuthClick}
        onCartClick={handleCartClick}
        cartItemsCount={0}
      />
      <main>
        <HeroSection />
        {/* TODO: Add product catalog, featured products, etc. */}
      </main>
    </div>
  );
};

export default Index;
