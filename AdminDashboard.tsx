
import React from 'react';
import { AppScreen, User } from './types';
import { APP_LOGO } from './constants';

interface AdminDashboardProps {
  onNavigate: (s: AppScreen) => void;
  currentUser: User | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, currentUser }) => {
  return (
    <div className="pb-24 bg-background-light dark:bg-background-dark min-h-screen text-right">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 p-4 flex items-center justify-between">
        <div className="relative">
          <span className="material-symbols-outlined text-slate-600 dark:text-white text-2xl">notifications</span>
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-background-dark"></span>
        </div>
        <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-white rounded-lg p-1.5 shadow-inner flex items-center justify-center overflow-hidden">
              <img src={APP_LOGO} alt="HR Logo" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <h2 className="text-lg font-black pr-2 tracking-tighter uppercase leading-none">HR DASHBOARD</h2>
        </div>
        <button className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
          <span className="material-symbols-outlined text-xl">person_pin</span>
        </button>
      </header>

      <main className="p-4 space-y-6">
        <div className="pt-2">
          <p className="text-slate-500 text-sm font-bold">أهلاً بك، {currentUser?.displayName || 'مدير النظام'}</p>
          <h1 className="text-2xl font-black mt-1 uppercase">HR ACCESSORIES <span className="text-primary text-xs bg-primary/10 px-2 py-0.5 rounded-full">{currentUser?.role.toUpperCase()}</span></h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div onClick={() => onNavigate(AppScreen.ADMIN_REPORTS)} className="flex flex-col gap-2 rounded-[24px] p-6 bg-white dark:bg-background-surface border border-gray-100 dark:border-white/5 shadow-sm cursor-pointer hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-1">
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">إجمالي المبيعات</p>
              <span className="material-symbols-outlined text-primary">payments</span>
            </div>
            <p className="text-3xl font-black tracking-tight">٤,٥٠٠,٠٠٠ د.ع</p>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
              <p className="text-green-500 text-xs font-black">+١٢% نمو</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 rounded-[24px] p-5 bg-white dark:bg-background-surface border border-gray-100 dark:border-white/5">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">الطلبات</p>
              <p className="text-2xl font-black">٢٤</p>
              <p className="text-green-500 text-[10px] font-black">+٥%</p>
            </div>
            <div className="flex flex-col gap-2 rounded-[24px] p-5 bg-white dark:bg-background-surface border border-gray-100 dark:border-white/5">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">المخزون</p>
              <p className="text-2xl font-black">١٥٠</p>
              <p className="text-slate-400 text-[10px] font-black">مستقر</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4 px-1">إجراءات الإدارة</h2>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => onNavigate(AppScreen.ADMIN_ADD_PRODUCT)} className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-primary text-black font-black shadow-xl shadow-primary/10 transition-transform active:scale-95">
              <span className="material-symbols-outlined text-3xl">add_box</span>
              <span className="text-xs">منتج جديد</span>
            </button>
            <button onClick={() => onNavigate(AppScreen.ADMIN_CONTENT_MGMT)} className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-white dark:bg-background-surface border border-gray-100 dark:border-white/5 font-black transition-transform active:scale-95">
              <span className="material-symbols-outlined text-3xl text-primary">edit_square</span>
              <span className="text-xs">تعديل المحتوى</span>
            </button>

            {/* Manage Users Button - Only visible to ADMIN role */}
            {currentUser?.role === 'admin' && (
              <button 
                onClick={() => onNavigate(AppScreen.ADMIN_USER_MGMT)} 
                className="col-span-2 flex items-center justify-center gap-4 p-5 rounded-3xl bg-slate-900 text-white border border-white/5 font-black hover:bg-slate-800 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-primary">manage_accounts</span>
                <span className="text-sm">إدارة المستخدمين والصلاحيات</span>
              </button>
            )}
          </div>
        </section>

        {/* Notification Preview */}
        <section className="bg-[#1a1a1a] rounded-[32px] p-6 border border-white/5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-sm uppercase tracking-widest text-white">تنبيهات النظام</h3>
                <button onClick={() => onNavigate(AppScreen.ADMIN_NOTIFICATIONS)} className="text-primary text-[10px] font-black">مشاهدة الكل</button>
            </div>
            <div className="space-y-4">
                <div className="flex gap-4 items-center">
                    <div className="size-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="flex-1 text-right">
                        <p className="text-xs font-bold text-white">طلب جديد من الكرادة #٩٩٨٢</p>
                        <p className="text-[10px] text-slate-500">منذ دقيقتين</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-500 text-sm rotate-180">chevron_left</span>
                </div>
            </div>
        </section>
      </main>

      {/* Admin Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-2xl border-t border-gray-200 dark:border-white/10 pb-8 pt-3 z-50">
        <div className="flex items-center justify-around px-4">
          <button 
            aria-label="الرئيسية"
            className="flex flex-col items-center gap-1.5 text-primary active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined fill-1 text-[28px]">dashboard</span>
            <span className="text-[11px] font-black uppercase tracking-tight">الرئيسية</span>
          </button>
          
          <button 
            onClick={() => onNavigate(AppScreen.ADMIN_ADD_PRODUCT)} 
            aria-label="المخزون"
            className="flex flex-col items-center gap-1.5 text-gray-400 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[28px]">inventory_2</span>
            <span className="text-[11px] font-black uppercase tracking-tight">المخزون</span>
          </button>
          
          <button 
            onClick={() => onNavigate(AppScreen.ADMIN_ORDERS)} 
            aria-label="الطلبات"
            className="flex flex-col items-center gap-1.5 text-gray-400 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[28px]">list_alt</span>
            <span className="text-[11px] font-black uppercase tracking-tight">الطلبات</span>
          </button>
          
          <button 
            onClick={() => onNavigate(AppScreen.ADMIN_REPORTS)} 
            aria-label="التقارير"
            className="flex flex-col items-center gap-1.5 text-gray-400 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[28px]">query_stats</span>
            <span className="text-[11px] font-black uppercase tracking-tight">التقارير</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminDashboard;
