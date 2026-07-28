import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Store, 
  Stethoscope, 
  UtensilsCrossed, 
  Coffee, 
  Briefcase, 
  Building2, 
  HeartHandshake, 
  UserCircle 
} from "lucide-react";
import { categoriesRecord } from "@/data/templates";

const categoriesIcons: Record<string, React.ElementType> = {
  store: Store,
  clinic: Stethoscope,
  restaurant: UtensilsCrossed,
  cafe: Coffee,
  office: Briefcase,
  realestate: Building2,
  loyalty: HeartHandshake,
  personal: UserCircle
};

export default function Home() {
  const [aiQuery, setAiQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAiQuery("");
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            الجيل الجديد من منصات الأعمال
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-foreground">
            أطلق مشروعك اليوم <br />
            <span className="text-gradient">لكل القطاعات، ليس فقط المتاجر</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            المنصة العربية الأولى التي تمنحك الحرية لبناء متجر، عيادة، مطعم، أو مكتبك الخاص بضغطة زر. لا تكتفِ بمنصات المتاجر التقليدية.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 font-bold" asChild>
              <a href="https://wa.me/966551378531" target="_blank" rel="noreferrer" data-testid="hero-cta-whatsapp">
                ابدأ مشروعك الآن مجاناً
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8" asChild>
              <Link href="/templates" data-testid="hero-cta-templates">
                تصفح القوالب
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 bg-card border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ما الذي يجعلنا مختلفين؟</h2>
            <p className="text-muted-foreground text-lg">منصات التجارة الإلكترونية صُممت لبيع المنتجات المادية. نحن صممنا منصة تخدم طبيعة عملك، أياً كانت.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border bg-background relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-muted" />
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-muted-foreground mb-6 flex items-center gap-2">
                  <XIcon className="text-muted-foreground/50 w-6 h-6" /> منصات المتاجر التقليدية (سلة / شوبيفاي)
                </h3>
                <ul className="space-y-4">
                  {[
                    "مصممة حصرياً للمنتجات المادية",
                    "قوالب متشابهة لا تناسب العيادات أو المطاعم",
                    "نظام الحجوزات أو المواعيد يتطلب إضافات مكلفة",
                    "تكاليف إضافية لكل تطبيق وميزة جديدة"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1 w-2 h-2 rounded-full bg-muted-foreground/30 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-primary/5 relative overflow-hidden shadow-[0_0_40px_-15px_rgba(234,179,8,0.3)]">
              <div className="absolute top-0 right-0 w-full h-1 bg-primary" />
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground font-black text-sm">ت</div> تلقا ماركت
                </h3>
                <ul className="space-y-4">
                  {[
                    "قوالب مبنية خصيصاً لكل قطاع (مطاعم، عيادات، عقار)",
                    "أنظمة حجوزات، قوائم طعام، واستشارات مدمجة مجاناً",
                    "تصاميم عربية أصيلة وليست معربة",
                    "تكلفة واحدة تشمل جميع الميزات الأساسية للقطاع"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground font-medium">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Verticals Showcase */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">قالب لكل قطاع أعمال</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">مهما كان نشاطك التجاري، ستجد لدينا البنية التحتية الجاهزة للانطلاق في دقائق.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Object.entries(categoriesRecord).map(([key, label], index) => {
              const Icon = categoriesIcons[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/templates?category=${key}`}>
                    <Card className="cursor-pointer group hover:border-primary/50 transition-colors h-full">
                      <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4 h-full min-h-[160px]">
                        <div className="p-4 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
                          <Icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="font-bold text-lg">{label}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Builder Teaser */}
      <section className="py-24 px-4 bg-secondary border-y border-border overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">ابنِ موقعك بالذكاء الاصطناعي</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            فقط أخبرنا عن مشروعك، وسيقوم الذكاء الاصطناعي بتوليد الموقع بالكامل مع النصوص والصور المتناسبة مع هويتك.
          </p>

          <Card className="bg-background border-border/50 shadow-2xl p-2 relative">
            <form onSubmit={handleGenerate} className="flex gap-2 relative z-10">
              <input 
                type="text" 
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="مثال: أريد إنشاء موقع لعيادة أسنان في الرياض باسم ابتسامة متألقة..."
                className="flex-1 bg-transparent border-none outline-none px-4 text-lg placeholder:text-muted-foreground/50 focus:ring-0"
                disabled={isGenerating}
                data-testid="ai-input"
              />
              <Button 
                type="submit" 
                disabled={!aiQuery.trim() || isGenerating}
                className="gap-2 px-6"
                data-testid="ai-submit"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                    جاري البناء...
                  </span>
                ) : (
                  "توليد السحر"
                )}
              </Button>
            </form>

            {isGenerating && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-20 flex items-center justify-center rounded-lg">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-primary font-bold animate-pulse">يقوم الذكاء الاصطناعي بصناعة موقعك...</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">كيف تعمل المنصة؟</h2>
            <p className="text-muted-foreground text-lg">ثلاث خطوات بسيطة تفصلك عن إطلاق مشروعك الرقمي بنجاح.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-border -z-10 -translate-y-1/2" />
            
            {[
              { num: "01", title: "اختر قالبك", desc: "تصفح القوالب المصممة خصيصاً لقطاعك واختر ما يناسب هويتك." },
              { num: "02", title: "خصّصه", desc: "أضف شعارك، ألوانك، وخدماتك باستخدام لوحة تحكم سهلة باللغة العربية." },
              { num: "03", title: "انطلق فوراً", desc: "استقبل عملائك، أدر حجوزاتك، وضاعف مبيعاتك عبر منصة مستقرة وآمنة." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-background">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl font-black text-primary border-[6px] border-background mb-6 shadow-sm">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 px-4 bg-card border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">باقات تناسب طموحك</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            أسعار شفافة بدون عمولات مخفية. ادفع اشتراكاً واحداً واحصل على كل ما تحتاجه للنجاح.
          </p>
          <div className="flex justify-center mb-10">
             <div className="inline-flex items-center p-1 bg-secondary rounded-lg border border-border">
                <div className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-bold shadow-sm">
                  الأساسية: 99 ريال / شهر
                </div>
                <div className="px-6 py-2 text-muted-foreground font-medium">
                  البروفيشنال: 299 ريال / شهر
                </div>
             </div>
          </div>
          <Button asChild size="lg" className="h-12 px-8">
            <Link href="/pricing" data-testid="home-pricing-link">عـرض تـفـاصيـل الـبـاقـات</Link>
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">مستعد للخطوة التالية؟</h2>
          <p className="text-xl mb-10 opacity-90">
            تحدث معنا مباشرة عبر الواتساب لاختيار الباقة الأنسب وطلب تجهيز منصتك.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="h-16 px-10 text-xl font-black rounded-full hover:scale-105 transition-transform shadow-xl"
            asChild
          >
            <a href="https://wa.me/966551378531" target="_blank" rel="noreferrer" data-testid="final-cta-whatsapp">
              تواصل معنا عبر الواتساب
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
