
import React from 'react';
import { MOCK_PRODUCTS, CATEGORIES, APP_LOGO } from '../constants';
import { AppScreen, Product } from '../types';

interface HomeScreenProps {
  onAddToCart: (p: Product) => void;
  onNavigate: (s: AppScreen, p?: Product) => void;
  cartCount: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onAddToCart, onNavigate, cartCount }) => {
  return (
    <div className="pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-14 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center border border-primary/20 shadow-sm overflow-hidden p-1">
            <img src={APP_LOGO} alt="HR Accessories Logo" className="w-full h-full object-contain dark:invert" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tighter uppercase leading-tight">HR ACCESSORIES</h1>
            <p className="text-[10px] text-gray-500 font-bold">بغداد، العراق</p>
          </div>
        </div>
        <div className="flex-1 max-w-xs relative">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-sm">search</span>
          <input className="w-full h-10 pr-10 pl-4 bg-gray-100 dark:bg-white/5 border-none rounded-full text-sm placeholder:text-gray-500" placeholder="ابحث عن أناقتك..." />
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mt-4 px-4">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAzGC6ObdLY1n_TD2C3oRlsBejGeF3l1riKUyUUlmpicpl-4qNJOMvy_UygtV8F1z-Rddf5HaSOaODyrRHzOHNgB1F1tFMC2fxwxpJwdHuKA_8aArSSJbhv622sAfPQQ0v7uAJXYnYIW6ihGG6Y_HNdBDPNr-rZ6cUpBvGCSFs6XOjG-ddFDXqydGoxRVluE8HWwKOrLzzJtaNTvjYV-ukWOcB8mtEL8S7c2u9QNlCj3Jq7OlaKWtrb2Lt1vxFhCzKlKUAfv1ypQ1M-")' }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 right-6 left-6 text-white text-right">
              <span className="bg-primary text-black text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block uppercase tracking-widest">HR LUXURY</span>
              <h2 className="text-2xl font-bold mb-1">المجموعة الملكية</h2>
              <p className="text-sm text-gray-300">اكتشف أرقى أنواع الجلود الطبيعية</p>
              <button className="mt-4 bg-primary text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20">تسوق الآن</button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="font-bold text-lg">التصنيفات</h3>
            <button className="text-primary text-xs font-medium">عرض الكل</button>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer">
                <div className={`size-16 rounded-full flex items-center justify-center border transition-all duration-300 group-active:scale-90 ${cat.id === '1' ? 'bg-primary/10 border-primary text-primary' : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-500'}`}>
                  <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                </div>
                <span className="text-[11px] font-medium">{cat.name}</span>
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
            {MOCK_PRODUCTS.map(product => (
              <div key={product.id} className="group cursor-pointer" onClick={() => onNavigate(AppScreen.PRODUCT_DETAIL, product)}>
                <div className="relative aspect-[3/4] bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden mb-3">
                  <div className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: `url(${product.image})` }} />
                  <button onClick={(e) => { e.stopPropagation(); }} className="absolute top-2 left-2 size-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-red-500 transition-colors">
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
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 pb-8 pt-2 z-50">
        <div className="flex items-center justify-around px-4">
          <button onClick={() => onNavigate(AppScreen.HOME)} className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined fill-1">home</span>
            <span className="text-[10px] font-bold">الرئيسية</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <span className="material-symbols-outlined">category</span>
            <span className="text-[10px] font-medium">الأقسام</span>
          </button>
          <button onClick={() => onNavigate(AppScreen.CART)} className="relative flex flex-col items-center gap-1 text-gray-400">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="text-[10px] font-medium">السلة</span>
            {cartCount > 0 && (
              <div className="absolute -top-1 right-1/2 translate-x-3 size-4 bg-red-500 rounded-full border-2 border-white dark:border-background-dark flex items-center justify-center text-[8px] text-white font-bold">
                {cartCount}
              </div>
            )}
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-medium">حسابي</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HomeScreen;
