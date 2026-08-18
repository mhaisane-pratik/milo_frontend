'use client';

import React, { useState } from 'react';
import { useMilo } from '@/context/MiloContext';
import { MessageSquare, Send, Users, ShieldCheck, Image as ImageIcon, Smile, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const MessagesPage: React.FC = () => {
  const { chatThreads, activeChatId, setActiveChatId, sendMessage, user } = useMilo();
  const [inputText, setInputText] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'group' | 'direct'>('all');

  const activeThread = chatThreads.find((t) => t.id === activeChatId) || chatThreads[0];

  const filteredThreads = chatThreads.filter((t) => {
    if (filterType === 'group') return t.type === 'group';
    if (filterType === 'direct') return t.type === 'direct';
    return true;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeThread.id, inputText);
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-140px)] min-h-[550px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col md:flex-row select-none">
      {/* Left Threads Sidebar */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-950/50">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 space-y-3">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-milo-orange" />
            <span>Messages & Groups</span>
          </h2>

          {/* Filter Pills */}
          <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-200/60 dark:bg-slate-800">
            {(['all', 'group', 'direct'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${
                  filterType === type
                    ? 'bg-white dark:bg-slate-900 text-milo-orange shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {type === 'all' ? 'All Chats' : type === 'group' ? 'Event Groups' : 'Direct'}
              </button>
            ))}
          </div>
        </div>

        {/* Thread items list */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredThreads.map((thread) => {
            const isActive = thread.id === activeThread.id;
            return (
              <div
                key={thread.id}
                onClick={() => setActiveChatId(thread.id)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-milo-orange-light/50 dark:bg-milo-orange/10 border-l-4 border-milo-orange'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thread.avatar}
                    alt={thread.title}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  {thread.type === 'group' && (
                    <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-milo-purple text-white text-[9px] font-bold">
                      👥
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {thread.title}
                    </h4>
                    <span className="text-[10px] font-medium text-slate-400 shrink-0">
                      {thread.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate font-medium">
                    {thread.lastMessage}
                  </p>
                </div>

                {thread.unreadCount && thread.unreadCount > 0 ? (
                  <span className="w-5 h-5 rounded-full bg-milo-orange text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {thread.unreadCount}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat Panel */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
        
        {/* Chat Active Header */}
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeThread.avatar}
              alt={activeThread.title}
              className="w-10 h-10 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
            />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>{activeThread.title}</span>
                {activeThread.type === 'group' && (
                  <span className="text-[10px] font-bold bg-milo-purple-light dark:bg-milo-purple/20 text-milo-purple px-2 py-0.5 rounded-full">
                    {activeThread.participantsCount || 8} Members
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Public meetup group chat • Coordinate timing & location
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Group</span>
          </div>
        </div>

        {/* Message Thread Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="text-center py-2">
            <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              Community guidelines apply to all chats
            </span>
          </div>

          {activeThread.messages.map((msg) => {
            const isMe = msg.isSelf || msg.senderId === user.id;

            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mb-1"
                  />
                )}

                <div className={`max-w-xs sm:max-w-md space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                  {!isMe && (
                    <span className="text-[10px] font-bold text-slate-500 px-1">
                      {msg.senderName}
                    </span>
                  )}
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                      isMe
                        ? 'bg-milo-orange text-white rounded-br-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 px-1 block text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${activeThread.title}...`}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-milo-orange focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`p-2.5 rounded-2xl transition-all ${
              inputText.trim()
                ? 'bg-milo-orange text-white shadow-md shadow-milo-orange/20 hover:scale-105'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
