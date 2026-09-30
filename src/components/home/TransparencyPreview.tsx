import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileSpreadsheet, Lock, MailCheck, ArrowRight } from 'lucide-react';

export const TransparencyPreview: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#002f22] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>উন্মুক্ত প্রাতিষ্ঠানিক জবাবদিহি</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-serif-bn">
              স্বচ্ছতা, সততা ও তথ্য জানার নাগরিক অধিকার
            </h2>

            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              বাংলাদেশ নবজাগরণ পার্টি বিশ্বাস করে, জনসমর্থন অর্জনের প্রধান চাবিকাঠি হলো অবাধ তথ্য প্রকাশ ও সর্বোচ্চ আর্থিক সততা। আমাদের সাংগঠনিক গঠনতন্ত্র, কেন্দ্রীয় সিদ্ধান্ত এবং চার্টার্ড অ্যাকাউন্ট্যান্ট নিরীক্ষিত বার্ষিক ব্যয় বিবরণী সর্বদা উন্মুক্ত।
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/transparency"
                className="px-5 py-3 rounded-lg bg-white text-[#006a4e] font-semibold text-sm hover:bg-emerald-50 transition-all flex items-center gap-2"
              >
                <span>স্বচ্ছতা ও অডিট পোর্টাল</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 rounded-lg bg-emerald-900/80 border border-emerald-600/50 hover:bg-emerald-800 text-white font-semibold text-sm transition-all"
              >
                <span>তথ্য জানার আবেদন (RTI)</span>
              </Link>
            </div>
          </div>

          {/* Right Highlights Cards (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 backdrop-blur-xs">
              <FileSpreadsheet className="w-6 h-6 text-emerald-300 mb-3" />
              <h4 className="text-base font-bold text-white mb-1.5">
                নিরীক্ষিত হিসাব বিবরণী
              </h4>
              <p className="text-xs text-emerald-200 leading-relaxed">
                স্বতন্ত্র অডিট ফার্ম দ্বারা প্রস্তুতকৃত পূর্ণাঙ্গ আর্থিক প্রতিবেদন ও সাধারণ তহবিলের হিসাব প্রতি বছর উন্মুক্ত করা হয়।
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 backdrop-blur-xs">
              <Lock className="w-6 h-6 text-emerald-300 mb-3" />
              <h4 className="text-base font-bold text-white mb-1.5">
                স্বার্থের সংঘাত নীতি
              </h4>
              <p className="text-xs text-emerald-200 leading-relaxed">
                কেন্দ্রীয় নেতৃত্বের যে কোনো ব্যবসায়িক বা প্রাতিষ্ঠানিক স্বার্থের সংঘাত সংক্রান্ত তথ্য লিখিতভাবে নথিবদ্ধ ও সংরক্ষিত।
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 backdrop-blur-xs">
              <MailCheck className="w-6 h-6 text-emerald-300 mb-3" />
              <h4 className="text-base font-bold text-white mb-1.5">
                তথ্য জানার ডেস্ক (RTI)
              </h4>
              <p className="text-xs text-emerald-200 leading-relaxed">
                যেকোনো নাগরিক নির্ধারিত ফরম পূরণ করে আমাদের পলিসি সিদ্ধান্ত ও সাধারণ তথ্যের অনুলিপির জন্য আবেদন করতে পারেন।
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 backdrop-blur-xs">
              <ShieldCheck className="w-6 h-6 text-emerald-300 mb-3" />
              <h4 className="text-base font-bold text-white mb-1.5">
                হুইসেলব্লোয়ার নিরাপত্তা
              </h4>
              <p className="text-xs text-emerald-200 leading-relaxed">
                সাংগঠনিক অনিয়ম বা দুর্নীতির তথ্য প্রদানকারী যে কোনো সদস্য বা নাগরিকের পূর্ণ পরিচয় সুরক্ষার সুনির্দিষ্ট আচরণবিধি।
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
