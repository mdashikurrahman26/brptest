import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { getMedia } from '../firebase/services';
import { MediaItem } from '../types';
import { INITIAL_MEDIA } from '../firebase/seedData';
import { Image, Video, Newspaper, Play, X, ExternalLink, Calendar, Eye } from 'lucide-react';

export const MediaPage: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [activeTab, setActiveTab] = useState<'all' | 'photo' | 'video' | 'press'>('all');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const data = await getMedia();
        if (data && data.length > 0) {
          setMediaItems(data);
        }
      } catch (err) {
        console.error('Error fetching media:', err);
      }
    }
    fetchMedia();
  }, []);

  const filtered = mediaItems.filter(item => {
    if (activeTab === 'all') return item.published !== false;
    return item.type === activeTab && item.published !== false;
  });

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'মিডিয়া গ্যালারি' }]} />

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#003828] to-[#006a4e] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4">
              ভিজ্যুয়াল ও প্রেস আর্কাইভ
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bn leading-tight">
              মিডিয়া ও আলোকচিত্র গ্যালারি
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              দলীয় সম্মেলন, নাগরিক সমাবেশ, নীতি প্রণয়ন সেমিনার এবং জাতীয় গণমাধ্যমে প্রকাশিত সংবাদ সংকলন
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#f42a41] opacity-20 blur-xl pointer-events-none" />
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-[#006a4e] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            সকল মিডিয়া ({mediaItems.length})
          </button>

          <button
            onClick={() => setActiveTab('photo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'photo'
                ? 'bg-[#006a4e] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>ছবি (Photos)</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'video'
                ? 'bg-[#006a4e] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>ভিডিও (Videos)</span>
          </button>

          <button
            onClick={() => setActiveTab('press')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'press'
                ? 'bg-[#006a4e] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>প্রেস ও কভারেজ (Press)</span>
          </button>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all group flex flex-col cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.thumbnail || item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#f42a41] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>
                )}

                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-950/70 text-white backdrop-blur-xs">
                    {item.type === 'photo' ? 'আলোকচিত্র' : item.type === 'video' ? 'ভিডিও' : 'প্রেস'}
                  </span>
                </div>

                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-1.5 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#006a4e] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.date}
                  </span>
                  <span className="text-emerald-700 font-medium">
                    {item.source || 'বিআরপি আর্কাইভ'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Media Lightbox / Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                <span className="text-xs font-bold text-[#006a4e] uppercase tracking-wider">
                  {selectedItem.type === 'photo' ? 'আলোকচিত্র প্রদর্শন' : selectedItem.type === 'video' ? 'ভিডিও প্লেয়ার' : 'প্রেস কভারেজ'}
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Media Display */}
              <div className="bg-slate-950 flex items-center justify-center max-h-[60vh] overflow-hidden">
                {selectedItem.type === 'video' ? (
                  <div className="p-8 text-center text-white">
                    <div className="w-16 h-16 rounded-full bg-[#f42a41] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Play className="w-8 h-8 ml-1 fill-current" />
                    </div>
                    <p className="text-sm font-semibold mb-3">ভিডিওটি ইউটিউব বা অফিসিয়াল চ্যানেলে দেখতে ক্লিক করুন:</p>
                    <a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#006a4e] text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      <span>ভিডিও স্ট্রিমিং খুলুন</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="max-h-[60vh] w-auto object-contain mx-auto"
                  />
                )}
              </div>

              {/* Modal Caption */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 font-serif-bn">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {selectedItem.description}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>তারিখ: {selectedItem.date}</span>
                  <span>উৎস: {selectedItem.source || 'কেন্দ্রীয় মিডিয়া শাখা'}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
