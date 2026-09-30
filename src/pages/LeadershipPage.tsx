import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { getLeaders, getLeadersSync } from '../firebase/services';
import { Leader } from '../types';
import { Mail, Briefcase, GraduationCap, Award, Search } from 'lucide-react';
import mahfuzurImg from '../assets/images/mahfuzur_rahman_sg_1790624790511.jpg';

export const LeadershipPage: React.FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>(getLeadersSync);
  const [filterDept, setFilterDept] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLeaders() {
      try {
        const data = await getLeaders();
        if (data) {
          setLeaders(data);
        }
      } catch (err) {
        console.error('Error fetching leaders:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaders();
  }, []);

  const departments = ['all', ...Array.from(new Set(leaders.map(l => l.department).filter(Boolean)))];

  const filteredLeaders = leaders.filter(l => {
    const matchesDept = filterDept === 'all' || l.department === filterDept;
    const matchesSearch = !searchTerm || 
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch && l.published !== false;
  });

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'নেতৃত্ব' }]} />

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#003828] to-[#006a4e] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4">
              সাংগঠনিক নেতৃত্ব
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bn leading-tight">
              কেন্দ্রীয় কার্যনির্বাহী পরিষদ
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              দলীয় গঠনতন্ত্র অনুযায়ী গণতান্ত্রিকভাবে নির্বাচিত ও মেধাভিত্তিক নীতিনির্ধারণে দায়িত্বপ্রাপ্ত নেতৃবৃন্দের পরিচয়
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#f42a41] opacity-20 blur-xl pointer-events-none" />
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Department Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <button
              onClick={() => setFilterDept('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterDept === 'all'
                  ? 'bg-[#006a4e] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              সকল বিভাগ
            </button>
            {departments.filter(d => d !== 'all').map((dept) => (
              <button
                key={dept}
                onClick={() => setFilterDept(dept as string)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  filterDept === dept
                    ? 'bg-[#006a4e] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="নাম বা পদবী দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>

        </div>

        {/* Leadership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLeaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col group"
            >
              {/* Photo Area */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={leader.photoUrl || mahfuzurImg}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                  <div>
                    <span className="px-2.5 py-1 rounded bg-[#006a4e] text-white text-xs font-semibold shadow-sm inline-block mb-1">
                      {leader.position}
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight font-serif-bn">
                      {leader.name}
                    </h3>
                    <div className="text-xs text-emerald-200 font-medium">
                      {leader.nameEn}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {leader.department || 'কেন্দ্রীয় পরিষদ'}
                    </span>
                    <span>{leader.positionEn}</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {leader.bio}
                  </p>

                  {leader.education && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <GraduationCap className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      <span>শিক্ষাগত পটভূমি: {leader.education}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>সাংগঠনিক ক্রম #{leader.order}</span>
                  <span className="text-emerald-700 font-medium">দায়িত্বপ্রাপ্ত সদস্য</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredLeaders.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-600 font-medium">কোনো নেতার তথ্য পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400 mt-1">অন্য কোনো ফিল্টার বা অনুসন্ধান শব্দ ব্যবহার করুন</p>
          </div>
        )}

      </div>
    </div>
  );
};
