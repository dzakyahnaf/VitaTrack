import { useApp } from '../context/AppContext'
import HabitRow from '../components/features/habits/HabitRow'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import habitsData from '../data/habits.json'
import './HabitTracker.css'

export default function HabitTracker() {
  const { state } = useApp()
  
  const totalHabits = habitsData.length
  const completedCount = state.completedHabitsToday.length
  const percentage = Math.round((completedCount / totalHabits) * 100)
  
  // Progress Ring logic
  const radius = 65
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="habit-tracker-page fade-in">
      <header className="habits-header">
        <div>
          <h1>Habit Tracker</h1>
          <p>Consistency is key to a healthier lifestyle.</p>
        </div>
        <Button variant="secondary">+ Add New Habit</Button>
      </header>

      <div className="habits-grid">
        <section className="habits-list-section">
          <h2>Daily Habits</h2>
          {habitsData.map(habit => (
            <HabitRow key={habit.id} habit={habit} />
          ))}
        </section>

        <section className="habits-stats-section">
          <h2>Summary</h2>
          <Card className="habits-summary-card">
            <div className="progress-circle-wrapper">
              <svg width="150" height="150">
                <circle className="progress-circle-bg" cx="75" cy="75" r={radius} />
                <circle 
                  className="progress-circle-value" 
                  cx="75" cy="75" r={radius} 
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  transform="rotate(-90 75 75)"
                />
              </svg>
              <div className="progress-text">
                <span className="progress-percent">{percentage}%</span>
                <span className="progress-label">Complete</span>
              </div>
            </div>
            <div>
              <h3>Today's Progress</h3>
              <p className="text-muted">{completedCount} of {totalHabits} habits marked as done.</p>
            </div>
            <div className="streak-badge-lg" style={{ backgroundColor: '#FEF3C7', padding: '12px 24px', borderRadius: '12px', color: '#92400E', fontWeight: 700 }}>
              Current Streak: 12 Days 🔥
            </div>
          </Card>

          <Card style={{ marginTop: 'var(--space-6)' }} title="7-Day History">
            <div className="flex justify-between" style={{ marginTop: 'var(--space-2)' }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{day}</span>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '2px', 
                    backgroundColor: i < 5 ? 'var(--color-primary)' : 'var(--color-surface-2)' 
                  }}></div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
