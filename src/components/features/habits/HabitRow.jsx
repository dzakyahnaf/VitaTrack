import { useApp } from '../../../context/AppContext'
import './HabitRow.css'

export default function HabitRow({ habit }) {
  const { state, dispatch } = useApp()
  const isCompleted = state.completedHabitsToday.includes(habit.id)

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_HABIT', payload: habit.id })
  }

  return (
    <div className={`habit-row ${isCompleted ? 'completed' : ''} fade-in`}>
      <div className="habit-checkbox-wrapper">
        <input 
          type="checkbox" 
          id={`habit-${habit.id}`}
          className="habit-checkbox"
          checked={isCompleted}
          onChange={handleToggle}
        />
      </div>
      <label htmlFor={`habit-${habit.id}`} className="habit-info">
        <span className="habit-icon" aria-hidden="true">{habit.icon}</span>
        <span className="habit-name">{habit.name}</span>
      </label>
      <div className="habit-streak">
        <span aria-hidden="true">🔥</span> {habit.streak}
      </div>
    </div>
  )
}
