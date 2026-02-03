
import React from 'react';
import { Product, AppScreen } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onNavigate: (s: AppScreen) => void;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ product, onAddToCart, onNavigate }) => {
  return (
    <div className="min-h-screen pb-32">
      <header className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between">
        <button onClick={() => onNavigate(AppScreen.HOME)} className="size-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-white shadow-sm border border-white/20">
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <button className="size-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-white shadow-sm border border-white/20">
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </header>

      <div className="relative aspect-square w-full">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-6 h-1 rounded-full bg-primary"></div>
          <div className="w-2 h-1 rounded-full bg-white/30"></div>
          <div className="w-2 h-1 rounded-full bg-white/30"></div>
        </div>
      </div>

      <main className="p-6 bg-white dark:bg-background-dark -mt-10 rounded-t-[40px] relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-6"></div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">{product.category}</span>
            <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
          </div>
          <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()} د.ع</p>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex text-primary">
            {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-symbols-outlined text-sm fill-1">star</span>)}
          </div>
          <span className="text-xs text-gray-500 font-medium">(٤٨ مراجعة)</span>
        </div>

        <section className="mb-8">
          <h3 className="font-bold mb-3">الوصف</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            {product.description || 'هذا المنتج مصنوع من أجود أنواع الجلود الطبيعية الفاخرة، مع اهتمام فائق بأدق التفاصيل لضمان الأناقة والمتانة التي تليق بك.'}
          </p>
        </section>

        <section className="mb-8">
          <h3 className="font-bold mb-3">المواصفات</h3>
          <ul className="grid grid-cols-2 gap-3">
            {['جلد طبيعي ١٠٠٪', 'مقاوم للماء', 'خياطة يدوية', 'ضمان لمدة سنة'].map((spec, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                {spec}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-bold mb-3">اختر اللون</h3>
          <div className="flex gap-4">
            {['#f4d125', '#1a1a1a', '#8b4513', '#c0c0c0'].map((color, i) => (
              <button 
                key={i} 
                className={`size-10 rounded-full border-2 p-0.5 transition-all ${i === 0 ? 'border-primary' : 'border-transparent'}`}
              >
                <div className="w-full h-full rounded-full shadow-inner" style={{ background: color }}></div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 z-50 flex gap-4">
        <button 
          onClick={() => {
            onAddToCart(product);
            onNavigate(AppScreen.CART);
          }}
          className="flex-1 border-2 border-primary text-primary dark:text-primary font-bold h-14 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>إضافة للسلة</span>
          <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
        </button>
        <button 
          onClick={() => {
            onAddToCart(product);
            onNavigate(AppScreen.CHECKOUT);
          }}
          className="flex-1 bg-primary text-black font-bold h-14 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>شراء الآن</span>
          <span className="material-symbols-outlined text-xl">bolt</span>
        </button>
      </footer>
    </div>
  );
};

export default ProductDetailScreen;
