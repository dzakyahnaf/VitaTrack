import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './HealthcareBooking.css';

export default function HealthcareBooking() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  
  // Booking Modal State
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingReason, setBookingReason] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    fetchProviders();
  }, [specialtyFilter]);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/providers${specialtyFilter ? `?specialty=${specialtyFilter}` : ''}`);
      setProviders(res.data);
    } catch (err) {
      console.error("Failed to fetch providers", err);
    } finally {
      setLoading(false);
    }
  };

  const openBookingModal = (provider) => {
    setSelectedProvider(provider);
    setBookingDate('');
    setBookingTime('');
    setBookingReason('');
    setSuccessMsg('');
    setModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/bookings', {
        providerId: selectedProvider.id,
        date: bookingDate,
        time: bookingTime,
        reason: bookingReason
      });
      setSuccessMsg('Booking confirmed successfully!');
      setTimeout(() => {
        setModalOpen(false);
        setSuccessMsg('');
      }, 2000);
    } catch (err) {
      console.error("Failed to submit booking", err);
      alert("Failed to book appointment.");
    }
  };

  return (
    <div className="healthcare-booking-page animate-fade-in">
      <header className="page-header">
        <h1 className="font-display">Healthcare Providers</h1>
        <p className="text-muted">Find and book appointments with top medical professionals.</p>
      </header>

      <div className="filter-section card">
        <input 
          type="text" 
          placeholder="Filter by specialty (e.g. Dentist, Therapist)..." 
          value={specialtyFilter}
          onChange={(e) => setSpecialtyFilter(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading-state">Loading providers...</div>
      ) : providers.length === 0 ? (
        <div className="empty-state card">
          <p>No providers found matching your criteria.</p>
        </div>
      ) : (
        <div className="providers-grid">
          {providers.map(provider => (
            <div key={provider.id} className="provider-card card hover-scale">
              <div className="provider-info">
                <h3>{provider.name}</h3>
                <span className="badge">{provider.specialty}</span>
                <p className="location">📍 {provider.location}</p>
                <div className="rating">⭐ {provider.rating} / 5.0</div>
              </div>
              <button 
                className="btn btn-primary w-100 mt-3"
                onClick={() => openBookingModal(provider)}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal card">
            <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
            <h2 className="font-display">Book Appointment</h2>
            <p className="text-muted">with {selectedProvider?.name}</p>
            
            {successMsg ? (
              <div className="alert success">{successMsg}</div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="booking-form mt-4">
                <div className="form-group">
                  <label>Date</label>
                  <input 
                    type="date" 
                    value={bookingDate} 
                    onChange={(e) => setBookingDate(e.target.value)} 
                    required 
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input 
                    type="time" 
                    value={bookingTime} 
                    onChange={(e) => setBookingTime(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Reason for visit (Optional)</label>
                  <textarea 
                    value={bookingReason} 
                    onChange={(e) => setBookingReason(e.target.value)}
                    rows="3"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Confirm Booking</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
