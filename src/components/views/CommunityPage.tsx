'use client';

import React, { useState } from 'react';
import { useMilo } from '@/context/MiloContext';
import { CategoryType } from '@/lib/types';
import { Users, Heart, MessageCircle, Share2, Sparkles, Send, MapPin, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export const CommunityPage: React.FC = () => {
  const { communityPosts, toggleLikePost, addCommunityPost, user } = useMilo();
  const [postText, setPostText] = useState('');
  const [postCategory, setPostCategory] = useState<CategoryType>('Coffee');

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;
    addCommunityPost(postText.trim(), postCategory);
    setPostText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-milo-orange via-milo-coral to-milo-purple text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block">
            Pune Social Network
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            Come alone. Leave with connections.
          </h1>
          <p className="text-sm sm:text-base text-white/90 font-medium max-w-xl">
            Read member stories, suggest weekend meetups, and share your activity experiences in Pune.
          </p>
        </div>
      </div>

      {/* Post Composer */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-milo-orange shrink-0"
          />
          <div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">{user.name}</h4>
            <p className="text-[11px] text-slate-400">Share an experience or ask a question...</p>
          </div>
        </div>

        <form onSubmit={handleSubmitPost} className="space-y-3">
          <textarea
            rows={2}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What should we organize this weekend in Pune? Or tell us about your recent meetup..."
            className="w-full px-4 py-3 text-xs sm:text-sm font-medium rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-milo-orange focus:outline-none"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500">Category:</span>
              <select
                value={postCategory}
                onChange={(e) => setPostCategory(e.target.value as CategoryType)}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Coffee">☕ Coffee</option>
                <option value="Trekking">🥾 Trekking</option>
                <option value="Sports">🏸 Sports</option>
                <option value="Gaming">🎮 Gaming</option>
                <option value="Food">🍕 Food</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!postText.trim()}
              className={`px-5 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                postText.trim()
                  ? 'bg-milo-orange hover:bg-milo-orange-hover text-white shadow-milo-orange/20 hover:scale-105'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Share Post</span>
            </button>
          </div>
        </form>
      </div>

      {/* Community Feed Posts */}
      <div className="space-y-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-milo-orange" />
          <span>Member Stories & Community Feed</span>
        </h3>

        {communityPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
          >
            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-milo-orange"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {post.author.name}
                    </h4>
                    {post.author.isVerified && (
                      <span className="text-blue-500 font-bold text-xs" title="Verified">✓</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    📍 {post.author.area}, Pune • {post.timeAgo}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold">
                #{post.category}
              </span>
            </div>

            {/* Post Content */}
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
              {post.content}
            </p>

            {/* Optional Image */}
            {post.image && (
              <div className="rounded-2xl overflow-hidden max-h-80 border border-slate-100 dark:border-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt="Post Attachment"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Actions Bar */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={() => toggleLikePost(post.id)}
                className={`flex items-center gap-1.5 font-bold transition-colors ${
                  post.isLiked ? 'text-rose-500' : 'hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes} Likes</span>
              </button>

              <button className="flex items-center gap-1.5 font-bold hover:text-milo-orange transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>{post.commentsCount} Comments</span>
              </button>

              <button className="flex items-center gap-1.5 font-bold hover:text-milo-purple transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
