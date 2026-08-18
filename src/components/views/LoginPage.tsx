'use client';

import React, { useState } from 'react';
import { useMilo } from '@/context/MiloContext';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginPage: React.FC = () => {
  const { navigateTo, addToast, loginAsRole } = useMilo();
  const [email, setEmail] = useState('pratik@milo.app');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Welcome back!', 'Logged in as Pratik Sharma');
    navigateTo('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
        
        {/* Left Split Image Banner */}
        <div className="relative hidden md:block overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1000"
            alt="Social gathering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-between p-10 text-white">
            <div
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-2xl bg-milo-orange flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black">MILO</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black leading-tight">
                Meet people. Make plans. Live more.
              </h2>
              <p className="text-sm text-slate-300 font-medium">
                Join over 500+ active members in Pune going to coffee meetups, badminton matches, and outdoor treks.
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="p-8 sm:p-12 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div
                onClick={() => navigateTo('landing')}
                className="flex items-center gap-2 md:hidden cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-milo-orange flex items-center justify-center text-white font-black text-xs">
                  M
                </div>
                <span className="text-xl font-black text-slate-900 dark:text-white">MILO</span>
              </div>
              <button
                onClick={() => navigateTo('landing')}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                ← Back to Home
              </button>
            </div>

            <div className="space-y-1 mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Welcome back 👋
              </h2>
              <p className="text-sm font-semibold text-slate-500">
                Good to see you again. Enter your account details.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <a href="#forgot" className="text-xs font-bold text-milo-orange hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-milo-orange focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-milo-orange hover:bg-milo-orange-hover text-white font-bold text-sm shadow-md shadow-milo-orange/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <span>Log In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick 1-Click Role Logins */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                Fast Direct Role Access (No Password Needed)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => loginAsRole('user')}
                  className="py-2.5 px-3 rounded-2xl bg-milo-orange-light dark:bg-milo-orange/10 border border-milo-orange/30 text-milo-orange font-bold text-xs hover:bg-milo-orange hover:text-white transition-all text-center"
                >
                  👤 Login as User
                </button>
                <button
                  type="button"
                  onClick={() => loginAsRole('admin')}
                  className="py-2.5 px-3 rounded-2xl bg-milo-purple-light dark:bg-milo-purple/10 border border-milo-purple/30 text-milo-purple font-bold text-xs hover:bg-milo-purple hover:text-white transition-all text-center"
                >
                  👑 Login as Admin
                </button>
              </div>
            </div>

            {/* Social Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <span className="relative px-4 text-xs font-bold text-slate-400 bg-white dark:bg-slate-900 uppercase">
                OR
              </span>
            </div>

            <button
              onClick={() => {
                addToast('Google login simulated', 'Logged in as Pratik Sharma');
                navigateTo('dashboard');
              }}
              className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-2.5 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="pt-6 text-center text-xs font-semibold text-slate-500">
            Don't have an account?{' '}
            <button
              onClick={() => navigateTo('signup')}
              className="text-milo-orange font-bold hover:underline"
            >
              Create account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
