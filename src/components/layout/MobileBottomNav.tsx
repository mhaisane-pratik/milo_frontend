'use client';

import React from 'react';
import { useMilo } from '@/context/MiloContext';
import { RouteType } from '@/lib/types';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeRoute, navigateTo, setIsCreateModalOpen, chatThreads } = useMilo();

  const totalUnreadMessages = chatThreads.reduce((acc, thread) => acc + (thread.unreadCount || 0), 0);

  const items: { route: RouteType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { route: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { route: 'discover', label: 'Discover', icon: <Compass className="w-5 h-5" /> },
    { route: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, badge: totalUnreadMessages },
    { route: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  // Only display on mobile when viewing app screens (dashboard, discover, my-events, messages, community, profile, settings, activity-detail)
  if (['landing', 'login', 'signup', 'onboarding'].includes(activeRoute)) {
    return null;
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 px-3 py-2 shadow-lg">
      <div className="flex items-center justify-around relative">
        {/* Home & Discover */}
        {items.slice(0, 2).map((item) => {
          const isActive = activeRoute === item.route;
          return (
            <button
              key={item.route}
              onClick={() => navigateTo(item.route)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
                isActive ? 'text-milo-orange font-bold scale-105' : 'text-slate-500 dark:text-slate-400 font-semibold'
              }`}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}

        {/* Floating Center + Create Button */}
        <div className="relative -top-5">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-milo-orange to-milo-coral text-white flex items-center justify-center shadow-lg shadow-milo-orange/40 hover:scale-110 active:scale-95 transition-transform border-4 border-white dark:border-slate-950"
            title="Create Event"
          >
            <Plus className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* Messages & Profile */}
        {items.slice(2, 4).map((item) => {
          const isActive = activeRoute === item.route;
          return (
            <button
              key={item.route}
              onClick={() => navigateTo(item.route)}
              className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
                isActive ? 'text-milo-orange font-bold scale-105' : 'text-slate-500 dark:text-slate-400 font-semibold'
              }`}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-milo-orange text-white text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
