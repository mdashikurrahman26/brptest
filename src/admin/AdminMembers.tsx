import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, MessageSquare, Phone, Mail, 
  MapPin, CheckCircle, Clock, Trash2, Send, Download, 
  ExternalLink, UserCheck, Shield, ChevronDown, Eye, X, MessageCircle
} from 'lucide-react';
import { 
  getMembers, getMembersSync, updateMemberStatus, 
  deleteMember, deleteAllMembers, addMemberMessageLog 
} from '../firebase/services';
import { PartyMember, MemberMessageLog } from '../types';
import { BANGLADESH_DIVISIONS } from '../components/common/MembershipModal';

export const AdminMembers: React.FC = () => {
  const [members, setMembers] = useState<PartyMember[]>(getMembersSync);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Messaging Modal State
  const [messagingMember, setMessagingMember] = useState<PartyMember | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('welcome');
  const [customMessage, setCustomMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null);

  // Member details preview modal
  const [previewMember, setPreviewMember] = useState<PartyMember | null>(null);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (err) {
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
    const handleFocus = () => {
      fetchMembers();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Update custom message when template changes or member is selected
  useEffect(() => {
    if (!messagingMember) return;

    if (selectedTemplate === 'welcome') {
      setCustomMessage(
        `আসসালামু আলাইকুম ${messagingMember.name} ভাই/বোন,\nবাংলাদেশ নবজাগরণ পার্টি (BRP)-তে সদস্য হিসেবে যোগদানের জন্য আপনাকে আন্তরিক শুভেচ্ছা ও অভিনন্দন।\nআপনার সদস্য আইডি নম্বর: ${messagingMember.memberId}\nবিভাগ: ${messagingMember.division} বিভাগ।\n\nস্বচ্ছ ও তারুণ্যনির্ভর রাজনীতি বিনির্মাণে আপনার সক্রিয় অংশগ্রহণ আমাদের শক্তি। - কেন্দ্রীয় সচিবালয়, BRP`
      );
    } else if (selectedTemplate === 'meeting') {
      setCustomMessage(
        `শ্রদ্ধেয় ${messagingMember.name},\nবাংলাদেশ নবজাগরণ পার্টির ${messagingMember.division} বিভাগীয় সাংগঠনিক সমন্বয় সভা আগামী সপ্তাহে অনুষ্ঠিত হতে যাচ্ছে। উক্ত সভায় আপনার উপস্থিতি ও মূল্যবান পরামর্শ একান্ত কাম্য। বিস্তারিত তথ্য খুব শীঘ্রই জানানো হবে। - সাংগঠনিক উইং, BRP`
      );
    } else if (selectedTemplate === 'program') {
      setCustomMessage(
        `জনাব ${messagingMember.name},\nবাংলাদেশ নবজাগরণ পার্টির নতুন ১০ দফা জাতীয় সংস্কার কর্মসূচি ও রূপরেখা প্রকাশিত হয়েছে। বিস্তারিত জানতে এবং তৃণমূল প্রচারণায় যুক্ত হতে যোগাযোগ করুন। - প্রচার ও তথ্য সেল, BRP`
      );
    }
  }, [selectedTemplate, messagingMember]);

  const handleOpenMessaging = (member: PartyMember) => {
    setMessagingMember(member);
    setSelectedTemplate('welcome');
    setMessageSuccess(null);
  };

  const handleSendMessage = async (channel: 'whatsapp' | 'sms' | 'email' | 'system') => {
    if (!messagingMember || !customMessage.trim()) return;

    setSendingMessage(true);

    try {
      // 1. Log the message into database & state
      await addMemberMessageLog(messagingMember.id, {
        sender: 'কেন্দ্রীয় দপ্তর (অ্যাডমিন)',
        channel,
        message: customMessage.trim()
      });

      // Update local member object
      const newLog: MemberMessageLog = {
        id: `msg-${Date.now()}`,
        sender: 'কেন্দ্রীয় দপ্তর (অ্যাডমিন)',
        channel,
        message: customMessage.trim(),
        sentAt: new Date().toISOString()
      };

      setMembers(prev => prev.map(m => {
        if (m.id === messagingMember.id) {
          const messagesSent = m.messagesSent ? [newLog, ...m.messagesSent] : [newLog];
          return { ...m, messagesSent };
        }
        return m;
      }));

      if (messagingMember) {
        setMessagingMember(prev => prev ? {
          ...prev,
          messagesSent: prev.messagesSent ? [newLog, ...prev.messagesSent] : [newLog]
        } : null);
      }

      setMessageSuccess('বার্তা সফলভাবে রেকর্ড ও প্রেরণ করা হয়েছে!');

      // 2. Trigger external channel if requested
      if (channel === 'whatsapp') {
        const cleanPhone = messagingMember.phone.replace(/[^0-9]/g, '');
        // Ensure Bangladesh country code 88 if not already present
        const phoneWithCountryCode = cleanPhone.startsWith('88') ? cleanPhone : `88${cleanPhone.replace(/^0/, '')}`;
        const encodedText = encodeURIComponent(customMessage.trim());
        window.open(`https://wa.me/${phoneWithCountryCode}?text=${encodedText}`, '_blank');
      } else if (channel === 'sms') {
        window.open(`sms:${messagingMember.phone}?body=${encodeURIComponent(customMessage.trim())}`, '_self');
      } else if (channel === 'email' && messagingMember.email) {
        window.open(`mailto:${messagingMember.email}?subject=${encodeURIComponent('বাংলাদেশ নবজাগরণ পার্টি - সদস্য বার্তা')}&body=${encodeURIComponent(customMessage.trim())}`, '_blank');
      }

    } catch (err) {
      console.error('Error logging message:', err);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleStatusChange = async (memberId: string, newStatus: PartyMember['status']) => {
    try {
      await updateMemberStatus(memberId, newStatus);
      setMembers(prev => prev.map(m => m.id === memberId ? { ...m, status: newStatus } : m));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteMember = async (id: string, name: string) => {
    if (!window.confirm(`আপনি কি নিশ্চিত যে সদস্য "${name}"-কে তালিকা থেকে মুছে ফেলতে চান?`)) return;
    try {
      setMembers(prev => prev.filter(m => m.id !== id));
      if (previewMember?.id === id) setPreviewMember(null);
      if (messagingMember?.id === id) setMessagingMember(null);
      await deleteMember(id);
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  const handleClearAllMembers = async () => {
    if (!window.confirm('আপনি কি নিশ্চিত যে তালিকা থেকে সকল সদস্য/ডেমো তথ্য স্থায়ীভাবে মুছে ফেলতে চান?')) return;
    setLoading(true);
    try {
      setMembers([]);
      if (previewMember) setPreviewMember(null);
      if (messagingMember) setMessagingMember(null);
      await deleteAllMembers();
    } catch (err) {
      console.error('Error clearing all members:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filtered members
  const filteredMembers = members.filter(m => {
    const matchesSearch = 
      !searchTerm ||
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm) ||
      m.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.district && m.district.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDivision = selectedDivision === 'all' || m.division === selectedDivision;
    const matchesStatus = selectedStatus === 'all' || m.status === selectedStatus;

    return matchesSearch && matchesDivision && matchesStatus;
  });

  // Division Statistics
  const divisionCounts: Record<string, number> = {};
  members.forEach(m => {
    divisionCounts[m.division] = (divisionCounts[m.division] || 0) + 1;
  });

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['সদস্য আইডি', 'নাম', 'বিভাগ', 'জেলা', 'উপজেলা', 'মোবাইল', 'ইমেইল', 'পেশা', 'স্ট্যাটাস', 'নিবন্ধনের তারিখ'];
    const rows = filteredMembers.map(m => [
      m.memberId,
      `"${m.name}"`,
      `"${m.division}"`,
      `"${m.district || ''}"`,
      `"${m.upazila || ''}"`,
      `"${m.phone}"`,
      `"${m.email || ''}"`,
      `"${m.occupation || ''}"`,
      `"${m.status}"`,
      `"${new Date(m.createdAt).toLocaleDateString('bn-BD')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `brp-members-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* ================= TOP HEADER & SUMMARY CARDS ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006a4e] animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-bn">
              সদস্য তালিকা ও সরাসরি বার্তা ব্যবস্থাপনা
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ওয়েবসাইট থেকে নিবন্ধিত সকল সদস্যের তথ্য পর্যবেক্ষণ, বিভাগভিত্তিক যাচাই এবং সরাসরি হোয়াটসঅ্যাপ/মেসেজ প্রদান
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {members.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllMembers}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors border border-red-200 disabled:opacity-50 cursor-pointer"
              title="তালিকা থেকে সকল ডেমো/সদস্য তথ্য একসাথে মুছুন"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
              <span>সকল ডেমো মুছুন</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors border border-slate-300"
            title="CSV এক্সপোর্ট করুন"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>এক্সপোর্ট (CSV)</span>
          </button>

          <button
            onClick={fetchMembers}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors border border-emerald-200"
          >
            <span>{loading ? 'রিফ্রেশ হচ্ছে...' : 'রিফ্রেশ করুন'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#006a4e] flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">মোট নিবন্ধিত সদস্য</div>
            <div className="text-2xl font-bold text-slate-900 font-mono">{members.length}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">সক্রিয় / অনুমোদিত</div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {members.filter(m => m.status === 'active' || m.status === 'verified').length}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">যাচাইাধীন আবেদন</div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {members.filter(m => m.status === 'pending').length}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">বার্তা প্রেরিত সদস্য</div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {members.filter(m => m.messagesSent && m.messagesSent.length > 0).length}
            </div>
          </div>
        </div>
      </div>

      {/* Division Badges Filter Quick-Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-700 mr-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-700" />
          বিভাগীয় ফিল্টার:
        </span>
        <button
          onClick={() => setSelectedDivision('all')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
            selectedDivision === 'all'
              ? 'bg-[#006a4e] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          সব বিভাগ ({members.length})
        </button>
        {BANGLADESH_DIVISIONS.map(div => {
          const count = divisionCounts[div] || 0;
          return (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                selectedDivision === div
                  ? 'bg-[#006a4e] text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{div}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedDivision === div ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="নাম, মোবাইল নম্বর, সদস্য আইডি বা জেলা দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:border-emerald-600 outline-none text-slate-700 font-medium"
          >
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="active">সক্রিয় সদস্য</option>
            <option value="verified">যাচাইকৃত (Verified)</option>
            <option value="pending">যাচাইাধীন (Pending)</option>
          </select>
        </div>
      </div>

      {/* ================= MEMBERS TABLE ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredMembers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="font-semibold text-sm">কোনো সদস্য পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400 mt-1">
              অন্য কোনো নাম বা বিভাগ দিয়ে ফিল্টার করুন অথবা নতুন সদস্য নিবন্ধনের অপেক্ষা করুন।
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">সদস্য আইডি ও নাম</th>
                  <th className="py-3 px-4 font-bold">বিভাগ ও এলাকা</th>
                  <th className="py-3 px-4 font-bold">মোবাইল / যোগাযোগ</th>
                  <th className="py-3 px-4 font-bold">পেশা</th>
                  <th className="py-3 px-4 font-bold">স্ট্যাটাস</th>
                  <th className="py-3 px-4 font-bold">বার্তা ইতিহাস</th>
                  <th className="py-3 px-4 font-bold text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* ID & Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#006a4e] flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {member.name.slice(0, 1)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 font-serif-bn text-sm">
                            {member.name}
                          </div>
                          <div className="font-mono text-[10px] text-emerald-800 font-semibold tracking-wide">
                            {member.memberId}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Division & District */}
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                        {member.division} বিভাগ
                      </div>
                      {(member.district || member.upazila) && (
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {[member.upazila, member.district].filter(Boolean).join(', ')}
                        </div>
                      )}
                    </td>

                    {/* Phone & Contact */}
                    <td className="py-3 px-4">
                      <div className="font-mono font-semibold text-slate-900 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{member.phone}</span>
                      </div>
                      {member.email && (
                        <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
                          {member.email}
                        </div>
                      )}
                    </td>

                    {/* Occupation */}
                    <td className="py-3 px-4 text-slate-600">
                      {member.occupation || '—'}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-4">
                      <select
                        value={member.status}
                        onChange={(e) => handleStatusChange(member.id, e.target.value as PartyMember['status'])}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border outline-none cursor-pointer ${
                          member.status === 'active'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : member.status === 'verified'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="active">সক্রিয় সদস্য</option>
                        <option value="verified">যাচাইকৃত (Verified)</option>
                        <option value="pending">যাচাইাধীন (Pending)</option>
                      </select>
                    </td>

                    {/* Message Log Count */}
                    <td className="py-3 px-4">
                      {member.messagesSent && member.messagesSent.length > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                          <MessageSquare className="w-3 h-3" />
                          <span>{member.messagesSent.length}টি বার্তা</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">কোনো বার্তা নেই</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Send Message Button (Green WhatsApp/Chat button) */}
                        <button
                          onClick={() => handleOpenMessaging(member)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#006a4e] hover:bg-[#005a3e] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                          title="সদস্যকে বার্তা পাঠান"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>বার্তা পাঠান</span>
                        </button>

                        {/* View Details */}
                        <button
                          onClick={() => setPreviewMember(member)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="বিস্তারিত প্রোফাইল দেখুন"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteMember(member.id, member.name)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= MESSAGING MODAL ================= */}
      {messagingMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div 
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#003828] text-white p-5 flex items-center justify-between border-b border-emerald-900">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-800 text-emerald-100 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base font-serif-bn leading-tight">
                    সদস্যকে বার্তা পাঠান: {messagingMember.name}
                  </h3>
                  <div className="text-[11px] text-emerald-300">
                    আইডি: {messagingMember.memberId} • {messagingMember.division} বিভাগ • মোবাইল: {messagingMember.phone}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMessagingMember(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {messageSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{messageSuccess}</span>
                </div>
              )}

              {/* Message Templates Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  বার্তা টেমপ্লেট নির্বাচন করুন
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate('welcome')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      selectedTemplate === 'welcome'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    স্বাগতম ও অভিনন্দন
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate('meeting')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      selectedTemplate === 'meeting'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    বিভাগীয় সভার নোটিশ
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate('program')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      selectedTemplate === 'program'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    ১০ দফা রূপরেখা
                  </button>
                </div>
              </div>

              {/* Message Content Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  বার্তার বিষয়বস্তু (প্রয়োজনে এডিট করুন)
                </label>
                <textarea
                  rows={5}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-emerald-600 outline-none leading-relaxed"
                />
              </div>

              {/* Multi-channel Delivery Buttons */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold text-slate-700">
                  সরাসরি বার্তা পাঠানোর মাধ্যম:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* 1. WhatsApp Button */}
                  <button
                    type="button"
                    disabled={sendingMessage}
                    onClick={() => handleSendMessage('whatsapp')}
                    className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp এ সরাসরি পাঠান</span>
                  </button>

                  {/* 2. SMS Button */}
                  <button
                    type="button"
                    disabled={sendingMessage}
                    onClick={() => handleSendMessage('sms')}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>মোবাইল SMS / কল</span>
                  </button>
                </div>

                <div className="flex gap-2 pt-1">
                  {/* In-app log only */}
                  <button
                    type="button"
                    disabled={sendingMessage}
                    onClick={() => handleSendMessage('system')}
                    className="flex-1 py-2 px-3 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    অভ্যন্তরীণ রেকর্ড হিসেবে সংরক্ষণ করুন
                  </button>

                  {messagingMember.email && (
                    <button
                      type="button"
                      disabled={sendingMessage}
                      onClick={() => handleSendMessage('email')}
                      className="py-2 px-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold transition-colors"
                    >
                      ইমেইল পাঠান
                    </button>
                  )}
                </div>
              </div>

              {/* Past Messages History Log */}
              {messagingMember.messagesSent && messagingMember.messagesSent.length > 0 && (
                <div className="border-t border-slate-200 pt-4 mt-4">
                  <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                    পূর্বে প্রেরিত বার্তার ইতিহাস ({messagingMember.messagesSent.length})
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {messagingMember.messagesSent.map((log) => (
                      <div key={log.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                          <span className="font-semibold text-emerald-800 uppercase">{log.channel}</span>
                          <span>{new Date(log.sentAt).toLocaleString('bn-BD')}</span>
                        </div>
                        <p className="text-slate-800 text-[11px] leading-relaxed whitespace-pre-wrap">
                          {log.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ================= MEMBER PREVIEW MODAL ================= */}
      {previewMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div 
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#003828] to-[#005a3e] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-300">সদস্য পরিচিতি বিবরণ</span>
                <h3 className="text-lg font-bold font-serif-bn">{previewMember.name}</h3>
              </div>
              <button
                onClick={() => setPreviewMember(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-slate-400 text-xs block">সদস্য আইডি</span>
                  <span className="font-mono font-bold text-emerald-800">{previewMember.memberId}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">স্ট্যাটাস</span>
                  <span className="font-bold text-emerald-700 capitalize">{previewMember.status}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-xs block">বিভাগ ও এলাকা</span>
                <span className="font-semibold text-slate-800">
                  {previewMember.division} বিভাগ
                  {previewMember.district ? `, ${previewMember.district}` : ''}
                  {previewMember.upazila ? ` (${previewMember.upazila})` : ''}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-xs block">মোবাইল নম্বর</span>
                <span className="font-mono font-bold text-slate-900">{previewMember.phone}</span>
              </div>

              {previewMember.email && (
                <div>
                  <span className="text-slate-400 text-xs block">ইমেইল</span>
                  <span className="text-slate-800">{previewMember.email}</span>
                </div>
              )}

              {previewMember.occupation && (
                <div>
                  <span className="text-slate-400 text-xs block">পেশা</span>
                  <span className="text-slate-800">{previewMember.occupation}</span>
                </div>
              )}

              {previewMember.notes && (
                <div>
                  <span className="text-slate-400 text-xs block">মন্তব্য / প্রস্তাবনা</span>
                  <p className="p-2.5 bg-slate-50 rounded-lg text-slate-700 text-xs italic">
                    "{previewMember.notes}"
                  </p>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const m = previewMember;
                    setPreviewMember(null);
                    handleOpenMessaging(m);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#006a4e] text-white text-xs font-bold hover:bg-[#005a3e] transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>বার্তা পাঠান</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMember(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
