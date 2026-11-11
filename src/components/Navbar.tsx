import React from 'react';
import { ShoppingBag, Search, Globe, Heart, Sun, Moon, ArrowLeftRight } from 'lucide-react';
import { Language, Theme } from '../types';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenComparison: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  onOpenSearch,
  onOpenComparison
}) => {
  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#0c0d0e]/90 backdrop-blur-md border-b border-neutral-200 dark:border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2 text-2xl font-black tracking-tighter text-neutral-900 dark:text-white whitespace-nowrap shrink-0 group"
        >
          <span className="bg-neutral-900 text-white dark:bg-white dark:text-black px-2 py-0.5 font-mono text-xl tracking-normal font-bold">X1</span>
          <span className="font-light tracking-widest text-neutral-600 dark:text-neutral-300 text-sm hidden sm:inline uppercase">
            {isAr ? 'ستوديوز' : 'STUDIOS'}
          </span>
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <a 
            href="#collection" 
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-neutral-900 dark:hover:border-white/40"
          >
            {isAr ? 'المجموعة' : 'Collection'}
          </a>
          <button 
            onClick={onOpenComparison}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-neutral-900 dark:hover:border-white/40 flex items-center gap-1.5 cursor-pointer text-sm font-medium"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>{isAr ? 'مقارنة القطع' : 'Comparison'}</span>
          </button>
          <a 
            href="#craftsmanship" 
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-neutral-900 dark:hover:border-white/40"
          >
            {isAr ? 'الجودة والخامات' : 'Craftsmanship'}
          </a>
          <a 
            href="#contact" 
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-neutral-900 dark:hover:border-white/40"
          >
            {isAr ? 'تواصل معنا' : 'Contact'}
          </a>
          <a 
            href="#reviews" 
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-neutral-900 dark:hover:border-white/40"
          >
            {isAr ? 'آراء العملاء' : 'Reviews'}
          </a>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Theme Switcher Toggle (White / Dark mode) */}
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'التحويل للوضع الليلي' : 'التحويل للوضع النهاري'}
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-neutral-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
            className="px-2.5 py-1.5 text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-neutral-500" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label={isAr ? 'بحث' : 'Search'}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label={isAr ? 'المفضلة' : 'Wishlist'}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors relative"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            )}
          </button>

          {/* Shopping Bag Primary Action Button */}
          <button
            onClick={onOpenCart}
            className="px-3.5 py-2 text-xs font-medium text-white bg-neutral-900 hover:bg-black dark:text-black dark:bg-white dark:hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 font-mono tracking-tight shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{isAr ? 'حقيبة الشراء' : 'BAG'}</span>
            <span className="bg-white text-black dark:bg-black dark:text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold tabular-nums">
              {cartCount}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};
