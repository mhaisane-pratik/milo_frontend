'use client';

import React from 'react';
import { useMilo } from '@/context/MiloContext';
import { UserRole } from '@/lib/types';
import { X, User, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAsRole, navigateTo } = useMilo();

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 p-6 sm:p-8 space-y-6 z-50"
          >
            {/* Close button */}
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-milo-orange to-milo-coral text-white mx-auto flex items-center justify-center shadow-lg shadow-milo-orange/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Choose Login Experience
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                Instant 1-Click Role Access (No Password Required)
              </p>
            </div>

            {/* 2 Role Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* 1. MEMBER / USER ROLE CARD */}
              <div
                onClick={() => loginAsRole('user')}
                className="group relative bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 hover:border-milo-orange transition-all cursor-pointer space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-milo-orange-light text-milo-orange flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-milo-orange uppercase tracking-wider bg-milo-orange/10 px-2.5 py-0.5 rounded-full inline-block">
                    Member Portal
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-milo-orange transition-colors">
                    Login as User / Member
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                    Join coffee meetups, badminton matches, group chats, community stories, & save local plans in Pune.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      loginAsRole('user');
                    }}
                    className="w-full py-3 rounded-2xl bg-milo-orange text-white font-bold text-xs shadow-md shadow-milo-orange/20 flex items-center justify-center gap-2 group-hover:bg-milo-orange-hover"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Direct Login as User</span>
                  </button>
                </div>
              </div>

              {/* 2. ADMIN ROLE CARD */}
              <div
                onClick={() => loginAsRole('admin')}
                className="group relative bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 hover:border-milo-purple transition-all cursor-pointer space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-milo-purple-light text-milo-purple flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-milo-purple uppercase tracking-wider bg-milo-purple/10 px-2.5 py-0.5 rounded-full inline-block">
                    Executive Admin
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-milo-purple transition-colors">
                    Login as Admin
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                    Moderate meetups, manage member verifications, view Pune locality metrics, & audit safety logs.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      loginAsRole('admin');
                    }}
                    className="w-full py-3 rounded-2xl bg-milo-purple text-white font-bold text-xs shadow-md shadow-milo-purple/20 flex items-center justify-center gap-2 group-hover:bg-indigo-600"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Direct Login as Admin</span>
                  </button>
                </div>
              </div>

            </div>

            <div className="pt-2 text-center text-xs font-semibold text-slate-400 border-t border-slate-100">
              Or go to traditional{' '}
              <button
                onClick={() => {
                  setIsLoginModalOpen(false);
                  navigateTo('login');
                }}
                className="text-milo-orange font-bold hover:underline"
              >
                Email & Password Login Page
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
