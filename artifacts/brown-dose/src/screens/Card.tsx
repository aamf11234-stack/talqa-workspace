import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Wallet, Gift, Percent, Coffee } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';

export function CardScreen() {
  const { points } = useAppContext();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-background pt-12 px-5 pb-32 overflow-y-auto hide-scrollbar"
    >
      <h1 className="text-2xl font-bold mb-6">بطاقتي</h1>

      {/* Digital Card */}
      <div className="relative w-full aspect-[1.6] rounded-3xl overflow-hidden shadow-2xl mb-8 p-6 flex flex-col justify-between"
           style={{
             background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
             border: '1px solid hsl(var(--card-border))'
           }}>
        
        {/* Decorative noise/pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}>
        </div>
        
        {/* QR Code Watermark (decorative) */}
        <QrCode className="absolute -bottom-10 -left-10 w-48 h-48 text-white/[0.03] rotate-12 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <div className="font-serif text-lg tracking-widest text-secondary font-bold mb-1 opacity-90">BROWN DOSE</div>
            <div className="text-[10px] text-muted-foreground tracking-widest uppercase">SPECIALTY COFFEE</div>
          </div>
          <div className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-bold border border-secondary/20">
            Gold Member
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-end">
          <div>
            <div className="text-xs text-muted-foreground mb-1">الاسم</div>
            <div className="text-xl font-bold">سلطان الغامدي</div>
            <div className="text-[10px] text-muted-foreground mt-1">عضو منذ يناير ٢٠٢٥</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-secondary mb-1">الرصيد</div>
            <div className="text-3xl font-bold font-sans tracking-tighter">{points}</div>
          </div>
        </div>
      </div>

      <button className="w-full bg-black border border-white/10 rounded-2xl p-4 flex items-center justify-center gap-3 text-white font-medium mb-8">
        <Wallet size={20} />
        إضافة لـ Apple Wallet
      </button>

      {/* Rewards Grid */}
      <h3 className="text-lg font-bold mb-4">المكافآت المتاحة</h3>
      <div className="flex flex-col gap-3">
        <div className="bg-card rounded-2xl p-4 flex items-center gap-4 border border-card-border opacity-50 grayscale">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Coffee size={20} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm">مشروب مجاني</div>
            <div className="text-xs text-muted-foreground">يستخدم ٢٠٠ نقطة</div>
          </div>
          <button disabled className="text-xs bg-muted text-muted-foreground px-4 py-2 rounded-full font-medium">
            مستخدم
          </button>
        </div>

        <div className="bg-card rounded-2xl p-4 flex items-center gap-4 border border-card-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 bg-secondary h-full" />
          <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
            <Percent size={20} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm text-secondary">خصم ٣٠٪</div>
            <div className="text-xs text-muted-foreground">متاح الآن • ٤٠٠ نقطة</div>
          </div>
          <button className="text-xs bg-secondary text-background px-4 py-2 rounded-full font-bold">
            استبدال
          </button>
        </div>

        <div className="bg-card rounded-2xl p-4 flex items-center gap-4 border border-card-border">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Gift size={20} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm">هدية مميزة</div>
            <div className="text-xs text-muted-foreground">مقفل • ٥٠٠ نقطة</div>
          </div>
          <div className="w-full max-w-[60px] h-1.5 bg-muted rounded-full overflow-hidden mt-1">
            <div className="bg-primary h-full rounded-full" style={{ width: `${(points/500)*100}%` }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
