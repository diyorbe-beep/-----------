import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { doctorHelpers } from '../lib/supabase.js'

const DoctorDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDoctor()
  }, [id])

  const loadDoctor = async () => {
    try {
      const data = await doctorHelpers.getDoctor(id)
      setDoctor(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = (serviceId) => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate(`/booking/${serviceId}`)
  }

  if (loading) {
    return (
      <main className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </main>
    )
  }

  if (error || !doctor) {
    return (
      <main className="container">
        <div className="card" style={{ marginTop: '40px', padding: '40px', textAlign: 'center' }}>
          <h2>Shifokor topilmadi</h2>
          <p className="muted">{error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="container" style={{ paddingTop: '40px' }}>
      <div className="grid-2" style={{ gap: '32px' }}>
        {/* Left sidebar - Doctor info */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '100px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="avatar avatar-xl" style={{ marginBottom: '16px' }}>
                <img 
                  src={doctor.profiles?.avatar_url || 'https://via.placeholder.com/120'} 
                  alt={doctor.profiles?.full_name} 
                />
              </div>
              <h2 style={{ margin: '0 0 8px' }}>{doctor.profiles?.full_name}</h2>
              <p className="muted" style={{ margin: 0 }}>{doctor.specialization}</p>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
              <span className="badge">⭐ {doctor.rating.toFixed(1)}</span>
              <span className="badge">{doctor.experience_years} yil</span>
              <span className="badge">{doctor.total_consultations}+ konsultatsiya</span>
            </div>

            {doctor.languages && (
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <small className="muted">Tillar:</small>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginTop: '4px', flexWrap: 'wrap' }}>
                  {doctor.languages.map((lang, i) => (
                    <span key={i} className="badge" style={{ fontSize: '11px' }}>{lang}</span>
                  ))}
                </div>
              </div>
            )}

            {doctor.clinic_name && (
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '600' }}>
                  📍 {doctor.clinic_name}
                </p>
                <p className="muted" style={{ margin: 0, fontSize: '13px' }}>
                  {doctor.clinic_address}
                  {doctor.city && `, ${doctor.city}`}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right content */}
        <div>
          {/* Bio */}
          <div className="card">
            <h3>Haqida</h3>
            <p className="muted">{doctor.bio}</p>
            
            {doctor.education && (
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Ta'lim</h4>
                <p className="muted">{doctor.education}</p>
              </div>
            )}
          </div>

          {/* Services */}
          {doctor.services && doctor.services.length > 0 && (
            <div className="card" style={{ marginTop: '24px' }}>
              <h3>Xizmatlar</h3>
              <div className="list">
                {doctor.services.map(service => (
                  <div key={service.id} className="card" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 8px', fontSize: '18px' }}>
                          {service.service_type === 'chat' && '💬 '}
                          {service.service_type === 'video' && '🎥 '}
                          {service.service_type === 'live' && '⚡ '}
                          {service.name}
                        </h4>
                        <p className="muted" style={{ margin: '0 0 8px', fontSize: '14px' }}>
                          {service.description}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <span className="badge">{service.duration_minutes} daqiqa</span>
                          <span className="badge badge-success">${service.price_usd}</span>
                        </div>
                      </div>
                      <button 
                        className="btn"
                        onClick={() => handleBooking(service.id)}
                      >
                        Band qilish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {doctor.reviews && doctor.reviews.length > 0 && (
            <div className="card" style={{ marginTop: '24px' }}>
              <h3>Sharhlar ({doctor.reviews.length})</h3>
              <div className="list">
                {doctor.reviews.map((review, index) => (
                  <div key={index} style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div className="avatar">
                        <img 
                          src={review.profiles?.avatar_url || 'https://via.placeholder.com/40'} 
                          alt={review.profiles?.full_name} 
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '14px' }}>{review.profiles?.full_name}</strong>
                          <span className="badge">⭐ {review.rating}</span>
                        </div>
                        <p className="muted" style={{ margin: '4px 0 0', fontSize: '14px' }}>
                          {review.comment}
                        </p>
                        <small className="muted">
                          {new Date(review.created_at).toLocaleDateString('uz-UZ')}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default DoctorDetail

