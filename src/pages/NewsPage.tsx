import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { getNews } from '../firebase/services';
import { NewsArticle } from '../types';
import { INITIAL_NEWS } from '../firebase/seedData';
import { formatBengaliDate } from '../utils/formatters';
import { Calendar, Search, ArrowRight, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await getNews();
        if (data && data.length > 0) {
          setArticles(data);
        }
      } catch (err) {
        console.error('Error loading news:', err);
      }
    }
    fetchNews();
  }, []);

  const categories = [
    'all',
    'সংবাদ বিজ্ঞপ্তি',
    'সাংগঠনিক',
    'নীতি ও উন্নয়ন',
    'প্রেস রিলিজ',
    'বক্তব্য ও সাক্ষাৎকার'
  ];

  const filtered = articles.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesQuery && item.published !== false;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'সংবাদ ও প্রেস রিলিজ' }]} />

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#003828] to-[#006a4e] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4">
              তথ্য ও মিডিয়া সেল
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bn leading-tight">
              সংবাদ ও প্রেস বিজ্ঞপ্তি
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              বাংলাদেশ নবজাগরণ পার্টির নীতিনির্ধারণী বিবৃতি, সাংগঠনিক অগ্রগতি ও সেমিনারের প্রাতিষ্ঠানিক প্রতিবেদন
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#f42a41] opacity-20 blur-xl pointer-events-none" />
        </div>

        {/* Filter and Search */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> ক্যাটাগরি:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#006a4e] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'সকল সংবাদ' : cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="সংবাদে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>

        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginated.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#006a4e] text-white shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {formatBengaliDate(item.publishedAt)}
                    </span>
                    <span>•</span>
                    <span className="text-slate-600 font-medium truncate">
                      {item.author}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#006a4e] transition-colors leading-snug line-clamp-2">
                    <Link to={`/news/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006a4e] hover:text-emerald-800 transition-colors group/btn"
                  >
                    <span>সম্পূর্ণ প্রতিবেদন</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[11px] text-slate-400">
                    বিআরপি তথ্য সেল
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {paginated.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 mb-12">
            <p className="text-slate-600 font-medium">কোনো সংবাদ প্রতিবেদন পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400 mt-1">অন্য কোনো ক্যাটাগরি বা শব্দ ব্যবহার করে অনুসন্ধান করুন</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-16">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                  currentPage === i + 1
                    ? 'bg-[#006a4e] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
