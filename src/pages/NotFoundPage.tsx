import React from 'react';
import { Link } from 'react-router-dom';
import { FlagBadge } from '../components/common/FlagBadge';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50">
      <div className="text-center max-w-md mx-auto space-y-5">
        <div className="flex justify-center">
          <FlagBadge size="lg" />
        </div>
        <div className="text-7xl font-extrabold text-[#006a4e] tracking-tight">
          ৪০৪
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-serif-bn">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          আপনি যে পাতাটি খুঁজছেন তা হয়তো সরানো হয়েছে, নাম পরিবর্তিত হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ রয়েছে।
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#006a4e] text-white font-medium text-sm hover:bg-emerald-800 transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>মূল পাতায় ফিরুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
