
import React from 'react';
import { AppScreen } from '../types';

interface AdminNotificationsProps {
  onNavigate: (s: AppScreen) => void;
}

const NOTIFS = [
  { id: 1, title: 'طلب جديد رقم #5432', sub: 'الموقع: بغداد، الكرادة', time: 'منذ ٥ دقائق', type: 'order', isUnread: true },
  { id: 2, title: 'نفاد الكمية', sub: 'حقيبة كلاسيك جلد أسود غير متوفرة', time: 'منذ ١٥ دقيقة', type: 'alert', isUnread: false },
  { id: 3, title: 'رسالة جديدة', sub: 'استفسار من العميل حول التوصيل', time: 'منذ ٣٠ دقيقة', type: 'message', isUnread: false },
  { id: 4, title: 'تم تسليم الطلب #5420', sub: 'الموقع: البصرة، العشار', time: 'منذ ساعتين', type: 'order', isUnread: false },
  { id: 5, title: 'رسالة جديدة من سارة', sub: 'هل تتوفر الحقيبة باللون الماروني؟', time: 'منذ ٣ ساعات', type: 'message', isUnread: true },
];

const AdminNotifications: React.FC<AdminNotificationsProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-background-dark text-white">
      <header className="sticky top-0 z-50 bg-background-dark border-b border-gray-800 flex items-center p-4">
        <button onClick={() => onNavigate(AppScreen.ADMIN_DASHBOARD)} className="size-12 flex items-center justify-start">
          <span className="material-symbols-outlined text-primary">settings</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-12">الإشعارات</h2>
        <div className="w-12 flex justify-end">
          <span className="material-symbols-outlined text-primary">select_check_box</span>
        </div>
      </header>

      <div className="border-b border-gray-800 flex px-4 gap-8">
        <button className="border-b-[3px] border-primary text-primary pb-3 pt-4 text-sm font-bold">الكل</button>
        <button className="border-b-[3px] border-transparent text-gray-500 pb-3 pt-4 text-sm font-bold">غير مقروء</button>
        <button className="border-b-[3px] border-transparent text-gray-500 pb-3 pt-4 text-sm font-bold">الطلبات</button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {NOTIFS.map(n => (
          <div key={n.id} className={`flex gap-4 px-4 py-4 justify-between border-b border-gray-800 relative transition-colors ${n.isUnread ? 'bg-primary/10' : 'bg-transparent'}`}>
            {n.isUnread && <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full" />}
            <div className="flex gap-4 items-start pr-2">
              <div className={`flex items-center justify-center rounded-lg shrink-0 size-12 ${n.type === 'order' ? 'bg-primary/20 text-primary' : n.type === 'alert' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                <span className="material-symbols-outlined">{n.type === 'order' ? 'shopping_bag' : n.type === 'alert' ? 'warning' : 'mail'}</span>
              </div>
              <div>
                <p className="font-bold text-base leading-tight">{n.title}</p>
                <p className="text-gray-400 text-sm mt-1">{n.sub}</p>
              </div>
            </div>
            <p className="text-gray-500 text-[10px] shrink-0">{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotifications;
