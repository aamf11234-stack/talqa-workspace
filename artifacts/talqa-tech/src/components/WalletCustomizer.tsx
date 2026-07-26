import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Wifi, MapPin, Calendar, Clock, QrCode, Star, CreditCard, CheckCircle2, Plane, Ticket, Gift, Building2 } from 'lucide-react';

const WA = 'https://wa.me/966551378531?text=أريد%20بطاقة%20Apple%20Wallet%20لمشروعي';

const CARD_TYPES = [
  { id: 'loyalty',   icon: Star,      label: 'بطاقة ولاء',    color: '#F59E0B', bg: '#7C3A0D' },
  { id: 'nfc',       icon: Wifi,      label: 'بطاقة NFC',     color: '#8B5CF6', bg: '#1e0b40' },
  { id: 'boarding',  icon: Plane,     label: 'تذكرة سفر',     color: '#3B82F6', bg: '#0c1a3a' },
  { id: 'event',     icon: Ticket,    label: 'تذكرة فعالية',  color: '#EC4899', bg: '#2a0a1e' },
  { id: 'booking',   icon: Calendar,  label: 'تأكيد حجز',     color: '#10B981', bg: '#061a12' },
  { id: 'member',    icon: CreditCard, label: 'بطاقة عضوية',  color: '#06B6D4', bg: '#041820' },
  { id: 'gift',      icon: Gift,      label: 'بطاقة هدية',   color: '#F97316', bg: '#1a0a03' },
  { id: 'office',    icon: Building2, label: 'بطاقة أعمال',  color: '#A78BFA', bg: '#12071a' },
];

/* ── Card preview components ── */
function LoyaltyCard({ name, logo, color }: any) {
  return (
    <div style={{ width: '100%', borderRadius: 20, padding: '22px 22px 18px', background: `linear-gradient(135deg, ${color || '#7C3A0D'} 0%, #1a0608 100%)`, position: 'relative', overflow: 'hidden', minHeight: 180 }}>
      <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          {logo ? <img src={logo} alt="" style={{ height: 36, maxWidth: 100, objectFit: 'contain' }} /> : <Star size={26} color="#F59E0B" />}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>LOYALTY</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>{name || 'مشروعك'}</div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>نقاطك</div>
      <div style={{ fontSize: 42, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>٢٤٧</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 14 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>أحمد العمري</div>
        <div style={{ width: 40, height: 40, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <QrCode size={24} color="#000" />
        </div>
      </div>
    </div>
  );
}

function NFCCard({ name, logo, color }: any) {
  return (
    <div style={{ width: '100%', borderRadius: 20, padding: '22px', background: `linear-gradient(135deg, #1a0b3a, #0a0015)`, border: '1px solid rgba(139,92,246,0.3)', position: 'relative', overflow: 'hidden', minHeight: 180 }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 80% 20%, rgba(139,92,246,0.15), transparent 60%)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        {logo ? <img src={logo} alt="" style={{ height: 34, maxWidth: 100, objectFit: 'contain' }} /> : <Wifi size={28} color={color || '#8B5CF6'} style={{ transform: 'rotate(90deg)' }} />}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>NFC CARD</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>{name || 'مشروعك'}</div>
        </div>
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: 14, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: 16 }}>•••• •••• •••• 4521</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>CARDHOLDER</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>أحمد العمري</div>
        </div>
        <div style={{ padding: '6px 14px', borderRadius: 99, background: `rgba(139,92,246,0.2)`, border: `1px solid rgba(139,92,246,0.35)`, fontSize: 11, fontWeight: 700, color: color || '#8B5CF6' }}>ذهبي</div>
      </div>
    </div>
  );
}

function BoardingCard({ name, logo, color }: any) {
  return (
    <div style={{ width: '100%', borderRadius: 20, background: '#fff', overflow: 'hidden', minHeight: 180 }}>
      <div style={{ padding: '18px 20px', background: color || '#1D4ED8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {logo ? <img src={logo} alt="" style={{ height: 28, maxWidth: 80, objectFit: 'contain' }} /> : <Plane size={22} color="#fff" />}
          <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Boarding Pass</div>
        </div>
      </div>
      <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 9, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>From</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#111', letterSpacing: '-0.03em' }}>RUH</div>
          <div style={{ fontSize: 11, color: '#666', fontWeight: 600 }}>الرياض</div>
        </div>
        <Plane size={18} color={color || '#1D4ED8'} style={{ transform: 'rotate(-45deg)' }} />
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 9, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>To</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#111', letterSpacing: '-0.03em' }}>JED</div>
          <div style={{ fontSize: 11, color: '#666', fontWeight: 600 }}>جدة</div>
        </div>
      </div>
      <div style={{ margin: '0 20px 16px', borderTop: '1.5px dashed #ddd', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 9, color: '#888', fontWeight: 700 }}>GATE</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#111' }}>B12</div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: '#888', fontWeight: 700 }}>SEAT</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#111' }}>14A</div>
        </div>
        <div style={{ width: 50, height: 50, borderRadius: 8, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <QrCode size={30} color="#333" />
        </div>
      </div>
    </div>
  );
}

function EventCard({ name, logo, color }: any) {
  return (
    <div style={{ width: '100%', borderRadius: 20, overflow: 'hidden', minHeight: 180 }}>
      <div style={{ padding: '20px', background: `linear-gradient(135deg, ${color || '#EC4899'}, #1a0010)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'relative' }}>
          {logo ? <img src={logo} alt="" style={{ height: 30, maxWidth: 90, objectFit: 'contain', marginBottom: 12 }} /> : <Ticket size={24} color="#fff" style={{ marginBottom: 12 }} />}
          <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{name || 'فعاليتك'}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>VIP Experience</div>
        </div>
      </div>
      <div style={{ padding: '14px 20px 18px', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 9, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>التاريخ</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>٢٥ مايو</div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>الوقت</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>٧:٠٠ م</div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>المكان</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>قاعة الرياض</div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>المقعد</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>A - 14</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 12, color: '#666' }}>أحمد العمري</div>
          <QrCode size={36} color="#333" />
        </div>
      </div>
    </div>
  );
}

function BookingCard({ name, logo, color }: any) {
  return (
    <div style={{ width: '100%', borderRadius: 20, padding: '20px', background: `linear-gradient(135deg, #061a12, #0c2618)`, border: `1px solid rgba(16,185,129,0.25)`, minHeight: 180 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {logo ? <img src={logo} alt="" style={{ width: 24, height: 24, objectFit: 'cover', borderRadius: 6 }} /> : <Calendar size={20} color={color || '#10B981'} />}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>تأكيد الحجز</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{name || 'مشروعك'}</div>
        </div>
      </div>
      <div style={{ padding: '14px', borderRadius: 12, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Calendar size={14} color={color || '#10B981'} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>الأربعاء، ٢٢ مايو ٢٠٢٥</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clock size={14} color={color || '#10B981'} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>٣:٠٠ م — ٤:٠٠ م</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <CheckCircle2 size={14} color={color || '#10B981'} />
          <span style={{ fontSize: 11, fontWeight: 700, color: color || '#10B981' }}>مؤكد</span>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <QrCode size={26} color="#000" />
        </div>
      </div>
    </div>
  );
}

function MemberCard({ name, logo, color }: any) {
  return (
    <div style={{ width: '100%', borderRadius: 20, overflow: 'hidden', minHeight: 180 }}>
      <div style={{ padding: '20px', background: `linear-gradient(135deg, ${color || '#06B6D4'}, #041820)`, position: 'relative' }}>
        <div style={{ position: 'absolute', top: -30, left: '30%', width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          {logo ? <img src={logo} alt="" style={{ height: 30, maxWidth: 90, objectFit: 'contain' }} /> : <CreditCard size={22} color="#fff" />}
          <div style={{ padding: '4px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.15)', fontSize: 10, fontWeight: 800, color: '#fff' }}>GOLD</div>
        </div>
        <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginBottom: 2 }}>{name || 'مشروعك'}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>أحمد العمري · عضو ذهبي</div>
      </div>
      <div style={{ padding: '14px 20px', background: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[{ label: 'الرصيد', val: '١٢٠ ر.س', c: color || '#06B6D4' }, { label: 'الزيارات', val: '٢٣', c: '#F59E0B' }, { label: 'المستوى', val: 'ذهبي', c: '#10B981' }].map(({ label, val, c }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: c }}>{val}</div>
            <div style={{ fontSize: 9, color: '#888', fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GiftCard({ name, logo, color }: any) {
  return (
    <div style={{ width: '100%', borderRadius: 20, overflow: 'hidden', minHeight: 180 }}>
      <div style={{ padding: '22px 20px', background: `linear-gradient(135deg, ${color || '#F97316'}, #1a0800)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', top: -10, right: 20, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'relative' }}>
          {logo ? <img src={logo} alt="" style={{ height: 30, maxWidth: 80, objectFit: 'contain', marginBottom: 12 }} /> : <Gift size={28} color="#fff" style={{ marginBottom: 12 }} />}
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginBottom: 4 }}>بطاقة هدية</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#fff', marginBottom: 8 }}>{name || 'مشروعك'}</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>٢٠٠ ر.س</div>
        </div>
      </div>
      <div style={{ padding: '14px 20px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 9, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>CODE</div>
          <div style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 800, color: '#111', letterSpacing: '0.15em' }}>GIFT-4821</div>
        </div>
        <QrCode size={40} color="#333" />
      </div>
    </div>
  );
}

function OfficeCard({ name, logo, color }: any) {
  return (
    <div style={{ width: '100%', borderRadius: 20, padding: '22px', background: `linear-gradient(135deg, #12071a, #1a0f2e)`, border: `1px solid rgba(167,139,250,0.2)`, minHeight: 180 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
        {logo ? <img src={logo} alt="" style={{ height: 36, maxWidth: 100, objectFit: 'contain' }} /> : <Building2 size={26} color={color || '#A78BFA'} />}
        <div style={{ padding: '4px 12px', borderRadius: 99, background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', fontSize: 10, fontWeight: 800, color: color || '#A78BFA' }}>BUSINESS</div>
      </div>
      <div style={{ fontSize: 17, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{name || 'مشروعك'}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 600, marginBottom: 16 }}>أحمد العمري · مدير تنفيذي</div>
      <div style={{ display: 'flex', gap: 14 }}>
        {[{ icon: MapPin, label: 'الرياض' }, { icon: Wifi, label: 'NFC' }, { icon: QrCode, label: 'QR Code' }].map(({ icon: Icon, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon size={12} color={color || '#A78BFA'} />
            <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const CARD_PREVIEWS: Record<string, React.ComponentType<any>> = {
  loyalty: LoyaltyCard, nfc: NFCCard, boarding: BoardingCard,
  event: EventCard, booking: BookingCard, member: MemberCard,
  gift: GiftCard, office: OfficeCard,
};

export default function WalletCustomizer() {
  const [cardType, setCardType] = useState('loyalty');
  const [name, setName] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [color, setColor] = useState('#F59E0B');
  const fileRef = useRef<HTMLInputElement>(null);

  const ct = CARD_TYPES.find(c => c.id === cardType)!;
  const Preview = CARD_PREVIEWS[cardType];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => setLogo(ev.target?.result as string);
    r.readAsDataURL(f);
  };

  const ACCENT_COLORS = ['#F59E0B', '#8B5CF6', '#3B82F6', '#EC4899', '#10B981', '#06B6D4', '#F97316', '#EF4444'];

  return (
    <section id="wallet" style={{ padding: 'clamp(80px,10vw,130px) 0', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 600, height: 600, top: '30%', left: '-10%', background: 'rgba(6,182,212,0.08)', animationDelay: '-4s' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ color: 'var(--teal)', borderColor: 'rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.08)' }}>Apple Wallet</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            بطاقتك في{' '}
            <span style={{ background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>هاتف عميلك مباشرة</span>
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginTop: 14, maxWidth: 520, margin: '14px auto 0' }}>
            ٨ أنواع بطاقات — بدون تطبيق، تشتغل على كل أجهزة Apple مباشرة.
          </p>
        </motion.div>

        {/* Card type selector */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 48 }}>
          {CARD_TYPES.map(ct => (
            <button key={ct.id} onClick={() => { setCardType(ct.id); setColor(ct.color); }}
              className={`card-type-pill ${cardType === ct.id ? 'active' : ''}`}
              style={cardType === ct.id ? { background: ct.color, borderColor: ct.color, color: '#fff', boxShadow: `0 0 20px ${ct.color}60` } : {}}>
              <ct.icon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
              {ct.label}
            </button>
          ))}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(280px,380px)', gap: 40, alignItems: 'start' }}>
          {/* Left: card preview */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{ position: 'relative' }}>
            {/* Glow */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '80%', height: '80%', background: `radial-gradient(ellipse, ${ct.color}20 0%, transparent 70%)`, filter: 'blur(30px)', pointerEvents: 'none', transition: 'background 0.5s' }} />

            <AnimatePresence mode="wait">
              <motion.div key={cardType}
                initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
                style={{ maxWidth: 380, margin: '0 auto', position: 'relative' }}>
                <Preview name={name} logo={logo} color={color} />
              </motion.div>
            </AnimatePresence>

            {/* Apple Wallet badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginTop: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🍎</div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)' }}>يُضاف مباشرة إلى</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>Apple Wallet</div>
              </div>
            </div>
          </motion.div>

          {/* Right: controls */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            className="glass" style={{ padding: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: ct.color, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <ct.icon size={16} />
              {ct.label}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text2)', display: 'block', marginBottom: 8 }}>اسم مشروعك</label>
                <input className="styled-input" placeholder="مثال: قهوتي، عيادتي..." value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text2)', display: 'block', marginBottom: 8 }}>الشعار</label>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                <div className="upload-area" onClick={() => fileRef.current?.click()} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14 }}>
                  {logo ? (
                    <img src={logo} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: `${ct.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Upload size={18} color={ct.color} />
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: logo ? '#fff' : 'var(--text2)' }}>{logo ? 'تم الرفع ✓' : 'ارفع الشعار'}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>PNG · JPG · SVG</div>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text2)', display: 'block', marginBottom: 10 }}>لون البطاقة</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ACCENT_COLORS.map(c => (
                    <button key={c} onClick={() => setColor(c)} style={{
                      width: 32, height: 32, borderRadius: 8, background: c, border: 'none', cursor: 'pointer',
                      outline: color === c ? `3px solid ${c}` : '2px solid transparent',
                      outlineOffset: 3,
                      boxShadow: color === c ? `0 0 14px ${c}80` : 'none',
                      transition: 'all 0.2s',
                    }} />
                  ))}
                </div>
              </div>

              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-purple" style={{ justifyContent: 'center', textAlign: 'center', marginTop: 4 }}>
                أضف البطاقة لمشروعك ←
              </a>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['تحديثات فورية عن بُعد', 'تنبيهات إشعار تلقائية', 'يشتغل بدون إنترنت', 'دعم NFC والـ QR'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={14} color={ct.color} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px) {
          #wallet > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
