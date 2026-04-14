import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import './ActivityModal.css'

export default function ActivityModal({ activity, isOpen, onClose, isEnrolled, onEnrol }) {
  if (!activity) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={activity.title}>
      <div className="activity-modal-content">
        <img src={activity.image} alt={activity.title} className="modal-hero-img" />
        
        <div className="modal-meta-row">
          <Badge variant={activity.difficulty === 'Beginner' ? 'success' : 'warning'}>{activity.difficulty}</Badge>
          <span className="modal-category">{activity.category}</span>
          <span className="modal-duration">🕒 {activity.duration} mins</span>
        </div>

        <div className="modal-instructor-info">
          <span className="instructor-label">Instructor:</span>
          <span className="instructor-name">{activity.instructor}</span>
          <span className="instructor-rating">⭐ {activity.rating} / 5.0</span>
        </div>

        <div className="modal-description">
          <h3>About this activity</h3>
          <p>{activity.description}</p>
        </div>

        <div className="modal-tags">
          {activity.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>

        <div className="modal-actions">
          <Button 
            variant={isEnrolled ? 'danger' : 'primary'} 
            fullWidth 
            onClick={() => {
              onEnrol(activity.id)
              onClose()
            }}
          >
            {isEnrolled ? 'Unenrol from Activity' : 'Enrol Now'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
