import React, { useState } from 'react';
import { Heart, Plus, Eye, Check, ArrowLeftRight } from 'lucide-react';
import { Product, Language } from '../types';

interface ProductCardProps {
  product: Product;
  language: Language;
  onOpenDetail: (p: Product) => void;
  onAddToCart: (p: Product, size: string, color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onCompare: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  onOpenDetail,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onCompare
}) => {
  const isAr = language === 'ar';
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, product.colors[0]?.nameEn || 'Default');
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCompare(product);
  };

  return (
    <div 
      onClick={() => onOpenDetail(product)}
      className="group relative flex flex-col bg-white dark:bg-[#121316] rounded-xl overflow-hidden border border-neutral-200 dark:border-white/[0.08] hover:border-neutral-400 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      {/* Visual Slot: Product Image taking ~70% of card height */}
      <div className="relative aspect-[4/4.5] sm:aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900/60">
        <img
          src={product.image}
          alt={isAr ? product.nameAr : product.nameEn}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Floating Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
          {/* Subtle Text Tag */}
          {product.tagEn ? (
            <span className="text-[11px] font-mono uppercase tracking-wider text-white bg-black/75 backdrop-blur-sm px-2.5 py-0.5 rounded border border-white/10 shadow-sm">
              {isAr ? product.tagAr : product.tagEn}
            </span>
          ) : <span />}

          <div className="flex items-center gap-1.5">
            {/* Compare Button */}
            <button
              onClick={handleCompareClick}
              title={isAr ? 'مقارنة هذه القطعة' : 'Compare product'}
              className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-neutral-200 hover:text-white transition-colors backdrop-blur-sm border border-white/10"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              aria-label="Wishlist"
              className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-neutral-200 hover:text-white transition-colors backdrop-blur-sm border border-white/10"
            >
              <Heart 
                className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-200'}`} 
              />
            </button>
          </div>
        </div>

        {/* Hover Quick-Size & Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-250 ease-out flex flex-col gap-2">
          {/* Size Selector */}
          <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[11px] font-mono px-2 py-1 rounded transition-colors ${
                  selectedSize === size
                    ? 'bg-white text-black font-bold'
                    : 'bg-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2 text-xs font-mono font-medium rounded transition-colors flex items-center justify-center gap-1.5 ${
              justAdded 
                ? 'bg-emerald-500 text-black font-bold'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isAr ? 'تمت الإضافة للحقيبة' : 'ADDED TO BAG'}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{isAr ? `إضافة سريعة (${selectedSize})` : `QUICK ADD (${selectedSize})`}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content & Clean Typography */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Clean Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-1.5">
            <span className="uppercase">{product.category}</span>
            {product.weightGsm && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">{product.weightGsm} GSM</span>
              </>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight leading-snug line-clamp-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
            {isAr ? product.nameAr : product.nameEn}
          </h3>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-white/[0.06]">
          <span className="text-sm sm:text-base font-bold font-mono text-neutral-900 dark:text-white tabular-nums tracking-tight">
            {product.priceEGP} ج.م
          </span>

          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <button
              onClick={handleCompareClick}
              className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeftRight className="w-3 h-3" />
              <span>{isAr ? 'مقارنة' : 'Compare'}</span>
            </button>
            <span aria-hidden="true">·</span>
            <span className="group-hover:text-neutral-900 dark:group-hover:text-white transition-colors flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{isAr ? 'تفاصيل' : 'Details'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
