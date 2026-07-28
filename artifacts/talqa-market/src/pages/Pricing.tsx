import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="pt-24 pb-16 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black mb-6">استثمار ذكي لمشروعك</h1>
          <p className="text-xl text-muted-foreground mb-10">
            باقات واضحة ومدروسة. بدون عمولات مخفية، وبدون رسوم تأسيس. اختر ما يناسب حجم أعمالك.
          </p>
          
          <div className="flex items-center justify-center gap-4 bg-secondary p-2 rounded-full w-max mx-auto border border-border">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                !isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="toggle-monthly"
            >
              شهري
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="toggle-annual"
            >
              سنوي
              <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full">وفر 20%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* Basic Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-border bg-card">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl font-bold text-muted-foreground mb-2">الأساسية</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black">{isAnnual ? Math.floor(99 * 12 * 0.8) : 99}</span>
                  <span className="text-muted-foreground font-medium">ريال / {isAnnual ? "سنوياً" : "شهرياً"}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">مثالية للمشاريع الناشئة التي تحتاج تواجداً رقمياً سريعاً واحترافياً.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "اختيار قالب واحد من المكتبة",
                  "تصميم متجاوب بالكامل",
                  "تصل إلى 5 صفحات تعريفية",
                  "زر اتصال مباشر عبر الواتساب",
                  "استضافة مجانية عالية الأداء",
                  "شهادة أمان SSL مجانية"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-8">
                <Button className="w-full h-12 text-lg font-bold gap-2" variant="secondary" asChild>
                  <a href={`https://wa.me/966551378531?text=أريد الاشتراك في الباقة الأساسية (${isAnnual ? 'سنوي' : 'شهري'})`} target="_blank" rel="noreferrer" data-testid="basic-plan-cta">
                    <MessageCircle className="w-5 h-5" /> اشترك الآن
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-primary bg-background relative shadow-2xl scale-100 md:scale-105 z-10">
              <div className="absolute top-0 right-0 w-full h-2 bg-primary" />
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-md">
                الأكثر طلباً
              </div>
              <CardHeader className="pb-8 pt-10">
                <CardTitle className="text-2xl font-bold text-primary mb-2">البروفيشنال</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-foreground">{isAnnual ? Math.floor(299 * 12 * 0.8) : 299}</span>
                  <span className="text-muted-foreground font-medium">ريال / {isAnnual ? "سنوياً" : "شهرياً"}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">الخيار المتكامل للشركات والمتاجر التي تبحث عن أقصى إمكانيات النمو.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "وصول كامل لجميع القوالب في كل القطاعات",
                  "دعم الذكاء الاصطناعي (AI Builder)",
                  "صفحات لا محدودة",
                  "دومين مجاني (.com / .net)",
                  "تفعيل بوابات الدفع (سدد، تمارا، تابي)",
                  "نظام حجوزات ومواعيد متقدم",
                  "دعم فني بأولوية قصوى 24/7"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-0.5">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-8">
                <Button className="w-full h-14 text-lg font-bold gap-2" asChild>
                  <a href={`https://wa.me/966551378531?text=أريد الاشتراك في باقة البروفيشنال (${isAnnual ? 'سنوي' : 'شهري'})`} target="_blank" rel="noreferrer" data-testid="pro-plan-cta">
                    <MessageCircle className="w-5 h-5" /> ابدأ مشروعك الآن
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

        </div>
      </div>

      {/* FAQ */}
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">الأسئلة الشائعة</h2>
        <div className="space-y-6">
          {[
            { q: "هل أحتاج إلى خبرة برمجية لإدارة المنصة؟", a: "إطلاقاً! المنصة مصممة لتكون سهلة الاستخدام بواجهة عربية بالكامل. يمكنك تعديل المحتوى والصور وإدارة طلباتك بنقرات بسيطة." },
            { q: "هل يمكنني ربط دومين خاص بي؟", a: "نعم، يمكنك ربط دومينك الخاص في جميع الباقات، وفي باقة البروفيشنال نقدم لك دومين مجاني للسنة الأولى." },
            { q: "هل تدعمون بوابات الدفع المحلية؟", a: "نعم، ندعم مدى، فيزا، ماستركارد، Apple Pay، إضافة إلى خدمات التقسيط مثل تمارا وتابي في الباقات المتقدمة." },
            { q: "كيف أحصل على الدعم الفني؟", a: "يتوفر الدعم الفني عبر الواتساب والبريد الإلكتروني. مشتركو باقة البروفيشنال يحصلون على رد أسرع وأولوية في معالجة الطلبات." },
          ].map((faq, i) => (
            <div key={i} className="bg-card p-6 rounded-xl border border-border">
              <h3 className="font-bold text-lg mb-2 text-foreground">{faq.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
