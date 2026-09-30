import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { getFAQs } from '../firebase/services';
import { FAQItem } from '../types';
import { INITIAL_FAQS } from '../firebase/seedData';
import { ChevronDown, Search, HelpCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-1': true });

  useEffect(() => {
    async function loadFaqs() {
      try {
        const data = await getFAQs();
        if (data && data.length > 0) {
          setFaqs(data);
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      }
    }
    loadFaqs();
  }, []);

  const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category).filter(Boolean)))];

  const filtered = faqs.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = !searchTerm ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesQuery && item.published !== false;
  });

  const toggleItem = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'সচরাচর জিজ্ঞাসা (FAQ)' }]} />

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#003828] to-[#006a4e] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4">
              প্রশ্নোত্তর ও তথ্য ব্যাংক
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bn leading-tight">
              সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              দলীয় আদর্শ, নীতিনির্ধারণ, সদস্যপদ এবং অর্থনৈতিক স্বচ্ছতা সম্পর্কিত নাগরিকদের সাধারণ প্রশ্নের উত্তর
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#f42a41] opacity-20 blur-xl pointer-events-none" />
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#006a4e] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'সকল প্রশ্নোত্তর' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="প্রশ্নে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4 mb-16">
          {filtered.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg font-serif-bn">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-full transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180 bg-emerald-50 text-[#006a4e]' : 'text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{item.answer}</p>
                    {item.category && (
                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                        <span>ক্যাটাগরি: <strong className="text-slate-700">{item.category}</strong></span>
                        <Link to="/contact" className="text-[#006a4e] hover:underline font-semibold">
                          আরও প্রশ্ন থাকলে যোগাযোগ করুন →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Didn't find question banner */}
        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200 text-center max-w-2xl mx-auto">
          <MessageSquare className="w-8 h-8 text-[#006a4e] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 font-serif-bn mb-1">
            আপনার কোনো প্রশ্নের উত্তর খুঁজে পাননি?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-5">
            আমাদের যোগাযোগ ফরম বা হেল্পলাইনের মাধ্যমে সরাসরি প্রশ্ন পাঠাতে পারেন।
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#006a4e] text-white text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
          >
            যোগাযোগ পেজে যান
          </Link>
        </div>

      </div>
    </div>
  );
};
