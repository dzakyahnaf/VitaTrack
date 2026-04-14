# PLAN.md — ICT 930 Assignment 2: Frontend Design
> **Domain chosen:** Health & Wellbeing Web App  
> **Framework:** React (Vite + functional components + hooks)  
> **Target grade:** High Distinction  
> **Rubric weight:** 35%

---

## 0. Quick Reference — Rubric Checklist

| Criterion | Weight | What Examiner Looks For | Implementation Target |
|---|---|---|---|
| Functionality & Feature Completeness | 7% | All features work, loading/error/empty states handled | Every page has data states, forms validated |
| Frontend Architecture & Component Design | 5% | Clear separation, reusable, scalable | Atomic-ish structure, Context API, custom hooks |
| UI/UX, Responsiveness & Accessibility | 5% | Polished, mobile+desktop, semantic HTML, ARIA | Design system tokens, `aria-*`, focus rings |
| Code Quality & Maintainability | 4% | Clean naming, no duplication, good hooks | ESLint + Prettier enforced |
| Documentation & Reflection | 4% | Professional README, insightful 500-700 word reflection | README.md + REFLECTION.md |

---

## 1. Project Overview

**App Name:** `VitaTrack` — A Personal Health & Wellbeing Dashboard

### What the app does:
Users can:
- Browse and enrol in wellness activities (yoga, meditation, gym, nutrition)
- Track daily habits with a visual habit tracker
- Book and manage health appointments
- View personal progress with charts and statistics
- Search and filter activities
- Manage their user profile

### Why this domain:
- Diverse enough to show all 6 mandatory functional requirements
- Clear CRUD-like interactions (book, cancel, track, filter)
- Rich visual opportunities (progress bars, charts, calendars)
- Relevant to real industry products (Headspace, MyFitnessPal, Zocdoc)

---

## 2. Tech Stack Decisions

```
React 18              → Framework (functional components + hooks)
Vite                  → Build tool (fast dev server)
React Router v6       → Client-side routing
Recharts              → Charts/graphs (progress visualisation)
date-fns              → Date formatting/manipulation
ESLint + Prettier     → Code quality enforcement
```

**No Redux** — use React Context API + useReducer for shared state. Keep it simple and justified in reflection.

### Installation commands (include in README):
```bash
npm create vite@latest vita-track -- --template react
cd vita-track
npm install react-router-dom recharts date-fns
npm install -D eslint prettier eslint-config-prettier
npm run dev
```

---

## 3. Folder Structure

```
vita-track/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/              # Static images, icons
│   ├── components/
│   │   ├── layout/          # Shell-level components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   ├── ui/              # Generic reusable UI atoms
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── ErrorState.jsx
│   │   └── features/        # Domain-specific components
│   │       ├── dashboard/
│   │       │   ├── StatsCard.jsx
│   │       │   └── ProgressChart.jsx
│   │       ├── activities/
│   │       │   ├── ActivityCard.jsx
│   │       │   ├── ActivityFilter.jsx
│   │       │   └── ActivityModal.jsx
│   │       ├── habits/
│   │       │   ├── HabitRow.jsx
│   │       │   └── HabitCalendar.jsx
│   │       ├── appointments/
│   │       │   ├── AppointmentCard.jsx
│   │       │   └── BookingForm.jsx
│   │       └── profile/
│   │           └── ProfileForm.jsx
│   ├── context/
│   │   ├── AppContext.jsx    # Global state (user, theme)
│   │   └── AppReducer.js
│   ├── hooks/               # Custom hooks
│   │   ├── useFetch.js
│   │   ├── useLocalStorage.js
│   │   └── useDebounce.js
│   ├── data/                # Mock JSON data
│   │   ├── activities.json
│   │   ├── appointments.json
│   │   └── habits.json
│   ├── pages/               # Route-level pages
│   │   ├── Dashboard.jsx
│   │   ├── Activities.jsx
│   │   ├── HabitTracker.jsx
│   │   ├── Appointments.jsx
│   │   ├── Profile.jsx
│   │   └── NotFound.jsx
│   ├── utils/
│   │   └── helpers.js       # Date formatters, etc.
│   ├── styles/
│   │   ├── tokens.css       # CSS variables (design tokens)
│   │   └── global.css
│   ├── App.jsx              # Router setup
│   └── main.jsx             # Entry point
├── screenshots/             # 5+ screenshots for submission
├── README.md
├── REFLECTION.md
├── .eslintrc.cjs
├── .prettierrc
└── package.json
```

**Why this structure matters (say in reflection):** Separation into `layout/`, `ui/`, and `features/` mirrors industry-standard atomic design principles. UI components are domain-agnostic and reusable; feature components are smart and domain-specific.

---

## 4. Pages & Routes

| Route | Page Component | Description |
|---|---|---|
| `/` | `Dashboard.jsx` | Overview stats, quick habits, upcoming appointments |
| `/activities` | `Activities.jsx` | Browse, search, filter, enrol in wellness activities |
| `/habits` | `HabitTracker.jsx` | Daily habit checklist + 7-day completion calendar |
| `/appointments` | `Appointments.jsx` | View upcoming bookings + booking form |
| `/profile` | `Profile.jsx` | Edit user info, goals, preferences |
| `*` | `NotFound.jsx` | 404 fallback page |

### Router setup in `App.jsx`:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/Dashboard'
// ... other imports

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/habits" element={<HabitTracker />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
```

---

## 5. Design System (tokens.css)

Define all design tokens as CSS custom properties. **Do not hardcode colors anywhere.**

```css
/* src/styles/tokens.css */
:root {
  /* Colors */
  --color-primary: #2D6A4F;        /* Forest green */
  --color-primary-light: #52B788;
  --color-primary-dark: #1B4332;
  --color-accent: #F4A261;         /* Warm orange accent */
  --color-bg: #F8F9F4;             /* Off-white background */
  --color-surface: #FFFFFF;
  --color-surface-2: #F0F4EF;
  --color-text: #1A1A2E;
  --color-text-muted: #6B7280;
  --color-danger: #E63946;
  --color-success: #2D9D78;
  --color-warning: #F4A261;
  --color-border: #E5E7EB;

  /* Typography */
  --font-display: 'Fraunces', serif;    /* Google Font - distinctive */
  --font-body: 'DM Sans', sans-serif;   /* Google Font - clean */
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.10);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.12);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}
```

Add Google Fonts to `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 6. Mock Data Structure

### `src/data/activities.json`
```json
[
  {
    "id": "act-001",
    "title": "Morning Yoga Flow",
    "category": "Yoga",
    "difficulty": "Beginner",
    "duration": 30,
    "instructor": "Anika Sharma",
    "rating": 4.8,
    "enrolled": false,
    "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    "description": "A gentle morning flow to awaken your body and set a positive tone for the day.",
    "tags": ["flexibility", "mindfulness", "morning"]
  },
  {
    "id": "act-002",
    "title": "HIIT Cardio Blast",
    "category": "Fitness",
    "difficulty": "Advanced",
    "duration": 45,
    "instructor": "Marcus Lee",
    "rating": 4.6,
    "enrolled": true,
    "image": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    "description": "High-intensity interval training to maximise calorie burn and build endurance.",
    "tags": ["cardio", "strength", "weight-loss"]
  }
  // Add 8-10 more items with categories: Yoga, Fitness, Meditation, Nutrition, Sleep
]
```

### `src/data/appointments.json`
```json
[
  {
    "id": "appt-001",
    "provider": "Dr. Sarah Chen",
    "specialty": "General Practitioner",
    "date": "2026-04-20",
    "time": "09:30",
    "type": "Check-up",
    "status": "confirmed",
    "location": "VitaClinic Central",
    "notes": "Annual health review"
  }
  // Add 4-5 more
]
```

### `src/data/habits.json`
```json
[
  { "id": "hab-001", "name": "Drink 8 glasses of water", "icon": "💧", "streak": 5 },
  { "id": "hab-002", "name": "Meditate 10 minutes", "icon": "🧘", "streak": 3 },
  { "id": "hab-003", "name": "30 min walk", "icon": "🚶", "streak": 7 },
  { "id": "hab-004", "name": "Sleep by 10:30 PM", "icon": "🌙", "streak": 2 },
  { "id": "hab-005", "name": "Eat vegetables", "icon": "🥗", "streak": 4 }
]
```

---

## 7. State Management

### Global State via Context API (`src/context/AppContext.jsx`)

```jsx
import { createContext, useContext, useReducer } from 'react'
import { AppReducer } from './AppReducer'

const initialState = {
  user: {
    name: 'Alex Rivera',
    email: 'alex@vitatrack.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    goal: 'Improve overall fitness',
    joinDate: '2024-01-15'
  },
  enrolledActivities: ['act-002'],    // activity IDs
  completedHabitsToday: [],           // habit IDs completed today
  appointments: [],                   // user's bookings
}

const AppContext = createContext()

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
```

### Reducer actions (`src/context/AppReducer.js`)
```js
export function AppReducer(state, action) {
  switch (action.type) {
    case 'ENROL_ACTIVITY':
      return { ...state, enrolledActivities: [...state.enrolledActivities, action.payload] }
    case 'UNENROL_ACTIVITY':
      return { ...state, enrolledActivities: state.enrolledActivities.filter(id => id !== action.payload) }
    case 'TOGGLE_HABIT':
      const isCompleted = state.completedHabitsToday.includes(action.payload)
      return {
        ...state,
        completedHabitsToday: isCompleted
          ? state.completedHabitsToday.filter(id => id !== action.payload)
          : [...state.completedHabitsToday, action.payload]
      }
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] }
    case 'CANCEL_APPOINTMENT':
      return { ...state, appointments: state.appointments.filter(a => a.id !== action.payload) }
    case 'UPDATE_PROFILE':
      return { ...state, user: { ...state.user, ...action.payload } }
    default:
      return state
  }
}
```

Wrap `App.jsx` with the provider:
```jsx
// main.jsx
<AppProvider>
  <App />
</AppProvider>
```

---

## 8. Custom Hooks

### `src/hooks/useFetch.js` — Async data loading with loading/error states
```js
import { useState, useEffect } from 'react'

export function useFetch(fetchFn) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    // Simulate async (replace with real API call if needed)
    const timer = setTimeout(() => {
      try {
        const result = fetchFn()
        if (!cancelled) {
          setData(result)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      }
    }, 600) // simulate network delay

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  return { data, loading, error }
}
```

### `src/hooks/useDebounce.js` — For search input
```js
import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}
```

### `src/hooks/useLocalStorage.js` — Persist state across refresh
```js
import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error(err)
    }
  }

  return [storedValue, setValue]
}
```

---

## 9. Page-by-Page Implementation Guide

---

### 9.1 Dashboard (`/`)

**Purpose:** Give user an at-a-glance overview of their health journey.

**Components used:**
- `StatsCard` × 4 (Today's habits, enrolled activities, upcoming appointments, current streak)
- `ProgressChart` (weekly habit completion — use Recharts `BarChart`)
- `HabitRow` × n (today's quick habit checklist)
- `AppointmentCard` × 2 (next 2 upcoming appointments, truncated)

**Data flow:**
```
useFetch(loadHabits) → habits data
useApp() → state.completedHabitsToday, state.enrolledActivities, state.appointments
```

**Key interactions:**
- Check off habits directly on dashboard (dispatch `TOGGLE_HABIT`)
- "View all" links navigate to respective pages

**States to handle:**
- Loading: show `<Spinner />` skeleton
- Error: show `<ErrorState />`
- Empty habits: show `<EmptyState message="No habits yet. Add some!" />`

**Accessibility:**
- Stats cards: `role="region"` with `aria-label`
- Progress chart: `aria-label="Weekly habit completion chart"`

---

### 9.2 Activities (`/activities`)

**Purpose:** Browse, search, filter, and enrol/unenrol wellness activities.

**Features to implement:**
1. **Search bar** — `useState` + `useDebounce` to filter by title/instructor
2. **Category filter** — pill buttons: All | Yoga | Fitness | Meditation | Nutrition | Sleep
3. **Difficulty filter** — dropdown: All | Beginner | Intermediate | Advanced
4. **Activity cards** — show image, title, instructor, rating, duration, enrol button
5. **Activity modal** — click card → open modal with full details + enrol/unenrol

**Component breakdown:**
```
Activities.jsx
  ├── ActivityFilter.jsx    (search + category + difficulty controls)
  ├── ActivityCard.jsx × n  (grid of cards)
  └── ActivityModal.jsx     (detail overlay, triggered by card click)
```

**State:**
```js
const [search, setSearch] = useState('')
const [selectedCategory, setSelectedCategory] = useState('All')
const [selectedDifficulty, setSelectedDifficulty] = useState('All')
const [selectedActivity, setSelectedActivity] = useState(null) // for modal
const debouncedSearch = useDebounce(search)

// Derived filtered list (no state needed — compute from data)
const filtered = activities.filter(a =>
  a.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
  (selectedCategory === 'All' || a.category === selectedCategory) &&
  (selectedDifficulty === 'All' || a.difficulty === selectedDifficulty)
)
```

**Enrolment button:**
```jsx
const { state, dispatch } = useApp()
const isEnrolled = state.enrolledActivities.includes(activity.id)

<button onClick={() => dispatch({
  type: isEnrolled ? 'UNENROL_ACTIVITY' : 'ENROL_ACTIVITY',
  payload: activity.id
})}>
  {isEnrolled ? 'Unenrol' : 'Enrol'}
</button>
```

**Empty state:** If no activities match filters → show `<EmptyState message="No activities match your search." />`

---

### 9.3 Habit Tracker (`/habits`)

**Purpose:** Check off daily habits, view completion history.

**Features:**
1. **Habit list** — each habit has a checkbox + name + icon + streak count
2. **Progress ring** — show `X/5 habits completed today` (CSS circle progress or Recharts `RadialBarChart`)
3. **7-day calendar grid** — shows which days each habit was completed (use `useLocalStorage` to persist)
4. **Add habit form** — simple modal form: habit name + emoji icon

**HabitRow.jsx:**
```jsx
function HabitRow({ habit }) {
  const { state, dispatch } = useApp()
  const isCompleted = state.completedHabitsToday.includes(habit.id)

  return (
    <div className={`habit-row ${isCompleted ? 'completed' : ''}`}
         role="checkbox"
         aria-checked={isCompleted}
         aria-label={`Mark ${habit.name} as complete`}>
      <input
        type="checkbox"
        id={`habit-${habit.id}`}
        checked={isCompleted}
        onChange={() => dispatch({ type: 'TOGGLE_HABIT', payload: habit.id })}
      />
      <label htmlFor={`habit-${habit.id}`}>
        <span aria-hidden="true">{habit.icon}</span>
        {habit.name}
      </label>
      <span className="streak-badge">🔥 {habit.streak}</span>
    </div>
  )
}
```

---

### 9.4 Appointments (`/appointments`)

**Purpose:** View and manage health appointments; book new ones.

**Features:**
1. **Appointments list** — cards with provider, date, time, type, status badge, cancel button
2. **Booking form** — opens in modal; fields: provider name, specialty, date, time, type, notes
3. **Tabs** — "Upcoming" | "Past" filter

**BookingForm.jsx validation rules:**
```js
const validate = (values) => {
  const errors = {}
  if (!values.provider.trim()) errors.provider = 'Provider name is required'
  if (!values.date) errors.date = 'Date is required'
  else if (new Date(values.date) < new Date()) errors.date = 'Date must be in the future'
  if (!values.time) errors.time = 'Time is required'
  if (!values.type) errors.type = 'Appointment type is required'
  return errors
}
```

**Form state pattern:**
```js
const [values, setValues] = useState({ provider: '', specialty: '', date: '', time: '', type: '', notes: '' })
const [errors, setErrors] = useState({})
const [submitted, setSubmitted] = useState(false)

const handleSubmit = (e) => {
  e.preventDefault()
  const validationErrors = validate(values)
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)
    return
  }
  dispatch({ type: 'ADD_APPOINTMENT', payload: { ...values, id: `appt-${Date.now()}`, status: 'confirmed' } })
  setSubmitted(true)
}
```

**Accessibility for form:**
- Every input has a `<label>` with matching `htmlFor`
- Error messages use `role="alert"` and `aria-describedby`
- Form has `aria-label="Book new appointment"`

---

### 9.5 Profile (`/profile`)

**Purpose:** Let users view and edit their personal health profile and goals.

**Features:**
1. **Profile card** — avatar, name, email, join date, goal
2. **Edit form** — name, email, goal (textarea), with validation
3. **Stats summary** — total enrolled activities, total habit completions, account age

**ProfileForm.jsx:**
- Show form in view mode by default
- "Edit Profile" button toggles to edit mode
- "Save" dispatches `UPDATE_PROFILE` and returns to view mode
- "Cancel" reverts changes without dispatching

---

## 10. Reusable UI Components

### `Button.jsx`
```jsx
// Variants: primary | secondary | danger | ghost
// Sizes: sm | md | lg
function Button({ children, variant = 'primary', size = 'md', disabled, loading, onClick, ...rest }) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      {...rest}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  )
}
```

### `Modal.jsx`
```jsx
// Must trap focus inside modal, close on Escape key, close on overlay click
import { useEffect, useRef } from 'react'

function Modal({ isOpen, onClose, title, children }) {
  const ref = useRef()

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    ref.current?.focus()
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={e => e.stopPropagation()} ref={ref} tabIndex={-1}>
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button onClick={onClose} aria-label="Close modal">×</button>
        </div>
        {children}
      </div>
    </div>
  )
}
```

### `Spinner.jsx`
```jsx
function Spinner({ size = 'md' }) {
  return (
    <div className={`spinner spinner-${size}`} role="status" aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  )
}
```

### `EmptyState.jsx`
```jsx
function EmptyState({ icon = '📭', message, action }) {
  return (
    <div className="empty-state" role="status">
      <span aria-hidden="true">{icon}</span>
      <p>{message}</p>
      {action}
    </div>
  )
}
```

### `ErrorState.jsx`
```jsx
function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="error-state" role="alert">
      <p>⚠️ {message}</p>
      {onRetry && <Button onClick={onRetry}>Try Again</Button>}
    </div>
  )
}
```

---

## 11. Responsive Design Rules

Use **CSS Grid + Flexbox** — no CSS framework dependency.

```css
/* Breakpoints */
/* Mobile-first: default styles = mobile */
/* md: 768px+ */
/* lg: 1024px+ */

/* Example: Stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr;           /* mobile: 1 column */
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);  /* tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);  /* desktop: 4 columns */
  }
}

/* Sidebar: hidden on mobile, fixed on desktop */
.sidebar {
  display: none;
}

@media (min-width: 768px) {
  .sidebar {
    display: block;
    width: 240px;
  }
}

/* Mobile: bottom navigation bar replaces sidebar */
.bottom-nav {
  display: flex;
  position: fixed;
  bottom: 0;
}

@media (min-width: 768px) {
  .bottom-nav {
    display: none;
  }
}
```

---

## 12. Accessibility Checklist

Before submission, verify EVERY item below:

- [ ] All images have `alt` text (or `alt=""` if decorative)
- [ ] All form inputs have `<label>` with matching `htmlFor`
- [ ] Error messages use `role="alert"` so screen readers announce them
- [ ] Modals have `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- [ ] All interactive elements are keyboard-reachable (tab order)
- [ ] Focus is visible (don't remove `outline` in CSS without replacement)
- [ ] Color contrast ratio ≥ 4.5:1 for text (check with browser DevTools)
- [ ] Skip-to-content link: `<a href="#main-content" class="sr-only focusable">Skip to content</a>`
- [ ] Page `<title>` changes on route change using `useEffect`
- [ ] Semantic HTML: `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`
- [ ] Loading states announced: `aria-busy="true"` or `role="status"`
- [ ] Chart has text alternative description

---

## 13. Performance Guidelines

- **Memoisation:** Use `useMemo` for filtered lists (activities filtering), `useCallback` for event handlers passed to children
  ```js
  const filtered = useMemo(() => activities.filter(a => /* filter logic */), [activities, search, category, difficulty])
  ```
- **Lazy loading:** Use `React.lazy` + `<Suspense>` for page-level components
  ```jsx
  const Activities = React.lazy(() => import('./pages/Activities'))
  ```
- **Image loading:** Add `loading="lazy"` to all `<img>` tags
- **Avoid:** Putting large arrays or complex calculations inside render without memoisation

---

## 14. ESLint + Prettier Setup

### `.eslintrc.cjs`
```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'prettier'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'no-unused-vars': 'warn',
    'react/prop-types': 'off'
  }
}
```

### `.prettierrc`
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

Add to `package.json` scripts:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint src --ext .jsx,.js",
  "format": "prettier --write src"
}
```

---

## 15. README.md Template

```md
# VitaTrack — Health & Wellbeing Web App

> ICT 930 Assignment 2 | Semester 1, 2026

## Overview
VitaTrack is a production-quality frontend web application for managing personal health and wellness. Users can track daily habits, browse wellness activities, manage health appointments, and visualise their wellbeing progress.

## Technology Stack
- **React 18** — UI framework (functional components + hooks)
- **Vite** — Build tool
- **React Router v6** — Client-side routing
- **Recharts** — Data visualisation
- **date-fns** — Date utilities
- **Context API + useReducer** — State management
- **ESLint + Prettier** — Code quality

## Installation & Setup
\`\`\`bash
git clone <repo-url>
cd vita-track
npm install
npm run dev
\`\`\`
Open http://localhost:5173

## Key Features
- **Dashboard** — Personalised health overview with stats and quick habit check-off
- **Activity Browser** — Search, filter, and enrol in wellness activities
- **Habit Tracker** — Daily habit tracking with streaks and 7-day history
- **Appointment Manager** — Book and manage health appointments
- **Profile** — Manage personal goals and settings
- **Responsive** — Fully functional on desktop and mobile

## Design Decisions
- **Context API over Redux:** Chosen for appropriate complexity level. The app's state is not complex enough to justify Redux overhead, and Context + useReducer provides a clean, idiomatic React solution.
- **CSS Modules / Custom Properties:** Design tokens via CSS variables ensure visual consistency without a CSS framework dependency — demonstrating understanding of the cascade.
- **Atomic component structure:** Separating `layout/`, `ui/`, and `features/` components mirrors industry-standard practices, maximising reusability and testability.
- **Mock JSON with simulated async:** Demonstrates realistic data-loading patterns (loading/error/empty states) without requiring a running backend.
```

---

## 16. REFLECTION.md Template (500-700 words)

Write the reflection in your own words. Use these headings and prompts:

**Architectural Choices** (~200 words)
- Why React over Vue?
- Why Context API + useReducer instead of Redux or Zustand?
- Explain the `layout/ui/features/` folder separation — how does it support maintainability?
- Why Vite instead of CRA?

**Challenges Faced and Solutions** (~200 words)
- Modal accessibility (focus trapping, Escape key, `aria-modal`) — harder than expected
- Debouncing search — how `useDebounce` prevents excessive filter re-renders
- Shared state design — deciding what goes in Context vs local state
- Responsive layout — sidebar on desktop, bottom nav on mobile

**Industry Relevance** (~200 words)
- This pattern (React + Context + mock API → real API swap) mirrors real professional teams
- Component reusability reduces time-to-market in real projects
- Accessibility is legally required in many jurisdictions (WCAG 2.1)
- Mention a real-world product this resembles (e.g., MyFitnessPal, Headspace, Zocdoc)
- How would you extend this with a real backend (REST API or GraphQL)?

---

## 17. Git Commit Strategy

Make at least **15-20 meaningful commits** across development. Example history:

```
feat: initialise Vite + React project structure
feat: add AppContext with reducer and initial state
feat: create design tokens and global styles
feat: build Navbar and Sidebar layout components
feat: implement Dashboard page with StatsCard components
feat: add useFetch hook with loading and error states
feat: build Activities page with search and filter
feat: implement ActivityModal with enrol/unenrol logic
feat: create HabitTracker page with toggle interaction
feat: add Appointments page with BookingForm validation
feat: implement Profile page with edit mode
feat: add responsive mobile layout and bottom navigation
feat: implement accessibility improvements across all pages
feat: add Recharts progress visualisation to Dashboard
feat: add NotFound 404 page
fix: resolve modal focus trap on keyboard navigation
fix: debounce search input to improve performance
docs: add README with setup instructions and design decisions
docs: add REFLECTION.md
chore: run Prettier format pass on all source files
```

---

## 18. Screenshots Guide (minimum 5)

| # | Screen | Device | What to show |
|---|---|---|---|
| 1 | Dashboard | Desktop | Stats cards, progress chart, habit list |
| 2 | Activities | Desktop | Grid of activity cards, search/filter bar active |
| 3 | Activity Modal | Desktop | Modal open with enrol button |
| 4 | Habit Tracker | Mobile | Habit checklist, progress ring |
| 5 | Appointments + Booking Form | Desktop | Form open with validation error visible |
| 6 *(bonus)* | Profile | Mobile | Profile edit mode |
| 7 *(bonus)* | Empty State | Any | No results found state |

Use browser DevTools responsive mode for mobile screenshots.

---

## 19. Final Pre-Submission Checklist

- [ ] `npm run dev` starts without errors
- [ ] All 5 routes navigate correctly
- [ ] No console errors or warnings
- [ ] Loading state shown on every page's initial data fetch
- [ ] Error state shown if data fails to load (test by throwing in mock fetch)
- [ ] Empty states displayed when lists are empty
- [ ] All forms show validation errors on invalid submission
- [ ] Enrol/unenrol works and persists within session
- [ ] Habit toggle works, count updates on Dashboard
- [ ] Booking form saves and shows in appointments list
- [ ] Cancel appointment removes it from list
- [ ] Profile edit saves changes
- [ ] Responsive: test at 375px (iPhone), 768px (iPad), 1280px (Desktop)
- [ ] Tab through all interactive elements — all reachable?
- [ ] `npm run lint` passes (zero errors)
- [ ] README.md complete
- [ ] REFLECTION.md is 500-700 words
- [ ] At least 5 screenshots in `/screenshots` folder
- [ ] Git history has 15+ meaningful commits
- [ ] ZIP file or GitHub repo link ready for submission

---

*Generated for ICT 930 Advanced Web Application Development — Semester 1, 2026*
