import { useState } from 'react'
import Button from '../../ui/Button'
import './BookingForm.css'

export default function BookingForm({ onSubmit, onCancel }) {
  const [values, setValues] = useState({
    provider: '',
    specialty: '',
    date: '',
    time: '',
    type: 'Check-up',
    location: '',
    notes: ''
  })
  
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!values.provider.trim()) newErrors.provider = 'Provider name is required'
    if (!values.date) newErrors.date = 'Date is required'
    if (!values.time) newErrors.time = 'Time is required'
    if (!values.location.trim()) newErrors.location = 'Location or Link is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(values)
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="provider">Healthcare Provider</label>
        <input 
          type="text" id="provider" name="provider" className="form-input"
          value={values.provider} onChange={handleChange} placeholder="e.g. Dr. Jane Smith"
        />
        {errors.provider && <span className="error-text">{errors.provider}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="specialty">Specialty</label>
        <input 
          type="text" id="specialty" name="specialty" className="form-input"
          value={values.specialty} onChange={handleChange} placeholder="e.g. Physiotherapist"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Preferred Date</label>
          <input 
            type="date" id="date" name="date" className="form-input"
            value={values.date} onChange={handleChange}
          />
          {errors.date && <span className="error-text">{errors.date}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="time">Preferred Time</label>
          <input 
            type="time" id="time" name="time" className="form-input"
            value={values.time} onChange={handleChange}
          />
          {errors.time && <span className="error-text">{errors.time}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="type">Appointment Type</label>
        <select id="type" name="type" className="form-input" value={values.type} onChange={handleChange}>
          <option>Check-up</option>
          <option>Consultation</option>
          <option>Follow-up</option>
          <option>Therapy Session</option>
          <option>Emergency</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location / Link</label>
        <input 
          type="text" id="location" name="location" className="form-input"
          value={values.location} onChange={handleChange} placeholder="Clinic address or Zoom link"
        />
        {errors.location && <span className="error-text">{errors.location}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes (Optional)</label>
        <textarea 
          id="notes" name="notes" className="form-input" rows="3"
          value={values.notes} onChange={handleChange} placeholder="Any specific concerns..."
        />
      </div>

      <div className="booking-form-actions">
        <Button onClick={onCancel} variant="secondary">Cancel</Button>
        <Button type="submit">Confirm Booking</Button>
      </div>
    </form>
  )
}
