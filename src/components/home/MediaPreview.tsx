import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Video, Newspaper, Play, ExternalLink, ArrowRight } from 'lucide-react';
import { MediaItem } from '../../types';

interface MediaPreviewProps {
  media: MediaItem[];
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({ media }) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'video' | 'press'>('photo');

  const filtered = media.filter(item => item.type === activeTab);

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
              মিডিয়া ও প্রেস আর্কাইভ
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-serif-bn">
              মিডিয়া গ্যালারি
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              দলের আলোকচিত্র, ভিডিও তথ্যচিত্র এবং জাতীয় গণমাধ্যমে প্রকাশিত সংবাদ
            </p>
          </div>

          <Link
            to="/media"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#006a4e] hover:text-emerald-800 transition-colors"
          >
            <span>সম্পূর্ণ গ্যালারি দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all group flex flex-col"
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
                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-0.5 rounded bg-slate-900/80 text-white text-[11px] font-medium backdrop-blur-xs">
                    {item.date}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#006a4e] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.source || 'বিআরপি আর্কাইভ'}</span>
                  <Link to="/media" className="text-[#006a4e] hover:underline font-semibold">
                    দেখান
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
