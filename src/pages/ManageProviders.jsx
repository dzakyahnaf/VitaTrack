import { useState, useEffect } from 'react';
import axios from 'axios';
import './HealthcareBooking.css'; // Reusing styles

export default function ManageProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', specialty: '', location: '', rating: '5.0'
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/providers');
      setProviders(res.data);
    } catch (err) {
      console.error("Failed to fetch providers", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (provider = null) => {
    if (provider) {
      setEditingProvider(provider);
      setFormData({
        name: provider.name,
        specialty: provider.specialty,
        location: provider.location,
        rating: provider.rating.toString()
      });
    } else {
      setEditingProvider(null);
      setFormData({ name: '', specialty: '', location: '', rating: '5.0' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProvider) {
        await axios.put(`/providers/${editingProvider.id}`, formData);
      } else {
        await axios.post('/providers', formData);
      }
      setIsModalOpen(false);
      fetchProviders();
    } catch (err) {
      console.error("Failed to save provider", err);
      alert("Failed to save provider data.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this provider?")) return;
    try {
      await axios.delete(`/providers/${id}`);
      fetchProviders();
    } catch (err) {
      console.error("Failed to delete provider", err);
      alert("Cannot delete provider because they have active bookings.");
    }
  };

  return (
    <div className="healthcare-booking-page animate-fade-in">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-display text-primary">Manage Providers</h1>
          <p className="text-muted">Admin panel to add, edit, or remove healthcare providers.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openModal()}>+ Add Provider</button>
      </header>

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : (
        <div className="providers-grid">
          {providers.map(provider => (
            <div key={provider.id} className="provider-card card">
              <div className="provider-info">
                <h3>{provider.name}</h3>
                <span className="badge">{provider.specialty}</span>
                <p className="location">📍 {provider.location}</p>
                <div className="rating">⭐ {provider.rating} / 5.0</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => openModal(provider)}>Edit</button>
                <button className="btn" style={{ flex: 1, backgroundColor: '#fee2e2', color: '#dc2626', borderColor: '#fca5a5' }} onClick={() => handleDelete(provider.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal card">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            <h2 className="font-display">{editingProvider ? 'Edit Provider' : 'New Provider'}</h2>
            
            <form onSubmit={handleSubmit} className="booking-form mt-4">
              <div className="form-group">
                <label>Provider Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Specialty</label>
                <input type="text" value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} required placeholder="e.g. Dentist" />
              </div>
              <div className="form-group">
                <label>Location / Clinic</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Rating (1.0 - 5.0)</label>
                <input type="number" step="0.1" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Save Provider</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
