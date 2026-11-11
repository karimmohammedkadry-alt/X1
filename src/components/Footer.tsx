import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-neutral-100 dark:bg-[#08090a] border-t border-neutral-200 dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-200 dark:border-white/[0.06]">
          
          {/* Brand Vision Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-mono text-xl font-bold">
              <span className="bg-neutral-900 text-white dark:bg-white dark:text-black px-1.5 py-0.5 text-base">X1</span>
              <span>STUDIOS</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              {isAr
                ? 'علامة ملابس معاصرة متخصصة في الستريت وير الفاخر. تصاميم معمارية، أقمشة فائقة الثقل، وتفاصيل دقيقة صُنعت لتدوم.'
                : 'Contemporary streetwear label exploring heavy textile drape, drop shoulders, and architectural menswear cuts.'}
            </p>
            <div className="text-[11px] font-mono text-neutral-500">
              {isAr ? 'القاهرة · حي التصميم' : 'CAIRO · DESIGN DISTRICT'}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
              {isAr ? 'المجموعة والتسوق' : 'COLLECTIONS'}
            </div>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <a href="#collection" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  {isAr ? 'أحدث الإصدارات (FW26)' : 'Latest Drop (FW26)'}
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  {isAr ? 'الهوديز الثقيلة 480 GSM' : '480 GSM French Terry'}
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  {isAr ? 'الجاكيتات التكنيكال' : 'Technical Outerwear'}
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  {isAr ? 'بناطيل الكارغو الوايد' : 'Tailored Cargo Trousers'}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
              {isAr ? 'خدمة العملاء' : 'CLIENT SERVICES'}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#craftsmanship" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  {isAr ? 'جدول القياسات والتفصيل' : 'Size & Fit Specification'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  {isAr ? 'سياسة الاستبدال خلال 14 يوماً' : '14-Day Exchange Policy'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  {isAr ? 'الدفع عند الاستلام مع المعاينة' : 'Cash on Delivery with Inspection'}
                </a>
              </li>
              <li>
                <a href="https://wa.me/201029384756" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-white transition-colors font-mono">
                  {isAr ? 'واتساب الدعم: 01029384756' : 'Client Support WhatsApp: +201029384756'}
                </a>
              </li>
            </ul>
          </div>

          {/* VIP Drop Access Newsletter */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
              {isAr ? 'النشرة الحصرية للإصدارات' : 'VIP DROP ACCESS'}
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs font-light">
              {isAr
                ? 'سجّل بريدك الإلكتروني للحصول على إشعار مسبق قبل نفاذ كمية الإصدارات المحدودة.'
                : 'Subscribe to receive priority access 1 hour before limited edition drops go live.'}
            </p>

            {subscribed ? (
              <div className="p-3 bg-white dark:bg-neutral-900 border border-emerald-500/40 rounded-lg text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>{isAr ? 'تم تسجيل بريدك في قائمة VIP بنجاح' : 'You are on the VIP drop list'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isAr ? 'بريدك الإلكتروني...' : 'your@email.com'}
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500 font-mono"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-neutral-900 text-white dark:bg-white dark:text-black rounded-md hover:bg-black dark:hover:bg-neutral-200 transition-colors"
                  >
                    {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Notes */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} X1 STUDIOS APPAREL. {isAr ? 'جميع الحقوق محفوظة.' : 'ALL RIGHTS RESERVED.'}
          </div>
          
          <div className="flex items-center gap-4">
            <span>{isAr ? 'دفع عند الاستلام' : 'Cash on Delivery'}</span>
            <span>·</span>
            <span>Visa / Mastercard</span>
            <span>·</span>
            <span>InstaPay</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
