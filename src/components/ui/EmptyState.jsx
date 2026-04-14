import './EmptyState.css'

export default function EmptyState({ icon = '📭', message, action }) {
  return (
    <div className="empty-state fade-in" role="status">
      <span className="empty-icon" aria-hidden="true">{icon}</span>
      <p className="empty-message">{message}</p>
      {action && <div className="empty-action">{action}</div>}
    </div>
  )
}
