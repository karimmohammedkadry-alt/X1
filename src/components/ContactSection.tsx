import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const isAr = language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'order',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', subject: 'order', message: '' });
    }, 3500);
  };

  const faqs = [
    {
      qAr: 'هل يمكنني معاينة الملابس وقياسها قبل الدفع لمندوب الشحن؟',
      qEn: 'Can I inspect and try on the pieces before paying the courier?',
      aAr: 'نعم، بكل تأكيد! نوفر خدمة المعاينة عند الاستلام؛ يمكنك فحص خامة القطعة ومقاسها وجودة الخياطة قبل دفع المبلغ للمندوب.',
      aEn: 'Yes! We support full inspection upon delivery; you can examine the textile weight, size, and seams before completing payment.'
    },
    {
      qAr: 'ما هي المدة المتوقعة لتوصيل الطلب داخل مصر ودول الخليج؟',
      qEn: 'What is the estimated delivery timeframe?',
      aAr: 'التوصيل داخل القاهرة والجيزة والإسكندرية يستغرق 24 إلى 48 ساعة فقط. باقي المحافظات خلال 3 أيام عمل. الشحن لدول الخليج (السعودية والإمارات) يستغرق 3 إلى 5 أيام عمل.',
      aEn: 'Orders within Cairo, Giza, and Alexandria deliver within 24–48 hours. Other Egyptian governorates take 3 business days. GCC express shipping takes 3–5 days.'
    },
    {
      qAr: 'كيف تختلف خامات X1 الثقيلة (480 GSM) عن الملابس العادية؟',
      qEn: 'How does X1 480 GSM fabric differ from standard commercial apparel?',
      aAr: 'معظم الهوديز التجارية تستخدم قطن خفيف 240-280 GSM ممزوج بالبوليستر. نحن ننسج قطناً مصرياً عضوياً ممشطاً 100% بكثافة 480 GSM بدون إضافات صناعية، مما يمنح القطعة وزناً فخماً وقواماً ثابتاً لا يهبط.',
      aEn: 'Standard fast fashion hoodies use 240–280 GSM polyester blends. X1 knits 100% organic combed cotton at 480 GSM with zero synthetics, yielding permanent architectural drape.'
    }
  ];

  return (
    <section id="contact" className="py-20 border-b border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0d0e] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
            {isAr ? 'قنوات التواصل المباشر' : 'DIRECT CLIENT LIAISON'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            {isAr ? 'تواصل مع فريق استوديو X1' : 'Get in Touch with X1 Studios'}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 font-light">
            {isAr
              ? 'فريق خدمة العملاء متواجد لمساعدتك في استفسارات المقاسات، الشحنات الخاصة، أو حجز موعد في الاستوديو.'
              : 'Our client team is available to assist with custom sizing, order dispatch, or showroom reservations.'}
          </p>
        </div>

        {/* 2-Column Main Contact Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Direct Action Channels & Showroom Info */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Quick Action Card */}
            <a
              href="https://wa.me/201029384756?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D8%A8%D8%B1%D8%A7%D9%86%D8%AF%20X1%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%82%D8%B7%D8%B9%20%D8%A7%D9%84%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A9"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/[0.08] border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-lg bg-emerald-500 text-white shadow-md">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-emerald-700 dark:text-emerald-400 font-bold">
                    {isAr ? 'واتساب الدعم السريع' : 'Instant WhatsApp'}
                  </div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white">
                    +20 10 2938 4756
                  </div>
                  <div className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {isAr ? 'متوسط الرد: أقل من 10 دقائق' : 'Avg. response under 10 mins'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                {isAr ? 'محادثة الآن ←' : 'Chat Now →'}
              </span>
            </a>

            {/* Direct Phone Support */}
            <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/[0.06] flex items-center gap-3.5">
              <div className="p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400">
                  {isAr ? 'الخط الساخن للمبيعات' : 'Client Care Line'}
                </div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white font-mono">
                  +20 10 2938 4756
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {isAr ? 'يومياً من 11 صباحاً حتى 11 مساءً' : 'Daily 11:00 AM – 11:00 PM'}
                </div>
              </div>
            </div>

            {/* Showroom & Studio Address */}
            <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/[0.06] space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400">
                    {isAr ? 'مقر واستوديو التصميم' : 'Studio & Flagship Space'}
                  </div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                    {isAr ? 'حي التصميم، التجمع الخامس، القاهرة، مصر' : 'Design District, New Cairo, Egypt'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-200 dark:border-white/[0.06]">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>{isAr ? 'السبت – الخميس: 12:00 م – 10:00 م' : 'Sat – Thu: 12:00 PM – 10:00 PM'}</span>
              </div>
            </div>

            {/* Email Support */}
            <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/[0.06] flex items-center gap-3.5">
              <div className="p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400">
                  {isAr ? 'البريد الإلكتروني الرسمي' : 'Official Enquiries'}
                </div>
                <div className="text-xs font-semibold text-neutral-900 dark:text-white font-mono">
                  contact@x1studios.com
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-neutral-50 dark:bg-[#121316] p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-white/[0.08]">
            <h3 className="text-base font-bold font-mono tracking-tight text-neutral-900 dark:text-white uppercase mb-1">
              {isAr ? 'أرسل استفسارك أو طلبك الخاص' : 'Send an Inquiry'}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              {isAr ? 'سنرد عليك عبر واتساب أو الهاتف خلال ساعات العمل' : 'Our team will get back to you via WhatsApp or phone promptly.'}
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-white dark:bg-neutral-900 rounded-xl border border-emerald-500/30">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-mono">
                  {isAr ? 'تم استلام رسالتك بنجاح!' : 'Message Dispatched Successfully'}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                  {isAr ? 'سيتواصل معك أحد مسؤولي استوديو X1 خلال وقت وجيز.' : 'An X1 client specialist will reach out to you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1">
                      {isAr ? 'الاسم بالكامل *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isAr ? 'مثال: أحمد فريد' : 'e.g. Ahmed Farid'}
                      className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1">
                      {isAr ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010XXXXXXXX"
                      className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1">
                      {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1">
                      {isAr ? 'موضوع الاستفسار' : 'Subject'}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-500"
                    >
                      <option value="order">{isAr ? 'استفسار عن طلب أو تتبع شحنة' : 'Order or Delivery Inquiry'}</option>
                      <option value="sizing">{isAr ? 'مساعدة في اختيار المقاس المناسب' : 'Size Consultation'}</option>
                      <option value="showroom">{isAr ? 'زيارة مقر الاستوديو والمعاينة' : 'Studio / Showroom Visit'}</option>
                      <option value="wholesale">{isAr ? 'شراكات تجارية وتوزيع (B2B)' : 'Wholesale / B2B'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1">
                    {isAr ? 'تفاصيل الرسالة *' : 'Your Message *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isAr ? 'اكتب ما تود الاستفسار عنه هنا...' : 'How can we assist you today?'}
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-mono text-xs font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إرسال الرسالة الآن' : 'DISPATCH MESSAGE'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

        {/* FAQs Accordion Strip */}
        <div className="pt-10 border-t border-neutral-200 dark:border-white/[0.08]">
          <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-6 font-bold">
            {isAr ? 'الأسئلة الشائعة حول براند X1' : 'Frequently Asked Questions'}
          </h3>

          <div className="divide-y divide-neutral-200 dark:divide-white/[0.06] border border-neutral-200 dark:border-white/[0.06] rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-900/40">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 sm:p-5">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left sm:text-right gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                    {isAr ? faq.qAr : faq.qEn}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform ${openFaq === idx ? 'rotate-180 text-neutral-900 dark:text-white' : ''}`}
                  />
                </button>

                {openFaq === idx && (
                  <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-light animate-in fade-in">
                    {isAr ? faq.aAr : faq.aEn}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
