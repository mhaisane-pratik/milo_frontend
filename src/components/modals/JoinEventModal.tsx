'use client';

import React, { useState } from 'react';
import { useMilo } from '@/context/MiloContext';
import { X, Calendar, MapPin, ShieldCheck, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const JoinEventModal: React.FC = () => {
  const { isJoinModalOpen, setIsJoinModalOpen, eventToJoin, confirmJoinSpot } = useMilo();
  const [agreed, setAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isJoinModalOpen || !eventToJoin) return null;

  const handleConfirm = () => {
    if (!agreed) return;

    // Fire celebration confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF5722', '#FF4081', '#6366F1', '#10B981'],
    });

    setShowSuccess(true);
    confirmJoinSpot(eventToJoin.id);

    setTimeout(() => {
      setShowSuccess(false);
      setIsJoinModalOpen(false);
      setAgreed(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800"
        >
          {/* Close button */}
          <button
            onClick={() => {
              setIsJoinModalOpen(false);
              setAgreed(false);
              setShowSuccess(false);
            }}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {showSuccess ? (
            <div className="p-10 flex flex-col items-center text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                🎉 You’re in!
              </h3>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                See you there at <span className="text-milo-orange font-bold">{eventToJoin.location}</span>.
              </p>
              <div className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
                Check your event group chat under Messages to coordinate!
              </div>
            </div>
          ) : (
            <div>
              {/* Header Image banner */}
              <div className="relative h-44 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={eventToJoin.image}
                  alt={eventToJoin.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider bg-milo-orange px-2.5 py-0.5 rounded-full mb-1.5 inline-block">
                    {eventToJoin.category}
                  </span>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {eventToJoin.title}
                  </h3>
                </div>
              </div>

              {/* Event details recap */}
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-milo-purple font-bold mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Date & Time</span>
                    </div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {eventToJoin.date}
                    </p>
                    <p className="text-slate-500 text-[11px]">{eventToJoin.time}</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-milo-orange font-bold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Venue</span>
                    </div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {eventToJoin.location}
                    </p>
                    <p className="text-slate-500 text-[11px]">{eventToJoin.price === 0 ? 'Free Entry' : `₹${eventToJoin.price}`}</p>
                  </div>
                </div>

                {/* Safety & Community Note */}
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                    <span className="font-bold block mb-0.5">MILO Community Safety Reminder</span>
                    Be respectful, arrive on time, communicate in group chat if plans change, and follow safe public venue practices.
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 rounded text-milo-orange focus:ring-milo-orange border-slate-300"
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    I agree to the MILO community guidelines & friendly meetup rules.
                  </span>
                </label>

                {/* CTA Button */}
                <button
                  disabled={!agreed}
                  onClick={handleConfirm}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    agreed
                      ? 'bg-milo-orange hover:bg-milo-orange-hover text-white shadow-milo-orange/25 hover:scale-[1.01]'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm My Spot</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
