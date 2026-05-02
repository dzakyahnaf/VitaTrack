import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Activities', path: '/activities' },
    { name: 'Habits', path: '/habits' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'Healthcare Booking', path: '/healthcare-booking' },
  ]

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span aria-hidden="true">🌱</span>
          VitaTrack
        </Link>
        
        {user ? (
          <>
            <div className="nav-links">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
              {user.role === 'admin' && (
                <Link
                  to="/manage-providers"
                  className={`nav-link ${location.pathname === '/manage-providers' ? 'active' : ''}`}
                >
                  Manage Providers
                </Link>
              )}
            </div>

            <div className="nav-user" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/profile" className="nav-link">
                <span className="nav-username">{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={logout} className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.9rem' }}>Logout</button>
            </div>
          </>
        ) : (
          <div className="nav-links" style={{ marginLeft: 'auto' }}>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '6px 16px', marginLeft: '8px' }}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
