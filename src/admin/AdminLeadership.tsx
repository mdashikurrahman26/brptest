import React, { useState, useEffect } from 'react';
import { getLeaders, getLeadersSync, saveLeader, deleteLeader } from '../firebase/services';
import { Leader } from '../types';
import { Plus, Edit2, Trash2, X, Search, Users, ArrowUp, ArrowDown } from 'lucide-react';

export const AdminLeadership: React.FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>(getLeadersSync);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const emptyLeader: Leader = {
    id: '',
    name: '',
    nameEn: '',
    position: '',
    positionEn: '',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: '',
    order: 1,
    published: true,
    department: 'কেন্দ্রীয় নির্বাহী পরিষদ',
    education: ''
  };

  const [formData, setFormData] = useState<Leader>(emptyLeader);

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const data = await getLeaders();
      setLeaders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const handleCreateNew = () => {
    setFormData({
      ...emptyLeader,
      id: `leader-${Date.now()}`,
      order: leaders.length + 1
    });
    setIsEditing(true);
  };

  const handleEdit = (item: Leader) => {
    setFormData(item);
    setIsEditing(true);
  };

  const [leaderToDelete, setLeaderToDelete] = useState<Leader | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!leaderToDelete) return;
    const id = leaderToDelete.id;
    setIsDeleting(true);
    try {
      await deleteLeader(id);
      setLeaders(prev => prev.filter(l => l.id !== id));
      setLeaderToDelete(null);
      setFeedback('নেতার তথ্য সফলভাবে মুছে ফেলা হয়েছে।');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
      setFeedback('মুছে ফেলতে সমস্যা হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveLeader(formData);
      await fetchLeaders();
      setIsEditing(false);
      setFeedback('নেতৃত্বের তথ্য সফলভাবে সংরক্ষিত হয়েছে!');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif-bn">
            সাংগঠনিক নেতৃত্ব ব্যবস্থাপনা
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            কেন্দ্রীয় নির্বাহী পরিষদ ও বিভাগীয় দায়িত্বপ্রাপ্তদের প্রোফাইল ও ক্রম নিয়ন্ত্রণ
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন নেতা যুক্ত করুন</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold animate-fadeIn">
          {feedback}
        </div>
      )}

      {/* Editor Modal/Form */}
      {isEditing && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900 font-serif-bn">
              নেতৃত্বের তথ্য সম্পাদন
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: মাহফুজুর রহমান"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">নাম (ইংরেজি)</label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  placeholder="e.g. Mahfuzur Rahman"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">পদবী (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="যেমন: মহাসচিব / প্রচার ও প্রকাশনা সম্পাদক"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">পদবী (ইংরেজি)</label>
                <input
                  type="text"
                  value={formData.positionEn}
                  onChange={(e) => setFormData({ ...formData, positionEn: e.target.value })}
                  placeholder="e.g. Secretary General"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">সাংগঠনিক ক্রম (Order)</label>
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ছবি ইউআরএল (Portrait URL)
              </label>
              <div className="flex gap-3 items-start">
                {formData.photoUrl && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-300 bg-slate-100 flex-shrink-0 shadow-xs">
                    <img
                      src={formData.photoUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 space-y-1.5">
                  <input
                    type="text"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value.trim() })}
                    placeholder="https://fsitayxgbtoebunoeicw.supabase.co/... বা যেকোনো ছবির লিংক"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        photoUrl: 'https://fsitayxgbtoebunoeicw.supabase.co/storage/v1/object/public/brp/ChatGPT%20Image%20Sep%2030,%202026,%2009_49_20%20AM.png'
                      })}
                      className="text-[11px] px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-medium transition-colors"
                    >
                      ✓ মহাসচিবের নতুন স্টুডিও ছবি (Supabase) ব্যবহার করুন
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">বিভাগ / সেল</label>
              <input
                type="text"
                value={formData.department || ''}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="যেমন: কেন্দ্রীয় নির্বাহী পরিষদ"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">সংক্ষিপ্ত জীবনবৃত্তান্ত (Bio) *</label>
              <textarea
                rows={3}
                required
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="leaderPub"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded border-slate-300 text-emerald-600"
              />
              <label htmlFor="leaderPub" className="text-xs font-semibold text-slate-700">
                প্রকাশিত রাখুন (Published in Leadership page)
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

      {/* List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 uppercase text-[11px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">ক্রম</th>
                <th className="py-3 px-4">ছবি</th>
                <th className="py-3 px-4">নাম</th>
                <th className="py-3 px-4">পদবী</th>
                <th className="py-3 px-4">বিভাগ</th>
                <th className="py-3 px-4">অবস্থা</th>
                <th className="py-3 px-4 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaders.map((leader) => (
                <tr key={leader.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    #{leader.order}
                  </td>
                  <td className="py-3 px-4">
                    <img
                      src={leader.photoUrl}
                      alt={leader.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {leader.name}
                    <div className="text-[10px] text-slate-400 font-normal">{leader.nameEn}</div>
                  </td>
                  <td className="py-3 px-4 text-emerald-800 font-medium">
                    {leader.position}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {leader.department || 'কেন্দ্রীয় পরিষদ'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      leader.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {leader.published ? 'প্রকাশিত' : 'অপ্রকাশিত'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(leader)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 rounded hover:bg-slate-100"
                      title="সম্পাদনা"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setLeaderToDelete(leader)}
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

      {/* In-App Delete Confirmation Modal (Bypasses iframe alert/confirm limitations) */}
      {leaderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center font-serif-bn mb-2">
              সদস্যের তথ্য মুছে ফেলতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 text-center mb-6 leading-relaxed">
              আপনি কি নিশ্চিত যে <span className="font-bold text-slate-900">"{leaderToDelete.name}"</span> ({leaderToDelete.position})-কে নেতৃত্ব তালিকা থেকে স্থায়ীভাবে মুছে ফেলতে চান? এটি ওয়েবসাইট থেকে অবিলম্বে অপসারিত হবে।
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setLeaderToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm shadow-rose-200 flex items-center justify-center gap-2"
              >
                {isDeleting ? 'মুছে ফেলা হচ্ছে...' : 'হ্যাঁ, মুছে ফেলুন'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
