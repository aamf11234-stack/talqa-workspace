import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Check, RotateCcw, ChevronRight, Edit3 } from 'lucide-react';
import type { Deal, Product } from '../hooks/useOffersStore';

const ADMIN_PIN = '1234';

const COLORS = ['#7A3B18','#C4783A','#6B3210','#2D7D46','#1A6B8A','#7B3F8A','#AA2B2B'];
const GRADS: Record<string, string> = {
  '#7A3B18': 'linear-gradient(135deg,#1A0804,#3A1408)',
  '#C4783A': 'linear-gradient(135deg,#1A0E00,#3A2208)',
  '#6B3210': 'linear-gradient(135deg,#1A0800,#3A1800)',
  '#2D7D46': 'linear-gradient(135deg,#001A0A,#023818)',
  '#1A6B8A': 'linear-gradient(135deg,#001422,#012030)',
  '#7B3F8A': 'linear-gradient(135deg,#120018,#280030)',
  '#AA2B2B': 'linear-gradient(135deg,#1A0000,#380000)',
};

/* ── PIN Screen ────────────────────────────────────────────── */
function PinScreen({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(false);

  function press(d: string) {
    const next = pin + d;
    if (next.length < 4) { setPin(next); return; }
    if (next === ADMIN_PIN) { onSuccess(); }
    else {
      setShake(true);
      setTimeout(() => { setShake(false); setPin(''); }, 600);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 pb-8">
      <button onClick={onClose}
        className="absolute top-5 left-5 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.08)' }}>
        <X size={15} className="text-white/50" />
      </button>

      <p className="text-[10px] font-black tracking-widest text-[#C4783A] mb-2"
        style={{ fontFamily: 'ui-monospace,monospace' }}>OWNER · لوحة التحكم</p>
      <p className="text-white text-[22px] font-black mb-8">أدخل الرمز</p>

      {/* Dots */}
      <motion.div animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.4 }}
        className="flex gap-4 mb-10">
        {[0,1,2,3].map(i => (
          <div key={i} className="w-4 h-4 rounded-full transition-all"
            style={{ background: i < pin.length ? '#C4783A' : 'rgba(255,255,255,0.15)' }} />
        ))}
      </motion.div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
        {['١','٢','٣','٤','٥','٦','٧','٨','٩','','٠','⌫'].map((k, i) => (
          k === '' ? <div key={i} /> :
          <motion.button key={i} whileTap={{ scale: 0.88 }}
            onClick={() => k === '⌫' ? setPin(p => p.slice(0,-1)) : press(String(['١','٢','٣','٤','٥','٦','٧','٨','٩','','٠','⌫'].indexOf(k) === 10 ? 0 : (i < 9 ? i+1 : i === 10 ? 0 : null)!))}
            onPointerDown={() => {
              const num = k === '⌫' ? null : k === '٠' ? '0' : String(['١','٢','٣','٤','٥','٦','٧','٨','٩'].indexOf(k) + 1);
              if (k === '⌫') setPin(p => p.slice(0,-1));
              else if (num) press(num);
            }}
            className="aspect-square rounded-[18px] flex items-center justify-center text-[22px] font-bold"
            style={{ background: k === '⌫' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)', color: 'white' }}>
            {k}
          </motion.button>
        ))}
      </div>

      <p className="text-white/15 text-[10px] mt-8">الرمز الافتراضي: 1234</p>
    </div>
  );
}

/* ── Deal Form ─────────────────────────────────────────────── */
const BLANK_DEAL: Omit<Deal,'id'> = { emoji:'☕', title:'', sub:'', tag:'', timer:'', color:'#7A3B18', grad:GRADS['#7A3B18'] };

function DealForm({ initial, onSave, onCancel }: {
  initial: Omit<Deal,'id'>;
  onSave:  (d: Omit<Deal,'id'>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="space-y-3">
      <Row label="إيموجي"><EmojiInput value={form.emoji} onChange={v => set('emoji', v)} /></Row>
      <Row label="العنوان"><TextInput value={form.title} onChange={v => set('title', v)} placeholder="مثال: قهوتان للسعر الواحد" /></Row>
      <Row label="الوصف"><TextInput value={form.sub} onChange={v => set('sub', v)} placeholder="مثال: حتى ١٢م · للأعضاء فقط" /></Row>
      <Row label="التاغ"><TextInput value={form.tag} onChange={v => set('tag', v)} placeholder="مثال: عضوية" /></Row>
      <Row label="العداد"><TextInput value={form.timer} onChange={v => set('timer', v)} placeholder="مثال: ٢:١٨:٤٥  (اتركه فارغاً بدون عداد)" /></Row>
      <Row label="اللون">
        <div className="flex gap-2 flex-wrap">
          {COLORS.map(c => (
            <button key={c} onClick={() => setForm(f => ({ ...f, color: c, grad: GRADS[c] ?? f.grad }))}
              className="w-7 h-7 rounded-full border-2"
              style={{ background: c, borderColor: form.color === c ? 'white' : 'transparent' }} />
          ))}
        </div>
      </Row>
      <div className="flex gap-2 pt-2">
        <button onClick={onCancel}
          className="flex-1 py-2.5 rounded-[13px] text-[12px] font-bold text-white/40"
          style={{ background: 'rgba(255,255,255,0.06)' }}>إلغاء</button>
        <motion.button whileTap={{ scale: 0.97 }}
          onClick={() => form.title && onSave(form)}
          className="flex-1 py-2.5 rounded-[13px] text-[12px] font-bold text-white"
          style={{ background: form.title ? '#6B3210' : 'rgba(255,255,255,0.06)' }}>
          حفظ ✓
        </motion.button>
      </div>
    </div>
  );
}

/* ── Product Form ──────────────────────────────────────────── */
const BLANK_PRODUCT: Omit<Product,'id'> = { emoji:'☕', name:'', desc:'', price:20, orig:null, color:'#7A3B18' };

function ProductForm({ initial, onSave, onCancel }: {
  initial: Omit<Product,'id'>;
  onSave:  (p: Omit<Product,'id'>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const setS = (k: keyof typeof form, v: string)  => setForm(f => ({ ...f, [k]: v }));
  const setN = (k: keyof typeof form, v: number | null) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="space-y-3">
      <Row label="إيموجي"><EmojiInput value={form.emoji} onChange={v => setS('emoji', v)} /></Row>
      <Row label="الاسم"><TextInput value={form.name} onChange={v => setS('name', v)} placeholder="مثال: كومبو المساء" /></Row>
      <Row label="الوصف"><TextInput value={form.desc} onChange={v => setS('desc', v)} placeholder="مثال: قهوة مثلجة + كيك" /></Row>
      <Row label="السعر (ريال)">
        <input type="number" value={form.price} min={1}
          onChange={e => setN('price', Number(e.target.value))}
          className="w-24 bg-white/10 border border-white/15 rounded-[10px] px-3 py-1.5 text-white text-[13px] text-center outline-none" />
      </Row>
      <Row label="السعر الأصلي">
        <div className="flex items-center gap-2">
          <input type="number" value={form.orig ?? ''} min={1} placeholder="بدون شطب"
            onChange={e => setN('orig', e.target.value ? Number(e.target.value) : null)}
            className="w-24 bg-white/10 border border-white/15 rounded-[10px] px-3 py-1.5 text-white text-[13px] text-center outline-none placeholder:text-white/25" />
          {form.orig && (
            <button onClick={() => setN('orig', null)} className="text-white/30 text-[10px]">حذف الشطب</button>
          )}
        </div>
      </Row>
      <Row label="اللون">
        <div className="flex gap-2 flex-wrap">
          {COLORS.map(c => (
            <button key={c} onClick={() => setS('color', c)}
              className="w-7 h-7 rounded-full border-2"
              style={{ background: c, borderColor: form.color === c ? 'white' : 'transparent' }} />
          ))}
        </div>
      </Row>
      <div className="flex gap-2 pt-2">
        <button onClick={onCancel}
          className="flex-1 py-2.5 rounded-[13px] text-[12px] font-bold text-white/40"
          style={{ background: 'rgba(255,255,255,0.06)' }}>إلغاء</button>
        <motion.button whileTap={{ scale: 0.97 }}
          onClick={() => form.name && onSave(form)}
          className="flex-1 py-2.5 rounded-[13px] text-[12px] font-bold text-white"
          style={{ background: form.name ? '#6B3210' : 'rgba(255,255,255,0.06)' }}>
          حفظ ✓
        </motion.button>
      </div>
    </div>
  );
}

/* ── Small UI helpers ──────────────────────────────────────── */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[9px] text-white/35 font-bold mb-1.5">{label}</p>
      {children}
    </div>
  );
}
function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-white/10 border border-white/15 rounded-[12px] px-3 py-2 text-white text-[12px] outline-none placeholder:text-white/20"
      style={{ direction: 'rtl' }} />
  );
}
function EmojiInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} maxLength={2}
      className="w-14 text-center bg-white/10 border border-white/15 rounded-[12px] py-2 text-[22px] outline-none" />
  );
}

/* ── Main Admin Panel ──────────────────────────────────────── */
export interface AdminPanelProps {
  deals:         Deal[];
  products:      Product[];
  onAddDeal:     (d: Omit<Deal,'id'>)    => void;
  onUpdateDeal:  (d: Deal)               => void;
  onDeleteDeal:  (id: string)            => void;
  onAddProduct:  (p: Omit<Product,'id'>) => void;
  onUpdateProduct:(p: Product)           => void;
  onDeleteProduct:(id: string)           => void;
  onReset:       () => void;
  onClose:       () => void;
}

export function AdminPanel(props: AdminPanelProps) {
  const [authed, setAuthed]         = useState(false);
  const [tab,    setTab]            = useState<'deals' | 'products'>('deals');
  const [editDeal,    setEditDeal]    = useState<Deal    | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [addingDeal,    setAddingDeal]    = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);
  const [confirmReset,  setConfirmReset]  = useState(false);

  return (
    <motion.div
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
      transition={{ type: 'spring', damping: 26, stiffness: 280 }}
      className="absolute inset-0 z-[60] rounded-[48px] overflow-hidden flex flex-col"
      style={{ background: '#080005' }}>

      {!authed ? (
        <PinScreen onSuccess={() => setAuthed(true)} onClose={props.onClose} />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <p className="text-[9px] font-black tracking-widest text-[#C4783A]"
                style={{ fontFamily: 'ui-monospace,monospace' }}>OWNER PANEL</p>
              <p className="text-white text-[18px] font-black">لوحة التحكم</p>
            </div>
            <button onClick={props.onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.07)' }}>
              <X size={15} className="text-white/50" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 px-4 pt-3 pb-1 shrink-0">
            {([['deals','🎁 العروض'], ['products','🛍️ المنتجات']] as const).map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)}
                className="flex-1 py-2 rounded-[11px] text-[12px] font-bold"
                style={{
                  background: tab === k ? '#6B3210' : 'rgba(255,255,255,0.05)',
                  color:      tab === k ? 'white'   : 'rgba(255,255,255,0.3)',
                }}>
                {l}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-3">
            <AnimatePresence mode="wait">

              {/* ── DEALS ── */}
              {tab === 'deals' && (
                <motion.div key="deals"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {props.deals.map(d => (
                    <AnimatePresence key={d.id}>
                      {editDeal?.id === d.id ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="mb-3 p-4 rounded-[18px]"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <p className="text-white/50 text-[10px] font-bold mb-3">تعديل العرض</p>
                          <DealForm
                            initial={{ emoji: d.emoji, title: d.title, sub: d.sub, tag: d.tag, timer: d.timer, color: d.color, grad: d.grad }}
                            onSave={updated => { props.onUpdateDeal({ ...updated, id: d.id }); setEditDeal(null); }}
                            onCancel={() => setEditDeal(null)} />
                        </motion.div>
                      ) : (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                          className="flex items-center gap-3 mb-2.5 p-3.5 rounded-[16px]"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <span className="text-[22px] shrink-0">{d.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-[12px] font-bold truncate">{d.title}</p>
                            <p className="text-white/30 text-[10px] truncate">{d.sub}</p>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            <button onClick={() => setEditDeal(d)}
                              className="w-7 h-7 rounded-full flex items-center justify-center"
                              style={{ background: 'rgba(196,120,58,0.15)' }}>
                              <Edit3 size={12} className="text-[#C4783A]" />
                            </button>
                            <button onClick={() => props.onDeleteDeal(d.id)}
                              className="w-7 h-7 rounded-full flex items-center justify-center"
                              style={{ background: 'rgba(255,59,48,0.12)' }}>
                              <Trash2 size={12} className="text-[#FF3B30]" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}

                  {/* Add deal */}
                  {addingDeal ? (
                    <div className="mt-1 mb-3 p-4 rounded-[18px]"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(107,50,16,0.4)' }}>
                      <p className="text-white/50 text-[10px] font-bold mb-3">عرض جديد</p>
                      <DealForm initial={BLANK_DEAL}
                        onSave={d => { props.onAddDeal(d); setAddingDeal(false); }}
                        onCancel={() => setAddingDeal(false)} />
                    </div>
                  ) : (
                    <motion.button whileTap={{ scale: 0.97 }} onClick={() => setAddingDeal(true)}
                      className="w-full py-3 rounded-[16px] flex items-center justify-center gap-2 mt-1"
                      style={{ background: 'rgba(107,50,16,0.15)', border: '1px dashed rgba(107,50,16,0.4)' }}>
                      <Plus size={14} className="text-[#C4783A]" />
                      <span className="text-[#C4783A] text-[12px] font-bold">أضف عرضاً جديداً</span>
                    </motion.button>
                  )}
                </motion.div>
              )}

              {/* ── PRODUCTS ── */}
              {tab === 'products' && (
                <motion.div key="products"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {props.products.map(p => (
                    <AnimatePresence key={p.id}>
                      {editProduct?.id === p.id ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="mb-3 p-4 rounded-[18px]"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <p className="text-white/50 text-[10px] font-bold mb-3">تعديل المنتج</p>
                          <ProductForm
                            initial={{ emoji: p.emoji, name: p.name, desc: p.desc, price: p.price, orig: p.orig, color: p.color }}
                            onSave={updated => { props.onUpdateProduct({ ...updated, id: p.id }); setEditProduct(null); }}
                            onCancel={() => setEditProduct(null)} />
                        </motion.div>
                      ) : (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                          className="flex items-center gap-3 mb-2.5 p-3.5 rounded-[16px]"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <span className="text-[22px] shrink-0">{p.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-[12px] font-bold truncate">{p.name}</p>
                            <p className="text-white/30 text-[10px]">
                              {p.price} ر{p.orig ? ` · كان ${p.orig} ر` : ''}
                            </p>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            <button onClick={() => setEditProduct(p)}
                              className="w-7 h-7 rounded-full flex items-center justify-center"
                              style={{ background: 'rgba(196,120,58,0.15)' }}>
                              <Edit3 size={12} className="text-[#C4783A]" />
                            </button>
                            <button onClick={() => props.onDeleteProduct(p.id)}
                              className="w-7 h-7 rounded-full flex items-center justify-center"
                              style={{ background: 'rgba(255,59,48,0.12)' }}>
                              <Trash2 size={12} className="text-[#FF3B30]" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}

                  {/* Add product */}
                  {addingProduct ? (
                    <div className="mt-1 mb-3 p-4 rounded-[18px]"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(107,50,16,0.4)' }}>
                      <p className="text-white/50 text-[10px] font-bold mb-3">منتج جديد</p>
                      <ProductForm initial={BLANK_PRODUCT}
                        onSave={p => { props.onAddProduct(p); setAddingProduct(false); }}
                        onCancel={() => setAddingProduct(false)} />
                    </div>
                  ) : (
                    <motion.button whileTap={{ scale: 0.97 }} onClick={() => setAddingProduct(true)}
                      className="w-full py-3 rounded-[16px] flex items-center justify-center gap-2 mt-1"
                      style={{ background: 'rgba(107,50,16,0.15)', border: '1px dashed rgba(107,50,16,0.4)' }}>
                      <Plus size={14} className="text-[#C4783A]" />
                      <span className="text-[#C4783A] text-[12px] font-bold">أضف منتجاً جديداً</span>
                    </motion.button>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Footer — Reset */}
          <div className="shrink-0 px-4 pb-6 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {confirmReset ? (
              <div className="flex gap-2">
                <button onClick={() => setConfirmReset(false)}
                  className="flex-1 py-2.5 rounded-[13px] text-[12px] font-bold text-white/40"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>إلغاء</button>
                <button onClick={() => { props.onReset(); setConfirmReset(false); }}
                  className="flex-1 py-2.5 rounded-[13px] text-[12px] font-bold text-white"
                  style={{ background: '#AA2B2B' }}>تأكيد الإعادة</button>
              </div>
            ) : (
              <button onClick={() => setConfirmReset(true)}
                className="w-full py-2.5 rounded-[13px] flex items-center justify-center gap-2 text-[11px] font-bold"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.25)' }}>
                <RotateCcw size={12} />
                إعادة الإعدادات الافتراضية
              </button>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
