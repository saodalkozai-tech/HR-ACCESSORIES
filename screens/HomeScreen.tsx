
import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCTS, CATEGORIES, APP_LOGO } from '../constants';
import { AppScreen, Product } from '../types';

interface HomeScreenProps {
  onAddToCart: (p: Product) => void;
  onNavigate: (s: AppScreen, p?: Product) => void;
  cartCount: number;
}

const HERO_SLIDES = [
  {
    id: 1,
    title: 'المجموعة الملكية',
    subtitle: 'اكتشف أرقى أنواع الجلود الطبيعية',
    cta: 'تسوق الآن',
    tag: 'HR LUXURY',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzGC6ObdLY1n_TD2C3oRlsBejGeF3l1riKUyUUlmpicpl-4qNJOMvy_UygtV8F1z-Rddf5HaSOaODyrRHzOHNgB1F1tFMC2fxwxpJwdHuKA_8aArSSJbhv622sAfPQQ0v7uAJXYnYIW6ihGG6Y_HNdBDPNr-rZ6cUpBvGCSFs6XOjG-ddFDXqydGoxRVluE8HWwKOrLzzJtaNTvjYV-ukWOcB8mtEL8S7c2u9QNlCj3Jq7OlaKWtrb2Lt1vxFhCzKlKUAfv1ypQ1M-'
  },
  {
    id: 2,
    title: 'أناقة بلا حدود',
    subtitle: 'تصاميم عصرية تناسب يومك العملي',
    cta: 'استكشف المزيد',
    tag: 'NEW ARRIVAL',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLEdsJAvSOcc7X1F2FFFtjzrFb_NvPI2lPUwkxCyRjdmWsI0n1n-5U4VulqphWr7FnzWI-XglRzuQ4uGjDbYqpYECXUJaQDlETQZihCq41VBLOT5MFMcv7A-Z4Lxu2hVTsVztl5dsLdMclEHztiWZTf2YMk3LUDqTRDyuw9R2RhILdYzuZsxp_vA8UgfRK0fXY9fgfgTtuuYsUyJCv-x0oHvwkwWo73FLtuemzvtxaoHNM1y64KBRPWWBC8TcCpMKfaC_HHrLvoaoS'
  },
  {
    id: 3,
    title: 'سحر المناسبات',
    subtitle: 'حقائب سهرة مرصعة تضفي بريقاً خاصاً',
    cta: 'احجز قطعتك',
    tag: 'LIMITED EDITION',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_MaB7m-sdTUI5reKAwGFQr6b-OHHUCc7cICzGblSPz1L6lmXJ7Za8i8McvLoVM1dHaIVhSCrgsy4-b-xqzG8CQObNS_t3yBddVNGvQWm2hgbBPQyH_XzYiZ3dLN9kW-WMYZEyhUQzBFZGIbhgP6TPKQKAnPpTYJlGAYoz1_Ic-sZo1js9crIdwFsFD0g5EJ78DOFzlJWh0XbSZHzCpwR8r8e7GOQQdbSZ8rMMPeNXLU952pB2KcjhuOTrlATnLhkgFhYrpiDQLIJ3'
  }
];

const INITIAL_VISIBLE_COUNT = 4;

const HomeScreen: React.FC<HomeScreenProps> = ({ onAddToCart, onNavigate, cartCount }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 4);
      setIsLoadingMore(false);
    }, 800);
  };

  const displayedProducts = MOCK_PRODUCTS.slice(0, visibleCount);
  const hasMore = visibleCount < MOCK_PRODUCTS.length;

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Logo Container - White background for the black logo */}
          <div className="size-14 rounded-xl bg-white flex items-center justify-center border border-primary/30 shadow-md overflow-hidden p-1">
            <img 
              src={APP_LOGO} 
              alt="HR Accessories Logo" 
              className="w-full h-full object-contain mix-blend-multiply" 
            />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tighter uppercase leading-none text-slate-900 dark:text-white">HR ACCESSORIES</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Baghdad, Iraq</p>
          </div>
        </div>
        <div className="flex-1 max-w-xs relative">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-sm">search</span>
          <input className="w-full h-10 pr-10 pl-4 bg-gray-100 dark:bg-white/5 border-none rounded-full text-sm placeholder:text-gray-500" placeholder="ابحث عن أناقتك..." />
        </div>
      </header>

      <main>
        {/* Hero Carousel */}
        <section className="mt-4 px-4 relative group">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            {HERO_SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-linear transform" 
                  style={{ 
                    backgroundImage: `url(${slide.image})`,
                    transform: index === currentSlide ? 'scale(1.1)' : 'scale(1.0)'
                  }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-8 right-8 left-8 text-white text-right">
                  <div className={`transition-all duration-700 delay-300 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <span className="bg-primary text-black text-[10px] font-black px-2.5 py-1 rounded-md mb-3 inline-block uppercase tracking-[0.2em]">
                      {slide.tag}
                    </span>
                    <h2 className="text-3xl font-black mb-2 tracking-tight drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-sm text-white/80 mb-6 font-medium max-w-[80%] ml-auto">
                      {slide.subtitle}
                    </p>
                    <button className="bg-primary hover:brightness-110 active:scale-95 text-black px-8 py-3 rounded-xl text-sm font-black shadow-2xl shadow-primary/30 transition-all flex items-center gap-2 mr-auto sm:mr-0 ml-auto">
                      <span>{slide.cta}</span>
                      <span className="material-symbols-outlined text-sm">arrow_left_alt</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {HERO_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">التصنيفات</h3>
            <button className="text-primary text-xs font-bold uppercase tracking-widest">عرض الكل</button>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="flex flex-col items-center gap-2 min-w-[85px] group cursor-pointer">
                <div className={`size-16 rounded-full flex items-center justify-center border transition-all duration-300 group-active:scale-90 ${cat.id === '1' ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/10' : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-500 hover:border-gray-300 dark:hover:border-white/20'}`}>
                  <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-colors ${cat.id === '1' ? 'bg-primary/5' : ''}`}>
                  <span className={`material-symbols-outlined text-[14px] ${cat.id === '1' ? 'text-primary' : 'text-gray-400'}`}>{cat.icon}</span>
                  <span className={`text-[11px] font-black uppercase tracking-tight ${cat.id === '1' ? 'text-slate-900 dark:text-white' : 'text-gray-500'}`}>
                    {cat.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section className="mt-8 px-4">
          <div className="flex items-center justify-between mb-4 text-right">
            <h3 className="font-bold text-lg">الأكثر مبيعاً</h3>
            <button className="size-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">tune</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {displayedProducts.map(product => (
              <div key={product.id} className="group cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500" onClick={() => onNavigate(AppScreen.PRODUCT_DETAIL, product)}>
                <div className="relative aspect-[3/4] bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden mb-3">
                  <div className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: `url(${product.image})` }} />
                  <button onClick={(e) => { e.stopPropagation(); }} className="absolute top-2 left-2 size-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-red-500 transition-colors text-right">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                </div>
                <h4 className="text-sm font-bold mb-1 truncate text-right">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <p className="text-primary font-bold text-sm">{product.price.toLocaleString()} د.ع</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="size-7 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button 
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="flex items-center gap-2 bg-white dark:bg-white/5 border border-primary/20 hover:border-primary text-black dark:text-white px-8 py-3 rounded-2xl text-sm font-black transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoadingMore ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-primary">expand_more</span>
                    <span>عرض المزيد من المنتجات</span>
                  </>
                )}
              </button>
            </div>
          )}
        </section>

        {/* Promo */}
        <section className="mt-8 px-4">
          <div className="bg-primary rounded-xl p-6 flex items-center justify-between overflow-hidden relative text-right">
            <div className="z-10">
              <h3 className="text-black font-extrabold text-xl mb-1">توصيل مجاني!</h3>
              <p className="text-black/70 text-xs">على كافة الطلبات فوق ٢٥٠,٠٠٠ د.ع</p>
            </div>
            <div className="z-10">
              <span className="material-symbols-outlined text-black text-5xl">local_shipping</span>
            </div>
            <div className="absolute -right-4 -top-4 size-24 bg-black/5 rounded-full"></div>
          </div>
        </section>
      </main>

      {/* Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-2xl border-t border-gray-200 dark:border-white/10 pb-8 pt-3 z-50">
        <div className="flex items-center justify-around px-4">
          <button 
            onClick={() => onNavigate(AppScreen.HOME)} 
            aria-label="الرئيسية"
            className="flex flex-col items-center gap-1.5 text-primary active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined fill-1 text-[28px]">home</span>
            <span className="text-[11px] font-black uppercase tracking-tight">الرئيسية</span>
          </button>
          
          <button 
            aria-label="الأقسام"
            className="flex flex-col items-center gap-1.5 text-gray-400 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[28px]">category</span>
            <span className="text-[11px] font-black uppercase tracking-tight">الأقسام</span>
          </button>
          
          <button 
            onClick={() => onNavigate(AppScreen.CART)} 
            aria-label="السلة"
            className="relative flex flex-col items-center gap-1.5 text-gray-400 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[28px]">shopping_cart</span>
            <span className="text-[11px] font-black uppercase tracking-tight">السلة</span>
            {cartCount > 0 && (
              <div className="absolute -top-1.5 right-1/2 translate-x-3.5 size-5 bg-red-500 rounded-full border-2 border-white dark:border-background-dark flex items-center justify-center text-[10px] text-white font-black shadow-lg">
                {cartCount}
              </div>
            )}
          </button>
          
          <button 
            aria-label="حسابي"
            className="flex flex-col items-center gap-1.5 text-gray-400 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[28px]">person</span>
            <span className="text-[11px] font-black uppercase tracking-tight">حسابي</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HomeScreen;
