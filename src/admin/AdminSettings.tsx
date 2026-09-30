import React, { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings } from '../firebase/services';
import { SiteSettings } from '../types';
import { INITIAL_SITE_SETTINGS } from '../firebase/seedData';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSiteSettings(settings);
      setFeedback('সাইট সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
      setFeedback('সেটিংস সংরক্ষণে সমস্যা হয়েছে।');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-serif-bn">
          সাইট ও প্রাতিষ্ঠানিক সেটিংস
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          হোমপেজের মূল হেডার, স্লোগান, দপ্তর ঠিকানা ও যোগাযোগের তথ্যায়ন পরিবর্তন
        </p>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold animate-fadeIn flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        
        {/* Branding */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-800 mb-3 border-b border-slate-100 pb-2">
            দলের নাম ও স্লোগান
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">দলের নাম (বাংলা)</label>
              <input
                type="text"
                required
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">দলের নাম (ইংরেজি)</label>
              <input
                type="text"
                value={settings.siteNameEn}
                onChange={(e) => setSettings({ ...settings, siteNameEn: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">মূল নীতিবাক্য / স্লোগান</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
            />
          </div>
        </div>

        {/* Hero Section Banner Texts */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-800 mb-3 border-b border-slate-100 pb-2">
            হোমপেজ হিরো ব্যানার
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">হিরো শিরোনাম (Hero Title)</label>
            <textarea
              rows={2}
              value={settings.heroTitle}
              onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
            />
          </div>

          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">হিরো বিবরণ (Hero Description)</label>
            <textarea
              rows={3}
              value={settings.heroDescription}
              onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-800 mb-3 border-b border-slate-100 pb-2">
            দপ্তর ও প্রাতিষ্ঠানিক যোগাযোগ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">কেন্দ্রীয় ইমেইল</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">টেলিফোন নম্বর</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">কেন্দ্রীয় কার্যালয়ের ঠিকানা</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
            />
          </div>
        </div>

        {/* Footer Text */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-800 mb-3 border-b border-slate-100 pb-2">
            ফুটার কপিরাইট ও প্রাতিষ্ঠানিক বার্তা
          </h3>
          <textarea
            rows={2}
            value={settings.footerText}
            onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 outline-none"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'সেটিংস সংরক্ষণ করুন'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
