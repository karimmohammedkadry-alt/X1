import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ComparisonModal } from './components/ComparisonModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Lookbook } from './components/Lookbook';
import { ContactSection } from './components/ContactSection';
import { Reviews } from './components/Reviews';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Language, Theme } from './types';
import { SlidersHorizontal, CheckCircle2, ArrowLeftRight } from 'lucide-react';

export default function App() {
  // Theme state with 'light' (white background) as the default!
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('ar');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['x1-hoodie-01']);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Comparison state
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [comparisonProductA, setComparisonProductA] = useState<Product | null>(PRODUCTS[0]);
  const [comparisonProductB, setComparisonProductB] = useState<Product | null>(PRODUCTS[1]);
  
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [promoApplied, setPromoApplied] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark class on document.documentElement with theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync document direction with language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string, qty: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        return next;
      }
      return [
        ...prev,
        {
          id: `${product.id}-${size}-${color}-${Date.now()}`,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity: qty
        }
      ];
    });

    showToast(
      language === 'ar' 
        ? `تمت إضافة ${product.nameAr} إلى حقيبتك` 
        : `Added ${product.nameEn} to your bag`
    );
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(language === 'ar' ? 'تمت إزالة القطعة من المفضلة' : 'Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(language === 'ar' ? 'تمت إضافة القطعة إلى المفضلة' : 'Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  // Open comparison modal with targeted product
  const handleOpenComparison = (product?: Product) => {
    if (product) {
      setComparisonProductA(product);
      // Pick a suitable second product from another item
      const other = PRODUCTS.find((p) => p.id !== product.id) || PRODUCTS[1];
      setComparisonProductB(other);
    }
    setIsComparisonOpen(true);
  };

  // Filter and sort products
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceEGP - b.priceEGP;
    if (sortBy === 'price-desc') return b.priceEGP - a.priceEGP;
    return 0;
  });

  const isAr = language === 'ar';

  const categoryOptions = [
    { id: 'all', labelAr: 'جميع القطع', labelEn: 'All Pieces' },
    { id: 'hoodies', labelAr: 'الهوديز والسترات', labelEn: 'Hoodies & Sweats' },
    { id: 'outerwear', labelAr: 'الجاكيتات والمعاطف', labelEn: 'Outerwear' },
    { id: 'tees', labelAr: 'التيشيرتات الثقيلة', labelEn: 'Heavy Tees' },
    { id: 'bottoms', labelAr: 'البناطيل والكارغو', labelEn: 'Bottoms' },
    { id: 'accessories', labelAr: 'الإكسسوارات', labelEn: 'Accessories' }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0c0d0e] text-[#111215] dark:text-[#f3f4f6] selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black font-sans transition-colors duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white dark:bg-white dark:text-black px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 text-xs font-mono animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar with Theme Switch & Contact */}
      <Navbar
        language={language}
        onToggleLanguage={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenComparison={() => handleOpenComparison()}
      />

      <main>
        {/* Campaign Hero Showcase */}
        <Hero
          language={language}
          onExploreClick={() => {
            const el = document.getElementById('collection');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Featured Products Grid */}
        <section id="collection" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-200 dark:border-white/[0.08]">
          
          {/* Collection Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
                {isAr ? 'الإصدار الأول // خريف وشتاء 2026' : 'CATALOG // FW26 COLLECTION'}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
                {isAr ? 'قطع المجموعة الحصرية' : 'Engineered Garments'}
              </h2>
            </div>

            {/* Quick Actions: Side-by-Side Compare & Sort */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleOpenComparison()}
                className="px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>{isAr ? 'مقارنة المواصفات جنباً إلى جنب' : 'Side-by-Side Compare'}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isAr ? 'الترتيب:' : 'Sort:'}</span>
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200 text-xs font-mono rounded-lg px-3 py-1.5 cursor-pointer focus:outline-none focus:border-neutral-500"
                >
                  <option value="featured">{isAr ? 'المميز أولاً' : 'Featured'}</option>
                  <option value="price-asc">{isAr ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                  <option value="price-desc">{isAr ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Filter Tabs / Segmented Controls (§1.A DO) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-white/[0.06] rounded-xl mb-10 overflow-x-auto">
            {categoryOptions.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all' 
                ? PRODUCTS.length 
                : PRODUCTS.filter(p => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-white text-neutral-900 dark:bg-white dark:text-black font-bold shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  <span>{isAr ? cat.labelAr : cat.labelEn}</span>
                  <span className={`text-[10px] tabular-nums ${isActive ? 'text-neutral-500' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3-Column Desktop Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                language={language}
                onOpenDetail={(p) => setSelectedProduct(p)}
                onAddToCart={(p, size, color) => handleAddToCart(p, size, color, 1)}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
                onCompare={(p) => handleOpenComparison(p)}
              />
            ))}
          </div>

        </section>

        {/* Brand Ethos & Textile Standard */}
        <Lookbook language={language} />

        {/* Direct Contact Section (تواصل معنا) */}
        <ContactSection language={language} />

        {/* Customer Proof & Verified Reviews */}
        <Reviews language={language} />

      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Side-by-Side Product Comparison Modal */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        products={PRODUCTS}
        initialProductA={comparisonProductA}
        initialProductB={comparisonProductB}
        language={language}
        onAddToCart={(p, size, color) => handleAddToCart(p, size, color, 1)}
      />

      {/* Interactive Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        language={language}
        onAddToCart={(p, size, color, qty) => handleAddToCart(p, size, color, qty)}
        onCompareProduct={(p) => handleOpenComparison(p)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        language={language}
        onOpenCheckout={(disc, promo) => {
          setDiscountAmount(disc);
          setPromoApplied(promo);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        language={language}
        discountAmount={discountAmount}
        promoApplied={promoApplied}
        onClearCart={() => setCartItems([])}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={PRODUCTS}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(p, size, color) => handleAddToCart(p, size, color, 1)}
        language={language}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        language={language}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

    </div>
  );
}
