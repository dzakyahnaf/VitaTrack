# 🌱 VitaTrack — Personal Health & Wellbeing Dashboard

VitaTrack is a comprehensive Full-Stack web application designed to help users manage their health journey. It provides an intuitive dashboard, wellness activity enrollment, daily habit tracking, and a dedicated **Healthcare Booking System** with Role-Based Access Control (RBAC).

## ✨ Features

- **🛡️ Authentication & Security**: JWT-based login, registration, and protected routes.
- **👥 Role-Based Access Control (RBAC)**: 
  - **Admins** have exclusive access to manage (Add, Edit, Delete) Healthcare Providers.
  - **Users** can view providers and book appointments securely.
- **🏥 Healthcare Booking**: Find medical professionals by specialty and schedule appointments.
- **📊 Dashboard Overview**: At-a-glance health stats, upcoming appointments, and daily habit progress.
- **🏃 Activities Catalog**: Browse and enrol in wellness activities (Yoga, HIIT, Meditation).
- **✅ Daily Habit Tracker**: Track daily rituals with visual progress.

## 🛠️ Tech Stack

- **Frontend**: React.js 18, Vite, React Router v6, Axios, Recharts
- **Backend**: Node.js, Express.js, JWT (JSON Web Tokens), bcrypt
- **Database**: PostgreSQL (hosted on Supabase)
- **ORM**: Prisma (v7.x) with `@prisma/adapter-pg`

---

## 🚀 Getting Started: How to Run from Scratch

Follow these instructions to run the full-stack project locally on your machine.

### 1. Prerequisites
- **Node.js**: Ensure you have Node.js (v18 or higher recommended) installed.
- **Git**: To clone the repository.
- **Supabase Account**: (Optional, if you want to use your own database instead of the provided connection).

### 2. Clone the Repository
```bash
git clone https://github.com/dzakyahnaf/VitaTrack.git
cd VitaTrack
```

### 3. Setup the Backend (Server & Database)

The backend is located in the `server` folder. It uses Express.js and Prisma ORM to connect to the PostgreSQL database.

```bash
# Navigate to the backend folder
cd server

# Install backend dependencies
npm install
```

**Environment Variables:**
Create a `.env` file in the `server` directory (if it doesn't already exist) and configure your database and JWT secret:
```env
PORT=5000
DATABASE_URL="postgresql://[USER]:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
JWT_SECRET="supersecret_vita_track_key_for_dev_only"
```
*(Note: Use port `5432` for direct connection which is required for database migrations).*

**Initialize Database & Seed Data:**
Sync the Prisma schema with your database and generate the initial seed data (Providers and Admin account):
```bash
# Push schema to the database and generate Prisma Client
npx prisma db push

# Seed the database with default providers and the admin account
node prisma/seed.js
```

**Start the Backend Server:**
```bash
# Start the backend in development mode (using nodemon)
npm run dev
```
*The backend should now be running on `http://localhost:5000`.*

### 4. Setup the Frontend (Client)

Open a **new, separate terminal tab/window**, navigate to the root directory of the project, and start the React frontend.

```bash
# Make sure you are in the root directory (VitaTrack/)
# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev
```
*The frontend should now be running on `http://localhost:5173`.*

---

## 🔑 Default Credentials

If you ran `node prisma/seed.js` during the setup, the following **Admin** account is available:

- **Email:** `admin@vitatrack.com`
- **Password:** `admin123`

*Login with this account to see the **Manage Providers** menu.*

To test a regular **User** account, simply click **Register** on the application's login page and create a new account. Regular users will not see the admin panels and will be restricted to booking appointments only.

---

## 📂 Project Architecture

```
VitaTrack/
├── server/                     # BACKEND (Node.js/Express)
│   ├── prisma/                 # Database Schema & Seed scripts
│   ├── src/
│   │   ├── controllers/        # Business logic (Auth, Providers, etc.)
│   │   ├── middleware/         # JWT Verification & RBAC rules
│   │   ├── routes/             # Express API Routes
│   │   └── index.js            # Main Express server entry point
│   ├── .env                    # Backend configuration
│   └── package.json
├── src/                        # FRONTEND (React.js/Vite)
│   ├── components/             # Reusable UI (Buttons, Cards) & Layouts
│   ├── context/                # Global AuthContext
│   ├── pages/                  # Views (Dashboard, HealthcareBooking, ManageProviders)
│   ├── App.jsx                 # Route configurations (Protected Routes)
│   └── index.css               # Global Design Tokens & Utilities
├── package.json                # Frontend dependencies
└── README.md                   # Project Documentation
```

## 🏛️ System Architecture

VitaTrack adopts a modern Monorepo Full-Stack architecture. This separates concerns between the client and the server while maintaining them within the same codebase for streamlined development.

- **Client-Side (Frontend)**: A Single Page Application (SPA) built with React.js. It manages local state via Context API and communicates asynchronously with the backend using Axios. Protected routes intercept unauthenticated attempts and enforce RBAC logic at the view layer.
- **Server-Side (Backend)**: An Express.js REST API that handles business logic, JWT authentication, and data validation. It acts as the bridge between the React client and the PostgreSQL database.
- **Data Layer (Supabase & Prisma)**: Hosted PostgreSQL database connected via Prisma ORM. Prisma ensures type safety across database operations and seamlessly manages schema migrations (`db push`).

```mermaid
graph LR
    A[React.js Frontend] <-->|JSON / REST API| B(Express.js Backend)
    B <-->|Prisma ORM| C[(PostgreSQL Supabase)]
    
    classDef frontend fill:#61dafb,stroke:#fff,color:#000
    classDef backend fill:#68a063,stroke:#fff,color:#fff
    classDef db fill:#336791,stroke:#fff,color:#fff
    
    class A frontend
    class B backend
    class C db
```

| Layer | Technology | Responsibilities |
|-------|------------|------------------|
| **Client-Side** | React.js (Vite) | Single Page Application (SPA), Context API for local state, Axios for API calls, and protected routes (RBAC). |
| **Server-Side** | Express.js (Node.js) | REST API, JWT authentication, business logic, and request validation. Acts as the bridge. |
| **Data Layer** | Supabase & Prisma | Hosted PostgreSQL database. Prisma ORM ensures type-safety and seamless schema migrations. |

## 🗄️ Database Design

The relational database is designed to handle user accounts, activities, tracking, and healthcare bookings efficiently:

- **User**: Core entity storing authentication details (`email`, `passwordHash`) and `role` (Admin vs. User).
- **Activity**: Represents available wellness sessions (e.g., Yoga, HIIT).
- **Habit**: Tracks individual user habits, maintaining progress metrics and streak counters.
- **Provider**: Healthcare professionals or clinics available for booking (managed strictly by Admins).
- **Booking**: A junction entity linking a `User` to a `Provider` for a specific appointment date, time, and status.

The relational database is designed to handle user accounts, activities, tracking, and healthcare bookings efficiently.

| Entity | Role / Description | Relationships |
|--------|--------------------|---------------|
| 👤 **User** | Core entity storing authentication (`email`, `passwordHash`) and `role` (Admin/User). | 1:M with `Habit`, `Booking`, `Activity` |
| 🏃 **Activity** | Represents available wellness sessions (e.g., Yoga, HIIT, Meditation). | M:1 with `User` (Enrollment) |
| ✅ **Habit** | Tracks individual user habits, progress metrics, and streak counters. | M:1 with `User` |
| 🏥 **Provider** | Healthcare professionals/clinics available for booking (managed by Admins). | 1:M with `Booking` |
| 📅 **Booking** | Junction entity linking a `User` to a `Provider` for an appointment. | M:1 with `User` & `Provider` |

## ⚙️ Backend Technology Selection

**Node.js & Express.js** were selected as the backend foundation for several strategic reasons:

| Justification | Detail |
|---------------|--------|
| 🟨 **Language Uniformity** | Using JavaScript on the backend allows for seamless context switching since the frontend is also built with JavaScript (React). This heavily accelerates full-stack feature development. |
| 🚀 **Ecosystem & Performance** | Express.js is highly mature, lightweight, and boasts a massive middleware ecosystem (`jsonwebtoken`, `bcrypt`, `cors`), making it perfect for rapid REST API development. |
| 🔗 **Prisma Integration** | Prisma ORM pairs incredibly well with Node.js. It offers a robust, auto-generated, type-safe query builder that aligns perfectly with JSON-heavy communication. |

## 📄 License
This project is created for educational and portfolio purposes.
