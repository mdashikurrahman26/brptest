import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, 
  Users, Building, FileText, Shield, HelpCircle, 
  UserPlus
} from 'lucide-react';
import emblemImg from '../../assets/images/brp_party_emblem_1790622749816.jpg';
import { triggerMembershipModal } from './MembershipModal';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [policyDropdownOpen, setPolicyDropdownOpen] = useState(false);
  const location = useLocation();

  const isCurrent = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Party Name */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#006a4e] p-0.5 bg-white shadow-xs flex-shrink-0">
              <img
                src={emblemImg}
                alt="বাংলাদেশ নবজাগরণ পার্টি লোগো"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-bold text-base sm:text-xl md:text-2xl text-[#005a3e] tracking-tight group-hover:text-emerald-900 transition-colors font-serif-bn leading-tight truncate">
                বাংলাদেশ নবজাগরণ পার্টি
              </span>
              <span className="text-[10px] sm:text-[12px] md:text-[13px] font-semibold tracking-wide text-slate-600 -mt-0.5 truncate">
                Bangladesh Renaissance Party (BRP)
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            
            {/* হোম */}
            <Link
              to="/"
              className={`relative py-2 text-[15px] font-bold transition-colors ${
                isCurrent('/')
                  ? 'text-[#005a3e] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#005a3e]'
                  : 'text-slate-700 hover:text-[#005a3e]'
              }`}
            >
              হোম
            </Link>

            {/* দল সম্পর্কে ▾ */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className={`flex items-center gap-1 py-2 text-[15px] font-medium transition-colors ${
                  location.pathname.startsWith('/about') || location.pathname.startsWith('/leadership') || location.pathname.startsWith('/organization')
                    ? 'text-[#005a3e] font-bold'
                    : 'text-slate-700 hover:text-[#005a3e]'
                }`}
              >
                <span>দল সম্পর্কে</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#005a3e]" />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                  <Link
                    to="/about"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-[#005a3e]"
                  >
                    <span>দলীয় পরিচিতি ও দর্শন</span>
                  </Link>
                  <Link
                    to="/leadership"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-[#005a3e]"
                  >
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>কেন্দ্রীয় নেতৃত্ব</span>
                  </Link>
                  <Link
                    to="/organization"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-[#005a3e]"
                  >
                    <Building className="w-4 h-4 text-emerald-600" />
                    <span>সাংগঠনিক স্তরবিন্যাস</span>
                  </Link>
                  <Link
                    to="/transparency"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-[#005a3e]"
                  >
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span>স্বচ্ছতা ও জবাবদিহি</span>
                  </Link>
                </div>
              )}
            </div>

            {/* আমাদের নীতি ▾ */}
            <div 
              className="relative"
              onMouseEnter={() => setPolicyDropdownOpen(true)}
              onMouseLeave={() => setPolicyDropdownOpen(false)}
            >
              <button
                onClick={() => setPolicyDropdownOpen(!policyDropdownOpen)}
                className={`flex items-center gap-1 py-2 text-[15px] font-medium transition-colors ${
                  location.pathname.startsWith('/policy') || location.pathname.startsWith('/documents')
                    ? 'text-[#005a3e] font-bold'
                    : 'text-slate-700 hover:text-[#005a3e]'
                }`}
              >
                <span>আমাদের নীতি</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {policyDropdownOpen && (
                <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                  <Link
                    to="/policy"
                    onClick={() => setPolicyDropdownOpen(false)}
                    className="block px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-[#005a3e]"
                  >
                    মৌলিক রাষ্ট্রনীতি ও অবস্থান
                  </Link>
                  <Link
                    to="/documents"
                    onClick={() => setPolicyDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-[#005a3e]"
                  >
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>দলীয় গঠনতন্ত্র ও প্রকাশনা</span>
                  </Link>
                  <Link
                    to="/faq"
                    onClick={() => setPolicyDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-[#005a3e]"
                  >
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    <span>সচরাচর জিজ্ঞাসা (FAQ)</span>
                  </Link>
                </div>
              )}
            </div>

            {/* ১০ দফা কর্মসূচি */}
            <Link
              to="/programs"
              className={`py-2 text-[15px] font-medium transition-colors ${
                isCurrent('/programs')
                  ? 'text-[#005a3e] font-bold'
                  : 'text-slate-700 hover:text-[#005a3e]'
              }`}
            >
              ১০ দফা কর্মসূচি
            </Link>

            {/* সংবাদ */}
            <Link
              to="/news"
              className={`py-2 text-[15px] font-medium transition-colors ${
                isCurrent('/news')
                  ? 'text-[#005a3e] font-bold'
                  : 'text-slate-700 hover:text-[#005a3e]'
              }`}
            >
              সংবাদ
            </Link>

            {/* গ্যালারি */}
            <Link
              to="/media"
              className={`py-2 text-[15px] font-medium transition-colors ${
                isCurrent('/media')
                  ? 'text-[#005a3e] font-bold'
                  : 'text-slate-700 hover:text-[#005a3e]'
              }`}
            >
              গ্যালারি
            </Link>

            {/* যোগাযোগ */}
            <Link
              to="/contact"
              className={`py-2 text-[15px] font-medium transition-colors ${
                isCurrent('/contact')
                  ? 'text-[#005a3e] font-bold'
                  : 'text-slate-700 hover:text-[#005a3e]'
              }`}
            >
              যোগাযোগ
            </Link>

          </nav>

          {/* Right Action: Red "সদস্য হোন" CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={triggerMembershipModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#d61f34] hover:bg-[#b8182b] transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>সদস্য হোন</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={triggerMembershipModal}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#d61f34] cursor-pointer"
            >
              সদস্য হোন
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-800 rounded-lg hover:bg-slate-100"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          {/* Quick Actions in Mobile Drawer */}
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                triggerMembershipModal();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#d61f34] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <UserPlus className="w-4 h-4" />
              <span>অনলাইনে সদস্য হোন</span>
            </button>
            {onOpenSearch && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
              >
                অনুসন্ধান
              </button>
            )}
          </div>

          <div className="space-y-0.5">
            {[
              { label: 'হোম', path: '/' },
              { label: 'দল সম্পর্কে', path: '/about' },
              { label: 'আমাদের নীতি', path: '/policy' },
              { label: '১০ দফা কর্মসূচি', path: '/programs' },
              { label: 'সংবাদ', path: '/news' },
              { label: 'গ্যালারি', path: '/media' },
              { label: 'যোগাযোগ', path: '/contact' },
              { label: 'নেতৃত্ব', path: '/leadership' },
              { label: 'সাংগঠনিক কাঠামো', path: '/organization' },
              { label: 'প্রকাশনা ও ডকুমেন্টস', path: '/documents' },
              { label: 'স্বচ্ছতা ও জবাবদিহি', path: '/transparency' },
              { label: 'প্রশ্নোত্তর (FAQ)', path: '/faq' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isCurrent(item.path)
                    ? 'bg-emerald-50 text-[#005a3e] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
