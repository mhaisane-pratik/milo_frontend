'use client';

import React, { useState } from 'react';
import { useMilo } from '@/context/MiloContext';
import { PUNE_AREAS } from '@/lib/mockData';
import { CategoryType } from '@/lib/types';
import { Sparkles, CheckCircle2, ArrowRight, ArrowLeft, MapPin, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OnboardingWizard: React.FC = () => {
  const { navigateTo, onboardingData, setOnboardingData, setSelectedArea } = useMilo();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [selectedCity, setSelectedCity] = useState('Pune');
  const [selectedAreaLocal, setSelectedAreaLocal] = useState('Wakad');
  const [selectedInterests, setSelectedInterests] = useState<CategoryType[]>(onboardingData.interests);
  const [selectedVibes, setSelectedVibes] = useState<string[]>(onboardingData.planVibes);
  const [selectedSocialMood, setSelectedSocialMood] = useState(onboardingData.socialMood);

  const allInterests: CategoryType[] = [
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

  const vibeOptions = [
    { label: 'Chill', emoji: '☕', desc: 'Low key cafe chats & relaxed vibes' },
    { label: 'Social', emoji: '🎉', desc: 'Group dinners, drinks & parties' },
    { label: 'Adventure', emoji: '🥾', desc: 'Tekdi hikes & road trips' },
    { label: 'Sports', emoji: '🏸', desc: 'Badminton & turf football' },
    { label: 'Creative', emoji: '🎨', desc: 'Art jams & workshops' },
    { label: 'Food', emoji: '🍕', desc: 'Street food crawls & ramen' },
  ];

  const socialMoodOptions = [
    { text: 'Just exploring 👀', desc: 'Browsing what Pune has to offer' },
    { text: 'Ready to meet people 🤝', desc: 'Down for weekend coffee or games' },
    { text: "Let's do something fun 🔥", desc: 'Count me in for treks, trips & meetups!' },
  ];

  const toggleInterest = (item: CategoryType) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleVibe = (vibe: string) => {
    setSelectedVibes((prev) =>
      prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe]
    );
  };

  const handleNext = () => {
    if (step === 1) {
      setSelectedArea(selectedAreaLocal);
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setOnboardingData({
        city: selectedCity,
        interests: selectedInterests,
        planVibes: selectedVibes,
        socialMood: selectedSocialMood,
      });
      setStep(5);
    } else {
      navigateTo('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto w-full bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200/80 dark:border-slate-800 space-y-6 relative overflow-hidden">
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-milo-orange to-milo-coral h-full transition-all duration-500"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Location */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-milo-orange uppercase tracking-wider">Step 1 of 4</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Where are you located?
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  MILO connects you with members and plans in your city neighborhood.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    City
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-milo-orange absolute left-3.5 top-3.5" />
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-sm font-bold rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Select Your Pune Area
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {PUNE_AREAS.filter((a) => a !== 'All Pune').map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => setSelectedAreaLocal(area)}
                        className={`p-3 rounded-2xl text-xs font-bold transition-all border text-left flex items-center justify-between ${
                          selectedAreaLocal === area
                            ? 'bg-milo-orange-light dark:bg-milo-orange/15 border-milo-orange text-milo-orange shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>📍 {area}</span>
                        {selectedAreaLocal === area && <CheckCircle2 className="w-4 h-4 text-milo-orange" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-milo-purple uppercase tracking-wider">Step 2 of 4</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  What do you enjoy?
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  Select the activities you’d like to join in {selectedAreaLocal}, Pune.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {allInterests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-milo-orange text-white shadow-md shadow-milo-orange/20 scale-105'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Plan Vibes */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-milo-coral uppercase tracking-wider">Step 3 of 4</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  What kind of plans do you like?
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  Select your preferred meetup vibes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vibeOptions.map((vibe) => {
                  const isSelected = selectedVibes.includes(vibe.label);
                  return (
                    <button
                      key={vibe.label}
                      type="button"
                      onClick={() => toggleVibe(vibe.label)}
                      className={`p-4 rounded-2xl text-left border transition-all space-y-1 ${
                        isSelected
                          ? 'bg-milo-orange-light dark:bg-milo-orange/15 border-milo-orange shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{vibe.emoji}</span>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{vibe.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{vibe.desc}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 4: Social Mood */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Step 4 of 4</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  How social are you feeling?
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  You can change your mood anytime from your profile settings.
                </p>
              </div>

              <div className="space-y-3">
                {socialMoodOptions.map((opt) => {
                  const isSelected = selectedSocialMood === opt.text;
                  return (
                    <button
                      key={opt.text}
                      type="button"
                      onClick={() => setSelectedSocialMood(opt.text)}
                      className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-milo-orange-light dark:bg-milo-orange/15 border-milo-orange text-milo-orange font-bold shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-sm block">{opt.text}</span>
                        <span className="text-xs font-normal text-slate-500">{opt.desc}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-milo-orange" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 5: Finished */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-milo-orange to-milo-coral text-white mx-auto flex items-center justify-center shadow-xl shadow-milo-orange/30">
                <Sparkles className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                You're ready for MILO!
              </h2>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                We've customized your feed for meetups in <span className="text-milo-orange font-bold">{selectedAreaLocal}, Pune</span>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          {step > 1 && step < 5 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-2xl bg-milo-orange hover:bg-milo-orange-hover text-white font-bold text-sm shadow-md shadow-milo-orange/20 transition-all hover:scale-[1.02] flex items-center gap-2 ml-auto"
          >
            <span>{step === 5 ? 'Explore MILO' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
