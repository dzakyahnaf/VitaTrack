import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import StatsCard from '../components/features/dashboard/StatsCard'
import ProgressChart from '../components/features/dashboard/ProgressChart'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import habitsData from '../data/habits.json'
import appointmentsData from '../data/appointments.json'
import './Dashboard.css'

export default function Dashboard() {
  const { state, dispatch } = useApp()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height: '60vh' }}>
        <Spinner size="lg" />
      </div>
    )
  }

  const upcomingAppts = state.appointments.length > 0 
    ? state.appointments 
    : appointmentsData.slice(0, 2)

  return (
    <div className="dashboard fade-in">
      <header className="dashboard-header">
        <h1>Welcome back, {state.user.name.split(' ')[0]}!</h1>
        <p>Here's how your health journey is looking today.</p>
      </header>

      <div className="stats-grid">
        <StatsCard 
          label="Habits Done" 
          value={`${state.completedHabitsToday.length}/${habitsData.length}`} 
          icon="✅" 
        />
        <StatsCard 
          label="Activities" 
          value={state.enrolledActivities.length} 
          icon="🏃" 
        />
        <StatsCard 
          label="Appointments" 
          value={upcomingAppts.length} 
          icon="📅" 
        />
        <StatsCard 
          label="Day Streak" 
          value="12" 
          icon="🔥" 
        />
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-main">
          <Card className="mb-6">
            <ProgressChart />
          </Card>

          <section>
            <div className="section-title">
              <h2>Recent Activities</h2>
              <Link to="/activities">
                <Button variant="secondary" size="sm">View All</Button>
              </Link>
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {/* Show first 2 enrolled or sample activities */}
              {state.enrolledActivities.slice(0, 2).map(id => (
                <Card key={id} title="Enrolled Activity" hoverable={false}>
                  <p>Check your activity schedule for details.</p>
                </Card>
              ))}
              {state.enrolledActivities.length === 0 && (
                <p className="text-muted">No activities enrolled yet. <Link to="/activities" style={{color: 'var(--color-primary)'}}>Browse activities</Link></p>
              )}
            </div>
          </section>
        </div>

        <div className="dashboard-side">
          <section>
            <div className="section-title">
              <h2>Habits Today</h2>
              <Link to="/habits">
                <Button variant="secondary" size="sm">Edit</Button>
              </Link>
            </div>
            <Card className="flex flex-col gap-4">
              {habitsData.map(habit => {
                const isCompleted = state.completedHabitsToday.includes(habit.id)
                return (
                  <div key={habit.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{habit.icon}</span>
                      <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? 'var(--color-text-muted)' : 'inherit' }}>
                        {habit.name}
                      </span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={isCompleted} 
                      onChange={() => dispatch({ type: 'TOGGLE_HABIT', payload: habit.id })}
                    />
                  </div>
                )
              })}
            </Card>
          </section>

          <section style={{ marginTop: 'var(--space-6)' }}>
            <div className="section-title">
              <h2>Appointments</h2>
              <Link to="/appointments">
                <Button variant="secondary" size="sm">Manage</Button>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {upcomingAppts.map(appt => (
                <Card key={appt.id} hoverable={true} className="p-4">
                  <div className="flex flex-col">
                    <span style={{ fontWeight: 600 }}>{appt.provider}</span>
                    <span className="text-muted" style={{ fontSize: '0.875rem' }}>{appt.type}</span>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="info">{appt.time}</Badge>
                      <span style={{ fontSize: '0.875rem' }}>{appt.date}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
