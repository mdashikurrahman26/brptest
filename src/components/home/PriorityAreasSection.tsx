import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Briefcase, ShieldCheck, 
  HeartPulse, Leaf, Scale, ArrowRight 
} from 'lucide-react';

export const PriorityAreasSection: React.FC = () => {
  const priorities = [
    {
      id: 'p1',
      title: 'শিক্ষা ও দক্ষতা উন্নয়ন',
      desc: 'মুখস্থবিদ্যা পরিহার করে কর্মমুখী, বিজ্ঞানভিত্তিক ও গবেষণামূলক শিক্ষার বিস্তার এবং প্রাথমিক ও উচ্চশিক্ষায় আন্তর্জাতিক মান অর্জন।',
      icon: GraduationCap,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      progId: 1
    },
    {
      id: 'p2',
      title: 'কর্মসংস্থান ও উদ্যোক্তা উন্নয়ন',
      desc: 'তরুণদের উদ্যোক্তা তহবিল, ঝামেলাহীন স্টার্টআপ ছাড়পত্র এবং মেধাভিত্তিক বৈষম্যহীন নতুন কর্মসংস্থান সৃজন।',
      icon: Briefcase,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      progId: 2
    },
    {
      id: 'p3',
      title: 'দুর্নীতি প্রতিরোধ ও জবাবদিহি',
      desc: 'স্বাধীন দুর্নীতি দমন ব্যবস্থা, সরকারি কেনাকাটায় উন্মুক্ত ই-টেন্ডারিং এবং প্রতিটি স্তরে নাগরিক পর্যবেক্ষণ নিশ্চিতকরণ।',
      icon: ShieldCheck,
      color: 'bg-red-50 text-red-700 border-red-200',
      progId: 3
    },
    {
      id: 'p4',
      title: 'স্বাস্থ্যসেবা ও সুরক্ষা',
      desc: 'উপজেলা ও ইউনিয়ন পর্যায়ে আধুনিক ডায়াগনস্টিক সুবিধা, জরুরি ওষুধের সাশ্রয়ী মূল্য এবং সার্বজনীন স্বাস্থ্য সুরক্ষা মডেল।',
      icon: HeartPulse,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      progId: 5
    },
    {
      id: 'p5',
      title: 'পরিবেশ ও টেকসই উন্নয়ন',
      desc: 'নদী দখল ও দূষণমুক্তি, উপকূলীয় টেকসই বেড়িবাঁধ নির্মাণ এবং নবায়নযোগ্য জ্বালানির সমন্বিত জাতীয় রোডম্যাপ।',
      icon: Leaf,
      color: 'bg-green-50 text-green-700 border-green-200',
      progId: 8
    },
    {
      id: 'p6',
      title: 'সুশাসন ও নাগরিক অধিকার',
      desc: 'আইনের চোখে সকলের সমানাধিকার, বিচার বিভাগের পূর্ণ স্বাধীনতা এবং নাগরিক মতপ্রকাশের স্বাধীনতা সংরক্ষণ।',
      icon: Scale,
      color: 'bg-sky-50 text-sky-700 border-sky-200',
      progId: 4
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            অগ্রাধিকার খাতসমূহ
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            জাতীয় অগ্রযাত্রায় আমাদের মূল ৬টি ক্ষেত্র
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            টেকসই সমৃদ্ধি, আধুনিক প্রতিষ্ঠান ও জনকল্যাণের লক্ষ্যে নির্ধারিত প্রধান প্রায়োগিক ক্ষেত্রসমূহ
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-slate-200 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#006a4e] transition-colors mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    ১০ দফার অংশ #{item.progId}
                  </span>
                  <Link
                    to="/programs"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#006a4e] hover:text-emerald-800 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>বিস্তারিত দেখুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
