export type RouteType = 
  | 'landing' 
  | 'login' 
  | 'signup' 
  | 'onboarding' 
  | 'dashboard' 
  | 'discover' 
  | 'activity-detail' 
  | 'my-events' 
  | 'messages' 
  | 'community' 
  | 'profile' 
  | 'settings'
  | 'admin-dashboard';

export type UserRole = 'user' | 'admin';

export type CategoryType = 
  | 'Coffee' 
  | 'Gaming' 
  | 'Sports' 
  | 'Food' 
  | 'Movies' 
  | 'Travel' 
  | 'Trekking' 
  | 'Art' 
  | 'Music' 
  | 'Technology';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  age: number;
  city: string;
  area: string;
  avatar: string;
  bio: string;
  interests: CategoryType[];
  commonInterests?: number;
  isVerified?: boolean;
  eventsJoinedCount: number;
  eventsHostedCount: number;
  connectionsCount: number;
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  isHost?: boolean;
}

export interface ActivityEvent {
  id: string;
  title: string;
  category: CategoryType;
  icon: string;
  image: string;
  location: string;
  area: string;
  distanceKm: number;
  date: string;
  time: string;
  isToday?: boolean;
  isThisWeekend?: boolean;
  isFeatured?: boolean;
  isApproved?: boolean;
  joinedCount: number;
  totalSpots: number;
  price: number;
  description: string;
  host: {
    name: string;
    avatar: string;
    role: string;
  };
  safetyNote: string;
  participants: Participant[];
  vibes: string[];
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isSelf?: boolean;
}

export interface ChatThread {
  id: string;
  type: 'group' | 'direct';
  title: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  participantsCount?: number;
  messages: MessageItem[];
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    area: string;
    isVerified?: boolean;
  };
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  category: CategoryType;
}

export interface OnboardingData {
  city: string;
  interests: CategoryType[];
  planVibes: string[];
  socialMood: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  area: string;
  maxDistance: number;
  groupSize: string;
  priceFilter: 'all' | 'free' | 'paid';
  dateTab: 'All' | 'Today' | 'This Weekend' | 'Popular';
}

export interface ToastNotice {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
