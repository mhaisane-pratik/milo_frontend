// ====================================================================
// MILO FRONTEND API SERVICE - DIRECT NEON POSTGRESQL API ENDPOINTS
// Reads & Writes Live Data Directly to Neon Cloud PostgreSQL Database
// ====================================================================

export const api = {
  // 1. USERS MODULE (SQL INSERT, UPDATE, DELETE)
  register: async (userData: { name: string; email: string; college?: string; location?: string }) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return await res.json();
    } catch (e) {
      console.error('API Error /api/users:', e);
      return null;
    }
  },

  getUsers: async () => {
    try {
      const res = await fetch('/api/users');
      return await res.json();
    } catch (e) {
      console.error('API Error /api/users:', e);
      return null;
    }
  },

  updateUserStatus: async (id: string, status: 'ACTIVE' | 'BLOCKED') => {
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      return await res.json();
    } catch (e) {
      console.error('API Error /api/users:', e);
      return null;
    }
  },

  deleteUser: async (id: string) => {
    try {
      const res = await fetch(`/api/users?id=${id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (e) {
      console.error('API Error /api/users:', e);
      return null;
    }
  },

  // 2. ACTIVITIES CATALOG MODULE (SQL INSERT, DELETE)
  getActivities: async () => {
    try {
      const res = await fetch('/api/activities');
      return await res.json();
    } catch (e) {
      console.error('API Error /api/activities:', e);
      return null;
    }
  },

  createActivity: async (actData: { title: string; category: string; description: string; icon: string }) => {
    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actData),
      });
      return await res.json();
    } catch (e) {
      console.error('API Error /api/activities:', e);
      return null;
    }
  },

  deleteActivity: async (id: string) => {
    try {
      const res = await fetch(`/api/activities?id=${id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (e) {
      console.error('API Error /api/activities:', e);
      return null;
    }
  },

  // 3. EVENTS MODULE
  getEvents: async () => {
    try {
      const res = await fetch('http://localhost:8080/api/events');
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  createEvent: async (eventData: any) => {
    try {
      const res = await fetch('http://localhost:8080/api/admin/events', {
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
      const res = await fetch(`http://localhost:8080/api/admin/events/${id}`, {
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
      const res = await fetch('http://localhost:8080/api/admin/announcements');
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  createAnnouncement: async (ancData: { title: string; content: string }) => {
    try {
      const res = await fetch('http://localhost:8080/api/admin/announcements', {
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
      const res = await fetch(`http://localhost:8080/api/admin/announcements/${id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },
};
