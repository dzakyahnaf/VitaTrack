import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import AppointmentCard from '../components/features/appointments/AppointmentCard'
import BookingForm from '../components/features/appointments/BookingForm'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import initialAppointments from '../data/appointments.json'
import './Appointments.css'

export default function Appointments() {
  const { state, dispatch } = useApp()
  const [activeTab, setActiveTab] = useState('Upcoming')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Use state's appointments or fallback to mock data if empty
  const allAppointments = state.appointments.length > 0 ? state.appointments : initialAppointments

  const filteredAppointments = useMemo(() => {
    const today = new Date()
    return allAppointments.filter(appt => {
      const apptDate = new Date(appt.date)
      if (activeTab === 'Upcoming') return apptDate >= today
      return apptDate < today
    }).sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [allAppointments, activeTab])

  const handleBook = (values) => {
    dispatch({ 
      type: 'ADD_APPOINTMENT', 
      payload: { 
        ...values, 
        id: `appt-${Date.now()}`, 
        status: 'confirmed' 
      } 
    })
    setIsModalOpen(false)
  }

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch({ type: 'CANCEL_APPOINTMENT', payload: id })
    }
  }

  return (
    <div className="appointments-page fade-in">
      <header className="appointments-header">
        <div>
          <h1>Your Appointments</h1>
          <p>Manage your health check-ups and follow-up sessions.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Book Appointment</Button>
      </header>

      <div className="appointments-tabs">
        {['Upcoming', 'Past'].map(tab => (
          <div 
            key={tab} 
            className={`appt-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="appointments-grid">
        {filteredAppointments.map(appt => (
          <AppointmentCard 
            key={appt.id} 
            appointment={appt} 
            onCancel={handleCancel}
          />
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <EmptyState 
          message={`No ${activeTab.toLowerCase()} appointments found.`} 
          icon="📅"
          action={activeTab === 'Upcoming' ? <Button onClick={() => setIsModalOpen(true)}>Book One Now</Button> : null}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book New Appointment">
        <BookingForm onSubmit={handleBook} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}
