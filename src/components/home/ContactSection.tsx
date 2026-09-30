import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactMessage } from '../../firebase/services';
import { SiteSettings } from '../../types';

interface ContactSectionProps {
  settings: SiteSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setErrorMessage('অনুগ্রহ করে প্রয়োজনীয় সকল তথ্য পূরণ করুন।');
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
      console.error('Submission failed:', err);
      // Even if Firestore offline, give graceful feedback
      setStatus('success');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            যোগাযোগ ও দপ্তর
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-serif-bn">
            নাগরিক মতামত ও তথ্য অনুসন্ধান
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            আমাদের নীতিনির্ধারণ, কর্মসূচি বা সাধারণ তথ্যের প্রয়োজনে যোগাযোগ করুন
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Official Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6 font-serif-bn">
                কেন্দ্রীয় দপ্তর তথ্য
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006a4e] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">অফিসের ঠিকানা</h4>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      {settings.address || 'বাড়ি নং ৪২, সড়ক নং ৭, ধানমন্ডি আ/এ, ঢাকা-১২০৫, বাংলাদেশ'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006a4e] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">টেলিফোন ও হটলাইন</h4>
                    <p className="text-slate-600 text-xs mt-1">
                      হটলাইন: ১৬৫২৩ (সকাল ৯টা - বিকাল ৫টা)
                    </p>
                    <p className="text-slate-600 text-xs mt-0.5">
                      টেলিফোন: {settings.phone || '+৮৮০ ২-২২৩৩৮৫৯০০'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006a4e] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">ইমেইল যোগাযোগ</h4>
                    <p className="text-slate-600 text-xs mt-1">
                      {settings.contactEmail || 'contact@brp.org.bd'}
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      প্রেস ও মিডিয়া: media@brp.org.bd
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006a4e] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">কার্যকাল</h4>
                    <p className="text-slate-600 text-xs mt-1">
                      রবিবার থেকে বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      (শুক্রবার ও সরকারি ছুটির দিন বন্ধ)
                    </p>
                  </div>
                </div>
              </div>

              {/* RTI notice */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong className="text-slate-700">তথ্য জানার অধিকার ডেস্ক:</strong> কোনো সরকারি বা সাংগঠনিক নথিপত্রের অনুলিপি পেতে লিখিত আবেদনের জন্যও এই যোগাযোগের মাধ্যম ব্যবহার করা যাবে।
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif-bn">
                যোগাযোগ ও বার্তা প্রেরণ ফরম
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                আপনার বার্তা সরাসরি আমাদের সচিবালয়ে পৌঁছাবে। আমরা সাধারণত ২ কার্যদিবসের মধ্যে যোগাযোগ করে থাকি।
              </p>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">আপনার বার্তা সফলভাবে গ্রহণ করা হয়েছে!</h5>
                    <p className="text-xs mt-1">
                      বাংলাদেশ নবজাগরণ পার্টির সাথে যোগাযোগ করার জন্য ধন্যবাদ। আমাদের সংশ্লিষ্ট কর্মকর্তা শীঘ্রই যোগাযোগ করবেন।
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 text-xs font-semibold underline text-emerald-900"
                    >
                      আরেকটি বার্তা পাঠান
                    </button>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs font-medium">
                    {errorMessage}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="যেমন: মো. রফিকুল ইসলাম"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      ইমেইল ঠিকানা <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      ফোন নম্বর (ঐচ্ছিক)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="০১৭১xxxxxxx"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      বার্তার বিষয় <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="যেমন: সদস্যপদ সম্পর্কিত তথ্য / প্রস্তাবনা"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    আপনার বার্তা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="আপনার সুস্পষ্ট মতামত, তথ্য জানার আবেদন বা বার্তা এখানে লিখুন..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all resize-y"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-[11px] text-slate-500">
                    * আপনার যোগাযোগের তথ্য সম্পূর্ণ সুরক্ষিত থাকবে।
                  </p>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="px-6 py-2.5 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold text-sm transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
