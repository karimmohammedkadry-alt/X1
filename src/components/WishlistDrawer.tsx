import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, Language } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onRemoveWishlist: (id: string) => void;
  onAddToCart: (p: Product, size: string, color: string) => void;
  language: Language;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveWishlist,
  onAddToCart,
  language
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';
  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className={`fixed inset-y-0 ${isAr ? 'left-0' : 'right-0'} max-w-full flex w-full sm:w-[400px] z-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full bg-white dark:bg-[#111215] border-l border-neutral-200 dark:border-white/[0.08] shadow-2xl flex flex-col justify-between text-neutral-900 dark:text-neutral-100 transition-colors">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 dark:border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <h2 className="text-sm font-bold font-mono tracking-wider uppercase text-neutral-900 dark:text-white">
                {isAr ? 'قائمة الأمنيات' : 'Saved Pieces'}
              </h2>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                ({wishlistedProducts.length})
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-200 dark:divide-white/[0.06]">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <Heart className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mb-3 stroke-[1.2]" />
                <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-300 mb-1">
                  {isAr ? 'لم تحفظ أي قطع بعد' : 'No saved items yet'}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 max-w-[200px] mb-5">
                  {isAr ? 'اضغط على أيقونة القلب في أي قطعة لحفظها لوقت لاحق' : 'Click the heart icon on any piece to save it here'}
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  {isAr ? 'تصفح المجموعة' : 'EXPLORE COLLECTION'}
                </button>
              </div>
            ) : (
              wishlistedProducts.map((p) => (
                <div key={p.id} className="py-4 flex gap-4">
                  <div className="w-18 h-22 rounded-lg bg-neutral-100 dark:bg-neutral-900 overflow-hidden shrink-0 border border-neutral-200 dark:border-white/5">
                    <img
                      src={p.image}
                      alt={isAr ? p.nameAr : p.nameEn}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-1">
                          {isAr ? p.nameAr : p.nameEn}
                        </h4>
                        <button
                          onClick={() => onRemoveWishlist(p.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs font-mono font-bold text-neutral-900 dark:text-white tabular-nums mt-1">
                        {p.priceEGP} ج.م
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(p, p.availableSizes[0] || 'M', p.colors[0]?.nameEn || 'Default');
                        onRemoveWishlist(p.id);
                      }}
                      className="w-full py-1.5 mt-2 bg-neutral-100 hover:bg-neutral-900 hover:text-white dark:bg-neutral-800 dark:hover:bg-white dark:hover:text-black text-neutral-900 dark:text-neutral-200 font-mono text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isAr ? 'نقل إلى الحقيبة' : 'Move to Bag'}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
