import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Shield, BookOpen, Globe2, Leaf, HeartHandshake, Scale, Cpu, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PolicyPage: React.FC = () => {
  const policies = [
    {
      icon: Scale,
      title: 'গণতান্ত্রিক সুশাসন ও প্রাতিষ্ঠানিক স্বাধীনতা',
      desc: 'বিচার বিভাগ, নির্বাচন কমিশন ও দুর্নীতি দমন কমিশনকে রাজনৈতিক প্রভাবমুক্ত পূর্ণ স্বায়ত্তশাসন প্রদান। রাষ্ট্রের প্রতিটি স্তরে সিদ্ধান্ত গ্রহণ প্রক্রিয়ায় স্বচ্ছতা আনয়ন এবং নাগরিক শুনানির প্রচলন।'
    },
    {
      icon: Landmark,
      title: 'অন্তর্ভুক্তিমূলক ও জ্ঞানভিত্তিক অর্থনীতি',
      desc: 'একচেটিয়া সিন্ডিকেট ভাঙা, ক্ষুদ্র ও মাঝারি উদ্যোক্তাদের সহজ ঋণ, মুদ্রাস্ফীতি নিয়ন্ত্রণ এবং দেশের তরুণদের ফ্রিল্যান্সিং ও উচ্চপ্রযুক্তি খাতে সম্পৃক্ত করে রফতানি বহুমুখীকরণ।'
    },
    {
      icon: BookOpen,
      title: 'সর্বজনীন শিক্ষা ও গবেষণা সংস্কার',
      desc: 'শিক্ষা খাতে জাতীয় বাজেটের উল্লেখযোগ্য অংশ বরাদ্দ নিশ্চিত করে মুখস্থবিদ্যার বদলে বিজ্ঞান, গণিত, প্রযুক্তি ও বাস্তবমুখী কারিগরি শিক্ষায় অগ্রাধিকার প্রদান।'
    },
    {
      icon: HeartHandshake,
      title: 'সামাজিক নিরাপত্তা ও সার্বজনীন স্বাস্থ্যসুরক্ষা',
      desc: 'সমাজের পিছিয়ে পড়া মানুষ, বয়োজ্যেষ্ঠ ও প্রতিবন্ধীদের সামাজিক সুরক্ষার পরিধি বিস্তার। প্রাথমিক চিকিৎসার মানোন্নয়ন ও প্রয়োজনীয় ঔষধের দাম সাধারণের নাগালে রাখা।'
    },
    {
      icon: Leaf,
      title: 'জলবায়ু ঝুঁকি ও পরিবেশ সুরক্ষা',
      desc: 'উপকূলীয় এলাকার টেকসই বেড়িবাঁধ নির্মাণ, নদীদূষণ ও অবৈধ দখল কঠোর হস্তে দমন এবং জীবাশ্ম জ্বালানির নির্ভরতা কমিয়ে নবায়নযোগ্য সৌর ও বায়ুশক্তিতে রূপান্তর।'
    },
    {
      icon: Globe2,
      title: 'সার্বভৌমত্ব ও নিরপেক্ষ পররাষ্ট্রনীতি',
      desc: '“সকলের সাথে বন্ধুত্ব, কারো সাথে বৈরিতা নয়”—সার্বভৌম সমতা এবং আন্তর্জাতিক আইনের ভিত্তিতে জাতীয় স্বার্থ সংরক্ষণপূর্বক বৈশ্বিক পরিমণ্ডলে কার্যকর ভূমিকা পালন।'
    },
    {
      icon: Cpu,
      title: 'ডিজিটাল উদ্ভাবন ও নাগরিক গোপনীয়তা',
      desc: 'সরকারি সকল সেবা একক ডিজিটাল প্ল্যাটফর্মে প্রদান। নাগরিকদের তথ্যের পূর্ণ নিরাপত্তা ও গোপনীয়তা রক্ষার জন্য আন্তর্জাতিক মানের ডেটা প্রটেকশন কাঠামোর প্রবর্তন।'
    },
    {
      icon: Shield,
      title: 'দুর্নীতিমুক্ত সমাজ ও হুইসেলব্লোয়ার সুরক্ষা',
      desc: 'সরকারি ক্রয়ে ওপেন ই-টেন্ডারিং ও অডিট অটোমেশন। অনিয়ম ও অর্থ পাচার রোধে তথ্য প্রদানকারীদের সর্বাত্মক আইনি নিরাপত্তা দেওয়া।'
    }
  ];

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'আমাদের নীতি ও দর্শন' }]} />

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#003828] to-[#006a4e] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4">
              মূল নীতিমালা ও আদর্শ
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bn leading-tight">
              আমাদের রাষ্ট্রদর্শন ও নীতিগত অবস্থান
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              সুস্পষ্ট গবেষণা, জনস্বার্থ এবং সাংবিধানিক কাঠামোর আলোকে নির্ধারিত বাংলাদেশ নবজাগরণ পার্টির মূল উন্নয়ন স্তম্ভ
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#f42a41] opacity-20 blur-xl pointer-events-none" />
        </div>

        {/* Grid of Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {policies.map((pol, i) => {
            const Icon = pol.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center flex-shrink-0 border border-emerald-200">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-serif-bn">
                    {pol.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pol.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to 10 points */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 font-serif-bn mb-3">
            এই নীতিসমূহ বাস্তবায়নে আমাদের ১০ দফা কর্মসূচি
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            নীতিগত অবস্থানগুলোকে প্রায়োগিক রূপ দিতে আমরা প্রতিটি খাতের সুনির্দিষ্ট কর্মসূচি ও বাস্তবায়ন সূচক প্রস্তুত করেছি।
          </p>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white font-medium text-sm transition-colors shadow-sm"
          >
            ১০ দফা কর্মসূচি দেখুন
          </Link>
        </div>

      </div>
    </div>
  );
};
