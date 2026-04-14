import Card from '../../ui/Card'
import Badge from '../../ui/Badge'
import Button from '../../ui/Button'
import './AppointmentCard.css'

export default function AppointmentCard({ appointment, onCancel }) {
  const statusVariant = appointment.status === 'confirmed' ? 'success' : 'warning'

  return (
    <Card hoverable={false} className="fade-in">
      <div className="appt-card">
        <div className="appt-header">
          <div>
            <div className="appt-provider">{appointment.provider}</div>
            <div className="appt-specialty">{appointment.specialty}</div>
          </div>
          <Badge variant={statusVariant}>{appointment.status}</Badge>
        </div>

        <div className="appt-details-grid">
          <div className="appt-detail">
            <span className="appt-detail-label">Date & Time</span>
            <span className="appt-detail-value">{appointment.date} @ {appointment.time}</span>
          </div>
          <div className="appt-detail">
            <span className="appt-detail-label">Type</span>
            <span className="appt-detail-value">{appointment.type}</span>
          </div>
          <div className="appt-detail" style={{ gridColumn: 'span 2' }}>
            <span className="appt-detail-label">Location</span>
            <span className="appt-detail-value">{appointment.location}</span>
          </div>
        </div>

        <div className="appt-actions">
          <Button variant="secondary" size="sm">Reschedule</Button>
          <Button variant="outline" size="sm" onClick={() => onCancel(appointment.id)}>Cancel</Button>
        </div>
      </div>
    </Card>
  )
}
