import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const RefundPolicy = () => {
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
          <h1 className="text-3xl font-bold mb-8">Refund & Return Policy</h1>
          
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Return Eligibility</h2>
            <p>
              Due to the nature of marble and stone products, returns are accepted only under 
              specific conditions:
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>Manufacturing defects or damage during transit</li>
              <li>Wrong product delivered (different from order)</li>
              <li>Significant quality issues not disclosed at time of purchase</li>
              <li>Returns must be initiated within 7 days of delivery</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Non-Returnable Items</h2>
            <p>The following items cannot be returned:</p>
            <ul className="list-disc ml-6 mt-4">
              <li>Custom-cut or custom-sized products</li>
              <li>Products that have been installed</li>
              <li>Products damaged due to mishandling by customer</li>
              <li>Products purchased on clearance or special offers</li>
              <li>Natural variations in marble/stone patterns and colors</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Return Process</h2>
            <p>To initiate a return:</p>
            <ol className="list-decimal ml-6 mt-4">
              <li>Contact our customer service within 7 days of delivery</li>
              <li>Provide order details and reason for return</li>
              <li>Send photos of the product showing the issue</li>
              <li>Await approval and return instructions</li>
              <li>Package items carefully in original packaging</li>
              <li>Schedule pickup with our logistics partner</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Refund Processing</h2>
            <p>Upon receiving and inspecting returned items:</p>
            <ul className="list-disc ml-6 mt-4">
              <li>Approved refunds will be processed within 7-10 business days</li>
              <li>Refunds will be credited to the original payment method</li>
              <li>Shipping charges are non-refundable unless it's our error</li>
              <li>Return shipping costs will be deducted from refund amount</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Exchange Policy</h2>
            <p>
              Exchanges are available for manufacturing defects or wrong products delivered. 
              Exchanges must be of equal or higher value. Price differences must be paid before 
              exchange processing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Damaged Products</h2>
            <p>
              If you receive damaged products:
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>Report damage within 24 hours of delivery</li>
              <li>Do not install or use damaged products</li>
              <li>Take photos of packaging and damaged items</li>
              <li>We will arrange immediate replacement or refund</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Cancellation Policy</h2>
            <p>
              Orders can be cancelled before processing begins (typically within 24 hours). 
              Custom orders cannot be cancelled once production starts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Contact for Returns</h2>
            <p>
              For return requests and queries, contact us at:
            </p>
            <div className="mt-4">
              <p>Email: returns@marmomartindia.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Hours: Monday to Saturday, 9 AM to 6 PM</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default RefundPolicy