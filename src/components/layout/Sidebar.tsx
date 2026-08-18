'use client';

import React from 'react';
import { useMilo } from '@/context/MiloContext';
import { RouteType } from '@/lib/types';
import {
  Home,
  Compass,
  Calendar,
  MessageSquare,
  Users,
  User,
  Settings,
  PlusCircle,
  Sparkles,
  LayoutDashboard,
  Target,
  Flag,
  Megaphone,
  Heart
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeRoute, navigateTo, user, setIsCreateModalOpen, chatThreads, loginAsRole } = useMilo();

  const totalUnreadMessages = chatThreads.reduce((acc, thread) => acc + (thread.unreadCount || 0), 0);

  // User Role Sidebar Navigation
  const userNavItems: { route: RouteType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { route: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { route: 'discover', label: 'Explore', icon: <Compass className="w-5 h-5" /> },
    { route: 'discover', label: 'Activities', icon: <Target className="w-5 h-5 text-milo-orange" /> },
    { route: 'my-events', label: 'My Plans', icon: <Calendar className="w-5 h-5" /> },
    { route: 'community', label: 'Groups', icon: <Users className="w-5 h-5" /> },
    { route: 'messages', label: 'Connections', icon: <Heart className="w-5 h-5 text-rose-500" />, badge: totalUnreadMessages },
    { route: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  // Admin Role Sidebar Navigation
  const adminNavItems: { route: RouteType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { route: 'admin-dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5 text-milo-purple" /> },
    { route: 'admin-dashboard', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { route: 'admin-dashboard', label: 'Activities', icon: <Target className="w-5 h-5 text-milo-orange" /> },
    { route: 'admin-dashboard', label: 'Events', icon: <Calendar className="w-5 h-5" /> },
    { route: 'admin-dashboard', label: 'Groups', icon: <Users className="w-5 h-5" /> },
    { route: 'admin-dashboard', label: 'Reports', icon: <Flag className="w-5 h-5 text-rose-500" /> },
    { route: 'admin-dashboard', label: 'Announcements', icon: <Megaphone className="w-5 h-5 text-amber-500" /> },
    { route: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const currentNavItems = user.role === 'admin' ? adminNavItems : userNavItems;

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 bg-white min-h-screen sticky top-0 h-screen p-5 justify-between select-none z-30 shadow-sm">
      {/* Top Header */}
      <div>
        <div
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-3 cursor-pointer mb-8 px-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-milo-orange to-milo-coral flex items-center justify-center text-white shadow-md shadow-milo-orange/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-none">
              MILO
            </h1>
            <span className="text-[10px] font-bold text-milo-orange tracking-widest uppercase">
              {user.role === 'admin' ? '👑 Admin Control' : 'Social Platform'}
            </span>
          </div>
        </div>

        {/* Primary "+ Create Plan" CTA for users / "+ Create Event" for admin */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full mb-6 py-3 px-4 rounded-2xl bg-gradient-to-r from-milo-orange to-milo-coral text-white font-bold text-sm shadow-md shadow-milo-orange/25 hover:shadow-lg hover:shadow-milo-orange/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          <span>{user.role === 'admin' ? 'Create Event' : '+ Create Activity Plan'}</span>
        </button>

        {/* Nav list */}
        <nav className="space-y-1.5">
          {currentNavItems.map((item, idx) => {
            const isActive = activeRoute === item.route;
            return (
              <button
                key={idx}
                onClick={() => navigateTo(item.route)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-milo-orange-light text-milo-orange shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="px-2 py-0.5 rounded-full bg-milo-orange text-white text-xs font-bold">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Mini Profile */}
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <div
          onClick={() => navigateTo(user.role === 'admin' ? 'admin-dashboard' : 'profile')}
          className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-100 cursor-pointer transition-colors"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatar}
            alt={user.name}
            className={`w-10 h-10 rounded-full object-cover border-2 ${
              user.role === 'admin' ? 'border-milo-purple' : 'border-milo-orange'
            }`}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {user.name}
              </h4>
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                  user.role === 'admin'
                    ? 'bg-milo-purple text-white'
                    : 'bg-milo-orange-light text-milo-orange'
                }`}
              >
                {user.role}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 truncate">
              📍 {user.area}, {user.city}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              loginAsRole(user.role === 'admin' ? 'user' : 'admin');
            }}
            className="text-slate-400 hover:text-milo-orange p-1 font-bold text-xs"
            title="Switch Role"
          >
            ⇄
          </button>
        </div>
      </div>
    </aside>
  );
};
