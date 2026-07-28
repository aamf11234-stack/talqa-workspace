import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { templates, categoriesRecord, Category } from "@/data/templates";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Eye, MessageCircle } from "lucide-react";

export default function Templates() {
  const [location] = useLocation();
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  // Handle URL query params manually since wouter doesn't have useSearchParams built-in
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryParam = searchParams.get("category") as Category;
    if (categoryParam && Object.keys(categoriesRecord).includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [location]);

  const filteredTemplates = useMemo(() => {
    if (activeCategory === "all") return templates;
    return templates.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-secondary/50 border-b border-border py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black mb-6">مكتبة القوالب</h1>
          <p className="text-lg text-muted-foreground">
            اكتشف مجموعة متكاملة من التصاميم الجاهزة المبنية لخدمة أهدافك التجارية بأعلى معايير الجودة وتجربة المستخدم.
          </p>
        </div>
      </div>

      {/* Filter Bar (Sticky) */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <button
              onClick={() => setActiveCategory("all")}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === "all" 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
              data-testid="filter-all"
            >
              الكل
            </button>
            {Object.entries(categoriesRecord).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key as Category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === key 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                data-testid={`filter-${key}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col overflow-hidden border-border hover:border-primary/50 transition-colors group">
                  {/* Image Placeholder */}
                  <div 
                    className="h-48 w-full relative flex items-center justify-center overflow-hidden"
                    style={{ background: template.imageGradient }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <span className="text-white/80 font-black text-2xl tracking-wider opacity-50 rotate-[-10deg] scale-150">
                      {template.name}
                    </span>
                    <Badge className="absolute top-4 right-4 bg-background/80 backdrop-blur text-foreground hover:bg-background/90 border-none">
                      {categoriesRecord[template.category]}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{template.name}</h3>
                      <div className="text-left">
                        <span className="text-lg font-black text-primary">{template.price}</span>
                        <span className="text-xs text-muted-foreground block">ريال / شهر</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {template.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pb-6 flex-grow">
                    <ul className="space-y-2">
                      {template.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="pt-0 flex gap-3 border-t border-border mt-auto p-4 bg-secondary/20">
                    <Button variant="default" className="flex-1 gap-2 font-bold" asChild>
                      <a href={`https://wa.me/966551378531?text=أريد طلب قالب: ${template.name}`} target="_blank" rel="noreferrer" data-testid={`order-${template.id}`}>
                        <MessageCircle className="w-4 h-4" /> اطلب الآن
                      </a>
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2" asChild>
                      <a href={template.demoUrl} onClick={(e) => e.preventDefault()} data-testid={`demo-${template.id}`}>
                        <Eye className="w-4 h-4" /> معاينة
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredTemplates.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            لا توجد قوالب متوفرة في هذا التصنيف حالياً.
          </div>
        )}
      </div>
    </div>
  );
}
