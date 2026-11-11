import React, { useState } from 'react';
import { X, ArrowLeftRight, Check, ShoppingBag, Scale, Scissors, Sparkles, Layers } from 'lucide-react';
import { Product, Language } from '../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  initialProductA?: Product | null;
  initialProductB?: Product | null;
  language: Language;
  onAddToCart: (p: Product, size: string, color: string) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  products,
  initialProductA,
  initialProductB,
  language,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';

  // State for the two products being compared
  const [productAId, setProductAId] = useState<string>(
    initialProductA?.id || products[0]?.id || ''
  );
  const [productBId, setProductBId] = useState<string>(
    initialProductB?.id || products[1]?.id || products[0]?.id || ''
  );

  const [addedA, setAddedA] = useState(false);
  const [addedB, setAddedB] = useState(false);

  const productA = products.find((p) => p.id === productAId) || products[0];
  const productB = products.find((p) => p.id === productBId) || products[1] || products[0];

  const handleAddProduct = (prod: Product, isA: boolean) => {
    onAddToCart(prod, prod.availableSizes[0] || 'M', prod.colors[0]?.nameEn || 'Default');
    if (isA) {
      setAddedA(true);
      setTimeout(() => setAddedA(false), 1500);
    } else {
      setAddedB(true);
      setTimeout(() => setAddedB(false), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-5xl bg-white dark:bg-[#121316] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 text-neutral-900 dark:text-neutral-100 my-auto transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 dark:border-white/[0.08] flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-mono tracking-tight text-neutral-900 dark:text-white uppercase">
                {isAr ? 'مقارنة المواصفات الهندسية' : 'Side-by-Side Architectural Comparison'}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {isAr ? 'قارن بين كثافة القماش (GSM)، القصات، والتفاصيل المعدنية جنباً إلى جنب' : 'Compare fabric density (GSM), silhouettes, and hardware specs'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Content Container */}
        <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8">
          
          {/* Top Product Pickers & Image Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pb-6 border-b border-neutral-200 dark:border-white/[0.08]">
            
            {/* Product A Selector & Visual */}
            <div className="flex flex-col bg-neutral-50 dark:bg-neutral-900/60 p-5 rounded-xl border border-neutral-200 dark:border-white/[0.06]">
              <div className="mb-3">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                  {isAr ? 'القطعة الأولى:' : 'Product A:'}
                </label>
                <select
                  value={productAId}
                  onChange={(e) => setProductAId(e.target.value)}
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg p-2.5 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-500"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {isAr ? p.nameAr : p.nameEn} ({p.priceEGP} ج.م)
                    </option>
                  ))}
                </select>
              </div>

              {/* Thumbnail & Quick Add */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-950 mb-4 border border-neutral-200 dark:border-white/5">
                <img
                  src={productA.image}
                  alt={isAr ? productA.nameAr : productA.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 text-[10px] font-mono uppercase bg-black/70 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                  {productA.weightGsm ? `${productA.weightGsm} GSM` : productA.category}
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold font-mono text-neutral-900 dark:text-white tabular-nums">
                  {productA.priceEGP} ج.م
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase">
                  {isAr ? productA.tagAr : productA.tagEn}
                </span>
              </div>

              <button
                onClick={() => handleAddProduct(productA, true)}
                className={`w-full py-2.5 px-4 text-xs font-mono font-bold rounded uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  addedA
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200'
                }`}
              >
                {addedA ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تمت الإضافة للحقيبة' : 'ADDED TO BAG'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إضافة القطعة للحقيبة' : 'ADD TO BAG'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Product B Selector & Visual */}
            <div className="flex flex-col bg-neutral-50 dark:bg-neutral-900/60 p-5 rounded-xl border border-neutral-200 dark:border-white/[0.06]">
              <div className="mb-3">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                  {isAr ? 'القطعة الثانية:' : 'Product B:'}
                </label>
                <select
                  value={productBId}
                  onChange={(e) => setProductBId(e.target.value)}
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg p-2.5 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-500"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {isAr ? p.nameAr : p.nameEn} ({p.priceEGP} ج.م)
                    </option>
                  ))}
                </select>
              </div>

              {/* Thumbnail & Quick Add */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-950 mb-4 border border-neutral-200 dark:border-white/5">
                <img
                  src={productB.image}
                  alt={isAr ? productB.nameAr : productB.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 text-[10px] font-mono uppercase bg-black/70 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                  {productB.weightGsm ? `${productB.weightGsm} GSM` : productB.category}
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold font-mono text-neutral-900 dark:text-white tabular-nums">
                  {productB.priceEGP} ج.م
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase">
                  {isAr ? productB.tagAr : productB.tagEn}
                </span>
              </div>

              <button
                onClick={() => handleAddProduct(productB, false)}
                className={`w-full py-2.5 px-4 text-xs font-mono font-bold rounded uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  addedB
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200'
                }`}
              >
                {addedB ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تمت الإضافة للحقيبة' : 'ADDED TO BAG'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إضافة القطعة للحقيبة' : 'ADD TO BAG'}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Detailed Side-by-Side Specifications Matrix */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
              {isAr ? 'جدول المقارنة التفصيلي' : 'Technical Specifications Matrix'}
            </h4>

            {/* Spec Row 1: Fabric Density / GSM */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                  <Scale className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{isAr ? 'كثافة النسيج والوزن (GSM)' : 'Fabric Weight (GSM)'}</span>
                </div>
                <div className="text-sm font-bold font-mono text-neutral-900 dark:text-white tabular-nums">
                  {productA.weightGsm ? `${productA.weightGsm} GSM (Ultra-Heavyweight)` : (isAr ? 'خفيف' : 'Lightweight')}
                </div>
                {/* Visual density meter */}
                <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-neutral-900 dark:bg-white" 
                    style={{ width: `${Math.min(100, ((productA.weightGsm || 250) / 500) * 100)}%` }} 
                  />
                </div>
              </div>

              <div className="space-y-1 md:border-r md:border-neutral-200 md:dark:border-white/[0.06] md:pr-4">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                  <Scale className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{isAr ? 'كثافة النسيج والوزن (GSM)' : 'Fabric Weight (GSM)'}</span>
                </div>
                <div className="text-sm font-bold font-mono text-neutral-900 dark:text-white tabular-nums">
                  {productB.weightGsm ? `${productB.weightGsm} GSM (Ultra-Heavyweight)` : (isAr ? 'خفيف' : 'Lightweight')}
                </div>
                {/* Visual density meter */}
                <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-neutral-900 dark:bg-white" 
                    style={{ width: `${Math.min(100, ((productB.weightGsm || 250) / 500) * 100)}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Spec Row 2: Textile Composition */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                  <Layers className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{isAr ? 'تركيب الخامة والألياف' : 'Textile Composition'}</span>
                </div>
                <div className="text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                  {isAr ? productA.fabricAr : productA.fabricEn}
                </div>
              </div>

              <div className="space-y-1 md:border-r md:border-neutral-200 md:dark:border-white/[0.06] md:pr-4">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                  <Layers className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{isAr ? 'تركيب الخامة والألياف' : 'Textile Composition'}</span>
                </div>
                <div className="text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                  {isAr ? productB.fabricAr : productB.fabricEn}
                </div>
              </div>
            </div>

            {/* Spec Row 3: Fit & Architectural Silhouette */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                  <Scissors className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{isAr ? 'القصة الهندسية والوقفة' : 'Cut & Architectural Drape'}</span>
                </div>
                <div className="text-xs text-neutral-800 dark:text-neutral-200">
                  {isAr ? productA.silhouetteAr || productA.fitAr : productA.silhouetteEn || productA.fitEn}
                </div>
              </div>

              <div className="space-y-1 md:border-r md:border-neutral-200 md:dark:border-white/[0.06] md:pr-4">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                  <Scissors className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{isAr ? 'القصة الهندسية والوقفة' : 'Cut & Architectural Drape'}</span>
                </div>
                <div className="text-xs text-neutral-800 dark:text-neutral-200">
                  {isAr ? productB.silhouetteAr || productB.fitAr : productB.silhouetteEn || productB.fitEn}
                </div>
              </div>
            </div>

            {/* Spec Row 4: Hardware & Precision Details */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{isAr ? 'التفاصيل المعدنية والإكسسوارات' : 'Hardware & Fasteners'}</span>
                </div>
                <div className="text-xs text-neutral-800 dark:text-neutral-200">
                  {isAr ? productA.hardwareAr || 'خياطة مدعمة مزدوجة' : productA.hardwareEn || 'Double-needle structural seams'}
                </div>
              </div>

              <div className="space-y-1 md:border-r md:border-neutral-200 md:dark:border-white/[0.06] md:pr-4">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{isAr ? 'التفاصيل المعدنية والإكسسوارات' : 'Hardware & Fasteners'}</span>
                </div>
                <div className="text-xs text-neutral-800 dark:text-neutral-200">
                  {isAr ? productB.hardwareAr || 'خياطة مدعمة مزدوجة' : productB.hardwareEn || 'Double-needle structural seams'}
                </div>
              </div>
            </div>

            {/* Spec Row 5: Care Instructions */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                  {isAr ? 'إرشادات الغسيل والعناية:' : 'Care & Maintenance:'}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  {isAr ? productA.washCareAr || 'غسيل 30° مئوية' : productA.washCareEn || 'Wash cold 30°C'}
                </div>
              </div>

              <div className="space-y-1 md:border-r md:border-neutral-200 md:dark:border-white/[0.06] md:pr-4">
                <div className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                  {isAr ? 'إرشادات الغسيل والعناية:' : 'Care & Maintenance:'}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  {isAr ? productB.washCareAr || 'غسيل 30° مئوية' : productB.washCareEn || 'Wash cold 30°C'}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
