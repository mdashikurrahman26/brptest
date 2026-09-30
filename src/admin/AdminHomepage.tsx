import React, { useState, useEffect } from 'react';
import { 
  SlidersHorizontal, Save, RotateCcw, Image, Type, 
  Eye, CheckCircle2, AlertCircle, ExternalLink, Video,
  Sparkles, Layers, ShieldCheck
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '../firebase/services';
import { SiteSettings } from '../types';
import { INITIAL_SITE_SETTINGS } from '../firebase/seedData';

// Preset local asset paths for one-click selection
import heroBannerPreset from '../assets/images/hero_bangladesh_banner_1790622735933.jpg';
import promiseBannerPreset from '../assets/images/new_day_promise_banner_1790623221443.jpg';
import emblemPreset from '../assets/images/brp_party_emblem_1790622749816.jpg';
import videoPreset from '../assets/images/party_video_thumbnail_1790623243542.jpg';

export const AdminHomepage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'second' | 'visibility'>('hero');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSiteSettings();
        if (data) setSettings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setFeedback(null);
    try {
      await updateSiteSettings(settings);
      setFeedback({
        type: 'success',
        message: 'হোমপেজ ও সেকশনের সমস্ত পরিবর্তন সফলভাবে সংরক্ষিত ও লাইভ হয়েছে!'
      });
      setTimeout(() => setFeedback(null), 4000);
    } catch (err) {
      console.error(err);
      setFeedback({
        type: 'error',
        message: 'সংরক্ষণে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    setShowResetConfirm(true);
  };

  const confirmResetDefaults = () => {
    setSettings(INITIAL_SITE_SETTINGS);
    updateSiteSettings(INITIAL_SITE_SETTINGS);
    setShowResetConfirm(false);
    setFeedback({
      type: 'success',
      message: 'হোমপেজের সেটিংস ডিফল্টে রিসেট করা হয়েছে।'
    });
    setTimeout(() => setFeedback(null), 3000);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-serif-bn">
        হোমপেজ কনফিগারেশন লোড হচ্ছে...
      </div>
    );
  }

  const hero = settings.hero || {};
  const second = settings.secondSection || {};
  const visibility = settings.sectionVisibility || {};

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#005a3e] text-xs font-bold mb-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>লাইভ সেকশন ও কন্টেন্ট ম্যানেজার</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-bn">
            হোমপেজ ও সেকশন কন্ট্রোল
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            হোমপেজের প্রতিটি সেকশনের ছবি, শিরোনাম, টেক্সট এবং দৃশ্যমানতা পরিবর্তন ও সংশোধন করুন
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>ডিফল্ট রিসেট</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#005a3e] hover:bg-[#004731] transition-all shadow-xs disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}</span>
          </button>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2.5 animate-fadeIn shadow-2xs ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
            : 'bg-red-50 text-red-900 border border-red-200'
        }`}>
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 pt-3 gap-2">
        <button
          onClick={() => setActiveSubTab('hero')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeSubTab === 'hero'
              ? 'border-[#005a3e] text-[#005a3e]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>১. হিরো ব্যানার সেকশন</span>
        </button>

        <button
          onClick={() => setActiveSubTab('second')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeSubTab === 'second'
              ? 'border-[#005a3e] text-[#005a3e]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>২. দ্বিতীয় সেকশন (প্রতিশ্রুতি ও ভিশন)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('visibility')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeSubTab === 'visibility'
              ? 'border-[#005a3e] text-[#005a3e]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>৩. সেকশন শো/হাইড (Visibility)</span>
        </button>
      </div>

      {/* ================= TAB 1: HERO SECTION ================= */}
      {activeSubTab === 'hero' && (
        <form onSubmit={handleSave} className="bg-white rounded-b-2xl p-6 sm:p-8 border border-t-0 border-slate-200 shadow-2xs space-y-6">
          
          {/* Banner Image Control */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-emerald-900">
              <Image className="w-4 h-4" />
              <span>হিরো ব্যাকগ্রাউন্ড ব্যানার ছবি</span>
            </h3>
            <p className="text-[11px] text-slate-500 mb-3">
              যেকোনো উচ্চ রেজোলিউশনের ছবির ওয়েব লিংক (URL) পেস্ট করুন অথবা পূর্বনির্ধারিত ছবি ব্যবহার করতে ক্লিক করুন।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-48 aspect-[16/9] rounded-lg overflow-hidden bg-slate-200 border border-slate-300 relative shadow-2xs flex-shrink-0">
                <img
                  src={hero.bannerImageUrl || heroBannerPreset}
                  alt="ব্যানার প্রিভিউ"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 text-white px-1.5 py-0.5 rounded">
                  লাইভ প্রিভিউ
                </span>
              </div>

              <div className="flex-1 w-full space-y-2">
                <label className="block text-xs font-semibold text-slate-700">ব্যানার ছবির URL</label>
                <input
                  type="text"
                  placeholder="https://... বা খালি রাখলে ডিফল্ট ব্যানার প্রদর্শিত হবে"
                  value={hero.bannerImageUrl || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    hero: { ...hero, bannerImageUrl: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSettings({
                      ...settings,
                      hero: { ...hero, bannerImageUrl: '' }
                    })}
                    className="text-[11px] text-[#005a3e] font-semibold hover:underline"
                  >
                    ডিফল্ট ব্যানারে ফিরিয়ে নিন
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Titles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">টপ ট্যাগলাইন (ছোট বার্তা)</label>
              <input
                type="text"
                value={hero.tagline || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  hero: { ...hero, tagline: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">সবুজ রিবন টেক্সট (Green Ribbon)</label>
              <input
                type="text"
                value={hero.ribbonText || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  hero: { ...hero, ribbonText: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none focus:border-emerald-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">মূল প্রধান শিরোনাম (Main Headline)</label>
              <input
                type="text"
                value={hero.title || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  hero: { ...hero, title: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs sm:text-sm font-bold rounded-lg border border-slate-300 outline-none focus:border-emerald-600 font-serif-bn"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">সাবটেক্সট / লক্ষ্য বক্তব্য</label>
              <input
                type="text"
                value={settings.tagline || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  tagline: e.target.value
                })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 text-emerald-900">
              হিরো অ্যাকশন বাটনসমূহ (Action Buttons)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">বাটন ১ এর টেক্সট</label>
                <input
                  type="text"
                  value={hero.primaryBtnText || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    hero: { ...hero, primaryBtnText: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">বাটন ১ এর লিংক</label>
                <input
                  type="text"
                  value={hero.primaryBtnLink || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    hero: { ...hero, primaryBtnLink: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">বাটন ২ এর টেক্সট</label>
                <input
                  type="text"
                  value={hero.secondaryBtnText || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    hero: { ...hero, secondaryBtnText: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">বাটন ২ এর লিংক</label>
                <input
                  type="text"
                  value={hero.secondaryBtnLink || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    hero: { ...hero, secondaryBtnLink: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#005a3e] hover:bg-[#004731] text-white font-bold text-xs shadow-xs disabled:opacity-50"
            >
              {saving ? 'সংরক্ষণ হচ্ছে...' : 'হিরো পরিবর্তন সংরক্ষণ করুন'}
            </button>
          </div>
        </form>
      )}

      {/* ================= TAB 2: SECOND SECTION (PROMISES & VIDEO) ================= */}
      {activeSubTab === 'second' && (
        <form onSubmit={handleSave} className="bg-white rounded-b-2xl p-6 sm:p-8 border border-t-0 border-slate-200 shadow-2xs space-y-6">
          
          {/* Promise Card Details */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <Type className="w-4 h-4" />
              <span>"একটি নতুন দিনের প্রতিশ্রুতি" কার্ড ও ক্যালিগ্রাফি</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">ক্যালিগ্রাফি লাইন ১</label>
                <input
                  type="text"
                  value={second.promiseTitle1 || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    secondSection: { ...second, promiseTitle1: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">ক্যালিগ্রাফি লাইন ২</label>
                <input
                  type="text"
                  value={second.promiseTitle2 || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    secondSection: { ...second, promiseTitle2: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">ক্যালিগ্রাফি লাইন ৩ (লাল ব্রাশ)</label>
                <input
                  type="text"
                  value={second.promiseTitle3 || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    secondSection: { ...second, promiseTitle3: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">প্রতিশ্রুতি ব্যানার ছবি URL</label>
              <input
                type="text"
                placeholder="https://... বা খালি রাখলে ডিফল্ট থাকবে"
                value={second.promiseBannerUrl || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  secondSection: { ...second, promiseBannerUrl: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">আমাদের সম্পর্কে বিবরণী (About Snippet)</label>
              <textarea
                rows={3}
                value={second.promiseDescription || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  secondSection: { ...second, promiseDescription: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
              />
            </div>
          </div>

          {/* Official Emblem & Video Control */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Emblem / Seal Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>দলীয় প্রতীক ও সিল</span>
              </h3>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">প্রতীক ছবির URL</label>
                <input
                  type="text"
                  placeholder="https://... বা খালি রাখলে ডিফল্ট"
                  value={second.emblemBannerUrl || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    secondSection: { ...second, emblemBannerUrl: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <img
                  src={second.emblemBannerUrl || emblemPreset}
                  alt="প্রতীক সিল প্রিভিউ"
                  className="w-12 h-12 rounded-full object-cover border border-slate-300 bg-white"
                />
                <span className="text-[11px] text-slate-500">
                  বর্তমান দলীয় প্রতীক প্রিভিউ
                </span>
              </div>
            </div>

            {/* Video Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Video className="w-4 h-4" />
                <span>ভিডিও হাইলাইট ও লিংক</span>
              </h3>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">ভিডিও শিরোনাম</label>
                <input
                  type="text"
                  value={second.videoTitle || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    secondSection: { ...second, videoTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">ভিডিও লিংক (YouTube বা ওয়েব লিংক)</label>
                <input
                  type="text"
                  value={second.videoUrl || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    secondSection: { ...second, videoUrl: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">ভিডিও থাম্বনেইল ছবির URL</label>
                <input
                  type="text"
                  placeholder="https://... বা খালি রাখলে ডিফল্ট"
                  value={second.videoThumbnail || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    secondSection: { ...second, videoThumbnail: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-emerald-600 bg-white"
                />
              </div>
            </div>

          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#005a3e] hover:bg-[#004731] text-white font-bold text-xs shadow-xs disabled:opacity-50"
            >
              {saving ? 'সংরক্ষণ হচ্ছে...' : 'দ্বিতীয় সেকশনের পরিবর্তন সংরক্ষণ করুন'}
            </button>
          </div>
        </form>
      )}

      {/* ================= TAB 3: SECTION VISIBILITY (SHOW / HIDE) ================= */}
      {activeSubTab === 'visibility' && (
        <form onSubmit={handleSave} className="bg-white rounded-b-2xl p-6 sm:p-8 border border-t-0 border-slate-200 shadow-2xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-serif-bn">
              হোমপেজের সেকশন দৃশ্যমানতা নিয়ন্ত্রণ (Visibility Toggles)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              কোনো সেকশন সাময়িকভাবে বন্ধ বা চালু করতে নিচের সুইচগুলোতে ক্লিক করুন
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'hero', title: '১. প্রধান হিরো ব্যানার সেকশন', desc: 'শীর্ষ ব্যানার, স্লোগান, রিবন এবং অ্যাকশন বাটন' },
              { id: 'leadership', title: '২. কেন্দ্রীয় কার্যনির্বাহী পরিষদ (শীর্ষ নেতৃত্ব)', desc: 'দলের শীর্ষ যৌথ নেতৃত্ব ও সম্পাদকমণ্ডলীর পরিচিতি' },
              { id: 'secondSection', title: '৩. প্রতিশ্রুতি ও দলের প্রতীক সেকশন', desc: 'একটি নতুন দিনের প্রতিশ্রুতি, সিল ও ভিডিও হাইলাইট' },
              { id: 'preFooterCards', title: '৪. সাংগঠনিক ও প্রকাশনা ৬-কার্ড সেকশন', desc: 'সাংগঠনিক রূপরেখা, নথি, ইভেন্ট, গ্যালারি ও FAQ' },
              { id: 'programs', title: '৫. ১০ দফা কর্মসূচি সেকশন', desc: 'জাতীয় সংস্কার ও উন্নয়নের ১০ দফা রূপরেখা' },
              { id: 'contact', title: '৬. যোগাযোগ ও নাগরিক বার্তা সেকশন', desc: 'কেন্দ্রীয় দপ্তরের ঠিকানা ও নাগরিক বার্তা প্রেরণের ফরম' },
            ].map((sec) => {
              const isVisible = visibility[sec.id as keyof typeof visibility] !== false;
              return (
                <div
                  key={sec.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors bg-slate-50/50"
                >
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                      {sec.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {sec.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSettings({
                      ...settings,
                      sectionVisibility: {
                        ...visibility,
                        [sec.id]: !isVisible
                      }
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      isVisible ? 'bg-[#005a3e]' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isVisible ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#005a3e] hover:bg-[#004731] text-white font-bold text-xs shadow-xs disabled:opacity-50"
            >
              {saving ? 'সংরক্ষণ হচ্ছে...' : 'দৃশ্যমানতা পরিবর্তন সংরক্ষণ করুন'}
            </button>
          </div>
        </form>
      )}

      {/* Reset Defaults Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center font-serif-bn mb-2">
              ডিফল্ট সংস্করণে ফিরিয়ে নিতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 text-center mb-6 leading-relaxed">
              আপনি কি হোমপেজের সমস্ত টেক্সট, স্লোগান, ক্যালিগ্রাফি ও ব্যানার ছবি মূল প্রাথমিক ডিফল্ট সংস্করণে ফিরিয়ে নিতে চান?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={confirmResetDefaults}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm shadow-amber-200"
              >
                হ্যাঁ, রিসেট করুন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
