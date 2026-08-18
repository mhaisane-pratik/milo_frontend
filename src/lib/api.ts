// ====================================================================
// MILO FRONTEND API SERVICE - CONNECTED TO LIVE RENDER SPRING BOOT API
// ====================================================================

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://milo-backend-rx2p.onrender.com/api';

export const api = {
  // 1. USERS MODULE
  register: async (userData: { name: string; email: string; college?: string; location?: string }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return await res.json();
    } catch (e) {
      console.error('API Error /auth/register:', e);
      return null;
    }
  },

  getUsers: async () => {
    try {
      const res = await fetch(`${BASE_URL}/users`);
      return await res.json();
    } catch (e) {
      console.error('API Error /users:', e);
      return null;
    }
  },

  updateUserStatus: async (id: string, status: 'ACTIVE' | 'BLOCKED') => {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      return await res.json();
    } catch (e) {
      console.error('API Error /users:', e);
      return null;
    }
  },

  deleteUser: async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (e) {
      console.error('API Error /users:', e);
      return null;
    }
  },

  // 2. ACTIVITIES CATALOG MODULE
  getActivities: async () => {
    try {
      const res = await fetch(`${BASE_URL}/activities`);
      return await res.json();
    } catch (e) {
      console.error('API Error /activities:', e);
      return null;
    }
  },

  createActivity: async (actData: { title: string; category: string; description: string; icon: string }) => {
    try {
      const res = await fetch(`${BASE_URL}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actData),
      });
      return await res.json();
    } catch (e) {
      console.error('API Error /activities:', e);
      return null;
    }
  },

  deleteActivity: async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/activities/${id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (e) {
      console.error('API Error /activities:', e);
      return null;
    }
  },

  // 3. EVENTS MODULE
  getEvents: async () => {
    try {
      const res = await fetch(`${BASE_URL}/events`);
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  createEvent: async (eventData: any) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  deleteEvent: async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/events/${id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // 4. ANNOUNCEMENTS MODULE
  getAnnouncements: async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/announcements`);
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  createAnnouncement: async (ancData: { title: string; content: string }) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ancData),
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  deleteAnnouncement: async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/announcements/${id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },
};
