
import React, { useState } from 'react';
import { AppScreen } from '../types';

interface AdminContentMgmtProps {
  onNavigate: (s: AppScreen) => void;
}

const AdminContentMgmt: React.FC<AdminContentMgmtProps> = ({ onNavigate }) => {
  const [aboutUsContent, setAboutUsContent] = useState(
    "نحن متجر الحقائب الملكي، نوفر لكم أرقى التصاميم العالمية المصنوعة من أجود أنواع الجلود الطبيعية. بدأت رحلتنا من بغداد لتصل إلى كل أنحاء العراق، ملتزمين دائماً بالجودة والفخامة."
  );
  const [isSavingAbout, setIsSavingAbout] = useState(false);
  const [showAboutSuccess, setShowAboutSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSaveAbout = () => {
    setIsSavingAbout(true);
    setTimeout(() => {
      setIsSavingAbout(false);
      setShowAboutSuccess(true);
      setTimeout(() => setShowAboutSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background-dark text-white pb-20">
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-background-surface text-slate-900 dark:text-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="relative aspect-video w-full bg-primary/10 flex items-center justify-center border-b border-gray-100 dark:border-white/5">
              <span className="material-symbols-outlined text-primary text-6xl opacity-40">brand_awareness</span>
              <button 
                onClick={() => setShowPreview(false)}
                className="absolute top-4 left-4 size-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>
            <div className="p-8">
              <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-2 block text-center">معاينة الواجهة</span>
              <h3 className="text-2xl font-bold mb-4 text-center">من نحن</h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-center whitespace-pre-wrap">
                  {aboutUsContent}
                </p>
              </div>
              <button 
                onClick={() => setShowPreview(false)}
                className="w-full mt-8 bg-primary text-black font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                إغلاق المعاينة
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="flex items-center bg-background-dark p-4 border-b border-white/10 sticky top-0 z-50">
        <button onClick={() => onNavigate(AppScreen.ADMIN_DASHBOARD)} className="text-primary size-12 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">إدارة محتوى التطبيق</h2>
        <div className="size-12 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">settings</span>
        </div>
      </header>

      <main className="px-4 pb-6">
        <h2 className="text-[22px] font-bold pt-6 pb-2">تعديل أقسام التطبيق</h2>
        <p className="text-slate-400 text-sm mb-6">تحكم في محتوى الواجهة الرئيسية والمتجر من هنا</p>

        {/* Home Banner Section */}
        <div className="bg-[#2a281e] rounded-xl p-4 mb-8 border border-primary/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 size-12">
              <span className="material-symbols-outlined">image</span>
            </div>
            <div>
              <p className="font-medium">البانر الرئيسي</p>
              <p className="text-slate-400 text-xs">صورة الهيرو والعنوان الترويجي</p>
            </div>
          </div>
          
          <div className="mt-4 border-2 border-dashed border-primary/30 rounded-xl p-8 flex flex-col items-center justify-center bg-[#1e1c14] group cursor-pointer">
            <span className="material-symbols-outlined text-primary text-4xl mb-2">cloud_upload</span>
            <p className="text-sm font-medium">اسحب الصورة هنا أو اضغط للرفع</p>
            <p className="text-slate-400 text-xs mt-1">المقاس الموصى به: 1200x600 بكسل</p>
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-slate-400 text-sm block">العنوان الرئيسي (باللغة العربية)</label>
            <input className="w-full bg-[#1e1c14] border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-primary transition-all" defaultValue="أرقى تصاميم الحقائب العالمية" />
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-primary text-black font-bold py-3 rounded-lg text-sm shadow-lg shadow-primary/10">حفظ التغييرات</button>
          </div>
        </div>

        {/* New About Us Section with Rich Text Editor */}
        <section className="bg-[#2a281e] rounded-xl p-5 mb-8 border border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 size-12">
              <span className="material-symbols-outlined">info</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">قسم "من نحن"</h3>
              <p className="text-slate-400 text-xs">تعديل النص التعريفي وتاريخ المتجر</p>
            </div>
            {showAboutSuccess && (
              <span className="text-green-500 text-xs font-bold animate-pulse flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                تم الحفظ
              </span>
            )}
          </div>

          {/* Simulated Rich Text Editor */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-[#1e1c14]">
            {/* Toolbar */}
            <div className="bg-[#252319] border-b border-white/5 p-2 flex items-center gap-1">
              <button className="p-2 hover:bg-white/5 rounded text-slate-300" title="Bold"><span className="material-symbols-outlined text-xl">format_bold</span></button>
              <button className="p-2 hover:bg-white/5 rounded text-slate-300" title="Italic"><span className="material-symbols-outlined text-xl">format_italic</span></button>
              <button className="p-2 hover:bg-white/5 rounded text-slate-300" title="Underline"><span className="material-symbols-outlined text-xl">format_underlined</span></button>
              <div className="w-px h-6 bg-white/10 mx-1"></div>
              <button className="p-2 hover:bg-white/5 rounded text-slate-300" title="List Bullet"><span className="material-symbols-outlined text-xl">format_list_bulleted</span></button>
              <button className="p-2 hover:bg-white/5 rounded text-slate-300" title="List Number"><span className="material-symbols-outlined text-xl">format_list_numbered</span></button>
              <div className="w-px h-6 bg-white/10 mx-1"></div>
              <button className="p-2 hover:bg-white/5 rounded text-slate-300" title="Link"><span className="material-symbols-outlined text-xl">link</span></button>
              <button className="p-2 hover:bg-white/5 rounded text-slate-300" title="Clear Formatting"><span className="material-symbols-outlined text-xl">format_clear</span></button>
            </div>
            
            <textarea 
              value={aboutUsContent}
              onChange={(e) => setAboutUsContent(e.target.value)}
              className="w-full bg-transparent p-4 min-h-[180px] outline-none text-slate-300 leading-relaxed text-sm resize-none"
              placeholder="اكتب قصة متجركم هنا..."
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button 
              onClick={() => setShowPreview(true)}
              className="flex-1 border-2 border-primary/40 text-primary font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-primary/5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-lg">visibility</span>
              <span>معاينة النص</span>
            </button>
            <button 
              onClick={handleSaveAbout}
              disabled={isSavingAbout}
              className="flex-1 bg-primary text-black font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSavingAbout ? (
                <span className="animate-spin material-symbols-outlined text-lg">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined text-lg">save</span>
              )}
              <span>حفظ المحتوى</span>
            </button>
          </div>
        </section>

        {/* Other Sections */}
        <div className="space-y-3">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest px-1 mb-2">أقسام إضافية</h3>
          {[
            { icon: 'campaign', label: 'شريط الإعلانات', sub: 'تحديث نص التنبيهات العلوي' },
            { icon: 'contact_support', label: 'معلومات التواصل', sub: 'أرقام الهاتف، واتساب والموقع' },
            { icon: 'policy', label: 'سياسة الاسترجاع', sub: 'تعديل بنود الضمان والاسترجاع' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-[#2a281e] px-4 min-h-[72px] py-3 rounded-xl border border-white/5 justify-between group hover:border-primary/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 size-12 group-hover:bg-primary/20 transition-all">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <p className="font-medium leading-normal">{item.label}</p>
                  <p className="text-slate-400 text-xs font-normal">{item.sub}</p>
                </div>
              </div>
              <button className="min-w-[84px] rounded-lg h-9 px-4 bg-[#393628] hover:bg-primary hover:text-black text-sm font-medium transition-all">تعديل</button>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
          <button 
            onClick={() => onNavigate(AppScreen.HOME)}
            className="w-full bg-primary/10 text-primary border border-primary/20 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/20 transition-all"
          >
            <span className="material-symbols-outlined">visibility</span>
            معاينة المتجر الحية
          </button>
          <p className="text-center text-slate-400 text-[10px] uppercase tracking-tighter">آخر تحديث تم بواسطة Admin • منذ ٢ ساعة</p>
        </div>
      </main>
    </div>
  );
};

export default AdminContentMgmt;
