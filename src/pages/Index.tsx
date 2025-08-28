import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Navigation } from "@/components/ui/navigation"
import { HeroSection } from "@/components/ui/hero-section"
import { FeaturedProducts } from "@/components/sections/FeaturedProducts"
import { Categories } from "@/components/sections/Categories"
import { Testimonials } from "@/components/sections/Testimonials"
import { Footer } from "@/components/sections/Footer"
import { useAuth } from "@/hooks/useAuth"

const Index = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  const handleAuthClick = () => {
    if (user) {
      navigate("/dashboard")
    } else {
      navigate("/auth")
    }
  }

  const handleCartClick = () => {
    navigate("/cart")
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
        <FeaturedProducts />
        <Categories />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
