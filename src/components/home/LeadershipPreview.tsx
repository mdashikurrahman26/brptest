import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, GraduationCap, 
  Award, Mail, Phone, X, ChevronRight,
  Sparkles, CheckCircle2, FileText, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leader } from '../../types';
import mahfuzurImg from '../../assets/images/mahfuzur_rahman_sg_1790624790511.jpg';

interface LeadershipPreviewProps {
  leaders: Leader[];
}

export const LeadershipPreview: React.FC<LeadershipPreviewProps> = ({ leaders }) => {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'top' | 'secretariat'>('all');

  const getLeaderPhoto = (leader: Leader | null) => {
    if (!leader) return '';
    return leader.photoUrl || mahfuzurImg;
  };

  // Separate top presidential leadership (President & Secretary General) from secretariat
  const president = leaders.find(l => 
    l.position.trim() === 'সভাপতি' || 
    (l.position.includes('সভাপতি') && !l.position.includes('সহ-সভাপতি'))
  );
  const secretaryGeneral = leaders.find(l => l.position.includes('মহাসচিব'));

  // Strictly deduplicated list of top leadership
  const topLeaders: Leader[] = [];
  const seenIds = new Set<string>();

  if (president && !seenIds.has(president.id)) {
    topLeaders.push(president);
    seenIds.add(president.id);
  }
  if (secretaryGeneral && !seenIds.has(secretaryGeneral.id)) {
    topLeaders.push(secretaryGeneral);
    seenIds.add(secretaryGeneral.id);
  }

  // If neither president nor secretaryGeneral is explicitly found, fallback to at most the first leader
  if (topLeaders.length === 0 && leaders.length > 0) {
    topLeaders.push(leaders[0]);
    seenIds.add(leaders[0].id);
  }

  // Secretariat & other department heads (strictly excluding the top leaders)
  const secretariatLeaders = leaders.filter(l => !seenIds.has(l.id));

  // Quotes for top leadership
  const leaderQuotes: Record<string, string> = {
    [president?.id || '']: '“ন্যায়ভিত্তিক সমাজ, মানবিক মর্যাদা ও মেধার যথাযথ মূল্যায়নেই নিশ্চিত হবে উন্নত বাংলাদেশ।”',
    [secretaryGeneral?.id || '']: '“স্বচ্ছ রাজনীতি, জবাবদিহিতা ও তৃণমূলের সক্রিয় অংশগ্রহণই নবজাগরণ পার্টির মূল চালিকাশক্তি।”'
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#f8fafc] via-[#f1f6f3]/60 to-[#f8fafc] border-b border-slate-200 relative overflow-hidden">
      
      {/* Subtle Background Watermark Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d61f34]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECTION HEADER: DIGNIFIED & POLITICAL ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200/90">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900 text-emerald-100 text-[11px] font-bold tracking-wide uppercase shadow-2xs mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#f42a41] animate-pulse" />
              <span>সাংগঠনিক নেতৃত্ব • নির্বাচিত কার্যকাল ২০২৬–২০২৮</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-serif-bn leading-tight">
              কেন্দ্রীয় কার্যনির্বাহী পরিষদ
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl font-normal leading-relaxed">
              দলীয় গঠনতন্ত্র ও জাতীয় গণতান্ত্রিক ম্যান্ডেট অনুযায়ী নির্বাচিত শীর্ষ নীতিনির্ধারক ও অভিজ্ঞ সম্পাদকমণ্ডলীর পরিচিতি
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/organization"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
            >
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              <span>সাংগঠনিক রূপরেখা</span>
            </Link>

            <Link
              to="/leadership"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#005a3e] hover:bg-[#004731] transition-all shadow-xs hover:shadow-md"
            >
              <span>সম্পূর্ণ ৭১ সদস্যের পরিষদ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ================= TIER 1: PRESIDENTIAL DUAL SPOTLIGHT (যৌথ শীর্ষ নেতৃত্ব) ================= */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#005a3e]" />
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-serif-bn">
                দলের শীর্ষ যৌথ নেতৃত্ব (Presidium)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
              কেন্দ্রীয় নীতিনির্ধারণী শীর্ষ পরিষদ
            </span>
          </div>

          <div className={`grid gap-6 ${topLeaders.length === 1 ? 'max-w-2xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
            {topLeaders.map((leader) => {
              if (!leader) return null;
              const isPresident = leader.position.includes('সভাপতি') && !leader.position.includes('সহ-সভাপতি');
              const isSecretaryGeneral = leader.position.includes('মহাসচিব');
              const badgeLabel = isPresident ? 'দলীয় সভাপতি' : isSecretaryGeneral ? 'মহাসচিব' : leader.position;
              const quote = leaderQuotes[leader.id] || '“স্বচ্ছ রাজনীতি, জবাবদিহিতা ও তৃণমূলের সক্রিয় অংশগ্রহণই নবজাগরণ পার্টির মূল চালিকাশক্তি।”';

              return (
                <div
                  key={leader.id}
                  className="bg-white rounded-2xl border-2 border-emerald-900/15 hover:border-emerald-600/60 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden flex flex-col sm:flex-row group relative"
                >
                  {/* Top Badge Stamp */}
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-900 text-emerald-100 text-[10px] font-bold tracking-wide shadow-xs flex items-center gap-1 border border-emerald-700/50">
                      <ShieldCheck className="w-3 h-3 text-[#f42a41]" />
                      <span>{badgeLabel}</span>
                    </span>
                  </div>

                  {/* Leader Photo Area */}
                  <div className="relative sm:w-5/12 aspect-[4/3] sm:aspect-auto overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={getLeaderPhoto(leader)}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Leader Profile Content */}
                  <div className="sm:w-7/12 p-4 sm:p-6 flex flex-col justify-between">
                    <div>
                      {/* Name & English Transliteration */}
                      <div className="mb-2">
                        <span className="inline-block text-[11px] font-bold text-[#005a3e] uppercase tracking-wide">
                          {leader.position} • {leader.positionEn}
                        </span>
                        <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 font-serif-bn mt-0.5 group-hover:text-[#005a3e] transition-colors leading-tight">
                          {leader.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {leader.nameEn}
                        </p>
                      </div>

                      {/* Education & Department Badge */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
                        {leader.education && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/70">
                            <GraduationCap className="w-3 h-3 text-[#005a3e]" />
                            <span>{leader.education}</span>
                          </span>
                        )}
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          {leader.department || 'কেন্দ্রীয় নির্বাহী পরিষদ'}
                        </span>
                      </div>

                      {/* Vision Quote Box */}
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 text-[11px] text-slate-700 italic leading-relaxed font-serif-bn mb-3">
                        {quote}
                      </div>

                      {/* Bio Excerpt */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {leader.bio}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">
                        সাংগঠনিক ক্রম #{leader.order}
                      </span>

                      <button
                        onClick={() => setSelectedLeader(leader)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#005a3e] hover:text-[#004731] hover:underline"
                      >
                        <span>জীবনবৃত্তান্ত ও কর্মপরিকল্পনা</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= TIER 2: EXECUTIVE SECRETARIAT GRID (সম্পাদকমণ্ডলী) ================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-serif-bn">
                কেন্দ্রীয় সচিবালয় ও বিভাগীয় সম্পাদকমণ্ডলী (Executive Secretariat)
              </h3>
            </div>
            
            <Link
              to="/leadership"
              className="text-xs font-bold text-[#005a3e] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>সকল সম্পাদকের প্রোফাইল</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {secretariatLeaders.slice(0, 4).map((leader) => (
              <div
                key={leader.id}
                className="bg-white rounded-xl border border-slate-200/90 hover:border-emerald-500/60 p-4 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Portrait & Position Badge */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-3 shadow-2xs">
                    <img
                      src={getLeaderPhoto(leader)}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[10px] font-bold text-white bg-[#005a3e]/90 px-2 py-0.5 rounded backdrop-blur-xs">
                        {leader.position}
                      </span>
                    </div>
                  </div>

                  {/* Leader Info */}
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#005a3e] transition-colors leading-snug font-serif-bn">
                    {leader.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {leader.nameEn}
                  </p>

                  {/* Education / Dept pill */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {leader.education && (
                      <span className="text-[9px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                        {leader.education}
                      </span>
                    )}
                    <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {leader.department || 'সম্পাদকীয় সেল'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-2 leading-relaxed font-normal">
                    {leader.bio}
                  </p>
                </div>

                {/* Card Action */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">
                    দায়িত্বপ্রাপ্ত সম্পাদক
                  </span>
                  <button
                    onClick={() => setSelectedLeader(leader)}
                    className="text-[11px] font-bold text-[#005a3e] hover:text-[#004731] hover:underline flex items-center gap-0.5"
                  >
                    <span>প্রোফাইল</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ================= TIER 3: COUNCIL STATS & CONSTITUTION STRIP ================= */}
        <div className="mt-8 bg-gradient-to-r from-[#003828] via-[#004d38] to-[#003828] rounded-2xl p-5 sm:p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-5 border border-emerald-800">
          
          {/* Left Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full md:w-auto text-center md:text-left">
            <div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-serif-bn">৭১ জন</div>
              <div className="text-[11px] text-emerald-200 mt-0.5">মোট নির্বাহী সদস্য</div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-serif-bn">৮টি</div>
              <div className="text-[11px] text-emerald-200 mt-0.5">বিভাগীয় সাংগঠনিক টিম</div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-serif-bn">১০০%</div>
              <div className="text-[11px] text-emerald-200 mt-0.5">স্বচ্ছ ও নিরীক্ষিত অডিট</div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-serif-bn">৩ মাস পর</div>
              <div className="text-[11px] text-emerald-200 mt-0.5">নিয়মিত জাতীয় কাউন্সিল</div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full md:w-auto flex-shrink-0">
            <Link
              to="/documents"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>গঠনতন্ত্র ও গেজেট ডাউনলোড</span>
            </Link>

            <Link
              to="/leadership"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-600/50 transition-colors"
            >
              <span>বিভাগীয় তালিকা দেখুন</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

      {/* ================= INTERACTIVE DETAILED LEADER MODAL ================= */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl max-w-xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors z-10"
                aria-label="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Leader Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-5 border-b border-slate-100">
                <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm border border-slate-200">
                  <img
                    src={getLeaderPhoto(selectedLeader)}
                    alt={selectedLeader.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center sm:text-left flex-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#005a3e] text-[11px] font-bold uppercase tracking-wider inline-block mb-1">
                    {selectedLeader.position}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 font-serif-bn leading-tight">
                    {selectedLeader.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedLeader.nameEn} • {selectedLeader.positionEn}
                  </p>

                  <div className="mt-2.5 flex flex-wrap justify-center sm:justify-start gap-1.5 text-xs text-slate-600">
                    {selectedLeader.education && (
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-[#005a3e]" />
                        <span>{selectedLeader.education}</span>
                      </span>
                    )}
                    <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-semibold">
                      {selectedLeader.department || 'কেন্দ্রীয় কার্যনির্বাহী পরিষদ'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Leader Bio */}
              <div className="py-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  সাংগঠনিক ভূমিকা ও পরিচিতি:
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 font-normal">
                  {selectedLeader.bio}
                </p>
              </div>

              {/* Responsibilities list */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  দায়িত্বপ্রাপ্ত কার্যাবলী:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>দলীয় গঠনতন্ত্র অনুযায়ী জাতীয় নীতিনির্ধারণী ফোরামে ভোটাধিকার প্রয়োগ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>বিভাগীয় সাংগঠনিক শৃঙ্খলা ও তৃণমূল নেতাকর্মীদের সাথে নিয়মিত সংযোগ রক্ষা</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>জাতীয় নির্বাচনে প্রার্থী বাছাই ও তৃণমূল গণশুনানি পরিচালনা</span>
                  </li>
                </ul>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">
                  বাংলাদেশ নবজাগরণ পার্টি (BRP)
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedLeader(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    বন্ধ করুন
                  </button>
                  <Link
                    to="/leadership"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#005a3e] hover:bg-[#004731] text-white transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>পূর্ণাঙ্গ পরিষদ পেজ</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
