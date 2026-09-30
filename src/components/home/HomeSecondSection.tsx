import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

// Images generated to match reference
import promiseBannerImg from '../../assets/images/new_day_promise_banner_1790623221443.jpg';
import emblemImg from '../../assets/images/brp_party_emblem_1790622749816.jpg';
import rallyNewsImg from '../../assets/images/rally_news_thumb_1790623264670.jpg';
import videoThumbImg from '../../assets/images/party_video_thumbnail_1790623243542.jpg';

import { SiteSettings } from '../../types';

interface HomeSecondSectionProps {
  settings?: SiteSettings;
}

export const HomeSecondSection: React.FC<HomeSecondSectionProps> = ({ settings }) => {
  const promiseBanner = settings?.secondSection?.promiseBannerUrl || promiseBannerImg;
  const promiseTitle1 = settings?.secondSection?.promiseTitle1 || 'একটি';
  const promiseTitle2 = settings?.secondSection?.promiseTitle2 || 'নতুন দিনের';
  const promiseTitle3 = settings?.secondSection?.promiseTitle3 || 'প্রতিশ্রুতি';
  const promiseDesc = settings?.secondSection?.promiseDescription || 'বাংলাদেশ নবজাগরণ পার্টি (BRP) একটি গণতান্ত্রিক, প্রগতিশীল ও জনমুখী রাজনৈতিক দল। আমরা বিশ্বাস করি, জনগণের শক্তি, মানবিকতা, সুশাসন এবং টেকসই উন্নয়নের মাধ্যমে একটি সমৃদ্ধ ও মানবিক বাংলাদেশ গড়া সম্ভব।';
  const emblemBanner = settings?.secondSection?.emblemBannerUrl || emblemImg;
  const videoThumb = settings?.secondSection?.videoThumbnail || videoThumbImg;
  const videoTitle = settings?.secondSection?.videoTitle || 'আমাদের লক্ষ্য ও আগামীর বাংলাদেশ';
  const videoUrl = settings?.secondSection?.videoUrl || 'https://www.youtube.com';
  const tenPoints = [
    { num: '১', text: 'শিক্ষা ও দক্ষতা উন্নয়ন', path: '/programs' },
    { num: '২', text: 'কর্মসংস্থান ও উদ্যোক্তা উন্নয়ন', path: '/programs' },
    { num: '৩', text: 'দুর্নীতি প্রতিরোধ ও জবাবদিহি', path: '/programs' },
    { num: '৪', text: 'আইনশৃঙ্খলা ও নাগরিক অধিকার', path: '/programs' },
    { num: '৫', text: 'স্বাস্থ্যসেবা', path: '/programs' },
    { num: '৬', text: 'কৃষি ও খাদ্য নিরাপত্তা', path: '/programs' },
    { num: '৭', text: 'পরিবেশ ও জলবায়ু সুরক্ষা', path: '/programs' },
    { num: '৮', text: 'সংস্কৃতি ও মূল্যবোধ', path: '/programs' },
    { num: '৯', text: 'স্থানীয় সরকার ও স্বায়ত্তশাসন', path: '/programs' },
    { num: '১০', text: 'প্রযুক্তি, গবেষণা ও ডিজিটাল বাংলাদেশ', path: '/programs' },
  ];

  return (
    <section className="py-10 md:py-14 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= ROW 1: ABOUT BRP & EMBLEM SHOWCASE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Left Large Card: About Us (8 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col md:flex-row group"
          >
            
            {/* Left Image with Artistic Calligraphy */}
            <div className="relative md:w-5/12 aspect-[4/3] md:aspect-auto overflow-hidden bg-slate-100 flex-shrink-0">
              <img
                src={promiseBanner}
                alt="একটি নতুন দিনের প্রতিশ্রুতি"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Artistic Calligraphy Overlay: "একটি নতুন দিনের প্রতিশ্রুতি" */}
              <div className="absolute top-4 right-4 text-right select-none drop-shadow-md">
                <div className="text-xl sm:text-2xl font-extrabold text-[#005a3e] font-serif-bn leading-tight">
                  {promiseTitle1}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#005a3e] font-serif-bn leading-tight">
                  {promiseTitle2}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#d61f34] italic font-serif-bn leading-tight -mt-0.5">
                  {promiseTitle3}
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-center">
              <span className="text-xs sm:text-sm font-bold text-[#005a3e] block mb-1.5 uppercase tracking-wide">
                আমাদের সম্পর্কে
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-bn mb-3.5 leading-tight">
                {settings?.siteName || 'বাংলাদেশ নবজাগরণ পার্টি'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                {promiseDesc}
              </p>

              <div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#005a3e] hover:bg-[#004731] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
                >
                  <span>বিস্তারিত জানুন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </motion.div>

          {/* Right Card: Official Seal & Motto Showcase (4 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 bg-[#edf6f1]/70 rounded-2xl border border-emerald-200/80 p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xs"
          >
            
            {/* Logo and Name */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#005a3e] p-0.5 bg-white shadow-xs flex-shrink-0">
                <img
                  src={emblemBanner}
                  alt="বাংলাদেশ নবজাগরণ পার্টি সিল"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="text-left">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#005a3e] font-serif-bn leading-tight">
                  {settings?.siteName || 'বাংলাদেশ নবজাগরণ পার্টি'}
                </h3>
                <p className="text-[11px] font-semibold text-slate-600 tracking-wide mt-0.5">
                  {settings?.siteNameEn || 'Bangladesh Renaissance Party (BRP)'}
                </p>
              </div>
            </div>

            {/* Slogan */}
            <div className="mt-4 pt-3 border-t border-emerald-200/60 w-full">
              <p className="text-xl sm:text-2xl font-bold text-[#005a3e] font-serif-bn tracking-wide">
                “{settings?.tagline || 'জ্ঞান, ন্যায় ও নবচিন্তার পথে'}”
              </p>

              {/* Red & Green Curved Underline Stroke */}
              <div className="flex justify-center mt-2.5">
                <svg className="w-44 h-3.5" viewBox="0 0 180 14" fill="none">
                  <path 
                    d="M 5 7 Q 90 0 175 7 Q 90 14 5 7 Z" 
                    fill="#d61f34" 
                  />
                  <path 
                    d="M 25 10 Q 90 4 155 10 Q 90 16 25 10 Z" 
                    fill="#005a3e" 
                    opacity="0.8" 
                  />
                </svg>
              </div>
            </div>

          </motion.div>

        </div>

        {/* ================= ROW 2: 3 COLUMNS (NEWS, 10-POINT PROGRAM, RECENT VIDEOS) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* COLUMN 1: সর্বশেষ সংবাদ (Latest News) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif-bn">
                  সর্বশেষ সংবাদ
                </h3>
                <Link
                  to="/news"
                  className="text-xs font-semibold text-[#005a3e] hover:underline flex items-center gap-0.5"
                >
                  <span>সব খবর দেখুন</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

              {/* Main Top News Story */}
              <div className="flex gap-3.5 mb-4 pb-4 border-b border-slate-100">
                <div className="w-24 sm:w-28 aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={rallyNewsImg}
                    alt="সংবাদ ছবি"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <Link
                      to="/news"
                      className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#005a3e] transition-colors leading-snug line-clamp-2"
                    >
                      দুর্নীতি ও চাঁদাবাজির বিরুদ্ধে কঠোর অবস্থান বাংলাদেশ নবজাগরণ পার্টি
                    </Link>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      ২৯ সেপ্টেম্বর ২০২৬
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-50">
                    <Link
                      to="/news"
                      className="text-[11px] font-semibold text-slate-700 hover:text-[#005a3e] leading-snug line-clamp-2"
                    >
                      বাংলাদেশ নবজাগরণ পার্টির কেন্দ্রীয় কমিটির বৈঠক অনুষ্ঠিত, সাংগঠনিক কার্যক্রম জোরদার
                    </Link>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      ২৬ সেপ্টেম্বর ২০২৬
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Stories List */}
              <div className="space-y-3">
                <Link
                  to="/news"
                  className="flex items-center gap-3 group hover:bg-slate-50 p-1.5 -mx-1.5 rounded-lg transition-colors"
                >
                  <div className="w-12 h-10 rounded-md overflow-hidden bg-slate-200 flex-shrink-0 relative">
                    <img
                      src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=200&q=80"
                      alt="শিক্ষা"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-3 h-3 text-white fill-current" />
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#005a3e] transition-colors line-clamp-1 leading-snug">
                      শিক্ষা খাতে বিনিয়োগ বাড়ানোর দাবি দলের
                    </h5>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      ২৩ সেপ্টেম্বর ২০২৬
                    </span>
                  </div>
                </Link>

                <Link
                  to="/news"
                  className="flex items-center gap-3 group hover:bg-slate-50 p-1.5 -mx-1.5 rounded-lg transition-colors"
                >
                  <div className="w-12 h-10 rounded-md overflow-hidden bg-slate-200 flex-shrink-0 relative">
                    <img
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=200&q=80"
                      alt="পরিবেশ"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-3 h-3 text-white fill-current" />
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#005a3e] transition-colors line-clamp-1 leading-snug">
                      পরিবেশ রক্ষায় জাতীয় উদ্যোগের আহ্বান
                    </h5>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      ২২ সেপ্টেম্বর ২০২৬
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <Link to="/news" className="text-xs font-semibold text-[#005a3e] hover:underline">
                সকল খবর ও প্রেস রিলিজ পড়তে ক্লিক করুন
              </Link>
            </div>
          </motion.div>

          {/* COLUMN 2: ১০ দফা কর্মসূচি (10-Point Program) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#edf7f2] rounded-2xl border border-emerald-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200/80 mb-4">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif-bn">
                  ১০ দফা কর্মসূচি
                </h3>
                <Link
                  to="/programs"
                  className="text-xs font-semibold text-[#005a3e] hover:underline flex items-center gap-0.5"
                >
                  <span>সম্পূর্ণ কর্মসূচি দেখুন</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

              {/* 10 Items List */}
              <div className="space-y-2">
                {tenPoints.map((item) => (
                  <Link
                    key={item.num}
                    to={item.path}
                    className="flex items-center gap-2.5 py-1 px-1.5 -mx-1.5 rounded-md hover:bg-emerald-100/60 transition-colors group"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#005a3e] text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 shadow-2xs">
                      {item.num}
                    </span>
                    <span className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-[#005a3e] transition-colors truncate">
                      {item.text}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-200/80 text-center">
              <Link to="/programs" className="text-xs font-semibold text-[#005a3e] hover:underline">
                ১০ দফার বিশদ প্রস্তাবনা দেখুন
              </Link>
            </div>
          </motion.div>

          {/* COLUMN 3: সাম্প্রতিক ভিডিও (Recent Videos) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif-bn">
                  সাম্প্রতিক ভিডিও
                </h3>
                <Link
                  to="/media"
                  className="text-xs font-semibold text-[#005a3e] hover:underline flex items-center gap-0.5"
                >
                  <span>সব ভিডিও দেখুন</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

              {/* Main Featured Video Thumbnail */}
              <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="block group mb-3">
                <div className="aspect-[16/9] rounded-xl overflow-hidden relative bg-slate-900 shadow-xs">
                  <img
                    src={videoThumb}
                    alt={videoTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#d61f34] transition-all shadow-md">
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                    ভিডিও
                  </div>
                </div>

                <div className="mt-2.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#005a3e] transition-colors leading-snug line-clamp-1">
                    {videoTitle}
                  </h4>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    অফিসিয়াল ভিডিও লিংক
                  </span>
                </div>
              </a>

              {/* Bottom Videos List */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <Link
                  to="/media"
                  className="flex items-center justify-between gap-3 group hover:bg-slate-50 p-1.5 -mx-1.5 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-12 h-10 rounded-md overflow-hidden bg-slate-900 flex-shrink-0 relative">
                      <img
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=200&q=80"
                        alt="দুর্নীতি"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-3 h-3 text-white fill-current" />
                      </div>
                      <span className="absolute bottom-0.5 right-0.5 text-[8px] bg-black/80 text-white px-0.5 rounded">
                        02:10
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#005a3e] transition-colors truncate leading-snug">
                        দুর্নীতির বিরুদ্ধে আমাদের অবস্থান
                      </h5>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        ২৩ সেপ্টেম্বর ২০২৬
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/media"
                  className="flex items-center justify-between gap-3 group hover:bg-slate-50 p-1.5 -mx-1.5 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-12 h-10 rounded-md overflow-hidden bg-slate-900 flex-shrink-0 relative">
                      <img
                        src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=200&q=80"
                        alt="যুবসমাজ"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-3 h-3 text-white fill-current" />
                      </div>
                      <span className="absolute bottom-0.5 right-0.5 text-[8px] bg-black/80 text-white px-0.5 rounded">
                        01:45
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#005a3e] transition-colors truncate leading-snug">
                        যুবসমাজ ও নতুন বাংলাদেশ
                      </h5>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        ২৭ সেপ্টেম্বর ২০২৬
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <Link to="/media" className="text-xs font-semibold text-[#005a3e] hover:underline">
                সকল ভিডিও ও আলোকচিত্র গ্যালারি
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
