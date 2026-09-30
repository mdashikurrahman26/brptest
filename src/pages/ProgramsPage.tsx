import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { getPrograms } from '../firebase/services';
import { PolicyProgram } from '../types';
import { INITIAL_PROGRAMS } from '../firebase/seedData';
import { toBengaliNumber } from '../utils/formatters';
import { 
  CheckCircle2, Download, BookOpen, Share2, 
  GraduationCap, Briefcase, ShieldCheck, Scale, 
  HeartPulse, Sprout, TrendingUp, Leaf, Building2, Cpu 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<PolicyProgram[]>(INITIAL_PROGRAMS);
  const [selectedProgram, setSelectedProgram] = useState<PolicyProgram>(INITIAL_PROGRAMS[0]);

  useEffect(() => {
    async function loadPrograms() {
      try {
        const data = await getPrograms();
        if (data && data.length > 0) {
          setPrograms(data);
          setSelectedProgram(data[0]);
        }
      } catch (err) {
        console.error('Error fetching programs:', err);
      }
    }
    loadPrograms();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return GraduationCap;
      case 'Briefcase': return Briefcase;
      case 'ShieldCheck': return ShieldCheck;
      case 'Scale': return Scale;
      case 'HeartPulse': return HeartPulse;
      case 'Sprout': return Sprout;
      case 'TrendingUp': return TrendingUp;
      case 'Leaf': return Leaf;
      case 'Building2': return Building2;
      case 'Cpu': return Cpu;
      default: return BookOpen;
    }
  };

  const SelectedIcon = getIcon(selectedProgram.icon);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: '১০ দফা কর্মসূচি' }]} />

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#003828] to-[#006a4e] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4">
              জাতীয় উন্নয়ন রূপরেখা
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bn leading-tight">
              আমাদের ১০ দফা কর্মসূচি
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              দেশের সার্বিক সংস্কার, সামাজিক সুরক্ষা ও টেকসই সমৃদ্ধি নিশ্চিত করতে বাংলাদেশ নবজাগরণ পার্টির সমন্বিত কর্মপরিকল্পনা
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#f42a41] opacity-20 blur-xl pointer-events-none" />
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: 10 Points List (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
              কর্মসূচি তালিকা (১-১০)
            </div>

            {programs.map((prog) => {
              const IconComp = getIcon(prog.icon);
              const isSelected = selectedProgram.id === prog.id;

              return (
                <button
                  key={prog.id}
                  onClick={() => setSelectedProgram(prog)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-white border-[#006a4e] shadow-md ring-1 ring-[#006a4e]'
                      : 'bg-white/70 hover:bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#006a4e] text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {toBengaliNumber(prog.number)}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-bold truncate ${
                      isSelected ? 'text-[#006a4e]' : 'text-slate-800'
                    }`}>
                      {prog.title}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {prog.titleEn}
                    </div>
                  </div>

                  <IconComp className={`w-4 h-4 flex-shrink-0 ${
                    isSelected ? 'text-[#006a4e]' : 'text-slate-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Program Detail View (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm sticky top-28">
              
              {/* Point Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#006a4e] border border-emerald-200 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <SelectedIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    দফা #{toBengaliNumber(selectedProgram.number)}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 font-serif-bn mt-0.5">
                    {selectedProgram.title}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    {selectedProgram.titleEn}
                  </p>
                </div>
              </div>

              {/* Point Summary */}
              <div className="py-6 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  মূল বক্তব্য ও প্রতিপাদ্য
                </h4>
                <p className="text-base font-semibold text-slate-800 leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  {selectedProgram.summary}
                </p>
              </div>

              {/* Point Details */}
              <div className="py-6 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  কর্মপরিকল্পনা ও বিশ্লেষণ
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedProgram.details}
                </p>
              </div>

              {/* Key Objectives */}
              {selectedProgram.keyObjectives && selectedProgram.keyObjectives.length > 0 && (
                <div className="pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    বাস্তবায়নের সুনির্দিষ্ট লক্ষ্যমাত্রা
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProgram.keyObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/documents"
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-[#006a4e] text-white hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>সম্পূর্ণ পলিসি পেপার ডাউনলোড</span>
                </Link>

                <Link
                  to="/contact"
                  className="text-xs font-semibold text-[#006a4e] hover:underline"
                >
                  আপনার মতামত পাঠান →
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
