'use client';

import React, { useState, useMemo } from 'react';
import { useMilo } from '@/context/MiloContext';
import { ActivityCard } from '../ui/ActivityCard';
import { EmptyState } from '../ui/EmptyState';
import { ActivityCardSkeleton } from '../ui/SkeletonLoader';
import { Search, Filter, Calendar, MapPin, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { CategoryType } from '@/lib/types';
import { CATEGORY_ICONS, PUNE_AREAS } from '@/lib/mockData';

export const DiscoverPage: React.FC = () => {
  const { events, selectedArea } = useMilo();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Today' | 'This Weekend' | 'Popular'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories: string[] = ['All', 'Coffee', 'Gaming', 'Sports', 'Food', 'Movies', 'Travel', 'Trekking', 'Art'];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = event.title.toLowerCase().includes(query);
        const matchLocation = event.location.toLowerCase().includes(query);
        const matchCat = event.category.toLowerCase().includes(query);
        if (!matchTitle && !matchLocation && !matchCat) return false;
      }

      // Tab filter
      if (activeTab === 'Today' && !event.isToday) return false;
      if (activeTab === 'This Weekend' && !event.isThisWeekend) return false;
      if (activeTab === 'Popular' && event.joinedCount < 6) return false;

      // Category filter
      if (selectedCategory !== 'All' && event.category !== selectedCategory) return false;

      // Area filter
      if (selectedAreaFilter !== 'All' && event.area !== selectedAreaFilter) return false;

      // Price filter
      if (priceFilter === 'free' && event.price > 0) return false;
      if (priceFilter === 'paid' && event.price === 0) return false;

      // Distance filter
      if (event.distanceKm > maxDistance) return false;

      return true;
    });
  }, [events, searchQuery, activeTab, selectedCategory, selectedAreaFilter, priceFilter, maxDistance]);

  const handleTabChange = (tab: 'All' | 'Today' | 'This Weekend' | 'Popular') => {
    setLoading(true);
    setActiveTab(tab);
    setTimeout(() => setLoading(false), 300);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Discover something new
        </h1>
        <p className="text-sm font-semibold text-slate-500 mt-1">
          Explore upcoming group plans and meetups across Pune.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search activities, events, or places in Pune..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-sm font-medium rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-milo-orange focus:outline-none shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilterDrawer(!showFilterDrawer)}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 ${
            showFilterDrawer || priceFilter !== 'all' || selectedCategory !== 'All' || maxDistance < 10
              ? 'bg-milo-orange-light text-milo-orange border-milo-orange'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Sheet Dropdown */}
      {showFilterDrawer && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5 animate-in fade-in slide-in-from-top-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-milo-orange" />
              <span>Refine Search Results</span>
            </h3>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedAreaFilter('All');
                setPriceFilter('all');
                setMaxDistance(10);
              }}
              className="text-xs font-bold text-milo-orange hover:underline"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Pune Locality
              </label>
              <select
                value={selectedAreaFilter}
                onChange={(e) => setSelectedAreaFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                {PUNE_AREAS.map((a) => (
                  <option key={a} value={a === 'All Pune' ? 'All' : a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Price Type
              </label>
              <div className="flex gap-2">
                {(['all', 'free', 'paid'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPriceFilter(type)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl capitalize transition-all ${
                      priceFilter === type
                        ? 'bg-milo-orange text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Max Distance
                </label>
                <span className="text-xs font-bold text-milo-orange">{maxDistance} km</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-milo-orange cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        {/* Date Tabs */}
        <div className="flex gap-2">
          {(['All', 'Today', 'This Weekend', 'Popular'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-milo-orange text-white shadow-md shadow-milo-orange/20 scale-105'
                  : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category horizontal pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full sm:max-w-md scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Cards Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <ActivityCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="compass"
          title="No activities match your filters"
          description="Try relaxing your distance range or resetting search filters to see all events in Pune."
          actionText="Reset All Filters"
          onAction={() => {
            setSearchQuery('');
            setActiveTab('All');
            setSelectedCategory('All');
            setSelectedAreaFilter('All');
            setPriceFilter('all');
            setMaxDistance(10);
          }}
        />
      )}
    </div>
  );
};
