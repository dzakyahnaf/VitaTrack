import { createContext, useContext, useReducer, useEffect } from 'react'
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
  // Try to load state from localStorage or use initial
  const [state, dispatch] = useReducer(AppReducer, initialState, (initial) => {
    const localData = localStorage.getItem('vitatrack_state')
    return localData ? JSON.parse(localData) : initial
  })

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('vitatrack_state', JSON.stringify(state))
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
