import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Code2, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Database, 
  Smartphone,
  ExternalLink,
  ChevronLeft,
  Copy,
  Check,
  Play
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const CodeBlock = ({ code, language, title }: { code: string, language: string, title?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-[#0a0a0a] shadow-2xl font-mono text-sm mt-8 relative group">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-[#111] text-muted-foreground text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          {title && <span className="ml-4 opacity-70">{title}</span>}
        </div>
        <button 
          onClick={handleCopy}
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          <span className="sr-only">Copy code</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto" dir="ltr">
        <pre className="text-left text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default function App() {
  const codeSnippet = `// المصادقة واستدعاء بيانات المريض
import { TelqaClient } from '@telqa/node-sdk';

const telqa = new TelqaClient({
  apiKey: process.env.TELQA_API_KEY,
  environment: 'production'
});

async function getPatientRecord(patientId) {
  try {
    const patient = await telqa.patients.retrieve(patientId, {
      include: ['medical_history', 'active_prescriptions']
    });
    
    console.log(\`Patient: \${patient.firstName} \${patient.lastName}\`);
    return patient;
  } catch (error) {
    console.error('API Error:', error.message);
  }
}`;

  const jsonSnippet = `{
  "id": "pat_8x92nd",
  "object": "patient",
  "first_name": "أحمد",
  "last_name": "العتيبي",
  "dob": "1985-04-12",
  "blood_type": "O+",
  "active_prescriptions": [
    {
      "id": "rx_9921",
      "medication": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Twice daily"
    }
  ]
}`;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary overflow-hidden">
      {/* Glow effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#00B4D8]/10 blur-[100px] pointer-events-none" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Activity className="text-primary" />
            <span>تلقا<span className="text-muted-foreground font-normal"> / للمطورين</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#docs" className="hover:text-white transition-colors">التوثيق</a>
            <a href="#api" className="hover:text-white transition-colors">API Reference</a>
            <a href="#sdk" className="hover:text-white transition-colors">SDKs</a>
            <a 
              href="/clinic-demo/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              المنصة الحية
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col lg:flex-row items-center gap-16 min-h-[70vh]"
          >
            <div className="flex-1 space-y-8">
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                v2.4 API متاح الآن
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                ابنِ لمستقبل<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#00B4D8] to-primary">الرعاية الصحية</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                منظومة تقنية متكاملة للعيادات والمراكز الطبية. وفّر أسابيع من التطوير باستخدام واجهات برمجية (APIs) مصممة خصيصاً للقطاع الصحي.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 pt-4">
                <a 
                  href="/clinic-demo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 h-14 px-8 font-bold text-black bg-white hover:bg-gray-100 rounded-lg overflow-hidden transition-colors"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    تجربة الديمو الحقيقي
                    <Play size={18} className="fill-current" />
                  </span>
                </a>
                <a href="#docs" className="inline-flex items-center justify-center gap-2 h-14 px-8 font-medium text-white border border-border hover:bg-white/5 rounded-lg transition-colors">
                  قراءة التوثيق
                  <Terminal size={18} />
                </a>
              </motion.div>
            </div>
            
            <motion.div variants={fadeIn} className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl rounded-full opacity-50" />
              <CodeBlock 
                code={codeSnippet} 
                language="typescript" 
                title="retrieve-patient.ts"
              />
            </motion.div>
          </motion.section>

          {/* Capabilities Grid */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="py-32"
          >
            <div className="text-center space-y-4 mb-16">
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold">بنية تحتية طبية جاهزة</motion.h2>
              <motion.p variants={fadeIn} className="text-muted-foreground max-w-2xl mx-auto">
                كل ما تحتاجه لبناء تجربة صحية رقمية متكاملة، من حجز المواعيد إلى السجلات الطبية.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: "Webhooks & Realtime", desc: "استقبل تحديثات فورية لحالة المواعيد، نتائج التحاليل، والمدفوعات." },
                { icon: ShieldCheck, title: "أمان متوافق مع HIPAA", desc: "تشفير كامل للبيانات (E2EE) وضوابط وصول دقيقة لحماية خصوصية المرضى." },
                { icon: Smartphone, title: "تكامل Apple Health", desc: "مزامنة بيانات المؤشرات الحيوية مباشرة من أجهزة المرضى." },
                { icon: Database, title: "سجلات طبية موحدة", desc: "نموذج بيانات طبي شامل يدعم FHIR و HL7 للتشغيل البيني." },
                { icon: Code2, title: "SDKs شاملة", desc: "مكتبات برمجية لـ Node.js, Python, iOS, و Android لتسريع التطوير." },
                { icon: Activity, title: "بيئة تجريبية (Sandbox)", desc: "اختبر تكاملاتك بأمان باستخدام بيانات مرضى وهمية وتصريح اختبار." },
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeIn}
                  className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* API Reference Preview */}
          <motion.section 
            id="api"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="py-24 border-t border-border"
          >
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="flex-1 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">RESTful API Endpoints</h2>
                  <p className="text-muted-foreground">واجهات برمجية نظيفة وموثقة بالكامل تتبع معايير REST لتسهيل التكامل.</p>
                </div>
                
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-[#111]">
                    <div className="flex items-center gap-4">
                      <span className="text-green-400 font-bold">GET</span>
                      <span className="text-gray-300">/v1/patients/:id</span>
                    </div>
                    <span className="text-muted-foreground hidden sm:block">استرجاع بيانات المريض</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-[#111]">
                    <div className="flex items-center gap-4">
                      <span className="text-blue-400 font-bold">POST</span>
                      <span className="text-gray-300">/v1/appointments</span>
                    </div>
                    <span className="text-muted-foreground hidden sm:block">إنشاء موعد جديد</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-[#111]">
                    <div className="flex items-center gap-4">
                      <span className="text-yellow-400 font-bold">PATCH</span>
                      <span className="text-gray-300">/v1/prescriptions/:id</span>
                    </div>
                    <span className="text-muted-foreground hidden sm:block">تحديث وصفة طبية</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-[#111]">
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-bold">WSS</span>
                      <span className="text-gray-300">/v1/realtime</span>
                    </div>
                    <span className="text-muted-foreground hidden sm:block">اتصال WebSocket</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a href="#" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
                    استعراض التوثيق الكامل 
                    <ChevronLeft size={16} />
                  </a>
                </div>
              </div>
              
              <div className="flex-1">
                <CodeBlock 
                  code={jsonSnippet} 
                  language="json" 
                  title="Response: 200 OK"
                />
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="py-32"
          >
            <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-primary/5 p-12 md:p-20 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
              <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">جاهز للبدء؟</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10">
                استكشف المنصة الحية لترى كيف تعمل المنظومة، أو ابدأ بكتابة الكود فوراً باستخدام بيئة المطورين.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <a 
                  href="/clinic-demo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 font-bold text-black bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-[0_0_40px_rgba(0,180,216,0.3)]"
                >
                  افتح ديمو العيادات
                  <ExternalLink size={18} />
                </a>
                <a 
                  href="#"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 font-bold text-white border border-border hover:bg-white/5 rounded-xl transition-colors"
                >
                  إنشاء مفتاح API
                </a>
              </div>
            </div>
          </motion.section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-[#050505] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Activity className="text-primary" />
            <span>تلقا</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Status</a>
            <a href="#" className="hover:text-white transition-colors">Postman Collection</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <div className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} Telqa Healthcare API
          </div>
        </div>
      </footer>
    </div>
  );
}
