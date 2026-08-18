'use client';

import React from 'react';
import { useMilo } from '@/context/MiloContext';
import { CATEGORY_ICONS, MOCK_PEOPLE } from '@/lib/mockData';
import { CategoryType } from '@/lib/types';
import { ActivityCard } from '../ui/ActivityCard';
import { PeopleCard } from '../ui/PeopleCard';
import { Search, MapPin, Sparkles, ArrowRight, Flame, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const DashboardHome: React.FC = () => {
  const { user, events, selectedArea, navigateTo, setIsCreateModalOpen } = useMilo();

  const categories: CategoryType[] = [
    'Coffee',
    'Gaming',
    'Sports',
    'Food',
    'Movies',
    'Travel',
    'Trekking',
    'Art',
  ];

  // Recommended based on user interests
  const recommendedEvents = events.filter((e) =>
    user.interests.includes(e.category)
  );

  // Nearby sorted by distance
  const nearbyEvents = [...events].sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div className="space-y-8 pb-16">
      {/* Radiant Warm Light Greeting Banner */}
      <div className="bg-gradient-to-r from-milo-orange via-milo-coral to-milo-purple text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-milo-orange/15">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white bg-white/20 px-3.5 py-1 rounded-full inline-block mb-2 backdrop-blur-md">
                📍 {selectedArea}, Pune
              </span>
              <h1 className="text-2xl sm:text-4xl font-black">
                Good morning, {user.name.split(' ')[0]} 👋
              </h1>
              <p className="text-white/90 text-sm font-semibold mt-1">
                Ready to make a plan? Find activities and people nearby today.
              </p>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shadow-lg transition-all hover:scale-105 shrink-0"
            >
              + Create Activity Plan
            </button>
          </div>

          {/* Quick Search */}
          <div
            onClick={() => navigateTo('discover')}
            className="relative flex items-center cursor-pointer pt-2"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-4" />
            <input
              type="text"
              readOnly
              placeholder="What do you want to do today? Search coffee, badminton, movies..."
              className="w-full pl-11 pr-4 py-3.5 text-xs sm:text-sm font-semibold bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder:text-white/70 cursor-pointer hover:bg-white/30 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Quick Activity Categories Horizontal Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Flame className="w-4 h-4 text-milo-orange" />
            <span>Quick Activity Categories</span>
          </h3>
          <button
            onClick={() => navigateTo('discover')}
            className="text-xs font-bold text-milo-orange hover:underline"
          >
            See all
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const meta = CATEGORY_ICONS[cat];
            return (
              <button
                key={cat}
                onClick={() => navigateTo('discover')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-milo-orange transition-all shrink-0 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">{meta.icon}</span>
                <span className="text-xs font-bold text-slate-800">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommended For You */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-milo-orange" />
              <span>Recommended For You</span>
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Based on your interests in Coffee, Gaming, Trekking & Sports
            </p>
          </div>

          <button
            onClick={() => navigateTo('discover')}
            className="text-xs font-bold text-milo-orange hover:underline flex items-center gap-1"
          >
            <span>Explore all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedEvents.slice(0, 3).map((event) => (
            <ActivityCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Nearby Activities */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-milo-purple" />
              <span>Happening Near You</span>
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Activities sorted by distance from {selectedArea}, Pune
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nearbyEvents.slice(0, 4).map((event) => (
            <ActivityCard key={event.id} event={event} horizontal />
          ))}
        </div>
      </div>

      {/* People You May Meet */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>People You May Meet</span>
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Active members in {selectedArea} with shared activity interests (Non-dating focus)
            </p>
          </div>
          <button
            onClick={() => navigateTo('community')}
            className="text-xs font-bold text-milo-orange hover:underline"
          >
            View Community
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_PEOPLE.slice(0, 3).map((person) => (
            <PeopleCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </div>
  );
};
