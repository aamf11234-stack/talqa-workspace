import { motion } from 'framer-motion';

const WA = 'https://wa.me/966551378531';

export default function Hero() {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      paddingTop: 128, paddingBottom: 96,
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      {/* Warm glow backdrop */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100vw', height: '100vh',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(216,203,181,0.35) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Main Content */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: 1000, margin: '0 auto',
          padding: '0 24px', textAlign: 'center',
        }}>
        
        {/* Top Badge */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } }
          }}
          style={{ marginBottom: 32, display: 'flex', justifyContent: 'center' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 20px', borderRadius: 9999,
            border: '1px solid #D4C9B5',
            background: '#EAE3D2',
            fontSize: 14, fontWeight: 500,
            color: '#5C524E',
          }}>
            ✦ الجيل الجديد من منصات الأعمال العربية
          </span>
        </motion.div>

        {/* Headline */}
        <h1 style={{ 
          margin: '0 0 24px 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
        }}>
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } }
            }}
            style={{ 
              fontWeight: 400, 
              color: '#5C524E',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            }}>
            المنصة الواحدة لكل
          </motion.span>
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } }
            }}
            style={{ 
              fontWeight: 800, 
              lineHeight: 1.15, 
              fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', 
              letterSpacing: '-0.03em', 
              color: '#1A1208',
            }}>
            مطعم، نادي، فعالية، متجر
          </motion.span>
        </h1>

        {/* Subheadline */}
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } }
          }}
          style={{ 
            fontSize: '1.15rem', 
            fontWeight: 400, 
            color: '#5C524E', 
            lineHeight: 1.8, 
            maxWidth: 520, 
            margin: '0 auto 40px',
          }}>
          أطلق موقعك أو تطبيقك في دقائق — بدون خبرة تقنية. ادفع مرة، امتلك إلى الأبد.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } }
          }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{ 
              background: '#2C221E', color: '#FAF8F5', 
              padding: '14px 28px', borderRadius: 9999, fontSize: 16, fontWeight: 600, 
              textDecoration: 'none', transition: 'transform 0.25s ease, background 0.25s ease',
            }}
            onMouseEnter={e => { 
              (e.currentTarget as HTMLElement).style.background = '#3D2E28';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
            }}
            onMouseLeave={e => { 
              (e.currentTarget as HTMLElement).style.background = '#2C221E';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
            data-testid="button-cta-start">
            ابدأ مشروعك مجاناً
          </a>
          <a href="#demo" 
            style={{ 
              background: 'transparent', color: '#2C221E', border: '2px solid #2C221E',
              padding: '12px 28px', borderRadius: 9999, fontSize: 16, fontWeight: 600, 
              textDecoration: 'none', transition: 'transform 0.25s ease, background 0.25s ease',
            }}
            onMouseEnter={e => { 
              (e.currentTarget as HTMLElement).style.background = '#F0EBE3';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
            }}
            onMouseLeave={e => { 
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
            data-testid="button-demo">
            شاهد كيف تعمل
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.7 } }
          }}
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: 12,
            marginTop: 24,
            marginBottom: 64,
            color: '#9C8F85',
            fontSize: 13,
            fontWeight: 500,
          }}>
          <span>٢٠٠+ مشروع مُنجز</span>
          <span>·</span>
          <span>٩٨٪ رضا العملاء</span>
          <span>·</span>
          <span>دعم ٢٤/٧</span>
        </motion.div>

        {/* Device Mockup Showcase */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16,1,0.3,1] } }
          }}
          style={{ 
            position: 'relative',
            height: 460,
            maxWidth: 800,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          
          {/* CARD 2 - Left (Fitness) */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', left: '10%', top: 60,
              width: 260, height: 320,
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid #EAE3D2',
              boxShadow: '0 24px 64px rgba(44,34,30,0.08)',
              transform: 'rotate(-8deg)',
              zIndex: 1,
              overflow: 'hidden',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', borderBottom: '1px solid #EAE3D2' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ height: 60, borderRadius: 12, background: 'linear-gradient(135deg, #E8E0D0 0%, #D4C9B5 100%)', marginBottom: 12 }} />
              <div style={{ height: 40, borderRadius: 8, background: '#F5F2EB', marginBottom: 8 }} />
              <div style={{ height: 40, borderRadius: 8, background: '#F5F2EB', marginBottom: 8 }} />
              <div style={{ height: 40, borderRadius: 8, background: '#F5F2EB' }} />
            </div>
          </motion.div>

          {/* CARD 3 - Right (Events) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            style={{
              position: 'absolute', right: '10%', top: 80,
              width: 240, height: 280,
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid #EAE3D2',
              boxShadow: '0 24px 64px rgba(44,34,30,0.08)',
              transform: 'rotate(6deg)',
              zIndex: 1,
              overflow: 'hidden',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', borderBottom: '1px solid #EAE3D2' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ height: 80, borderRadius: 12, background: 'linear-gradient(135deg, #F5F2EB 0%, #EAE3D2 100%)' }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1, height: 60, borderRadius: 8, background: '#F5F2EB' }} />
                <div style={{ flex: 1, height: 60, borderRadius: 8, background: '#F5F2EB' }} />
              </div>
            </div>
          </motion.div>

          {/* CARD 1 - Main Center */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{
              position: 'relative', zIndex: 3,
              width: 420, height: 420,
              background: '#FFFFFF',
              borderRadius: 28,
              border: '1px solid #EAE3D2',
              boxShadow: '0 32px 80px rgba(44,34,30,0.14)',
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}>
            {/* Fake browser chrome */}
            <div style={{ 
              display: 'flex', alignItems: 'center', padding: '16px 20px', 
              borderBottom: '1px solid #EAE3D2', gap: 16 
            }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <div style={{ 
                flex: 1, height: 6, background: '#F5F2EB', borderRadius: 99, 
                maxWidth: 140, margin: '0 auto' 
              }} />
            </div>
            
            {/* Fake restaurant app */}
            <div style={{ flex: 1, background: '#FAF8F5', padding: 16 }}>
              {/* Header strip */}
              <div style={{ 
                height: 40, background: '#EAE3D2', borderRadius: '8px 8px 0 0', 
                display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                <div style={{ width: 96, height: 12, background: '#D4C9B5', borderRadius: 6 }} />
              </div>
              
              {/* Hero image block */}
              <div style={{ 
                height: 112, background: 'linear-gradient(135deg, #EAE3D2 0%, #D8CBB5 100%)', 
                borderRadius: 16, margin: '12px 16px',
              }} />

              {/* Two product cards */}
              <div style={{ display: 'flex', gap: 12, padding: '0 16px' }}>
                <div style={{ 
                  flex: 1, background: '#FFFFFF', borderRadius: 12, padding: 12, 
                  border: '1px solid #EAE3D2' 
                }}>
                  <div style={{ height: 48, background: '#F0EBE3', borderRadius: 8, marginBottom: 8 }} />
                  <div style={{ height: 8, width: 64, background: '#EAE3D2', borderRadius: 4, marginBottom: 4 }} />
                  <div style={{ height: 8, width: 40, background: '#EAE3D2', borderRadius: 4 }} />
                </div>
                <div style={{ 
                  flex: 1, background: '#FFFFFF', borderRadius: 12, padding: 12, 
                  border: '1px solid #EAE3D2' 
                }}>
                  <div style={{ height: 48, background: '#F0EBE3', borderRadius: 8, marginBottom: 8 }} />
                  <div style={{ height: 8, width: 64, background: '#EAE3D2', borderRadius: 4, marginBottom: 4 }} />
                  <div style={{ height: 8, width: 40, background: '#EAE3D2', borderRadius: 4 }} />
                </div>
              </div>
            </div>

            {/* Bottom nav */}
            <div style={{ 
              height: 64, background: '#FFFFFF', borderTop: '1px solid #EAE3D2',
              display: 'flex', alignItems: 'center', justifyContent: 'space-around',
              padding: '0 24px'
            }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ width: 20, height: 20, borderRadius: '50%', background: '#EAE3D2' }} />
              ))}
            </div>
          </motion.div>

        </motion.div>
      </motion.div>

      <style>{`
        @media(max-width:768px) {
          section > div > div:last-child > div:nth-child(1),
          section > div > div:last-child > div:nth-child(2) {
            display: none !important;
          }
          section > div > div:last-child > div:nth-child(3) {
            width: 100% !important;
            max-width: 320px !important;
          }
        }
      `}</style>
    </section>
  );
}