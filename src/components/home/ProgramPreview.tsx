import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, GraduationCap, Briefcase, ShieldCheck, 
  Scale, HeartPulse, Sprout, TrendingUp, Leaf, 
  Building2, Cpu, X, CheckCircle2, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PolicyProgram } from '../../types';
import { toBengaliNumber } from '../../utils/formatters';

interface ProgramPreviewProps {
  programs: PolicyProgram[];
}

export const ProgramPreview: React.FC<ProgramPreviewProps> = ({ programs }) => {
  const [activeProg, setActiveProg] = useState<PolicyProgram | null>(null);

  // Icons matching the 10 programs
  const programIcons = [
    GraduationCap, // 1. শিক্ষা
    Briefcase,     // 2. কর্মসংস্থান
    ShieldCheck,   // 3. দুর্নীতি প্রতিরোধ
    Scale,         // 4. আইনের শাসন
    HeartPulse,    // 5. স্বাস্থ্যসেবা
    Sprout,        // 6. কৃষি ও খাদ্য
    TrendingUp,    // 7. অর্থনীতি
    Leaf,          // 8. পরিবেশ ও জলবায়ু
    Building2,     // 9. স্থানীয় সরকার
    Cpu            // 10. প্রযুক্তি ও ডিজিটাল
  ];

  const displayPrograms = programs.slice(0, 10);

  return (
    <section className="py-8 md:py-10 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Modern Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
              জাতীয় রূপরেখা
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif-bn tracking-tight">
              ১০ দফা কর্মসূচি
            </h2>
            <span className="hidden md:inline-block text-xs text-slate-500 font-normal">
              • টেকসই উন্নয়ন ও রাষ্ট্র সংস্কারের রূপরেখা
            </span>
          </div>

          <Link
            to="/programs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005a3e] hover:text-emerald-800 transition-colors bg-white px-3.5 py-1.5 rounded-lg border border-slate-200/90 shadow-2xs hover:shadow-xs self-start sm:self-auto"
          >
            <span>পূর্ণাঙ্গ ১০ দফা বিবরণী</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ================= COMPACT 5-COLUMN x 2-ROW GRID ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {displayPrograms.map((prog, idx) => {
            const Icon = programIcons[idx] || GraduationCap;
            const bengaliNum = toBengaliNumber(prog.number || idx + 1);

            return (
              <motion.div
                key={prog.id || idx}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveProg(prog)}
                className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/80 hover:border-emerald-500/50 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group h-full relative overflow-hidden"
              >
                {/* Top: Bengali Number Badge & Icon */}
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#005a3e] font-bold text-xs flex items-center justify-center border border-emerald-100 group-hover:bg-[#005a3e] group-hover:text-white transition-colors">
                    {bengaliNum}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-[#005a3e] group-hover:bg-emerald-50 transition-colors">
                    <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#005a3e] transition-colors line-clamp-2 leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-1 mt-1 font-normal">
                    {prog.summary || 'বিস্তারিত কর্মপরিকল্পনা ও কৌশল'}
                  </p>
                </div>

                {/* Bottom Micro Action */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-[#005a3e] transition-colors">
                  <span className="font-medium">বিস্তারিত দেখুন</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compact Footer Note */}
        <div className="mt-3.5 py-2 px-3.5 rounded-lg bg-emerald-950/90 text-white flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f42a41] animate-pulse" />
            <span className="text-[11px] sm:text-xs text-emerald-100 font-medium">
              ১০ দফা কর্মসূচি নাগরিক মতামতের ভিত্তিতে নিয়মিত পরিমার্জিত হচ্ছে।
            </span>
          </div>
          <Link
            to="/documents"
            className="text-[11px] font-bold text-emerald-200 hover:text-white underline underline-offset-2 flex-shrink-0"
          >
            পলিসি পেপার ডাউনলোড করুন →
          </Link>
        </div>

      </div>

      {/* ================= QUICK PREVIEW POPUP MODAL ================= */}
      <AnimatePresence>
        {activeProg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProg(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                aria-label="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Number and Header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 rounded-xl bg-[#005a3e] text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                  {toBengaliNumber(activeProg.number)}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif-bn leading-tight">
                    {activeProg.title}
                  </h3>
                  {activeProg.titleEn && (
                    <span className="text-xs text-slate-500 font-medium block">
                      {activeProg.titleEn}
                    </span>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 my-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeProg.summary}
              </div>

              {/* Key Objectives */}
              {activeProg.keyObjectives && activeProg.keyObjectives.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    মূল লক্ষ্য ও বাস্তবায়ন পদক্ষেপ:
                  </h4>
                  <ul className="space-y-2">
                    {activeProg.keyObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setActiveProg(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  বন্ধ করুন
                </button>
                <Link
                  to="/programs"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-[#005a3e] hover:bg-[#004731] text-white transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>পূর্ণাঙ্গ বিবরণী দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
