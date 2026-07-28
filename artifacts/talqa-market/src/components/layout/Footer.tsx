import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 text-center md:text-right">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black text-xl leading-none">
                ت
              </div>
              <span className="font-bold text-xl tracking-tight text-gradient">
                تلقا ماركت
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mx-auto md:mx-0">
              المنصة العربية الأقوى لبناء وإطلاق المشاريع الرقمية في جميع القطاعات. ليس فقط للمتاجر، بل لكل من يريد التميز.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">الرئيسية</Link></li>
              <li><Link href="/templates" className="text-muted-foreground hover:text-primary transition-colors">القوالب</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">الأسعار</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4">تواصل معنا</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://wa.me/966551378531" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-whatsapp"
                >
                  واتساب الدعم
                </a>
              </li>
              <li className="text-muted-foreground">الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} تلقا ماركت. جميع الحقوق محفوظة.</p>
          <div className="mt-4 md:mt-0 space-x-4 space-x-reverse">
            <span className="opacity-50 hover:opacity-100 cursor-pointer">الشروط والأحكام</span>
            <span className="opacity-50 hover:opacity-100 cursor-pointer">سياسة الخصوصية</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
