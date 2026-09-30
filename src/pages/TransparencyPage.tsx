import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ShieldCheck, FileSpreadsheet, Scale, Lock, Mail, Download, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TransparencyPage: React.FC = () => {
  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'স্বচ্ছতা ও প্রাতিষ্ঠানিক জবাবদিহি' }]} />

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#003828] to-[#006a4e] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4">
              উন্মুক্ত অডিট ও তথ্যায়ন
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bn leading-tight">
              স্বচ্ছতা, জবাবদিহি ও নৈতিক মানদণ্ড
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              বাংলাদেশ নবজাগরণ পার্টির আর্থিক আয়-ব্যয়ের হিসাব, প্রাতিষ্ঠানিক অডিট এবং তথ্য অধিকার সংক্রান্ত সুনির্দিষ্ট নীতিমালা
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#f42a41] opacity-20 blur-xl pointer-events-none" />
        </div>

        {/* 4 Pillars of Transparency */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center mb-4 border border-emerald-200">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">
              ১০০% নিরীক্ষিত তহবিল
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              স্বতন্ত্র চার্টার্ড অ্যাকাউন্ট্যান্ট ফার্ম দ্বারা দলীয় তহবিলের আয় ও ব্যয় নিয়মিত অডিট করা হয় এবং বার্ষিক বিবরণী উন্মুক্ত করা হয়।
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center mb-4 border border-emerald-200">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">
              স্বার্থের সংঘাত প্রতিরোধ
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              কেন্দ্রীয় নীতিনির্ধারকদের বাণিজ্যিক ব্যবসায়িক স্বার্থ যাতে কোনোভাবেই রাজনৈতিক সিদ্ধান্তে প্রভাব না ফেলে সে ব্যাপারে লিখিত বিধিনিষেধ রয়েছে।
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center mb-4 border border-emerald-200">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">
              তথ্য জানার অধিকার (RTI)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              যেকোনো নাগরিক আমাদের অভ্যন্তরীণ সিদ্ধান্ত বা প্রকাশনার বিষয়ে তথ্য প্রাপ্তির জন্য সরাসরি আবেদন করতে পারেন।
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center mb-4 border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">
              হুইসেলব্লোয়ার সুরক্ষা
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              দলীয় কোনো অভ্যন্তরীণ অনিয়ম সম্পর্কে তথ্য প্রদানকারী ব্যক্তির পরিচয় শতভাগ সুরক্ষিত রাখার আইনি ও কাঠামোগত নিশ্চয়তা।
            </p>
          </div>

        </div>

        {/* Financial Transparency Report */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-bn">
                সর্বশেষ নিরীক্ষিত বার্ষিক আর্থিক প্রতিবেদন (২০২৫)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                নিরীক্ষক: মেসার্স রহমান অ্যান্ড অ্যাসোসিয়েটস, চার্টার্ড অ্যাকাউন্ট্যান্টস
              </p>
            </div>
            <Link
              to="/documents"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#006a4e] text-white text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>পূর্ণাঙ্গ রিপোর্ট (PDF)</span>
            </Link>
          </div>

          {/* Table of Summary Figures */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-900 uppercase text-[11px] font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">খাত বিবরণী</th>
                  <th className="py-3 px-4">আয় (টাকা)</th>
                  <th className="py-3 px-4">ব্যয় (টাকা)</th>
                  <th className="py-3 px-4">অডিট মন্তব্য</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">সাধারণ সদস্য মাসিক চাঁদা</td>
                  <td className="py-3 px-4 text-emerald-700 font-medium">২৮,৫০,০০০</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 text-slate-500">ব্যাংক চ্যানেলের মাধ্যমে শতভাগ প্রাপ্ত</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">নাগরিক স্বেচ্ছাপ্রণোদিত অনুদান</td>
                  <td className="py-3 px-4 text-emerald-700 font-medium">৪২,২০,০০০</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 text-slate-500">সকল দাতার এনআইডি যাচাইকৃত</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">প্রকাশনা ও বুলেটিন বিক্রয়লব্ধ তহবিল</td>
                  <td className="py-3 px-4 text-emerald-700 font-medium">৬,৮০,০০০</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 text-slate-500">স্বচ্ছ হিসাব ভাউচার সংরক্ষিত</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">গবেষণা, সেমিনার ও পলিসি ড্রাফটিং</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 text-red-700 font-medium">২২,১০,০০০</td>
                  <td className="py-3 px-4 text-slate-500">১০ দফা গবেষণার ব্যয়সহ</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">জেলা দপ্তর ও সাংগঠনিক প্রশাসনিক পরিচালন</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4 text-red-700 font-medium">৩১,৪০,০০০</td>
                  <td className="py-3 px-4 text-slate-500">অফিস ভাড়া, কর্মীদের সম্মানী ও যোগাযোগ</td>
                </tr>
                <tr className="bg-slate-50 font-bold text-slate-900">
                  <td className="py-3 px-4">সর্বমোট সমন্বয়</td>
                  <td className="py-3 px-4 text-emerald-800">৭৭,৫০,০০০</td>
                  <td className="py-3 px-4 text-red-800">৫৩,৫০,০০০</td>
                  <td className="py-3 px-4 text-emerald-700">উদ্বৃত্ত: ২৪,০০,০০০ (স্থায়ী তহবিলে)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* RTI Request Section */}
        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
          <div className="max-w-3xl">
            <h3 className="text-xl font-bold text-emerald-950 font-serif-bn mb-2">
              তথ্য জানার অধিকার (RTI) ডেস্কের সাথে যোগাযোগ
            </h3>
            <p className="text-sm text-emerald-800 mb-6 leading-relaxed">
              বাংলাদেশ নবজাগরণ পার্টির যেকোনো অনুমোদিত দলিল বা সিদ্ধান্তের অনুলিপি জানতে আমাদের তথ্য কর্মকর্তার নিকট যোগাযোগ করুন। আমরা ৫ কার্যদিবসের মধ্যে চাহিত তথ্যের অনুলিপি প্রদান করতে প্রতিশ্রুতিবদ্ধ।
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold">
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-lg bg-[#006a4e] text-white hover:bg-emerald-800 transition-colors shadow-sm"
              >
                অনলাইনে তথ্য অনুরোধ ফরম পূরণ করুন
              </Link>
              <a
                href="mailto:contact@brp.org.bd?subject=RTI%20Request"
                className="px-5 py-2.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100 transition-colors"
              >
                ইমেইল পাঠান: rti@brp.org.bd
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
