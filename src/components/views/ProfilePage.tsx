'use client';

import React from 'react';
import { useMilo } from '@/context/MiloContext';
import { InterestChip } from '../ui/InterestChip';
import { ActivityCard } from '../ui/ActivityCard';
import { EditProfileModal } from '../modals/EditProfileModal';
import { MapPin, ShieldCheck, Sparkles, Edit, Calendar, CheckCircle2, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProfilePage: React.FC = () => {
  const { user, setIsEditProfileOpen, events, joinedEventIds } = useMilo();

  const joinedEvents = events.filter((e) => joinedEventIds.includes(e.id));

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-milo-orange shadow-lg shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {user.name}, {user.age}
                </h1>
                {user.isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
                    ✓ Verified Member
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1 text-xs font-bold text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-milo-orange" />
                <span>{user.area}, {user.city}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-md pt-1 leading-relaxed">
                {user.bio}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-milo-orange text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition-all shrink-0 hover:scale-105"
          >
            <Edit className="w-4 h-4 text-milo-orange" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="block text-2xl font-black text-milo-orange">{user.eventsJoinedCount}</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Events Joined</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="block text-2xl font-black text-milo-purple">{user.eventsHostedCount}</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Events Hosted</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="block text-2xl font-black text-emerald-500">{user.connectionsCount}</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Connections</span>
          </div>
        </div>
      </div>

      {/* Interests Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-milo-orange" />
          <span>My Interests & Activities</span>
        </h3>
        <div className="flex flex-wrap gap-2 pt-1">
          {user.interests.map((cat) => (
            <InterestChip key={cat} category={cat} size="md" interactive={false} />
          ))}
        </div>
      </div>

      {/* Upcoming Activities Joined */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-milo-purple" />
          <span>Upcoming Joined Meetups ({joinedEvents.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {joinedEvents.map((event) => (
            <ActivityCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Edit Profile Modal Trigger */}
      <EditProfileModal />
    </div>
  );
};
