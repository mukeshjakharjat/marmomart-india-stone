import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ShippingPolicy = () => {
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
          <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>
          
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Shipping Areas</h2>
            <p>
              We currently ship across India to the following areas:
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>All major cities and metro areas</li>
              <li>Tier 2 and Tier 3 cities (delivery timeline may vary)</li>
              <li>Rural areas (subject to logistics partner availability)</li>
              <li>Some remote locations may have additional charges</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Processing Time</h2>
            <p>Order processing times vary by product type:</p>
            <ul className="list-disc ml-6 mt-4">
              <li>Ready stock items: 1-2 business days</li>
              <li>Made-to-order items: 7-15 business days</li>
              <li>Custom designs: 15-30 business days</li>
              <li>Large orders (&gt;500 sq ft): 10-20 business days</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Delivery Timeline</h2>
            <p>Delivery times after dispatch:</p>
            <ul className="list-disc ml-6 mt-4">
              <li>Metro cities: 2-4 business days</li>
              <li>Tier 2 cities: 4-7 business days</li>
              <li>Tier 3 cities: 7-10 business days</li>
              <li>Remote areas: 10-15 business days</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Shipping Charges</h2>
            <p>Shipping charges are calculated based on:</p>
            <ul className="list-disc ml-6 mt-4">
              <li>Order value and weight</li>
              <li>Delivery location and distance</li>
              <li>Product dimensions and special handling requirements</li>
              <li>Free shipping on orders above ₹50,000 (within metro cities)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Packaging</h2>
            <p>
              All products are carefully packaged to ensure safe delivery:
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>Wooden crates for heavy marble slabs</li>
              <li>Protective padding and bubble wrap</li>
              <li>Fragile stickers and handling instructions</li>
              <li>Moisture protection for outdoor shipments</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Delivery Process</h2>
            <p>Our delivery process includes:</p>
            <ul className="list-disc ml-6 mt-4">
              <li>SMS and email notifications with tracking details</li>
              <li>Delivery appointment scheduling</li>
              <li>Photo verification of products before dispatch</li>
              <li>Proof of delivery with customer signature</li>
              <li>Unpacking assistance for large orders</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Installation Services</h2>
            <p>
              Professional installation services available in select cities:
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>Certified installers with experience in marble/stone work</li>
              <li>Installation charges apply separately</li>
              <li>Site visit for measurement and planning</li>
              <li>6-month warranty on installation work</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Special Delivery Requirements</h2>
            <p>
              For large or heavy items, we may require:
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>Ground floor delivery only (crane charges for upper floors)</li>
              <li>Clear access path to delivery location</li>
              <li>Customer presence during delivery</li>
              <li>Additional manpower charges for difficult access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Tracking Your Order</h2>
            <p>
              Track your order through:
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>Order tracking page on our website</li>
              <li>SMS updates at each milestone</li>
              <li>Email notifications with detailed status</li>
              <li>Customer service helpline</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact for Shipping</h2>
            <p>
              For shipping queries and updates, contact us at:
            </p>
            <div className="mt-4">
              <p>Email: shipping@marmomartindia.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Hours: Monday to Saturday, 9 AM to 6 PM</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ShippingPolicy