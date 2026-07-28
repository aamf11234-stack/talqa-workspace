import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "الرئيسية" },
    { href: "/templates", label: "القوالب" },
    { href: "/pricing", label: "الأسعار" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 h-[68px] transition-all duration-300 flex items-center ${
        scrolled 
          ? "bg-[rgba(250,248,245,0.92)] backdrop-blur-[24px] border-b border-[#EAE3D2]" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-[900] text-xl text-text-main tracking-tight">
            تلقا ماركت
          </span>
          <span className="bg-[#EAE3D2] text-[#5C524E] rounded-full px-2 py-0.5 text-xs font-medium">
            للقوالب
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors duration-200 ${
                location === link.href ? "text-[#1A1208]" : "text-[#5C524E] hover:text-[#1A1208]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <a
            href="https://wa.me/966551378531"
            target="_blank"
            rel="noreferrer"
            className="bg-[#2C221E] text-[#FAF8F5] font-semibold rounded-full px-5 py-2.5 hover:bg-[#3D2E28] transition-colors"
          >
            ابدأ مجاناً
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#1A1208] p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[68px] left-0 w-full bg-[rgba(250,248,245,0.98)] backdrop-blur-xl border-b border-[#EAE3D2] shadow-lg md:hidden flex flex-col p-6 gap-6"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  location === link.href ? "text-[#1A1208]" : "text-[#5C524E]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/966551378531"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="bg-[#2C221E] text-[#FAF8F5] text-center font-semibold rounded-full px-5 py-3 hover:bg-[#3D2E28] transition-colors w-full"
            >
              ابدأ مجاناً
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
