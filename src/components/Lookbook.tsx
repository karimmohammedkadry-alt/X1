import React from 'react';
import { Layers, Compass, Scissors } from 'lucide-react';
import { Language } from '../types';

interface LookbookProps {
  language: Language;
}

export const Lookbook: React.FC<LookbookProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <section id="craftsmanship" className="py-20 border-b border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-[#0d0e10] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
            {isAr ? 'فلسفة التصنيع والمواد' : 'ARCHITECTURAL CONSTRUCT'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
            {isAr ? (
              <>
                معايير هندسية متطرفة. <br />
                <span className="text-neutral-500 dark:text-neutral-400 font-normal">خامات صُنعت لتدوم لسنوات، لا لموسم واحد.</span>
              </>
            ) : (
              <>
                THE X1 MATERIAL STANDARD. <br />
                <span className="text-neutral-500 dark:text-neutral-400 font-normal">Engineered to endure beyond seasonal obsolescence.</span>
              </>
            )}
          </h2>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131417] border border-neutral-200 dark:border-white/[0.06] hover:border-neutral-400 dark:hover:border-white/20 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-900 dark:text-white mb-5">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              {isAr ? 'كثافة غير مسبوقة' : 'FABRIC DENSITY'}
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
              {isAr ? 'قطن 480 GSM فرينش تيري' : '480 GSM French Terry'}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {isAr
                ? 'نبتعد تماماً عن أقمشة البوليستر الخفيفة. يتم نسج كل قطعة من قطن مصري عضوي ممشط بكثافة ألياف مضاعفة لتعطيك وزناً وقواماً معمارياً ثابتاً.'
                : 'Free from synthetic fillers. Spun from 100% combed long-staple organic cotton with double-needle reinforcement for permanent structural drape.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#131417] border border-neutral-200 dark:border-white/[0.06] hover:border-neutral-400 dark:hover:border-white/20 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-900 dark:text-white mb-5">
              <Scissors className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              {isAr ? 'الهندسة والقصّ' : 'STRUCTURAL SILHOUETTE'}
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
              {isAr ? 'قصة بوكسي بأكتاف ساقطة' : 'Drop-Shoulder Boxy Silhouette'}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {isAr
                ? 'تم دراسة كل سنتيمتر في وسع الصدر وتطابق حاشية الخصر. لا توجد أربطة تتدلى أو ياقات ترتخي بعد أول غسلة.'
                : 'Rigorous geometric proportions balancing shoulder drop and waist rib tension. Double-layered drawstring-free hoods that hold their architectural cowl.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#131417] border border-neutral-200 dark:border-white/[0.06] hover:border-neutral-400 dark:hover:border-white/20 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-900 dark:text-white mb-5">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              {isAr ? 'التفاصيل الصلبة' : 'TECHNICAL FINISH'}
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
              {isAr ? 'إكسسوارات تيتانيوم ومغناطيس' : 'Matte Hardware & Precision'}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {isAr
                ? 'سحابات معدنية ثنائية مطفية، جيوب كارغو بإغلاق مغناطيسي خفي، وأزرار محفورة بالليزر بشعار X1 المتجانس مع لون القطعة.'
                : 'Heavy industrial matte two-way zippers, silent neodymium magnetic pocket closures, and micro-embossed tonal branding.'}
            </p>
          </div>

        </div>

        {/* Editorial Visual Feature: Split Showcase */}
        <div id="lookbook" className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#121316] shadow-md transition-colors">
          
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3">
                {isAr ? 'بيان الهوية // X1' : 'THE X1 IDENTITY'}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4 text-balance">
                {isAr ? 'لسنا مجرد براند ملابس؛ نحن تجربة في إعادة تعريف الستريت وير المعاصر.' : 'More than apparel. An exploration of heavy architectural silhouette.'}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light mb-6">
                {isAr
                  ? 'انطلقت X1 من الرغبة في التوقف عن شراء الملابس السريعة التي تفقد شكلها بعد غسلتين. أردنا إنتاج ملابس تمتلك وزناً حقيقياً في اليد، وتمنحك ثقة كاملة عند ارتدائها.'
                  : 'X1 was forged from an obsession with weight and tactile permanence. Every silhouette undergoes enzyme washing and structural tension tests before entering production.'}
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <span>{isAr ? 'تصميم وصناعة بأعلى معايير' : 'Engineered in Cairo'}</span>
              <span className="text-neutral-900 dark:text-white font-semibold">{isAr ? 'إصدار محدود' : 'Limited Batch Production'}</span>
            </div>
          </div>

          <div className="relative aspect-[4/3] lg:aspect-auto">
            <img
              src="/src/assets/images/hero_x1_campaign_1794440454137.jpg"
              alt="X1 Lookbook Campaign"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-[1.08] brightness-[0.9]"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
