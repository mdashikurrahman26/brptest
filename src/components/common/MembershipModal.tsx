import React, { useState, useEffect } from 'react';
import { X, UserPlus, CheckCircle2, ShieldCheck, Phone, MapPin, Briefcase, Mail, FileText, ArrowRight, Printer } from 'lucide-react';
import { FlagBadge } from './FlagBadge';
import { registerMember } from '../../firebase/services';
import { PartyMember } from '../../types';

export const BANGLADESH_DIVISIONS = [
  'ঢাকা',
  'চট্টগ্রাম',
  'রাজশাহী',
  'খুলনা',
  'বরিশাল',
  'সিলেট',
  'রংপুর',
  'ময়মনসিংহ'
];

// Helper to trigger the modal globally from any link or button
export function triggerMembershipModal() {
  window.dispatchEvent(new CustomEvent('open-brp-membership-modal'));
}

export const MembershipModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    division: 'ঢাকা',
    district: '',
    upazila: '',
    phone: '',
    email: '',
    occupation: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdMember, setCreatedMember] = useState<PartyMember | null>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setError(null);
    };

    window.addEventListener('open-brp-membership-modal', handleOpen);

    // Also check for hash #join or query ?join=true
    if (window.location.hash === '#join' || window.location.search.includes('join=true')) {
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener('open-brp-membership-modal', handleOpen);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setError(null);
      if (createdMember) {
        setCreatedMember(null);
        setFormData({
          name: '',
          division: 'ঢাকা',
          district: '',
          upazila: '',
          phone: '',
          email: '',
          occupation: '',
          notes: ''
        });
      }
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।');
      return;
    }
    if (!formData.phone.trim()) {
      setError('অনুগ্রহ করে যোগাযোগের জন্য মোবাইল / হোয়াটসঅ্যাপ নম্বর প্রদান করুন।');
      return;
    }
    if (!formData.division) {
      setError('অনুগ্রহ করে আপনার বিভাগ নির্বাচন করুন।');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const member = await registerMember({
        name: formData.name,
        division: formData.division,
        district: formData.district,
        upazila: formData.upazila,
        phone: formData.phone,
        email: formData.email,
        occupation: formData.occupation,
        notes: formData.notes
      });
      setCreatedMember(member);
    } catch (err) {
      console.error('Membership registration error:', err);
      setError('নিবন্ধন সম্পন্ন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#003828] via-[#005a3e] to-[#003828] text-white p-5 sm:p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <FlagBadge size="sm" />
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/80 text-emerald-200 text-[10px] font-bold tracking-wide border border-emerald-500/30 uppercase">
              সদস্য নিবন্ধন • ২০২৬
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-serif-bn tracking-tight text-white">
            বাংলাদেশ নবজাগরণ পার্টিতে সদস্য হোন
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-md font-normal leading-relaxed">
            স্বচ্ছ রাজনীতি, জনকল্যাণমুখী সংস্কার ও মানবিক সমাজ বিনির্মাণে আপনার নাম ও বিভাগ যুক্ত করে দলের সক্রিয় অংশীদার হোন।
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-7 max-h-[88vh] overflow-y-auto">
          {createdMember ? (
            /* ================= SUCCESS & DIGITAL MEMBERSHIP CARD ================= */
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-[#006a4e] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-bn">
                  অভিনন্দন, {createdMember.name}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  আপনি সফলভাবে বাংলাদেশ নবজাগরণ পার্টির নিবন্ধিত সদস্য হিসেবে অন্তর্ভুক্ত হয়েছেন।
                </p>
              </div>

              {/* Digital Membership Card Preview */}
              <div className="bg-gradient-to-br from-[#003828] to-[#005a3e] text-white rounded-2xl p-5 sm:p-6 text-left shadow-lg border border-emerald-600/40 relative overflow-hidden">
                {/* Background watermark badge */}
                <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
                  <ShieldCheck className="w-48 h-48 text-white" />
                </div>

                <div className="flex justify-between items-start border-b border-emerald-700/60 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <FlagBadge size="sm" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                        বাংলাদেশ নবজাগরণ পার্টি (BRP)
                      </div>
                      <div className="text-[10px] text-emerald-300/80">ডিজিটাল সদস্য পরিচয়পত্র</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f42a41] text-white text-[10px] font-bold shadow-xs">
                    সক্রিয় সদস্য
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-emerald-300 block">সদস্যের নাম</span>
                    <span className="font-bold text-sm sm:text-base text-white font-serif-bn">
                      {createdMember.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-300 block">সদস্য আইডি নম্বর</span>
                    <span className="font-mono font-bold text-sm sm:text-base text-amber-300">
                      {createdMember.memberId}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-300 block">কার্যকর বিভাগ</span>
                    <span className="font-bold text-white">
                      {createdMember.division} বিভাগ
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-300 block">মোবাইল নম্বর</span>
                    <span className="font-medium text-emerald-100">
                      {createdMember.phone}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-700/60 flex items-center justify-between text-[10px] text-emerald-200/80">
                  <span>নিবন্ধন তারিখ: {new Date(createdMember.createdAt).toLocaleDateString('bn-BD')}</span>
                  <span className="font-semibold text-emerald-300">কেন্দ্রীয় সাংগঠনিক উইং</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 text-left flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <p>
                  আপনার তথ্য আমাদের কেন্দ্রীয় অ্যাডমিন প্যানেলে সংরক্ষিত হয়েছে। বিভাগীয় সাংগঠনিক সমন্বয়কারী খুব শীঘ্রই আপনার সাথে হোয়াটসঅ্যাপ বা ফোনে যোগাযোগ করবেন।
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>কার্ড প্রিন্ট / সেভ করুন</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#006a4e] hover:bg-[#005a3e] text-white text-xs sm:text-sm font-bold shadow-md transition-all"
                >
                  <span>সম্পন্ন করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* ================= REGISTRATION FORM ================= */
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                  {error}
                </div>
              )}

              {/* ১. পূর্ণ নাম */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: মো. কামরুল হাসান"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>

              {/* ২. বিভাগ নির্বাচন */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>কোন বিভাগ থেকে সদস্য হতে চাচ্ছেন? <span className="text-red-500">*</span></span>
                  <span className="text-[11px] text-emerald-700 font-normal">৮টি প্রশাসনিক বিভাগ</span>
                </label>
                <select
                  required
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium text-slate-800"
                >
                  {BANGLADESH_DIVISIONS.map((div) => (
                    <option key={div} value={div}>
                      {div} বিভাগ
                    </option>
                  ))}
                </select>
              </div>

              {/* ৩. মোবাইল / হোয়াটসঅ্যাপ নম্বর */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>মোবাইল / হোয়াটসঅ্যাপ নম্বর <span className="text-red-500">*</span></span>
                  <span className="text-[11px] text-slate-500 font-normal">যোগাযোগ ও বার্তা প্রাপ্তির জন্য</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4 text-emerald-600" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="০১৭১১-XXXXXX"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* ৪. জেলা / থানা ও পেশা (২ কলাম) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    জেলা / উপজেলা (ঐচ্ছিক)
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="যেমন: ধানমন্ডি, ঢাকা"
                      className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-emerald-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    পেশা / কর্মসংস্থান (ঐচ্ছিক)
                  </label>
                  <div className="relative">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      placeholder="যেমন: শিক্ষক, আইনজীবী, ছাত্র"
                      className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-emerald-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* ৫. ইমেইল (ঐচ্ছিক) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ইমেইল অ্যাড্রেস (ঐচ্ছিক)
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@gmail.com"
                    className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-emerald-600 outline-none"
                  />
                </div>
              </div>

              {/* ৬. মন্তব্য / বার্তা */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  কেন যুক্ত হতে চান / দলীয় প্রস্তাবনা (ঐচ্ছিক)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="আপনার কোনো বার্তা বা আগ্রহের ক্ষেত্র থাকলে লিখুন..."
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-emerald-600 outline-none resize-none"
                />
              </div>

              {/* সাবমিট বাটন */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#006a4e] to-[#005a3e] hover:from-[#005a3e] hover:to-[#004731] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                >
                  <UserPlus className="w-4.5 h-4.5" />
                  <span>{loading ? 'তথ্য সংরক্ষণ করা হচ্ছে...' : 'সদস্য ফরম জমা দিন'}</span>
                </button>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  ফরম সাবমিট করার সাথে সাথেই আপনি বাংলাদেশ নবজাগরণ পার্টির নিবন্ধিত সদস্য হবেন।
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
