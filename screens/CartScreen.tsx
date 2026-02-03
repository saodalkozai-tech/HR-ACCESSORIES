
import React, { useState } from 'react';
import { CartItem, AppScreen } from '../types';

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onNavigate: (s: AppScreen) => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ cart, onUpdateQty, onRemove, onNavigate }) => {
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const FREE_SHIPPING_THRESHOLD = 250000;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5000;
  const total = subtotal + shipping;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const confirmRemove = () => {
    if (itemToRemove) {
      onRemove(itemToRemove.id);
      setItemToRemove(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark">
      {/* Confirmation Dialog */}
      {itemToRemove && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-background-surface w-full max-w-sm rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <div className="size-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-red-500 text-4xl">delete_forever</span>
            </div>
            <h3 className="text-xl font-bold mb-2">هل أنت متأكد؟</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              هل حقاً تريد إزالة <span className="font-bold text-slate-900 dark:text-white">"{itemToRemove.name}"</span> من عربة التسوق الخاصة بك؟
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setItemToRemove(null)}
                className="flex-1 py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                إلغاء
              </button>
              <button 
                onClick={confirmRemove}
                className="flex-1 py-4 rounded-2xl font-bold text-white bg-red-500 shadow-lg shadow-red-500/20 active:scale-95 transition-all"
              >
                إزالة
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 flex items-center p-4">
        <button 
          onClick={() => onNavigate(AppScreen.HOME)} 
          aria-label="العودة"
          className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">عربة التسوق</h2>
      </header>

      <main className="flex-1 pb-40">
        <div className="p-4 bg-primary/5 border-b border-primary/10">
          <p className="text-sm text-center mb-2">
            {subtotal >= FREE_SHIPPING_THRESHOLD 
              ? 'تهانينا! حصلت على توصيل مجاني 🎉' 
              : `أضف ${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} د.ع للحصول على توصيل مجاني`}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(244,209,37,0.5)]" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {cart.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center gap-4">
              <div className="size-24 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-6xl text-gray-300">shopping_cart_off</span>
              </div>
              <p className="text-gray-500 font-medium">العربة فارغة حالياً</p>
              <button 
                onClick={() => onNavigate(AppScreen.HOME)} 
                className="bg-primary text-black font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 px-4 py-6 items-center animate-in fade-in slide-in-from-right-4">
                <div className="size-24 rounded-2xl bg-cover bg-center border border-gray-100 dark:border-gray-800 shadow-sm" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="flex-1">
                  <p className="font-bold text-base">{item.name}</p>
                  <p className="text-gray-400 text-xs">اللون: {item.color}</p>
                  <p className="text-primary font-bold text-sm mt-1">{item.price.toLocaleString()} د.ع</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button 
                    onClick={() => setItemToRemove(item)} 
                    aria-label="حذف المنتج"
                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                    <button 
                      onClick={() => onUpdateQty(item.id, -1)} 
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-gray-700 shadow-sm active:scale-90 transition-transform"
                    >-</button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQty(item.id, 1)} 
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-gray-700 shadow-sm active:scale-90 transition-transform"
                    >+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 space-y-4">
            <div className="flex gap-2">
              <input 
                className="flex-1 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary px-4" 
                placeholder="لديك رمز خصم؟" 
                type="text" 
              />
              <button className="bg-black dark:bg-white dark:text-black text-white px-6 rounded-xl text-sm font-bold active:scale-95 transition-transform">تطبيق</button>
            </div>

            <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl space-y-3">
              <div className="flex justify-between text-sm">
                <p className="text-gray-500">المجموع الفرعي</p>
                <p className="font-bold">{subtotal.toLocaleString()} د.ع</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-gray-500">رسوم التوصيل</p>
                <p className={shipping === 0 ? "text-green-500 font-bold" : "font-bold"}>
                  {shipping === 0 ? 'مجاني' : `${shipping.toLocaleString()} د.ع`}
                </p>
              </div>
              <div className="pt-3 border-t border-dashed border-gray-300 dark:border-gray-700 flex justify-between items-center">
                <p className="text-lg font-bold">الإجمالي</p>
                <p className="text-primary text-2xl font-black">{total.toLocaleString()} د.ع</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-background-dark/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 z-50">
          <button 
              onClick={() => onNavigate(AppScreen.CHECKOUT)}
              className="w-full bg-primary hover:brightness-105 active:scale-[0.98] text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20 transition-all"
          >
            <span>متابعة الدفع</span>
            <span className="material-symbols-outlined">payments</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
