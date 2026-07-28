import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Edit3, RotateCcw, Check, Eye } from 'lucide-react';
import { useOffersStore, DEFAULT_DEALS, DEFAULT_PRODUCTS } from '../hooks/useOffersStore';
import type { Deal, Product } from '../hooks/useOffersStore';

const ADMIN_PIN = '1234';

const COLORS = ['#7A3B18','#C4783A','#6B3210','#2D7D46','#1A6B8A','#7B3F8A','#AA2B2B'];
const GRADS: Record<string,string> = {
  '#7A3B18':'linear-gradient(135deg,#1A0804,#3A1408)',
  '#C4783A':'linear-gradient(135deg,#1A0E00,#3A2208)',
  '#6B3210':'linear-gradient(135deg,#1A0800,#3A1800)',
  '#2D7D46':'linear-gradient(135deg,#001A0A,#023818)',
  '#1A6B8A':'linear-gradient(135deg,#001422,#012030)',
  '#7B3F8A':'linear-gradient(135deg,#120018,#280030)',
  '#AA2B2B':'linear-gradient(135deg,#1A0000,#380000)',
};

/* ── Helpers ────────────────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-white/40 font-semibold mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
function TxtInput({ value, onChange, placeholder, dir = 'rtl' }: { value: string; onChange: (v: string) => void; placeholder?: string; dir?: string }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm outline-none focus:border-amber-700/60 placeholder:text-white/20 transition-colors"
      style={{ direction: dir as 'rtl' | 'ltr' }} />
  );
}
function NumInput({ value, onChange, placeholder }: { value: number | ''; onChange: (v: number | null) => void; placeholder?: string }) {
  return (
    <input type="number" value={value} min={0} placeholder={placeholder}
      onChange={e => onChange(e.target.value === '' ? null : Number(e.target.value))}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm text-center outline-none focus:border-amber-700/60 placeholder:text-white/20 transition-colors" />
  );
}
function ColorPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {COLORS.map(c => (
        <button key={c} onClick={() => onChange(c)}
          className="w-8 h-8 rounded-full border-2 transition-all"
          style={{ background: c, borderColor: value === c ? 'white' : 'transparent', transform: value === c ? 'scale(1.15)' : 'scale(1)' }} />
      ))}
    </div>
  );
}

/* ── PIN ────────────────────────────────────────────────────── */
function PinGate({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState('');
  const [err, setErr] = useState(false);

  function push(d: string) {
    const next = pin + d;
    if (next.length < 4) { setPin(next); return; }
    if (next === ADMIN_PIN) { onSuccess(); }
    else { setErr(true); setTimeout(() => { setErr(false); setPin(''); }, 700); }
  }

  const KEYS = ['١','٢','٣','٤','٥','٦','٧','٨','٩','','٠','⌫'];
  const MAP: Record<string,string> = { '١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','٠':'0' };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0003] px-8">
      <p className="text-amber-600 text-xs font-black tracking-widest mb-2" style={{ fontFamily:'ui-monospace,monospace' }}>OWNER · كافيهك</p>
      <h1 className="text-white text-2xl font-black mb-10">أدخل رمز الدخول</h1>

      <motion.div animate={err ? { x:[-10,10,-8,8,-4,4,0] } : {}} transition={{ duration:.45 }}
        className="flex gap-4 mb-10">
        {[0,1,2,3].map(i => (
          <div key={i} className="w-4 h-4 rounded-full transition-all"
            style={{ background: err ? '#FF3B30' : i < pin.length ? '#C4783A' : 'rgba(255,255,255,0.15)' }} />
        ))}
      </motion.div>

      <div className="grid grid-cols-3 gap-3 w-64">
        {KEYS.map((k, i) => !k ? <div key={i} /> : (
          <motion.button key={i} whileTap={{ scale: .88 }}
            onClick={() => k === '⌫' ? setPin(p => p.slice(0,-1)) : push(MAP[k] ?? k)}
            className="aspect-square rounded-2xl text-xl font-bold text-white flex items-center justify-center"
            style={{ background: k === '⌫' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.09)' }}>
            {k}
          </motion.button>
        ))}
      </div>
      <p className="text-white/15 text-xs mt-10">الرمز الافتراضي: 1234</p>
    </div>
  );
}

/* ── Deal form ──────────────────────────────────────────────── */
const BLANK_DEAL: Omit<Deal,'id'> = { emoji:'☕', title:'', sub:'', tag:'', timer:'', color:'#7A3B18', grad:GRADS['#7A3B18'] };

function DealForm({ init, onSave, onCancel }: { init: Omit<Deal,'id'>; onSave:(d:Omit<Deal,'id'>)=>void; onCancel:()=>void }) {
  const [f, setF] = useState(init);
  const s = (k: keyof typeof f, v: string) => setF(x => ({ ...x, [k]: v }));
  return (
    <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10">
      <div className="grid grid-cols-2 gap-3">
        <Field label="إيموجي">
          <input value={f.emoji} onChange={e => s('emoji', e.target.value)} maxLength={2}
            className="w-full text-center text-2xl bg-white/5 border border-white/10 rounded-xl py-2 text-white outline-none" />
        </Field>
        <Field label="التاغ"><TxtInput value={f.tag} onChange={v => s('tag', v)} placeholder="عضوية" /></Field>
      </div>
      <Field label="العنوان"><TxtInput value={f.title} onChange={v => s('title', v)} placeholder="مثال: قهوتان للسعر الواحد" /></Field>
      <Field label="الوصف"><TxtInput value={f.sub} onChange={v => s('sub', v)} placeholder="مثال: حتى ١٢م · للأعضاء فقط" /></Field>
      <Field label="العداد (اتركه فارغاً بدون عداد)"><TxtInput value={f.timer} onChange={v => s('timer', v)} placeholder="٢:١٨:٤٥" dir="ltr" /></Field>
      <Field label="اللون"><ColorPicker value={f.color} onChange={c => setF(x => ({ ...x, color: c, grad: GRADS[c] ?? x.grad }))} /></Field>
      <div className="flex gap-2 pt-1">
        <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white/30 bg-white/5">إلغاء</button>
        <button onClick={() => f.title && onSave(f)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: f.title ? '#6B3210' : 'rgba(255,255,255,0.06)' }}>حفظ ✓</button>
      </div>
    </div>
  );
}

/* ── Product form ───────────────────────────────────────────── */
const BLANK_PROD: Omit<Product,'id'> = { emoji:'☕', name:'', desc:'', price:20, orig:null, color:'#7A3B18' };

function ProductForm({ init, onSave, onCancel }: { init: Omit<Product,'id'>; onSave:(p:Omit<Product,'id'>)=>void; onCancel:()=>void }) {
  const [f, setF] = useState(init);
  return (
    <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10">
      <div className="grid grid-cols-2 gap-3">
        <Field label="إيموجي">
          <input value={f.emoji} onChange={e => setF(x => ({ ...x, emoji: e.target.value }))} maxLength={2}
            className="w-full text-center text-2xl bg-white/5 border border-white/10 rounded-xl py-2 text-white outline-none" />
        </Field>
        <Field label="اللون"><ColorPicker value={f.color} onChange={c => setF(x => ({ ...x, color: c }))} /></Field>
      </div>
      <Field label="الاسم"><TxtInput value={f.name} onChange={v => setF(x => ({ ...x, name: v }))} placeholder="مثال: كومبو المساء" /></Field>
      <Field label="الوصف"><TxtInput value={f.desc} onChange={v => setF(x => ({ ...x, desc: v }))} placeholder="مثال: قهوة مثلجة + كيك" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="السعر (ريال)">
          <NumInput value={f.price} onChange={v => setF(x => ({ ...x, price: v ?? 0 }))} />
        </Field>
        <Field label="السعر الأصلي (شطب)">
          <NumInput value={f.orig ?? ''} onChange={v => setF(x => ({ ...x, orig: v }))} placeholder="بدون شطب" />
        </Field>
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white/30 bg-white/5">إلغاء</button>
        <button onClick={() => f.name && onSave(f)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: f.name ? '#6B3210' : 'rgba(255,255,255,0.06)' }}>حفظ ✓</button>
      </div>
    </div>
  );
}

/* ── Preview strip ──────────────────────────────────────────── */
function DealsPreview({ deals, products }: { deals: Deal[]; products: Product[] }) {
  const [tab, setTab] = useState<'deals'|'products'>('deals');
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10" style={{ background:'#0D0200' }}>
      <div className="flex border-b border-white/10">
        {([['deals','🎁 العروض'],['products','🛍️ المنتجات']] as const).map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)}
            className="flex-1 py-2.5 text-sm font-bold transition-all"
            style={{ color: tab===k ? '#C4783A' : 'rgba(255,255,255,0.3)', borderBottom: tab===k ? '2px solid #C4783A' : '2px solid transparent' }}>
            {l}
          </button>
        ))}
      </div>
      <div className="p-3 space-y-2 max-h-64 overflow-y-auto scrollbar-none">
        {tab === 'deals' && deals.map(d => (
          <div key={d.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: d.grad, border:`1px solid ${d.color}30` }}>
            <span className="text-xl shrink-0">{d.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold truncate">{d.title}</p>
              <p className="text-white/40 text-[10px] truncate">{d.sub}</p>
            </div>
            {d.timer && <span className="text-[9px] font-black shrink-0" style={{ color: d.color }}>⏱ {d.timer}</span>}
          </div>
        ))}
        {tab === 'products' && products.map(p => (
          <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
            <span className="text-xl shrink-0">{p.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold truncate">{p.name}</p>
              <p className="text-white/30 text-[10px] truncate">{p.desc}</p>
            </div>
            <div className="text-left shrink-0">
              <p className="text-sm font-black" style={{ color: p.color }}>{p.price} ر</p>
              {p.orig && <p className="text-[10px] text-white/20 line-through">{p.orig} ر</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Admin Screen ──────────────────────────────────────── */
export function AdminScreen({ onClose }: { onClose: () => void }) {
  const store = useOffersStore();
  const [authed, setAuthed]     = useState(false);
  const [tab, setTab]           = useState<'deals'|'products'|'preview'>('deals');
  const [editDeal,    setED]    = useState<Deal|null>(null);
  const [editProd,    setEP]    = useState<Product|null>(null);
  const [addDeal,     setAD]    = useState(false);
  const [addProd,     setAP]    = useState(false);
  const [saved, setSaved]       = useState(false);
  const [confirmReset, setCR]   = useState(false);

  function flash() { setSaved(true); setTimeout(() => setSaved(false), 1800); }

  if (!authed) return <PinGate onSuccess={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-[#0A0003] text-white" dir="rtl">

      {/* Top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-white/10"
        style={{ background:'rgba(10,0,3,0.95)', backdropFilter:'blur(12px)' }}>
        <div>
          <p className="text-amber-600 text-[10px] font-black tracking-widest" style={{ fontFamily:'ui-monospace,monospace' }}>OWNER PANEL · كافيهك</p>
          <h1 className="text-lg font-black text-white leading-none">لوحة التحكم</h1>
        </div>
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {saved && (
              <motion.span initial={{ opacity:0, scale:.8 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full">
                <Check size={11} strokeWidth={3} /> محفوظ
              </motion.span>
            )}
          </AnimatePresence>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/8 hover:bg-white/15 transition-colors">
            <X size={16} className="text-white/50" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-6">

        {/* Info banner */}
        <div className="mb-6 p-4 rounded-2xl flex items-start gap-3"
          style={{ background:'rgba(107,50,16,0.15)', border:'1px solid rgba(107,50,16,0.3)' }}>
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm text-white/60 leading-relaxed">
            أي تغيير تحفظه هنا يظهر فوراً في التطبيق — بدون تحديث.
            البيانات محفوظة محلياً في المتصفح.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1.5 rounded-2xl mb-6" style={{ background:'rgba(255,255,255,0.05)' }}>
          {([
            ['deals',   '🎁', 'العروض'],
            ['products','🛍️', 'المنتجات'],
            ['preview', '👁️', 'معاينة'],
          ] as const).map(([k, ic, l]) => (
            <button key={k} onClick={() => setTab(k)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: tab===k ? '#6B3210' : 'transparent',
                color:      tab===k ? 'white'   : 'rgba(255,255,255,0.35)',
                boxShadow:  tab===k ? '0 4px 16px rgba(107,50,16,0.4)' : 'none',
              }}>
              <span>{ic}</span>{l}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ══ DEALS ══ */}
          {tab === 'deals' && (
            <motion.div key="deals" initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              <div className="space-y-3 mb-4">
                {store.deals.map(d => (
                  <AnimatePresence key={d.id}>
                    {editDeal?.id === d.id ? (
                      <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }}>
                        <DealForm init={{ emoji:d.emoji, title:d.title, sub:d.sub, tag:d.tag, timer:d.timer, color:d.color, grad:d.grad }}
                          onSave={u => { store.updateDeal({ ...u, id:d.id }); setED(null); flash(); }}
                          onCancel={() => setED(null)} />
                      </motion.div>
                    ) : (
                      <motion.div key="row" initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, x:-20 }}
                        className="flex items-center gap-3 p-4 rounded-2xl"
                        style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
                        <span className="text-2xl shrink-0">{d.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-bold truncate">{d.title}</p>
                          <p className="text-white/35 text-xs truncate">{d.sub}</p>
                          {d.timer && <p className="text-[10px] mt-0.5" style={{ color:d.color }}>⏱ {d.timer}</p>}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => setED(d)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-amber-700/20 transition-colors">
                            <Edit3 size={13} className="text-amber-600" />
                          </button>
                          <button onClick={() => { store.deleteDeal(d.id); flash(); }}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/15 transition-colors">
                            <Trash2 size={13} className="text-red-400/70" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>

              {addDeal ? (
                <DealForm init={BLANK_DEAL}
                  onSave={d => { store.addDeal(d); setAD(false); flash(); }}
                  onCancel={() => setAD(false)} />
              ) : (
                <button onClick={() => setAD(true)}
                  className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-colors hover:opacity-80"
                  style={{ background:'rgba(107,50,16,0.15)', border:'1px dashed rgba(107,50,16,0.5)', color:'#C4783A' }}>
                  <Plus size={15} /> أضف عرضاً جديداً
                </button>
              )}
            </motion.div>
          )}

          {/* ══ PRODUCTS ══ */}
          {tab === 'products' && (
            <motion.div key="products" initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              <div className="space-y-3 mb-4">
                {store.products.map(p => (
                  <AnimatePresence key={p.id}>
                    {editProd?.id === p.id ? (
                      <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }}>
                        <ProductForm init={{ emoji:p.emoji, name:p.name, desc:p.desc, price:p.price, orig:p.orig, color:p.color }}
                          onSave={u => { store.updateProduct({ ...u, id:p.id }); setEP(null); flash(); }}
                          onCancel={() => setEP(null)} />
                      </motion.div>
                    ) : (
                      <motion.div key="row" initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, x:-20 }}
                        className="flex items-center gap-3 p-4 rounded-2xl"
                        style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
                        <span className="text-2xl shrink-0">{p.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-bold truncate">{p.name}</p>
                          <p className="text-white/35 text-xs truncate">{p.desc}</p>
                        </div>
                        <div className="text-left shrink-0 ml-2">
                          <p className="text-sm font-black font-mono" style={{ color:p.color }}>{p.price} ر</p>
                          {p.orig && <p className="text-xs text-white/25 line-through">{p.orig} ر</p>}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => setEP(p)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-amber-700/20 transition-colors">
                            <Edit3 size={13} className="text-amber-600" />
                          </button>
                          <button onClick={() => { store.deleteProduct(p.id); flash(); }}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/15 transition-colors">
                            <Trash2 size={13} className="text-red-400/70" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>

              {addProd ? (
                <ProductForm init={BLANK_PROD}
                  onSave={p => { store.addProduct(p); setAP(false); flash(); }}
                  onCancel={() => setAP(false)} />
              ) : (
                <button onClick={() => setAP(true)}
                  className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-colors hover:opacity-80"
                  style={{ background:'rgba(107,50,16,0.15)', border:'1px dashed rgba(107,50,16,0.5)', color:'#C4783A' }}>
                  <Plus size={15} /> أضف منتجاً جديداً
                </button>
              )}
            </motion.div>
          )}

          {/* ══ PREVIEW ══ */}
          {tab === 'preview' && (
            <motion.div key="preview" initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              <p className="text-white/40 text-sm text-center mb-4">هكذا تظهر البيانات في التطبيق</p>
              <DealsPreview deals={store.deals} products={store.products} />
            </motion.div>
          )}

        </AnimatePresence>

        {/* Reset */}
        <div className="mt-8 pt-6 border-t border-white/8">
          {confirmReset ? (
            <div className="flex gap-3">
              <button onClick={() => setCR(false)} className="flex-1 py-3 rounded-xl text-sm font-bold text-white/30 bg-white/5">إلغاء</button>
              <button onClick={() => { store.resetToDefaults(); setCR(false); flash(); }}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-red-700/80 hover:bg-red-700">
                ✓ تأكيد الإعادة
              </button>
            </div>
          ) : (
            <button onClick={() => setCR(true)}
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm text-white/20 hover:text-white/40 transition-colors">
              <RotateCcw size={13} /> إعادة الإعدادات الافتراضية
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
