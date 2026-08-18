'use client';

import React from 'react';

export const ActivityCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 p-4 animate-pulse">
      <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4" />
      <div className="flex justify-between items-center mb-3">
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
      </div>
      <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg mb-2" />
      <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md mb-4" />
      <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-9 w-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    </div>
  );
};

export const ProfileCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 animate-pulse flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 mb-3" />
      <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded-md mb-2" />
      <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
      </div>
      <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />
    </div>
  );
};
