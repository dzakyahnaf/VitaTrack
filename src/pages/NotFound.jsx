import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center" style={{ height: '70vh' }}>
      <h1 style={{ fontSize: '6rem', color: 'var(--color-primary-light)' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>Oops! Page not found.</h2>
      <p className="text-muted" style={{ maxWidth: '400px', marginBottom: 'var(--space-6)' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button size="lg">Back to Dashboard</Button>
      </Link>
    </div>
  )
}
