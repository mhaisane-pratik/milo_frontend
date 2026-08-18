'use client';

import React, { useState } from 'react';
import { useMilo } from '@/context/MiloContext';
import { CategoryType } from '@/lib/types';
import { api } from '@/lib/api';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { navigateTo, addToast } = useMilo();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([
    'Coffee',
    'Gaming',
    'Trekking',
  ]);

  const allCategories: CategoryType[] = [
    'Coffee',
    'Gaming',
    'Sports',
    'Food',
    'Movies',
    'Travel',
    'Trekking',
    'Art',
    'Music',
    'Technology',
  ];

  const toggleCategory = (cat: CategoryType) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    // Send HTTP POST request directly to Neon Cloud PostgreSQL Database!
    await api.register({
      name: fullName,
      email: email.trim(),
      college: 'DY Patil College, Akurdi',
      location: 'Wakad, Pune',
    });

    addToast('Saved to Neon PostgreSQL DB 🐘', `Registered ${fullName} directly into users table!`);
    navigateTo('onboarding');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200/80 dark:border-slate-800 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
          <div
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-milo-orange to-milo-coral flex items-center justify-center text-white font-black text-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">MILO</span>
          </div>

          <button
            onClick={() => navigateTo('login')}
            className="text-xs font-bold text-slate-500 hover:text-milo-orange"
          >
            Already a member? <span className="text-milo-orange font-bold">Log in</span>
          </button>
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Let's get to know you.
          </h2>
          <p className="text-sm font-semibold text-slate-500">
            Create your account. Details are saved directly into the PostgreSQL Database.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                First Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Pratik"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sharma"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white font-bold"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="pratik@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white font-bold"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Password *
            </label>
            <input
              type="password"
              required
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white font-bold"
            />
          </div>

          {/* Interest Chips Section */}
          <div className="pt-2">
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              What are you interested in?
            </label>
            <p className="text-xs text-slate-500 mb-4">
              Select 3 or more activities so we can match you with local meetups.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {allCategories.map((cat) => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-milo-orange text-white shadow-md shadow-milo-orange/20 scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span>{cat}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-milo-orange hover:bg-milo-orange-hover text-white font-bold text-base shadow-xl shadow-milo-orange/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            <span>Create & Save to Database</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
};
