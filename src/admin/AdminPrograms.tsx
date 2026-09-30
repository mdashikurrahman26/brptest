import React, { useState, useEffect } from 'react';
import { getPrograms, saveProgram } from '../firebase/services';
import { PolicyProgram } from '../types';
import { toBengaliNumber } from '../utils/formatters';
import { Edit2, X, CheckSquare, Plus } from 'lucide-react';

export const AdminPrograms: React.FC = () => {
  const [programs, setPrograms] = useState<PolicyProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProgram, setEditingProgram] = useState<PolicyProgram | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const data = await getPrograms();
      setPrograms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleEdit = (prog: PolicyProgram) => {
    setEditingProgram({ ...prog });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram) return;

    try {
      await saveProgram(editingProgram);
      await fetchPrograms();
      setEditingProgram(null);
      setFeedback('১০ দফা কর্মসূচির দফা সফলভাবে সংরক্ষিত হয়েছে!');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-serif-bn">
          ১০ দফা জাতীয় উন্নয়ন কর্মসূচি
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          দলের মূল ১০ দফা নীতি ফ্রেমওয়ার্কের প্রতিটি দফার সারসংক্ষেপ ও বিশ্লেষণ সম্পাদনা
        </p>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold animate-fadeIn">
          {feedback}
        </div>
      )}

      {editingProgram && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900 font-serif-bn">
              দফা #{toBengaliNumber(editingProgram.number)} সম্পাদন করুন
            </h3>
            <button
              onClick={() => setEditingProgram(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">দফার শিরোনাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={editingProgram.title}
                  onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">শিরোনাম (ইংরেজি)</label>
                <input
                  type="text"
                  value={editingProgram.titleEn}
                  onChange={(e) => setEditingProgram({ ...editingProgram, titleEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">মূল সারসংক্ষেপ *</label>
              <textarea
                rows={2}
                required
                value={editingProgram.summary}
                onChange={(e) => setEditingProgram({ ...editingProgram, summary: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">বিস্তারিত বিশ্লেষণ ও প্রস্তাবনা *</label>
              <textarea
                rows={4}
                required
                value={editingProgram.details}
                onChange={(e) => setEditingProgram({ ...editingProgram, details: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingProgram(null)}
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

      {/* Grid of 10 Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#006a4e] font-bold text-sm flex items-center justify-center flex-shrink-0 border border-emerald-200">
                {toBengaliNumber(prog.number)}
              </span>
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  {prog.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {prog.summary}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleEdit(prog)}
              className="p-1.5 text-slate-500 hover:text-emerald-700 rounded hover:bg-slate-100 flex-shrink-0"
              title="সম্পাদনা"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
