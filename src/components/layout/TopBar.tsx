'use client';

import React, { useState } from 'react';
import { useMilo } from '@/context/MiloContext';
import { PUNE_AREAS } from '@/lib/mockData';
import { MapPin, Search, Bell, Sparkles, ChevronDown } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { user, selectedArea, setSelectedArea, navigateTo, loginAsRole } = useMilo();
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-sm">
      {/* Left: Location Selector */}
      <div className="relative">
        <button
          onClick={() => setShowLocationMenu(!showLocationMenu)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-100/80 border border-slate-200 hover:border-milo-orange transition-all text-xs font-bold text-slate-800"
        >
          <MapPin className="w-4 h-4 text-milo-orange shrink-0" />
          <span>📍 {selectedArea}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Location Dropdown Menu */}
        {showLocationMenu && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Select Locality
            </div>
            {PUNE_AREAS.map((area) => (
              <button
                key={area}
                onClick={() => {
                  setSelectedArea(area);
                  setShowLocationMenu(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-milo-orange-light hover:text-milo-orange transition-colors ${
                  selectedArea === area ? 'text-milo-orange font-bold bg-milo-orange-light/50' : 'text-slate-700'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div
          onClick={() => navigateTo('discover')}
          className="relative flex items-center cursor-pointer"
        >
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            readOnly
            placeholder="Search activities, gaming, coffee, treks in Pune..."
            className="w-full pl-10 pr-4 py-2 text-xs font-medium bg-slate-100/80 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 cursor-pointer hover:border-slate-300 transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-2xl bg-slate-100/80 hover:bg-slate-200 text-slate-700 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-milo-orange animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-milo-orange" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
              <h4 className="font-bold text-xs text-slate-900 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-milo-orange" />
                <span>Recent Updates</span>
              </h4>
              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-xl bg-milo-orange-light/50 border border-milo-orange/20">
                  <p className="font-bold text-slate-900">Ananya confirmed Café Peter ☕</p>
                  <p className="text-slate-500 text-[11px] mt-0.5 font-medium">Saturday coffee meetup reserved for 5 PM</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">2 new spots joined Badminton 🏸</p>
                  <p className="text-slate-500 text-[11px] mt-0.5 font-medium">Rohan Joshi updated court details</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Mini Avatar & Role Badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => loginAsRole(user.role === 'admin' ? 'user' : 'admin')}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1 ${
              user.role === 'admin'
                ? 'bg-milo-purple text-white hover:bg-indigo-600 shadow-sm'
                : 'bg-milo-orange-light text-milo-orange border border-milo-orange/30 hover:bg-milo-orange hover:text-white'
            }`}
            title="Click to switch role"
          >
            <span>{user.role}</span>
            <span className="text-[9px]">⇄</span>
          </button>

          <div
            onClick={() => navigateTo(user.role === 'admin' ? 'admin-dashboard' : 'profile')}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-2xl hover:bg-slate-100 transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar}
              alt={user.name}
              className={`w-9 h-9 rounded-full object-cover border-2 ${
                user.role === 'admin' ? 'border-milo-purple' : 'border-milo-orange'
              }`}
            />
            <span className="hidden sm:inline text-xs font-bold text-slate-800">
              {user.name.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
