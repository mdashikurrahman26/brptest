import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FlagBadge } from '../components/common/FlagBadge';
import { 
  LayoutDashboard, Newspaper, Users, Calendar, 
  Image, FileText, CheckSquare, HelpCircle, 
  Mail, Settings, LogOut, ExternalLink, Menu, X, ShieldAlert,
  SlidersHorizontal, UserPlus
} from 'lucide-react';

interface AdminLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const { user, isAdmin, signOut, isDemoAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড ওভারভিউ', icon: LayoutDashboard },
    { id: 'homepage', label: 'হোমপেজ ও সেকশন কন্ট্রোল', icon: SlidersHorizontal },
    { id: 'members', label: 'সদস্য তালিকা ও বার্তা (Members)', icon: UserPlus },
    { id: 'news', label: 'সংবাদ ব্যবস্থাপনা', icon: Newspaper },
    { id: 'leadership', label: 'নেতৃত্ব ব্যবস্থাপনা', icon: Users },
    { id: 'events', label: 'ইভেন্ট ও কর্মসূচি', icon: Calendar },
    { id: 'media', label: 'মিডিয়া গ্যালারি', icon: Image },
    { id: 'documents', label: 'ডকুমেন্টস ও প্রকাশনা', icon: FileText },
    { id: 'programs', label: '১০ দফা কর্মসূচি', icon: CheckSquare },
    { id: 'faq', label: 'সচরাচর জিজ্ঞাসা (FAQ)', icon: HelpCircle },
    { id: 'messages', label: 'নাগরিক বার্তা (যোগাযোগ)', icon: Mail },
    { id: 'settings', label: 'সাইট ও দপ্তর সেটিংস', icon: Settings },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-100">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 text-center shadow-lg space-y-4">
          <ShieldAlert className="w-12 h-12 text-red-600 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900 font-serif-bn">
            অননুমোদিত প্রবেশাধিকার
          </h2>
          <p className="text-xs text-slate-600">
            এই অংশে প্রবেশ করার জন্য আপনার অ্যাকাউন্টে প্রয়োজনীয় প্রশাসনিক অনুমতি নেই। অনুগ্রহ করে অনুমোদিত অ্যাডমিন হিসেবে লগইন করুন।
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/login"
              className="py-2.5 px-4 rounded-lg bg-[#006a4e] text-white font-semibold text-xs hover:bg-emerald-800"
            >
              লগইন পেজে যান
            </Link>
            <Link
              to="/"
              className="py-2 px-4 rounded-lg border border-slate-200 text-slate-700 text-xs"
            >
              হোমপেজে ফিরুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Top Navbar */}
      <header className="bg-[#003828] text-white h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm border-b border-emerald-900">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg text-emerald-200 hover:bg-emerald-900"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <Link to="/" className="flex items-center gap-2.5">
            <FlagBadge size="sm" />
            <span className="font-bold text-base sm:text-lg tracking-tight">
              BRP অ্যাডমিন পোর্টাল
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {isDemoAdmin && (
            <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-[11px]">
              মূল্যায়নকারী মোড (Demo Admin)
            </span>
          )}

          <div className="text-right hidden sm:block">
            <div className="font-semibold text-white truncate max-w-xs">
              {user?.email || 'অ্যাডমিন ইউজার'}
            </div>
            <div className="text-[10px] text-emerald-300">কেন্দ্রীয় নির্বাহী ক্ষমতা</div>
          </div>

          <Link
            to="/"
            target="_blank"
            className="p-1.5 rounded bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors flex items-center gap-1"
            title="লাইভ সাইট দেখুন"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden md:inline text-xs">লাইভ সাইট</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="p-1.5 rounded bg-red-900/50 hover:bg-red-800 text-red-200 hover:text-white transition-colors flex items-center gap-1"
            title="সাইন আউট"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline text-xs">লগআউট</span>
          </button>
        </div>
      </header>

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex">
        
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 pt-16 lg:pt-0 z-30 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 space-y-1 overflow-y-auto">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
              ব্যবস্থাপনা মেনু
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isCurrent = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left ${
                    isCurrent
                      ? 'bg-[#006a4e] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-[#006a4e]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom user badge */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500">
            <p className="font-semibold text-slate-800">বাংলাদেশ নবজাগরণ পার্টি</p>
            <p className="mt-0.5">ভার্সন ২.৪ • ফায়ারবেস ক্লাউড</p>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 z-20 lg:hidden"
          />
        )}

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>

      </div>
    </div>
  );
};
