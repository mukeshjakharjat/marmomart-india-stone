import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const TermsConditions = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isAuthenticated={false}
        onAuthClick={() => navigate("/auth")}
        onCartClick={() => navigate("/cart")}
        cartItemsCount={0}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
          
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to MarmoMart India Stone. These Terms and Conditions ("Terms", "Terms and Conditions") 
              govern your relationship with MarmoMart India Stone website (the "Service") operated by 
              MarmoMart India Stone ("us", "we", or "our").
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by the above, please do not 
              use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Products and Services</h2>
            <p>
              MarmoMart India Stone provides high-quality marble, tiles, and stone products. We reserve 
              the right to modify, discontinue or remove products from our catalog at any time without 
              prior notice.
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>All product descriptions and images are for reference only</li>
              <li>Actual products may vary slightly in color, pattern, and finish</li>
              <li>Measurements are approximate and may have minor variations</li>
              <li>Custom orders are subject to separate terms and conditions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Pricing and Payment</h2>
            <p>
              All prices are in Indian Rupees (INR) and are subject to change without notice. 
              We accept various payment methods as specified during checkout.
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>Prices include applicable taxes unless otherwise stated</li>
              <li>Installation charges are separate unless specified</li>
              <li>Advance payment may be required for large orders</li>
              <li>Price quotes are valid for 30 days unless otherwise mentioned</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Order Processing and Delivery</h2>
            <p>
              Orders are processed within 1-3 business days. Delivery times vary based on location 
              and product availability.
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>Delivery charges apply as per location and order value</li>
              <li>Installation services available in select cities</li>
              <li>Customer must inspect products upon delivery</li>
              <li>Any damages must be reported within 24 hours of delivery</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p>
              MarmoMart India Stone shall not be liable for any indirect, incidental, or consequential 
              damages arising from the use of our products or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed in accordance with the laws of India. 
              Any dispute shall be subject to the jurisdiction of courts in Mumbai, Maharashtra.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="mt-4">
              <p>Email: info@marmomartindia.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Address: Mumbai, Maharashtra, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions