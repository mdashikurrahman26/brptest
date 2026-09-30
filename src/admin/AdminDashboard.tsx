import React, { useState, useEffect } from 'react';
import { 
  getNews, getLeaders, getEvents, getDocuments, 
  getMedia, getContactMessages, getFAQs, getMembers 
} from '../firebase/services';
import { 
  Newspaper, Users, Calendar, FileText, 
  Image, Mail, TrendingUp, CheckCircle, Clock, AlertCircle, UserPlus 
} from 'lucide-react';
import { toBengaliNumber } from '../utils/formatters';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalNews: 0,
    publishedNews: 0,
    upcomingEvents: 0,
    totalLeaders: 0,
    totalDocs: 0,
    totalMedia: 0,
    unreadMessages: 0,
    totalMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [newsList, leadersList, eventsList, docsList, mediaList, msgList, memberList] = await Promise.all([
          getNews(),
          getLeaders(),
          getEvents(),
          getDocuments(),
          getMedia(),
          getContactMessages(),
          getMembers()
        ]);

        setStats({
          totalMembers: memberList.length,
          totalNews: newsList.length,
          publishedNews: newsList.filter(n => n.published !== false).length,
          upcomingEvents: eventsList.filter(e => e.status === 'upcoming').length,
          totalLeaders: leadersList.length,
          totalDocs: docsList.length,
          totalMedia: mediaList.length,
          unreadMessages: msgList.filter(m => m.status === 'unread').length,
          totalMessages: msgList.length,
        });
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    {
      id: 'members',
      title: 'নিবন্ধিত সদস্য সংখ্যা',
      value: toBengaliNumber(stats.totalMembers),
      subtitle: 'বিভাগীয় সদস্য তালিকা ও সরাসরি বার্তা',
      icon: UserPlus,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'news',
      title: 'সর্বমোট সংবাদ',
      value: toBengaliNumber(stats.totalNews),
      subtitle: `প্রকাশিত: ${toBengaliNumber(stats.publishedNews)} টি`,
      icon: Newspaper,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'events',
      title: 'আসন্ন কর্মসূচি',
      value: toBengaliNumber(stats.upcomingEvents),
      subtitle: 'পরবর্তী জাতীয় ও আঞ্চলিক সম্মেলন',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'leadership',
      title: 'কার্যনির্বাহী পরিষদ',
      value: toBengaliNumber(stats.totalLeaders),
      subtitle: 'কেন্দ্রীয় ও বিভাগীয় দায়িত্বপ্রাপ্ত',
      icon: Users,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'documents',
      title: 'প্রকাশিত নথিপত্র',
      value: toBengaliNumber(stats.totalDocs),
      subtitle: 'গঠনতন্ত্র, অডিট ও নীতিপত্র',
      icon: FileText,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'media',
      title: 'মিডিয়া আইটেম',
      value: toBengaliNumber(stats.totalMedia),
      subtitle: 'ছবি, ভিডিও ও প্রেস আর্কাইভ',
      icon: Image,
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    {
      id: 'messages',
      title: 'অসমাপ্ত নাগরিক বার্তা',
      value: toBengaliNumber(stats.unreadMessages),
      subtitle: `মোট বার্তা: ${toBengaliNumber(stats.totalMessages)} টি`,
      icon: Mail,
      color: stats.unreadMessages > 0 ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-50 text-slate-700 border-slate-200'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-bn">
          প্রশাসনিক ড্যাশবোর্ড ও নিয়ন্ত্রণ কেন্দ্র
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          দলীয় প্ল্যাটফর্মের সর্বশেষ পরিসংখ্যান, সংবাদ, নথিপত্র ও যোগাযোগের সার্বিক অবস্থা
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => onNavigateTab(c.id)}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all text-left flex items-start justify-between group"
            >
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {c.title}
                </p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1.5 group-hover:text-[#006a4e] transition-colors">
                  {c.value}
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  {c.subtitle}
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border ${c.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Operational Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 cols: Quick action shortcuts */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 font-serif-bn mb-4">
            দ্রুত ব্যবস্থাপনা কর্ম
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onNavigateTab('homepage')}
              className="p-4 rounded-xl border-2 border-emerald-500/40 bg-emerald-50/50 hover:bg-emerald-100/60 text-left transition-all group col-span-1 sm:col-span-2 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#005a3e] group-hover:text-emerald-950 flex items-center gap-1.5">
                    <span>⚙️ হোমপেজ ও সেকশন কন্ট্রোল (ছবি ও টেক্সট এডিটর)</span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    হিরো ব্যানার, স্লোগান, প্রতিশ্রুতি ক্যালিগ্রাফি ও সেকশন দৃশ্যমানতা লাইভ নিয়ন্ত্রণ করুন
                  </p>
                </div>
                <span className="text-xs font-bold text-[#005a3e] group-hover:translate-x-1 transition-transform">
                  প্রবেশ করুন →
                </span>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab('news')}
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
            >
              <h4 className="font-bold text-sm text-slate-800 group-hover:text-[#006a4e]">
                + নতুন সংবাদ প্রকাশ
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                প্রেস বিজ্ঞপ্তি বা দলীয় বিবৃতি যুক্ত করুন
              </p>
            </button>

            <button
              onClick={() => onNavigateTab('events')}
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
            >
              <h4 className="font-bold text-sm text-slate-800 group-hover:text-[#006a4e]">
                + নতুন ইভেন্ট শিডিউল
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                সমাবেশ বা গোলটেবিল সংলাপ যুক্ত করুন
              </p>
            </button>

            <button
              onClick={() => onNavigateTab('documents')}
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
            >
              <h4 className="font-bold text-sm text-slate-800 group-hover:text-[#006a4e]">
                + পলিসি বা অডিট পেপার
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                ডাউনলোডযোগ্য নতুন পিডিএফ নথি যুক্ত করুন
              </p>
            </button>

            <button
              onClick={() => onNavigateTab('leadership')}
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
            >
              <h4 className="font-bold text-sm text-slate-800 group-hover:text-[#006a4e]">
                + পরিষদ সদস্য হালনাগাদ
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                নেতৃত্বের প্রোফাইল বা দায়িত্ব পরিবর্তন
              </p>
            </button>
          </div>
        </div>

        {/* Right 5 cols: Institutional Security & System State */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 font-serif-bn">
            সিস্টেম ও নিরাপত্তা স্থিতি
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
              <span className="flex items-center gap-2 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                ফায়ারস্টোর ডাটাবেজ
              </span>
              <span className="font-bold">সক্রিয় (Active)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
              <span className="flex items-center gap-2 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                নিরাপত্তা রুলস
              </span>
              <span className="font-bold">হার্ডেনড (Hardened)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
              <span className="flex items-center gap-2 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                অ্যাডমিন প্রবেশাধিকার
              </span>
              <span className="font-bold">সুরক্ষিত (RBAC)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
              <span className="font-semibold text-slate-800">নীতিমালা স্মরণিকা:</span>
              <p className="mt-1 leading-relaxed">
                এটি নিরপেক্ষ ও প্রাতিষ্ঠানিক তথ্য পোর্টাল। কোনো ধরনের অপপ্রচার, ভোটার মাইক্রোটার্গেটিং বা বিভ্রান্তিকর তথ্য প্রবেশ করানো নিষিদ্ধ।
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
