
import React, { useState } from 'react';
import { AppScreen, User } from '../types';

interface AdminUserMgmtProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  onNavigate: (s: AppScreen) => void;
}

const AdminUserMgmt: React.FC<AdminUserMgmtProps> = ({ users, setUsers, onNavigate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    displayName: '',
    role: 'editor' as User['role']
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Date.now().toString(),
      username: formData.username,
      password: formData.password,
      displayName: formData.displayName,
      role: formData.role
    };
    setUsers([...users, newUser]);
    resetForm();
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    resetForm();
  };

  const deleteUser = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ username: '', password: '', displayName: '', role: 'editor' });
    setIsAdding(false);
    setEditingUser(null);
  };

  const startEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: user.password,
      displayName: user.displayName,
      role: user.role
    });
    setIsAdding(true);
  };

  return (
    <div className="min-h-screen bg-background-dark text-white pb-32">
      <header className="sticky top-0 z-50 flex items-center bg-background-dark/95 backdrop-blur-md p-4 border-b border-white/5">
        <button onClick={() => onNavigate(AppScreen.ADMIN_DASHBOARD)} className="size-12 flex items-center">
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">إدارة المستخدمين</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"
        >
          <span className="material-symbols-outlined">person_add</span>
        </button>
      </header>

      <main className="p-4">
        {/* User Stats Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-slate-400 text-xs mb-1">إجمالي المستخدمين</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-slate-400 text-xs mb-1">مدراء النظام</p>
            <p className="text-2xl font-bold text-primary">{users.filter(u => u.role === 'admin').length}</p>
          </div>
        </div>

        {/* User List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">قائمة الموظفين</h3>
          {users.map(user => (
            <div key={user.id} className="bg-[#1e1c14] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`size-12 rounded-xl flex items-center justify-center ${user.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-400'}`}>
                  <span className="material-symbols-outlined">
                    {user.role === 'admin' ? 'admin_panel_settings' : user.role === 'editor' ? 'edit' : 'visibility'}
                  </span>
                </div>
                <div>
                  <p className="font-bold">{user.displayName}</p>
                  <p className="text-xs text-slate-500">@{user.username} • {user.role === 'admin' ? 'مدير نظام' : user.role === 'editor' ? 'محرر محتوى' : 'مشاهد فقط'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => startEdit(user)}
                  className="size-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
                {users.length > 1 && (
                  <button 
                    onClick={() => deleteUser(user.id)}
                    className="size-9 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Roles/Permissions Guide */}
        <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
          <h4 className="text-xs font-bold text-primary uppercase mb-3 tracking-widest">دليل الصلاحيات</h4>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="text-primary font-bold">Admin:</span>
              <span className="text-xs text-slate-400">كامل الصلاحيات (تقارير، مستخدمين، منتجات).</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold">Editor:</span>
              <span className="text-xs text-slate-400">تعديل المنتجات والمحتوى والطلبات فقط.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold">Viewer:</span>
              <span className="text-xs text-slate-400">مشاهدة التقارير والطلبات بدون تعديل.</span>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-background-dark border border-white/10 w-full max-w-sm rounded-[32px] p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingUser ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}</h3>
              <button onClick={resetForm} className="size-10 rounded-full bg-white/5 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">الاسم المكتمل</label>
                <input 
                  required
                  value={formData.displayName}
                  onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary/50 text-white"
                  placeholder="مثلاً: محمد أحمد"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">اسم المستخدم</label>
                <input 
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary/50 text-white"
                  placeholder="username"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">كلمة المرور</label>
                <input 
                  required
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary/50 text-white"
                  placeholder="password"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">الدور / الصلاحية</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as User['role']})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary/50 text-white appearance-none"
                >
                  <option value="admin">مدير نظام (Admin)</option>
                  <option value="editor">محرر (Editor)</option>
                  <option value="viewer">مشاهد (Viewer)</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-black font-black py-4 rounded-2xl mt-4 shadow-xl shadow-primary/20"
              >
                {editingUser ? 'حفظ التعديلات' : 'إنشاء المستخدم'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserMgmt;
