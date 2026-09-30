import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, ArrowRight, BookMarked, CheckCircle2 } from 'lucide-react';
import { OrgDocument } from '../../types';

interface DocumentsPreviewProps {
  documents: OrgDocument[];
}

export const DocumentsPreview: React.FC<DocumentsPreviewProps> = ({ documents }) => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
              দলীয় প্রকাশনা ও প্রকাশ্য দলিল
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-serif-bn">
              গঠনতন্ত্র, নীতিপত্র ও প্রকাশনাসমূহ
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              সকল প্রাতিষ্ঠানিক নীতি, অডিট রিপোর্ট ও ১০ দফা রূপরেখার উন্মুক্ত ডাউনলোড কেন্দ্র
            </p>
          </div>

          <Link
            to="/documents"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#006a4e] hover:text-emerald-800 transition-colors"
          >
            <span>সকল নথি ভাণ্ডার</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Documents Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documents.slice(0, 4).map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                    {doc.category}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {doc.fileSize}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-700 mb-3 shadow-xs">
                  <FileText className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#006a4e] transition-colors line-clamp-2 leading-snug">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {doc.fileType} ফরম্যাট
                </span>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white text-xs font-medium transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ডাউনলোড</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
