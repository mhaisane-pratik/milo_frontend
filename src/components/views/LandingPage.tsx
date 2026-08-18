'use client';

import React from 'react';
import { useMilo } from '@/context/MiloContext';
import { CATEGORY_ICONS } from '@/lib/mockData';
import { ActivityCard } from '../ui/ActivityCard';
import { Navbar } from '../layout/Navbar';
import { Footer } from '../layout/Footer';
import { CategoryType } from '@/lib/types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  MapPin,
  CheckCircle,
  Coffee,
  Heart,
  Smile,
  Zap,
  Lock,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const { navigateTo, events, setIsLoginModalOpen } = useMilo();

  const categories: { type: CategoryType; label: string; count: string }[] = [
    { type: 'Coffee', label: 'Coffee & Cafes', count: '18 meetups' },
    { type: 'Gaming', label: 'Gaming & Board Games', count: '12 meetups' },
    { type: 'Sports', label: 'Sports & Turf Games', count: '15 meetups' },
    { type: 'Food', label: 'Food Crawls & Dining', count: '22 meetups' },
    { type: 'Movies', label: 'Movies & Multiplex', count: '8 meetups' },
    { type: 'Travel', label: 'Roadtrips & Weekend', count: '6 trips' },
    { type: 'Trekking', label: 'Tekdi Hikes & Outdoor', count: '14 treks' },
    { type: 'Art', label: 'Art Workshops & Jams', count: '9 events' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-slate-900 flex flex-col font-sans selection:bg-milo-orange selection:text-white">
      {/* Sticky Header */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-[#FAFAF9]">
        {/* Soft background glow blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-orange-200/40 to-rose-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm text-xs font-bold text-milo-orange">
                <Sparkles className="w-4 h-4 text-milo-orange" />
                <span>The Anti-Dating Social Platform for Real Plans in Pune</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
                You have a plan.{' '}
                <span className="bg-gradient-to-r from-milo-orange via-milo-coral to-milo-purple bg-clip-text text-transparent">
                  Now find your people.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-semibold leading-relaxed mx-auto lg:mx-0">
                Discover activities, meet like-minded people in Pune, and turn ordinary plans into memorable real-world experiences.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-milo-orange hover:bg-milo-orange-hover text-white font-bold text-base shadow-xl shadow-milo-orange/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-3 group"
                >
                  <span>Find Your People</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigateTo('discover')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-base border border-slate-200/80 shadow-sm transition-all hover:scale-[1.02]"
                >
                  Explore Activities
                </button>
              </div>

              {/* Real people counter strip */}
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
                <div className="flex -space-x-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
                </div>
                <span>Joined by 500+ active members in Pune</span>
              </div>
            </div>

            {/* Hero Right Visual with Floating Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000"
                  alt="Young adults social meetup"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    Real Social Experiences
                  </span>
                  <h3 className="text-xl font-bold">Café Peter Wakad & FC Road Meetups</h3>
                </div>
              </div>

              {/* Floating Live Activity Cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-200/80 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
                  ☕
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">12 people joined</p>
                  <p className="text-slate-500 font-semibold">Coffee Meetup • Wakad</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-200/80 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                  🏸
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">8 people going</p>
                  <p className="text-slate-500 font-semibold">Badminton Smash • Hinjewadi</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-6 left-12 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-200/80 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-lime-100 text-lime-700 flex items-center justify-center font-bold text-lg">
                  🥾
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">23 people exploring</p>
                  <p className="text-slate-500 font-semibold">Vetal Tekdi Trek • Pune</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">
                Built for real connections.
              </h3>
              <p className="text-sm font-semibold text-slate-500">
                Safe public venue meetups with real verified people.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-12">
              <div className="text-center">
                <span className="block text-3xl font-black text-milo-orange">500+</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Members</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-black text-milo-purple">50+</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weekly Activities</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-black text-emerald-500">20+</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Public Venues</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACTIVITY SECTION */}
      <section id="activities" className="py-20 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold text-milo-orange uppercase tracking-widest bg-milo-orange-light px-3.5 py-1 rounded-full">
              Endless Possibilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3">
              What are you up for?
            </h2>
            <p className="text-slate-600 mt-2 font-semibold text-sm">
              From coffee chats in Baner to sunrise tekdi hikes in Kothrud, pick what excites you.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((item) => {
              const meta = CATEGORY_ICONS[item.type];
              return (
                <motion.div
                  key={item.type}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => navigateTo('discover')}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className={`w-14 h-14 rounded-2xl ${meta.bg} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {meta.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-milo-orange transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-1">
                      {item.count}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigateTo('discover')}
              className="inline-flex items-center gap-2 font-bold text-milo-orange hover:text-milo-orange-hover text-sm hover:underline"
            >
              <span>Explore all activities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. HOW MILO WORKS */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-milo-purple uppercase tracking-widest bg-milo-purple-light px-3.5 py-1 rounded-full">
              Simple 3 Step Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3">
              How MILO Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/80 relative space-y-4 shadow-card-soft">
              <span className="text-4xl font-black text-milo-orange opacity-40">01</span>
              <h3 className="text-xl font-bold text-slate-900">
                Pick a plan
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                Choose something you want to do today or this weekend — coffee, badminton, movies, or gaming.
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/80 relative space-y-4 shadow-card-soft">
              <span className="text-4xl font-black text-milo-coral opacity-40">02</span>
              <h3 className="text-xl font-bold text-slate-900">
                Find your people
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                Meet people living nearby in Wakad, Baner, or Hinjewadi who share the exact same interests.
              </p>
            </div>

            <div className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/80 relative space-y-4 shadow-card-soft">
              <span className="text-4xl font-black text-milo-purple opacity-40">03</span>
              <h3 className="text-xl font-bold text-slate-900">
                Go together
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                Join the experience in safe public venues and make real, lasting connections naturally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED EXPERIENCES */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full">
                Happening Soon
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
                Featured Experiences in Pune
              </h2>
            </div>

            <button
              onClick={() => navigateTo('discover')}
              className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200/80 font-bold text-sm text-slate-800 hover:text-milo-orange transition-colors self-start sm:self-auto shadow-sm"
            >
              View All Events
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 6).map((event) => (
              <ActivityCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY SECTION (Vibrant Light Warm Gradient) */}
      <section id="community" className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-white/20 px-3 py-1 rounded-full inline-block">
                  Real Social Life
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  Come alone. Leave with connections.
                </h2>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed font-semibold">
                  “MILO isn't about collecting followers or endless swiping. It's about creating real experiences with real people in your neighborhood.”
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-bold text-base shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
                  >
                    Join the Community
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800"
                    alt="Community meetups"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SAFETY SECTION */}
      <section id="safety" className="py-20 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full">
              Your Peace of Mind First
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3">
              Meet comfortably. Connect confidently.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Public Venues</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                All meetups take place strictly in verified public cafes, turfs, malls, and public trails.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-milo-orange-light text-milo-orange flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Verified Event Hosts</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Event hosts pass identity checks and build reputation through community feedback.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Friendly Group Activities</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Group settings (4-12 people) remove 1-on-1 pressure and foster natural group dynamics.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Report & Block Control</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Zero tolerance for harassment. Instant reporting and blocking tools protect all members.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Clear Event Details</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Every event lists venue, time, estimated cost, and attendee list before you confirm.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Community Guidelines</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Built on respect, punctual attendance, and open inclusion for newcomers in Pune.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIAL SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold text-milo-orange uppercase tracking-widest bg-milo-orange-light px-3.5 py-1 rounded-full">
              Member Stories
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3">
              Loved by members across Pune
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAFAF9] p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-card-soft">
              <p className="text-base text-slate-700 font-semibold italic leading-relaxed">
                “I came alone for a coffee meetup in Wakad and ended up talking to six people. I actually joined the next weekend tekdi hike too!”
              </p>
              <div className="flex items-center gap-3 pt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" alt="Aarav" className="w-11 h-11 rounded-full object-cover border-2 border-milo-orange shadow-sm" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Aarav Mehta, 23</h4>
                  <p className="text-xs text-slate-500 font-semibold">Wakad, Pune</p>
                </div>
              </div>
            </div>

            <div className="bg-[#FAFAF9] p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-card-soft">
              <p className="text-base text-slate-700 font-semibold italic leading-relaxed">
                “As a woman living alone in Baner, safety was my #1 priority. MILO's public venues and verified host badges made me feel completely comfortable.”
              </p>
              <div className="flex items-center gap-3 pt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" alt="Ananya" className="w-11 h-11 rounded-full object-cover border-2 border-milo-orange shadow-sm" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Ananya Deshmukh, 25</h4>
                  <p className="text-xs text-slate-500 font-semibold">Baner, Pune</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-milo-orange via-milo-coral to-milo-purple text-white shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Your next plan is waiting.
          </h2>
          <p className="text-xl text-white/90 font-semibold max-w-xl mx-auto">
            Stop waiting for everyone to be free. Join hundreds of active people in Pune today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-950 font-bold text-base shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
            >
              Join MILO Free
            </button>
            <button
              onClick={() => navigateTo('discover')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-black/20 hover:bg-black/30 text-white font-bold text-base border border-white/30 backdrop-blur-md transition-all hover:scale-105"
            >
              Explore Activities
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
