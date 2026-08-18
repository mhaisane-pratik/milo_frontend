'use client';

import React, { useState } from 'react';
import { useMilo } from '@/context/MiloContext';
import { CategoryType } from '@/lib/types';
import { PUNE_AREAS } from '@/lib/mockData';
import { X, UserCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const EditProfileModal: React.FC = () => {
  const { isEditProfileOpen, setIsEditProfileOpen, user, updateProfile } = useMilo();

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [area, setArea] = useState(user.area);
  const [selectedInterests, setSelectedInterests] = useState<CategoryType[]>(user.interests);

  if (!isEditProfileOpen) return null;

  const toggleInterest = (cat: CategoryType) => {
    setSelectedInterests((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || user.name,
      bio: bio.trim() || user.bio,
      area,
      interests: selectedInterests,
    });
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
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-milo-orange" />
              <span>Edit Profile Details</span>
            </h3>
            <button
              onClick={() => setIsEditProfileOpen(false)}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-milo-orange focus:outline-none"
              />
            </div>

            {/* Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Locality Area in Pune
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-4 py-2.5 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-milo-orange focus:outline-none"
              >
                {PUNE_AREAS.filter((a) => a !== 'All Pune').map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Short Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2.5 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-milo-orange focus:outline-none"
              />
            </div>

            {/* Interests Chips */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Your Preferred Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {(['Coffee', 'Gaming', 'Sports', 'Food', 'Movies', 'Trekking', 'Travel', 'Art', 'Music', 'Technology'] as CategoryType[]).map((cat) => {
                  const isSelected = selectedInterests.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleInterest(cat)}
                      className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                        isSelected
                          ? 'bg-milo-orange text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-milo-orange hover:bg-milo-orange-hover text-white font-bold text-sm shadow-md shadow-milo-orange/20"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
