import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Activities from './pages/Activities'
import HabitTracker from './pages/HabitTracker'
import Appointments from './pages/Appointments'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import HealthcareBooking from './pages/HealthcareBooking'
import ManageProviders from './pages/ManageProviders'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell flex flex-col min-h-screen">
          <Navbar />
          <main id="main-content" className="container flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/activities" element={<ProtectedRoute><Activities /></ProtectedRoute>} />
              <Route path="/habits" element={<ProtectedRoute><HabitTracker /></ProtectedRoute>} />
              <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
              <Route path="/healthcare-booking" element={<ProtectedRoute><HealthcareBooking /></ProtectedRoute>} />
              <Route path="/manage-providers" element={<ProtectedRoute requireAdmin={true}><ManageProviders /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
