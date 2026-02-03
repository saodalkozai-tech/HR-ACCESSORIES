
import React, { useState } from 'react';
import { AppScreen } from '../types';

interface AdminAddProductProps {
  onNavigate: (s: AppScreen) => void;
}

const AdminAddProduct: React.FC<AdminAddProductProps> = ({ onNavigate }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // محاكاة عملية حفظ
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onNavigate(AppScreen.ADMIN_DASHBOARD);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col pb-32 relative">
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-background-surface border border-primary/30 p-8 rounded-3xl flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="size-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
            </div>
            <h3 className="text-xl font-bold mb-2">تم الحفظ بنجاح!</h3>
            <p className="text-slate-400 text-sm">تمت إضافة المنتج الجديد إلى قائمة المعروضات.</p>
          </div>
        </div>
      )}

      <header className="px-4 py-3 flex items-center justify-between sticky top-0 z-40 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <button onClick={() => onNavigate(AppScreen.ADMIN_DASHBOARD)} className="size-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-primary">arrow_forward</span>
        </button>
        <h1 className="text-lg font-bold">إضافة منتج جديد</h1>
        <button className="text-primary font-semibold text-sm hover:underline">معاينة</button>
      </header>

      <main className="p-4 space-y-6">
        <section>
          <label className="block text-sm font-medium mb-3 text-slate-400">صور المنتج الفاخرة</label>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            <button className="shrink-0 w-36 h-48 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center gap-2 group hover:border-primary transition-all active:scale-95">
              <span className="material-symbols-outlined text-primary text-4xl">add_a_photo</span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider">أضف صورة</span>
            </button>
            <div className="relative shrink-0 w-36 h-48 rounded-2xl overflow-hidden bg-cover bg-center border border-white/5" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLEdsJAvSOcc7X1F2FFFtjzrFb_NvPI2lPUwkxCyRjdmWsI0n1n-5U4VulqphWr7FnzWI-XglRzuQ4uGjDbYqpYECXUJaQDlETQZihCq41VBLOT5MFMcv7A-Z4Lxu2hVTsVztl5dsLdMclEHztiWZTf2YMk3LUDqTRDyuw9R2RhILdYzuZsxp_vA8UgfRK0fXY9fgfgTtuuYsUyJCv-x0oHvwkwWo73FLtuemzvtxaoHNM1y64KBRPWWBC8TcCpMKfaC_HHrLvoaoS")' }}>
              <div className="absolute bottom-0 left-0 right-0 bg-primary/90 py-1.5 text-[10px] text-center font-bold text-black uppercase">الرئيسية</div>
              <button className="absolute top-2 left-2 size-6 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xs">close</span>
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">اسم المنتج</label>
            <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="مثلاً: حقيبة كلاسيك جلد تمساح" />
          </div>
          
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">وصف المنتج</label>
            <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/50 outline-none min-h-[140px] transition-all resize-none" placeholder="اشرح تفاصيل القطعة، نوع الجلد، والمميزات..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">السعر الإجمالي</label>
              <div className="relative">
                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-14 focus:ring-2 focus:ring-primary/50 outline-none font-bold text-primary" defaultValue="125000" />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-500">د.ع</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">الفئة</label>
              <div className="relative">
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 appearance-none focus:ring-2 focus:ring-primary/50 outline-none transition-all">
                  <option>حقيبة يد</option>
                  <option>حقيبة سهرة</option>
                  <option>يومي عملي</option>
                </select>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/5 overflow-hidden">
            <div className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors">
              <div>
                <p className="font-bold text-sm">متوفر في المخزون</p>
                <p className="text-[10px] text-slate-500">تفعيل إمكانية الطلب المباشر</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors">
              <div>
                <p className="font-bold text-sm">منتج مميز (Featured)</p>
                <p className="text-[10px] text-slate-500">عرض في القسم العلوي للمتجر</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-black font-black py-5 rounded-2xl shadow-2xl shadow-primary/10 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          {isSaving ? (
            <span className="animate-spin material-symbols-outlined">progress_activity</span>
          ) : (
            <>
              <span className="material-symbols-outlined">save</span>
              <span>حفظ المنتج والانتشار</span>
            </>
          )}
        </button>
      </main>
    </div>
  );
};

export default AdminAddProduct;
