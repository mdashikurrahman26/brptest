import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; path?: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 py-3 mb-6 border-b border-slate-100">
      <Link to="/" className="flex items-center gap-1 hover:text-[#006a4e] transition-colors">
        <Home className="w-3.5 h-3.5 text-slate-400" />
        <span>হোম</span>
      </Link>
      {items.map((it, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          {it.path ? (
            <Link to={it.path} className="hover:text-[#006a4e] transition-colors">
              {it.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-semibold">{it.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
