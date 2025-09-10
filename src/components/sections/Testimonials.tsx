import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Architect",
    company: "Kumar Associates",
    image: "/placeholder.svg",
    rating: 5,
    text: "MarmoMart has been our go-to supplier for premium marble. Their quality is unmatched and delivery is always on time. Highly recommended for luxury projects.",
    project: "Luxury Villa in Gurgaon"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Interior Designer",
    company: "Design Studio",
    image: "/placeholder.svg",
    rating: 5,
    text: "The variety and quality of tiles at MarmoMart is exceptional. Their team helped us find the perfect marble for our client's dream home.",
    project: "Modern Apartment in Mumbai"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Contractor",
    company: "Patel Construction",
    image: "/placeholder.svg",
    rating: 5,
    text: "Professional service and competitive pricing. MarmoMart has been our trusted partner for over 5 years. Their installation team is excellent.",
    project: "Commercial Complex in Pune"
  },
  {
    id: 4,
    name: "Sunita Agarwal",
    role: "Homeowner",
    company: "Personal Project",
    image: "/placeholder.svg",
    rating: 5,
    text: "Transformed our home with beautiful Italian marble from MarmoMart. The entire process was smooth and the result exceeded our expectations.",
    project: "Home Renovation in Delhi"
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Builder",
    company: "Singh Developers",
    image: "/placeholder.svg",
    rating: 5,
    text: "Bulk orders are handled efficiently with consistent quality. MarmoMart understands the needs of large-scale projects.",
    project: "Residential Complex in Jaipur"
  },
  {
    id: 6,
    name: "Meera Reddy",
    role: "Hotel Owner",
    company: "Reddy Hospitality",
    image: "/placeholder.svg",
    rating: 5,
    text: "The premium granite and marble from MarmoMart gave our hotel lobby a luxurious look. Guests always compliment the beautiful flooring.",
    project: "5-Star Hotel in Hyderabad"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            Customer Stories
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust MarmoMart for their 
            premium marble and tile requirements across India.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="group hover:shadow-xl transition-all duration-500 border-0 bg-card/50 backdrop-blur overflow-hidden"
            >
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="flex justify-between items-start">
                  <Quote className="h-8 w-8 text-primary/30" />
                  <div className="flex items-center">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Project Badge */}
                <Badge variant="outline" className="text-xs">
                  {testimonial.project}
                </Badge>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="text-center">
          <Card className="border-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">4.9/5</p>
                  <p className="text-muted-foreground font-medium">Average Rating</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">5,000+</p>
                  <p className="text-muted-foreground font-medium">Happy Customers</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">10,000+</p>
                  <p className="text-muted-foreground font-medium">Projects Completed</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">25+</p>
                  <p className="text-muted-foreground font-medium">Years Experience</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}