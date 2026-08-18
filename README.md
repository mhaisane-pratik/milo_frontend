# MILO Frontend - Social Community Platform 🚀

MILO is a full-featured, modern web application designed for hyper-local social networking, activity hosting, group discussions, and event discovery (focused on Pune regions like Wakad, Baner, Hinjewadi, and beyond).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router & React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
- **State Management**: React Context (`MiloContext`) with LocalStorage fallback & API Sync

---

## 🌟 Key Features

### 1. 🏡 **Landing & Onboarding**
- **Hero & Landing Page**: Interactive features display, activity highlights, and call-to-action sections.
- **Auth & Onboarding**: Seamless login, sign-up, and multi-step onboarding wizard for selecting college, location, bio, and personal interests.

### 2. 🎯 **Activity & Event Discovery**
- **Explore Activities**: Discover activities categorized by Coffee, Gaming, Sports, Trekking, Travel, Study, and more.
- **Event Cards**: View hosted events, locations, date/time, remaining spots, price, and member list.
- **Interactive Join & Create Modals**: Single-click join with instant spot calculation, plus event host creation forms with area tagging.

### 3. 💬 **Community & Real-time Messaging**
- **Group Discussions**: Join community channels, send real-time text messages, and chat with members.
- **Direct Messaging**: Connect with other Pune members.

### 4. 👤 **User & Admin Profiles**
- **Member Profiles**: Dynamic profile customization, interests tags, active events, and connected friends.
- **Executive Admin Dashboard**: Comprehensive admin control suite to manage users, approve/reject events, manage announcements, and moderate reported items.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed on your system.
- npm or yarn package manager.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mhaisane-pratik/milo_frontend.git
   cd milo_frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages & API handlers
│   ├── api/              # Proxy / Next.js API endpoints
│   ├── globals.css       # Global styles & Tailwind directives
│   ├── layout.tsx        # Root HTML layout & Context provider
│   └── page.tsx          # Dynamic views router component
├── components/           # UI Components
│   ├── layout/           # Sidebar, TopBar, MobileBottomNav, Footer
│   ├── modals/           # CreateEventModal, JoinEventModal, LoginModal, EditProfileModal
│   ├── ui/               # ActivityCard, PeopleCard, InterestChip, SkeletonLoader, ToastContainer
│   └── views/            # Dashboard, Discover, Landing, Auth, Messages, Community, Profile, Admin
├── context/              # Global Application State (MiloContext)
└── lib/                  # API client, Types, Mock Data, and DB interfaces
```

---

## 📜 Scripts

- `npm run dev`: Runs the app in development mode at `http://localhost:3000`.
- `npm run build`: Compiles and builds the production bundle.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint for code analysis.
