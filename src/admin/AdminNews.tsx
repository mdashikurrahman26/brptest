import React, { useState, useEffect } from 'react';
import { getNews, saveNewsArticle, deleteNewsArticle } from '../firebase/services';
import { NewsArticle } from '../types';
import { createSlug } from '../utils/formatters';
import { Plus, Edit2, Trash2, Check, X, Search, Newspaper, Eye } from 'lucide-react';

export const AdminNews: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const emptyForm: NewsArticle = {
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    category: 'সংবাদ বিজ্ঞপ্তি',
    author: 'কেন্দ্রীয় প্রচার ও প্রকাশনা বিভাগ',
    published: true,
    publishedAt: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  };

  const [formData, setFormData] = useState<NewsArticle>(emptyForm);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await getNews();
      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreateNew = () => {
    setFormData({
      ...emptyForm,
      id: `news-${Date.now()}`
    });
    setIsCreating(true);
    setEditingArticle(null);
  };

  const handleEdit = (item: NewsArticle) => {
    setFormData(item);
    setEditingArticle(item);
    setIsCreating(false);
  };

  const [articleToDelete, setArticleToDelete] = useState<NewsArticle | null>(null);

  const confirmDelete = async () => {
    if (!articleToDelete) return;
    const id = articleToDelete.id;
    try {
      await deleteNewsArticle(id);
      setArticles(prev => prev.filter(a => a.id !== id));
      setArticleToDelete(null);
      setFeedback('সংবাদ সফলভাবে মুছে ফেলা হয়েছে।');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
      setFeedback('সংবাদ মুছে ফেলতে সমস্যা হয়েছে।');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const articleToSave = {
        ...formData,
        slug: formData.slug || createSlug(formData.title),
        updatedAt: new Date().toISOString()
      };
      await saveNewsArticle(articleToSave);
      await fetchArticles();
      setIsCreating(false);
      setEditingArticle(null);
      setFeedback('সংবাদ সফলভাবে সংরক্ষিত হয়েছে!');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif-bn">
            সংবাদ ও প্রেস বিজ্ঞপ্তি ব্যবস্থাপনা
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            নতুন প্রতিবেদন তৈরি, সম্পাদনা, প্রকাশ ও মুছে ফেলার নিয়ন্ত্রণ
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন সংবাদ তৈরি করুন</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold animate-fadeIn">
          {feedback}
        </div>
      )}

      {/* Editor Modal/Form */}
      {(isCreating || editingArticle) && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900 font-serif-bn">
              {isCreating ? 'নতুন সংবাদ তৈরি করুন' : 'সংবাদ সম্পাদনা করুন'}
            </h3>
            <button
              onClick={() => { setIsCreating(false); setEditingArticle(null); }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({
                      ...formData,
                      title,
                      slug: isCreating ? createSlug(title) : formData.slug
                    });
                  }}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ইউআরএল স্ল্যাগ (Slug)</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ক্যাটাগরি</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                >
                  <option value="সংবাদ বিজ্ঞপ্তি">সংবাদ বিজ্ঞপ্তি</option>
                  <option value="সাংগঠনিক">সাংগঠনিক</option>
                  <option value="নীতি ও উন্নয়ন">নীতি ও উন্নয়ন</option>
                  <option value="প্রেস রিলিজ">প্রেস রিলিজ</option>
                  <option value="বক্তব্য ও সাক্ষাৎকার">বক্তব্য ও সাক্ষাৎকার</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">লেখক / বিভাগ</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">প্রকাশের তারিখ</label>
                <input
                  type="text"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">কভার ছবির ইউআরএল</label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">সংক্ষিপ্ত সারসংক্ষেপ (Excerpt) *</label>
              <textarea
                rows={2}
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">মূল বিষয়বস্তু (Full Content) *</label>
              <textarea
                rows={6}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="pubCheck"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded border-slate-300 text-emerald-600"
              />
              <label htmlFor="pubCheck" className="text-xs font-semibold text-slate-700">
                ওয়েবসাইটে তাৎক্ষণিক প্রকাশ করুন (Publish)
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingArticle(null); }}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-semibold"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        
        {/* Table Search */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="সংবাদে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 outline-none"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium">
            মোট প্রতিবেদন: {articles.length} টি
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 uppercase text-[11px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">শিরোনাম</th>
                <th className="py-3 px-4">ক্যাটাগরি</th>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">স্থিতি</th>
                <th className="py-3 px-4 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium text-[11px]">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {item.publishedAt}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      item.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.published ? 'প্রকাশিত' : 'ড্রাফট'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 rounded hover:bg-slate-100"
                      title="সম্পাদনা"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setArticleToDelete(item)}
                      className="p-1.5 text-slate-500 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                      title="মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {articleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center font-serif-bn mb-2">
              সংবাদটি মুছে ফেলতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 text-center mb-6 leading-relaxed">
              আপনি কি নিশ্চিত যে <span className="font-bold text-slate-900">"{articleToDelete.title}"</span> সংবাদটি স্থায়ীভাবে মুছে ফেলতে চান?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setArticleToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm shadow-rose-200"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
