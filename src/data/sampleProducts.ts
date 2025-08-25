export interface ProductVariant {
  id: string
  size: string
  finish: string
  thickness: string
  price_per_sqft: number
  price_per_piece?: number
  stock_quantity: number
}

export interface SampleProduct {
  id: string
  name: string
  description: string
  category: string
  brand: string
  material: string
  images: string[]
  variants: ProductVariant[]
  features: string[]
  specifications: Record<string, string>
  is_featured: boolean
}

export const sampleProducts: SampleProduct[] = [
  {
    id: "carrara-white-marble",
    name: "Carrara White Italian Marble",
    description: "Premium Italian Carrara marble with distinctive veining. Perfect for luxurious interiors, countertops, and flooring. Known for its pristine white color with subtle gray veining.",
    category: "Italian Marble",
    brand: "MarmoMart Premium",
    material: "Italian Marble",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      {
        id: "carrara-12x12-polished",
        size: "12\" x 12\"",
        finish: "Polished",
        thickness: "18mm",
        price_per_sqft: 350,
        price_per_piece: 42,
        stock_quantity: 500
      },
      {
        id: "carrara-18x18-polished",
        size: "18\" x 18\"",
        finish: "Polished",
        thickness: "18mm",
        price_per_sqft: 380,
        price_per_piece: 86,
        stock_quantity: 300
      },
      {
        id: "carrara-24x24-polished",
        size: "24\" x 24\"",
        finish: "Polished",
        thickness: "20mm",
        price_per_sqft: 420,
        price_per_piece: 168,
        stock_quantity: 200
      },
      {
        id: "carrara-slab-polished",
        size: "Slab (8' x 4')",
        finish: "Polished",
        thickness: "18mm",
        price_per_sqft: 450,
        stock_quantity: 50
      },
      {
        id: "carrara-12x12-honed",
        size: "12\" x 12\"",
        finish: "Honed",
        thickness: "18mm",
        price_per_sqft: 320,
        price_per_piece: 38,
        stock_quantity: 400
      }
    ],
    features: [
      "Premium Italian Origin",
      "Natural Veining Pattern",
      "Heat Resistant",
      "Easy to Clean",
      "Timeless Elegance",
      "Versatile Application"
    ],
    specifications: {
      "Origin": "Carrara, Italy",
      "Color": "White with Gray Veining",
      "Absorption": "< 0.5%",
      "Compressive Strength": "110-140 MPa",
      "Flexural Strength": "10-15 MPa",
      "Recommended Use": "Interior Flooring, Walls, Countertops"
    },
    is_featured: true
  },
  {
    id: "rajnagar-pink-marble",
    name: "Rajnagar Pink Indian Marble",
    description: "Beautiful pink marble from Rajasthan with distinctive patterns. Ideal for traditional and contemporary designs. Known for its warm pink hue and natural beauty.",
    category: "Indian Marble",
    brand: "MarmoMart Select",
    material: "Indian Marble",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      {
        id: "rajnagar-12x12-polished",
        size: "12\" x 12\"",
        finish: "Polished",
        thickness: "18mm",
        price_per_sqft: 180,
        price_per_piece: 22,
        stock_quantity: 800
      },
      {
        id: "rajnagar-18x18-polished",
        size: "18\" x 18\"",
        finish: "Polished",
        thickness: "18mm",
        price_per_sqft: 195,
        price_per_piece: 44,
        stock_quantity: 600
      },
      {
        id: "rajnagar-24x24-polished",
        size: "24\" x 24\"",
        finish: "Polished",
        thickness: "20mm",
        price_per_sqft: 220,
        price_per_piece: 88,
        stock_quantity: 400
      },
      {
        id: "rajnagar-12x12-brushed",
        size: "12\" x 12\"",
        finish: "Brushed",
        thickness: "18mm",
        price_per_sqft: 165,
        price_per_piece: 20,
        stock_quantity: 500
      },
      {
        id: "rajnagar-slab-polished",
        size: "Slab (7' x 4')",
        finish: "Polished",
        thickness: "18mm",
        price_per_sqft: 240,
        stock_quantity: 80
      }
    ],
    features: [
      "Rajasthan Origin",
      "Unique Pink Color",
      "Natural Patterns",
      "Durable and Long-lasting",
      "Cost Effective",
      "Easy Maintenance"
    ],
    specifications: {
      "Origin": "Rajnagar, Rajasthan",
      "Color": "Pink with Natural Patterns",
      "Absorption": "< 1.0%",
      "Compressive Strength": "90-120 MPa",
      "Flexural Strength": "8-12 MPa",
      "Recommended Use": "Interior Flooring, Walls, Decorative Elements"
    },
    is_featured: true
  },
  {
    id: "black-galaxy-granite",
    name: "Black Galaxy Granite",
    description: "Premium black granite with golden speckles resembling a starry night sky. Extremely durable and perfect for high-traffic areas and kitchen countertops.",
    category: "Granite",
    brand: "MarmoMart Premium",
    material: "Granite",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      {
        id: "galaxy-12x12-polished",
        size: "12\" x 12\"",
        finish: "Polished",
        thickness: "20mm",
        price_per_sqft: 280,
        price_per_piece: 34,
        stock_quantity: 600
      },
      {
        id: "galaxy-18x18-polished",
        size: "18\" x 18\"",
        finish: "Polished",
        thickness: "20mm",
        price_per_sqft: 300,
        price_per_piece: 68,
        stock_quantity: 400
      },
      {
        id: "galaxy-24x24-polished",
        size: "24\" x 24\"",
        finish: "Polished",
        thickness: "20mm",
        price_per_sqft: 320,
        price_per_piece: 128,
        stock_quantity: 250
      },
      {
        id: "galaxy-slab-polished",
        size: "Slab (9' x 5')",
        finish: "Polished",
        thickness: "20mm",
        price_per_sqft: 350,
        stock_quantity: 60
      },
      {
        id: "galaxy-12x12-flamed",
        size: "12\" x 12\"",
        finish: "Flamed",
        thickness: "20mm",
        price_per_sqft: 260,
        price_per_piece: 31,
        stock_quantity: 300
      }
    ],
    features: [
      "Unique Galaxy Pattern",
      "Extremely Durable",
      "Scratch Resistant",
      "Heat Resistant",
      "Low Maintenance",
      "Premium Quality"
    ],
    specifications: {
      "Origin": "Andhra Pradesh, India",
      "Color": "Black with Golden Speckles",
      "Absorption": "< 0.4%",
      "Compressive Strength": "180-220 MPa",
      "Flexural Strength": "15-20 MPa",
      "Recommended Use": "Kitchen Countertops, Flooring, Exterior Cladding"
    },
    is_featured: true
  },
  {
    id: "vitrified-glossy-tile",
    name: "Premium Glossy Vitrified Tiles",
    description: "High-quality vitrified tiles with mirror-like glossy finish. Perfect for modern interiors with superior durability and stain resistance.",
    category: "Vitrified Tiles",
    brand: "Kajaria",
    material: "Vitrified",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      {
        id: "vitrified-24x24-glossy-white",
        size: "24\" x 24\"",
        finish: "Glossy",
        thickness: "10mm",
        price_per_sqft: 85,
        price_per_piece: 34,
        stock_quantity: 1000
      },
      {
        id: "vitrified-32x32-glossy-white",
        size: "32\" x 32\"",
        finish: "Glossy",
        thickness: "10mm",
        price_per_sqft: 95,
        price_per_piece: 67,
        stock_quantity: 800
      },
      {
        id: "vitrified-24x24-glossy-beige",
        size: "24\" x 24\"",
        finish: "Glossy",
        thickness: "10mm",
        price_per_sqft: 85,
        price_per_piece: 34,
        stock_quantity: 900
      },
      {
        id: "vitrified-24x24-glossy-gray",
        size: "24\" x 24\"",
        finish: "Glossy",
        thickness: "10mm",
        price_per_sqft: 90,
        price_per_piece: 36,
        stock_quantity: 750
      },
      {
        id: "vitrified-48x24-glossy-white",
        size: "48\" x 24\"",
        finish: "Glossy",
        thickness: "12mm",
        price_per_sqft: 120,
        price_per_piece: 96,
        stock_quantity: 400
      }
    ],
    features: [
      "Mirror-like Glossy Finish",
      "Zero Water Absorption",
      "Stain Resistant",
      "Easy to Clean",
      "Uniform Color",
      "Affordable Luxury"
    ],
    specifications: {
      "Origin": "Made in India",
      "Water Absorption": "< 0.08%",
      "Breaking Strength": "> 1800N",
      "Slip Resistance": "R9 (Indoor Use)",
      "Thermal Shock": "Resistant",
      "Recommended Use": "Interior Flooring, Walls"
    },
    is_featured: false
  },
  {
    id: "ceramic-wall-tile",
    name: "Designer Ceramic Wall Tiles",
    description: "Beautiful ceramic tiles with contemporary designs. Perfect for bathroom and kitchen walls with excellent water resistance and easy maintenance.",
    category: "Ceramic Tiles",
    brand: "Somany",
    material: "Ceramic",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      {
        id: "ceramic-8x12-glossy-white",
        size: "8\" x 12\"",
        finish: "Glossy",
        thickness: "7mm",
        price_per_sqft: 45,
        price_per_piece: 3,
        stock_quantity: 2000
      },
      {
        id: "ceramic-12x18-glossy-white",
        size: "12\" x 18\"",
        finish: "Glossy",
        thickness: "8mm",
        price_per_sqft: 55,
        price_per_piece: 8,
        stock_quantity: 1500
      },
      {
        id: "ceramic-8x12-matt-beige",
        size: "8\" x 12\"",
        finish: "Matt",
        thickness: "7mm",
        price_per_sqft: 42,
        price_per_piece: 2.8,
        stock_quantity: 1800
      },
      {
        id: "ceramic-12x18-textured-gray",
        size: "12\" x 18\"",
        finish: "Textured",
        thickness: "8mm",
        price_per_sqft: 60,
        price_per_piece: 9,
        stock_quantity: 1200
      },
      {
        id: "ceramic-6x12-subway-white",
        size: "6\" x 12\"",
        finish: "Glossy",
        thickness: "7mm",
        price_per_sqft: 48,
        price_per_piece: 2.4,
        stock_quantity: 2500
      }
    ],
    features: [
      "Water Resistant",
      "Easy Installation",
      "Contemporary Designs",
      "Color Consistency",
      "Budget Friendly",
      "Low Maintenance"
    ],
    specifications: {
      "Origin": "Made in India",
      "Water Absorption": "10-20%",
      "Surface": "Glazed",
      "Thermal Expansion": "6-8 x 10^-6/°C",
      "Chemical Resistance": "Good",
      "Recommended Use": "Interior Walls, Bathrooms, Kitchens"
    },
    is_featured: false
  }
]