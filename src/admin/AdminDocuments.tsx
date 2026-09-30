import React, { useState, useEffect } from 'react';
import { getDocuments, saveDocument, deleteDocument } from '../firebase/services';
import { OrgDocument } from '../types';
import { Plus, Edit2, Trash2, X, FileText, Download } from 'lucide-react';

export const AdminDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<OrgDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const emptyDoc: OrgDocument = {
    id: '',
    title: '',
    category: 'নীতিপত্র',
    description: '',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '২.০ মেগাবাইট',
    fileType: 'PDF',
    published: true,
    publishedAt: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  };

  const [formData, setFormData] = useState<OrgDocument>(emptyDoc);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleCreateNew = () => {
    setFormData({
      ...emptyDoc,
      id: `doc-${Date.now()}`
    });
    setIsEditing(true);
  };

  const handleEdit = (item: OrgDocument) => {
    setFormData(item);
    setIsEditing(true);
  };

  const [documentToDelete, setDocumentToDelete] = useState<OrgDocument | null>(null);

  const confirmDelete = async () => {
    if (!documentToDelete) return;
    const id = documentToDelete.id;
    try {
      await deleteDocument(id);
      setDocuments(prev => prev.filter(d => d.id !== id));
      setDocumentToDelete(null);
      setFeedback('নথি সফলভাবে মুছে ফেলা হয়েছে।');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
      setFeedback('নথি মুছতে সমস্যা হয়েছে।');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveDocument(formData);
      await fetchDocs();
      setIsEditing(false);
      setFeedback('নথি সফলভাবে সংরক্ষিত হয়েছে!');
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
            ডকুমেন্টস ও প্রকাশনা ব্যবস্থাপনা
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            গঠনতন্ত্র, ১০ দফা নীতিমালা, অডিট ও অফিশিয়াল প্রকাশনার পিডিএফ ফাইল পরিচালনা
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন নথি যুক্ত করুন</span>
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
              নথিপত্র সম্পাদন
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">নথির শিরোনাম *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ক্যাটাগরি *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                >
                  <option value="গঠনতন্ত্র">গঠনতন্ত্র</option>
                  <option value="নীতিপত্র">নীতিপত্র</option>
                  <option value="১০ দফা কর্মসূচি">১০ দফা কর্মসূচি</option>
                  <option value="প্রকাশনা">প্রকাশনা</option>
                  <option value="অফিসিয়াল বিবৃতি">অফিসিয়াল বিবৃতি</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ফাইলের আকার (Size)</label>
                <input
                  type="text"
                  value={formData.fileSize}
                  onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                  placeholder="যেমন: ২.৪ মেগাবাইট"
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">পিডিএফ ফাইল লিঙ্ক (PDF URL) *</label>
              <input
                type="url"
                required
                value={formData.fileUrl}
                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">সংক্ষিপ্ত বিবরণ *</label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="docPub"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded border-slate-300 text-emerald-600"
              />
              <label htmlFor="docPub" className="text-xs font-semibold text-slate-700">
                ডকুমেন্ট পেজে তাৎক্ষণিক প্রকাশ করুন
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

      {/* Documents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 uppercase text-[11px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">শিরোনাম</th>
                <th className="py-3 px-4">ক্যাটাগরি</th>
                <th className="py-3 px-4">সাইজ</th>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-semibold text-slate-900 max-w-sm truncate">
                    {doc.title}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium text-[11px]">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {doc.fileSize}
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {doc.publishedAt}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(doc)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 rounded"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDocumentToDelete(doc)}
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

      {documentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center font-serif-bn mb-2">
              নথি মুছে ফেলতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 text-center mb-6 leading-relaxed">
              আপনি কি নিশ্চিত যে <span className="font-bold text-slate-900">"{documentToDelete.title}"</span> প্রকাশনাটি স্থায়ীভাবে মুছে ফেলতে চান?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDocumentToDelete(null)}
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
