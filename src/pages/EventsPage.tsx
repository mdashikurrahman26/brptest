import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { getEvents } from '../firebase/services';
import { OrgEvent } from '../types';
import { INITIAL_EVENTS } from '../firebase/seedData';
import { Calendar, Clock, MapPin, Tag, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<OrgEvent[]>(INITIAL_EVENTS);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        if (data && data.length > 0) {
          setEvents(data);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    }
    loadEvents();
  }, []);

  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const pastEvents = events.filter(e => e.status !== 'upcoming');

  const currentList = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb items={[{ label: 'ইভেন্ট ও কর্মসূচি' }]} />

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#003828] to-[#006a4e] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4">
              কর্মসূচি ও সম্মেলন ক্যালেন্ডার
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-bn leading-tight">
              আসন্ন ও বিগত ইভেন্টসমূহ
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              জাতীয় নীতিনির্ধারণী কনভেনশন, নাগরিক সমাবেশ, গোলটেবিল সংলাপ ও আঞ্চলিক কাউন্সিল কর্মসূচি
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#f42a41] opacity-20 blur-xl pointer-events-none" />
        </div>

        {/* Tabs: Upcoming & Past Events */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'upcoming'
                ? 'bg-[#006a4e] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>আসন্ন কর্মসূচি ({upcomingEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-[#006a4e] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>বিগত সম্পন্ন ইভেন্ট ({pastEvents.length})</span>
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {currentList.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row group"
            >
              {/* Event Image */}
              <div className="relative md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-100 flex-shrink-0">
                <img
                  src={evt.coverImage}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded text-xs font-semibold text-white shadow-sm ${
                    evt.status === 'upcoming' ? 'bg-[#006a4e]' : 'bg-slate-700'
                  }`}>
                    {evt.category || (evt.status === 'upcoming' ? 'আসন্ন' : 'সম্পন্ন')}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="space-y-1.5 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                      <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{evt.location}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#006a4e] transition-colors leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  {evt.registrationOpen ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      সবার জন্য উন্মুক্ত
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">
                      সংরক্ষিত আসন
                    </span>
                  )}

                  <Link
                    to="/contact"
                    className="text-xs font-semibold text-[#006a4e] hover:underline"
                  >
                    যোগাযোগ / আসন তথ্য →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {currentList.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 mb-16">
            <p className="text-slate-600 font-medium">কোনো ইভেন্ট পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400 mt-1">অন্য ট্যাব নির্বাচন করে পরীক্ষা করুন</p>
          </div>
        )}

      </div>
    </div>
  );
};
