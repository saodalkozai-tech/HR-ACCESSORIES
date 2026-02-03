
import React, { useState } from 'react';
import { AppScreen, CartItem, Product, User } from './types';
import { APP_LOGO } from './constants';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ConsultantScreen from './screens/ConsultantScreen';
import AdminDashboard from './screens/AdminDashboard';
import AdminReports from './screens/AdminReports';
import AdminAddProduct from './screens/AdminAddProduct';
import AdminNotifications from './screens/AdminNotifications';
import AdminContentMgmt from './screens/AdminContentMgmt';
import AdminOrders from './screens/AdminOrders';
import AdminUserMgmt from './screens/AdminUserMgmt';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'admin', password: 'admin', role: 'admin', displayName: 'المدير العام' }
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, color: 'ذهبي مطفي' }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const navigateTo = (screen: AppScreen, product?: Product) => {
    window.scrollTo(0, 0);
    if (product) setSelectedProduct(product);
    setCurrentScreen(screen);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = users.find(u => u.username === loginUsername && u.password === loginPassword);
    
    if (foundUser) {
      setIsAdminMode(true);
      setCurrentUser(foundUser);
      setShowAdminLogin(false);
      setLoginError(false);
      navigateTo(AppScreen.ADMIN_DASHBOARD);
      setLoginUsername('');
      setLoginPassword('');
    } else {
      setLoginError(true);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.HOME:
        return <HomeScreen onAddToCart={addToCart} onNavigate={navigateTo} cartCount={cart.length} />;
      case AppScreen.CART:
        return <CartScreen cart={cart} onUpdateQty={updateQuantity} onRemove={removeFromCart} onNavigate={navigateTo} />;
      case AppScreen.CHECKOUT:
        return <CheckoutScreen cart={cart} onNavigate={navigateTo} />;
      case AppScreen.PRODUCT_DETAIL:
        return selectedProduct ? (
          <ProductDetailScreen 
            product={selectedProduct} 
            onAddToCart={addToCart} 
            onNavigate={navigateTo} 
          />
        ) : <HomeScreen onAddToCart={addToCart} onNavigate={navigateTo} cartCount={cart.length} />;
      case AppScreen.AI_CONSULTANT:
        return <ConsultantScreen onNavigate={navigateTo} />;
      case AppScreen.ADMIN_DASHBOARD:
        return <AdminDashboard onNavigate={navigateTo} currentUser={currentUser} />;
      case AppScreen.ADMIN_REPORTS:
        return <AdminReports onNavigate={navigateTo} />;
      case AppScreen.ADMIN_ADD_PRODUCT:
        return <AdminAddProduct onNavigate={navigateTo} />;
      case AppScreen.ADMIN_NOTIFICATIONS:
        return <AdminNotifications onNavigate={navigateTo} />;
      case AppScreen.ADMIN_CONTENT_MGMT:
        return <AdminContentMgmt onNavigate={navigateTo} />;
      case AppScreen.ADMIN_ORDERS:
        return <AdminOrders onNavigate={navigateTo} />;
      case AppScreen.ADMIN_USER_MGMT:
        if (currentUser?.role !== 'admin') {
           navigateTo(AppScreen.ADMIN_DASHBOARD);
           return null;
        }
        return <AdminUserMgmt users={users} setUsers={setUsers} onNavigate={navigateTo} />;
      default:
        return <HomeScreen onAddToCart={addToCart} onNavigate={navigateTo} cartCount={cart.length} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-sans relative text-right">
      <div className="max-w-xl mx-auto min-h-screen shadow-2xl bg-white dark:bg-background-dark relative overflow-x-hidden">
        {renderScreen()}

        {/* Floating AI Trigger with White Circle Logo */}
        {!isAdminMode && currentScreen === AppScreen.HOME && (
          <button 
            onClick={() => navigateTo(AppScreen.AI_CONSULTANT)}
            className="fixed bottom-24 right-4 z-[60] bg-primary text-black size-16 rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center animate-bounce hover:animate-none border-4 border-white dark:border-background-dark overflow-hidden transition-all active:scale-90"
          >
            <div className="size-full bg-white flex items-center justify-center p-2">
                <img src={APP_LOGO} alt="HR Accessories" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
          </button>
        )}
      </div>

      {/* Admin Switcher Button */}
      <button 
        onClick={() => {
            if (isAdminMode) {
              setIsAdminMode(false);
              setCurrentUser(null);
              navigateTo(AppScreen.HOME);
            } else {
              setShowAdminLogin(true);
            }
        }}
        className="fixed bottom-4 left-4 z-[60] bg-slate-900/90 backdrop-blur-xl text-white p-3 rounded-full shadow-2xl flex items-center gap-2 text-[10px] border border-white/10 uppercase font-black"
      >
        <span className="material-symbols-outlined text-sm">{isAdminMode ? 'person' : 'shield_person'}</span>
        {isAdminMode ? 'المتجر' : 'الإدارة'}
      </button>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-6 animate-in fade-in duration-300">
          <div className="bg-background-dark border border-primary/20 w-full max-w-sm rounded-[40px] p-8 shadow-2xl animate-in zoom-in-95 duration-300 text-right">
            <div className="flex justify-between items-start mb-8">
              {/* Login Logo Box */}
              <div className="size-24 bg-white rounded-3xl flex items-center justify-center p-3 shadow-2xl border-2 border-primary/20 overflow-hidden">
                <img src={APP_LOGO} alt="HR Accessories" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <button 
                onClick={() => { setShowAdminLogin(false); setLoginError(false); }}
                className="size-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="mb-8 text-right">
              <h2 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase leading-none">HR ACCESSORIES</h2>
              <div className="h-1.5 w-16 bg-primary rounded-full mb-4 ml-auto"></div>
              <p className="text-slate-400 text-sm font-bold">بوابة الإدارة والنظام الملكي</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pr-2">اسم المستخدم</label>
                <input 
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className={`w-full bg-white/5 border ${loginError ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all text-white font-bold text-left`}
                  placeholder="admin"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pr-2">كلمة المرور</label>
                <input 
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={`w-full bg-white/5 border ${loginError ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all text-white font-bold tracking-widest text-left`}
                  placeholder="••••••••"
                  required
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 text-red-400 text-xs px-2 animate-in slide-in-from-top-2">
                  <span className="material-symbols-outlined text-sm">lock_person</span>
                  <span className="font-bold">عذراً، البيانات غير صالحة للوصول</span>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-primary hover:brightness-110 active:scale-95 text-black font-black py-5 rounded-2xl shadow-2xl shadow-primary/30 transition-all mt-4 flex items-center justify-center gap-3"
              >
                <span>دخول النظام الملكي</span>
                <span className="material-symbols-outlined">key</span>
              </button>
            </form>
            
            <p className="text-center text-[10px] text-slate-700 mt-10 uppercase tracking-[0.3em] font-black">Powered by Royal Encryption</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
