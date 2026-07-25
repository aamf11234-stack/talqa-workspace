import { useState, useCallback } from 'react';

/* ── Types ─────────────────────────────────────────────────── */
export interface Deal {
  id:    string;
  emoji: string;
  title: string;
  sub:   string;
  tag:   string;
  timer: string; // '' = no timer
  color: string;
  grad:  string;
}

export interface Product {
  id:    string;
  emoji: string;
  name:  string;
  desc:  string;
  price: number;
  orig:  number | null;
  color: string;
}

/* ── Defaults ──────────────────────────────────────────────── */
const DEFAULT_DEALS: Deal[] = [
  { id:'d1', emoji:'☕', title:'قهوتان للسعر الواحد',    sub:'صالح للأعضاء فقط · حتى ١٢م',   tag:'عضوية',   timer:'٢:١٨:٤٥', color:'#7A3B18', grad:'linear-gradient(135deg,#1A0804,#3A1408)' },
  { id:'d2', emoji:'🍔', title:'برجر + مشروب بـ٤٩ ريال', sub:'وفر ٢٢٪ — ينتهي الليلة',        tag:'الأشهر',  timer:'٩:٤٢:٠٠', color:'#C4783A', grad:'linear-gradient(135deg,#1A0E00,#3A2208)' },
  { id:'d3', emoji:'🎂', title:'حلى مجاناً مع أي طلب',   sub:'لأعياد الميلاد هذا الشهر',      tag:'مناسبة',  timer:'',         color:'#2D7D46', grad:'linear-gradient(135deg,#001A0A,#023818)' },
];

const DEFAULT_PRODUCTS: Product[] = [
  { id:'p1', emoji:'☕', name:'قهوة تخصص براون دوز',  desc:'سبيشيالتي مقطّرة على الحجر',    price:22, orig:28, color:'#7A3B18' },
  { id:'p2', emoji:'🥤', name:'كومبو المساء',          desc:'قهوة مثلجة + كيك شوكولاتة',    price:38, orig:52, color:'#C4783A' },
  { id:'p3', emoji:'🍰', name:'كيك الشوكولاتة',        desc:'طازج يومياً من مطبخنا',          price:12, orig:null, color:'#6B3210' },
  { id:'p4', emoji:'🧋', name:'ماتشا لاتيه مثلج',      desc:'ماتشا يابانية أصلية',            price:18, orig:23, color:'#2D7D46' },
];

/* ── localStorage helpers ──────────────────────────────────── */
const KEY_DEALS    = 'bd_offers_deals';
const KEY_PRODUCTS = 'bd_offers_products';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}
function save<T>(key: string, val: T) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
}

function uid() { return Math.random().toString(36).slice(2, 8); }

/* ── Hook ──────────────────────────────────────────────────── */
export function useOffersStore() {
  const [deals,    setDealsState]    = useState<Deal[]>(() => load(KEY_DEALS,    DEFAULT_DEALS));
  const [products, setProductsState] = useState<Product[]>(() => load(KEY_PRODUCTS, DEFAULT_PRODUCTS));

  const setDeals = useCallback((fn: (prev: Deal[]) => Deal[]) => {
    setDealsState(prev => { const next = fn(prev); save(KEY_DEALS, next); return next; });
  }, []);

  const setProducts = useCallback((fn: (prev: Product[]) => Product[]) => {
    setProductsState(prev => { const next = fn(prev); save(KEY_PRODUCTS, next); return next; });
  }, []);

  const addDeal    = useCallback((d: Omit<Deal,    'id'>) => setDeals(p    => [...p,    { ...d,    id: uid() }]), [setDeals]);
  const updateDeal = useCallback((d: Deal)                 => setDeals(p    => p.map(x => x.id === d.id ? d : x)), [setDeals]);
  const deleteDeal = useCallback((id: string)              => setDeals(p    => p.filter(x => x.id !== id)), [setDeals]);

  const addProduct    = useCallback((p: Omit<Product,    'id'>) => setProducts(prev => [...prev,    { ...p,    id: uid() }]), [setProducts]);
  const updateProduct = useCallback((p: Product)                 => setProducts(prev => prev.map(x => x.id === p.id ? p : x)), [setProducts]);
  const deleteProduct = useCallback((id: string)                 => setProducts(prev => prev.filter(x => x.id !== id)), [setProducts]);

  const resetToDefaults = useCallback(() => {
    save(KEY_DEALS,    DEFAULT_DEALS);
    save(KEY_PRODUCTS, DEFAULT_PRODUCTS);
    setDealsState(DEFAULT_DEALS);
    setProductsState(DEFAULT_PRODUCTS);
  }, []);

  return { deals, products, addDeal, updateDeal, deleteDeal, addProduct, updateProduct, deleteProduct, resetToDefaults };
}
