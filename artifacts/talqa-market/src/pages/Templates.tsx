import { useState } from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Stethoscope, Dumbbell, ShoppingBag } from "lucide-react";

type Category = "كل القوالب" | "مطاعم" | "عيادات" | "نوادي" | "متاجر";

const templates = [
  { id:1, name:"مطعم كلاسيك", sector:"مطاعم", price:"٩٩", badge:"الأكثر طلباً" },
  { id:2, name:"كافيه مودرن", sector:"مطاعم", price:"٩٩", badge:null },
  { id:3, name:"مطعم فاخر", sector:"مطاعم", price:"١٤٩", badge:"جديد" },
  { id:4, name:"عيادة طبية", sector:"عيادات", price:"١٢٩", badge:"الأكثر طلباً" },
  { id:5, name:"مركز صحي", sector:"عيادات", price:"١٢٩", badge:null },
  { id:6, name:"عيادة أسنان", sector:"عيادات", price:"١٤٩", badge:null },
  { id:7, name:"نادي رياضي", sector:"نوادي", price:"١١٩", badge:"جديد" },
  { id:8, name:"جيم مودرن", sector:"نوادي", price:"١١٩", badge:null },
  { id:9, name:"يوغا وسبا", sector:"نوادي", price:"٩٩", badge:null },
  { id:10, name:"متجر ملابس", sector:"متاجر", price:"٩٩", badge:null },
  { id:11, name:"متجر إلكترونيات", sector:"متاجر", price:"١٢٩", badge:null },
  { id:12, name:"مكتب خدمات", sector:"متاجر", price:"٩٩", badge:null },
];

const categoryTabs: Category[] = ["كل القوالب", "مطاعم", "عيادات", "نوادي", "متاجر"];

const getSectorIcon = (sector: string) => {
  switch(sector) {
    case "مطاعم": return <UtensilsCrossed size={32} className="text-[#5C524E]" />;
    case "عيادات": return <Stethoscope size={32} className="text-[#5C524E]" />;
    case "نوادي": return <Dumbbell size={32} className="text-[#5C524E]" />;
    case "متاجر": return <ShoppingBag size={32} className="text-[#5C524E]" />;
    default: return <ShoppingBag size={32} className="text-[#5C524E]" />;
  }
};

export default function Templates() {
  const [activeTab, setActiveTab] = useState<Category>("كل القوالب");

  const filteredTemplates = activeTab === "كل القوالب" 
    ? templates 
    : templates.filter(t => t.sector === activeTab);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[#1A1208] mb-4">اختر قالبك</h2>
          <p className="text-[#5C524E] text-xl">١٢+ قالب جاهز لكل قطاع</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto gap-3 pb-4 mb-12 justify-start md:justify-center no-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {categoryTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-base font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#2C221E] text-[#FAF8F5]"
                  : "border border-[#EAE3D2] text-[#5C524E] hover:bg-[#F5F2EB] bg-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, i) => (
            <motion.div
              key={template.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 24 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl border border-[#EAE3D2] overflow-hidden group hover:shadow-[0_8px_32px_rgba(44,34,30,0.10)] hover:-translate-y-1 transition-all duration-300 relative flex flex-col"
            >
              {/* Preview Block */}
              <div className="h-48 w-full bg-gradient-to-br from-[#EAE3D2] to-[#D8CBB5] flex items-center justify-center relative">
                {getSectorIcon(template.sector)}
                {template.badge && (
                  <span className="absolute top-3 right-3 bg-[#2C221E] text-[#FAF8F5] text-xs font-bold rounded-full px-3 py-1">
                    {template.badge}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-[600] text-[#1A1208] text-xl">{template.name}</h3>
                  <span className="bg-[#F5F2EB] text-[#9C8F85] text-xs font-medium rounded-full px-3 py-1">
                    {template.sector}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#EAE3D2]/50">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#2C221E] font-bold text-2xl">{template.price}</span>
                    <span className="text-[#9C8F85] text-sm font-medium">ريال/شهر</span>
                  </div>
                  <a
                    href="https://wa.me/966551378531"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#2C221E] text-[#FAF8F5] text-sm font-semibold rounded-full px-5 py-2 hover:bg-[#3D2E28] transition-colors"
                  >
                    اختر القالب
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-20 text-[#9C8F85] text-lg">
            لا توجد قوالب متوفرة حالياً في هذا القسم.
          </div>
        )}

      </div>
    </div>
  );
}
