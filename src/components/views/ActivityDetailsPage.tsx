'use client';

import React from 'react';
import { useMilo } from '@/context/MiloContext';
import { InterestChip } from '../ui/InterestChip';
import { AvatarGroup } from '../ui/AvatarGroup';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  Heart,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ActivityDetailsPage: React.FC = () => {
  const {
    events,
    selectedActivityId,
    navigateTo,
    joinedEventIds,
    savedEventIds,
    toggleSaveEvent,
    openJoinModal,
    leaveEvent,
  } = useMilo();

  const event = events.find((e) => e.id === selectedActivityId) || events[0];

  const isJoined = joinedEventIds.includes(event.id);
  const isSaved = savedEventIds.includes(event.id);
  const spotsLeft = event.totalSpots - event.joinedCount;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('discover')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-milo-orange transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discover</span>
        </button>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
          }}
          className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-milo-orange transition-colors"
          title="Share Event"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Cover Image Banner */}
      <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <InterestChip category={event.category} size="md" interactive={false} />

          <button
            onClick={() => toggleSaveEvent(event.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-black/30 text-white hover:bg-black/50 hover:scale-110'
            }`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
          <span className="text-xs font-bold bg-milo-orange px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
            {event.price === 0 ? 'Free Entry' : `₹${event.price} Entry`}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">{event.title}</h1>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left main details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Key Facts Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-milo-orange font-bold text-xs">
                <MapPin className="w-4 h-4" />
                <span>Location</span>
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-xs truncate">
                {event.location}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">({event.distanceKm} km away)</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-milo-purple font-bold text-xs">
                <Calendar className="w-4 h-4" />
                <span>Date & Time</span>
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-xs truncate">
                {event.date}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">{event.time}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs">
                <Users className="w-4 h-4" />
                <span>Spots Left</span>
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-xs">
                {spotsLeft > 0 ? `${spotsLeft} spots available` : 'Event Full'}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">{event.joinedCount}/{event.totalSpots} joined</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              About This Activity
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {event.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {event.vibes.map((vibe) => (
                <span
                  key={vibe}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold"
                >
                  #{vibe}
                </span>
              ))}
            </div>
          </div>

          {/* Safety Banner */}
          <div className="p-5 rounded-3xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
              <h4 className="font-bold text-sm">MILO Public Venue Guarantee</h4>
              <p className="leading-relaxed font-medium">
                {event.safetyNote}. Zero tolerance for harassment or unsafe behavior. Respect host instructions and venue guidelines.
              </p>
            </div>
          </div>

          {/* Attendees / Participants List */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Participants ({event.participants.length})
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                {spotsLeft} spots remaining
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {event.participants.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-8 h-8 rounded-full object-cover border border-milo-orange/30"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {p.name}
                    </p>
                    {p.isHost && (
                      <span className="text-[10px] font-bold text-milo-orange">Host</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Host Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Event Host
            </span>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.host.avatar}
                alt={event.host.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-milo-orange"
              />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {event.host.name}
                </h4>
                <p className="text-xs text-milo-orange font-semibold">{event.host.role}</p>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 sticky top-24 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-500 font-semibold">Total Price</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {event.price === 0 ? 'Free' : `₹${event.price}`}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-semibold">Status</span>
                <p className="text-xs font-bold text-emerald-500">Confirmed Public Meetup</p>
              </div>
            </div>

            {isJoined ? (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold text-xs text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You have joined this meetup!</span>
                </div>
                <button
                  onClick={() => navigateTo('messages')}
                  className="w-full py-3 rounded-2xl bg-milo-purple hover:bg-indigo-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open Event Group Chat</span>
                </button>
                <button
                  onClick={() => leaveEvent(event.id)}
                  className="w-full py-2 text-xs font-bold text-rose-500 hover:underline text-center"
                >
                  Leave Event
                </button>
              </div>
            ) : (
              <button
                onClick={() => openJoinModal(event)}
                className="w-full py-4 rounded-2xl bg-milo-orange hover:bg-milo-orange-hover text-white font-bold text-sm shadow-xl shadow-milo-orange/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Join Meetup Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
