import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { getDocuments } from '../firebase/services';
import { OrgDocument } from '../types';
import { INITIAL_DOCUMENTS } from '../firebase/seedData';
import { FileText, Download, Search, Filter, BookOpen, FileCheck, CheckCircle2, Shield } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<OrgDocument[]>(INITIAL_DOCUMENTS);
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadDocs() {
      try {
        const data = await getDocuments();
        if (data && data.length > 0) {
          setDocuments(data);
        }
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
    }
    loadDocs();
  }, []);

  const categories = [
    'all',
    'গঠনতন্ত্র',
    'নীতিপত্র',
    '১০ দফা কর্মসূচি',
    'প্রকাশনা',
    'অফিসিয়াল বিবৃতি'
  ];

  const filtered = documents.filter(doc => {
    const matchesCat = selectedCat === 'all' || doc.category === selectedCat;
    const matchesQuery = !searchTerm || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesQuery && doc.published !== false;
  });

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'ডকুমেন্টস ও প্রকাশনা' }]} />

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#003828] to-[#006a4e] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4">
              উন্মুক্ত নথিপত্র ভাণ্ডার
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bn leading-tight">
              গঠনতন্ত্র, নীতিপত্র ও প্রাতিষ্ঠানিক প্রকাশনা
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              দলীয় গঠনতন্ত্র, ১০ দফা উন্নয়ন রূপরেখা, বার্ষিক আর্থিক অডিট ও সকল গবেষণা নথির উন্মুক্ত ডাউনলোড কেন্দ্র
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#f42a41] opacity-20 blur-xl pointer-events-none" />
        </div>

        {/* Filter and Search */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> ক্যাটাগরি:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCat === cat
                    ? 'bg-[#006a4e] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'সকল নথি' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="নথির নাম বা বিষয় দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>

        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                    {doc.category}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {doc.fileSize}
                  </span>
                </div>

                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#006a4e] mb-4">
                  <FileText className="w-6 h-6" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#006a4e] transition-colors leading-snug line-clamp-2">
                  {doc.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  <span>প্রকাশ: {doc.publishedAt}</span>
                  {doc.downloadCount && (
                    <span className="ml-2">({doc.downloadCount} বার ডাউনলোড)</span>
                  )}
                </div>

                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF ডাউনলোড</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 mb-16">
            <p className="text-slate-600 font-medium">কোনো নথি পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400 mt-1">অন্য কোনো ফিল্টার বা অনুসন্ধান শব্দ ব্যবহার করুন</p>
          </div>
        )}

      </div>
    </div>
  );
};
