import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "Architect",
    company: "Sharma Architects",
    rating: 5,
    comment: "MarmoMart has been our go-to supplier for premium marble and tiles. Their quality is exceptional and delivery is always on time. Highly recommend for any luxury project.",
    image: "/placeholder.svg",
    project: "5-Star Hotel Project"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Interior Designer", 
    company: "Design Studio",
    rating: 5,
    comment: "The variety and quality of tiles at MarmoMart is outstanding. Their team understands design requirements perfectly and suggests the best materials for each project.",
    image: "/placeholder.svg",
    project: "Luxury Residence"
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Contractor",
    company: "Kumar Construction",
    rating: 5,
    comment: "Working with MarmoMart for over 3 years. Their competitive pricing, quality assurance, and professional service makes them the best in the marble industry.",
    image: "/placeholder.svg",
    project: "Commercial Complex"
  },
  {
    id: 4,
    name: "Neha Singh",
    role: "Homeowner",
    company: "Personal Project",
    rating: 5,
    comment: "Renovated my entire home with MarmoMart's marble and tiles. The transformation is incredible! Their team guided us through every step of the selection process.",
    image: "/placeholder.svg",
    project: "Home Renovation"
  },
  {
    id: 5,
    name: "Vikram Gupta",
    role: "Developer",
    company: "Gupta Properties",
    rating: 5,
    comment: "For our premium residential projects, we only trust MarmoMart. Their imported marble collection and service quality is unmatched in the market.",
    image: "/placeholder.svg",
    project: "Residential Complex"
  },
  {
    id: 6,
    name: "Sunita Reddy",
    role: "Architect",
    company: "Reddy Associates",
    rating: 5,
    comment: "MarmoMart's diverse range of materials and their expertise in sourcing unique stones has helped us create some truly remarkable spaces for our clients.",
    image: "/placeholder.svg",
    project: "Corporate Office"
  }
]

export function Testimonials() {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Client Success Stories
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by architects, contractors, and homeowners across India. 
            Here's what they say about their experience with MarmoMart.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="h-8 w-8 text-primary/20" />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>

                {/* Project Tag */}
                <Badge variant="outline" className="mb-4 text-xs">
                  {testimonial.project}
                </Badge>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-card border rounded-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-2xl font-bold text-primary">4.9/5</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Reviews</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">1000+</p>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}