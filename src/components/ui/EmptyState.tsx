'use client';

import React from 'react';
import { Compass, CalendarX, MessageSquareX, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: 'compass' | 'calendar' | 'message' | 'sparkles';
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'sparkles',
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl bg-slate-50/70 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 my-4">
      <div className="w-16 h-16 rounded-2xl bg-milo-orange-light dark:bg-milo-orange/10 text-milo-orange flex items-center justify-center mb-4 shadow-inner">
        {icon === 'compass' && <Compass className="w-8 h-8" />}
        {icon === 'calendar' && <CalendarX className="w-8 h-8" />}
        {icon === 'message' && <MessageSquareX className="w-8 h-8" />}
        {icon === 'sparkles' && <Sparkles className="w-8 h-8" />}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 rounded-2xl bg-milo-orange hover:bg-milo-orange-hover text-white font-semibold text-sm shadow-md shadow-milo-orange/20 transition-all hover:scale-[1.02]"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
