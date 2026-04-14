/* src/context/AppReducer.js */
export function AppReducer(state, action) {
  switch (action.type) {
    case 'ENROL_ACTIVITY':
      if (state.enrolledActivities.includes(action.payload)) return state;
      return { 
        ...state, 
        enrolledActivities: [...state.enrolledActivities, action.payload] 
      }
    case 'UNENROL_ACTIVITY':
      return { 
        ...state, 
        enrolledActivities: state.enrolledActivities.filter(id => id !== action.payload) 
      }
    case 'TOGGLE_HABIT':
      const isCompleted = state.completedHabitsToday.includes(action.payload)
      return {
        ...state,
        completedHabitsToday: isCompleted
          ? state.completedHabitsToday.filter(id => id !== action.payload)
          : [...state.completedHabitsToday, action.payload]
      }
    case 'ADD_APPOINTMENT':
      return { 
        ...state, 
        appointments: [...state.appointments, action.payload] 
      }
    case 'CANCEL_APPOINTMENT':
      return { 
        ...state, 
        appointments: state.appointments.filter(a => a.id !== action.payload) 
      }
    case 'UPDATE_PROFILE':
      return { 
        ...state, 
        user: { ...state.user, ...action.payload } 
      }
    case 'RESET_DAILY_HABITS':
      // This would be called by a utility checking the date
      return {
        ...state,
        completedHabitsToday: []
      }
    default:
      return state
  }
}
