'use client';

import React, { useState, useEffect } from 'react';
import { useMilo } from '@/context/MiloContext';
import { CategoryType } from '@/lib/types';
import { api } from '@/lib/api';
import {
  LayoutDashboard,
  Users,
  Target,
  Calendar,
  Megaphone,
  ShieldCheck,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminDashboard: React.FC = () => {
  const { events, setEvents, navigateTo, addToast, loginAsRole, setIsCreateModalOpen } = useMilo();

  // Active Admin Sub-Tab
  const [adminTab, setAdminTab] = useState<
    'dashboard' | 'users' | 'activities' | 'events' | 'announcements'
  >('dashboard');

  const [usersList, setUsersList] = useState<any[]>([]);
  const [activitiesList, setActivitiesList] = useState<any[]>([]);
  const [announcementsList, setAnnouncementsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load Live Data Directly From Neon Cloud PostgreSQL Database
  const loadDatabaseData = async () => {
    setIsLoading(true);
    const dbUsers = await api.getUsers();
    if (dbUsers && Array.isArray(dbUsers)) {
      setUsersList(dbUsers);
    }
    const dbActs = await api.getActivities();
    if (dbActs && Array.isArray(dbActs)) {
      setActivitiesList(dbActs);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadDatabaseData();
  }, []);

  // Modal State
  const [activeModal, setActiveModal] = useState<
    'user-modal' | 'activity-modal' | 'announcement-modal' | null
  >(null);

  // Form States
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserCollege, setNewUserCollege] = useState('');
  const [newUserArea, setNewUserArea] = useState('Wakad');

  const [newActTitle, setNewActTitle] = useState('');
  const [newActCategory, setNewActCategory] = useState<CategoryType>('Coffee');
  const [newActDesc, setNewActDesc] = useState('');
  const [newActIcon, setNewActIcon] = useState('☕');

  const [newAncTitle, setNewAncTitle] = useState('');
  const [newAncContent, setNewAncContent] = useState('');

  // 1. ADD MEMBER (Direct SQL INSERT to Neon `users` table)
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const payload = {
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      college: newUserCollege.trim() || 'COEP Tech University',
      location: `${newUserArea}, Pune`,
    };

    // Execute SQL INSERT into Neon DB
    const res = await api.register(payload);

    // Refresh live list from Neon DB
    await loadDatabaseData();

    addToast('Saved to Neon PostgreSQL 🐘', `Inserted ${newUserName} into users table!`);
    setActiveModal(null);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserCollege('');
  };

  // Block / Unblock User in Neon DB
  const toggleBlockUser = async (userObj: any) => {
    const newStatus = userObj.status === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED';
    await api.updateUserStatus(userObj.id, newStatus as any);
    await loadDatabaseData();
    addToast(`Status Updated (${newStatus})`, `Updated in Neon PostgreSQL DB.`);
  };

  // Delete User from Neon DB
  const handleDeleteUser = async (id: string) => {
    await api.deleteUser(id);
    await loadDatabaseData();
    addToast('User Deleted 🗑️', 'Removed from Neon DB.', 'info');
  };

  // 2. ADD ACTIVITY (Direct SQL INSERT to Neon `activities` table)
  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActTitle.trim()) return;

    const payload = {
      title: newActTitle.trim(),
      category: newActCategory,
      description: newActDesc.trim() || 'Activity catalog item.',
      icon: newActIcon,
    };

    await api.createActivity(payload);
    await loadDatabaseData();

    addToast('Activity Catalog Saved 🎯', `Created ${newActTitle} in Neon DB!`);
    setActiveModal(null);
    setNewActTitle('');
    setNewActDesc('');
  };

  const handleDeleteActivity = async (id: string) => {
    await api.deleteActivity(id);
    await loadDatabaseData();
    addToast('Activity Deleted', 'Removed from Neon DB.', 'info');
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Executive Admin Header */}
      <div className="bg-gradient-to-r from-milo-purple via-indigo-600 to-milo-coral text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>MILO Live Neon PostgreSQL Database</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">
              Executive Admin Control Panel
            </h1>
            <p className="text-white/90 text-sm font-semibold">
              Live SQL Read & Write operations connected directly to your Neon Cloud PostgreSQL Database.
            </p>
          </div>

          <button
            onClick={() => loginAsRole('user')}
            className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2 shrink-0"
          >
            <span>Switch to User View</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {[
          { key: 'dashboard', label: '📊 Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { key: 'users', label: '👥 Users (Neon DB)', icon: <Users className="w-4 h-4" />, count: usersList.length },
          { key: 'activities', label: '🎯 Activities (Neon DB)', icon: <Target className="w-4 h-4 text-milo-orange" />, count: activitiesList.length },
          { key: 'events', label: '📅 Events', icon: <Calendar className="w-4 h-4" />, count: events.length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setAdminTab(tab.key as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              adminTab === tab.key
                ? 'bg-milo-purple text-white shadow-md shadow-milo-purple/20 scale-105'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* DASHBOARD TAB */}
      {adminTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Neon DB Users</span>
              <p className="text-3xl font-black text-slate-900">{usersList.length}</p>
              <p className="text-[11px] font-bold text-emerald-600">Table: users</p>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Neon DB Activities</span>
              <p className="text-3xl font-black text-slate-900">{activitiesList.length}</p>
              <p className="text-[11px] font-bold text-milo-orange">Table: activities</p>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Active Events</span>
              <p className="text-3xl font-black text-slate-900">{events.length}</p>
              <p className="text-[11px] font-bold text-milo-purple">Table: events</p>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">DB Status</span>
              <p className="text-xl font-black text-emerald-600">ONLINE</p>
              <p className="text-[11px] font-bold text-emerald-600">Connected to neondb</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-milo-orange" />
              <span>Admin Quick Actions (Direct SQL Execution)</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveModal('user-modal')}
                className="px-5 py-3 rounded-2xl bg-milo-orange text-white font-bold text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>+ Register New Member</span>
              </button>
              <button
                onClick={() => setActiveModal('activity-modal')}
                className="px-5 py-3 rounded-2xl bg-milo-purple text-white font-bold text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Activity Catalog</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USERS MODULE TAB */}
      {adminTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-milo-purple" />
                <span>Users Table (`users` in Neon Database)</span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Live SQL Rows fetched directly from Neon Cloud PostgreSQL.
              </p>
            </div>

            <button
              onClick={() => setActiveModal('user-modal')}
              className="px-4 py-2 rounded-2xl bg-milo-orange text-white font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add User</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b">
                <tr>
                  <th className="px-4 py-3">Member</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">College & Location</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">SQL Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y font-semibold">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3.5 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={u.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'} alt={u.name} className="w-8 h-8 rounded-full object-cover border" />
                      <span className="font-bold text-slate-900">{u.name}</span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{u.email}</td>
                    <td className="px-4 py-3.5 text-slate-600">
                      <p className="font-bold text-slate-800">{u.college || 'COEP Tech University'}</p>
                      <span className="text-[10px] text-slate-400">📍 {u.location || 'Wakad, Pune'}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${u.status === 'BLOCKED' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {u.status || 'ACTIVE'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => toggleBlockUser(u)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-bold ${u.status === 'BLOCKED' ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-700'}`}
                      >
                        {u.status === 'BLOCKED' ? 'Unblock' : 'Block'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-600 font-bold text-[11px]"
                      >
                        Delete SQL
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ACTIVITIES MODULE TAB */}
      {adminTab === 'activities' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-milo-orange" />
                <span>Activities Table (`activities` in Neon DB)</span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold">Live SQL Catalog items in PostgreSQL.</p>
            </div>

            <button
              onClick={() => setActiveModal('activity-modal')}
              className="px-4 py-2 rounded-2xl bg-milo-orange text-white font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Activity</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activitiesList.map((act) => (
              <div key={act.id} className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm">
                    {act.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-milo-orange-light text-milo-orange">
                    {act.category}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{act.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{act.description}</p>
                </div>
                <div className="pt-2 border-t flex justify-end">
                  <button onClick={() => handleDeleteActivity(act.id)} className="text-rose-500 text-xs font-bold hover:underline">
                    Delete SQL Row
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODALS */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-200 space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-bold text-slate-900 text-base">
                  {activeModal === 'user-modal' && 'Add Member (Direct SQL INSERT)'}
                  {activeModal === 'activity-modal' && 'Add Activity (Direct SQL INSERT)'}
                </h3>
                <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-900">
                  ✕
                </button>
              </div>

              {activeModal === 'user-modal' && (
                <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold block mb-1">Full Name</label>
                    <input type="text" required value={newUserName} onChange={(e) => setNewUserName(e.target.value)} placeholder="e.g. Vikram Joshi" className="w-full p-2.5 rounded-xl border bg-slate-50 font-bold" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Email Address</label>
                    <input type="email" required value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} placeholder="vikram@milo.app" className="w-full p-2.5 rounded-xl border bg-slate-50 font-bold" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">College</label>
                    <input type="text" value={newUserCollege} onChange={(e) => setNewUserCollege(e.target.value)} placeholder="COEP Tech University" className="w-full p-2.5 rounded-xl border bg-slate-50 font-bold" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Area in Pune</label>
                    <input type="text" value={newUserArea} onChange={(e) => setNewUserArea(e.target.value)} placeholder="Wakad" className="w-full p-2.5 rounded-xl border bg-slate-50 font-bold" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-milo-orange text-white font-bold rounded-2xl shadow-md">
                    Execute SQL INSERT to Neon DB
                  </button>
                </form>
              )}

              {activeModal === 'activity-modal' && (
                <form onSubmit={handleCreateActivity} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold block mb-1">Activity Title</label>
                    <input type="text" required value={newActTitle} onChange={(e) => setNewActTitle(e.target.value)} placeholder="e.g. Coffee & Board Games" className="w-full p-2.5 rounded-xl border bg-slate-50 font-bold" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Category</label>
                    <select value={newActCategory} onChange={(e) => setNewActCategory(e.target.value as CategoryType)} className="w-full p-2.5 rounded-xl border bg-slate-50 font-bold">
                      <option value="Coffee">☕ Coffee</option>
                      <option value="Gaming">🎮 Gaming</option>
                      <option value="Sports">🏸 Sports</option>
                      <option value="Travel">✈️ Travel</option>
                      <option value="Study">📚 Study</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-3 bg-milo-purple text-white font-bold rounded-2xl shadow-md">
                    Execute SQL INSERT to Neon DB
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
