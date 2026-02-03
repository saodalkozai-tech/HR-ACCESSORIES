
import React from 'react';
import { AppScreen } from '../types';

interface AdminReportsProps {
  onNavigate: (s: AppScreen) => void;
}

const CHART_DATA = [
  { name: 'يناير', value: 60, height: '40%' },
  { name: 'فبراير', value: 80, height: '60%' },
  { name: 'مارس', value: 70, height: '50%' },
  { name: 'أبريل', value: 100, height: '80%' },
  { name: 'مايو', value: 40, height: '30%' },
  { name: 'يونيو', value: 55, height: '45%' },
];

const AdminReports: React.FC<AdminReportsProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-background-dark text-white pb-32">
      <header className="sticky top-0 z-10 flex items-center bg-background-dark/95 backdrop-blur-md p-4 border-b border-white/5">
        <button onClick={() => onNavigate(AppScreen.ADMIN_DASHBOARD)} className="size-12 flex items-center">
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">تقارير المبيعات المتقدمة</h2>
        <div className="w-12 flex justify-end">
          <button className="size-10 rounded-lg bg-white/5 flex items-center justify-center">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <div className="flex h-12 bg-white/5 p-1 rounded-xl border border-white/10">
          {['يومي', 'أسبوعي', 'شهري', 'سنوي'].map((range, i) => (
            <button 
                key={i} 
                className={`flex-1 rounded-lg text-sm font-bold transition-all ${range === 'شهري' ? 'bg-primary text-black shadow-lg' : 'text-white/60'}`}
            >
              {range}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="rounded-xl p-6 bg-white/5 border border-white/10 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 size-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
            <p className="text-white/60 text-sm font-medium">إجمالي الإيرادات</p>
            <p className="text-primary text-3xl font-bold mt-1">٤٥,٢٥٠,٠٠٠ د.ع</p>
            <div className="flex items-center gap-1 text-[#0bda20] mt-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <p className="text-sm font-bold">+١٢.٥%</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-5 bg-white/5 border border-white/10">
              <p className="text-white/60 text-xs">إجمالي الطلبات</p>
              <p className="text-xl font-bold mt-1">١,٢٤٠</p>
              <p className="text-[#0bda20] text-xs font-bold mt-1">+٥%</p>
            </div>
            <div className="rounded-xl p-5 bg-white/5 border border-white/10">
              <p className="text-white/60 text-xs">متوسط قيمة الطلب</p>
              <p className="text-xl font-bold mt-1">٣٦,٥٠٠ د.ع</p>
              <p className="text-[#fa4238] text-xs font-bold mt-1">-٢%</p>
            </div>
          </div>
        </div>

        {/* Custom SVG Chart Replacement */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">نمو الإيرادات</h3>
            <div className="flex items-center gap-2">
                <div className="size-2 bg-primary rounded-full"></div>
                <span className="text-[10px] text-gray-400">النمو الفعلي</span>
            </div>
          </div>
          
          <div className="h-48 w-full flex items-end justify-between gap-4 px-2">
            {CHART_DATA.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full h-full flex items-end">
                   <div 
                    className={`w-full rounded-t-lg transition-all duration-700 delay-[${i*100}ms] ${item.value === 100 ? 'bg-primary' : 'bg-primary/20 group-hover:bg-primary/40'}`}
                    style={{ height: item.height }}
                   >
                     {/* Tooltip on hover */}
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-[10px] text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.value}%
                     </div>
                   </div>
                </div>
                <span className="text-[10px] text-gray-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-4">
            <h3 className="font-bold text-sm">أفضل المنتجات أداءً</h3>
            {[
                { name: 'حقيبة كلاسيك ذهبية', val: 78 },
                { name: 'حقيبة يد ملكية', val: 62 },
                { name: 'حقيبة سهرة فاخرة', val: 45 }
            ].map((p, i) => (
                <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                        <span>{p.name}</span>
                        <span className="text-primary">{p.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${p.val}%` }}></div>
                    </div>
                </div>
            ))}
        </div>

        <button className="w-full bg-primary text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 shadow-xl shadow-primary/20 active:scale-95 transition-transform">
          <span className="material-symbols-outlined">download</span>
          تحميل التقرير التفصيلي (PDF)
        </button>
      </main>
    </div>
  );
};

export default AdminReports;
