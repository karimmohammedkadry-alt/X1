import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Product, Language } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  language: Language;
  onSelectProduct: (p: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  language,
  onSelectProduct
}) => {
  const isAr = language === 'ar';
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.nameEn.toLowerCase().includes(q) ||
      p.nameAr.includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-xl bg-white dark:bg-[#121316] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 text-neutral-900 dark:text-neutral-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-200 dark:border-white/[0.08] flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن هودي، تيشيرت، جاكيت، أو بنطلون...' : 'Search hoodies, tees, jackets, pants...'}
            className="w-full bg-transparent text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-neutral-100 dark:divide-white/[0.04]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-neutral-500">
              {isAr ? 'لم يتم العثور على قطع تطابق بحثك' : 'No items match your search'}
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="p-2.5 flex items-center justify-between gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 rounded-lg bg-neutral-100 dark:bg-neutral-950 overflow-hidden shrink-0 border border-neutral-200 dark:border-white/5">
                    <img
                      src={item.image}
                      alt={isAr ? item.nameAr : item.nameEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-1">
                      {isAr ? item.nameAr : item.nameEn}
                    </h4>
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                      {item.category} {item.weightGsm ? `· ${item.weightGsm} GSM` : ''}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white tabular-nums shrink-0">
                  {item.priceEGP} ج.م
                </span>
              </div>
            ))
          )}
        </div>

        {/* Hot Search Suggestions */}
        <div className="p-3 bg-neutral-50 dark:bg-neutral-950/80 border-t border-neutral-200 dark:border-white/[0.04] flex items-center gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 overflow-x-auto">
          <span>{isAr ? 'الأكثر بحثاً:' : 'Trending:'}</span>
          <button onClick={() => setQuery('hoodie')} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {isAr ? 'هودي' : 'Hoodie'}
          </button>
          <span>·</span>
          <button onClick={() => setQuery('jacket')} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {isAr ? 'جاكيت' : 'Jacket'}
          </button>
          <span>·</span>
          <button onClick={() => setQuery('cargo')} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {isAr ? 'كارغو' : 'Cargo'}
          </button>
          <span>·</span>
          <button onClick={() => setQuery('tee')} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {isAr ? 'تيشيرت' : 'T-Shirt'}
          </button>
        </div>

      </div>
    </div>
  );
};
