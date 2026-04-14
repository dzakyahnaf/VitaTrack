# 🌱 VitaTrack — Personal Health & Wellbeing Dashboard

VitaTrack is a premium, clean, and interactive web application designed to help users manage their health journey. Built with React and Vite, it focuses on providing a stunning user experience with atomic design principles.

## ✨ Features

- **📊 Dashboard Overivew**: At-a-glance health stats, upcoming appointments, and daily habit completion charts.
- **🏃 Activities Catalog**: Browse and enrol in wellness activities including Yoga, HIIT, and Meditation.
- **✅ Daily Habit Tracker**: Track daily rituals with a visual progress ring and streak system.
- **📅 Appointment Management**: Easily book and manage health check-ups and doctor visits.
- **👤 User Profile**: Personalize goals and manage account details.

## 🛠️ Tech Stack

- **Framework**: React 18 (Functional Components + Hooks)
- **State Management**: React Context API + useReducer
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with modern Design Tokens
- **Icons**: Emojis (Native, high performance)
- **Charts**: Recharts
- **Routing**: React Router v6

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/components/ui`: Generic reusable UI atoms (Button, Card, Modal, etc.)
- `src/components/layout`: App-level layout shells (Navbar, Footer)
- `src/components/features`: Domain-specific components grouped by feature
- `src/context`: Global state management logic
- `src/hooks`: Custom utility hooks (`useFetch`, `useLocalStorage`, etc.)
- `src/pages`: Route-level page components
- `src/styles`: Design tokens and global CSS variables

## 📄 License
This project is created for personal use and educational purposes.
