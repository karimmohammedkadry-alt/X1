import React from 'react';
import { ArrowDownRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onExploreClick }) => {
  const isAr = language === 'ar';

  return (
    <section className="relative w-full overflow-hidden border-b border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0d0e] transition-colors">
      {/* 16:9 Cinematic Visual Frame */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pt-10 lg:pb-16">
        
        {/* Main Hero Card Container with Image Backing */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] border border-neutral-200 dark:border-white/10 group shadow-lg">
          <img
            src="/src/assets/images/hero_x1_campaign_1794440454137.jpg"
            alt="X1 Studios Editorial Lookbook"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05] group-hover:scale-[1.01] transition-transform duration-700 ease-out"
          />

          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
          
          {/* Subtle Side Tonal Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

          {/* Foreground Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14 max-w-3xl">
            
            {/* Unboxed Metadata Header */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300 mb-3">
              <span>{isAr ? 'كولكشن 01' : 'COLLECTION 01'}</span>
              <span aria-hidden="true">·</span>
              <span>{isAr ? 'قصات معمارية' : 'ARCHITECTURAL CUTS'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-white font-semibold">{isAr ? 'إصدار خريف وشتاء' : 'FW26 DROP'}</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4 text-balance">
              {isAr ? (
                <>
                  ستريت وير فاخر. <br />
                  <span className="text-neutral-300 font-normal">خامات فائقة الثقل وتفاصيل معمارية.</span>
                </>
              ) : (
                <>
                  HEAVYWEIGHT FORM. <br />
                  <span className="text-neutral-300 font-normal">ARCHITECTURAL SILHOUETTES.</span>
                </>
              )}
            </h1>

            {/* Subtitle / Manifesto */}
            <p className="text-sm sm:text-base text-neutral-200 max-w-xl mb-6 font-light leading-relaxed">
              {isAr
                ? 'علامة تجارية معاصرة تمزج بين دقة الخياطة والراحة المطلقة. صُنع بأقمشة قطنية فائقة الكثافة تصل إلى 480 جرام/م² لمعايير لا تقبل المساومة.'
                : 'Contemporary streetwear designed with deliberate weight and structure. Engineered from custom 300–480 GSM textiles with precision minimalist finishes.'}
            </p>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-white text-black font-semibold text-sm rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2 font-mono whitespace-nowrap shadow-md cursor-pointer"
              >
                <span>{isAr ? 'تصفح المجموعة بالكامل' : 'EXPLORE COLLECTION'}</span>
                <ArrowDownRight className={`w-4 h-4 ${isAr ? 'rotate-90' : ''}`} />
              </button>

              <a
                href="#craftsmanship"
                className="px-5 py-3.5 bg-black/60 hover:bg-black/80 text-white font-medium text-sm rounded-lg border border-white/20 transition-colors whitespace-nowrap backdrop-blur-sm"
              >
                {isAr ? 'فلسفة التصنيع والخامات' : 'Textile Standard'}
              </a>
            </div>

          </div>
        </div>

        {/* Full-width 3-Column Trust Strip below hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-white/[0.06] transition-colors">
            <div className="p-2.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                {isAr ? 'شحن سريع ومجاني' : 'Express Tracked Delivery'}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {isAr ? 'توصيل مجاني للطلبات فوق 1500 ج.م' : 'Complimentary shipping over 1500 EGP'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-white/[0.06] transition-colors">
            <div className="p-2.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                {isAr ? 'أقمشة فائقة الثقل 300–480 GSM' : 'Heavyweight 300-480 GSM'}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {isAr ? 'قطن مصري ممشط معالج ضد الانكماش والوبر' : 'Pre-shrunk, dense combed organic cotton'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-white/[0.06] transition-colors">
            <div className="p-2.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                {isAr ? 'استبدال واسترجاع سهل خلال 14 يوماً' : '14-Day Free Exchange'}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {isAr ? 'معاينة المنتج قبل الاستلام والدفع عند الباب' : 'Inspect before payment & Cash on Delivery'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
