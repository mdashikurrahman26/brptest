import React, { useState, useEffect } from 'react';
import { getEvents, saveEvent, deleteEvent } from '../firebase/services';
import { OrgEvent } from '../types';
import { Plus, Edit2, Trash2, X, Calendar, MapPin, Clock } from 'lucide-react';

export const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<OrgEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const emptyEvent: OrgEvent = {
    id: '',
    title: '',
    description: '',
    date: '২০২৬-০৫-০১',
    time: 'সকাল ১০:০০ - বিকাল ৫:০০',
    location: 'ঢাকা',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    status: 'upcoming',
    category: 'জাতীয় সম্মেলন',
    registrationOpen: true,
    createdAt: new Date().toISOString()
  };

  const [formData, setFormData] = useState<OrgEvent>(emptyEvent);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateNew = () => {
    setFormData({
      ...emptyEvent,
      id: `event-${Date.now()}`
    });
    setIsEditing(true);
  };

  const handleEdit = (item: OrgEvent) => {
    setFormData(item);
    setIsEditing(true);
  };

  const [eventToDelete, setEventToDelete] = useState<OrgEvent | null>(null);

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    const id = eventToDelete.id;
    try {
      await deleteEvent(id);
      setEvents(prev => prev.filter(e => e.id !== id));
      setEventToDelete(null);
      setFeedback('ইভেন্ট সফলভাবে মুছে ফেলা হয়েছে।');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
      setFeedback('ইভেন্ট মুছতে সমস্যা হয়েছে।');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveEvent(formData);
      await fetchEvents();
      setIsEditing(false);
      setFeedback('ইভেন্ট সফলভাবে সংরক্ষিত হয়েছে!');
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
            কর্মসূচি ও ইভেন্ট ব্যবস্থাপনা
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            জাতীয় সম্মেলন, তৃণমূল সমাবেশ ও আলোচনা সভা শিডিউল করুন
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ইভেন্ট যুক্ত করুন</span>
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
              ইভেন্ট তথ্য সম্পাদন
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">ইভেন্ট শিরোনাম *</label>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">তারিখ *</label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="যেমন: ২০২৬-০৪-১৫"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">সময় *</label>
                <input
                  type="text"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="যেমন: সকাল ১০:০০ - বিকাল ৫:৩০"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">অবস্থা (Status)</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                >
                  <option value="upcoming">আসন্ন (Upcoming)</option>
                  <option value="completed">সম্পন্ন (Completed)</option>
                  <option value="cancelled">স্থগিত (Cancelled)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">স্থান (Location) *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
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
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">বিবরণ *</label>
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
                id="regOpen"
                checked={formData.registrationOpen}
                onChange={(e) => setFormData({ ...formData, registrationOpen: e.target.checked })}
                className="rounded border-slate-300 text-emerald-600"
              />
              <label htmlFor="regOpen" className="text-xs font-semibold text-slate-700">
                উন্মুক্ত উপস্থিতি ও রেজিস্ট্রেশন সক্রিয় রাখুন
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

      {/* Events Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 uppercase text-[11px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">শিরোনাম</th>
                <th className="py-3 px-4">তারিখ ও সময়</th>
                <th className="py-3 px-4">স্থান</th>
                <th className="py-3 px-4">স্থিতি</th>
                <th className="py-3 px-4 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs truncate">
                    {evt.title}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    <div>{evt.date}</div>
                    <div className="text-[10px] text-slate-400">{evt.time}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {evt.location}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      evt.status === 'upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {evt.status === 'upcoming' ? 'আসন্ন' : 'সম্পন্ন'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(evt)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 rounded hover:bg-slate-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEventToDelete(evt)}
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

      {eventToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center font-serif-bn mb-2">
              ইভেন্ট মুছে ফেলতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 text-center mb-6 leading-relaxed">
              আপনি কি নিশ্চিত যে <span className="font-bold text-slate-900">"{eventToDelete.title}"</span> ইভেন্টটি স্থায়ীভাবে মুছে ফেলতে চান?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEventToDelete(null)}
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
