import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import './Profile.css'

export default function Profile() {
  const { state, dispatch } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: state.user.name,
    email: state.user.email,
    goal: state.user.goal
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: formData })
    setIsEditing(false)
  }

  return (
    <div className="profile-page fade-in">
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <img src={state.user.avatar} alt={state.user.name} className="profile-avatar-lg" />
          <div className="profile-main-info">
            <h1>{state.user.name}</h1>
            <p className="profile-email">{state.user.email}</p>
            <div className="profile-badge-row">
              <span style={{ fontSize: '0.75rem', padding: '4px 12px', background: 'var(--color-surface-2)', borderRadius: '20px', fontWeight: 600 }}>Member since Jan 2024</span>
            </div>
          </div>
          
          <div className="profile-stats-grid">
            <div className="profile-stat-item">
              <span className="profile-stat-value">{state.enrolledActivities.length}</span>
              <span className="profile-stat-label">Activities</span>
            </div>
            <div className="profile-stat-item">
              <span className="profile-stat-value">12</span>
              <span className="profile-stat-label">Streak</span>
            </div>
            <div className="profile-stat-item">
              <span className="profile-stat-value">{state.appointments.length + 2}</span>
              <span className="profile-stat-label">Bookings</span>
            </div>
          </div>
        </aside>

        <main className="profile-details">
          <Card title="Account Settings" headerAction={
            !isEditing && <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>Edit Profile</Button>
          }>
            {isEditing ? (
              <div className="flex flex-col gap-4">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    className="form-input" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    className="form-input" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Primary Health Goal</label>
                  <textarea 
                    className="form-input" 
                    name="goal" 
                    rows="3" 
                    value={formData.goal} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="flex gap-4 mt-2">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="info-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>Full Name</label>
                  <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>{state.user.name}</p>
                </div>
                <div className="info-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>Email Address</label>
                  <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>{state.user.email}</p>
                </div>
                <div className="info-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>My Health Goal</label>
                  <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>{state.user.goal}</p>
                </div>
              </div>
            )}
          </Card>

          <Card style={{ marginTop: 'var(--space-6)' }} title="Preferences">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontWeight: 600 }}>Email Notifications</p>
                  <p className="text-muted" style={{ fontSize: '0.875rem' }}>Receive updates about your weekly progress</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontWeight: 600 }}>Dark Mode</p>
                  <p className="text-muted" style={{ fontSize: '0.875rem' }}>Switch to a darker color palette</p>
                </div>
                <input type="checkbox" />
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
