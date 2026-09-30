import React, { useState, useEffect } from 'react';
import { getFAQs, saveFAQ, deleteFAQ } from '../firebase/services';
import { FAQItem } from '../types';
import { Plus, Edit2, Trash2, X, HelpCircle } from 'lucide-react';

export const AdminFAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const emptyFAQ: FAQItem = {
    id: '',
    question: '',
    answer: '',
    category: 'সাধারণ পরিচয়',
    order: 1,
    published: true
  };

  const [formData, setFormData] = useState<FAQItem>(emptyFAQ);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const data = await getFAQs();
      setFaqs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleCreateNew = () => {
    setFormData({
      ...emptyFAQ,
      id: `faq-${Date.now()}`,
      order: faqs.length + 1
    });
    setIsEditing(true);
  };

  const handleEdit = (item: FAQItem) => {
    setFormData(item);
    setIsEditing(true);
  };

  const [faqToDelete, setFaqToDelete] = useState<FAQItem | null>(null);

  const confirmDelete = async () => {
    if (!faqToDelete) return;
    const id = faqToDelete.id;
    try {
      await deleteFAQ(id);
      setFaqs(prev => prev.filter(f => f.id !== id));
      setFaqToDelete(null);
      setFeedback('প্রশ্নোত্তর সফলভাবে মুছে ফেলা হয়েছে।');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
      setFeedback('প্রশ্নোত্তর মুছতে সমস্যা হয়েছে।');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveFAQ(formData);
      await fetchFAQs();
      setIsEditing(false);
      setFeedback('প্রশ্নোত্তর সফলভাবে সংরক্ষিত হয়েছে!');
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
            সচরাচর জিজ্ঞাসা (FAQ) ব্যবস্থাপনা
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            নাগরিকদের প্রশ্নের উত্তর যোগ, সম্পাদনা ও ক্যাটাগরি নির্ধারণ
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন প্রশ্ন যোগ করুন</span>
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
              প্রশ্নোত্তর সম্পাদন
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ক্যাটাগরি</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="যেমন: সাধারণ পরিচয় / কর্মসূচি ও নীতি"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ক্রম (Order)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">প্রশ্ন *</label>
              <input
                type="text"
                required
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">উত্তর *</label>
              <textarea
                rows={4}
                required
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="faqPub"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded border-slate-300 text-emerald-600"
              />
              <label htmlFor="faqPub" className="text-xs font-semibold text-slate-700">
                ওয়েবসাইটে প্রদর্শন সক্রিয় রাখুন
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

      {/* FAQ Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 uppercase text-[11px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">ক্রম</th>
                <th className="py-3 px-4">প্রশ্ন</th>
                <th className="py-3 px-4">ক্যাটাগরি</th>
                <th className="py-3 px-4 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {faqs.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    #{item.order}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 max-w-md">
                    {item.question}
                  </td>
                  <td className="py-3 px-4 text-emerald-800">
                    {item.category}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 rounded"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setFaqToDelete(item)}
                      className="p-1.5 text-slate-500 hover:text-red-600 rounded hover:bg-red-50"
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

      {faqToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center font-serif-bn mb-2">
              প্রশ্নোত্তর মুছে ফেলতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 text-center mb-6 leading-relaxed">
              আপনি কি নিশ্চিত যে <span className="font-bold text-slate-900">"{faqToDelete.question}"</span> প্রশ্নটি স্থায়ীভাবে মুছে ফেলতে চান?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFaqToDelete(null)}
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
