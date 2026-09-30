import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Target, Eye } from 'lucide-react';
import { FlagBadge } from '../common/FlagBadge';

export const AboutPreview: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Primary Image */}
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80"
                  alt="বাংলাদেশ নবজাগরণ পার্টি প্রাতিষ্ঠানিক সম্মেলন"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="text-xs uppercase tracking-widest text-emerald-300 font-bold">
                      গণতান্ত্রিক প্রাতিষ্ঠানিকতা
                    </div>
                    <div className="text-sm font-semibold mt-1">
                      জনস্বার্থ ও জবাবদিহিতায় দৃঢ় অঙ্গীকার
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#006a4e] text-white p-4 rounded-xl shadow-lg border-2 border-white max-w-xs flex items-center gap-3">
                <FlagBadge size="sm" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                    স্থাপিত
                  </div>
                  <div className="text-sm font-semibold">
                    গণমুখী সংস্কার ও নবজাগরণ
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#006a4e] text-xs font-bold uppercase tracking-wider border border-emerald-200">
              দলীয় পরিচিতি ও দর্শন
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-serif-bn">
              বাংলাদেশ নবজাগরণ পার্টি (বিআরপি)
            </h2>

            <p className="text-base text-slate-700 leading-relaxed">
              বাংলাদেশ নবজাগরণ পার্টি (Bangladesh Renaissance Party - BRP) একটি আধুনিক, কল্যাণমুখী এবং গণতান্ত্রিক রাজনৈতিক প্ল্যাটফর্ম। আমাদের মূল ভিত্তি হলো জ্ঞানভিত্তিক রাজনীতি, আইনের শাসন, প্রাতিষ্ঠানিক জবাবদিহিতা এবং বৈষম্যহীন জনকল্যাণ।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-[#006a4e] font-bold text-sm mb-1.5">
                  <Eye className="w-4 h-4" />
                  <span>আমাদের রূপকল্প (Vision)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  একটি মেধাভিত্তিক, দুর্নীতিমুক্ত ও স্বাবলম্বী বাংলাদেশ যেখানে প্রতিটি নাগরিকের অধিকার ও মানবিক মর্যাদা সুরক্ষিত থাকবে।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-[#006a4e] font-bold text-sm mb-1.5">
                  <Target className="w-4 h-4" />
                  <span>আমাদের লক্ষ্য (Mission)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  রাষ্ট্রীয় প্রতিষ্ঠানে স্বচ্ছতা প্রতিষ্ঠা, আধুনিক শিক্ষা ও কর্মসংস্থানের সুযোগ সৃষ্টি এবং অন্তর্ভুক্তিমূলক অর্থনৈতিক প্রবৃদ্ধি অর্জন।
                </p>
              </div>
            </div>

            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#006a4e] flex-shrink-0" />
                <span>দলীয় কাঠামোতে তরুণ ও বিশেষজ্ঞদের বাধ্যতামূলক অংশগ্রহণ</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#006a4e] flex-shrink-0" />
                <span>বার্ষিক স্বচ্ছ অডিট ও উন্মুক্ত নথিপত্র ব্যবস্থাপনা</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#006a4e] flex-shrink-0" />
                <span>সার্বজনীন স্বাস্থ্য, শিক্ষা ও ডিজিটাল নাগরিক অধিকার সুরক্ষা</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white font-medium text-sm transition-all shadow-sm"
              >
                <span>দল সম্পর্কে বিস্তারিত পড়ুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/leadership"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors"
              >
                <span>কেন্দ্রীয় নেতৃত্ব দেখুন</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
