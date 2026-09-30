import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { NewsArticle } from '../../types';
import { formatBengaliDate, truncateText } from '../../utils/formatters';

interface NewsPreviewProps {
  news: NewsArticle[];
}

export const NewsPreview: React.FC<NewsPreviewProps> = ({ news }) => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
              সংবাদ ও তথ্য বিবরণী
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-serif-bn">
              সাম্প্রতিক সংবাদ ও প্রেস রিলিজ
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              দলের প্রাতিষ্ঠানিক কার্যক্রম, নীতিনির্ধারণী বিবৃতি ও সেমিনারের হালনাগাদ তথ্য
            </p>
          </div>

          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#006a4e] hover:text-emerald-800 transition-colors"
          >
            <span>সকল সংবাদ দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* News Grid (4-6 articles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.slice(0, 6).map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col group"
            >
              {/* Cover Image */}
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

              {/* Card Body */}
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
                    <span>বিস্তারিত পড়ুন</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[11px] text-slate-400">
                    পড়ার সময়: ৩ মিনিট
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
