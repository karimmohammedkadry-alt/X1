import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ArrowLeft, ShoppingBag, Tag, Check } from 'lucide-react';
import { CartItem, Language } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  language: Language;
  onOpenCheckout: (discountAmount: number, promoApplied: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  language,
  onOpenCheckout
}) => {
  const isAr = language === 'ar';
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [appliedCode, setAppliedCode] = useState<string>('');

  if (!isOpen) return null;

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.product.priceEGP * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const freeShippingThreshold = 1500;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const diffToFree = Math.max(0, freeShippingThreshold - subtotal);

  const formatPrice = (amount: number) => `${amount} ج.م`;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'X1' || code === 'X1VIP' || code === 'WELCOME10') {
      const discount = Math.round(subtotal * 0.1);
      setPromoDiscount(discount);
      setAppliedCode(code);
      setPromoError(null);
    } else {
      setPromoError(isAr ? 'كود الخصم غير صحيح' : 'Invalid coupon code');
    }
  };

  const finalTotal = Math.max(0, subtotal - promoDiscount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className={`fixed inset-y-0 ${isAr ? 'left-0' : 'right-0'} max-w-full flex w-full sm:w-[440px] z-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full bg-white dark:bg-[#111215] border-l border-neutral-200 dark:border-white/[0.08] shadow-2xl flex flex-col justify-between text-neutral-900 dark:text-neutral-100 transition-colors">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 dark:border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-neutral-900 dark:text-white" />
              <h2 className="text-sm font-bold font-mono tracking-wider uppercase text-neutral-900 dark:text-white">
                {isAr ? 'حقيبة التسوق' : 'Shopping Bag'}
              </h2>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                ({items.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Strip */}
          <div className="px-5 py-3 bg-neutral-50 dark:bg-neutral-900/90 border-b border-neutral-200 dark:border-white/[0.04]">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-neutral-700 dark:text-neutral-300">
                {diffToFree === 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {isAr ? 'تهانينا! طلبيتك مؤهلة للشحن المجاني' : 'You unlocked complimentary shipping!'}
                  </span>
                ) : (
                  <span>
                    {isAr 
                      ? `أضف ${formatPrice(diffToFree)} للحصول على شحن مجاني`
                      : `Add ${formatPrice(diffToFree)} for free shipping`}
                  </span>
                )}
              </span>
              <span className="text-neutral-500 dark:text-neutral-400 tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neutral-900 dark:bg-white transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-200 dark:divide-white/[0.06]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <ShoppingBag className="w-12 h-12 text-neutral-400 dark:text-neutral-600 mb-3 stroke-[1.2]" />
                <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-300 mb-1">
                  {isAr ? 'حقيبة الشراء فارغة' : 'Your bag is empty'}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 max-w-[200px] mb-5">
                  {isAr ? 'تصفح أحدث إصدارات X1 وأضف قطعك المفضلة' : 'Explore the latest X1 drops and add your favorite pieces'}
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  {isAr ? 'تصفح المجموعة' : 'EXPLORE NOW'}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Item Thumbnail */}
                  <div className="w-18 h-22 rounded-lg bg-neutral-100 dark:bg-neutral-900 overflow-hidden shrink-0 border border-neutral-200 dark:border-white/5">
                    <img
                      src={item.product.image}
                      alt={isAr ? item.product.nameAr : item.product.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-neutral-900 dark:text-white leading-tight line-clamp-1">
                          {isAr ? item.product.nameAr : item.product.nameEn}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                          title={isAr ? 'حذف' : 'Remove'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Size & Color Tags */}
                      <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-1">
                        <span>{isAr ? 'مقاس:' : 'Size:'} {item.selectedSize}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.selectedColor}</span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price Row */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 rounded-lg font-mono text-[11px]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-neutral-900 dark:text-white font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white tabular-nums">
                        {formatPrice(item.product.priceEGP * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-neutral-950/80 space-y-4">
              
              {/* Promo Code Input */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={isAr ? 'كود الخصم (جرّب X1VIP)' : 'Promo Code (try X1VIP)'}
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-xs font-mono text-neutral-900 dark:text-white placeholder-neutral-400 pl-8 pr-3 py-2 uppercase focus:outline-none focus:border-neutral-500"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-3 py-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-mono rounded-lg transition-colors"
                >
                  {isAr ? 'تطبيق' : 'Apply'}
                </button>
              </div>

              {promoError && (
                <div className="text-[11px] text-red-500 font-mono">{promoError}</div>
              )}
              {appliedCode && (
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>{isAr ? `تم تطبيق كود ${appliedCode} بنجاح (-10%)` : `Applied ${appliedCode} (-10%)`}</span>
                </div>
              )}

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                  <span className="text-neutral-900 dark:text-white tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>{isAr ? 'خصم الكود:' : 'Discount:'}</span>
                    <span className="tabular-nums">-{formatPrice(promoDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>{isAr ? 'الشحن والتوصيل:' : 'Shipping:'}</span>
                  <span className="text-neutral-800 dark:text-neutral-300">
                    {diffToFree === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{isAr ? 'مجاني' : 'FREE'}</span>
                    ) : (
                      formatPrice(65)
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-200 dark:border-white/[0.06] flex justify-between text-sm font-bold text-neutral-900 dark:text-white">
                  <span>{isAr ? 'الإجمالي النهائي:' : 'Estimated Total:'}</span>
                  <span className="tabular-nums">
                    {formatPrice(finalTotal + (diffToFree === 0 ? 0 : 65))}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onOpenCheckout(promoDiscount, appliedCode);
                  onClose();
                }}
                className="w-full py-3.5 px-4 bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-mono text-xs font-bold rounded-lg uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{isAr ? 'متابعة الدفع وإنهاء الطلب' : 'CHECKOUT NOW'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
