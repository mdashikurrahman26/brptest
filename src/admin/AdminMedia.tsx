import React, { useState, useEffect } from 'react';
import { getMedia, saveMedia, deleteMedia } from '../firebase/services';
import { MediaItem } from '../types';
import { Plus, Edit2, Trash2, X, Image, Video, Newspaper } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const emptyItem: MediaItem = {
    id: '',
    type: 'photo',
    title: '',
    description: '',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80',
    date: '২০২৬-০৩-২৪',
    published: true,
    source: 'কেন্দ্রীয় মিডিয়া সেল'
  };

  const [formData, setFormData] = useState<MediaItem>(emptyItem);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getMedia();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreateNew = () => {
    setFormData({
      ...emptyItem,
      id: `media-${Date.now()}`
    });
    setIsEditing(true);
  };

  const handleEdit = (item: MediaItem) => {
    setFormData(item);
    setIsEditing(true);
  };

  const [mediaToDelete, setMediaToDelete] = useState<MediaItem | null>(null);

  const confirmDelete = async () => {
    if (!mediaToDelete) return;
    const id = mediaToDelete.id;
    try {
      await deleteMedia(id);
      setItems(prev => prev.filter(m => m.id !== id));
      setMediaToDelete(null);
      setFeedback('মিডিয়া আইটেম সফলভাবে মুছে ফেলা হয়েছে।');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
      setFeedback('মিডিয়া মুছতে সমস্যা হয়েছে।');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveMedia(formData);
      await fetchItems();
      setIsEditing(false);
      setFeedback('মিডিয়া সফলভাবে সংরক্ষিত হয়েছে!');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif-bn">
            মিডিয়া গ্যালারি ও প্রেস আর্কাইভ
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            ছবি, ভিডিও এবং সংবাদপত্রে প্রকাশিত ক্লিপিংস সংযোজন ও ব্যবস্থাপনা
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন মিডিয়া আইটেম</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold animate-fadeIn">
          {feedback}
        </div>
      )}

      {isEditing && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900 font-serif-bn">
              মিডিয়া আইটেম সম্পাদন
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ধরণ (Type) *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                >
                  <option value="photo">ছবি (Photo)</option>
                  <option value="video">ভিডিও (Video)</option>
                  <option value="press">প্রেস কভারেজ (Press)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">তারিখ</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">উৎস / সূত্র (Source)</label>
                <input
                  type="text"
                  value={formData.source || ''}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  placeholder="যেমন: কেন্দ্রীয় মিডিয়া সেল"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">মিডিয়া শিরোনাম *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">মিডিয়া ফাইল বা ভিডিও ইউআরএল *</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">থাম্বনেইল প্রিভিউ ইউআরএল</label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="mediaPub"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded border-slate-300 text-emerald-600"
              />
              <label htmlFor="mediaPub" className="text-xs font-semibold text-slate-700">
                গ্যালারিতে সরাসরি প্রকাশ করুন
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
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

      {/* Media Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.thumbnail || item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900/80 text-white">
                  {item.type}
                </span>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-xs text-slate-900 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[10px]">{item.date}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1 text-slate-500 hover:text-emerald-700 rounded"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMediaToDelete(item)}
                  className="p-1 text-slate-500 hover:text-red-600 rounded hover:bg-red-50"
                  title="মুছুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mediaToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center font-serif-bn mb-2">
              মিডিয়া আইটেম মুছে ফেলতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 text-center mb-6 leading-relaxed">
              আপনি কি নিশ্চিত যে <span className="font-bold text-slate-900">"{mediaToDelete.title}"</span> আইটেমটি স্থায়ীভাবে মুছে ফেলতে চান?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMediaToDelete(null)}
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
