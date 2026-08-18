'use client';

import React from 'react';
import { Participant } from '@/lib/types';

interface AvatarGroupProps {
  participants: Participant[];
  maxDisplay?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  participants,
  maxDisplay = 4,
  size = 'md',
}) => {
  const display = participants.slice(0, maxDisplay);
  const remaining = participants.length - maxDisplay;

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-11 h-11 text-sm',
  };

  const ringOffset = {
    sm: '-ml-2',
    md: '-ml-2.5',
    lg: '-ml-3',
  };

  return (
    <div className="flex items-center">
      {display.map((p, idx) => (
        <div
          key={p.id || idx}
          className={`relative rounded-full ring-2 ring-white dark:ring-slate-900 overflow-hidden ${
            idx > 0 ? ringOffset[size] : ''
          } ${sizeClasses[size]}`}
          title={p.name}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.avatar}
            alt={p.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`relative rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold flex items-center justify-center ${ringOffset[size]} ${sizeClasses[size]}`}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};
