import './StatsCard.css'

export default function StatsCard({ label, value, icon, ColorClass }) {
  return (
    <div className="stats-card fade-in">
      <div className={`stats-icon ${ColorClass}`}>
        <span aria-hidden="true">{icon}</span>
      </div>
      <div className="stats-info">
        <span className="stats-label">{label}</span>
        <span className="stats-value">{value}</span>
      </div>
    </div>
  )
}
