import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { FAQItem } from '../../types';

interface FaqSectionProps {
  faqs: FAQItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>সচরাচর জিজ্ঞাসা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-serif-bn">
            সাধারণ প্রশ্নোত্তর (FAQ)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            দলীয় আদর্শ, নীতিনির্ধারণ, সদস্যপদ এবং অর্থনৈতিক স্বচ্ছতা সম্পর্কিত সচরাচর প্রশ্নের উত্তর
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.slice(0, 6).map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">
                    {item.question}
                  </span>
                  <div className={`p-1 rounded-full transition-transform duration-200 ${isOpen ? 'rotate-180 bg-emerald-50 text-[#006a4e]' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    <p>{item.answer}</p>
                    {item.category && (
                      <span className="inline-block mt-3 text-[11px] font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        বিষয়: {item.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to /faq */}
        <div className="text-center mt-8">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#006a4e] hover:text-emerald-800 transition-colors"
          >
            <span>সকল প্রশ্নোত্তর দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
