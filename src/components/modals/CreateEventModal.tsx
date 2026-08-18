'use client';

import React, { useState } from 'react';
import { useMilo } from '@/context/MiloContext';
import { CategoryType } from '@/lib/types';
import { PUNE_AREAS } from '@/lib/mockData';
import { X, PlusCircle, Image as ImageIcon, MapPin, Calendar, Users, DollarSign, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESET_IMAGES: Record<string, string> = {
  Coffee: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
  Gaming: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
  Sports: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800',
  Food: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
  Trekking: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
  Movies: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
  Travel: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
  Art: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
};

export const CreateEventModal: React.FC = () => {
  const { isCreateModalOpen, setIsCreateModalOpen, createEvent } = useMilo();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Coffee');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('Wakad');
  const [date, setDate] = useState('Saturday, 22 Aug');
  const [time, setTime] = useState('5:00 PM');
  const [totalSpots, setTotalSpots] = useState(8);
  const [price, setPrice] = useState(0);
  const [customImage, setCustomImage] = useState('');
  const [step, setStep] = useState<1 | 2>(1);

  if (!isCreateModalOpen) return null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) return;

    const chosenImage = customImage.trim() || PRESET_IMAGES[category] || PRESET_IMAGES['Coffee'];

    createEvent({
      title: title.trim(),
      category,
      description: description.trim() || 'Join us for a fun meetup in Pune!',
      location: location.trim(),
      area,
      date,
      time,
      totalSpots: Number(totalSpots),
      price: Number(price),
      image: chosenImage,
    });

    // Reset
    setTitle('');
    setDescription('');
    setLocation('');
    setStep(1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 my-8"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-milo-orange-light dark:bg-milo-orange/10 text-milo-orange flex items-center justify-center">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Create a New MILO Activity
                </h3>
                <p className="text-xs text-slate-500">Host a meetup for fellow members in Pune</p>
              </div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handlePublish} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {step === 1 ? (
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Activity Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saturday Coffee & Board Games ☕"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>

                {/* Category selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(['Coffee', 'Gaming', 'Sports', 'Food', 'Movies', 'Trekking', 'Travel', 'Art'] as CategoryType[]).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          category === cat
                            ? 'bg-milo-orange text-white shadow-md shadow-milo-orange/20 scale-105'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell members what to expect, where you'll sit, or what to bring..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>

                {/* Location & Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Venue Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Café Peter, Wakad, Pune"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Pune Locality Area
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white"
                    >
                      {PUNE_AREAS.filter((a) => a !== 'All Pune').map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Date
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Time
                    </label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Spots & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={30}
                      value={totalSpots}
                      onChange={(e) => setTotalSpots(Number(e.target.value))}
                      className="w-full px-4 py-2.5 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Entry Price (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      placeholder="0 for Free"
                      className="w-full px-4 py-2.5 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!title.trim() || !location.trim()}
                    className="w-full py-3 rounded-2xl bg-milo-orange text-white font-bold text-sm shadow-md hover:bg-milo-orange-hover transition-all"
                  >
                    Next: Custom Banner & Preview →
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Cover Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={customImage}
                    onChange={(e) => setCustomImage(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white mb-2"
                  />
                  <p className="text-[11px] text-slate-400">
                    If empty, a default HD banner for <span className="font-bold text-milo-orange">{category}</span> will be applied automatically.
                  </p>
                </div>

                {/* Preview Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Event Card Live Preview
                  </label>
                  <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="h-36 rounded-2xl overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={customImage.trim() || PRESET_IMAGES[category]}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-milo-orange text-white text-[10px] font-bold">
                        {category}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {title || 'Event Title'}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        📍 {location} ({area}) • {date} at {time}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                        {description || 'Event description preview will appear here.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-2xl bg-milo-orange hover:bg-milo-orange-hover text-white font-bold text-sm shadow-md shadow-milo-orange/20 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Publish Activity</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
