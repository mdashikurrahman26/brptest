import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Briefcase, ShieldCheck, 
  HeartPulse, Leaf, Users 
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { motion } from 'framer-motion';
import heroBannerImg from '../../assets/images/hero_bangladesh_banner_1790622735933.jpg';
import { triggerMembershipModal } from '../common/MembershipModal';

interface HeroSectionProps {
  settings?: SiteSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  const priorityCards = [
    {
      id: 1,
      titleLine1: 'শিক্ষা ও দক্ষতা',
      titleLine2: 'উন্নয়ন',
      icon: GraduationCap,
      link: '/programs',
    },
    {
      id: 2,
      titleLine1: 'কর্মসংস্থান ও',
      titleLine2: 'উদ্যোক্তা উন্নয়ন',
      icon: Briefcase,
      link: '/programs',
    },
    {
      id: 3,
      titleLine1: 'দুর্নীতি প্রতিরোধ ও',
      titleLine2: 'জবাবদিহি',
      icon: ShieldCheck,
      link: '/programs',
    },
    {
      id: 4,
      titleLine1: 'স্বাস্থ্যসেবা',
      titleLine2: 'সবার জন্য',
      icon: HeartPulse,
      link: '/programs',
    },
    {
      id: 5,
      titleLine1: 'পরিবেশ ও',
      titleLine2: 'টেকসই উন্নয়ন',
      icon: Leaf,
      link: '/programs',
    },
    {
      id: 6,
      titleLine1: 'সুবিচার ও',
      titleLine2: 'নাগরিক অধিকার',
      icon: Users,
      link: '/programs',
    },
  ];

  const heroBanner = settings?.hero?.bannerImageUrl || heroBannerImg;
  const heroTagline = settings?.hero?.tagline || 'দুর্নীতিমুক্ত, সমৃদ্ধ, ন্যায়ভিত্তিক';
  const heroTitle = settings?.hero?.title || 'বাংলাদেশ গড়ার লক্ষ্যে';
  const heroRibbon = settings?.hero?.ribbonText || 'আমরা একসাথে';
  const heroSubText = settings?.tagline || 'জ্ঞান, ন্যায় ও নবচিন্তার পথে';
  const primaryBtnText = settings?.hero?.primaryBtnText || 'আমাদের লক্ষ্য';
  const primaryBtnLink = settings?.hero?.primaryBtnLink || '/programs';
  const secondaryBtnText = settings?.hero?.secondaryBtnText || 'দল সম্পর্কে জানুন';
  const secondaryBtnLink = settings?.hero?.secondaryBtnLink || '/about';

  return (
    <div className="relative w-full bg-slate-50">
      
      {/* ================= HERO PANORAMIC BANNER ================= */}
      <section className="relative w-full min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[580px] overflow-hidden flex items-center justify-center">
        
        {/* Photographic Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBanner}
            alt="বাংলাদেশ নবজাগরণ পার্টি হিরো ব্যানার"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle light overlay to ensure Bengali text contrast while keeping scenery vivid */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-white/20 to-transparent pointer-events-none" />
        </div>

        {/* Banner Content Container */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Center / Left Main Messaging Block (8 cols) */}
            <div className="lg:col-span-8 flex flex-col items-center lg:items-center text-center">
              
              {/* Top Tagline with subtle fade-in */}
              <motion.p 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                className="text-slate-800 font-bold text-sm sm:text-base md:text-lg tracking-wide mb-1 drop-shadow-xs"
              >
                {heroTagline}
              </motion.p>

              {/* Main Headline with smooth fade-in and slight vertical lift */}
              <motion.h1 
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#003825] font-serif-bn tracking-tight leading-tight drop-shadow-sm"
              >
                {heroTitle}
              </motion.h1>

              {/* Green Brush Ribbon with dynamic text */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                className="relative my-3 sm:my-4 inline-block"
              >
                <div 
                  className="px-5 sm:px-10 md:px-12 py-2 sm:py-3 bg-[#005a3e] text-white font-extrabold text-lg sm:text-2xl md:text-3xl tracking-wide shadow-md flex items-center justify-center rounded-sm max-w-full"
                  style={{
                    clipPath: 'polygon(4% 0%, 96% 0%, 100% 50%, 96% 100%, 4% 100%, 0% 50%)'
                  }}
                >
                  <span className="drop-shadow truncate">{heroRibbon}</span>
                </div>
              </motion.div>

              {/* Sub-text framed by two lines */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex items-center justify-center gap-3 text-slate-800 font-bold text-sm sm:text-base md:text-lg my-2"
              >
                <span className="inline-block w-10 sm:w-16 h-[2px] bg-slate-700/80" />
                <span className="tracking-wide">{heroSubText}</span>
                <span className="inline-block w-10 sm:w-16 h-[2px] bg-slate-700/80" />
              </motion.div>

              {/* Two CTA Buttons with animated entrance and hover physics */}
              <motion.div 
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-5"
              >
                {/* Left Button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Link
                    to={primaryBtnLink}
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-lg bg-[#005a3e] hover:bg-[#004731] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-colors border border-emerald-600/30"
                  >
                    <GraduationCap className="w-5 h-5 text-white" />
                    <span>{primaryBtnText}</span>
                  </Link>
                </motion.div>

                {/* Right Button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <button
                    type="button"
                    onClick={triggerMembershipModal}
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-lg bg-white/95 hover:bg-white text-slate-900 font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-colors border border-slate-300 cursor-pointer"
                  >
                    <span>{secondaryBtnText}</span>
                  </button>
                </motion.div>
              </motion.div>

            </div>

            {/* Right Artistic Slogan: "সবার জন্য / একটি উন্নত / বাংলাদেশ" (4 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
              className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center text-center pl-6"
            >
              <div className="relative transform -rotate-3 select-none filter drop-shadow-md">
                
                {/* Line 1: সবার জন্য */}
                <div className="text-2xl sm:text-3xl font-extrabold text-[#005a3e] font-serif-bn tracking-wide">
                  সবার জন্য
                </div>

                {/* Line 2: একটি উন্নত (Red Calligraphic Brush) */}
                <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#d61f34] italic font-serif-bn tracking-tight my-0.5 transform -rotate-1">
                  একটি উন্নত
                </div>

                {/* Line 3: বাংলাদেশ */}
                <div className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#005a3e] font-serif-bn tracking-tight leading-none">
                  বাংলাদেশ
                </div>

                {/* Red Underline Curved Stroke */}
                <svg className="w-48 sm:w-56 h-4 mx-auto -mt-1 text-[#d61f34]" viewBox="0 0 200 20" fill="none">
                  <path 
                    d="M 10 12 Q 100 2 190 12 Q 100 18 10 12 Z" 
                    fill="currentColor" 
                  />
                </svg>

              </div>
            </motion.div>

          </div>
        </div>

      </section>

      {/* ================= 6 FLOATING PRIORITY CARDS ================= */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {priorityCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 + index * 0.08, ease: 'easeOut' }}
              >
                <Link
                  to={card.link}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1.5 h-full block"
                >
                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#005a3e] group-hover:scale-110 transition-transform mb-3">
                    <Icon className="w-7 h-7 stroke-[2.2]" />
                  </div>

                  {/* Title (2 lines) */}
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#005a3e] transition-colors leading-snug">
                    <div>{card.titleLine1}</div>
                    <div>{card.titleLine2}</div>
                  </h3>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

    </div>
  );
};
