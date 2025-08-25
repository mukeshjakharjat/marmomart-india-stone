import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { X, Filter } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface Category {
  id: string
  name: string
  slug: string
}

interface ProductFiltersProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
  sortBy: string
  onSortChange: (sort: string) => void
  className?: string
}

export function ProductFilters({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange,
  className 
}: ProductFiltersProps) {
  const isMobile = useIsMobile()
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  
  const brands = [
    "Kajaria", "Somany", "Johnson", "Nitco", 
    "RAK Ceramics", "Simpolo", "Bell Ceramics"
  ]
  
  const materials = [
    "Italian Marble", "Indian Marble", "Ceramic", 
    "Porcelain", "Vitrified", "Granite", "Quartz"
  ]
  
  const finishes = [
    "Polished", "Glossy", "Matt", "Carrera", 
    "Sugar", "Lapatto", "Rustic"
  ]

  const clearAllFilters = () => {
    onCategoryChange(null)
    setPriceRange([0, 10000])
    setSelectedBrands([])
    setSelectedMaterials([])
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material)
        : [...prev, material]
    )
  }

  const hasActiveFilters = selectedCategory || selectedBrands.length > 0 || selectedMaterials.length > 0

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort By */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Sort By</h4>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="price_per_sqft">Price (Low to High)</SelectItem>
            <SelectItem value="price_per_sqft desc">Price (High to Low)</SelectItem>
            <SelectItem value="created_at desc">Newest First</SelectItem>
            <SelectItem value="is_featured desc">Featured First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Categories</h4>
        <div className="space-y-2">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            className="w-full justify-start h-9"
            onClick={() => onCategoryChange(null)}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className="w-full justify-start h-9"
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Advanced Filters */}
      <Accordion type="single" collapsible defaultValue="brands" className="w-full">
        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            Price Range (₹)
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={10000}
              min={0}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brands">
          <AccordionTrigger className="text-sm font-medium">
            Brands
            {selectedBrands.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedBrands.length}
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="rounded border-border"
                  />
                  <label 
                    htmlFor={`brand-${brand}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Materials */}
        <AccordionItem value="materials">
          <AccordionTrigger className="text-sm font-medium">
            Materials
            {selectedMaterials.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedMaterials.length}
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {materials.map((material) => (
                <div key={material} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`material-${material}`}
                    checked={selectedMaterials.includes(material)}
                    onChange={() => toggleMaterial(material)}
                    className="rounded border-border"
                  />
                  <label 
                    htmlFor={`material-${material}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {material}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Finish */}
        <AccordionItem value="finish">
          <AccordionTrigger className="text-sm font-medium">
            Finish Type
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {finishes.map((finish) => (
                <div key={finish} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`finish-${finish}`}
                    className="rounded border-border"
                  />
                  <label 
                    htmlFor={`finish-${finish}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {finish}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Active Filters */}
      {hasActiveFilters && (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <Badge variant="secondary" className="gap-1">
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => onCategoryChange(null)}
                  />
                </Badge>
              )}
              {selectedBrands.map((brand) => (
                <Badge key={brand} variant="secondary" className="gap-1">
                  {brand}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => toggleBrand(brand)}
                  />
                </Badge>
              ))}
              {selectedMaterials.map((material) => (
                <Badge key={material} variant="secondary" className="gap-1">
                  {material}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => toggleMaterial(material)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full mb-4">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {(selectedCategory ? 1 : 0) + selectedBrands.length + selectedMaterials.length}
              </Badge>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader className="pb-4">
            <div className="flex items-center justify-between">
              <DrawerTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </DrawerTitle>
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
              )}
            </div>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto">
            <FilterContent />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Card className={`h-fit sticky top-24 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <FilterContent />
      </CardContent>
    </Card>
  )
}