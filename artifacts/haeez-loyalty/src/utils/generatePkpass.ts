import JSZip from 'jszip';

/* ─────────────────────────────────────────────────────────────────
   Brown Dose — Apple Wallet Pass
   • iOS Safari   → navigates to API server endpoint (proper MIME)
   • Desktop/other → JSZip blob download (for testing/demo)
───────────────────────────────────────────────────────────────── */

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as Record<string, unknown>).MSStream;
}

async function toBase64(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return '';
  }
}

export async function downloadPkpass(base: string, opts?: {
  name?: string; points?: string | number; tier?: string;
}) {
  const name   = opts?.name   ?? 'عبدالإله علي';
  const points = String(opts?.points ?? 480);
  const tier   = opts?.tier   ?? 'كلاسيك';

  /* ── iOS: navigate to API server (correct MIME type → opens Wallet) */
  if (isIOS()) {
    const params = new URLSearchParams({ name, points, tier });
    // Relative path works because Replit routes /api/* to the API server artifact
    window.location.href = `/api/wallet/browndose?${params.toString()}`;
    return;
  }

  /* ── Desktop / Android: JSZip blob download ────────────────────── */
  const zip = new JSZip();

  const pass = {
    formatVersion: 1,
    passTypeIdentifier: 'pass.sa.browndose.loyalty',
    serialNumber: `BD-${Date.now()}`,
    teamIdentifier: 'BROWNDOSE1',
    organizationName: 'Brown Dose',
    description: 'بطاقة ولاء براون دوز',
    logoText: 'Brown Dose',
    foregroundColor: 'rgb(255,255,255)',
    backgroundColor: 'rgb(26, 8, 4)',
    labelColor: 'rgb(196,120,58)',
    storeCard: {
      headerFields:    [{ key: 'points', label: 'POINTS',     value: points }],
      primaryFields:   [{ key: 'name',   label: 'CARDHOLDER', value: name   }],
      secondaryFields: [
        { key: 'tier',   label: 'LEVEL',    value: tier },
        { key: 'branch', label: 'BRANCHES', value: 'صبيا · جيزان · ضمد' },
      ],
      auxiliaryFields: [
        { key: 'member', label: 'MEMBER SINCE', value: '٢٠٢٤' },
        { key: 'next',   label: 'TO SILVER',    value: `${Math.max(0, 700 - Number(points))} نقطة` },
      ],
      backFields: [
        { key: 'info',   label: 'عن البطاقة', value: 'تجمع النقاط تلقائياً مع كل طلب. ١٥ نقطة = ١ ريال خصم.' },
        { key: 'redeem', label: 'كيف أستبدل', value: 'اعرض الرمز عند الصندوق أو استخدم التطبيق.' },
        { key: 'web',    label: 'الموقع',      value: 'browndose.sa' },
      ],
    },
    barcodes: [{ message: `BD-2024-8821`, format: 'PKBarcodeFormatQR', messageEncoding: 'iso-8859-1', altText: '#BD-2024-8821' }],
    locations: [
      { longitude: 42.5611, latitude: 17.0039, relevantText: 'براون دوز جيزان' },
      { longitude: 42.6237, latitude: 17.1455, relevantText: 'براون دوز صبيا'  },
    ],
    maxDistance: 500,
  };

  zip.file('pass.json', JSON.stringify(pass, null, 2));

  const icon1px = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const logoB64  = await toBase64(`${base}browndose-logo.png`) || icon1px;
  const stripB64 = await toBase64(`${base}bd-hero.jpg`)        || icon1px;

  const toBytes = (b64: string) => Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  zip.file('icon.png',     toBytes(icon1px));
  zip.file('icon@2x.png',  toBytes(icon1px));
  zip.file('logo.png',     toBytes(logoB64));
  zip.file('logo@2x.png',  toBytes(logoB64));
  zip.file('strip.png',    toBytes(stripB64));
  zip.file('strip@2x.png', toBytes(stripB64));
  zip.file('manifest.json', JSON.stringify({ 'pass.json': '0', 'icon.png': '0', 'logo.png': '0', 'strip.png': '0' }));
  zip.file('signature', new Uint8Array(0));

  const blob = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.apple.pkpass' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: 'browndose-loyalty.pkpass' });
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 2000);
}
