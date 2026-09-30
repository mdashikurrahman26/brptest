import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Building, Users, Shield, Cpu, Scale, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrganizationPage: React.FC = () => {
  const structureTiers = [
    {
      title: 'জাতীয় কাউন্সিল (National Council)',
      desc: 'দলের সর্বোচ্চ সিদ্ধান্ত গ্রহণকারী ফোরাম। প্রতি তিন বছর পর পর গঠিত হয় এবং সারাদেশের নির্বাচিত কাউন্সিলরদের সমন্বয়ে মূল নীতিনির্ধারণ করে।',
      members: 'সকল জেলা ও উপজেলা প্রতিনিধি',
      role: 'গঠনতন্ত্র সংশোধন, কেন্দ্রীয় নেতৃত্ব নির্বাচন ও বার্ষিক দিকনির্দেশনা অনুমোদন'
    },
    {
      title: 'কেন্দ্রীয় কার্যনির্বাহী পরিষদ (Central Executive Committee)',
      desc: 'দলের প্রধান নির্বাহী ও প্রশাসনিক বডি। নিয়মিত রাজনৈতিক কর্মসূচি, নীতিনির্ধারণ ও সাংগঠনিক কার্যক্রম পরিচালনা করে।',
      members: 'সভাপতি, মহাসচিব এবং বিভাগীয় সম্পাদকবৃন্দ',
      role: 'দৈনন্দিন নীতি বাস্তবায়ন ও সাংগঠনিক শৃঙ্খলা বজায় রাখা'
    },
    {
      title: 'উপদেষ্টা পরিষদ ও পলিসি রিসার্চ কাউন্সিল (Advisory & Research)',
      desc: 'স্বতন্ত্র শিক্ষাবিদ, অর্থনীতিবিদ, পরিবেশবিদ ও আইন বিশেষজ্ঞদের সমন্বয়ে গঠিত থিঙ্ক-ট্যাঙ্ক উইং।',
      members: 'বিষয়ভিত্তিক জাতীয় বিশেষজ্ঞ ও গবেষকবৃন্দ',
      role: '১০ দফা সংস্কার রূপরেখার খসড়া প্রণয়ন ও তথ্য-উপাত্ত বিশ্লেষণ'
    },
    {
      title: 'বিভাগীয় ও জেলা কমিটি (Divisional & District Committees)',
      desc: 'দেশের ৮টি বিভাগ ও ৬৪টি প্রশাসনিক জেলায় প্রতিষ্ঠিত তৃণমূল সাংগঠনিক ইউনিট।',
      members: 'স্থানীয়ভাবে নির্বাচিত জেলা আহ্বায়ক ও সম্পাদকবৃন্দ',
      role: 'স্থানীয় নাগরিক সমস্যার তথ্যায়ন ও উন্নয়ন সুপারিশ কেন্দ্রবিন্দুতে প্রেরণ'
    },
    {
      title: 'কেন্দ্রীয় সচিবালয় ও তথ্য সেল (Central Secretariat)',
      desc: 'কেন্দ্রীয় দপ্তরের নথি সংরক্ষণ, প্রেস লিয়াজোঁ, অডিট রেকর্ড এবং তথ্য অধিকার ডেস্ক পরিচালনা করে।',
      members: 'স্থায়ী কর্মকর্তা ও স্বেচ্ছাসেবক সেল',
      role: 'প্রশাসনিক ব্যবস্থাপনা, অডিট তত্ত্বাবধান ও পাবলিক পোর্টাল পরিচালনা'
    }
  ];

  const wings = [
    { name: 'যুব ও কর্মসংস্থান সেল', desc: 'তরুণদের মেধা বিকাশ ও কর্মসংস্থান প্রস্তাবনা' },
    { name: 'শিক্ষা ও গবেষণা সেল', desc: 'জাতীয় পাঠ্যক্রম ও দক্ষতা উন্নয়ন পর্যবেক্ষণ' },
    { name: 'আইন ও নাগরিক অধিকার সেল', desc: 'মানবাধিকার ও বিনামূল্যে আইনি পরামর্শ কেন্দ্র' },
    { name: 'পরিবেশ ও জলবায়ু সেল', desc: 'উপকূলীয় সংকট ও সবুজ শক্তি নীতি পর্যালোচনা' },
    { name: 'স্বাস্থ্য ও জনকল্যাণ উইং', desc: 'কমিউনিটি স্বাস্থ্য ও ওষুধ প্রাপ্তি নিশ্চিতকরণ সেল' },
    { name: 'তথ্যপ্রযুক্তি ও উদ্ভাবন সেল', desc: 'ডিজিটাল স্বচ্ছতা ও এআই ভিত্তিক শাসন গবেষণা' },
  ];

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'সাংগঠনিক কাঠামো' }]} />

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#003828] to-[#006a4e] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4">
              প্রাতিষ্ঠানিক স্তরবিন্যাস
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bn leading-tight">
              সাংগঠনিক কাঠামো ও পরিচালনা পদ্ধতি
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              গণতান্ত্রিক বিকেন্দ্রীকরণ, স্বচ্ছ জবাবদিহিতা এবং বিষয়ভিত্তিক বিশেষজ্ঞ সেলের সমন্বয়ে গঠিত আধুনিক সাংগঠনিক পদ্ধতি
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#f42a41] opacity-20 blur-xl pointer-events-none" />
        </div>

        {/* Hierarchical Structure */}
        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 font-serif-bn mb-4">
            সাংগঠনিক স্তরসমূহ (Organizational Hierarchy)
          </h2>

          <div className="space-y-4">
            {structureTiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 text-[#006a4e] font-bold text-sm flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {tier.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pl-11">
                    {tier.desc}
                  </p>
                </div>

                <div className="md:w-72 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-1.5 flex-shrink-0">
                  <div>
                    <span className="text-slate-400 font-medium">অন্তর্ভুক্ত: </span>
                    <span className="text-slate-700 font-semibold">{tier.members}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">প্রধান কাজ: </span>
                    <span className="text-emerald-800">{tier.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialized Research & Action Wings */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs mb-12">
          <h2 className="text-2xl font-bold text-slate-900 font-serif-bn mb-2">
            বিশেষজ্ঞ পলিসি ও গবেষণা সেলসমূহ
          </h2>
          <p className="text-sm text-slate-600 mb-8">
            দলের নীতিনির্ধারণে পেশাদার গবেষণা ও তথ্য সহায়তার জন্য গঠিত বিশেষায়িত শাখা
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wings.map((wing, i) => (
              <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-emerald-50/50 transition-colors">
                <h4 className="font-bold text-slate-900 text-base mb-1.5 text-[#006a4e]">
                  {wing.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {wing.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Constitution */}
        <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-emerald-950 font-serif-bn">
              সাংগঠনিক গঠনতন্ত্রের বিস্তারিত নিয়মাবলী জানতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 mt-1">
              আমাদের অনুমোদিত পূর্ণাঙ্গ গঠনতন্ত্র পিডিএফ আকারে সরাসরি ডাউনলোড করে পড়তে পারেন।
            </p>
          </div>
          <Link
            to="/documents"
            className="flex-shrink-0 px-5 py-2.5 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm transition-colors shadow-sm"
          >
            গঠনতন্ত্র ডাউনলোড করুন
          </Link>
        </div>

      </div>
    </div>
  );
};
