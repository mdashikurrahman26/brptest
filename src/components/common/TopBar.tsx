import React, { useState } from 'react';
import { Search, ChevronDown, User, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface TopBarProps {
  onOpenSearch?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenSearch }) => {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('বাংলা');
  const { user, isAdmin } = useAuth();

  return (
    <div className="bg-[#003825] text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Side Links */}
        <div className="flex items-center gap-3 sm:gap-4 text-[12px] sm:text-[13px] text-emerald-100 font-medium">
          <Link to="/" className="hover:text-white transition-colors">
            জনগণের শক্তি
          </Link>
          <span className="text-emerald-700/80">|</span>
          <Link to="/about" className="hover:text-white transition-colors">
            আমাদের সাথে
          </Link>
          <span className="text-emerald-700/80">|</span>
          <Link to="/policy" className="hover:text-white transition-colors hidden xs:inline">
            নতুন বাংলাদেশ গড়ার স্বপ্ন
          </Link>
        </div>

        {/* Right Side: Social Media, Search, Language, Admin */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* Social Icons */}
          <div className="flex items-center gap-2.5 text-emerald-200">
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors"
              aria-label="X Twitter"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* Search Trigger */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="text-emerald-200 hover:text-white transition-colors p-1"
              aria-label="অনুসন্ধান"
              title="সার্চ করুন"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-emerald-100 hover:text-white transition-colors text-xs font-semibold py-0.5 px-1.5 rounded"
            >
              <span>{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-emerald-300" />
            </button>

            {langOpen && (
              <div 
                className="absolute right-0 mt-1 w-24 bg-white text-slate-800 rounded-lg shadow-lg border border-slate-200 py-1 z-50 animate-fadeIn"
                onMouseLeave={() => setLangOpen(false)}
              >
                <button
                  onClick={() => { setCurrentLang('বাংলা'); setLangOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-emerald-50 hover:text-[#006a4e] ${currentLang === 'বাংলা' ? 'font-bold text-[#006a4e]' : ''}`}
                >
                  বাংলা
                </button>
                <button
                  onClick={() => { setCurrentLang('English'); setLangOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-emerald-50 hover:text-[#006a4e] ${currentLang === 'English' ? 'font-bold text-[#006a4e]' : ''}`}
                >
                  English
                </button>
              </div>
            )}
          </div>

          {/* Authenticated Admin Dashboard Link (Only visible to verified admins) */}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-[11px] font-bold text-amber-300 hover:text-white bg-emerald-950/80 border border-emerald-700/60 px-2.5 py-0.5 rounded-md flex items-center gap-1.5 transition-colors shadow-2xs ml-1"
              title="কেন্দ্রীয় প্রশাসনিক ড্যাশবোর্ড"
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>ড্যাশবোর্ড</span>
            </Link>
          )}

        </div>

      </div>
    </div>
  );
};
