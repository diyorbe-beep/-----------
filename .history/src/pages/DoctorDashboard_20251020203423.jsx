import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { doctorHelpers, serviceHelpers } from '../lib/supabase.js'

const DoctorDashboard = () => {
  const { profile, user } = useAuth()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState(null)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profile?.role !== 'doctor') {
      navigate('/')
      return
    }
    loadDoctorData()
  }, [profile])

  const loadDoctorData = async () => {
    try {
      // Check if doctor profile exists
      const { data: doctorData } = await supabase
        .from('doctors')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (doctorData) {
        setDoctor(doctorData)
        const servicesData = await serviceHelpers.getDoctorServices(doctorData.id)
        setServices(servicesData || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </main>
    )
  }

  if (!doctor) {
    return (
      <main className="container">
        <div className="card" style={{ marginTop: '40px', padding: '40px', textAlign: 'center' }}>
          <h2>Shifokor profilini to'ldiring</h2>
          <p className="muted">Avval shifokor ma'lumotlaringizni to'ldiring</p>
          <button 
            className="btn" 
            style={{ marginTop: '24px' }}
            onClick={() => navigate('/doctor/profile/setup')}
          >
            Profil yaratish
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="container">
      <h1 style={{ marginTop: '32px' }}>Dashboard</h1>
      
      <div className="kpi" style={{ marginTop: '24px' }}>
        <div className="item">
          <div className="n">{doctor.total_consultations || 0}</div>
          <div className="muted">Jami konsultatsiyalar</div>
        </div>
        <div className="item">
          <div className="n">⭐ {doctor.rating?.toFixed(1) || '0.0'}</div>
          <div className="muted">Reyting</div>
        </div>
        <div className="item">
          <div className="n">{doctor.review_count || 0}</div>
          <div className="muted">Sharhlar</div>
        </div>
        <div className="item">
          <div className={`badge ${doctor.verification_status === 'approved' ? 'badge-success' : doctor.verification_status === 'pending' ? 'badge-warning' : 'badge-danger'}`}>
            {doctor.verification_status === 'approved' ? '✓ Tasdiqlangan' : 
             doctor.verification_status === 'pending' ? '⏳ Kutilmoqda' : 
             '✗ Rad etilgan'}
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: '32px' }}>
        <div className="card">
          <h2>Xizmatlaringiz</h2>
          {services.length === 0 ? (
            <p className="muted">Xizmatlar qo'shilmagan</p>
          ) : (
            <div className="list">
              {services.map(service => (
                <div key={service.id} style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{service.name}</strong>
                      <p className="muted" style={{ margin: 0, fontSize: '14px' }}>
                        {service.service_type} - {service.duration_minutes} daqiqa
                      </p>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--brand)' }}>
                      ${service.price_usd}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button className="btn" style={{ marginTop: '16px', width: '100%' }}>
            Xizmat qo'shish
          </button>
        </div>

        <div className="card">
          <h2>Qabullar</h2>
          <p className="muted">Hozircha qabullar yo'q</p>
        </div>
      </div>
    </main>
  )
}

export default DoctorDashboard

