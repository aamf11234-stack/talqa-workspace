import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lead {
  id?: number;
  name: string;
  clinic: string;
  phone: string;
  message?: string;
  at: string;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('ar-SA', {
      timeZone: 'Asia/Riyadh',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export default function LeadsDashboard() {
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authed, setAuthed] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/leads?password=${encodeURIComponent(password)}`);
      if (res.status === 401) {
        setError('كلمة السر غير صحيحة');
        setLoading(false);
        return;
      }
      if (res.status === 503) {
        setError('اللوحة غير مفعّلة — تأكد من ضبط LEADS_DASHBOARD_PASSWORD');
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError('خطأ في الاتصال بالخادم');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setLeads(data.leads ?? []);
      setTotal(data.total ?? 0);
      setAuthed(true);
    } catch {
      setError('تعذّر الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    if (!authed) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/leads?password=${encodeURIComponent(password)}`);
      const data = await res.json();
      setLeads(data.leads ?? []);
      setTotal(data.total ?? 0);
    } catch {}
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg,#050D1A 0%,#0A1628 50%,#050D1A 100%)' }}
    >
      <div className="container mx-auto px-4 py-12 max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-primary text-sm font-bold tracking-widest uppercase mb-1">
              TALQA TECH · LEADS
            </p>
            <h1 className="text-3xl font-black text-white">
              العملاء المسجّلون
            </h1>
          </div>
          <div className="text-3xl font-black text-white px-4 py-2 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            TALQA <span className="text-primary">TECH</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!authed ? (
            /* Login form */
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-sm mx-auto"
            >
              <div
                className="rounded-2xl p-8"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div className="text-4xl text-center mb-4">🔒</div>
                <h2 className="text-xl font-bold text-white text-center mb-6">
                  ادخل كلمة السر
                </h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="كلمة السر"
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl text-white text-center font-mono tracking-widest outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                    required
                  />
                  {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading || !password}
                    className="w-full py-3 rounded-xl font-bold text-white transition-all disabled:opacity-50"
                    style={{ background: 'var(--primary, #1E5AC8)' }}
                  >
                    {loading ? 'جارٍ...' : 'دخول'}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            /* Dashboard */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Stats bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="px-4 py-2 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <span className="text-gray-400 text-sm">إجمالي العملاء: </span>
                    <span className="text-white font-black text-lg">{total}</span>
                  </div>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#30D158', boxShadow: '0 0 8px #30D158' }}
                  />
                  <span className="text-gray-400 text-sm">مباشر</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {loading ? '...' : '↻ تحديث'}
                  </button>
                  <button
                    onClick={() => { setAuthed(false); setLeads(null); setPassword(''); }}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 transition-all"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    خروج
                  </button>
                </div>
              </div>

              {leads && leads.length === 0 ? (
                <div
                  className="rounded-2xl p-16 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="text-5xl mb-4">📭</div>
                  <p className="text-gray-400 text-lg">لا يوجد عملاء حتى الآن</p>
                  <p className="text-gray-600 text-sm mt-2">ستظهر هنا بمجرد تسجيل أول عميل</p>
                </div>
              ) : (
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {/* Table header */}
                  <div
                    className="grid grid-cols-12 gap-4 px-6 py-3 text-right"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <div className="col-span-3 text-gray-400 text-xs font-bold uppercase tracking-wider">الاسم</div>
                    <div className="col-span-3 text-gray-400 text-xs font-bold uppercase tracking-wider">العيادة</div>
                    <div className="col-span-2 text-gray-400 text-xs font-bold uppercase tracking-wider">الجوال</div>
                    <div className="col-span-3 text-gray-400 text-xs font-bold uppercase tracking-wider">التاريخ</div>
                    <div className="col-span-1 text-gray-400 text-xs font-bold uppercase tracking-wider">تواصل</div>
                  </div>

                  {/* Rows */}
                  {(leads ?? [])
                    .slice()
                    .reverse()
                    .map((lead, i) => (
                    <motion.div
                      key={lead.id ?? i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="grid grid-cols-12 gap-4 px-6 py-4 text-right items-center group"
                      style={{
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                      }}
                    >
                      <div className="col-span-3">
                        <p className="text-white font-semibold text-sm">{lead.name}</p>
                        {lead.message && (
                          <p className="text-gray-500 text-xs mt-0.5 truncate" title={lead.message}>
                            💬 {lead.message}
                          </p>
                        )}
                      </div>
                      <div className="col-span-3">
                        <p className="text-gray-300 text-sm">{lead.clinic}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-300 text-sm font-mono" dir="ltr">
                          +{lead.phone}
                        </p>
                      </div>
                      <div className="col-span-3">
                        <p className="text-gray-500 text-xs">{formatDate(lead.at)}</p>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                          style={{ background: 'rgba(37,211,102,0.15)' }}
                          title="تواصل واتساب"
                        >
                          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#25D366">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Export hint */}
              <p className="text-gray-600 text-xs text-center mt-6">
                لتصدير البيانات: ملف leads.json متاح مباشرةً على الخادم
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
