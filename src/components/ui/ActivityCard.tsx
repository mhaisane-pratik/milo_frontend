'use client';

import React from 'react';
import { ActivityEvent } from '@/lib/types';
import { useMilo } from '@/context/MiloContext';
import { AvatarGroup } from './AvatarGroup';
import { InterestChip } from './InterestChip';
import { MapPin, Calendar, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ActivityCardProps {
  event: ActivityEvent;
  horizontal?: boolean;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ event, horizontal = false }) => {
  const { navigateTo, joinedEventIds, savedEventIds, toggleSaveEvent, openJoinModal } = useMilo();

  const isJoined = joinedEventIds.includes(event.id);
  const isSaved = savedEventIds.includes(event.id);
  const spotsLeft = event.totalSpots - event.joinedCount;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-card-soft hover:shadow-card-hover transition-all flex ${
        horizontal ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      {/* Cover Image Container */}
      <div className={`relative overflow-hidden ${horizontal ? 'sm:w-2/5 h-52 sm:h-auto' : 'h-52 w-full'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
          <InterestChip category={event.category} size="sm" interactive={false} />
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveEvent(event.id);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-black/30 text-white hover:bg-black/50 hover:scale-110'
            }`}

          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Public Venue</span>
        </div>
      </div>

      {/* Content Container */}
      <div className={`p-5 flex flex-col justify-between flex-1 ${horizontal ? 'sm:w-3/5' : ''}`}>
        <div>
          {/* Header info */}
          <div className="flex justify-between items-start mb-2">
            <h3 
              onClick={() => navigateTo('activity-detail', event.id)}
              className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-milo-orange transition-colors cursor-pointer line-clamp-1"
            >
              {event.title}
            </h3>
          </div>

          {/* Location & Time */}
          <div className="space-y-1.5 mb-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-milo-orange shrink-0" />
              <span className="truncate">{event.location}</span>
              <span className="text-slate-400 text-[11px]">({event.distanceKm} km away)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-milo-purple shrink-0" />
              <span>{event.date} • {event.time}</span>
            </div>
          </div>
        </div>

        {/* Footer Details */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AvatarGroup participants={event.participants} maxDisplay={3} size="sm" />
            <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span className="text-slate-900 dark:text-white font-bold">{event.joinedCount}</span>/{event.totalSpots} joined
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
              {event.price === 0 ? '₹0 Entry' : `₹${event.price}`}
            </span>

            {isJoined ? (
              <button
                onClick={() => navigateTo('activity-detail', event.id)}
                className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1 hover:bg-emerald-500/20 transition-all"
              >
                Joined ✓
              </button>
            ) : (
              <button
                onClick={() => openJoinModal(event)}
                className="px-3.5 py-1.5 rounded-full bg-milo-orange hover:bg-milo-orange-hover text-white font-semibold text-xs shadow-sm shadow-milo-orange/20 transition-all flex items-center gap-1 group/btn"
              >
                <span>Join</span>
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
