'use client';

import React, { useState } from 'react';
import { useMilo } from '@/context/MiloContext';
import {
  User,
  Bell,
  ShieldCheck,
  Lock,
  UserX,
  BookOpen,
  HelpCircle,
  LogOut,
  ChevronRight,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface SettingItem {
  label: string;
  action?: () => void;
  toggle?: boolean;
  value?: boolean;
  onToggle?: () => void;
}

export const SettingsPage: React.FC = () => {
  const { navigateTo, addToast } = useMilo();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privacyPublic, setPrivacyPublic] = useState(true);

  const sections: { title: string; icon: React.ReactNode; items: SettingItem[] }[] = [
    {
      title: 'Account Settings',
      icon: <User className="w-5 h-5 text-milo-orange" />,
      items: [
        { label: 'Edit Personal Details', action: () => navigateTo('profile') },
        { label: 'Phone Number & Email', action: () => addToast('Account', 'Email verified as pratik@milo.app') },
        { label: 'Change Password', action: () => addToast('Security', 'Password update link sent to your email') },
      ],
    },
    {
      title: 'Preferences & Privacy',
      icon: <Lock className="w-5 h-5 text-milo-purple" />,
      items: [
        {
          label: 'Push Notifications for Meetups',
          toggle: true,
          value: notificationsEnabled,
          onToggle: () => {
            setNotificationsEnabled(!notificationsEnabled);
            addToast('Notifications', `Push notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}`);
          },
        },
        {
          label: 'Show Locality on Profile (Wakad, Pune)',
          toggle: true,
          value: privacyPublic,
          onToggle: () => {
            setPrivacyPublic(!privacyPublic);
            addToast('Privacy', `Locality visibility updated`);
          },
        },
      ],
    },
    {
      title: 'Safety & Moderation',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      items: [
        { label: 'Blocked Users (0 blocked)', action: () => addToast('Safety', 'You have no blocked users.') },
        { label: 'Community Guidelines', action: () => addToast('Guidelines', 'Be respectful, arrive on time, & connect safely.') },
        { label: 'Report an Incident', action: () => addToast('Support', 'Support team is available 24/7 at support@milo.app') },
      ],
    },
    {
      title: 'Help & Support',
      icon: <HelpCircle className="w-5 h-5 text-sky-500" />,
      items: [
        { label: 'Frequently Asked Questions (FAQ)', action: () => addToast('Help', 'Opening MILO FAQ guide...') },
        { label: 'Contact Support Team', action: () => addToast('Support', 'Contact us at support@milo.app') },
        { label: 'Terms of Service & Privacy Policy', action: () => addToast('Legal', 'MILO v2.4.0 (Latest Pune release)') },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Settings & Preferences
        </h1>
        <p className="text-sm font-semibold text-slate-500 mt-1">
          Manage your MILO account, privacy controls, safety guidelines, and support.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
          >
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              {sec.icon}
              <span>{sec.title}</span>
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {sec.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  onClick={item.action}
                  className="py-3 flex items-center justify-between cursor-pointer hover:text-milo-orange transition-colors"
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {item.label}
                  </span>

                  {item.toggle ? (
                    <button onClick={item.onToggle} className="p-1">
                      {item.value ? (
                        <ToggleRight className="w-7 h-7 text-milo-orange" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-slate-400" />
                      )}
                    </button>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Card */}
        <div className="bg-rose-50 dark:bg-rose-950/20 rounded-3xl p-6 border border-rose-200 dark:border-rose-900/30 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-rose-900 dark:text-rose-200">Log Out of MILO</h4>
            <p className="text-xs text-rose-600 dark:text-rose-400">Signed in as pratik@milo.app</p>
          </div>
          <button
            onClick={() => {
              addToast('Logged out', 'Returned to MILO Landing Page');
              navigateTo('landing');
            }}
            className="px-5 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
