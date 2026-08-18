'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RouteType,
  ActivityEvent,
  UserProfile,
  ChatThread,
  CommunityPost,
  OnboardingData,
  ToastNotice,
  CategoryType,
  UserRole
} from '@/lib/types';
import { INITIAL_USER, MOCK_EVENTS, MOCK_CHAT_THREADS, MOCK_COMMUNITY_POSTS } from '@/lib/mockData';
import { api } from '@/lib/api';

interface MiloContextType {
  activeRoute: RouteType;
  selectedActivityId: string | null;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  user: UserProfile;
  events: ActivityEvent[];
  setEvents: React.Dispatch<React.SetStateAction<ActivityEvent[]>>;
  joinedEventIds: string[];
  savedEventIds: string[];
  chatThreads: ChatThread[];
  activeChatId: string;
  setActiveChatId: (id: string) => void;
  communityPosts: CommunityPost[];
  toasts: ToastNotice[];
  onboardingData: OnboardingData;
  setOnboardingData: React.Dispatch<React.SetStateAction<OnboardingData>>;
  
  // Modals
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;

  isJoinModalOpen: boolean;
  setIsJoinModalOpen: (open: boolean) => void;
  eventToJoin: ActivityEvent | null;
  setEventToJoin: (event: ActivityEvent | null) => void;
  
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (open: boolean) => void;

  // Actions
  navigateTo: (route: RouteType, activityId?: string) => void;
  loginAsRole: (role: UserRole) => void;
  openJoinModal: (event: ActivityEvent) => void;
  confirmJoinSpot: (eventId: string) => void;
  leaveEvent: (eventId: string) => void;
  toggleSaveEvent: (eventId: string) => void;
  createEvent: (eventData: Partial<ActivityEvent>) => void;
  sendMessage: (threadId: string, text: string) => void;
  toggleLikePost: (postId: string) => void;
  addCommunityPost: (content: string, category: CategoryType, image?: string) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const MiloContext = createContext<MiloContextType | undefined>(undefined);

export const MiloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState<RouteType>('landing');
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>('event-1');
  const [selectedArea, setSelectedArea] = useState<string>('All Pune');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  
  // Events state with LocalStorage + DB Sync
  const [events, setEvents] = useState<ActivityEvent[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('milo_events_persistent');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return MOCK_EVENTS;
  });

  const [joinedEventIds, setJoinedEventIds] = useState<string[]>(['event-1', 'event-3', 'event-5']);
  const [savedEventIds, setSavedEventIds] = useState<string[]>(['event-2', 'event-4']);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(MOCK_CHAT_THREADS);
  const [activeChatId, setActiveChatId] = useState<string>('thread-1');
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const [toasts, setToasts] = useState<ToastNotice[]>([]);
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    city: 'Pune',
    interests: ['Coffee', 'Gaming', 'Trekking'],
    planVibes: ['Social', 'Chill', 'Adventure'],
    socialMood: 'Ready to meet people 🤝',
  });

  // Modal controls
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [eventToJoin, setEventToJoin] = useState<ActivityEvent | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Sync events to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('milo_events_persistent', JSON.stringify(events));
    }
  }, [events]);

  // Sync events from backend DB if available
  useEffect(() => {
    const syncBackendEvents = async () => {
      const dbEvents = await api.getEvents();
      if (dbEvents && Array.isArray(dbEvents) && dbEvents.length > 0) {
        // Merge with existing
        setEvents((prev) => {
          const merged = [...dbEvents, ...prev];
          const uniqueMap = new Map();
          merged.forEach((item) => uniqueMap.set(item.id, item));
          return Array.from(uniqueMap.values());
        });
      }
    };
    syncBackendEvents();
  }, []);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (route: RouteType, activityId?: string) => {
    if (activityId) {
      setSelectedActivityId(activityId);
    }
    setActiveRoute(route);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const loginAsRole = (role: UserRole) => {
    setIsLoginModalOpen(false);
    if (role === 'admin') {
      setUser((prev) => ({
        ...prev,
        role: 'admin',
        name: 'MILO Executive Admin',
      }));
      addToast('👑 Admin Portal', 'Logged in directly as Platform Admin');
      navigateTo('admin-dashboard');
    } else {
      setUser((prev) => ({
        ...prev,
        role: 'user',
        name: 'Pratik Sharma',
      }));
      addToast('👋 Welcome Pratik!', 'Logged in directly as MILO Member');
      navigateTo('dashboard');
    }
  };

  const openJoinModal = (event: ActivityEvent) => {
    setEventToJoin(event);
    setIsJoinModalOpen(true);
  };

  const confirmJoinSpot = (eventId: string) => {
    if (!joinedEventIds.includes(eventId)) {
      setJoinedEventIds((prev) => [...prev, eventId]);
      setEvents((prev) =>
        prev.map((e) => {
          if (e.id === eventId) {
            return {
              ...e,
              joinedCount: e.joinedCount + 1,
              participants: [
                ...e.participants,
                { id: user.id, name: user.name.split(' ')[0], avatar: user.avatar }
              ]
            };
          }
          return e;
        })
      );
      setUser((prev) => ({ ...prev, eventsJoinedCount: prev.eventsJoinedCount + 1 }));
      addToast('🎉 Spot Confirmed!', 'You have successfully joined the event. See you there!');
    }
  };

  const leaveEvent = (eventId: string) => {
    setJoinedEventIds((prev) => prev.filter((id) => id !== eventId));
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            joinedCount: Math.max(0, e.joinedCount - 1),
            participants: e.participants.filter((p) => p.id !== user.id),
          };
        }
        return e;
      })
    );
    addToast('Event Left', 'You have left this meetup.', 'info');
  };

  const toggleSaveEvent = (eventId: string) => {
    setSavedEventIds((prev) => {
      const isSaved = prev.includes(eventId);
      if (isSaved) {
        addToast('Removed from Saved', 'Event removed from your saved list.', 'info');
        return prev.filter((id) => id !== eventId);
      } else {
        addToast('Saved!', 'Event added to your saved activities list.');
        return [...prev, eventId];
      }
    });
  };

  const createEvent = async (eventData: Partial<ActivityEvent>) => {
    const newId = `event-custom-${Date.now()}`;
    const fullEvent: ActivityEvent = {
      id: newId,
      title: eventData.title || 'New MILO Meetup',
      category: eventData.category || 'Coffee',
      icon: eventData.icon || '☕',
      image: eventData.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
      location: eventData.location || 'High Street, Baner, Pune',
      area: eventData.area || 'Baner',
      distanceKm: eventData.distanceKm || 1.2,
      date: eventData.date || 'Saturday, 22 Aug',
      time: eventData.time || '6:00 PM',
      isToday: false,
      isThisWeekend: true,
      joinedCount: 1,
      totalSpots: eventData.totalSpots || 8,
      price: eventData.price || 0,
      description: eventData.description || 'Join us for a friendly hangout!',
      host: {
        name: user.name,
        avatar: user.avatar,
        role: 'Event Host',
      },
      safetyNote: 'Public venue • Community guidelines apply',
      participants: [{ id: user.id, name: user.name.split(' ')[0], avatar: user.avatar, isHost: true }],
      vibes: eventData.vibes || ['Social', 'Friendly'],
    };

    // Send HTTP POST to Spring Boot Backend
    await api.createEvent(fullEvent);

    setEvents((prev) => [fullEvent, ...prev]);
    setJoinedEventIds((prev) => [...prev, newId]);
    setUser((prev) => ({ ...prev, eventsHostedCount: prev.eventsHostedCount + 1 }));
    addToast('🚀 Event Saved!', 'Your activity plan is saved permanently and visible to members nearby.');
    setIsCreateModalOpen(false);
  };

  const sendMessage = (threadId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderName: user.name.split(' ')[0],
      senderAvatar: user.avatar,
      text: text.trim(),
      timestamp: 'Just now',
      isSelf: true,
    };

    setChatThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            lastMessage: `You: ${text.trim()}`,
            timestamp: 'Just now',
            messages: [...thread.messages, newMsg],
          };
        }
        return thread;
      })
    );
  };

  const toggleLikePost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const addCommunityPost = (content: string, category: CategoryType, image?: string) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: {
        name: user.name,
        avatar: user.avatar,
        area: user.area,
        isVerified: true,
      },
      timeAgo: 'Just now',
      content,
      image,
      likes: 1,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: true,
      category,
    };
    setCommunityPosts((prev) => [newPost, ...prev]);
    addToast('Post Published', 'Your community story is shared with MILO members!');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    addToast('Profile Updated', 'Your profile details have been saved.');
    setIsEditProfileOpen(false);
  };

  return (
    <MiloContext.Provider
      value={{
        activeRoute,
        selectedActivityId,
        selectedArea,
        setSelectedArea,
        user,
        events,
        setEvents,
        joinedEventIds,
        savedEventIds,
        chatThreads,
        activeChatId,
        setActiveChatId,
        communityPosts,
        toasts,
        onboardingData,
        setOnboardingData,

        isLoginModalOpen,
        setIsLoginModalOpen,
        isJoinModalOpen,
        setIsJoinModalOpen,
        eventToJoin,
        setEventToJoin,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEditProfileOpen,
        setIsEditProfileOpen,

        navigateTo,
        loginAsRole,
        openJoinModal,
        confirmJoinSpot,
        leaveEvent,
        toggleSaveEvent,
        createEvent,
        sendMessage,
        toggleLikePost,
        addCommunityPost,
        updateProfile,
        addToast,
        removeToast,
      }}
    >
      {children}
    </MiloContext.Provider>
  );
};

export const useMilo = () => {
  const context = useContext(MiloContext);
  if (!context) {
    throw new Error('useMilo must be used within a MiloProvider');
  }
  return context;
};
