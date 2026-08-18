'use client';

import React from 'react';
import { CategoryType } from '@/lib/types';
import { CATEGORY_ICONS } from '@/lib/mockData';

interface InterestChipProps {
  category: CategoryType;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const InterestChip: React.FC<InterestChipProps> = ({
  category,
  selected = false,
  onClick,
  size = 'md',
  interactive = true,
}) => {
  const meta = CATEGORY_ICONS[category] || { icon: '✨', bg: 'bg-slate-100', text: 'text-slate-800' };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5 rounded-full',
    md: 'px-3.5 py-1.5 text-sm gap-2 rounded-full',
    lg: 'px-4 py-2 text-base gap-2.5 rounded-2xl',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      className={`inline-flex items-center font-medium transition-all duration-200 select-none ${
        sizeClasses[size]
      } ${
        selected
          ? 'bg-milo-orange text-white shadow-md shadow-milo-orange/20 scale-[1.02]'
          : `${meta.bg} ${meta.text} hover:opacity-90 hover:scale-[1.02]`
      } ${!interactive ? 'cursor-default hover:scale-100' : 'cursor-pointer'}`}
    >
      <span>{meta.icon}</span>
      <span>{category}</span>
    </button>
  );
};
