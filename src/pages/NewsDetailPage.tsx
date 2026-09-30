import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { getNewsBySlug, getNews } from '../firebase/services';
import { NewsArticle } from '../types';
import { formatBengaliDate } from '../utils/formatters';
import { Calendar, User, ArrowLeft, Share2, Tag, ArrowRight, Printer } from 'lucide-react';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [related, setRelated] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      setLoading(true);
      try {
        const item = await getNewsBySlug(slug);
        setArticle(item);

        const allNews = await getNews();
        setRelated(allNews.filter(n => n.slug !== slug).slice(0, 3));
      } catch (err) {
        console.error('Error loading article:', err);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        সংবাদ প্রতিবেদন লোড হচ্ছে...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">প্রতিবেদনটি পাওয়া যায়নি</h2>
        <p className="text-sm text-slate-500 mb-6">অনুরোধকৃত সংবাদটি হয়তো অপসারিত হয়েছে বা লিংকটি সঠিক নয়।</p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#006a4e] text-white text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল সংবাদ তালিকায় ফিরুন</span>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[
          { label: 'সংবাদ', path: '/news' },
          { label: article.category, path: '/news' },
          { label: article.title }
        ]} />

        {/* Back button & Print */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#006a4e] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সংবাদ আর্কাইভে ফিরুন</span>
          </Link>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white px-3 py-1.5 rounded-md border border-slate-200"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>মুদ্রণ করুন</span>
          </button>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm p-6 sm:p-10 mb-12">
          
          {/* Category & Date Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#006a4e] font-semibold">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {formatBengaliDate(article.publishedAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-600">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              {article.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-serif-bn leading-tight mb-6">
            {article.title}
          </h1>

          {/* Excerpt Lead */}
          <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[#006a4e] text-slate-700 text-base font-medium leading-relaxed mb-8">
            {article.excerpt}
          </div>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="rounded-xl overflow-hidden mb-8 aspect-[16/9] bg-slate-100 border border-slate-200">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Main Body Content */}
          <div className="prose prose-slate max-w-none text-slate-800 text-base leading-relaxed space-y-4">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> সম্পর্কিত বিষয়:
              </span>
              {article.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          )}

        </article>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-slate-900 font-serif-bn mb-6">
              আরও সম্পর্কিত সংবাদ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 p-4 flex flex-col justify-between group">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#006a4e] transition-colors mt-2 line-clamp-2">
                      <Link to={`/news/${item.slug}`}>{item.title}</Link>
                    </h4>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>{formatBengaliDate(item.publishedAt)}</span>
                    <Link to={`/news/${item.slug}`} className="text-[#006a4e] hover:underline flex items-center gap-1 font-semibold">
                      <span>পড়ুন</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
