import React from 'react';

interface FlagBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FlagBadge: React.FC<FlagBadgeProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
  }[size];

  return (
    <div className={`relative flex items-center justify-center rounded-full bg-[#006a4e] text-white shadow-md flex-shrink-0 ${sizeClasses} ${className}`}>
      {/* Inner red circle inspired by Bangladesh flag */}
      <div className="absolute w-[54%] h-[54%] rounded-full bg-[#f42a41] shadow-inner flex items-center justify-center">
        {/* Subtle star or sun motif */}
        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-85" />
      </div>
    </div>
  );
};
