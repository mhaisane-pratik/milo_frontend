'use client';

import React from 'react';
import { UserProfile } from '@/lib/types';
import { InterestChip } from './InterestChip';
import { MapPin, Sparkles, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

interface PeopleCardProps {
  person: UserProfile;
}

export const PeopleCard: React.FC<PeopleCardProps> = ({ person }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-card-soft hover:shadow-card-hover transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-3.5 mb-3">
          <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-milo-orange/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.avatar}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                {person.name}, {person.age}
              </h4>
              {person.isVerified && (
                <span className="w-4 h-4 bg-blue-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold" title="Verified Member">
                  ✓
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              <MapPin className="w-3 h-3 text-milo-orange" />
              <span>{person.area}, Pune</span>
            </div>
          </div>
        </div>

        {person.commonInterests && person.commonInterests > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-milo-orange-light dark:bg-milo-orange/10 text-milo-orange text-xs font-semibold mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{person.commonInterests} common interests</span>
          </div>
        )}

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {person.bio}
        </p>

        {/* Interests */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {person.interests.slice(0, 3).map((cat) => (
            <InterestChip key={cat} category={cat} size="sm" interactive={false} />
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <span>Joined {person.eventsJoinedCount} activities</span>
        <button className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-milo-orange hover:text-milo-orange font-semibold transition-all flex items-center gap-1">
          <UserPlus className="w-3.5 h-3.5" />
          <span>Connect</span>
        </button>
      </div>
    </motion.div>
  );
};
