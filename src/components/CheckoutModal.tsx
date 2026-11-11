import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, Smartphone, Copy, Check } from 'lucide-react';
import { CartItem, Language } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  language: Language;
  discountAmount: number;
  promoApplied: string;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  language,
  discountAmount,
  promoApplied,
  onClearCart
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'القاهرة',
    address: '',
    notes: '',
    paymentMethod: 'cod' // 'cod' | 'card' | 'wallet'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [copiedTracking, setCopiedTracking] = useState(false);

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.product.priceEGP * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const freeThreshold = 1500;
  const shippingFee = subtotal >= freeThreshold ? 0 : 65;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const formatPrice = (amount: number) => `${amount} ج.م`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `X1-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onClearCart();
    }, 1000);
  };

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(confirmedOrderId);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#121316] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 text-neutral-900 dark:text-neutral-100 my-auto transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-white/[0.08] flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/50">
          <div>
            <h3 className="text-base font-bold font-mono tracking-tight text-neutral-900 dark:text-white uppercase">
              {orderConfirmed 
                ? (isAr ? 'تم تأكيد طلبك بنجاح' : 'Order Confirmed') 
                : (isAr ? 'إنهاء الطلب والتوصيل' : 'Checkout & Delivery')}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {orderConfirmed 
                ? (isAr ? 'جارِ تجهيز طلبك في قسم الشحن والتغليف' : 'Your order is being prepped in our fulfillment center')
                : (isAr ? 'أدخل تفاصيل التوصيل وسنتواصل معك عبر واتساب' : 'Enter shipping details to secure your pieces')}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed State */}
        {orderConfirmed ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                {isAr ? 'رقم الطلب الخاص بك' : 'Your Order Reference'}
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-white/10 rounded-lg text-lg font-mono font-bold text-neutral-900 dark:text-white tabular-nums">
                <span>#{confirmedOrderId}</span>
                <button 
                  onClick={handleCopyOrder} 
                  title="نسخ رقم الطلب"
                  className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  {copiedTracking ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-900/60 rounded-xl border border-neutral-200 dark:border-white/[0.06] text-xs font-mono space-y-2 text-left sm:text-center">
              <div className="text-neutral-700 dark:text-neutral-300">
                <span className="text-neutral-500 dark:text-neutral-400">{isAr ? 'العميل:' : 'Customer:'} </span>
                <span className="font-semibold text-neutral-900 dark:text-white">{formData.fullName}</span> ({formData.phone})
              </div>
              <div className="text-neutral-700 dark:text-neutral-300">
                <span className="text-neutral-500 dark:text-neutral-400">{isAr ? 'عنوان الشحن:' : 'Delivery Address:'} </span>
                <span>{formData.city} - {formData.address}</span>
              </div>
              <div className="text-neutral-700 dark:text-neutral-300">
                <span className="text-neutral-500 dark:text-neutral-400">{isAr ? 'طريقة الدفع:' : 'Payment:'} </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {formData.paymentMethod === 'cod' 
                    ? (isAr ? 'الدفع عند الاستلام مع حق المعاينة' : 'Cash on Delivery') 
                    : formData.paymentMethod === 'wallet'
                    ? (isAr ? 'محفظة إلكترونية / إنستاباي' : 'Mobile Wallet / InstaPay')
                    : (isAr ? 'بطاقة دفع بنكية' : 'Credit Card')}
                </span>
              </div>
              <div className="text-neutral-900 dark:text-white font-bold pt-1 border-t border-neutral-200 dark:border-neutral-800 text-sm">
                <span>{isAr ? 'المبلغ المطلوب سداده:' : 'Amount Due:'} </span>
                <span className="tabular-nums text-emerald-600 dark:text-emerald-400">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
              {isAr
                ? 'تم إرسال رسالة تأكيد إلكترونية وتفاصيل التتبع. مندوب الشحن سيتواصل معك هاتفياً قبل موعد التسليم بـ 24 ساعة.'
                : 'A confirmation has been logged. Our courier will contact you 24 hours prior to delivery for dispatch confirmation.'}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-mono text-xs font-bold uppercase rounded-lg transition-colors shadow-sm"
            >
              {isAr ? 'متابعة التسوق' : 'CONTINUE SHOPPING'}
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Customer Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1.5">
                  {isAr ? 'الاسم بالكامل *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={isAr ? 'مثال: كريم محمد' : 'e.g. Karim Mohammed'}
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1.5">
                  {isAr ? 'رقم الهاتف / واتساب *' : 'Mobile / WhatsApp *'}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="010XXXXXXXX"
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500 font-mono"
                />
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1.5">
                  {isAr ? 'المدينة / المحافظة *' : 'City / Governorate *'}
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-500"
                >
                  <option value="القاهرة">القاهرة (Cairo)</option>
                  <option value="الجيزة">الجيزة (Giza)</option>
                  <option value="الإسكندرية">الإسكندرية (Alexandria)</option>
                  <option value="المنصورة">المنصورة (Mansoura)</option>
                  <option value="طنطا">طنطا (Tanta)</option>
                  <option value="بورسعيد">بورسعيد (Port Said)</option>
                  <option value="أخرى">محافظة أخرى (Other)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-1.5">
                  {isAr ? 'العنوان بالتفصيل (اسم الشارع، العمارة، الشقة) *' : 'Detailed Address *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={isAr ? 'شارع التسعين، مبنى رقم 12، التجمع الخامس' : 'Street name, building, apartment'}
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-2">
                {isAr ? 'طريقة الدفع المعتمدة:' : 'Select Payment Method:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                
                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800'
                      : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                      {isAr ? 'دفع عند الاستلام' : 'Cash on Delivery'}
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {isAr ? 'معاينة المنتج قبل الدفع' : 'Pay upon delivery'}
                    </div>
                  </div>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800'
                      : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                      {isAr ? 'بطاقة بنكية' : 'Credit / Debit Card'}
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {isAr ? 'فيزا ومستركارد مشفرة' : 'Visa / MasterCard'}
                    </div>
                  </div>
                </button>

                {/* InstaPay / Wallet */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'wallet' })}
                  className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                    formData.paymentMethod === 'wallet'
                      ? 'border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800'
                      : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                      {isAr ? 'إنستاباي / محفظة' : 'InstaPay / Wallet'}
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {isAr ? 'تحويل فوري مسبق' : 'Instant digital wallet'}
                    </div>
                  </div>
                </button>

              </div>
            </div>

            {/* Order Summary Recap Strip */}
            <div className="p-3.5 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-mono space-y-1">
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>{isAr ? 'قيمة القطع:' : 'Items Subtotal:'}</span>
                <span className="text-neutral-900 dark:text-white tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>{isAr ? `كود خصم (${promoApplied}):` : `Promo (${promoApplied}):`}</span>
                  <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>{isAr ? 'تكلفة الشحن:' : 'Shipping:'}</span>
                <span className="text-neutral-900 dark:text-white tabular-nums">
                  {shippingFee === 0 ? (isAr ? 'مجاني' : 'FREE') : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-sm font-bold text-neutral-900 dark:text-white">
                <span>{isAr ? 'المجموع الإجمالي:' : 'Grand Total:'}</span>
                <span className="tabular-nums text-neutral-900 dark:text-white">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-mono text-xs font-bold uppercase rounded-lg transition-colors disabled:opacity-50 shadow-sm"
            >
              {isSubmitting 
                ? (isAr ? 'جارِ معالجة وتأكيد الطلب...' : 'PROCESSING ORDER...') 
                : (isAr ? `تأكيد الطلب الآن (${formatPrice(totalAmount)})` : `CONFIRM ORDER (${formatPrice(totalAmount)})`)}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 font-mono">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isAr ? 'شراء آمن 100%' : '100% Encrypted & Safe'}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                {isAr ? 'شحن سريع خلال 24–48 ساعة' : 'Delivery in 24–48h'}
              </span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
