import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Globe, 
  ExternalLink, ArrowUp
} from 'lucide-react';
import { FlagBadge } from './FlagBadge';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#003828] text-slate-300 pt-16 pb-8 border-t-4 border-[#006a4e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Col 1 & 2: Branding & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <FlagBadge size="lg" />
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  বাংলাদেশ নবজাগরণ পার্টি
                </h3>
                <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                  Bangladesh Renaissance Party (BRP)
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed pr-4">
              বাংলাদেশ নবজাগরণ পার্টি জ্ঞান, সুবিচার ও আধুনিক প্রাতিষ্ঠানিক জবাবদিহিতার মাধ্যমে কল্যাণমুখী বাংলাদেশ বিনির্মাণে অঙ্গীকারবদ্ধ একটি রাজনৈতিক ও সামাজিক আন্দোলন।
            </p>

            <div className="p-3 bg-emerald-950/70 rounded-lg border border-emerald-800/40 text-xs text-emerald-200">
              <span className="font-semibold text-white">নীতিমালা ঘোষণা:</span> এটি একটি উন্মুক্ত তথ্যায়ন ও নিরপেক্ষ প্রাতিষ্ঠানিক পোর্টাল। রাজনৈতিক বিজ্ঞাপন, অসত্য প্রচার বা পক্ষপাতমূলক তথ্য প্রচার থেকে সম্পূর্ণ মুক্ত।
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/80 hover:bg-[#006a4e] text-white flex items-center justify-center transition-colors border border-emerald-700/40"
                aria-label="Facebook"
              >
                <span className="font-bold text-sm">f</span>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/80 hover:bg-[#006a4e] text-white flex items-center justify-center transition-colors border border-emerald-700/40"
                aria-label="Twitter"
              >
                <span className="font-bold text-sm">X</span>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/80 hover:bg-[#006a4e] text-white flex items-center justify-center transition-colors border border-emerald-700/40"
                aria-label="YouTube"
              >
                <span className="font-bold text-xs">YT</span>
              </a>
              <Link 
                to="/transparency"
                className="text-xs text-emerald-300 hover:text-white underline underline-offset-4 ml-2"
              >
                স্বচ্ছতা রিপোর্ট ২০২৬
              </Link>
            </div>
          </div>

          {/* Col 3: প্রাতিষ্ঠানিক লিংক */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 border-l-2 border-[#f42a41] pl-2.5">
              প্রাতিষ্ঠানিক পরিচিতি
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-emerald-300 transition-colors">দল সম্পর্কে</Link>
              </li>
              <li>
                <Link to="/policy" className="hover:text-emerald-300 transition-colors">আমাদের নীতি ও দর্শন</Link>
              </li>
              <li>
                <Link to="/leadership" className="hover:text-emerald-300 transition-colors">নেতৃত্ব পরিচিতি</Link>
              </li>
              <li>
                <Link to="/organization" className="hover:text-emerald-300 transition-colors">সাংগঠনিক কাঠামো</Link>
              </li>
              <li>
                <Link to="/transparency" className="hover:text-emerald-300 transition-colors">স্বচ্ছতা ও জবাবদিহি</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-300 transition-colors">সাধারণ প্রশ্নোত্তর (FAQ)</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: কর্মসূচি ও নথি */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 border-l-2 border-[#f42a41] pl-2.5">
              কর্মসূচি ও প্রকাশনা
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/programs" className="hover:text-emerald-300 transition-colors">১০ দফা জাতীয় রূপরেখা</Link>
              </li>
              <li>
                <Link to="/documents" className="hover:text-emerald-300 transition-colors">মূল গঠনতন্ত্র ডাউনলোড</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-emerald-300 transition-colors">সংবাদ ও প্রেস রিলিজ</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-emerald-300 transition-colors">আসন্ন ইভেন্ট ও সমাবেশ</Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-emerald-300 transition-colors">ছবি ও ভিডিও গ্যালারি</Link>
              </li>
              <li>
                <Link to="/documents" className="hover:text-emerald-300 transition-colors">বার্ষিক অডিট রিপোর্ট</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: যোগাযোগ ও দপ্তর */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 border-l-2 border-[#f42a41] pl-2.5">
              যোগাযোগ ও দপ্তর
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                <span className="text-xs leading-relaxed text-slate-300">
                  বাড়ি নং ৪২, সড়ক নং ৭, ধানমন্ডি আ/এ, ঢাকা-১২০৫
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-slate-300">+৮৮০ ২-২২৩৩৮৫৯০০</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-slate-300">contact@brp.org.bd</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-block w-full text-center py-2 px-3 text-xs font-semibold rounded bg-[#006a4e] hover:bg-emerald-600 text-white transition-colors"
                >
                  যোগাযোগ ফরম পূরণ করুন
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Mandatory Institutional Statements */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Link to="/login" className="text-slate-400 hover:text-slate-300 transition-colors" title="সুরক্ষিত পোর্টাল">
              ©
            </Link>
            <span>২০২৬ বাংলাদেশ নবজাগরণ পার্টি (Bangladesh Renaissance Party - BRP)। সর্বস্বত্ব সংরক্ষিত।</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/transparency" className="hover:text-emerald-300 transition-colors">
              গোপনীয়তা নীতি (Privacy Policy)
            </Link>
            <span>•</span>
            <Link to="/transparency" className="hover:text-emerald-300 transition-colors">
              ব্যবহারের শর্তাবলী (Terms)
            </Link>
            <span>•</span>
            <span className="hover:text-emerald-300">
              অভিগম্যতা বিবৃতি (WCAG 2.2 AA)
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors p-1"
            title="উপরে যান"
          >
            <span>শীর্ষে যান</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
