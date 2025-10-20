import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { bookingHelpers } from '../lib/supabase.js'
import supabase from '../lib/supabase.js'

const Booking = () => {
  const { serviceId } = useParams()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  
  const [service, setService] = useState(null)
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    scheduled_at: '',
    patient_notes: ''
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    loadServiceData()
  }, [serviceId, user])

  const loadServiceData = async () => {
    try {
      const { data: serviceData, error } = await supabase
        .from('services')
        .select(`
          *,
          doctor:doctor_id (
            *,
            profiles:user_id (
              full_name,
              avatar_url
            )
          )
        `)
        .eq('id', serviceId)
        .single()

      if (error) throw error

      setService(serviceData)
      setDoctor(serviceData.doctor)
    } catch (err) {
      alert(err.message)
      navigate('/doctors')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (!formData.scheduled_at) {
      alert('Iltimos, vaqtni tanlang')
      setSubmitting(false)
      return
    }

    try {
      const booking = await bookingHelpers.createBooking({
        patient_id: user.id,
        doctor_id: doctor.id,
        service_id: service.id,
        scheduled_at: formData.scheduled_at,
        duration_minutes: service.duration_minutes,
        amount_usd: service.price_usd,
        patient_notes: formData.patient_notes,
        status: 'pending',
        payment_status: 'pending'
      })

      alert('Qabul band qilindi! To\'lovni amalga oshiring.')
      navigate('/patient/dashboard')
    } catch (err) {
      alert(err.message || 'Xatolik yuz berdi')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </main>
    )
  }

  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h1>Qabulga yozilish</h1>

        {/* Doctor info */}
        <div className="card" style={{ background: 'var(--bg-secondary)', marginTop: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div className="avatar avatar-lg">
              <img 
                src={doctor?.profiles?.avatar_url || 'https://via.placeholder.com/80'} 
                alt={doctor?.profiles?.full_name} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 4px' }}>{doctor?.profiles?.full_name}</h3>
              <p className="muted" style={{ margin: 0 }}>{doctor?.specialization}</p>
            </div>
          </div>
        </div>

        {/* Service info */}
        <div className="card" style={{ background: 'var(--bg-secondary)', marginTop: '16px' }}>
          <h3 style={{ margin: '0 0 12px' }}>
            {service?.service_type === 'chat' && '💬 '}
            {service?.service_type === 'video' && '🎥 '}
            {service?.service_type === 'live' && '⚡ '}
            {service?.name}
          </h3>
          <p className="muted" style={{ margin: '0 0 12px' }}>{service?.description}</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">{service?.duration_minutes} daqiqa</span>
            <span className="badge badge-success" style={{ fontSize: '16px' }}>
              ${service?.price_usd}
            </span>
          </div>
        </div>

        {/* Booking form */}
        <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
          <div>
            <label htmlFor="scheduled_at">Sana va vaqt *</label>
            <input
              id="scheduled_at"
              name="scheduled_at"
              type="datetime-local"
              value={formData.scheduled_at}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 16)}
              required
            />
            <small className="muted">Iltimos, qulay vaqtni tanlang</small>
          </div>

          <div style={{ marginTop: '16px' }}>
            <label htmlFor="patient_notes">Izohlar (ixtiyoriy)</label>
            <textarea
              id="patient_notes"
              name="patient_notes"
              value={formData.patient_notes}
              onChange={handleChange}
              placeholder="Shikoyatlaringiz yoki savollaringiz..."
              rows="4"
            />
          </div>

          <div className="card" style={{ background: 'var(--bg-secondary)', marginTop: '24px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '16px' }}>⚠️ Muhim eslatmalar:</h4>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li className="muted" style={{ marginBottom: '8px' }}>
                Qabuldan oldin to'lovni amalga oshiring
              </li>
              <li className="muted" style={{ marginBottom: '8px' }}>
                Shifokor sizga emailda yoki dashboard orqali xabar beradi
              </li>
              <li className="muted">
                Bekor qilish uchun kamida 24 soat oldin xabar bering
              </li>
            </ul>
          </div>

          <button
            type="submit"
            className="btn"
            style={{ width: '100%', marginTop: '24px' }}
            disabled={submitting}
          >
            {submitting ? 'Saqlanmoqda...' : `$${service?.price_usd} to'lab band qilish`}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Booking

