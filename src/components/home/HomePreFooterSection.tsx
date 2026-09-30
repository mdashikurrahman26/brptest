import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, ChevronRight, ChevronLeft, Scale, 
  FileText, Plus, Minus, Download, Calendar, MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

// Image assets
import rallyImg from '../../assets/images/rally_news_thumb_1790623264670.jpg';
import promiseImg from '../../assets/images/new_day_promise_banner_1790623221443.jpg';

export const HomePreFooterSection: React.FC = () => {
  // Media Gallery Tab State
  const [mediaTab, setMediaTab] = useState<'photos' | 'videos' | 'events'>('photos');

  // FAQ Accordion State (open question index)
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Documents List
  const documentsList = [
    { title: 'দলীয় সংবিধান', size: '২.৫ MB' },
    { title: 'নীতিমালা ও কার্যক্রম', size: '১.৮ MB' },
    { title: '১০ দফা কর্মসূচি (বিস্তারিত)', size: '১.২ MB' },
    { title: 'দলীয় পত্রিকা (নবজাগরণ)', size: '৩.৪ MB' },
  ];

  // Gallery Photos
  const galleryPhotos = [
    {
      id: 1,
      src: rallyImg,
      alt: 'মিছিল ও গণসংযোগ',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=300&q=80',
      alt: 'কেন্দ্রীয় সমাবেশ',
    },
    {
      id: 3,
      src: promiseImg,
      alt: 'যুব সম্মেলন',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=300&q=80',
      alt: 'সাংগঠনিক সভা',
    },
  ];

  // FAQ Items
  const faqItems = [
    {
      q: 'দলে যোগদানের যোগ্যতা কী?',
      a: '১৮ বছর বা তদূর্ধ্ব যেকোনো বাংলাদেশি নাগরিক, যিনি দলের আদর্শ, গঠনতন্ত্র এবং মুক্তিযুদ্ধের চেতনায় আস্থাশীল, তিনি সদস্যপদ লাভের জন্য আবেদন করতে পারেন।'
    },
    {
      q: 'দলীয় সদস্য হতে কী করতে হবে?',
      a: 'ওয়েবসাইটের "সদস্য হোন" বাটনে ক্লিক করে অনলাইন আবেদনপত্র পূরণ করা যাবে অথবা নিকটস্থ জেলা/উপজেলা কার্যালয়ে সরাসরি ফরম জমা দেওয়া যাবে।'
    },
    {
      q: 'দলের নীতিমালা কোথায় পাব?',
      a: 'ওয়েবসাইটের "আমাদের নীতি" এবং "ডকুমেন্টস" মেনুতে গিয়ে দলের মূল নীতিমালা, গঠনতন্ত্র ও ১০ দফা কর্মসূচির পূর্ণাঙ্গ খসড়া ডাউনলোড করা যাবে।'
    },
    {
      q: 'দলীয় কার্যক্রম সম্পর্কে কিভাবে জানতে পারি?',
      a: 'আমাদের অফিশিয়াল ওয়েবসাইট, সর্বশেষ সংবাদ বিভাগ, ইভেন্ট ক্যালেন্ডার এবং দলের অফিশিয়াল ভেরিফায়েড সোশ্যাল মিডিয়া পেজে নিয়মিত আপডেট পাওয়া যায়।'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 6-CARD GRID (2 ROWS x 3 COLUMNS) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* ================= CARD 1: সাংগঠনিক কাঠামো ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif-bn">
                  সাংগঠনিক কাঠামো
                </h3>
                <Link
                  to="/organization"
                  className="text-xs font-semibold text-[#005a3e] hover:underline flex items-center gap-0.5"
                >
                  <span>সম্পূর্ণ কাঠামো দেখুন</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

              {/* Hierarchy Visual Diagram */}
              <div className="pt-2 pb-4">
                
                {/* Level 1: কেন্দ্রীয় কমিটি (Centered) */}
                <div className="flex justify-center relative">
                  <div className="bg-[#004d38] text-white px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-2 text-xs sm:text-sm font-bold border border-emerald-700/50">
                    <Users className="w-4 h-4 text-emerald-200" />
                    <span>কেন্দ্রীয় কমিটি</span>
                  </div>
                </div>

                {/* Vertical stem down */}
                <div className="w-[2px] h-4 bg-emerald-600/70 mx-auto" />

                {/* Horizontal branch bar (desktop/tablet) */}
                <div className="hidden sm:block w-[85%] h-[2px] bg-emerald-600/70 mx-auto relative">
                  {/* 4 vertical drops */}
                  <div className="absolute left-0 top-0 w-[2px] h-3 bg-emerald-600/70" />
                  <div className="absolute left-[33%] top-0 w-[2px] h-3 bg-emerald-600/70" />
                  <div className="absolute left-[67%] top-0 w-[2px] h-3 bg-emerald-600/70" />
                  <div className="absolute right-0 top-0 w-[2px] h-3 bg-emerald-600/70" />
                </div>

                {/* Level 2: 4 Sub-committees Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 sm:pt-3">
                  {[
                    { title: 'জেলা কমিটি', icon: Users },
                    { title: 'উপজেলা কমিটি', icon: Users },
                    { title: 'ওয়ার্ড কমিটি', icon: Users },
                    { title: 'সদস্যবৃন্দ', icon: Users },
                  ].map((node, i) => {
                    const NodeIcon = node.icon;
                    return (
                      <Link
                        key={i}
                        to="/organization"
                        className="bg-[#004d38] hover:bg-[#003828] text-white rounded-lg p-2 sm:p-2.5 flex flex-col items-center justify-center text-center shadow-xs transition-colors group"
                      >
                        <NodeIcon className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform mb-1" />
                        <span className="text-[11px] sm:text-xs font-semibold leading-tight">
                          {node.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>

              </div>
            </div>

            <div className="pt-2 text-center border-t border-slate-100">
              <Link
                to="/leadership"
                className="text-xs font-semibold text-[#005a3e] hover:underline"
              >
                কেন্দ্রীয় নেতৃত্বের তালিকা দেখুন
              </Link>
            </div>
          </motion.div>

          {/* ================= CARD 2: দলীয় নথি ও প্রকাশনা ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif-bn">
                  দলীয় নথি ও প্রকাশনা
                </h3>
                <Link
                  to="/documents"
                  className="text-xs font-semibold text-[#005a3e] hover:underline flex items-center gap-0.5"
                >
                  <span>সব দেখুন</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

              {/* Document List */}
              <div className="space-y-2.5">
                {documentsList.map((doc, idx) => (
                  <Link
                    key={idx}
                    to="/documents"
                    className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Red PDF Icon */}
                      <div className="w-8 h-8 rounded-md bg-[#d61f34] text-white flex flex-col items-center justify-center font-bold text-[9px] shadow-2xs flex-shrink-0">
                        <FileText className="w-3.5 h-3.5" />
                        <span className="leading-none text-[7px] tracking-tight">PDF</span>
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#005a3e] transition-colors truncate">
                          {doc.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 block">
                          PDF • {doc.size}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#005a3e] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-center">
              <Link
                to="/documents"
                className="text-xs font-semibold text-[#005a3e] hover:underline flex items-center justify-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>সকল অফিসিয়াল রেজোলিউশন ও প্রেস নোট</span>
              </Link>
            </div>
          </motion.div>

          {/* ================= CARD 3: অনুষ্ঠান ও কার্যক্রম ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.19, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif-bn">
                  অনুষ্ঠান ও কার্যক্রম
                </h3>
                <Link
                  to="/events"
                  className="text-xs font-semibold text-[#005a3e] hover:underline flex items-center gap-0.5"
                >
                  <span>সব দেখুন</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

              {/* Event Showcase Card */}
              <div className="space-y-3">
                {/* Event Photo */}
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={rallyImg}
                    alt="যুব সমাবেশ ও গণসংযোগ কর্মসূচি"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Event Info Details */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  
                  {/* Left Date Block */}
                  <div className="bg-[#004d38] text-white rounded-lg p-1.5 w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center text-center flex-shrink-0 shadow-xs">
                    <span className="text-base sm:text-lg font-extrabold leading-none">০৪</span>
                    <span className="text-[9px] leading-tight mt-0.5">অক্টোবর</span>
                    <span className="text-[8px] text-emerald-200 leading-none">২০২৬</span>
                  </div>

                  {/* Middle Text */}
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/events"
                      className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#005a3e] transition-colors leading-snug line-clamp-1 block"
                    >
                      যুব সমাবেশ ও গণসংযোগ কর্মসূচি
                    </Link>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>ঢাকা, বাংলাদেশ</span>
                    </span>
                  </div>

                  {/* Right Circle Chevron */}
                  <Link
                    to="/events"
                    className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#004d38] hover:text-white hover:border-[#004d38] transition-colors flex-shrink-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                </div>

                {/* Carousel Dots */}
                <div className="flex items-center justify-center gap-1.5 pt-2">
                  <span className="w-2 h-2 rounded-full bg-[#005a3e]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
              </div>
            </div>

            <div className="pt-2 text-center border-t border-slate-100">
              <Link to="/events" className="text-xs font-semibold text-[#005a3e] hover:underline">
                আসন্ন সকল সম্মেলন ও রোডম্যাপ
              </Link>
            </div>
          </motion.div>

          {/* ================= CARD 4: মিডিয়া গ্যালারি ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif-bn">
                  মিডিয়া গ্যালারি
                </h3>
                <Link
                  to="/media"
                  className="text-xs font-semibold text-[#005a3e] hover:underline flex items-center gap-0.5"
                >
                  <span>সব দেখুন</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

              {/* Tabs: ছবি / ভিডিও / ইভেন্ট */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setMediaTab('photos')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                    mediaTab === 'photos'
                      ? 'bg-[#004d38] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  ছবি
                </button>
                <button
                  onClick={() => setMediaTab('videos')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                    mediaTab === 'videos'
                      ? 'bg-[#004d38] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  ভিডিও
                </button>
                <button
                  onClick={() => setMediaTab('events')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                    mediaTab === 'events'
                      ? 'bg-[#004d38] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  ইভেন্ট
                </button>
              </div>

              {/* Carousel of 4 Thumbnails with Arrows */}
              <div className="flex items-center gap-2">
                <button 
                  className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex-shrink-0"
                  aria-label="পূর্ববর্তী"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div className="grid grid-cols-4 gap-2 flex-1">
                  {galleryPhotos.map((photo) => (
                    <Link
                      key={photo.id}
                      to="/media"
                      className="aspect-square rounded-lg overflow-hidden bg-slate-100 group relative block shadow-2xs"
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </Link>
                  ))}
                </div>

                <button 
                  className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex-shrink-0"
                  aria-label="পরবর্তী"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Carousel Indicator Dots */}
              <div className="flex items-center justify-center gap-1.5 pt-4">
                <span className="w-2 h-2 rounded-full bg-[#005a3e]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              </div>
            </div>

            <div className="pt-2 text-center border-t border-slate-100">
              <Link to="/media" className="text-xs font-semibold text-[#005a3e] hover:underline">
                হাই-রেজোলিউশন প্রেস ফটো ও আর্কাইভ
              </Link>
            </div>
          </motion.div>

          {/* ================= CARD 5: স্বচ্ছতা ও জবাবদিহি ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Header with Circular Emblem Scale Icon */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#004d38] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                  <Scale className="w-5 h-5 text-emerald-200" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-[#004d38] font-serif-bn">
                  স্বচ্ছতা ও জবাবদিহি
                </h3>
              </div>

              {/* Institutional Statement Paragraph */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-6">
                আমরা বিশ্বাস করি, জনগণের টাকাই জনগণের সম্পদ। তাই দলীয় সকল আর্থিক লেনদেন ও কার্যক্রমে স্বচ্ছতা ও জবাবদিহি নিশ্চিত করা হবে।
              </p>

              {/* Action Button */}
              <div>
                <Link
                  to="/transparency"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#004d38] hover:bg-[#003828] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
                >
                  <span>বিস্তারিত দেখুন</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-[11px] text-emerald-800 font-medium block">
                ✓ বার্ষিক নিরীক্ষিত আয়-ব্যয়ের হিসাব উন্মুক্ত
              </span>
            </div>
          </motion.div>

          {/* ================= CARD 6: সাধারণ জিজ্ঞাসা (FAQ) ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.40, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif-bn">
                  সাধারণ জিজ্ঞাসা (FAQ)
                </h3>
                <Link
                  to="/faq"
                  className="text-xs font-semibold text-[#005a3e] hover:underline flex items-center gap-0.5"
                >
                  <span>সব দেখুন</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

              {/* FAQ Accordion Items */}
              <div className="space-y-1.5">
                {faqItems.map((item, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="border border-slate-100 rounded-lg overflow-hidden transition-all bg-slate-50/50"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left px-3 py-2 flex items-center justify-between gap-2 text-xs sm:text-[13px] font-semibold text-slate-800 hover:text-[#005a3e] hover:bg-slate-100/60 transition-colors"
                      >
                        <span className="truncate">{item.q}</span>
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-3 pb-2.5 pt-1 text-[11px] sm:text-xs text-slate-600 border-t border-slate-100 bg-white leading-relaxed animate-fadeIn">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-center">
              <Link to="/faq" className="text-xs font-semibold text-[#005a3e] hover:underline">
                আপনার কি আরও প্রশ্ন আছে? প্রশ্নোত্তর পেজ দেখুন
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
