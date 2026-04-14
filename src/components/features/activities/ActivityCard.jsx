import Card from '../../ui/Card'
import Badge from '../../ui/Badge'
import Button from '../../ui/Button'
import './ActivityCard.css'

export default function ActivityCard({ activity, isEnrolled, onEnrol, onDetails }) {
  return (
    <Card 
      image={activity.image} 
      title={activity.title}
      headerAction={<Badge variant={activity.difficulty === 'Beginner' ? 'success' : 'warning'}>{activity.difficulty}</Badge>}
      footer={
        <div className="activity-card-footer">
          <Button variant="secondary" size="sm" onClick={() => onDetails(activity)}>Details</Button>
          <Button 
            variant={isEnrolled ? 'outline' : 'primary'} 
            size="sm" 
            onClick={() => onEnrol(activity.id)}
          >
            {isEnrolled ? 'Unenrol' : 'Enrol'}
          </Button>
        </div>
      }
    >
      <div className="activity-info-row">
        <span className="activity-info-item">🕒 {activity.duration}m</span>
        <span className="activity-info-item">⭐ {activity.rating}</span>
        <span className="activity-info-item">📂 {activity.category}</span>
      </div>
      <p className="activity-instructor">Instructor: {activity.instructor}</p>
    </Card>
  )
}
