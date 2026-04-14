import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import './Navbar.css'

export default function Navbar() {
  const { state } = useApp()
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Activities', path: '/activities' },
    { name: 'Habits', path: '/habits' },
    { name: 'Appointments', path: '/appointments' },
  ]

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span aria-hidden="true">🌱</span>
          VitaTrack
        </Link>
        
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
        </div>

        <Link to="/profile" className="nav-user">
          <img src={state.user.avatar} alt="" className="nav-avatar" />
          <span className="nav-username">{state.user.name.split(' ')[0]}</span>
        </Link>
      </div>
    </nav>
  )
}
