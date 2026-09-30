import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { OrgEvent } from '../../types';
import { formatBengaliDate } from '../../utils/formatters';

interface EventsPreviewProps {
  events: OrgEvent[];
}

export const EventsPreview: React.FC<EventsPreviewProps> = ({ events }) => {
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);
  const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : events.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
              কর্মসূচি ও সম্মেলন
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-serif-bn">
              আসন্ন ইভেন্ট ও জাতীয় সংলাপ
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              নাগরিক সংলাপ, আঞ্চলিক কাউন্সিল ও জাতীয় সংস্কার সম্মেলন সূচি
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#006a4e] hover:text-emerald-800 transition-colors"
          >
            <span>সকল ইভেন্ট ক্যালেন্ডার</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Event Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
                <img
                  src={evt.coverImage}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded text-xs font-semibold text-white shadow-sm ${
                    evt.status === 'upcoming' ? 'bg-[#006a4e]' : 'bg-slate-600'
                  }`}>
                    {evt.status === 'upcoming' ? 'আসন্ন ইভেন্ট' : 'সম্পন্ন'}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col gap-1.5 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {evt.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {evt.time}
                    </span>
                    <span className="flex items-start gap-1.5 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{evt.location}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#006a4e] transition-colors leading-snug line-clamp-2">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                  <Link
                    to="/events"
                    className="text-xs font-semibold text-[#006a4e] hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>স্থান ও বিবরণ</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  {evt.registrationOpen && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                      উন্মুক্ত অংশগ্রহণ
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
