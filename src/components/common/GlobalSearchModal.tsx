import React, { useState, useEffect } from 'react';
import { Search, X, FileText, Newspaper, Calendar, Users, HelpCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getNews, getDocuments, getEvents, getLeaders, getFAQs } from '../../firebase/services';
import { NewsArticle, OrgDocument, OrgEvent, Leader, FAQItem } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultItem {
  id: string;
  type: 'news' | 'document' | 'event' | 'leader' | 'faq';
  title: string;
  subtitle: string;
  url: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQueryText('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!queryText.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const q = queryText.toLowerCase().trim();

      try {
        const [newsList, docList, eventList, leaderList, faqList] = await Promise.all([
          getNews(),
          getDocuments(),
          getEvents(),
          getLeaders(),
          getFAQs()
        ]);

        const aggregated: SearchResultItem[] = [];

        // News matches
        newsList.forEach((item: NewsArticle) => {
          if (item.title.toLowerCase().includes(q) || item.excerpt.toLowerCase().includes(q)) {
            aggregated.push({
              id: item.id,
              type: 'news',
              title: item.title,
              subtitle: `সংবাদ • ${item.category} • ${item.publishedAt}`,
              url: `/news/${item.slug}`
            });
          }
        });

        // Documents matches
        docList.forEach((item: OrgDocument) => {
          if (item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)) {
            aggregated.push({
              id: item.id,
              type: 'document',
              title: item.title,
              subtitle: `নথি • ${item.category} • সাইজ: ${item.fileSize}`,
              url: `/documents`
            });
          }
        });

        // Events matches
        eventList.forEach((item: OrgEvent) => {
          if (item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.location.toLowerCase().includes(q)) {
            aggregated.push({
              id: item.id,
              type: 'event',
              title: item.title,
              subtitle: `ইভেন্ট • ${item.date} • স্থান: ${item.location}`,
              url: `/events`
            });
          }
        });

        // Leaders matches
        leaderList.forEach((item: Leader) => {
          if (item.name.toLowerCase().includes(q) || item.nameEn.toLowerCase().includes(q) || item.position.toLowerCase().includes(q) || item.bio.toLowerCase().includes(q)) {
            aggregated.push({
              id: item.id,
              type: 'leader',
              title: `${item.name} (${item.nameEn})`,
              subtitle: `নেতৃত্ব • পদবী: ${item.position}`,
              url: `/leadership`
            });
          }
        });

        // FAQs matches
        faqList.forEach((item: FAQItem) => {
          if (item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)) {
            aggregated.push({
              id: item.id,
              type: 'faq',
              title: item.question,
              subtitle: `প্রশ্নোত্তর • ${item.category}`,
              url: `/faq`
            });
          }
        });

        setResults(aggregated.slice(0, 15));
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [queryText]);

  if (!isOpen) return null;

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  const getIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'news': return <Newspaper className="w-4 h-4 text-emerald-600" />;
      case 'document': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'event': return <Calendar className="w-4 h-4 text-amber-600" />;
      case 'leader': return <Users className="w-4 h-4 text-purple-600" />;
      case 'faq': return <HelpCircle className="w-4 h-4 text-rose-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-3 sm:px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50">
          <Search className="w-5 h-5 text-emerald-700 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="সংবাদ, নীতিপত্র, নেতৃত্ব, ইভেন্ট বা সাধারণ তথ্যে খুঁজুন..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm md:text-base outline-none focus:ring-0"
            autoFocus
          />
          {queryText && (
            <button
              onClick={() => setQueryText('')}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <span className="text-xs font-medium px-1.5 py-0.5 border border-slate-300 rounded bg-white">ESC</span>
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3">
          {isLoading && (
            <div className="py-8 text-center text-slate-500 text-sm">
              তথ্য খোঁজা হচ্ছে...
            </div>
          )}

          {!isLoading && queryText && results.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-slate-600 font-medium">কোনো ফলাফল পাওয়া যায়নি</p>
              <p className="text-xs text-slate-400 mt-1">অন্য কোনো শব্দ দিয়ে পুনরায় চেষ্টা করুন</p>
            </div>
          )}

          {!isLoading && !queryText && (
            <div className="p-4 text-xs text-slate-400">
              <p className="font-semibold text-slate-600 mb-2">জনপ্রিয় অনুসন্ধানসমূহ:</p>
              <div className="flex flex-wrap gap-2">
                {['১০ দফা কর্মসূচি', 'গঠনতন্ত্র', 'শিক্ষা নীতি', 'দুর্নীতি প্রতিরোধ', 'জলবায়ু', 'মাহফুজুর রহমান'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQueryText(tag)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 rounded-md transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                প্রাপ্ত ফলাফল ({results.length})
              </div>
              {results.map((res) => (
                <button
                  key={`${res.type}-${res.id}`}
                  onClick={() => handleSelect(res.url)}
                  className="w-full text-left p-3 rounded-lg hover:bg-emerald-50/70 border border-transparent hover:border-emerald-100 transition-all flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-md bg-slate-100 group-hover:bg-white transition-colors mt-0.5">
                    {getIcon(res.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800 group-hover:text-emerald-800 truncate">
                      {res.title}
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">
                      {res.subtitle}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all mt-1 opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-right text-xs text-slate-400">
          কীবোর্ডের <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">Esc</kbd> চেপে বন্ধ করুন
        </div>
      </div>
    </div>
  );
};
