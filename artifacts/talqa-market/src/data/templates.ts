export type Category = 'store' | 'clinic' | 'restaurant' | 'cafe' | 'office' | 'realestate' | 'loyalty' | 'personal';

export interface Template {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  features: string[];
  demoUrl: string;
  imageGradient: string;
}

export const templates: Template[] = [
  {
    id: "t-01",
    name: "رونق المتاجر",
    category: "store",
    price: 99,
    description: "قالب عصري ومتكامل للمتاجر الإلكترونية يبرز منتجاتك بأفضل صورة مع تجربة تسوق سلسة.",
    features: ["سلة مشتريات ذكية", "تتبع الطلبات", "دعم بوابات الدفع", "تصميم متجاوب"],
    demoUrl: "#",
    imageGradient: "linear-gradient(135deg, #1e3a8a, #3b82f6)"
  },
  {
    id: "t-02",
    name: "مبيعات بلس",
    category: "store",
    price: 299,
    description: "أقوى قالب مبيعات مصمم للتحويل العالي وبيع المنتجات الرقمية والمادية بكفاءة.",
    features: ["مبيعات سريعة", "كوبونات خصم متقدمة", "لوحة تحكم احترافية", "ربط مع أدوات التسويق"],
    demoUrl: "#",
    imageGradient: "linear-gradient(135deg, #065f46, #10b981)"
  },
  {
    id: "t-03",
    name: "عيادة دنتال",
    category: "clinic",
    price: 99,
    description: "قالب احترافي لعيادات الأسنان والمراكز الطبية يتيح حجز المواعيد وعرض الخدمات.",
    features: ["نظام حجز مواعيد", "ملف الأطباء", "معرض الحالات الطبية", "مدونة صحية"],
    demoUrl: "#",
    imageGradient: "linear-gradient(135deg, #0284c7, #38bdf8)"
  },
  {
    id: "t-04",
    name: "رعاية ميديكال",
    category: "clinic",
    price: 299,
    description: "منصة طبية شاملة تشمل الحجز الذكي وربط ملفات المرضى وتجربة مستخدم مريحة للزوار.",
    features: ["استشارات عن بعد", "باقات طبية", "إدارة الملفات", "واجهة متعددة اللغات"],
    demoUrl: "#",
    imageGradient: "linear-gradient(135deg, #4c1d95, #8b5cf6)"
  },
  {
    id: "t-05",
    name: "مذاق الشيف",
    category: "restaurant",
    price: 99,
    description: "قالب شهي للمطاعم يعرض قائمة الطعام بوضوح ويدعم طلبات التوصيل والاستلام.",
    features: ["قائمة طعام رقمية", "نظام طلبات محلي", "حجز طاولات", "معرض صور الأطباق"],
    demoUrl: "#",
    imageGradient: "linear-gradient(135deg, #991b1b, #ef4444)"
  },
  {
    id: "t-06",
    name: "جراند منيو",
    category: "restaurant",
    price: 299,
    description: "تطبيق مطعم متكامل يحتوي على نظام ولاء وبرنامج مكافآت للمطاعم الفاخرة.",
    features: ["نقاط ومكافآت", "طلبات سريعة", "تكامل مع نقاط البيع", "تطبيق ويب"],
    demoUrl: "#",
    imageGradient: "linear-gradient(135deg, #b45309, #f59e0b)"
  },
  {
    id: "t-07",
    name: "باريستا كافيه",
    category: "cafe",
    price: 99,
    description: "قالب أنيق للمقاهي ومحامص القهوة بتصميم دافئ يعكس هوية القهوة المختصة.",
    features: ["متجر قهوة وأدوات", "نظام الطلب المسبق", "تحديثات المنيو", "مواقع الفروع"],
    demoUrl: "#",
    imageGradient: "linear-gradient(135deg, #451a03, #92400e)"
  },
  {
    id: "t-08",
    name: "أعمال برو",
    category: "office",
    price: 99,
    description: "واجهة رقمية فخمة للشركات والمكاتب الاستشارية لإبراز المشاريع والخدمات.",
    features: ["معرض أعمال", "جدولة استشارات", "صفحات فريق العمل", "تقارير وأخبار"],
    demoUrl: "#",
    imageGradient: "linear-gradient(135deg, #374151, #6b7280)"
  },
  {
    id: "t-09",
    name: "محامينا",
    category: "office",
    price: 299,
    description: "قالب متخصص لمكاتب المحاماة يتيح حجز الاستشارات القانونية والدفع الإلكتروني.",
    features: ["استشارات مدفوعة", "ملفات القضايا", "مكتبة قانونية", "تواصل آمن"],
    demoUrl: "#",
    imageGradient: "linear-gradient(135deg, #111827, #4b5563)"
  },
  {
    id: "t-10",
    name: "إعمار للعقارات",
    category: "realestate",
    price: 299,
    description: "منصة عقارية شاملة لعرض العقارات مع خريطة تفاعلية وفلاتر بحث متقدمة.",
    features: ["بحث متقدم", "جولات افتراضية", "طلبات تمويل", "وكلاء عقاريين"],
    demoUrl: "#",
    imageGradient: "linear-gradient(135deg, #164e63, #0891b2)"
  },
  {
    id: "t-11",
    name: "ولاء المحترفين",
    category: "loyalty",
    price: 299,
    description: "تطبيق ويب متقدم لنظام نقاط ومكافآت يمكن ربطه بأي نشاط تجاري.",
    features: ["محفظة رقمية", "مستويات العضوية", "تنبيهات عروض", "بطاقات هدايا"],
    demoUrl: "#",
    imageGradient: "linear-gradient(135deg, #86198f, #d946ef)"
  },
  {
    id: "t-12",
    name: "هوية بلس",
    category: "personal",
    price: 99,
    description: "موقع شخصي أنيق للمستقلين والمؤثرين لعرض السيرة الذاتية والأعمال.",
    features: ["بورتفوليو سريع", "روابط اجتماعية", "حجز اجتماعات", "مدونة شخصية"],
    demoUrl: "#",
    imageGradient: "linear-gradient(135deg, #9d174d, #f43f5e)"
  }
];

export const categoriesRecord: Record<Category, string> = {
  store: "متاجر",
  clinic: "عيادات",
  restaurant: "مطاعم",
  cafe: "كافيهات",
  office: "مكاتب",
  realestate: "عقار",
  loyalty: "محافظ ولاء",
  personal: "مواقع شخصية"
};
