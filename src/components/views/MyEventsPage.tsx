'use client';

import React, { useState } from 'react';
import { useMilo } from '@/context/MiloContext';
import { ActivityCard } from '../ui/ActivityCard';
import { EmptyState } from '../ui/EmptyState';
import { Calendar, Heart, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const MyEventsPage: React.FC = () => {
  const { events, joinedEventIds, savedEventIds, navigateTo, leaveEvent, addToast } = useMilo();
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past' | 'Saved'>('Upcoming');
  const [ratings, setRatings] = useState<Record<string, number>>({ 'event-past-1': 5 });

  const upcomingEvents = events.filter((e) => joinedEventIds.includes(e.id));
  const savedEvents = events.filter((e) => savedEventIds.includes(e.id));

  const pastEvents = [
    {
      id: 'event-past-1',
      title: 'FC Road Street Food Crawl 🍕',
      date: 'Sunday, 2 Aug',
      location: 'Goodluck Cafe, FC Road, Pune',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
      participantsCount: 10,
    },
    {
      id: 'event-past-2',
      title: 'Sinhagad Fort Sunrise Trek 🥾',
      date: 'Sunday, 26 Jul',
      location: 'Sinhagad Fort Base, Pune',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      participantsCount: 14,
    },
  ];

  const handleStarRating = (eventId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [eventId]: rating }));
    addToast('Feedback Saved', `Thank you for rating this meetup ${rating} stars!`);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          My Events
        </h1>
        <p className="text-sm font-semibold text-slate-500 mt-1">
          Manage your upcoming meetups, review past experiences, and access saved plans.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3">
        {(['Upcoming', 'Past', 'Saved'] as const).map((tab) => {
          const count =
            tab === 'Upcoming'
              ? upcomingEvents.length
              : tab === 'Saved'
              ? savedEvents.length
              : pastEvents.length;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-milo-orange text-white shadow-md shadow-milo-orange/20 scale-105'
                  : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>{tab}</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-black">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === 'Upcoming' && (
        <div>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="relative group">
                  <ActivityCard event={event} />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => leaveEvent(event.id)}
                      className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      Leave Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="calendar"
              title="No upcoming events joined yet"
              description="Browse local meetups in Wakad, Baner, or Hinjewadi and confirm your spot!"
              actionText="Discover Activities"
              onAction={() => navigateTo('discover')}
            />
          )}
        </div>
      )}

      {activeTab === 'Past' && (
        <div className="space-y-4">
          {pastEvents.map((event) => {
            const currentRating = ratings[event.id] || 0;
            return (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {event.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      📍 {event.location} • {event.date}
                    </p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                      Completed • {event.participantsCount} members attended
                    </p>
                  </div>
                </div>

                {/* Rating Bar */}
                <div className="flex flex-col items-center sm:items-end w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 mb-1">
                    Rate your experience
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarRating(event.id, star)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= currentRating
                              ? 'text-amber-400 fill-current'
                              : 'text-slate-300 dark:text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'Saved' && (
        <div>
          {savedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedEvents.map((event) => (
                <ActivityCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="sparkles"
              title="No saved activities yet"
              description="Click the heart icon on any activity card to save it for later!"
              actionText="Explore Activities"
              onAction={() => navigateTo('discover')}
            />
          )}
        </div>
      )}
    </div>
  );
};
