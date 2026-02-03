
import React from 'react';
import { AppScreen } from '../types';

interface AdminOrdersProps {
  onNavigate: (s: AppScreen) => void;
}

const ORDERS = [
  { id: '8492', customer: 'سارة أحمد', price: 150000, date: '12 أكتوبر 2023', status: 'جديد', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOY-DyRhJNKezr15zHdr4d1n9YttzVks7r5EpwGZqP1o2OLKX3CmTddvDBPyH3UH3mhFjE87A84JqiI17rAnuEujqJR8R8Kw3i2Yn01wfGX0jfZ2b8N_vqeaB8gR89PfmR1dkda1USwqQxD8zHhvpv-te2NsPzbX86t51IPiXvow0RHlY0LkV1aIU7WTe69SQ7ecs8ccfc2EjIqL_OBRCcd8eUfMTVKP3txZTfWwe078Xl_iAoPjpxjfmq_MG5psDSRtYtetUv5nxJ' },
  { id: '8491', customer: 'محمد علي', price: 275000, date: '11 أكتوبر 2023', status: 'قيد التنفيذ', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAarG8YNQVbsAQZ7c94nTlEQV-X07xYnhneCLWyuKvbKROhsVTwNv7H_DXebzbbTija4BDm-r5-LjW8cAb7CylOpvPF7oDc3tJ7i7NaDaJZi6D4bLBzBScH6gE8cvSy2zyfMerJn5DLgTtvGAtnJkAQHmbGGenE2e-OwmLeAvjY5q8XA-Pi6Syx89tZ66SIw2JdfvVcB70fegGfIsM4XjexGhO2zoa7ODevizhV4BafU6tjkAtw_7D75LL1zomMzthW3nk2PADmHrP4' },
  { id: '8488', customer: 'ليلى حسن', price: 420000, date: '10 أكتوبر 2023', status: 'تم التوصيل', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6XfUNGVWllURdzRRfI1nkHLwuKgtjHNlRON0dWoyJhZqqWGue1r1h031R0Yw7YgwUYXXbhts25fnngsWMQXhaXEADUoCR_roDKdoBtY6iePwpv8zyGNTdtDecyI-Ooogws9OjtORw6kUV8-w497j-r-p9R5yrTwZE_97Z4IkUKk04moXCJoBLcGGc9EENzHZHTKfGGUU2oYIunkk_WhKPlIsH-0xDzRxg0ATdonHhXZChbE_6YHmAzbiKcW9TbNZxBBfS56DLgM9p' },
];

const AdminOrders: React.FC<AdminOrdersProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-background-dark text-white pb-32">
      <header className="sticky top-0 z-50 flex items-center bg-background-dark p-4 border-b border-white/10">
        <button onClick={() => onNavigate(AppScreen.ADMIN_DASHBOARD)} className="text-primary size-12 flex items-center justify-start">
          <span className="material-symbols-outlined text-[28px]">menu</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">إدارة الطلبات</h2>
        <div className="w-12 flex justify-end">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
        </div>
      </header>

      <div className="px-4 py-4">
        <div className="flex h-12 bg-[#221d10] items-center rounded-xl overflow-hidden px-4">
          <span className="material-symbols-outlined text-primary">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm flex-1 mr-2" placeholder="ابحث برقم الطلب..." />
        </div>
      </div>

      <div className="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar">
        {['الكل', 'جديد', 'قيد التنفيذ', 'تم التوصيل'].map((s, i) => (
          <button key={i} className={`h-10 px-6 rounded-xl shrink-0 text-sm font-bold ${s === 'الكل' ? 'bg-primary text-black' : 'bg-[#221d10] border border-white/5'}`}>{s}</button>
        ))}
      </div>

      <div className="px-4 space-y-3">
        {ORDERS.map(o => (
          <div key={o.id} className="bg-[#221d10] rounded-xl p-4 border border-white/5">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-4">
                <div className="size-16 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${o.img})` }} />
                <div>
                  <p className="font-bold text-base leading-tight">طلب #{o.id} - {o.customer}</p>
                  <p className="text-primary text-sm font-medium mt-1">{o.price.toLocaleString()} د.ع</p>
                  <p className="text-gray-400 text-xs mt-1">{o.date}</p>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${o.status === 'جديد' ? 'bg-primary/20 text-primary' : o.status === 'تم التوصيل' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>{o.status}</span>
            </div>
            <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-1">
              <button className="flex items-center gap-1 hover:text-primary">
                <span className="material-symbols-outlined text-xl">visibility</span>
                <span className="text-xs">عرض التفاصيل</span>
              </button>
              <button className="text-red-400">
                <span className="material-symbols-outlined text-xl">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
