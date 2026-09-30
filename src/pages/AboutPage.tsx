import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FlagBadge } from '../components/common/FlagBadge';
import { CheckCircle2, Shield, Target, BookOpen, Users, Compass, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'দল সম্পর্কে' }]} />

        {/* Page Hero */}
        <div className="bg-gradient-to-r from-[#003828] to-[#006a4e] text-white rounded-2xl p-8 sm:p-12 mb-12 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4">
              পরিচিতি ও রাজনৈতিক দর্শন
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bn leading-tight">
              বাংলাদেশ নবজাগরণ পার্টি (বিআরপি)
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              জ্ঞান, সমতা, সামাজিক সুবিচার এবং আধুনিক প্রাতিষ্ঠানিক কাঠামোর ভিত্তিতে একটি স্বনির্ভর ও গণতান্ত্রিক বাংলাদেশ বিনির্মাণের জাতীয় উদ্যোগ।
            </p>
          </div>
          {/* Subtle red circle */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#f42a41] opacity-20 blur-xl pointer-events-none" />
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. প্রতিষ্ঠাকালীন দর্শন */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 font-serif-bn border-b border-slate-100 pb-3 flex items-center gap-3">
                <Compass className="w-6 h-6 text-[#006a4e]" />
                <span>প্রতিষ্ঠাকালীন আদর্শ ও প্রেক্ষাপট</span>
              </h2>
              <div className="text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                  বাংলাদেশ নবজাগরণ পার্টি (Bangladesh Renaissance Party) একবিংশ শতাব্দীর চ্যালেঞ্জ মোকাবিলায় গঠিত একটি তথ্যভিত্তিক ও আদর্শিক রাজনৈতিক সংগঠন। গতানুগতিক ক্ষমতার রাজনীতির বাইরে গিয়ে রাষ্ট্রের কাঠামোগত সংস্কার, জনসেবার স্বচ্ছতা এবং মেধাবী তরুণ প্রজন্মের সক্রিয় অংশগ্রহণের মাধ্যমে একটি নতুন ধারার রাজনৈতিক সংস্কৃতির সূচনা করাই আমাদের লক্ষ্য।
                </p>
                <p>
                  আমাদের দলটি ব্যক্তিকেন্দ্রিক নয়, বরং প্রাতিষ্ঠানিক নীতির ওপর প্রতিষ্ঠিত। এখানে সিদ্ধান্ত গ্রহণ প্রক্রিয়া যৌথ এবং দলের সকল নীতিনির্ধারণী ফোরামে উন্মুক্ত বিতর্ক ও গবেষণার সুযোগ নিশ্চিত করা হয়।
                </p>
              </div>
            </div>

            {/* 2. লক্ষ্য ও উদ্দেশ্য */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif-bn border-b border-slate-100 pb-3 flex items-center gap-3">
                <Target className="w-6 h-6 text-[#006a4e]" />
                <span>আমাদের রূপকল্প ও সুনির্দিষ্ট লক্ষ্য</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <h3 className="font-bold text-base text-[#006a4e] mb-2">
                    রূপকল্প (Vision)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    একটি বৈষম্যহীন, অর্থনৈতিকভাবে স্বাবলম্বী এবং জ্ঞানভিত্তিক সমাজ যেখানে প্রতিটি নাগরিক সাংবিধানিক অধিকার, আইনের সমান আশ্রয় এবং মানবিক মর্যাদার পূর্ণ নিশ্চয়তা পাবে।
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-teal-50/70 border border-teal-100">
                  <h3 className="font-bold text-base text-teal-800 mb-2">
                    মিশন (Mission)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    গণতান্ত্রিক জবাবদিহি প্রতিষ্ঠা, দুর্নীতিমুক্ত প্রশাসন পরিচালনা, মানসম্মত শিক্ষা ও স্বাস্থ্য ব্যবস্থার বিকাশ এবং পরিবেশবান্ধব আধুনিক অর্থনীতি গড়ে তোলা।
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-slate-800 text-sm">
                  মূল কর্মপ্রক্রিয়া:
                </h4>
                {[
                  'প্রতিটি নীতি প্রণয়নে বিশেষজ্ঞ গবেষক ও সাধারণ জনগণের সমন্বয়',
                  'দলের অভ্যন্তরীণ সকল আর্থিক লেনদেনে শতভাগ ক্যাশলেস ও উন্মুক্ত অডিট পদ্ধতি',
                  'তৃণমূল পর্যায় থেকে গণতান্ত্রিক ভোটে নেতৃত্ব নির্বাচন',
                  'বিজ্ঞান ও প্রযুক্তির সর্বোচ্চ প্রয়োগের মাধ্যমে নাগরিক দুর্ভোগ নিরসন'
                ].map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. চার মূল স্তম্ভ */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif-bn border-b border-slate-100 pb-3 flex items-center gap-3">
                <Award className="w-6 h-6 text-[#006a4e]" />
                <span>আমাদের চার মৌলিক স্তম্ভ</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200">
                  <div className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006a4e]" />
                    ১. জ্ঞানভিত্তিক নীতিনির্ধারণ
                  </div>
                  <p className="text-xs text-slate-600">
                    আবেগ বা অলীক প্রতিশ্রুতির বদলে তথ্য, উপাত্ত ও প্রায়োগিক গবেষণার ওপর ভিত্তি করে রাষ্ট্রীয় পরিকল্পনা প্রণয়ন।
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200">
                  <div className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006a4e]" />
                    ২. আইনের শাসন ও নাগরিক সুবিচার
                  </div>
                  <p className="text-xs text-slate-600">
                    বিচার বিভাগের পূর্ণ স্বকীয়তা রক্ষা এবং সকল নাগরিকের মানবাধিকারের সাংবিধানিক স্বীকৃতি বজায় রাখা।
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200">
                  <div className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f42a41]" />
                    ৩. প্রাতিষ্ঠানিক সততা ও জবাবদিহিতা
                  </div>
                  <p className="text-xs text-slate-600">
                    রাষ্ট্রীয় বা দলীয় পদে থাকা ব্যক্তিদের আয়-ব্যয় এবং সিদ্ধান্তের হিসাব নিয়মিত জনসমক্ষে প্রকাশ করা।
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200">
                  <div className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006a4e]" />
                    ৪. অন্তর্ভুক্তিমূলক উন্নয়ন
                  </div>
                  <p className="text-xs text-slate-600">
                    নারী, তরুণ, প্রান্তিক জনগোষ্ঠী ও শ্রমজীবী মানুষের জীবনমান উন্নয়নকে অগ্রাধিকার দিয়ে জাতীয় প্রবৃদ্ধি।
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Fact Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4 font-serif-bn">
                এক নজরে দলীয় পরিচিতি
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">পূর্ণ নাম:</span>
                  <span className="font-semibold text-slate-800">বাংলাদেশ নবজাগরণ পার্টি</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">ইংরেজি সংক্ষেপ:</span>
                  <span className="font-semibold text-slate-800">BRP</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">মূল স্লোগান:</span>
                  <span className="font-semibold text-slate-800 text-right">জ্ঞান, ন্যায় ও নবচিন্তার পথে</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">সাংগঠনিক কাঠামো:</span>
                  <span className="font-semibold text-slate-800">গণতান্ত্রিক কাউন্সিল</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">অডিট প্রতিবেদন:</span>
                  <span className="font-semibold text-emerald-700">নিয়মিত উন্মুক্ত</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link
                  to="/documents"
                  className="w-full block text-center py-2.5 px-4 rounded-lg bg-[#006a4e] text-white font-medium text-xs hover:bg-emerald-800 transition-colors"
                >
                  দলীয় গঠনতন্ত্র পড়ুন
                </Link>
              </div>
            </div>

            {/* Other Navigation */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-3 font-serif-bn">
                আরও জানুন
              </h3>
              <div className="space-y-2 text-sm">
                <Link to="/leadership" className="block p-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#006a4e]">
                  → কেন্দ্রীয় নেতৃবৃন্দের পরিচিতি
                </Link>
                <Link to="/organization" className="block p-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#006a4e]">
                  → সাংগঠনিক স্তরবিন্যাস
                </Link>
                <Link to="/policy" className="block p-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#006a4e]">
                  → মৌলিক নীতিমালা ও গবেষণা
                </Link>
                <Link to="/programs" className="block p-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#006a4e]">
                  → ১০ দফা সংস্কার কর্মসূচি
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
