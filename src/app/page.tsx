'use client';

import React from 'react';
import { useMilo } from '@/context/MiloContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

import { LandingPage } from '@/components/views/LandingPage';
import { LoginPage } from '@/components/views/LoginPage';
import { SignupPage } from '@/components/views/SignupPage';
import { OnboardingWizard } from '@/components/views/OnboardingWizard';
import { DashboardHome } from '@/components/views/DashboardHome';
import { DiscoverPage } from '@/components/views/DiscoverPage';
import { ActivityDetailsPage } from '@/components/views/ActivityDetailsPage';
import { MyEventsPage } from '@/components/views/MyEventsPage';
import { MessagesPage } from '@/components/views/MessagesPage';
import { CommunityPage } from '@/components/views/CommunityPage';
import { ProfilePage } from '@/components/views/ProfilePage';
import { SettingsPage } from '@/components/views/SettingsPage';
import { AdminDashboard } from '@/components/views/AdminDashboard';

import { LoginModal } from '@/components/modals/LoginModal';
import { JoinEventModal } from '@/components/modals/JoinEventModal';
import { CreateEventModal } from '@/components/modals/CreateEventModal';

export default function Home() {
  const { activeRoute } = useMilo();

  return (
    <>
      {/* 1. PUBLIC LANDING VIEW */}
      {activeRoute === 'landing' && <LandingPage />}

      {/* 2. AUTHENTICATION VIEWS */}
      {activeRoute === 'login' && <LoginPage />}
      {activeRoute === 'signup' && <SignupPage />}
      {activeRoute === 'onboarding' && <OnboardingWizard />}

      {/* 3. AUTHENTICATED MEMBER & ADMIN APP LAYOUT */}
      {activeRoute !== 'landing' &&
        activeRoute !== 'login' &&
        activeRoute !== 'signup' &&
        activeRoute !== 'onboarding' && (
          <div className="flex min-h-screen bg-slate-50 text-slate-900">
            {/* Desktop Left Sidebar */}
            <Sidebar />

            {/* Main App Content Area */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
              {/* Top Header */}
              <TopBar />

              {/* Dynamic Route View Container */}
              <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
                {activeRoute === 'dashboard' && <DashboardHome />}
                {activeRoute === 'discover' && <DiscoverPage />}
                {activeRoute === 'activity-detail' && <ActivityDetailsPage />}
                {activeRoute === 'my-events' && <MyEventsPage />}
                {activeRoute === 'messages' && <MessagesPage />}
                {activeRoute === 'community' && <CommunityPage />}
                {activeRoute === 'profile' && <ProfilePage />}
                {activeRoute === 'settings' && <SettingsPage />}
                {activeRoute === 'admin-dashboard' && <AdminDashboard />}
              </main>

              {/* Mobile Bottom Bar Navigation */}
              <MobileBottomNav />
            </div>
          </div>
        )}

      {/* GLOBAL MODALS (Single Mount Instance) */}
      <LoginModal />
      <JoinEventModal />
      <CreateEventModal />
    </>
  );
}
