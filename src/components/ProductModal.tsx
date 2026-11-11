import React, { useState } from 'react';
import { X, Check, ShieldCheck, Ruler, ArrowRight, ArrowLeft, ArrowLeftRight } from 'lucide-react';
import { Product, Language } from '../types';
import { SIZE_CHART } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAddToCart: (p: Product, size: string, color: string, qty: number) => void;
  onCompareProduct?: (p: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  language,
  onAddToCart,
  onCompareProduct
}) => {
  if (!isOpen || !product) return null;

  const isAr = language === 'ar';
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.nameEn || 'Default');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#121316] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto text-neutral-900 dark:text-neutral-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 p-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white bg-white/80 dark:bg-black/60 hover:bg-neutral-100 dark:hover:bg-black/90 rounded-full border border-neutral-200 dark:border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 2-Column Split View: Gallery Left, Contiguous Purchase Module Right */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Gallery View */}
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={isAr ? product.nameAr : product.nameEn}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {product.tagEn && (
              <div className="absolute bottom-4 left-4 text-xs font-mono uppercase bg-black/75 text-white backdrop-blur-md px-3 py-1 rounded border border-white/10">
                {isAr ? product.tagAr : product.tagEn}
              </div>
            )}
          </div>

          {/* Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-6">
              
              {/* Category & Weight Metadata */}
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                <span>{product.category}</span>
                {product.weightGsm && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-neutral-900 dark:text-white font-semibold">{product.weightGsm} GSM Heavyweight</span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400">{isAr ? 'متوفر بالمخزون' : 'In Stock'}</span>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
                  {isAr ? product.nameAr : product.nameEn}
                </h2>
                <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white tabular-nums">
                  {product.priceEGP} ج.م
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
                {isAr ? product.descriptionAr : product.descriptionEn}
              </p>

              {/* Compare Trigger Link */}
              {onCompareProduct && (
                <button
                  onClick={() => {
                    onCompareProduct(product);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white border-b border-neutral-400 dark:border-white/30 pb-0.5 cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>{isAr ? 'مقارنة مواصفات هذه القطعة مع موديل آخر' : 'Compare technical specs with another item'}</span>
                </button>
              )}

              {/* Color Swatches */}
              {product.colors.length > 0 && (
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 mb-2.5 flex items-center justify-between">
                    <span>{isAr ? 'اللون:' : 'Color:'}</span>
                    <span className="text-neutral-900 dark:text-white font-semibold">
                      {isAr 
                        ? product.colors.find(c => c.nameEn === selectedColor)?.nameAr || selectedColor 
                        : selectedColor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.nameEn}
                        onClick={() => setSelectedColor(c.nameEn)}
                        title={isAr ? c.nameAr : c.nameEn}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === c.nameEn 
                            ? 'border-neutral-900 dark:border-white scale-110 shadow-md' 
                            : 'border-transparent hover:border-neutral-400'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {selectedColor === c.nameEn && (
                          <Check className={`w-3.5 h-3.5 ${c.hex === '#eceae3' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector + Size Guide Link */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 mb-2.5">
                  <span>{isAr ? 'المقاس:' : 'Select Size:'}</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors underline underline-offset-4 flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{isAr ? 'دليل القياسات' : 'Size Guide'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-mono font-medium rounded border transition-all ${
                        selectedSize === size
                          ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white font-bold'
                          : 'bg-neutral-50 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-2 font-mono">
                  {isAr ? product.fitAr : product.fitEn}
                </p>
              </div>

              {/* Size Guide Drawer/Table if toggled */}
              {showSizeGuide && (
                <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs animate-in fade-in">
                  <div className="font-mono font-semibold text-neutral-900 dark:text-white mb-2">
                    {isAr ? 'جدول القياسات المعتمد (سم)' : 'Standard Measurements (CM)'}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-[11px] tabular-nums">
                      <thead>
                        <tr className="border-b border-neutral-300 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400">
                          <th className="pb-1">{isAr ? 'المقاس' : 'Size'}</th>
                          <th className="pb-1">{isAr ? 'الصدر' : 'Chest'}</th>
                          <th className="pb-1">{isAr ? 'الطول' : 'Length'}</th>
                          <th className="pb-1">{isAr ? 'الكتف' : 'Shoulder'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800/60">
                        {SIZE_CHART.map((row) => (
                          <tr key={row.size} className={selectedSize === row.size ? 'text-neutral-900 dark:text-white font-bold bg-neutral-200/50 dark:bg-neutral-800/40' : 'text-neutral-600 dark:text-neutral-400'}>
                            <td className="py-1">{row.size}</td>
                            <td className="py-1">{row.chest}</td>
                            <td className="py-1">{row.length}</td>
                            <td className="py-1">{row.shoulder}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Fabric Specs */}
              <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-white/[0.04] space-y-1.5 text-xs">
                <div className="text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
                  <span>{isAr ? 'الخامة' : 'Fabric'}:</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">{isAr ? product.fabricAr : product.fabricEn}</span>
                </div>
                <div className="text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
                  <span>{isAr ? 'تعليمات الغسيل' : 'Care'}:</span>
                  <span className="text-neutral-700 dark:text-neutral-300">{isAr ? 'غسيل بارد 30° مئوية، لا تستخدم المجفف' : 'Cold wash 30°C, hang dry'}</span>
                </div>
              </div>

            </div>

            {/* Bottom Add to Bag Action */}
            <div className="pt-6 border-t border-neutral-200 dark:border-white/[0.08] mt-6 flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 rounded-lg font-mono text-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                >
                  -
                </button>
                <span className="px-3 py-2.5 text-neutral-900 dark:text-white font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Primary Buy CTA */}
              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-sm'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{isAr ? 'تمت الإضافة للحقيبة' : 'ADDED TO BAG'}</span>
                  </>
                ) : (
                  <>
                    <span>{isAr ? 'إضافة إلى الحقيبة' : 'ADD TO BAG'}</span>
                    {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
