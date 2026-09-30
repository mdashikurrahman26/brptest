import React, { useState, useEffect } from 'react';
import { getContactMessages, updateMessageStatus, deleteContactMessage } from '../firebase/services';
import { ContactMessage } from '../types';
import { Mail, Check, Archive, Trash2, Clock, Eye, AlertCircle, RefreshCw } from 'lucide-react';
import { formatBengaliDate } from '../utils/formatters';

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id: string, status: 'unread' | 'read' | 'archived') => {
    try {
      await updateMessageStatus(id, status);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
      if (selectedMsg && selectedMsg.id === id) {
        setSelectedMsg({ ...selectedMsg, status });
      }
      setFeedback('বার্তার স্থিতি হালনাগাদ করা হয়েছে।');
      setTimeout(() => setFeedback(null), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);

  const confirmDelete = async () => {
    if (!messageToDelete) return;
    const id = messageToDelete.id;
    try {
      await deleteContactMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMsg && selectedMsg.id === id) {
        setSelectedMsg(null);
      }
      setMessageToDelete(null);
      setFeedback('বার্তা মোছা হয়েছে।');
      setTimeout(() => setFeedback(null), 2500);
    } catch (err) {
      console.error(err);
      setFeedback('বার্তা মুছতে সমস্যা হয়েছে।');
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif-bn">
            নাগরিক যোগাযোগ ও অনুসন্ধান বার্তা
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            ওয়েবসাইটের যোগাযোগ ফরম মারফত প্রাপ্ত নাগরিক মতামত ও তথ্য অনুসন্ধান
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>রিফ্রেশ</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold animate-fadeIn">
          {feedback}
        </div>
      )}

      {/* Detail View Modal */}
      {selectedMsg && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                selectedMsg.status === 'unread' ? 'bg-red-100 text-red-800' : selectedMsg.status === 'archived' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {selectedMsg.status === 'unread' ? 'নতুন বার্তা' : selectedMsg.status === 'archived' ? 'আর্কাইভকৃত' : 'পঠিত'}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2 font-serif-bn">
                {selectedMsg.subject}
              </h3>
            </div>

            <button
              onClick={() => setSelectedMsg(null)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              বন্ধ করুন
            </button>
          </div>

          <div className="py-4 space-y-3 text-xs sm:text-sm text-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
              <div>
                <span className="text-slate-400">প্রেরক: </span>
                <strong className="text-slate-900">{selectedMsg.name}</strong>
              </div>
              <div>
                <span className="text-slate-400">ইমেইল: </span>
                <a href={`mailto:${selectedMsg.email}`} className="text-emerald-700 underline font-semibold">
                  {selectedMsg.email}
                </a>
              </div>
              {selectedMsg.phone && (
                <div>
                  <span className="text-slate-400">ফোন: </span>
                  <span className="text-slate-800 font-medium">{selectedMsg.phone}</span>
                </div>
              )}
              <div>
                <span className="text-slate-400">তারিখ: </span>
                <span className="text-slate-800">{formatBengaliDate(selectedMsg.createdAt)}</span>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="font-bold text-slate-900 mb-2">বার্তার মূল বিষয়বস্তু:</h4>
              <p className="p-4 rounded-xl bg-white border border-slate-200 text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedMsg.message}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusChange(selectedMsg.id, 'read')}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>পঠিত হিসেবে চিহ্নিত করুন</span>
              </button>
              <button
                onClick={() => handleStatusChange(selectedMsg.id, 'archived')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 flex items-center gap-1"
              >
                <Archive className="w-3.5 h-3.5" />
                <span>আর্কাইভ করুন</span>
              </button>
            </div>

            <button
              onClick={() => setMessageToDelete(selectedMsg)}
              className="px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>মুছে ফেলুন</span>
            </button>
          </div>
        </div>
      )}

      {/* Messages Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 uppercase text-[11px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">প্রেরক</th>
                <th className="py-3 px-4">বিষয়</th>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">অবস্থা</th>
                <th className="py-3 px-4 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div>{msg.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{msg.email}</div>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-800">
                    {msg.subject}
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {formatBengaliDate(msg.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      msg.status === 'unread' ? 'bg-red-100 text-red-800' : msg.status === 'archived' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {msg.status === 'unread' ? 'নতুন' : msg.status === 'archived' ? 'আর্কাইভ' : 'পঠিত'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedMsg(msg);
                        if (msg.status === 'unread') {
                          handleStatusChange(msg.id, 'read');
                        }
                      }}
                      className="p-1.5 text-slate-600 hover:text-emerald-700 rounded hover:bg-slate-100"
                      title="বার্তা পড়ুন"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setMessageToDelete(msg)}
                      className="p-1.5 text-slate-600 hover:text-red-600 rounded hover:bg-red-50"
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

        {messages.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            এখন পর্যন্ত কোনো নাগরিক বার্তা পাওয়া যায়নি।
          </div>
        )}
      </div>

      {messageToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center font-serif-bn mb-2">
              বার্তাটি মুছে ফেলতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 text-center mb-6 leading-relaxed">
              আপনি কি নিশ্চিত যে <span className="font-bold text-slate-900">"{messageToDelete.name}"</span> প্রেরিত বার্তাটি মুছে ফেলতে চান?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMessageToDelete(null)}
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
