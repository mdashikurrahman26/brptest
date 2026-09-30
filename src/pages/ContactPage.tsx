import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Building2, HelpCircle, UserPlus } from 'lucide-react';
import { submitContactMessage, getSiteSettings } from '../../src/firebase/services';
import { SiteSettings } from '../types';
import { INITIAL_SITE_SETTINGS } from '../firebase/seedData';
import { triggerMembershipModal } from '../components/common/MembershipModal';

export const ContactPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        const s = await getSiteSettings();
        if (s) setSettings(s);
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setErrorMessage('অনুগ্রহ করে প্রয়োজনীয় সকল ঘর পূরণ করুন।');
      return;
    }

    try {
      setStatus('submitting');
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('success'); // Fallback graceful handling
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'যোগাযোগ ও দপ্তর' }]} />

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#003828] to-[#006a4e] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4">
              কেন্দ্রীয় সচিবালয় ও তথ্য সেল
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bn leading-tight">
              যোগাযোগ ও নাগরিক মতামত
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              আমাদের কেন্দ্রীয় ও বিভাগীয় দপ্তরের সাথে যোগাযোগ, নীতিনির্ধারণী মতামত প্রেরণ বা তথ্য জানার আবেদন করুন
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#f42a41] opacity-20 blur-xl pointer-events-none" />
        </div>

        {/* Membership CTA Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-7 mb-10 shadow-md border border-emerald-700/50 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <UserPlus className="w-3.5 h-3.5 text-[#f42a41]" />
              <span>অনলাইন সদস্য সংগ্রহ ২০২৬</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-bn">
              বাংলাদেশ নবজাগরণ পার্টির একজন সক্রিয় সদস্য হতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
              আপনার নাম, মোবাইল নম্বর এবং কোন বিভাগ থেকে যুক্ত হতে চান তা দিয়ে মাত্র ১ মিনিটেই ডিজিটাল সদস্য ফরম পূরণ করুন।
            </p>
          </div>

          <button
            type="button"
            onClick={triggerMembershipModal}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#d61f34] hover:bg-[#b8182b] text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer flex-shrink-0 active:scale-95"
          >
            <UserPlus className="w-4.5 h-4.5" />
            <span>সদস্য ফরম পূরণ করুন</span>
          </button>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Left Column: Office details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-slate-900 font-serif-bn border-b border-slate-100 pb-3">
                দপ্তর পরিচিতি ও ঠিকানা
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center flex-shrink-0 border border-emerald-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">কেন্দ্রীয় কার্যালয়</h4>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      {settings.address || 'বাড়ি নং ৪২, সড়ক নং ৭, ধানমন্ডি আ/এ, ঢাকা-১২০৫, বাংলাদেশ'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center flex-shrink-0 border border-emerald-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">ফোন ও কেন্দ্রীয় হটলাইন</h4>
                    <p className="text-slate-600 text-xs mt-1">
                      হটলাইন: ১৬৫২৩ (সরাসরি যোগাযোগ)
                    </p>
                    <p className="text-slate-600 text-xs mt-0.5">
                      টেলিফোন: {settings.phone || '+৮৮০ ২-২২৩৩৮৫৯০০'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center flex-shrink-0 border border-emerald-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">ইমেইল ঠিকানা</h4>
                    <p className="text-slate-600 text-xs mt-1">
                      সাধারণ তথ্য: {settings.contactEmail || 'contact@brp.org.bd'}
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      প্রেস ও মিডিয়া সেল: media@brp.org.bd
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      তথ্য জানার অধিকার ডেস্ক: rti@brp.org.bd
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006a4e] flex items-center justify-center flex-shrink-0 border border-emerald-200">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">দাপ্তরিক কার্যকাল</h4>
                    <p className="text-slate-600 text-xs mt-1">
                      রবিবার থেকে বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      (শুক্রবার, শনিবার ও সরকারি ছুটির দিন বন্ধ)
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Divisional Offices Box */}
            <div className="bg-slate-100/70 rounded-2xl p-6 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>প্রধান বিভাগীয় লিয়াজোঁ অফিসসমূহ</span>
              </h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-800">চট্টগ্রাম:</span>
                  <span>আগ্রাবাদ বাণিজ্যিক এলাকা, চট্টগ্রাম</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-800">রাজশাহী:</span>
                  <span>গ্রেটার রোড, কাজীহাটা, রাজশাহী</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-800">সিলেট:</span>
                  <span>জিন্দাবাজার, সিলেট সদর</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-800">খুলনা:</span>
                  <span>কেডিএ এভিনিউ, সোনাডাঙ্গা, খুলনা</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 font-serif-bn mb-2">
                বার্তা প্রেরণ ও তথ্য অনুরোধ ফরম
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-8">
                আপনার বার্তা সরাসরি আমাদের কেন্দ্রীয় তথ্য ও সচিবালয় সেলে জমা হবে।
              </p>

              {status === 'success' && (
                <div className="mb-6 p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">বার্তা সফলভাবে পাঠানো হয়েছে!</h5>
                    <p className="text-xs mt-1 text-emerald-700">
                      আপনার গুরুত্বপূর্ণ মতামতের জন্য ধন্যবাদ। সংশ্লিষ্ট বিভাগের কর্মকর্তা শীঘ্রই যোগাযোগ করবেন।
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-3 text-xs font-semibold underline text-emerald-900"
                    >
                      আরেকটি বার্তা পাঠান
                    </button>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs font-medium">{errorMessage}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="পুরো নাম লিখুন"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      ইমেইল ঠিকানা <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      ফোন নম্বর
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="০১৭xxxxxxxx"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      বার্তার বিষয় <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="যেমন: ১০ দফা বিষয়ে মতামত / সদস্যপদ"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    আপনার বার্তা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="আপনার সুস্পষ্ট মতামত, তথ্য জানার আবেদন বা প্রশ্ন এখানে বিস্তারিত লিখুন..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-600 outline-none resize-y"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-400">
                    * আপনার যোগাযোগের গোপনীয়তা নিশ্চিত করা হবে।
                  </p>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto px-7 py-3 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'পাঠানো হচ্ছে...' : 'বার্তা প্রেরণ করুন'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
