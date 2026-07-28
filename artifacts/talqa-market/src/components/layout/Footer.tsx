import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#F5F2EB] border-t border-[#EAE3D2] py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        <Link href="/" className="flex flex-col items-center gap-2 mb-8">
          <span className="font-[900] text-2xl text-[#1A1208] tracking-tight">
            تلقا ماركت
          </span>
          <span className="text-[#5C524E] text-sm">
            منصة القوالب العربية الأولى
          </span>
        </Link>

        <nav className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
          <Link href="/" className="text-[#5C524E] hover:text-[#1A1208] font-medium transition-colors">
            الرئيسية
          </Link>
          <Link href="/templates" className="text-[#5C524E] hover:text-[#1A1208] font-medium transition-colors">
            القوالب
          </Link>
          <Link href="/pricing" className="text-[#5C524E] hover:text-[#1A1208] font-medium transition-colors">
            الأسعار
          </Link>
          <a href="https://wa.me/966551378531" target="_blank" rel="noreferrer" className="text-[#5C524E] hover:text-[#1A1208] font-medium transition-colors">
            تواصل معنا
          </a>
        </nav>

        <div className="w-full h-px bg-[#EAE3D2] mb-8 max-w-sm mx-auto" />

        <p className="text-[#9C8F85] text-sm">
          © ٢٠٢٦ تلقا ماركت — جميع الحقوق محفوظة
        </p>

      </div>
    </footer>
  );
}
