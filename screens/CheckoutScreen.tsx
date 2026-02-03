
import React, { useState } from 'react';
import { CartItem, AppScreen } from '../types';

interface CheckoutScreenProps {
  cart: CartItem[];
  onNavigate: (s: AppScreen) => void;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ cart, onNavigate }) => {
  const [isGuest, setIsGuest] = useState(true);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 250000 ? 0 : 5000;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark">
      <header className="sticky top-0 z-50 bg-white dark:bg-background-dark border-b border-gray-100 dark:border-gray-800 flex items-center p-4">
        <button onClick={() => onNavigate(AppScreen.CART)} className="size-10 flex items-center justify-center rounded-full">
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">إتمام الطلب</h2>
      </header>

      <main className="pb-32">
        <div className="flex w-full flex-col items-center justify-center gap-2 py-6 px-4">
          <div className="flex w-full justify-between px-10 relative">
            <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>
            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold ring-4 ring-primary/20">1</div>
              <span className="text-xs font-medium">المعلومات</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-xs font-bold">2</div>
              <span className="text-xs font-medium text-gray-400">التوصيل</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-xs font-bold">3</div>
              <span className="text-xs font-medium text-gray-400">الدفع</span>
            </div>
          </div>
        </div>

        <section className="px-4 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">معلومات المستلم</h3>
            <button 
              onClick={() => setIsGuest(!isGuest)}
              className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full"
            >
              <span className="material-symbols-outlined text-sm">{isGuest ? 'person_off' : 'person'}</span>
              {isGuest ? 'الشراء كضيف مفعل' : 'تسجيل الدخول؟'}
            </button>
          </div>
          
          <div className="space-y-4">
            {isGuest && (
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">خيار سريع</p>
                <p className="text-xs text-gray-400">أنت تتابع عملية الشراء كضيف. لن يتم إنشاء حساب لك.</p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">البريد الإلكتروني</p>
              <input 
                dir="ltr"
                type="email"
                className="w-full text-left rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 h-14 p-4 focus:ring-primary focus:border-primary outline-none" 
                placeholder="example@mail.com" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">الاسم الكامل</p>
              <input className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 h-14 p-4 focus:ring-primary focus:border-primary outline-none" placeholder="أدخل اسمك بالكامل" />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">رقم الهاتف</p>
              <input dir="ltr" className="w-full text-left rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 h-14 p-4 focus:ring-primary focus:border-primary outline-none" placeholder="07XXXXXXXXX" />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">المدينة</p>
              <div className="relative">
                <select className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 h-14 px-4 focus:ring-primary focus:border-primary appearance-none outline-none">
                  <option>بغداد</option>
                  <option>البصرة</option>
                  <option>أربيل</option>
                  <option>الموصل</option>
                  <option>النجف</option>
                  <option>كربلاء</option>
                </select>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 px-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">موقع التوصيل الدقيق</h3>
            <button className="text-primary text-xs font-bold border-b border-primary">تحديد تلقائي</button>
          </div>
          <div className="w-full h-48 rounded-xl overflow-hidden relative border border-gray-100 dark:border-gray-800 shadow-inner">
            <img className="w-full h-full object-cover grayscale opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3v3SYlEXdR-Pd3aruuRMLvfHFtYhOW4rfygk9YCvB1hILjVkeStVIIafC_1OYpZNPopXxjMD9ReimF0NvnoX43ZndNGY3T3uPOzxwQWFoBSNOdIjEN4COIq1Xj4FSHU4Wr__yYtSFuieOPCIWC-IMwfF-H0-ReZpHZ8rSeZtZ2UldV4bqmLKwU5qzN2GCOZ3lH2foKr54O3s-7jIvqktxGckO3yHrnCj1X4GuR2hUMGgwQriqk79H5hwEqsPwuBRUQRozF9f1qfOU" alt="Map" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600 text-4xl mb-8 fill-1 animate-bounce">location_on</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">المبلغ الإجمالي</span>
          <span className="text-2xl font-black text-primary">{total.toLocaleString()} د.ع</span>
        </div>
        <button 
          onClick={() => {
            alert('تم استلام طلبك بنجاح! شكراً لاختيارك متجر الحقائب الملكي.');
            onNavigate(AppScreen.HOME);
          }}
          className="w-full bg-primary hover:brightness-105 active:scale-[0.98] text-black font-black py-4 rounded-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 transition-all"
        >
          <span>تأكيد وإتمام الطلب</span>
          <span className="material-symbols-outlined">check_circle</span>
        </button>
      </footer>
    </div>
  );
};

export default CheckoutScreen;
